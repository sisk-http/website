# Constructor #ctor
Last updated: Thursday, 22 December 2022

## Definition
Namespace: Sisk.Core.Http

```csharp
public ListeningHost(ListeningHostProtocol protocol, string hostname, ListeningPort[] ports, Router r)
```

Creates an new [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) value with given parameters.

## Parameters

| Key | Value |
| --- | --- |
| hostname | The hostname (without the port) that this host will listen on the local machine. | 
| ports | The ports which this host will listen on. | 
| r | The router which will handle this listener requests. | 

