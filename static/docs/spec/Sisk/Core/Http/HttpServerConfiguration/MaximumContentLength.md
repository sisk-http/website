# Property MaximumContentLength

## Definition
Namespace: Sisk.Core.Http

```csharp
public long MaximumContentLength { get; set; }
```

Gets or sets the maximum size of a request body before it is closed by the socket.

> Leave it as "0" to set the maximum content length to unlimited.
