# Request handling

Request handlers are functions that run before and after a request is executed on the router. They can be defined per route or per router.

There are two types of request handlers:

- **Before requests**: defines that the request handler will be executed BEFORE calling the router callback.
response with it's own response.
- **After response**: defines that the request handler will be executed AFTER calling the router callback.

Both requests handlers can override the actual router callback function response. By the way, request handlers can be useful for validating a request, such as authentication, content, or any other information, such as storing information, logs, or other steps that can be performed before or after a response.

<img src="/assets/requesthandlers1.png" class="center" />

This way, a request handler can interrupt all this execution and return a response before finishing the cycle, discarding everything else in the process.

Example: let's assume that a user authentication request handler does not authenticate him. It will prevent the request lifecycle from being continued and will hang. If this happens in the request handler at position two, the third and onwards will not be evaluated.

<img src="/assets/requesthandlers2.png" class="center" />

## Creating an request handler

To create a request handler, we can create a class that inherits the [IRequestHandler](/spec/Sisk/Core/Routing/Handlers/IRequestHandler) interface, in this format:

```cs
public class AuthenticateUserRequestHandler : IRequestHandler
{
    public string Identifier { get; init; } = Guid.NewGuid().ToString();
    public RequestHandlerExecutionMode ExecutionMode { get; init; } = RequestHandlerExecutionMode.BeforeResponse;

    public HttpResponse? Execute(HttpRequest request, HttpContext context)
    {
        if (request.Headers["Authorization"] != null)
        {
            // Returning null indicates that the request cycle can be continued
            return null;
        }
        else
        {
            // Returning an HttpResponse object indicates that this response will overwrite adjacent responses.
            return new HttpResponse(System.Net.HttpStatusCode.Unauthorized);
        }
    }
}
```

In the above example, we indicated that if the "Authorization" header is present in the request, it should continue and the next request handler or the router callback should be called, whichever comes next. If it's a request handler is executed after the response by their property [ExecutionMode](/spec/Sisk/Core/Routing/Handlers/IRequestHandler/ExecutionMode) and return an non-null value, it will overwrite the router's response.

Whenever a Request Handler returns `null`, it indicates that the request must continue and the next object must be called or the cycle must end with the router's response.

## Associating a request handler with a single route

You can define one or more request handlers for a route.

```cs
mainRouter.SetRoute(RouteMethod.Get, "/", IndexPage, "", new IRequestHandler[]
{
    new AuthenticateUserRequestHandler(),     // before request handler
    new ValidateJsonContentRequestHandler(),  // before request handler
    //                                        <-- method IndexPage will be executed here
    new WriteToLogRequestHandler()            // after request handler
});
```

Or creating an [Route](/spec/Sisk/Core/Routing/Route) object:

```cs
Route indexRoute = new Route(RouteMethod.Get, "/", "", IndexPage, null);
indexRoute.RequestHandlers = new IRequestHandler[]
{
    new AuthenticateUserRequestHandler()
};
mainRouter.SetRoute(indexRoute);
```

## Associating a request handler with a router

You can define a global request handler that will runned on all routes on a router.

```cs
mainRouter.GlobalRequestHandlers = new IRequestHandler[]
{
    new AuthenticateUserRequestHandler()
};
```

## Associating a request handler with an attribute

You can define a request handler on a method attribute along with a route attribute.

```cs
public class MyController
{
    [Route(RouteMethod.Get, "/")]
    [RequestHandler(typeof(AuthenticateUserRequestHandler))]
    static HttpResponse Index(HttpRequest request)
    {
        HttpResponse res = new HttpResponse();
        res.Content = new StringContent("Hello world!");
        return res;
    }
}
```

Note that it is necessary to pass the desired request handler type and not an object instance. That way, the request handler will be instantiated by the router parser. You can pass arguments in the class constructor with the [ConstructorArguments](/spec/Sisk/Core/Routing/RequestHandlerAttribute/ConstructorArguments) property.

Example:

```cs
[RequestHandler(typeof(AuthenticateUserRequestHandler), ConstructorArguments = new object?[] { "arg1", 123, ... })]
static HttpResponse Index(HttpRequest request)
{
    HttpResponse res = new HttpResponse();
    res.Content = new StringContent("Hello world!");
    return res;
}
```

## Bypassing an global request handler

After defining a global request handler on a route, you can ignore this request handler on specific routes.

```cs
var myRequestHandler = new AuthenticateUserRequestHandler();
mainRouter.GlobalRequestHandlers = new IRequestHandler[]
{
    myRequestHandler
};

mainRouter.SetRoute(new Route(RouteMethod.Get, "/", "My route", IndexPage, null)
{
    BypassGlobalRequestHandlers = new IRequestHandler[]
    {
        myRequestHandler,                    // ok: the same instance of what is in the global request handlers
        new AuthenticateUserRequestHandler() // wrong: will not skip the global request handler
    }
});
```

> Note that if you bypassing a request handler you must use the same instance of what you instanced before to skip. Creating another request handler instance will not skip the global request handler since it's identifier will change. Remember to use the same request handler instance used in GlobalRequestHandlers and BypassGlobalRequestHandlers.