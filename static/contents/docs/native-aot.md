# Native AOT support

In the .NET 7, [Native AOT](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/) was introduced, a .NET compilation mode that allows you to export ready binaries on any supported platform, without requiring the .NET runtime to be installed on the target machine.

With Native AOT, your code is compiled for native code and already contains everything it needs to be executed. Sisk has been experimenting with the feature since version 0.9.1, which improves support for Native AOT with features to define dynamic routes by application without afecting the compilation with warning messages.

Sisk uses reflection to obtain the methods that will be defined from types and objects. In addition, Sisk uses reflection for attributes such as `RequestHandlerAttribute`, which are initialized from a type. To function properly, AOT compilation uses trimming, where dynamic types should be specified what will be used in the final assembly.

Considering the example below, it is a route that calls a RequestHandler.

```cs
[Route(RouteMethod.Get, "/", LogMode = LogOutput.None)]
[RequestHandler(typeof(MyRequestHandler))]
static HttpResponse IndexPage(HttpRequest request)
{
    HttpResponse htmlResponse = new HttpResponse();
    htmlResponse.Content = new StringContent("Hello, world!", System.Text.Encoding.UTF8, "text/plain");
    return htmlResponse;
}
```

This RequestHandler is dynamically invoked during the runtime, and this invocation must be segmented, and this segmentation must be explicitly.

To better understand what the compiler will consider from `MyRequestHandler` should be kept in the final compilation is:

- Public properties;
- Public and private fields;
- Public and private constructors;
- Public and private methods;

Everything you have in a RequestHandler that is not mentioned above will be removed by the compiler.

Remembering that all other components, classes and packages that you use in your application should be compatible with AOT Trimming, or your code will not function as expected. By the way, Sisk will not leave you if they want to build something where performance is a priority.

You can read more about Native AOT and how it works in the official [Microsoft Documentation](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/).