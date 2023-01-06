# Struct ListeningHost
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Http

```csharp
public struct ListeningHost
```

Provides a structure to contain the fields needed by an http server host.

## Properties

| Property name | Description |
| --- | --- |
| [Label](/spec/Sisk/Core/Http/ListeningHost/Label) | Gets or sets a label for this Listening Host. | 
| [Protocol](/spec/Sisk/Core/Http/ListeningHost/Protocol) | Gets or sets the HTTP protocol this host will listen on. | 
| [Hostname](/spec/Sisk/Core/Http/ListeningHost/Hostname) | Gets or sets the hostname (without the port) that this host will listen on the local machine. | 
| [Port](/spec/Sisk/Core/Http/ListeningHost/Port) | Gets or sets the port this host will listen on. | 
| [Router](/spec/Sisk/Core/Http/ListeningHost/Router) | Gets or sets the [Router](/spec/Sisk/Core/Routing/Router) for this [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) instance. | 

## Methods

| Method name | Description |
| --- | --- |
| [ToString()](/spec/Sisk/Core/Http/ListeningHost/ToString--) | Gets an URL representation of this host. | 

## Constructors

| Method name | Description |
| --- | --- |
| [ListeningHost(ListeningHostProtocol, String, Int32, Router)](/spec/Sisk/Core/Http/ListeningHost/_ctor--ListeningHostProtocol-String-Int32-Router) | Creates an new [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) value with given parameters. | 
| [ListeningHost(String, Router)](/spec/Sisk/Core/Http/ListeningHost/_ctor--String-Router) | Creates an new [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) instance with given URL. | 

