# Method SetRoute

## Definition
Namespace: Sisk.Core.Routing

```csharp
public void SetRoute(RouteMethod method, string path, RouterCallback callback, string? name)
```

Defines an route with their method, path, callback function and name.

## Parameters

| Key | Value |
| --- | --- |
| method | The route method to be matched. "Any" means any method that matches their path. | 
| path | The route path. | 
| callback | The route function to be called after matched. | 
| name | The route name. | 

