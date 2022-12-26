# Delegate RouterCallback
Last updated: Sunday, 25 December 2022

## Definition
Namespace: Sisk.Core.Routing

```csharp
public delegate HttpResponse RouterCallback(HttpRequest request);
```

Represents the function that is called after the route is matched with the request.

## Parameters

| Key | Value |
| --- | --- |
| request | The received request on the router. | 

