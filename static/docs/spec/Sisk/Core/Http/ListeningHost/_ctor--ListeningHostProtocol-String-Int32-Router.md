# Constructor #ctor
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Http

```csharp
public ListeningHost(ListeningHostProtocol protocol, string hostname, int port, Router r)
```

Creates an new [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) value with given parameters.

## Parameters

| Key | Value |
| --- | --- |
| protocol | The HTTP protocol this host will listen on. | 
| hostname | The hostname (without the port) that this host will listen on the local machine. | 
| port | The port this host will listen on. | 
| r | The router which will handle this listener requests. | 

