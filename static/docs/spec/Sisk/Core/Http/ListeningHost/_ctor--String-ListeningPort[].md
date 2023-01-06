# Constructor #ctor
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Http

```csharp
public ListeningHost(string hostname, ListeningPort[] ports)
```

Creates the instance of a routerless listener host without any [Router](/spec/Sisk/Core/Routing/Router) . This instance will not be listened until it has a router.

## Parameters

| Key | Value |
| --- | --- |
| hostname | The hostname (without the port) that this host will listen on the local machine. | 
| ports | The ports which this host will listen on. | 

