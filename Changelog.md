# 0.10.0

- Added: `ContentLength` property for `HttpRequest` objects.
- Added: `Close()` method for `HttpRequest` objects.
- Added: `OptionsLogMode` flag for the HTTP server.
- Added: `IncludeFullPathOnLog` flag for the HTTP server.
- Changed: the CORS `Allow-Origin` was an array accepting multiple values. The `AllowOrigins` property was renamed and modified to be an
`string? AllowOrigin` instead previous `string[] AllowOrigins`. You might change your service configuration in order of this change. Also was
fixed that this method allows nullable for now.
- Changed: exceptions thrown from an request handler body will now be supressed if `ThrowExceptions` is enabled.
- Fixed: the `X-Powered-By` header wasn't being sent. You can disable it by turning `HttpServerFlags.SendSiskHeader` to false.
- Fixed: `charset` on Content-Type wasn't being set by `StringContent` helper.
- Fixed: Multipart-form objects were decoding unicode chars to their wrong format. To fix this, we've added two static properties
to the `MultipartObject` ("DefaultContentEncoding" and "DefaultHeadersEncoding"), which you can set the default encoding for header-parsing and content parsing.
- Rewrited: the request id generator function to another one a bit faster than `Guid.NewGuid()`.
- Experimental: you can send custom HTTP status codes and reason phrases using the `HttpResponse.CustomStatus` property.
- Code cleanup.

# 0.9.1

This version includes bug fixes and support for Native AOT. [Read the docs here]() to see more information about Native AOT and Sisk..

- Sisk programs which uses services providers now supports Native AOT compilation. Read more 
- Fixed where the `ServiceProvider.ErrorLogs` were redirecting output to `AccessLogs` instead `ErrorLogs` stream.
- Other small adjustments and improvements.

# 0.9.0

Thank you for using Sisk. 

- Removed the `Newtonsoft.Json` dependency.
- Added XML doc to the `HttpServerFlags` constructor.
- You can setup HTTP server flags on `ServiceProvider` now.
- Routes cannot be added if an route with exact or similar path is already
defined.
- Defining routes paths must start with an `/`. Sisk's current routing
implementation ignores the trailing `/` at the end of the request path and the route path.

# 0.8.9

- New: hot reload support. This is applyable to the .NET support of hot reload. You can use it with `ServiceReloadManager` or
`ServiceProvider`.
- New: added HTTP server flags, which holds advanced settings for the HTTP server.
- New: Router `SetObject(object)` method now defines the instance methods instead of the type
static methods. Use `SetObject(type)` for defining static route methods.
- New: Added `PDF` format to `MultipartObject.GetCommonFileFormat()`. Also we've renamed the enumerator to
`MultipartObjectCommonFormat`.
- Fixed: HEAD requests should send `Content-*` headers now.
- Fixed: HEAD requests weren't being matched with GET routes. You can disable it by the `TreatHeadAsGetMethod` flag.
- Fixed: the access logs weren't displaying the forwareded IP address when `ResolveForwardedOriginAddress` is true.
- Fixed: CORS `Access-Control-Max-Age` header name.
- Deprecated: `HttpRequest.CreateHeadResponse()`. Use `HttpRequest.CreateEmptyResponse()` instead.
- Deprecated: `HttpServerExecutionStatus.ContentServedOnNotSupportedMethod`.

# 0.8.7

- Fixed `Access-Control-Max-Age` header name.

# 0.8.6

Released: 02/02/2023

- Now it's possible to send headers from an event source request context.
- Byte calculations and representations are now decimal.
- Fixed an bug where event source streams weren't sending CORS headers.

# 0.8.5 - Urgent fix to 0.8.4

Released: 30/01/2023

- Fixed an bug on 0.8.4 where OPTIONS weren't being matched to send CORS headers.

# 0.8.4

Released: 30/01/2023

- Deprecated the `CrossOriginResourceSharingHeaders` parametered constructor.
- Added `Route.UseCors` property.
- Added `CrossOriginResourceSharingHeaders.ExposeHeaders` property.
- Added `CrossOriginResourceSharingHeaders.AllowCredentials` property.
- Added logging shorthands for `ServiceProvider` class.
- Fixed an bug where `HttpResponse.SetCookie()` with an path wasn't setting the cookie path correctly.

# 0.8.3

Released: 26/01/2023

- Deprecated `HttpResponse.DefaultEncoding`.
- Malformed requests can throw an `HttpRequestException` from the HTTP server, which will result in
an `HttpServerExecutionStatus.MalformedRequest` with an automatic response with status 400.
- HTTP response now uses UTF-8 to calculate the response headers size.
- Routes can have an `LogMode` property which determines if the server should write access/error logs
for those route. 
- Added the `HttpRequest.Cookies` property.
- Fixed where uncaught exceptions in the router callback shouldn't return an HTTP 500 status code.

# 0.8.2

Released: 09/01/2023

- Introduced "Service providers", which provides an interface for porting services and applications
easily with Sisk.
- Added an overload for `Router.SetObject` which allows to pass an type as reference.
- Added the property `HttpServer.IsListening`.
- `HttpServer` no longer listens to all authorities with the "+" wildcard, but to individual hosts. Perhaps you will need to have permissions for each authority individually to run without admin privileges in Windows.
- Fixed an issue where event listeners weren't respecting `AccessLogsStream` and using the deprecated property `Verbose`.
- Fixed where routers weren't parsing regex routes as ignore-case when `MatchRoutesIgnoreCase` was enabled.

# 0.8.1

Released: 07/01/2023

Core:

- Created an indexer for `ListeningHostRepository`.
- Created property `HttpServerConfiguration.AccessLogsStream`. [Specification](https://sisk-http.github.io/docs/static/#/spec/Sisk/Core/Http/HttpServerConfiguration/AccessLogsStream).
- Created property `HttpServerConfiguration.ErrorsLogsStream`. [Specification](https://sisk-http.github.io/docs/static/#/spec/Sisk/Core/Http/HttpServerConfiguration/ErrorsLogsStream).
- Created property `Router.MatchRoutesIgnoreCase`, which allows to the router to match routes ignoring case.
- Replaced the router path matching mecanism by a more appropriate string parser without using regex.
- Replaced the DNS matching mecanism by removing regex. Credits to [this link](https://www.hiimray.co.uk/2020/04/18/implementing-simple-wildcard-string-matching-using-regular-expressions/474).
- `ListeningHost.Handle` is more deterministic now and doesn't uses an random generator for it.
- Fixed an bug where the TCP client was sending an IP address with multiple null characters.
- Deprecated `HttpServerConfiguration.Verbose`.

# 0.8.0

Released: 06/01/2023

- `HttpServerConfiguration.ListeningHosts` now hosts an `ListeningHostRepository` object, which supports
updating, adding or removing ListeningHosts during the server execution. If you change ports which the
HTTP server is listening, an `HttpServer.Restart()` would be necessary to refresh the listening ports of
the HTTP server.
- Created property `HttpRequest.IsSecure`, which determines if the request was made by an secure (SSL) layer.
- Created properties `RequestSize` and `ResponseSize` inside `HttpServerExecutionResult`.
- Created an unique handle for Listening hosts, which can identify it's instances and prevent duplicates inside
- an HTTP server.
- Listening host router can be null and the `ListeningHost` class can now be initialized without an Router. This will
cause that the `ListeningHost` cannot be listened and if an request matches it's host, an `ListeningHostNotReady` status
can be reused.
- Optimized `HttpRequest.GetQueryValue`  and `HttpRequest.GetHeader` methods.
- Fixed an bug where `HttpServer` don't respects `HttpServerConfiguration.ThrowExceptions` when an error
inside an Router callback is throwed and can't be handled.
- Fixed an bug where requests weren't closed after an failed processing.
- Removed color support.

# 0.7.5

Released: 28/12/2022

- Created class `RequestHandlersFactory` to emit `IRequestHandler` instances to use as external modules.
- Created property `HttpServerConfiguration.ResolveForwardedOriginAddress` and `HttpServerConfiguration.ResolveForwardedOriginHost`, which allows the `HttpRequest` to resolve
proxied requests to their real addresses and hostnames.
- Created property `HttpServerExecutionResult.IsSuccessStatus`, which gets an boolean indicating if the execution status is an success status.
- Put date, time and remote IP address in the detailed verbose message.
- Verbose messages can write with more meaningful colors now.
- Changed the `MimeTypeMap.DefaultMimeType` from `application/octet-stream` to `text/plain`.
- Fixed: cached responses could change the collection of response headers during enumeration of the same on the HTTP server.
- Fixed: disposing `HttpServer` could crash `ListenerCallback` while trying to get the callback of an disposed object.

# 0.7.3

Released: 25/12/2022

- Created property `HttpRequest.Authority`.
- The HTTP server will not execute a request if the header does not provide a valid hostname. This is required even for transactions made on the remote IP.

# 0.7.2

Released: 22/12/2022

- Implement `IDisposeable` in `HttpServer`.
- Implement `IDisposeable` in `HttpServerConfiguration`.
- Fixed the Http server sending empty headers when `CrossOriginResourceSharingHeaders` doens't has any option.

# 0.7.1

Released: 21/12/2022

- Moved `HttpServerConfiguration.CrossOriginResourceSharingPolicy` to `ListeningHost.CrossOriginResourceSharingPolicy`.
- Created an `CrossOriginResourceSharingPolicy.Empty` field instead of using an null member.
- Support to multiple hosts and wildcard hosts. This will require Sisk to run with elevated privileges.
- `ListeningHosts` does not have an `int Port` property anymore. Instead, you can:

```
ListeningHost myHost = new ("localhost", 443, router);
ListeningHost myHost = new ("localhost", new ListeningPort(443), router);
ListeningHost myHost = new ("localhost", new int[] { 80, 443 }, router);
ListeningHost myHost = new ("localhost", new ListeningPort[] { ..., ... }, router);
```

With this, the `HttpServer` instance will listen all these ports to the same `ListeningHost` and call their router.