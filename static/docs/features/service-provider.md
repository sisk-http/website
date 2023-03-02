# Service Provider

Service Providers are a simple way to port your application in different environments and configurations easily without having to change your code for it. The [ServiceProvider](/spec/Sisk/Provider/ServiceProvider) class is accessible by type that sets an application with your router, configuration and other settings already available on Sisk.

Service Providers managed by a JSON file of settings that is read by the application that is close to its executable. This is a example service setting file:

```json
{
    "Server": {
        "DefaultEncoding": "UTF-8",
        "ThrowExceptions": true,
        "IncludeRequestIdHeader": true
    },
    "ListeningHost": {
        "Label": "My sisk application",
        "Hostname": "localhost",
        "Ports": [
            {
                "Port": 5555,
                "Secure": false
            }
        ],
        "CrossOriginResourceSharingPolicy": {
            "AllowOrigins": [ "*" ],
            "AllowMethods": [ "*" ],
            "AllowHeaders": [ "*" ],
            "MaxAge": 3600
        },
        "Parameters": {
            "MySqlConnection": "server=localhost;user=root;"
        }
    }
}
```

This file is read alongside the server executable, regardless of the build platform. By default the file name is `service-config.json` and must stay at the same directory of the output executeable.
It is also possible to change the file name by tweaking the [ServiceProvider](/spec/Sisk/Provider/ServiceProvider) class.

> Tip: in Sisk service provider configuration files it's allowed to write `// single` or `/* multi-line comments */`, as they are ignored by the interpreter.

## Creating an service provider instance

In this session we will learn how to configure the application to run a Sisk service provider. First of all, you will need to have the latest version of Sisk installed in your project. See [how to install here](/installing).

First let's configure an RouterFactory class instance that will be configured and will emit a router. This class is not the entry point of the application, but nevertheless it is the object that will run the runtime objects.

```cs
internal class Application : RouterFactory
{
    public string MySqlConnection { get; set; }

    // Below we indicate to the router to look for the routes in our application instance. 
    // You can define the routes on another object or type as well.
    public override Router BuildRouter()
    {
        Router r = new Router();
        r.SetObject(this);
        return r;
    }

    // In setupParameters, we can have the parameters set in the parameters section of our json.
    public override void Setup(NameValueCollection setupParameters)
    {
        this.MySqlConnection = setupParameters["MySqlConnection"] ?? throw new ArgumentNullException(nameof("MySqlConnection"));
    }

    [Route(RouteMethod.Get, "/")]
    public HttpResponse IndexPage(HttpRequest request)
    {
        HttpResponse htmlResponse = new HttpResponse();
        htmlResponse.Content = new StringContent("Hello, world!", System.Text.Encoding.UTF8, "text/plain");
        return htmlResponse;
    }
}
```

Now, we can configure a service in our program entry point:

```cs
public class Program
{
    public static Application App { get; set; }

    static void Main(string[] args)
    {
        App = new Application();
        ServiceProvider provider = new ServiceProvider(App);
        provider.Initialize(true); // true indicates that the application will support hot reload
        provider.Wait();           // prevents hauting
    }
}
```

Now our application is ready to be started with a JSON file configuring the ports, methods, hostnames and parameters.

## Configuration file structure

The JSON file is composed of the properties:

| | |-|
|-|-|-|
|Server|Required|Represents the server itself with their settings.|
|Server.AccessLogsStream|Optional|Default to `console`. Specifies the access log output stream. Can be an filename, `null` or `console`.|
|Server.ErrorsLogsStream|Optional|Default to `null`. Specifies the error log output stream. Can be an filename, `null` or `console`.|
|Server.ResolveForwardedOriginAddress|Optional|Default to `false`. Specifies if the HTTP server should resolve the `X-Forwarded-For` header to the user IP. (Recommended for proxy servers)|
|Server.ResolveForwardedOriginHost|Optional|Default to `false`. Specifies if the HTTP server should resolve the `X-Forwarded-Host` header to the server host.|
|Server.DefaultEncoding|Optional|Default to `UTF-8`. Specifies the default text encoding used by the HTTP server.|
|Server.MaximumContentLength|Optional|Default to `0`. Specifies the maximum content length in bytes. Zero means infinite.|
|Server.IncludeRequestIdHeader|Optional|Default to `false`. Specifies if the HTTP server should send the `X-Request-Id` header.|
|Server.ThrowExceptions|Optional|Default to `true`. Specifies if unhandled exceptions should be thrown. Set to `false` when production and `true` when debugging.|
|ListeningHost|Required|Represents the server listening host.|
|ListeningHost.Hostname|Required|Represents the HTTP server listening hostname.|
|ListeningHost.Label|Optional|Represents the application label.|
|ListeningHost.Ports|Required|Represents an array of listening ports.|
|ListeningHost.Ports[*].Port|Required|Specifies the port number.|
|ListeningHost.Ports[*].Secure|Required|Specifies if this port should be listened with HTTPS (`true`) or HTTP (`false`).|
|ListeningHost.CrossOriginResourceSharingPolicy|Optional|Setup the CORS headers for the application.|
|ListeningHost.CrossOriginResourceSharingPolicy.AllowCredentials|Optional|Defaults to `false`. Specifies the `Allow-Credentials` header.|
|ListeningHost.CrossOriginResourceSharingPolicy.ExposeHeaders|Optional|Defaults to `null`. This property expects an array of strings. Specifies the `Expose-Headers` header.|
|ListeningHost.CrossOriginResourceSharingPolicy.AllowOrigins|Optional|Defaults to `null`. This property expects an array of strings. Specifies the `Allow-Origins` header.|
|ListeningHost.CrossOriginResourceSharingPolicy.AllowMethods|Optional|Defaults to `null`. This property expects an array of strings. Specifies the `Allow-Methods` header.|
|ListeningHost.CrossOriginResourceSharingPolicy.AllowHeaders|Optional|Defaults to `null`. This property expects an array of strings. Specifies the `Allow-Headers` header.|
|ListeningHost.CrossOriginResourceSharingPolicy.MaxAge|Optional|Defaults to `null`. This property expects an interger. Specifies the `Max-Age` header in seconds.|
|ListeningHost.Parameters|Optional|Specifies the properties provided to the application setup method.|

You can see an example of how to use each property at the top of this page.