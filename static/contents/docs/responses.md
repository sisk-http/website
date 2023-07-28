# Responses

Responses represent objects that are HTTP responses to HTTP requests. They are sent by the server to the client as an indication of the request for a resource, page, document, file or other object.

An HTTP response is formed up of status, headers and content.

In this document, we will teach you how to architect HTTP responses with Sisk.

# Setting an HTTP status

The HTTP status list is the same since HTTP/1.0, and Sisk supports all of them.

```cs
HttpResponse res = new HttpResponse();
res.Status = System.Net.HttpStatusCode.Accepted; // 202
```

You can see the full list of available HttpStatusCode [here](https://learn.microsoft.com/pt-br/dotnet/api/system.net.httpstatuscode).

# Setting body and content-type

Sisk supports native .NET content objects to send body in responses. You can use the [StringContent](https://learn.microsoft.com/pt-br/dotnet/api/system.net.http.stringcontent) class to send a JSON response for example:

```cs
HttpResponse res = new HttpResponse();
res.Content = new StringContent(myJson, Encoding.UTF8, "application/json");
```

You can ignore setting the `Content-Length` header as it is automatically calculated in the server infrastructure. Whenever you send an content length header, it will be ignored by the server and it will use the real content length based in the Content property length in bytes.

# Setting response headers

You can add, edit or remove headers you're sending in the response. The example below shows how to send an redirect response to the client.

```cs
HttpResponse res = new HttpResponse();
res.Status = System.Net.HttpStatusCode.Moved;
res.Headers.Add("Location", "/login");
```

# Easily setting cookies

Sisk has methods that facilitate the definition of cookies in the client. Cookies set by this method are already URL encoded and fit the RFC-6265 standard.

```cs
HttpResponse res = new HttpResponse();
res.SetCookie("cookie-name", "cookie-value");
```

There are other [more complete versions](/read?q=/contents/spec/Sisk.Core.Http.CookieHelper.SetCookie(string-string-DateTime-TimeSpan-string-string-bool-bool-string).md) of the same method.

# Sending response in chunks

You can set the transfer encoding to chunked to send large responses.

```cs
HttpResponse res = new HttpResponse();
res.SendChunked = true;
```

When using chunked-encoding, the Content-Length header is automatically omitted.

# Response stream

Response streams are an managed way that allow you to send responses in a segmented way. It's a lower level operation than using HttpResponse objects, as they require you to send the headers and content manually, and then close the connection.

This example opens an read-only stream for the file, copies the stream to the response output stream and doens't loads the entire file in the memory. This can be useful to serving medium or big files.

```cs
// gets the response output stream
var responseStream = request.GetResponseStream();
var fileStream = File.OpenRead("my-big-file.zip");

// sets the response encoding to use chunked-encoding
// also you shouldn't send content-length header when using
// chunked encoding
responseStream.SendChunked = true;
responseStream.SetStatus(200);
responseStream.SetHeader("Content-Type", contentType);

// copies the file stream to the response output stream
fileStream.CopyTo(responseStream.ResponseStream);

// closes the stream
return responseStream.Close();
```

# Implicit response types

Since version 0.15, you can use other return types besides HttpResponse, but it is necessary to configure the router how it will handle each type of object.

The concept is to always return a reference type and turn it into a valid HttpResponse object. Routes that return HttpResponse do not undergo any conversion.

Value types (structures) cannot be used as a return type because they are not compatible with the [RouterCallback](/read?q=/contents/spec/Sisk.Core.Routing.RouterCallback), so they must be wrapped in a ValueResult to be able to be used in handlers.

Consider the following example from a router module not using HttpResponse in the return type:

```cs
public class UsersController : RouterModule
{
    public List<User> Users = new List<User>();

    public UsersController()
    {
        this.Prefix = "users";
    }

    [RouteGet("/")]
    public IEnumerable<User> Index(HttpRequest request)
    {
        return Users.ToArray();
    }

    [RouteGet("/<id>")]
    public User View(HttpRequest request)
    {
        int id = Int32.Parse(request.Query["id"]!);
        User dUser = Users.First(u => u.Id == id);

        return dUser;
    }

    [RoutePost("/")]
    public ValueResult<bool> Create(HttpRequest request)
    {
        User fromBody = JsonSerializer.Deserialize<User>(request.Body)!;
        Users.Add(fromBody);

        return true;
    }
}
```

With that, now it is necessary to define in the router how it will deal with each type of object. Objects are always the first argument of the handler and the output type must be a valid HttpResponse. Also, the output objects of a route should never be null.

For ValueResult types it is not necessary to indicate that the input object is a ValueResult and only T, since ValueResult is an object reflected from its original component.

The association of types does not compare what was registered with the type of the object returned from the router callback. Instead, it checks whether the type of the router result is assignable to the registered type.

Registering a handler of type Object will fallback to all previously unvalidated types. The inserting order of the value handlers also matters, so registering an Object handler will ignore all other type-specific handlers. Always register specific value handlers first to ensure order.

```cs
Router r = new Router();
r.SetObject(new UsersController());

r.RegisterValueHandler<bool>(bolVal =>
{
    HttpResponse res = new HttpResponse();
    res.Status = (bool)bolVal ? HttpStatusCode.OK : HttpStatusCode.BadRequest;
    return res;
});
r.RegisterValueHandler<IEnumerable>(enumerableValue =>
{
    return new HttpResponse();
    // do something with enumerableValue here
});

// registering an value handler of object must be the last
// value handler which will be used as an fallback
r.RegisterValueHandler<object>(fallback =>
{
    HttpResponse res = new HttpResponse();
    res.Status = HttpStatusCode.OK;
    res.Content = JsonContent.Create(fallback);
    return res;
});
```