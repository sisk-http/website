# Class ListeningHost
Last updated: Thursday, 22 December 2022

## Definition
Namespace: Sisk.Core.Http

```csharp
public class ListeningHost
```

Provides a structure to contain the fields needed by an http server host.

## Properties

| Property name | Description |
| --- | --- |
| [CrossOriginResourceSharingPolicy](/spec/Sisk/Core/Http/ListeningHost/CrossOriginResourceSharingPolicy) | Gets or sets the CORS sharing policy object. | 
| [Label](/spec/Sisk/Core/Http/ListeningHost/Label) | Gets or sets a label for this Listening Host. | 
| [Hostname](/spec/Sisk/Core/Http/ListeningHost/Hostname) | Gets or sets the hostname (without the port) that this host will listen on the local machine. | 
| [Ports](/spec/Sisk/Core/Http/ListeningHost/Ports) | Gets or sets the ports that this host will listen on. | 
| [Router](/spec/Sisk/Core/Http/ListeningHost/Router) | Gets or sets the [Router](/spec/Sisk/Core/Routing/Router) for this [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) instance. | 

## Constructors

| Method name | Description |
| --- | --- |
| [ListeningHost(String, Int32, Router)](/spec/Sisk/Core/Http/ListeningHost/_ctor--String-Int32-Router) | Creates an new [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) value with given parameters. | 
| [ListeningHost(String, ListeningPort, Router)](/spec/Sisk/Core/Http/ListeningHost/_ctor--String-ListeningPort-Router) | Creates an new [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) value with given parameters. | 
| [ListeningHost(String, Int32[], Router)](/spec/Sisk/Core/Http/ListeningHost/_ctor--String-Int32[]-Router) | Creates an new [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) value with given parameters. | 
| [ListeningHost(String, ListeningPort[], Router)](/spec/Sisk/Core/Http/ListeningHost/_ctor--String-ListeningPort[]-Router) | Creates an new [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) value with given parameters. | 
| [ListeningHost(String, Router)](/spec/Sisk/Core/Http/ListeningHost/_ctor--String-Router) | Creates an new [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) instance with given URL. | 

