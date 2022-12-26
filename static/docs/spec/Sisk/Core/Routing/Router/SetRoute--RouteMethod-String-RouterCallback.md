# Method SetRoute
Last updated: Sunday, 25 December 2022

## Definition
Namespace: Sisk.Core.Routing

```csharp
public void SetRoute(RouteMethod method, string path, RouterCallback callback)
```

Defines an route with their method, path and callback function.

## Parameters

| Key | Value |
| --- | --- |
| method | The route method to be matched. "Any" means any method that matches their path. | 
| path | The route path. | 
| callback | The route function to be called after matched. | 

