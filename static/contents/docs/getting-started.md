# Getting started with Sisk

Sisk can run in any .NET environment. In this example, we'll teach you how to create a Sisk application using .NET. If you haven't installed it yet, install the SDK from [here](https://dotnet.microsoft.com/en-us/download/dotnet/7.0).

In this example, we'll teach you how to create a project structure, receive a request, obtain a URL parameter and send a response. This tutorial will be entirely teaching how to build a simple server using C#. You can also write in your favorite language.

> **Tip**:
>
> You may be interested on an quickstarter project. Check [this repository](https://github.com/sisk-http/quickstart) for more info.

## Creating an project

Let's name our project "My Sisk application". When you're ready with .NET, we can create our project with:

    dotnet new console -n my-sisk-application

After that, we can install Sisk with the dotnet utility tool.

    cd my-sisk-application
    dotnet add package Sisk.HttpServer

You can see another ways to install Sisk in your project [here](https://www.nuget.org/packages/Sisk.HttpServer/).

Now let's create an instance of our HTTP server. As a matter of principle, let's make it listen on port 5000.

# Building the Http server

Sisk allows you to build your application step by step manually, since the router to the HttpServer object, but it may not be very convenient for most projects. Because of this, we can use the builder method which is easier to get our app live.

```cs
class Program
{
    static void Main(string[] args)
    {
        var app = HttpServer.CreateBuilder(host =>
        {
            host.UseListeningPort("http://localhost:5000/");
        });

        app.Router.SetRoute(RouteMethod.Get, "/", request =>
        {
            return new HttpResponse()
                .WithStatus(200)
                .WithContent("Hello, world!");
        });

        app.Start();
    }
}
```

But it's interesting to understand each vital component of Sisk. Later in this document you will understand a little about how Sisk works.

# Manually creating your app

In this topic we will create our Http server without any standards, in a completely abstract way. Here you can manually build how your Http server will work. Each ListeningHost has a router, and an Http server can have multiple ListeningHosts, each pointing to a different host on a different port.

Firstly, we need to understand the request/response concept. It is pretty simple: for every request there must be a response. In Sisk ins't different. Let's create a method that responds with a Hello World response in HTML, specifying the code and headers.

```cs
// Program.cs
using Sisk.Core.Http;
using Sisk.Core.Routing;

static HttpResponse IndexPage(HttpRequest request)
{
    HttpResponse indexResponse = new HttpResponse();
    indexResponse.Status = System.Net.HttpStatusCode.OK;
    indexResponse.Content = new HtmlContent(@"
        <html>
            <body>
                <h1>Hello, world!</h1>
            </body>
        </html>
    ");

    return indexResponse;
}
```

The next step is to associate this method with an HTTP route.

# Routers

Routers are the abstraction of requests routes and the bridge between requests and responses for the service. Routers are responsible for managing service routes, functions and errors.

A router can have several routes and each route has a different operation to work on that path, such as executing a function, serving a page or a resource from the server.

Let's create our first router and associate our method IndexPage to the index path.

```cs
Router mainRouter = new Router();

// SetRoute will associate all index routes to our method.
mainRouter.SetRoute(RouteMethod.Get, "/", IndexPage);
```

Now our router can receive and send responses. But mainRouter is not tied to a host or a server, so it will not work on its own. For this, the next step is to create our ListeningHost.

# Listening Hosts and ports

A [ListeningHost](/read?q=/contents/spec/Sisk.Core.Http.ListeningHost) can host a router and multiple listening ports to the same router. A [ListeningPort](/read?q=/contents/spec/Sisk.Core.Http.ListeningPort) is
a prefix where the HTTP server will listen.

Here we can create an ListeningHost which points two endpoints to our router:

```cs
ListeningHost myHost = new ListeningHost();
host.Router = new Router();
host.Ports = new ListeningPort[]
{
    new ListeningPort("http://localhost:5000/")
};
```

Now our HTTP server will listen to the endpoints above and redirects it's requests to our router.

# Server configuration

Server configuration is responsible for most of the behavior of the HTTP server itself. In it we can associate ListeningHosts to our server.

```cs
HttpServerConfiguration confg = new HttpServerConfiguration();
confg.ListeningHosts.Add(myHost); // add our ListeningHost to this server configuration
```

And then we can create our HTTP server:

```cs
HttpServer server = new HttpServer(confg);
server.Start();    // starts the server
Console.ReadKey(); // prevents from exiting
```

Now we can compile our executable and run our HTTP server with the command:

```bash
$ dotnet watch
```

At runtime, open your browser and navigate to our server path, and you should see:

<img src="/assets/img/localhost.png" >