# Method Execute
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Routing.Handlers

```csharp
HttpResponse? Execute(HttpRequest request, HttpContext context);
```

This method is called by the [Router](/spec/Sisk/Core/Routing/Router) before executing a request when the [Route](/spec/Sisk/Core/Routing/Route) instantiates an object that implements this interface. If it returns a [HttpResponse](/spec/Sisk/Core/Http/HttpResponse) object, the route callback is not called and all execution of the route is stopped. If it returns "null", the execution is continued.

## Parameters

| Key | Value |
| --- | --- |
| request | The entry HTTP request. | 
| context | The HTTP request context. It may contain information from other . | 

