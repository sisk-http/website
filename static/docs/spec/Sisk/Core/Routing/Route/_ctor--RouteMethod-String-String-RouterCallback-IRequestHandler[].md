# Constructor #ctor
Last updated: Sunday, 25 December 2022

## Definition
Namespace: Sisk.Core.Routing

```csharp
public Route(RouteMethod method, string path, string? name, RouterCallback callback, IRequestHandler[]? beforeCallback)
```

Creates an new [Route](/spec/Sisk/Core/Routing/Route) instance with given parameters.

## Parameters

| Key | Value |
| --- | --- |
| method | The matching HTTP method. If it is "Any", the route will just use the path expression to be matched, not the HTTP method. | 
| path | The path expression that will be interpreted by the router and validated by the requests. | 
| name | The route name. It allows it to be found by other routes and makes it easier to create links. | 
| callback | The function that is called after the route is matched with the request. | 
| beforeCallback | The RequestHandlers to run before the route's Callback. | 

