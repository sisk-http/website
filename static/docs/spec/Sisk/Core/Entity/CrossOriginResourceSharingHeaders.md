# Class CrossOriginResourceSharingHeaders

## Definition
Namespace: Sisk.Core.Entity

```csharp
public class CrossOriginResourceSharingHeaders
```

Provides a class to provide Cross Origin response headers for when communicating with a browser.

## Properties

| Property name | Description |
| --- | --- |
| [AllowCredentials](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/AllowCredentials) | From MDN: The Access-Control-Allow-Credentials header indicates whether or not the response to the request can be exposed when the credentials flag is true. When used as part of a response to a preflight request, this indicates whether or not the actual request can be made using credentials. | 
| [ExposeHeaders](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/ExposeHeaders) | From MDN: The Access-Control-Expose-Headers header adds the specified headers to the allowlist that JavaScript in browsers is allowed to access. | 
| [AllowOrigin](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/AllowOrigin) | From MDN: Access-Control-Allow-Origin specifies either a single origin which tells browsers to allow that origin to access the resource; or else — for requests without credentials — the "*" wildcard tells browsers to allow any origin to access the resource. | 
| [AllowMethods](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/AllowMethods) | From MDN: The Access-Control-Allow-Methods header specifies the method or methods allowed when accessing the resource. | 
| [AllowHeaders](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/AllowHeaders) | From MDN: The Access-Control-Allow-Headers header is used in response to a preflight request to indicate which HTTP headers can be used when making the actual request. | 
| [MaxAge](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/MaxAge) | From MDN: The Access-Control-Max-Age header indicates how long the results of a preflight request can be cached. | 

## Constructors

| Method name | Description |
| --- | --- |
| [CrossOriginResourceSharingHeaders(String, String[], String[], TimeSpan)](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/_ctor--String-String[]-String[]-TimeSpan) | Create a new [CrossOriginResourceSharingHeaders](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders) class instance with given parameters. | 
| [CrossOriginResourceSharingHeaders()](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/_ctor--) | Creates an empty [CrossOriginResourceSharingHeaders](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders) instance with no predefined CORS headers. | 

