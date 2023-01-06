# Class RequestHandlerFactory
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Routing.Handlers

```csharp
public abstract class RequestHandlerFactory
```

Provides a class that instantiates request handlers, capable of porting them to Agirax.

## Methods

| Method name | Description |
| --- | --- |
| [BuildRequestHandlers()](/spec/Sisk/Core/Routing/Handlers/RequestHandlerFactory/BuildRequestHandlers--) | Builds and gets the [IRequestHandler](/spec/Sisk/Core/Routing/Handlers/IRequestHandler) instance objects used later by an [Route](/spec/Sisk/Core/Routing/Route) . | 
| [Setup(NameValueCollection)](/spec/Sisk/Core/Routing/Handlers/RequestHandlerFactory/Setup--NameValueCollection) | Method that is called by the Agirax instantiator with the parameters defined in configuration before calling [BuildRequestHandlers](/spec/Sisk/Core/Routing/Handlers/RequestHandlerFactory/BuildRequestHandlers) . | 

