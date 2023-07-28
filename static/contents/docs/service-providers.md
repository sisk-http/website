# Service Providers

Service Providers are a simple way to port your application in different environments and configurations easily without having to change your code for it. The [ServiceProvider](/read?q=/contents/Sisk/Provider/ServiceProvider) class is accessible by type that sets an application with your router, configuration and other settings already available on Sisk.

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
        "Ports": [
            "http://localhost:80/",
            "https://localhost:443/",  // Configuration files also supports comments
        ],
        "CrossOriginResourceSharingPolicy": {
            "AllowOrigin": "*",
            "AllowOrigins": [ "*" ],   // new on 0.14
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

This file is read alongside the server executable, regardless of the build platform. By default the file name is `service-config.json` and must stay at the same directory of the output executeable. It is also possible to change the file name by tweaking the [ServiceProvider](/read?q=/contents/spec/Sisk/Provider/ServiceProvider) class.

> **Tip:**
> 
> In Sisk service provider configuration files it's allowed to write `// single` or `/* multi-line comments */`, as they are ignored by the interpreter.

# Creating an service provider instance

In this session we will learn how to configure the application to run a Sisk service provider. First of all, you will need to have the latest version of Sisk installed in your project. See [how to install here](/read?q=/contents/docs/installing).

First let's configure an RouterFactory class instance that will be configured and will emit a router. This class is not the entry point of the application, but nevertheless it is the object that will run the runtime objects.

```cs
public class Application : RouterFactory
{
    public string? MySqlConnection { get; set; }

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
        this.MySqlConnection = setupParameters["MySqlConnection"] ?? throw new ArgumentNullException(nameof(MySqlConnection));
    }

    // Synchronous method called immediately before starting the HTTP server.
    public override void Bootstrap()
    {
        ;
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
        ServiceProvider provider = new(App, "config.json");
        provider.ConfigureInit(config =>
        {
            // Defines the main request loop as the Brazilian Portuguese culture info.
            config.UseLocale(CultureInfo.GetCultureInfo("pt-BR"));

            // Sets HTTP flags on server startup.
            config.UseFlags(new HttpServerFlags()
            {
                SendSiskHeader = true
            });

            // Indicates that after starting the server, it should
            // not terminate the main loop.
            config.UseHauting(true);

            // Overrides HTTP server configuration parameters,
            // even if they were parameterized in the JSON config file.
            config.UseConfiguration(httpConfig =>
            {
                if (httpConfig.AccessLogsStream?.FilePath != null)
                {
                    RotatingLogPolicy policy = new RotatingLogPolicy(httpConfig.AccessLogsStream);
                    policy.Configure(1024 * 1024, TimeSpan.FromHours(6));
                }
            });

            // Overrides CORS parameters from the configuration file
            config.UseCors(cors =>
            {
                cors.AllowMethods = new[] { "GET", "POST", "PUT", "DELETE" };
            });

            // Overrides properties directly to the HTTP server
            config.UseHttpServer(http =>
            {
                http.EventSources.OnEventSourceRegistered += (sender, ws) =>
                {
                    Console.WriteLine("New event source: " + ws.Identifier);
                };
                http.EventSources.OnEventSourceUnregistration += (sender, ws) =>
                {
                    Console.WriteLine("Closed event source: " + ws.Identifier);
                };
            });
        });
    }
}
```

Now our application is ready to be started with a JSON file configuring the ports, methods, hostnames and parameters.

# Configuration file structure

The JSON file is composed of the properties:

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Mandatory</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Server</td>
            <td>Required</td>
            <td>Represents the server itself with their settings.</td>
        </tr>
        <tr>
            <td>Server.AccessLogsStream</td>
            <td>Optional</td>
            <td>Default to <code>console</code>. Specifies the access log output stream. Can be an filename,
                <code>null</code> or <code>console</code>.
            </td>
        </tr>
        <tr>
            <td>Server.ErrorsLogsStream</td>
            <td>Optional</td>
            <td>Default to <code>null</code>. Specifies the error log output stream. Can be an filename,
                <code>null</code> or <code>console</code>.
            </td>
        </tr>
        <tr>
            <td>Server.ResolveForwardedOriginAddress</td>
            <td>Optional</td>
            <td>Default to <code>false</code>. Specifies if the HTTP server should resolve the
                <code>X-Forwarded-For</code> header to the user IP. (Recommended for proxy servers)
            </td>
        </tr>
        <tr>
            <td>Server.ResolveForwardedOriginHost</td>
            <td>Optional</td>
            <td>Default to <code>false</code>. Specifies if the HTTP server should resolve the
                <code>X-Forwarded-Host</code> header to the server host.
            </td>
        </tr>
        <tr>
            <td>Server.DefaultEncoding</td>
            <td>Optional</td>
            <td>Default to <code>UTF-8</code>. Specifies the default text encoding used by the HTTP server.
            </td>
        </tr>
        <tr>
            <td>Server.MaximumContentLength</td>
            <td>Optional</td>
            <td>Default to <code>0</code>. Specifies the maximum content length in bytes. Zero means
                infinite.</td>
        </tr>
        <tr>
            <td>Server.IncludeRequestIdHeader</td>
            <td>Optional</td>
            <td>Default to <code>false</code>. Specifies if the HTTP server should send the
                <code>X-Request-Id</code> header.
            </td>
        </tr>
        <tr>
            <td>Server.ThrowExceptions</td>
            <td>Optional</td>
            <td>Default to <code>true</code>. Specifies if unhandled exceptions should be thrown. Set to
                <code>false</code> when production and <code>true</code> when debugging.
            </td>
        </tr>
        <tr>
            <td>ListeningHost</td>
            <td>Required</td>
            <td>Represents the server listening host.</td>
        </tr>
        <tr>
            <td>ListeningHost.Label</td>
            <td>Optional</td>
            <td>Represents the application label.</td>
        </tr>
        <tr>
            <td>ListeningHost.Ports</td>
            <td>Required</td>
            <td>Represents an array of strings, matching the <a href="/read?q=/contents/spec/Sisk.Core.Http.ListeningPort">ListeningPort</a> syntax.</td>
        </tr>
        <tr>
            <td>ListeningHost.CrossOriginResourceSharingPolicy</td>
            <td>Optional</td>
            <td>Setup the CORS headers for the application.</td>
        </tr>
        <tr>
            <td>ListeningHost.CrossOriginResourceSharingPolicy.AllowCredentials</td>
            <td>Optional</td>
            <td>Defaults to <code>false</code>. Specifies the <code>Allow-Credentials</code> header.</td>
        </tr>
        <tr>
            <td>ListeningHost.CrossOriginResourceSharingPolicy.ExposeHeaders</td>
            <td>Optional</td>
            <td>Defaults to <code>null</code>. This property expects an array of strings. Specifies the
                <code>Expose-Headers</code> header.
            </td>
        </tr>
        <tr>
            <td>ListeningHost.CrossOriginResourceSharingPolicy.AllowOrigin</td>
            <td>Optional</td>
            <td>Defaults to <code>null</code>. This property expects an string. Specifies the
                <code>Allow-Origin</code> header.
            </td>
        </tr>
        <tr>
            <td>ListeningHost.CrossOriginResourceSharingPolicy.AllowOrigins</td>
            <td>Optional</td>
            <td>Defaults to <code>null</code>. This property expects an array of strings.
                Specifies multiples <code>Allow-Origin</code> headers. See <a href="/read?q=/contents/spec/Sisk.Core.Entity.CrossOriginResourceSharingHeaders.AllowOrigins">
                    AllowOrigins
                </a> for more information.
            </td>
        </tr>
        <tr>
            <td>ListeningHost.CrossOriginResourceSharingPolicy.AllowMethods</td>
            <td>Optional</td>
            <td>Defaults to <code>null</code>. This property expects an array of strings. Specifies the
                <code>Allow-Methods</code> header.
            </td>
        </tr>
        <tr>
            <td>ListeningHost.CrossOriginResourceSharingPolicy.AllowHeaders</td>
            <td>Optional</td>
            <td>Defaults to <code>null</code>. This property expects an array of strings. Specifies the
                <code>Allow-Headers</code> header.
            </td>
        </tr>
        <tr>
            <td>ListeningHost.CrossOriginResourceSharingPolicy.MaxAge</td>
            <td>Optional</td>
            <td>Defaults to <code>null</code>. This property expects an interger. Specifies the
                <code>Max-Age</code> header in seconds.
            </td>
        </tr>
        <tr>
            <td>ListeningHost.Parameters</td>
            <td>Optional</td>
            <td>Specifies the properties provided to the application setup method.</td>
        </tr>
    </tbody>
</table>

You can see an example of how to use each property at the top of this page.