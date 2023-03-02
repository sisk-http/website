# Requests

Requests are structures that represent an HTTP request message. The [HttpRequest](/spec/Sisk/Core/Http/HttpRequest) object contains useful functions for handling HTTP messages throughout your application.

An HTTP request is formed by the method, path, version, headers and body.

In this document, we will teach you how to obtain each of these elements.

## Getting the request method

To obtain the method of the received request, you can use the Method property:

```cs
HttpMethod requestMethod = request.Method;
```

This property returns the request's method represented by an [HttpMethod](https://learn.microsoft.com/pt-br/dotnet/api/system.net.http.httpmethod) object.

> Note that, unlike route methods, this property does not serves the [RouteMethod.Any](/spec/Sisk/Core/Routing/RouteMethod/Any) item. Instead, it returns the real request method. Custom or non RFC http methods are not supported.

## Getting the request url elements

You can get various elements from a URL through certain properties of a request. For this example, let's consider the URL:

```
http://localhost:5000/user/login?email=foo@bar.com
```

<table class="show-header sm">
    <thead>
        <th>Property name</th>
        <th>Description</th>
        <th>URL piece</th>
    </thead>
    <tbody>
        <tr>
            <td>
                <a href="#/spec/Sisk/Core/Http/HttpRequest/Path">
                    Path
                </a>
            </td>
            <td>
                Gets the request path.
            </td>
            <td>
                <code>/user/login</code>
            </td>
        </tr>
        <tr>
            <td>
                <a href="#/spec/Sisk/Core/Http/HttpRequest/FullPath">
                    FullPath
                </a>
            </td>
            <td>
                Gets the request path and the query string.
            </td>
            <td>
                <code>/user/login?email=foo@bar.com</code>
            </td>
        </tr>
        <tr>
            <td>
                <a href="#/spec/Sisk/Core/Http/HttpRequest/FullUrl">
                    FullUrl
                </a>
            </td>
            <td>
                Gets the entire URL request string.
            </td>
            <td>
                <code>http://localhost:5000/user/login?email=foo@bar.com</code>
            </td>
        </tr>
        <tr>
            <td>
                <a href="#/spec/Sisk/Core/Http/HttpRequest/Host">
                    Host
                </a>
            </td>
            <td>
                Gets the request host.
            </td>
            <td>
                <code>localhost</code>
            </td>
        </tr>
        <tr>
            <td>
                <a href="#/spec/Sisk/Core/Http/HttpRequest/Authority">
                    Authority
                </a>
            </td>
            <td>
                Gets the request host and port.
            </td>
            <td>
                <code>localhost:5000</code>
            </td>
        </tr>
        <tr>
            <td>
                <a href="#/spec/Sisk/Core/Http/HttpRequest/QueryString">
                    QueryString
                </a>
            </td>
            <td>
                Gets the request query.
            </td>
            <td>
                <code>?email=foo@bar.com</code>
            </td>
        </tr>
        <tr>
            <td>
                <a href="#/spec/Sisk/Core/Http/HttpRequest/Query">
                    Query
                </a>
            </td>
            <td>
                Gets the request query in an named value collection.
            </td>
            <td>
                <code>{NameValueCollection object}</code>
            </td>
        </tr>
        <tr>
            <td>
                <a href="#/spec/Sisk/Core/Http/HttpRequest/IsSecure">
                    IsSecure
                </a>
            </td>
            <td>
                Determines if the request is using SSL (true) or not (false).
            </td>
            <td>
                <code>false</code>
            </td>
        </tr>
    </tbody>
</table>

## Getting the request body

Some requests include body such as forms, files, or API transactions. You can get the body of a request from the property:

```cs
// gets the request body as an string, using the request encoding
string body = request.Body;
// or gets it in byte[]
byte[] bodyBytes = request.RawBody;
```

It is also possible to determine if there is a body in the request and if it is loaded with the properties [HasContents](/spec/Sisk/Core/Http/HttpRequest/HasContents), which determines if the request has contents and [IsContentAvailable](/spec/Sisk/Core/Http/HttpRequest/IsContentAvailable) which indicates that the HTTP server fully received the content from the remote point.

> Sisk follows the RFC 9110 "HTTP Semantics", which doens't allow certain requests methods to have body. These requests will immediately drop an 400 (Bad Request) with the `ContentServedOnIllegalMethod` status. Requests with bodies are not allowed in methods GET, OPTIONS, HEAD and TRACE. You can read the [RFC 9910](https://httpwg.org/specs/rfc9110.html) here.
> 
> You can disable this feature by turning [ThrowContentOnNonSemanticMethods](http://localhost:5151/#/spec/Sisk/Core/Http/HttpServerFlags) to `false`.

## Getting the request context

The HTTP Context is an exclusive Sisk object that stores HTTP server, route, router and request handler information. You can use it to be able to organize yourself in an environment where these objects are difficult to organize.

The [RequestBag](/spec/Sisk/Core/Http/HttpContext/RequestBag) object contains stored information that is passed from an request handler to another point, and can be consumed at the final destination. This object can also be used by request handlers that run after the route callback.

```cs
public class AuthenticateUserRequestHandler : IRequestHandler
{
    public string Identifier { get; init; } = Guid.NewGuid().ToString();
    public RequestHandlerExecutionMode ExecutionMode { get; init; } = RequestHandlerExecutionMode.BeforeResponse;

    public HttpResponse? Execute(HttpRequest request, HttpContext context)
    {
        if (request.Headers["Authorization"] != null)
        {
            context.RequestBag.Add("AuthenticatedUser", "Bob");
            return null;
        }
        else
        {
            return new HttpResponse(System.Net.HttpStatusCode.Unauthorized);
        }
    }
}
```

The above request handler will define `AuthenticatedUser` in the request bag, and can be consumed later in the final callback:

```cs
public class MyController
{
    [Route(RouteMethod.Get, "/")]
    [RequestHandler(typeof(AuthenticateUserRequestHandler))]
    static HttpResponse Index(HttpRequest request)
    {
        HttpResponse res = new HttpResponse();
        string authUser = request.Context.RequestBag["AuthenticatedUser"];
        res.Content = new StringContent($"Hello, {authUser}!");
        return res;
    }
}
```

## Getting form data

You can get the values of a form data in an [NameValueCollection](https://learn.microsoft.com/pt-br/dotnet/api/system.collections.specialized.namevaluecollection) with the example below:

```cs
static HttpResponse Index(HttpRequest request)
{
    var formData = request.GetFormContent();
}
```

This method does not supports interpreting arrays as multiple fields ending in `[]` as some HTTP servers do.

## Getting multipart form data

Sisk's HTTP request lets you get uploaded multipart contents, such as a files, form fields, or any binary content.

```cs
static HttpResponse Index(HttpRequest request)
{
    var multipartFormDataObjects = request.GetMultipartFormContent();

    foreach (MultipartObject uploadedObject in multipartFormDataObjects) {
        // The name of the file provided by Multipart form data. Null is returned if the object is not a file.
        Console.WriteLine("File name       : " + uploadedObject.Filename);
        // The multipart form data object field name.
        Console.WriteLine("Field name      : " + uploadedObject.Name);
        // The multipart form data content length.
        Console.WriteLine("Content length  : " + uploadedObject.ContentLength);
        // Determine the image format based in the file header for each image content type.
        // If the content ins't an recognized image format, this method below will return
        // MultipartObjectImageFormat.Unknown
        Console.WriteLine("Image format    : " + uploadedObject.GetImageFormat());
    }
}
```

You can read more about Sisk [Multipart form objects](/spec/Sisk/Core/Entity/MultipartObject) and it's methods, properties and functionalities.

## Server-sent events support

Sisk supports [Server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events), which allows sending chunks as an stream and keeping the connection between the server and the client alive.

Calling the [HttpRequest.GetEventSource](/spec/Sisk/Core/Http/HttpRequest/GetEventSource--) method will put the HttpRequest in it's listener state. From this, the context of this HTTP request will not expect an HttpResponse as it will overlap the packets sent by server side events.

After sending all packets, the callback must return the [Close](/spec/Sisk/Core/Http/HttpRequestEventSource/Close--) method, which will send the final response to the server and indicate that the streaming has ended.

It's not possible to predict what the total length of all packets that will be sent, so it is not possible to determine the end of the connection with `Content-Length` header.

By most browsers defaults, server-side events does not support sending HTTP headers or methods other than the GET method. Therefore, be careful when using request handlers with event-source requests that require specific headers in the request, as it probably they ins't going to have them.

Also, most browsers restart streams if the [EventSource.close](https://developer.mozilla.org/en-US/docs/Web/API/EventSource/close) method ins't called on the client side after receiving all the packets, causing infinite additional processing on the server side. To avoid this kind of problem, it's common to send an final packet indicating that the event source has finished sending all packets.

The example below shows how the browser can communicate with the server that supports Server-side events.

```html
<html>
    <body>
        <b>Fruits:</b>
        <ul></ul>
    </body>
    <script>
        const evtSource = new EventSource('/event-source');
        const eventList = document.querySelector('ul');

        evtSource.onmessage = (e) => {
            const newElement = document.createElement("li");

            newElement.textContent = `message: ${e.data}`;
            eventList.appendChild(newElement);

            if (e.data == "Tomato") {
                evtSource.close();
            }
        }
    </script>
</html>
```

And progressively send the messages to the client:

```cs
public class MyController
{
    [Route(RouteMethod.Get, "/event-source")]
    static HttpResponse ServerEventsResponse(HttpRequest request)
    {
        var serverEvents = request.GetEventSource();

        string[] fruits = new[] { "Apple", "Banana", "Watermelon", "Tomato" };

        foreach (string fruit in fruits)
        {
            serverEvents.Send(fruit);
            Thread.Sleep(1500);
        }

        return serverEvents.Close();
    }
}
```

When running this code, we expect a result similar to this:

<img src="/assets/server side events demo.gif" class="center" />

## Resolving proxied IPs and hosts

Sisk can be used with proxies, and therefore IP addresses can be replaced by the proxy endpoint in the transaction from a client to the proxy.

By default, most proxies send a header named `X-Forwarded-For` indicating the real IP of the connecting client. Sisk has properties that resolve these headers to the properties of a request.

You can also do this for the host if it is forwarded.

To activate this, when configuring your HTTP server, make sure this property is defined:

```cs
HttpServerConfiguration confg = new HttpServerConfiguration();
confg.ResolveForwardedOriginAddress = true; // will resolve the first X-Forwarded-For address entry
confg.ResolveForwardedOriginHost = true;
```

In case of [ResolveForwardedOriginHost](/spec/Sisk/Core/Http/HttpServerConfiguration/ResolveForwardedOriginHost) and an `X-Forwarded-Host` header is present, the value of this header will be used for server-side DNS matching.