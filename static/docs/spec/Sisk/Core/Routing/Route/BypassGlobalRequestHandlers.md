# Property BypassGlobalRequestHandlers
Last updated: Thursday, 22 December 2022

## Definition
Namespace: Sisk.Core.Routing

```csharp
public IRequestHandler[]? BypassGlobalRequestHandlers { get; set; }
```

Gets or sets the global request handlers that will not run on this route. The verification is given by the identifier of the instance of an [IRequestHandler](/spec/Sisk/Core/Routing/Handlers/IRequestHandler) .

