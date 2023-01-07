# Method CreateRedirectResponse

## Definition
Namespace: Sisk.Core.Http

```csharp
public HttpResponse CreateRedirectResponse(string location, bool permanent)
```

Creates an HTTP 301 response code for the given location.

## Parameters

| Key | Value |
| --- | --- |
| location | The header value for the new location. | 
| permanent | Determines if the response is HTTP 301 or HTTP 302. | 

