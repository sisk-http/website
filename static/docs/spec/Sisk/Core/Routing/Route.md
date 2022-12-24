# Class Route
Last updated: Thursday, 22 December 2022

## Definition
Namespace: Sisk.Core.Routing

```csharp
public class Route
```

Represents an HTTP route to be matched by an [Router](/spec/Sisk/Core/Routing/Router) object.

## Properties

| Property name | Description |
| --- | --- |
| [UseRegex](/spec/Sisk/Core/Routing/Route/UseRegex) | Defines if this route should use regex to be interpreted instead of predefined templates. | 
| [Method](/spec/Sisk/Core/Routing/Route/Method) | Gets or sets the matching HTTP method. If it is "Any", the route will just use the path expression to be matched, not the HTTP method. | 
| [Path](/spec/Sisk/Core/Routing/Route/Path) | Gets or sets the path expression that will be interpreted by the router and validated by the requests. | 
| [Name](/spec/Sisk/Core/Routing/Route/Name) | Gets or sets the route name. It allows it to be found by other routes and makes it easier to create links. | 
| [Callback](/spec/Sisk/Core/Routing/Route/Callback) | Gets or sets the function that is called after the route is matched with the request. | 
| [RequestHandlers](/spec/Sisk/Core/Routing/Route/RequestHandlers) | Gets or sets the RequestHandlers to run before the route's Callback. | 
| [BypassGlobalRequestHandlers](/spec/Sisk/Core/Routing/Route/BypassGlobalRequestHandlers) | Gets or sets the global request handlers that will not run on this route. The verification is given by the identifier of the instance of an [IRequestHandler](/spec/Sisk/Core/Routing/Handlers/IRequestHandler) . | 

## Constructors

| Method name | Description |
| --- | --- |
| [Route(RouteMethod, String, String, RouterCallback, IRequestHandler[])](/spec/Sisk/Core/Routing/Route/_ctor--RouteMethod-String-String-RouterCallback-IRequestHandler[]) | Creates an new [Route](/spec/Sisk/Core/Routing/Route) instance with given parameters. | 
| [Route()](/spec/Sisk/Core/Routing/Route/_ctor--) | Creates an new [Route](/spec/Sisk/Core/Routing/Route) instance with no parameters. | 

