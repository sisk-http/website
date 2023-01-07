# Property RouterResponse

## Definition
Namespace: Sisk.Core.Http

```csharp
public HttpResponse? RouterResponse { get; }
```

Gets or sets the HTTP response for this context. This property is only not null when a post-executing [IRequestHandler](/spec/Sisk/Core/Routing/Handlers/IRequestHandler) was executed for this router context.

