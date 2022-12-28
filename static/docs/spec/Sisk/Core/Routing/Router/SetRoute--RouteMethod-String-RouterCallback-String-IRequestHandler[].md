# Method SetRoute
Last updated: Wednesday, 28 December 2022

## Definition
Namespace: Sisk.Core.Routing

```csharp
public void SetRoute(RouteMethod method, string path, RouterCallback callback, string? name, IRequestHandler[] middlewares)
```

Defines an route with their method, path, callback function, name and request handlers.

## Parameters

| Key | Value |
| --- | --- |
| method | The route method to be matched. "Any" means any method that matches their path. | 
| path | The route path. | 
| callback | The route function to be called after matched. | 
| name | The route name. | 
| middlewares | Handlers that run before calling your route callback. | 

