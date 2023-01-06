# Delegate ServerExecutionEventHandler
Last updated: Friday, 06 January 2023

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

