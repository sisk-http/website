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