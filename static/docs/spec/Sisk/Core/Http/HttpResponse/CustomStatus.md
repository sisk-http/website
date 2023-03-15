# Property CustomStatus

## Definition
Namespace: Sisk.Core.Http

```csharp
public HttpStatusInformation? CustomStatus { get; set; }
```

Gets or sets an custom HTTP status code and description for this HTTP response. If this property ins't null, it will overwrite the [Status](/spec/Sisk/Core/Http/HttpResponse/Status) property in this class.

