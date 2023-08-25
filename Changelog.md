# 0.15-rc

Please, read the [release overview](https://github.com/sisk-http/core/tree/main/feature-preview/0.15) for full changelogs and details for this version.

Core:

- Added the HttpContext.OverrideHeaders property.
- Added the HttpRequest.SetContextBag and GetContextBag methods.
- Added the Router.RegisterValueHandler method.
- Added the RouterModule class.
- Added the ValueResult class.
- Added the HttpWebSocket.MaxAttempts property.
- Added the HttpStreamPingPolicy class.
- Added the HttpRequest.InputStream property.
- Added an string representation to HttpRequest.ToString().
- Added the HttpServerConfiguration.KeepAlive property.
- Added Fluent Interface style methods for HttpResponse: WithContent, WithHeader, WithHeaders, WithStatus. Documented in [a9c8873](https://github.com/sisk-http/core/commit/a9c8873519b7c4dcf4a9ad9bcb878f897fee2611).
- Added the HttpServerFlags.IdleConnectionTimeout which determines the time to keep an keep-alive connection alive.
- Improved regex routes functionality, with improved performance and regex groups to queries.
- Renamed HttpRequestEventSource.KeepAlive -> WaitForFail.
- Simplified the way HttpRequest obtains the origin IP of the request.
- Rewrite the return type of HttpRequest.SendTo from HttpResponse to object.
- Rewrite the LogStream.WriteException output format.
- Rewrite the return type of RouterCallback delegate from HttpResponse to object.
- The HttpContext.HttpServer property ins't nullable anymore.
- The HttpRequest.Context property inst't nullable anymore.
- The RouteMethod.Any enum nows flags all the previous defined Route methods.
- Extended the CreateRedirectResponse method to be able to extract the route from a RouteCallback with the RouteAttribute attribute.
- Fixed an bug where the WebSocket was throwing an exception when the client didn't terminated the close handshake with the server.
- Fixed a bug where requests with non-common HTTP methods were not accepted in routes even when used in RouteMethod.Any.
- Fixed an bug where regex routers weren't matching ignore-case when MatchRoutesIgnoreCase was enabled.
- Fixed a bug where README.html was being moved to the target project directory.
- Dropped support for hot reload. Removed the ServiceReloadManager class.

Service Providers:

- Fixed inconsistencies in the Sisk.ServiceProvider package namespace. Now the default namespace is Sisk.ServiceProvider.

# 0.14

Core:

- Fixed an several websocket issue.

# 0.14, rc 4

Core:

- Optimized `LogStream` queue processing function.
- Fixed an issue where closed streams were aborting connections instead of closing them.

# 0.14, rc 3

Core:

- .. everything from rc 1, rc 2
- Added the `%rm` log constant, which is replaced by the request HTTP method.
- Added the `HttpContext.Request` property.
- Fixed some issues related to `HttpResponseStream`.
- Fixed an issue where the HTTP server was writing ignored errors to the output stream.
- Fixed an issue where closed streams weren't returning an `ConnectionClosed` status.
- Replaced the `ExceptionErrorCallback` delegate second parameter type from `HttpRequest` to `HttpContext`.
- `HttpRequest.Close()` should now reset the connection between the client and server even if the content
was not completely sent.
- Docs cleanup.

# 0.14, rc 2

This release is not available at nuget yet.

Core:

- .. everything from rc 1
- Created the `RoutePrefix` attribute.
- Created the `RouteGet`, `RoutePost`, `RoutePut`, `RoutePatch` and `RouteDelete` attributes.
- Created the `HttpRequest.SendTo` method, which prevents stack overflow exceptions when
redirecting the execution context to another callback.
- Created the `HtmlContent` class.
- Now it's possible to set more than one route to the same action callback.
- Removed `HttpServerConfiguration.Verbose` obsolete property.
- Removed `VerboseMode` obsolete enum.
- Removed `HttpResponse.DefaultEncoding` obsolete property.
- Removed the obsolete `CrossOriginResourceSharingHeaders` constructor.
- Fixed an bug where the CORS headers was not being set on empty responses.

# 0.14, rc 1

Core:

- Created the `HttpResponseStream` class, which allows the user to write contents on-fly to the HTTP response output stream.
- Rewrited `HttpServerExecutionStatus` enum items. Obsolete items was removed.
- Fixed an bug where the CORS headers was being set on Event Source connections even if `HttpServerFlags.SendCorsHeaders` was false.


# 0.13.1, rev 1

Released: June 9, 2023

You can now export Sisk source code to a contained file with all the source code needed to run Sisk. See more details inside the `merge` folder.

Core:

- Added the `HttpServerFlags.ForceTrailingSlash`, which determines if the HTTP server should automatically rewrite URL paths
to end with / before the query string. Does not works with Regex routes.
- Added the `CrossOriginResourceSharingPolicy.AllowOrigins` property, which allows to route `Allow-Origin` header to multiple
domains.
- Rewrited the `CrossOriginResourceSharingPolicy` properties descriptions.
- Removed all `HttpRequest.Create*` helper methods, plus created some additional constructors for `HttpResponse`.
- Sisk does not requires to be builded with `/unsafe` anymore.
- Code cleanup.

# 0.13.0

Released: May 20, 2023

Core:

- Listening hosts no longer carries an `Hostname` property. Instead of this, the property was moved to the `ListeningPort` structure. With this change, an ListeningHost can now listen to multiple hostnames, at multiple ports at multiple secure states, to the same router. Learn more about this change in the docs.
- Header values were coming with invalid encoding when using UTF-8 characters. Sisk's native HTTP engine (Microsoft HTTP2) does not support header values other than ASCII, however the `HttpServerFlags.NormalizeHeadersEncodings` flag will enable codepage conversion so that you get header values in the correct encoding. 

> HTTP header names must be received in ASCII encoding.

- Improvements made to the WebSocket module:
    - Now you can send and wait for messages synchronously by the method `WaitNext()`, which blocks the current thread and waits for the next message.
    - Added an timeout option for `HttpWebSocket.WaitForClose()`.
- Improvements to the way the server writes log messages.
- Improved router collision checker.
- Added an `HttpServer.Emit()` method, for HTTP server testing only. Don't use it on production environments.
- Added an `LogStream.WriteException()` to dump error logs.
- Fully removed all Regex uses on the HTTP server and replaced with string-methods. Performance should increase with this change.
- Fixed an bug where the cookie `SameSite` were being set with an unexpected `$`.
- Fixed an bug where the HTTP Event Sources and WebSockets were raising collection issues when using with too many simultaneos threads.
- Fixed an bug where the previous WebSocket connection with an identifier that already had an connection weren't being close by the new connection.
- Fixed an bug where request handlers weren't running in the same try-catch context as the routers callbacks.
- Removed `IRequestHandler.Identifier` property.

Service provider:

- Adjusted the configuration syntax to match the new listening ports and hosts concept.
- Added an new configurator: `UseHttpServer()`.
- Added an new configurator: `UseCors()`.
- Renamed `UseOverrides()` to `UseConfiguration()`.
- The server bootstrap method now runs outside an try-catch context, so you can get more detailed errors when bootstraping your application.

# 0.12.1

- Renamed these types namespaces from `Sisk.Core.Http` to `Sisk.Core.Http.Streams`:
    - HttpWebSocket
    - HttpWebSocketConnectionCollection
    - WebSocketRegistrationHandler
    - WebSocketUnregistrationHandler
    - HttpRequestEventSource
    - HttpEventSourceCollection
    - EventSourceRegistrationHandler
    - EventSourceUnregistrationHandler
- Created the `HttpWebSocketConnectionCollection` class, accessible from `HttpServer.WebSockets`.
- Added an option to identify web sockets connections when accepting the socket connection.
- Changed the `WebSocket.OnReceive` from property to an event.
- Deprecated `HttpServerExecutionStatus.EventSourceClosed`

# 0.12.0

- Web Sockets initial support. Learn more at https://sisk.proj.pw/#/docs/features/web-sockets.
- Deprecated `HttpServerExecutionStatus.EventSourceClosed`.
- Some bug fixes.

### Service providers

- Router factories now has an `Bootstrap` method, which is indeed to configure the services before
initializing the HTTP server.


# 0.11.1

- Server side events improvements.
  - Event Source connections are now traceable. When creating a connection with HttpRequest.GetEventSource(),
you can specify an identifier to retrieve that connection later in another context. The identifier is unique, and new connections with the same identifier will be discarded if there is already an existing one.
  - When calling the Close() or Dispose() method, the connection will no longer be found and will be discarded. One method calls the other and they do the same thing, except Close() returns an HttpResponse indicating that the event stream was closed.
  - When sending a message to a client with a closed connection, the Dispose() method will automatically close to indicate that the connection has ended.
  - HttpRequestEventSource now has a KeepAlive() method, which keeps the connection active until the client disconnects and the server can no longer send messages, and an overload that allows a maximum time that the server can go without sending messages until the connection is terminated.
  - More info in the documentation.
- Fixed some bugs with `ThrowExceptions` and the error logging system.
- Other improvements.

# 0.11.0

This update includes some changes that may break your code. This topic will help you to
readapt your code to receive these changes.

The entire service provider engine has been removed from the Sisk Core package and will
be available in another package dedicated to providing a service package using Sisk.

To do so, you can install the new package with the command:

```
> dotnet add package Sisk.ServiceProvider
```

## Breaking changes with service providers:

- `ServiceProvider.Wait()` was replaced by `PreventHauting()`.
- `ServiceProvider.SetFlags()` was replaced by `UseFlags()`.

The new service provider configurator syntax is:

```C#
var service = new ServiceProvider(program, "debug.json", app =>
{
    app.UseLocale(CultureInfo.GetCultureInfo("en-US"));
    app.UseOverrides(config =>
    {
        // do things with ServerConfiguration object
        // after it get parsed by the .json file
    });
    app.SetFlags(new HttpServerFlags());
    app.PreventHauting();
});
service.Initialize();
```

The delegate defined in the constructor is immediately executed before the HTTP server is started by `service.Initialize();`, overriding variables present in the JSON and allowing more configurations for the application.

## Other breaking changes:

- `Sisk.Core.Routing.Handlers` namespace was removed. All their members was moved to
`Sisk.Core.Routing`.
- `Sisk.Core.Routing.Handlers.RateLimiter` class was removed.
- `Sisk.Core.Routing.RouterFactory` class was moved to the Sisk.ServiceProvider package.
- `Sisk.Core.Routing.RequestHandlerFactory` class was moved to the Sisk.ServiceProvider package.
- Everything under `Sisk.Provider` was moved to the Sisk.ServiceProvider package.
- `AccessLogsStream` and `ErrorsLogsStream` types was changed from `TextWriter?` to `LogStream?`, which holds more functionality for the HTTP server occasion. No notable changes to the code should be made.
- Added the `ServerConfiguration.DefaultCultureInfo` property.
- Added the `ServerConfiguration.AccessLogsFormat` property.

## How to fix your code:

- Rename all references of `Sisk.Core.Routing.Handlers` to `Sisk.Core.Routing`.
- If you was using Sisk's service providers, install the new package mentioned above.
- If you was using the rate limiter, build your own rate limiter. You can use the old Sisk `RateLimiter` source code from Github too.

# 0.10.1

- Nothing was added, removed or fixed, but only metadata for the Nuget package.
- Some typo in the docs.

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