# Class HttpResponse
Last updated: Thursday, 22 December 2022

## Definition
Namespace: Sisk.Core.Http

```csharp
public class HttpResponse
```

Represents an HTTP Response.

## Properties

| Property name | Description |
| --- | --- |
| [Status](/spec/Sisk/Core/Http/HttpResponse/Status) | Gets or sets the HTTP response status code. | 
| [Headers](/spec/Sisk/Core/Http/HttpResponse/Headers) | Gets a [NameValueCollection](/spec/System/Collections/Specialized/NameValueCollection) instance of the HTTP response headers. | 
| [Content](/spec/Sisk/Core/Http/HttpResponse/Content) | Gets or sets the HTTP response body contents. | 
| [SendChunked](/spec/Sisk/Core/Http/HttpResponse/SendChunked) | Gets or sets whether the HTTP response can be sent chunked. | 

## Methods

| Method name | Description |
| --- | --- |
| [GetRawHttpResponse(Boolean)](/spec/Sisk/Core/Http/HttpResponse/GetRawHttpResponse--Boolean) | Gets the raw HTTP response message. | 
| [SetCookie(String, String)](/spec/Sisk/Core/Http/HttpResponse/SetCookie--String-String) | Sets a cookie and sends it in the response to be set by the client. | 
| [SetCookie(String, String, String, String)](/spec/Sisk/Core/Http/HttpResponse/SetCookie--String-String-String-String) | Sets a cookie and sends it in the response to be set by the client. | 

## Constructors

| Method name | Description |
| --- | --- |
| [HttpResponse()](/spec/Sisk/Core/Http/HttpResponse/_ctor--) | Creates an new [HttpResponse](/spec/Sisk/Core/Http/HttpResponse) instance with HTTP OK status code and no content. | 
| [HttpResponse(HttpStatusCode)](/spec/Sisk/Core/Http/HttpResponse/_ctor--HttpStatusCode) | Creates an new [HttpResponse](/spec/Sisk/Core/Http/HttpResponse) instance with given status code. | 
| [HttpResponse(Int32)](/spec/Sisk/Core/Http/HttpResponse/_ctor--Int32) | Creates an new [HttpResponse](/spec/Sisk/Core/Http/HttpResponse) instance with given status code. | 

