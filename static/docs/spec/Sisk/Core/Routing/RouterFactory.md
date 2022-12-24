# Class RouterFactory
Last updated: Thursday, 22 December 2022

## Definition
Namespace: Sisk.Core.Routing

```csharp
public abstract class RouterFactory
```

Provides a class that instantiates a router, capable of porting applications for use with Agirax.

## Methods

| Method name | Description |
| --- | --- |
| [BuildRouter()](/spec/Sisk/Core/Routing/RouterFactory/BuildRouter--) | Build and gets a router that will be used later by an [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) . | 
| [Setup(NameValueCollection)](/spec/Sisk/Core/Routing/RouterFactory/Setup--NameValueCollection) | Method that is called by the Agirax instantiator with the parameters defined in configuration before calling [BuildRouter](/spec/Sisk/Core/Routing/RouterFactory/BuildRouter) . | 

