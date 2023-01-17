# Responses

Responses represent objects that are HTTP responses to HTTP requests. They are sent by the server to the client as an indication of the request for a resource, page, document, file or other object.

An HTTP response is formed up of status, headers and content.

In this document, we will teach you how to architect HTTP responses with Sisk.

## Setting an HTTP status

The HTTP status list is the same since HTTP/1.0, and Sisk supports all of them. 

```cs
HttpResponse res = new HttpResponse();
res.Status = System.Net.HttpStatusCode.Accepted; // 202
```

You can see the full list of available HttpStatusCode [here](https://learn.microsoft.com/pt-br/dotnet/api/system.net.httpstatuscode).

## Setting body and content-type

Sisk supports native .NET content objects to send body in responses. You can use the [StringContent](https://learn.microsoft.com/pt-br/dotnet/api/system.net.http.stringcontent) class to send a JSON response for example:

```cs
HttpResponse res = new HttpResponse();
res.Content = new StringContent(myJson, Encoding.UTF8, "application/json");
```

You can ignore setting the `Content-Length` header as it's automatically calculated in the server infrastructure. Whenever you send an content length header, it will be ignored by the server and it will use the real content length based in the Content property length in bytes.

## Setting response headers

You can add, edit or remove headers you're sending in the response. The example below shows how to send an redirect response to the client.

```cs
HttpResponse res = new HttpResponse();
res.Status = System.Net.HttpStatusCode.Moved;
res.Headers.Add("Location", "/login");
```

You can also use the [CreateRedirectResponse](/spec/Sisk/Core/Http/HttpRequest/CreateRedirectResponse--String-Boolean) shorthand available in the HTTP request object.

```cs
return request.CreateRedirectResponse("/login", false);
```

## Easily setting cookies

Sisk has methods that facilitate the definition of cookies in the client. Cookies set by this method are already URL encoded and fit the RFC-6265 standard.

```cs
HttpResponse res = new HttpResponse();
res.SetCookie("cookie-name", "cookie-value");
```

There are other [more complete versions](/spec/Sisk/Core/Http/HttpResponse/SetCookie--String-String-String-String) of the same [SetCookie](/spec/Sisk/Core/Http/HttpResponse/SetCookie--String-String) method.

## Sending response in chunks

You can set the transfer encoding to chunked to send large responses.

```cs
HttpResponse res = new HttpResponse();
res.SendChunked = true;
```

## Sending an file

This example teaches how to send an binary content by HTTP server response. You can use this to serve images, files and other binary content.

```cs
byte[] myMusicAlbum = File.ReadAllBytes("my-music.zip");

HttpResponse res = new HttpResponse();
res.SendChunked = true;
res.Status = System.Net.HttpStatusCode.OK;
res.Content = new ByteArrayContent(myMusicAlbum);
res.Headers.Add("Content-Type", "application/zip"); // override the ByteArrayContent headers
```