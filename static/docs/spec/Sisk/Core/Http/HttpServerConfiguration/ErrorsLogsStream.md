# Property ErrorsLogsStream

## Definition
Namespace: Sisk.Core.Http

```csharp
public TextWriter? ErrorsLogsStream { get; set; }
```

Gets or sets the [TextWriter](/spec/System/IO/TextWriter) object which the HTTP server will write HTTP server error transcriptions to.

> This stream could be empty if ThrowExceptions is true.
