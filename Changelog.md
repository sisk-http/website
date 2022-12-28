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