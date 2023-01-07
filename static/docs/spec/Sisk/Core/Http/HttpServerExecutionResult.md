# Class HttpServerExecutionResult

## Definition
Namespace: Sisk.Core.Http

```csharp
public class HttpServerExecutionResult
```

Represents the results of executing a request on the server.

## Properties

| Property name | Description |
| --- | --- |
| [Request](/spec/Sisk/Core/Http/HttpServerExecutionResult/Request) | Represents the request received in this diagnosis. | 
| [Response](/spec/Sisk/Core/Http/HttpServerExecutionResult/Response) | Represents the response sent by the server. | 
| [Status](/spec/Sisk/Core/Http/HttpServerExecutionResult/Status) | Represents the status of server operation. | 
| [ServerException](/spec/Sisk/Core/Http/HttpServerExecutionResult/ServerException) | Gets the exception that was thrown when executing the route, if any. | 
| [IsSuccessStatus](/spec/Sisk/Core/Http/HttpServerExecutionResult/IsSuccessStatus) | Gets an boolean indicating if this execution status is an success status. | 
| [RequestSize](/spec/Sisk/Core/Http/HttpServerExecutionResult/RequestSize) | Gets the request size in bytes. | 
| [ResponseSize](/spec/Sisk/Core/Http/HttpServerExecutionResult/ResponseSize) | Gets the response size in bytes, if any. | 

