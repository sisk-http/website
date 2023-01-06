# Property BypassGlobalRequestHandlers
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Routing

```csharp
public IRequestHandler[]? BypassGlobalRequestHandlers { get; set; }
```

Gets or sets the global request handlers that will not run on this route. The verification is given by the identifier of the instance of an [IRequestHandler](/spec/Sisk/Core/Routing/Handlers/IRequestHandler) .

