# Class Router
Last updated: Wednesday, 28 December 2022

## Definition
Namespace: Sisk.Core.Routing

```csharp
public class Router
```

Represents a collection of Routes and main executor of callbacks in an [HttpServer](/spec/Sisk/Core/Http/HttpServer) .

## Properties

| Property name | Description |
| --- | --- |
| [GlobalRequestHandlers](/spec/Sisk/Core/Routing/Router/GlobalRequestHandlers) | Gets or sets the global requests handlers that will be executed in all matched routes. | 
| [CallbackErrorHandler](/spec/Sisk/Core/Routing/Router/CallbackErrorHandler) | Gets or sets the Router callback exception handler. | 
| [NotFoundErrorHandler](/spec/Sisk/Core/Routing/Router/NotFoundErrorHandler) | Gets or sets the Router "404 Not Found" handler. | 
| [MethodNotAllowedErrorHandler](/spec/Sisk/Core/Routing/Router/MethodNotAllowedErrorHandler) | Gets or sets the Router "405 Method Not Allowed" handler. | 

## Methods

| Method name | Description |
| --- | --- |
| [GetDefinedRoutes()](/spec/Sisk/Core/Routing/Router/GetDefinedRoutes--) | Gets all routes defined on this router instance. | 
| [GetRouteFromName(String)](/spec/Sisk/Core/Routing/Router/GetRouteFromName--String) | Gets an route object by their name that is defined in this Router. | 
| [SetRoute(RouteMethod, String, RouterCallback)](/spec/Sisk/Core/Routing/Router/SetRoute--RouteMethod-String-RouterCallback) | Defines an route with their method, path and callback function. | 
| [SetRoute(RouteMethod, String, RouterCallback, String)](/spec/Sisk/Core/Routing/Router/SetRoute--RouteMethod-String-RouterCallback-String) | Defines an route with their method, path, callback function and name. | 
| [SetRoute(RouteMethod, String, RouterCallback, String, IRequestHandler[])](/spec/Sisk/Core/Routing/Router/SetRoute--RouteMethod-String-RouterCallback-String-IRequestHandler[]) | Defines an route with their method, path, callback function, name and request handlers. | 
| [SetRoute(Route)](/spec/Sisk/Core/Routing/Router/SetRoute--Route) | Defines an route in this Router instance. | 
| [SetObject(Object)](/spec/Sisk/Core/Routing/Router/SetObject--Object) | Searches the object instance for methods with attribute [RouteAttribute](/spec/Sisk/Core/Routing/RouteAttribute) and optionals [RequestHandlerAttribute](/spec/Sisk/Core/Routing/RequestHandlerAttribute) , and creates routes from them. | 

## Constructors

| Method name | Description |
| --- | --- |
| [Router()](/spec/Sisk/Core/Routing/Router/_ctor--) | Creates an new [Router](/spec/Sisk/Core/Routing/Router) instance with default properties values. | 

