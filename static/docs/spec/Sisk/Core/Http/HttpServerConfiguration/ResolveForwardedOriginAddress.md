# Property ResolveForwardedOriginAddress
Last updated: Wednesday, 28 December 2022

## Definition
Namespace: Sisk.Core.Http

```csharp
public bool ResolveForwardedOriginAddress { get; set; }
```

Gets or sets whether the HTTP server should resolve remote (IP) addresses by the X-Forwarded-For header. This option is useful if you are using Sisk through a reverse proxy.

