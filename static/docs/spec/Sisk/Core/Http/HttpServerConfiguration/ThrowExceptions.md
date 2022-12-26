# Property ThrowExceptions
Last updated: Sunday, 25 December 2022

## Definition
Namespace: Sisk.Core.Http

```csharp
public bool ThrowExceptions { get; set; } = false;
```

Gets or sets whether the server should throw exceptions instead of returing it on [HttpServerExecutionStatus](/spec/Sisk/Core/Http/HttpServerExecutionStatus) if any is thrown while processing requests.

