# Delegate ServerExecutionEventHandler
Last updated: Sunday, 25 December 2022

## Definition
Namespace: Sisk.Core.Http

```csharp
public delegate void ServerExecutionEventHandler(object sender, HttpServerExecutionResult e);
```

Represents the function that is called when a server receives and computes a request.

## Parameters

| Key | Value |
| --- | --- |
| sender | The  calling the function. | 
| e | Server request and operation information. | 

