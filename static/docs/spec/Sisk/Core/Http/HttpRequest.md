# Class HttpRequest
Last updated: Thursday, 22 December 2022

## Definition
Namespace: Sisk.Core.Http

```csharp
public sealed class HttpRequest
```

Represents an HTTP request received by a Sisk server.

## Properties

| Property name | Description |
| --- | --- |
| [RequestId](/spec/Sisk/Core/Http/HttpRequest/RequestId) | Gets a unique random ID for this request that is generated on server input. | 
| [IsContentAvailable](/spec/Sisk/Core/Http/HttpRequest/IsContentAvailable) | Gets a boolean indicating whether the content of this request has been processed by the server. | 
| [HasContents](/spec/Sisk/Core/Http/HttpRequest/HasContents) | Gets a boolean indicating whether this request has contents. | 
| [Headers](/spec/Sisk/Core/Http/HttpRequest/Headers) | Gets the HTTP request headers. | 
| [Host](/spec/Sisk/Core/Http/HttpRequest/Host) | Get the requested host header (without port) from this HTTP request. | 
| [Path](/spec/Sisk/Core/Http/HttpRequest/Path) | Gets the HTTP request path without the query string. | 
| [FullPath](/spec/Sisk/Core/Http/HttpRequest/FullPath) | Gets the full HTTP request path with the query string. | 
| [FullUrl](/spec/Sisk/Core/Http/HttpRequest/FullUrl) | Gets the full URL for this request, with scheme, host, port (if any), path and query. | 
| [RequestEncoding](/spec/Sisk/Core/Http/HttpRequest/RequestEncoding) | Gets the Encoding used in the request. | 
| [Method](/spec/Sisk/Core/Http/HttpRequest/Method) | Gets the HTTP request method. | 
| [Body](/spec/Sisk/Core/Http/HttpRequest/Body) | Gets the HTTP request body as string. | 
| [RawBody](/spec/Sisk/Core/Http/HttpRequest/RawBody) | Gets the HTTP request body as a byte array. | 
| [Query](/spec/Sisk/Core/Http/HttpRequest/Query) | Gets the HTTP request query extracted from the path string. This property also contains routing parameters. | 
| [QueryString](/spec/Sisk/Core/Http/HttpRequest/QueryString) | Gets the HTTP request URL raw query string. | 
| [Origin](/spec/Sisk/Core/Http/HttpRequest/Origin) | Gets the incoming IP address from the request. | 
| [RequestedAt](/spec/Sisk/Core/Http/HttpRequest/RequestedAt) | Gets the moment which the request was received by the server. | 
| [Context](/spec/Sisk/Core/Http/HttpRequest/Context) | Gets the HttpContext for this request. | 

## Methods

| Method name | Description |
| --- | --- |
| [GetMultipartFormContent()](/spec/Sisk/Core/Http/HttpRequest/GetMultipartFormContent--) | Gets the multipart form content for this request. | 
| [GetFormContent()](/spec/Sisk/Core/Http/HttpRequest/GetFormContent--) | Gets the values sent by a form in this request. | 
| [GetRawHttpRequest(Boolean)](/spec/Sisk/Core/Http/HttpRequest/GetRawHttpRequest--Boolean) | Gets the raw HTTP request message from the socket. | 
| [GetHeader(String)](/spec/Sisk/Core/Http/HttpRequest/GetHeader--String) | Gets a header value using a case-insensitive search. | 
| [GetQueryValue(String)](/spec/Sisk/Core/Http/HttpRequest/GetQueryValue--String) | Gets a query value using an case-insensitive search. | 
| [CreateHeadResponse()](/spec/Sisk/Core/Http/HttpRequest/CreateHeadResponse--) | Create an HTTP response with code 200 OK without any body. | 
| [CreateResponse(HttpStatusCode, String)](/spec/Sisk/Core/Http/HttpRequest/CreateResponse--HttpStatusCode-String) | Creates an HttpResponse object with given status code and body content. | 
| [CreateResponse(HttpStatusCode)](/spec/Sisk/Core/Http/HttpRequest/CreateResponse--HttpStatusCode) | Creates an HttpResponse object with given status code. | 
| [CreateOkResponse(String)](/spec/Sisk/Core/Http/HttpRequest/CreateOkResponse--String) | Creates an HttpResponse object with status code 200 OK and given content. | 
| [CreateRedirectResponse(String, Boolean)](/spec/Sisk/Core/Http/HttpRequest/CreateRedirectResponse--String-Boolean) | Creates an HTTP 301 response code for the given location. | 
| [GetEventSource()](/spec/Sisk/Core/Http/HttpRequest/GetEventSource--) | Gets an Event Source interface for this request. Calling this method will put this [HttpRequest](/spec/Sisk/Core/Http/HttpRequest) instance in it's event source listening state. | 

