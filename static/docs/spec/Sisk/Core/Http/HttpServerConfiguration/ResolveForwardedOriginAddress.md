# Property ResolveForwardedOriginAddress
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Http

```csharp
public bool ResolveForwardedOriginAddress { get; set; }
```

Gets or sets whether the HTTP server should resolve remote (IP) addresses by the X-Forwarded-For header. This option is useful if you are using Sisk through a reverse proxy.

