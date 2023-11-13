# 0.16 small changes

- Created the type `HttpContextBagRepository` for the `HttpContext.RequestBag`.
- `SetContextBag`/`GetContextBag` declaration now expects `T : notnull` type.
- Rewrited the `HttpServer.HumanReadableSize` internal void.
- Routers are now binded to httpservers before starting to listen to requests.
- ListeningHostRepository `GetRequestMatchingListeningHost` now always returns the first host if only one ListeningHost is defined.
- Changed the access of `CookieHelper.SetCookieHelper` from `internal` to `protected` to allow it's implementation in more types.
- Removed the `sealed` attribute from `HttpResponse`. Now you can extend it the way you want.
- Fixed an issue where `HttpResponse.Close()` weren't refusing connections, instead was closing then.
- Fixed `HttpStatusInformation` missing docs components.
- New `HttpStatusInformation` instances will construct their `Description` based on the `HttpStatusCode` information.
- In the SetCookie method, the "Domain" parameter will remove the URL scheme if it is provided.
- Rewrited the `CombinePaths` implementation.
- Added `WithCookie()` fluent method to `HttpResponse`.