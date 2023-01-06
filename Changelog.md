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