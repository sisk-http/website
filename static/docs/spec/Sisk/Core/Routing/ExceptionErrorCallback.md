# Delegate ExceptionErrorCallback
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Routing

```csharp
public delegate HttpResponse ExceptionErrorCallback(Exception ex, HttpRequest request);
```

Represents the function that is called after the route callback threw an exception.

