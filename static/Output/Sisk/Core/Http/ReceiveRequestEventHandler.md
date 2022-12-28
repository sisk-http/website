# Delegate ReceiveRequestEventHandler
Last updated: Wednesday, 28 December 2022

## Definition
Namespace: Sisk.Core.Http

```csharp
public delegate void ReceiveRequestEventHandler(object sender, HttpRequest request);
```

Represents a function that is called when the server receives an HTTP request.

## Parameters

| Key | Value |
| --- | --- |
| sender | The  calling the function. | 
| request | The received request. | 

