# Getting started with Sisk

Sisk can run in any .NET environment. In this example, we'll teach you how to create a Sisk application using .NET. If you haven't installed it yet, install the SDK from [here](https://dotnet.microsoft.com/en-us/download/dotnet/7.0).

In this example, we'll teach you how to create a project structure, receive a request, obtain a URL parameter and send a response. This tutorial will be entirely teaching how to build a simple server using C#. You can also write in your favorite language.

> You may be interested on an quickstarter project. Check [this repository](https://github.com/sisk-http/quickstart) for more info.

## Creating an project

Let's name our project "My Sisk application". When you're ready with .NET, we can create our project with:

```bash
> dotnet new console -n my-sisk-application
```

After that, we can install Sisk with the `dotnet` utility tool.

```bash
> cd my-sisk-application
> dotnet add package Sisk.HttpServer
```

You can see another ways to install Sisk in your project [here](https://www.nuget.org/packages/Sisk.HttpServer/).

Now let's create an instance of our HTTP server. As a matter of principle, let's make it listen on port 5000.

> Windows would ask for elevated privileges since Sisk listens to all incoming hosts. This is required to match multiple hosts patterns in the host server.

## Requests and responses

The request and response model is simple: for every request there must be a response. In Sisk ins't different. Let's create a method that responds with a Hello World response in HTML, specifying the code and headers.

```cs
// Program.cs
using Sisk.Core.Http;
using Sisk.Core.Routing;

static HttpResponse IndexPage(HttpRequest request)
{
    HttpResponse indexResponse = new HttpResponse();
    indexResponse.Status = System.Net.HttpStatusCode.OK;
    indexResponse.Content = new StringContent(@"
        <html>
            <body>
                <h1>Hello, world!</h1>
            </body>
        </html>
    ", System.Text.Encoding.UTF8, "text/html");

    return indexResponse;
}
```

The next step is to associate this method with an HTTP route.

## Routers

Routers are the abstraction of requests routes and the bridge between requests and responses for the service. Routers are responsible for managing service routes, functions and errors.

A router can have several routes and each route has a different operation to work on that path, such as executing a function, serving a page or a resource from the server.

Let's create our first router and associate our method `IndexPage` to the index path.

```cs
Router mainRouter = new Router();

// SetRoute will associate all index routes to our method.
mainRouter.SetRoute(RouteMethod.Get, "/", IndexPage);
```

Now our router can receive and send responses. But `mainRouter` is not tied to a host or a server, so it will not work on its own. For this, the next step is to create our `ListeningHost`.

## Listening Hosts

Listening Hosts are objects responsible for representing an application or service on the Sisk HTTP server. It is the highest layer of a service that is not always accessible by self.

We can create a `ListeningHost` that listens to port 5000 on localhost and associate our newly created router with it.

```cs
ListeningHost myHost = new ListeningHost("localhost", 5000, mainRouter);
```

To better understand this relationship, this diagram explains the hierarchy from a route to the Listening Host.

<img src="/assets/listeninghostdiagram.png" class="center" />

Now we have our ListeningHost and we need to associate it with some HTTP Server. It's time to start building our `HttpServer` and their `HttpServerConfiguration`.

## Server configuration

Server configuration is responsible for most of the behavior of the HTTP server itself. In it we can associate ListeningHosts to our server.

```cs
HttpServerConfiguration confg = new HttpServerConfiguration();
confg.ListeningHosts.Add(myHost); // add our ListeningHost to this server configuration
```

And then we can create our HTTP server:

```cs
HttpServer server = new HttpServer(confg);
server.Start(); // starts the server
Console.ReadKey(); // prevents from exiting
```

Now we can compile our executable and run our HTTP server with the command:

```bash
> dotnet watch
```

At runtime, open your browser and navigate to our server path, and you should see:

<img src="/assets/localhost.png" class="center" />

Congrats! You made your first Sisk web application. See nexts steps to learn more of Sisk to creating powerful applications with .NET and Sisk.