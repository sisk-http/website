# Class HttpServer
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Http

```csharp
public class HttpServer : IDisposable
```

Provides an lightweight HTTP server powered by Sisk.

## Properties

| Property name | Description |
| --- | --- |
| [ServerConfiguration](/spec/Sisk/Core/Http/HttpServer/ServerConfiguration) | Gets or sets the Server Configuration object. | 
| [OnConnectionClose](/spec/Sisk/Core/Http/HttpServer/OnConnectionClose) | Event that is called when this [HttpServer](/spec/Sisk/Core/Http/HttpServer) computes an request and it's response. | 
| [OnConnectionOpen](/spec/Sisk/Core/Http/HttpServer/OnConnectionOpen) | Event that is called when this [HttpServer](/spec/Sisk/Core/Http/HttpServer) receives an request. | 

## Methods

| Method name | Description |
| --- | --- |
| [GetVersion()](/spec/Sisk/Core/Http/HttpServer/GetVersion--) | Get Sisk version label. | 
| [Start()](/spec/Sisk/Core/Http/HttpServer/Start--) | Starts listening to the set port and handling requests on this server. | 
| [Stop()](/spec/Sisk/Core/Http/HttpServer/Stop--) | Stops the server from listening and stops the request handler. | 
| [Dispose()](/spec/Sisk/Core/Http/HttpServer/Dispose--) | Invalidates this class and releases the resources used by it, and permanently closes the HTTP server. | 

## Constructors

| Method name | Description |
| --- | --- |
| [HttpServer(HttpServerConfiguration)](/spec/Sisk/Core/Http/HttpServer/_ctor--HttpServerConfiguration) | Creates a new default configuration [HttpServer](/spec/Sisk/Core/Http/HttpServer) instance with the given Route and server configuration. | 
| [HttpServer()](/spec/Sisk/Core/Http/HttpServer/Restart--) | Restarts this HTTP server, sending all processing responses and starting them again, reading the listening ports again. | 

