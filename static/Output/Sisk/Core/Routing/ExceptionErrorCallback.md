# Delegate ExceptionErrorCallback
Last updated: Wednesday, 28 December 2022

## Definition
Namespace: Sisk.Core.Routing

```csharp
public delegate HttpResponse ExceptionErrorCallback(Exception ex, HttpRequest request);
```

Represents the function that is called after the route callback threw an exception.

