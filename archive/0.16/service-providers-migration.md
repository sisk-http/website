# ServiceProviders migration

In version 0.16 the ServiceProviders package was deprecated and embedded inside the Core package. This package will still be maintained for version 0.15.x;

The concept of how it works is still the same, but it requires you to start it inside the Sisk.Http.HttpServer Builder. In addition, all fields in the settings JSON file are optional now, but you can still define which ones are required for your application to run.

Since the RouterFactory class no longer exists, you can make their methods static and map them to their builder equivalents:

```cs
static void Main(string[] args)
{
    NameValueCollection configParameters;

    HttpServer.CreateBuilder(app =>
    {
        app.UsePortableConfiguration(config =>
        {
            // WithParameters is equivalent to the RouterFactory.Setup()
            config.WithParameters(params =>
            {
                OldRouterFactory.Setup(params.AsNameValueCollection());
            });
            // specify required json sections
            config.WithRequiredSections(
                PortableConfigurationRequireSection.ListeningHost
              | PortableConfigurationRequireSection.Parameters);
        });
        // UseRouter is equivalent to RouterFactory.BuildRouter()
        app.UseRouter(OldRouterFactory.BuildRouter);
        // UseBootstraper is equivalent to RouterFactory.Bootstrap()
        app.UseBootstraper(OldRouterFactory.Bootstrap);
    });
}

public class OldRouterFactory
{
    public static void Setup(NameValueCollection parameters);
    public static void BuildRouter(Router r);
    public static void Bootstrap();
}
```

In addition, the structure of the JSON configuration file has been slightly changed. The change indicates that the application parameters fall outside of the ListeningHost session, as follows:

```json
{
  "Server": {
    "DefaultEncoding": "UTF-8"
  },
  "ListeningHost": {
    "Ports": [
      "http://localhost:4445/"
    ]
  },
  "Parameters": {
    "foo": "bar"
  }
}
```

Other `ConfigureInit` builder methods are available within `HttpServer.CreateBuilder`.