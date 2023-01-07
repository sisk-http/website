# Delegate ExceptionErrorCallback

## Definition
Namespace: Sisk.Core.Routing

```csharp
public delegate HttpResponse ExceptionErrorCallback(Exception ex, HttpRequest request);
```

Represents the function that is called after the route callback threw an exception.

