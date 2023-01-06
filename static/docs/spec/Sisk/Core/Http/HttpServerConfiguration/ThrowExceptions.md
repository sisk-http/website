# Property ThrowExceptions
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Http

```csharp
public bool ThrowExceptions { get; set; } = false;
```

Gets or sets whether the server should throw exceptions instead of returing it on [HttpServerExecutionStatus](/spec/Sisk/Core/Http/HttpServerExecutionStatus) if any is thrown while processing requests.

