# Method SetCookie
Last updated: Wednesday, 28 December 2022

## Definition
Namespace: Sisk.Core.Http

```csharp
public void SetCookie(string name, string value, DateTime? expires, TimeSpan? maxAge, string? domain, string? path, bool? secure, bool? httpOnly)
```

Sets a cookie and sends it in the response to be set by the client.

## Parameters

| Key | Value |
| --- | --- |
| name | The cookie name. | 
| value | The cookie value. | 
| expires | The cookie expirity date. | 
| maxAge | The cookie max duration after being set. | 
| domain | The domain where the cookie will be valid. | 
| path | The path where the cookie will be valid. | 
| secure | Determines if the cookie will only be stored in an secure context. | 
| httpOnly | Determines if the cookie will be only available in the HTTP context. | 

