# Http server handlers

In Sisk version 0.16, we've introduced the `HttpServerHandler` class, which aims to extend the overral Sisk behavior and provide additional extensions in order to working with Sisk, such as handling Http requests, routers, context bags and more.

The class concentrates events that occur during the lifetime of the entire HTTP server and also of a request. The Http protocol does not have sessions, and therefore it is not possible to preserve information from one request to another. Sisk for now provides a way for you to implement sessions, contexts, database connections and other useful providers to help your work.

The events are:

```cs
public class HttpServerHandler
{
    public virtual void OnSetupHttpServer(HttpServer server) { }
    public virtual void OnSetupRouter(Router router) { }
    public virtual void OnContextBagCreated(HttpContextBagRepository contextBag) { }
    public virtual void OnHttpRequestOpen(HttpRequest request) { }
    public virtual void OnHttpRequestClose(HttpServerExecutionResult result) { }
    public virtual void OnException(Exception exception) { }
}
```

Please refer to [this page](/read?q=/contents/spec/Sisk.Core.Http.Handlers.HttpServerHandler.md) to read where each method is triggered and what its purpose is. You can also view the [lifecycle of an HTTP request](/read?q=/contents/docs/advanced/request-lifecycle.md) to understand what happens with a request and where events are fired. The HTTP server allows you to use multiple handlers at the same time. Each event call is synchronous, that is, it will blocked the current thread for each request or context until all handlers associated with that function are executed and completed.

Unlike RequestHandlers, they cannot be applied to some route groups or specific routes. Instead, they are applied to the entire Http server. You can apply conditions within your Http Server Handler. Furthermore, singletons of each HttpServerHandler are defined for every Sisk application, so only one instance per `HttpServerHandler` is defined.

A practical example of using HttpServerHandler is to automatically dispose a database connection at the end of the request.

```cs
// DatabaseConnectionHandler.cs

public class DatabaseConnectionHandler : HttpServerHandler
{
    public override void OnHttpRequestClose(HttpServerExecutionResult result)
    {
        var requestBag = result.Request.Context.RequestBag;

        // checks if the request has defined an DbContext
        // in it's context bag
        if (requestBag.IsSet<DbContext>())
        {
            var db = requestBag.Get<DbContext>();
            db.Dispose();
        }
    }
}

public static class DatabaseConnectionHandlerExtensions
{
    // allows the user to create an dbcontext from an http request
    // and store it in its request bag
    public static DbContext GetDbContext(this HttpRequest request)
    {
        var db = new DbContext();
        return request.SetContextBag<DbContext>(db);
    }
}
```

With the code above, the `GetDbContext` extension allows a connection context to be created directly from the HttpRequest object. An undisposed connection can cause problems when running with the database, so it is terminated in `OnHttpRequestClose`.

You can register a handler on an Http server in your builder or directly with [HttpServer.RegisterHandler](/read?q=/contents/spec/Sisk.Core.Http.HttpServer.RegisterHandler().md).

```cs
// Program.cs

class Program
{
    static void Main(string[] args)
    {
        var app = HttpServer.CreateBuilder(host =>
        {
            host.UseHandler<DatabaseConnectionHandler>();
        });

        app.Router.SetObject(new UserController());
        app.Start();
    }
}
```

With this, the `UsersController` class can make use of the database context as:

```cs
// UserController.cs

[RoutePrefix("/users")]
public class UserController : ApiController
{
    [RouteGet("/")]
    public async Task<HttpResponse> List(HttpRequest request)
    {
        var db = request.GetDbContext();
        var users = db.Users.ToArray();

        return JsonOk(users);
    }

    [RouteGet("/<id>")]
    public async Task<HttpResponse> View(HttpRequest request)
    {
        var db = request.GetDbContext();

        var userId = request.GetQueryValue<int>("id");
        var user = db.Users.FirstOrDefault(u => u.Id == userId);

        return JsonOk(user);
    }

    [RoutePost]
    public async Task<HttpResponse> Create(HttpRequest request)
    {
        var db = request.GetDbContext();
        var user = JsonSerializer.Deserialize<User>(request.Body);

        ArgumentNullException.ThrowIfNull(user);

        db.Users.Add(user);
        await db.SaveChangesAsync();

        return JsonMessage("User added.");
    }
}
```

The code above uses methods like `JsonOk` and `JsonMessage` that are built into `ApiController`, which is inherited from a `RouterController`:

```cs
// ApiController.cs

public class ApiController : RouterModule
{
    public HttpResponse JsonOk(object value)
    {
        return new HttpResponse(200)
            .WithContent(JsonContent.Create(value, null, new JsonSerializerOptions()
            {
                 PropertyNameCaseInsensitive = true
            }));
    }

    public HttpResponse JsonMessage(string message, int statusCode = 200)
    {
        return new HttpResponse(statusCode)
            .WithContent(JsonContent.Create(new
            {
                Message = message
            }));
    }
}
```