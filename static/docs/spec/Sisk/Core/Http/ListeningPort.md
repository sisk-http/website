# Struct ListeningPort
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Http

```csharp
public struct ListeningPort
```

Provides a structure to contain a listener port for an [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) instance.

## Properties

| Property name | Description |
| --- | --- |
| [Port](/spec/Sisk/Core/Http/ListeningPort/Port) | Gets or sets the port where the server will listen. | 
| [Secure](/spec/Sisk/Core/Http/ListeningPort/Secure) | Gets or sets whether the server should listen to this port securely (SSL). | 

## Constructors

| Method name | Description |
| --- | --- |
| [ListeningPort(Int32)](/spec/Sisk/Core/Http/ListeningPort/_ctor--Int32) | Creates an new [ListeningPort](/spec/Sisk/Core/Http/ListeningPort) instance with the specified port. | 
| [ListeningPort(Int32, Boolean)](/spec/Sisk/Core/Http/ListeningPort/_ctor--Int32-Boolean) | Creates an new [ListeningPort](/spec/Sisk/Core/Http/ListeningPort) instance with the specified port and secure context. | 

