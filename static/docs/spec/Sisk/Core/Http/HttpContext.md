# Class HttpContext
Last updated: Wednesday, 28 December 2022

## Definition
Namespace: Sisk.Core.Http

```csharp
public class HttpContext
```

Represents an context for Http requests.

## Properties

| Property name | Description |
| --- | --- |
| [RequestBag](/spec/Sisk/Core/Http/HttpContext/RequestBag) | Gets or sets a managed object that is accessed and modified by request handlers. | 
| [HttpServer](/spec/Sisk/Core/Http/HttpContext/HttpServer) | Gets the context Http Server instance. | 
| [RouterResponse](/spec/Sisk/Core/Http/HttpContext/RouterResponse) | Gets or sets the HTTP response for this context. This property is only not null when a post-executing [IRequestHandler](/spec/Sisk/Core/Routing/Handlers/IRequestHandler) was executed for this router context. | 
| [MatchedRoute](/spec/Sisk/Core/Http/HttpContext/MatchedRoute) | Gets the matched Http Route object from the Router. | 

