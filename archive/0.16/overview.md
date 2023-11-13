# Sisk 0.16

This version of Sisk is preparation for the first post-beta release that precedes version 1.0. It includes improvements to extend Sisk, streamline development, and general improvements to AOT deployment.

## Breaking Changes

A radical change is regarding the Service Providers extension, which is no longer maintained as of version 0.16. Instead, it is now built into the Sisk.Core package. The Sisk.ServiceProvider package will still be kept for version 0.15 indefinitely.

There are changes to how to adapt code that used Sisk.ServiceProviders at its core to work in version 0.16. For more information, [please read this](./service-providers-migration.md).

Some methods and types have had their signatures modified, but are still compatible with the previous signature. [List all small changes here.](./small-changes.md)

## Create faster applications with the new HTTP builder pattern

In this release, a new approach to creating Sisk applications has been introduced, aiming to enhance the development experience and simplify the application setup process.

Developers can now create Sisk applications without the need for manual usage of HttpServer.Emit or extensive component creation. The new method adopts a configuration style similar to ServiceProvider but eliminates the dependency on an external configuration file.

Updated example:

```cs
using Sisk.Core.Http;
using Sisk.Core.Routing;

class Program
{
    const string LISTENING_PORT = "http://localhost:5000/";

    static void Main(string[] args)
    {
        var app = HttpServer.CreateBuilder(builder =>
        {
            builder.UseListeningPort(LISTENING_PORT);
        });

        app.Router.SetRoute(RouteMethod.Get, "/", request =>
        {
            return new HttpResponse().WithContent("Hello, world!");
        });

        app.Start();
    }
}
```

This feature not only simplifies the process of constructing Sisk applications but also sets the stage for future improvements. It alsos eliminate the need for installing the Sisk.ServiceProviders package, providing developers with a more unified and efficient application creation experience. [Read this](./service-providers-migration.md) too see how this new builder pattern can entirely replace your ServiceProvider stack.

## Extending Sisk with HTTP Server Handlers

Introducing the HTTP Server Handlers feature in Sisk version 0.16, designed to extend the overall behavior of Sisk and provide additional extensions for seamless integration with various aspects, including HTTP requests, routers, context bags, and more. This feature aims to enhance the flexibility of working with Sisk by concentrating events that occur throughout the lifetime of the entire HTTP server and individual requests.

The HttpServerHandler class serves as the core component for handling various events related to the HTTP server. It facilitates the integration of essential extensions and customizations to meet the specific needs of developers. The primary events covered by this feature are:

For now, the HttpServerHandler class supports handling these events:

```cs
public class HttpServerHandler
{
    // Event triggered during the setup of the HTTP server
    public virtual void OnSetupHttpServer(HttpServer server) { }

    // Event triggered during the setup of the router
    public virtual void OnSetupRouter(Router router) { }

    // Event triggered when a new context bag is created
    public virtual void OnContextBagCreated(HttpContextBagRepository contextBag) { }

    // Event triggered when a new HTTP request is opened
    public virtual void OnHttpRequestOpen(HttpRequest request) { }

    // Event triggered when an HTTP request is closed, providing the execution result
    public virtual void OnHttpRequestClose(HttpServerExecutionResult result) { }

    // Event triggered in case of an exception during processing
    public virtual void OnException(Exception exception) { }
}
```

Developers can leverage these events to implement custom sessions, manage contexts, establish database connections, and integrate other useful providers to enhance their workflow within the Sisk framework.

This feature empowers developers to tailor the behavior of the Sisk Framework, making it more adaptable and versatile for a wide range of applications.

## Support for Async Route Actions and RequestHandlers

Finally! In Sisk version 0.16, we are thrilled to introduce support for asynchronous route actions, empowering developers to use asynchronous functions for your routes. This improvement streamlines the development of services that leverage asynchronous functions within the same thread context, eliminating the need to create multiple tasks for the same request.

You don't need to setup anything, just start using your `Task<HttpResponse>` and start writing your async actions on the fly.

```cs
public class MyController
{
    [RouteGet("/")]
    public async Task<string> Index(HttpRequest request)
    {
        await Task.Delay(1);
        return "Hello, world!";
    }
}
```

Now developers can now seamlessly integrate asynchronous operations into their route methods, leading to more responsive and scalable Sisk applications. This enhancement is designed to improve the overall development experience by aligning with modern programming paradigms that favor asynchronous programming for increased performance.

It alsos features the new abstract class AsyncRequestHandler, which implements IRequestHandler. This class allows Execute() to load an asynchronous method for executing the middleware.

## Auto setup routes with Router autoscanner

Introducing the Router AutoScanner in Sisk version 0.16, this utility that automates the discovery and instantiation of modules implementing the RouterModule class. This feature simplifies the process of integrating modules into the router.

The main highlights are:

- AutoScanModules<T> Method: The router.AutoScanModules<T>() method searches the assembly for types that inherit from T (in this case, RouterModule). This allows for dynamic discovery and instantiation of modules.
- Assembly Specification: Developers have the option to specify the assembly to be scanned, providing flexibility in module discovery. For instance, router.`AutoScanModules<AppModule>(Assembly.GetExecutingAssembly())` allows precise control over the assembly scanning process.
- Equivalent to Manual Module Set-Up: The AutoScanner is equivalent to manually setting up modules using the SetObject method. It creates an instance of each type implementing `<T>` and executes this process only once during program startup.

```cs
// AutoScan AppModule and its subclasses in the executing assembly
router.AutoScanModules<AppModule>();

// Alternatively, specify the assembly for module scanning
router.AutoScanModules<AppModule>(Assembly.GetExecutingAssembly());

// Or you can call it in your CreateBuilder context
var app = HttpServer.CreateBuilder(host =>
{
    host.UseAutoScan<MyAppModule>();
});
```

> **Note**
> AutoScanner is not compatible with Ahead-of-Time (AOT) compilation due to its reliance on scanning for types in the assembly, which might be trimmed during AOT compilation.

## More features

And more features which is documented in the [Github Projects](https://github.com/orgs/sisk-http/projects/1) page.

Thank you for using Sisk.