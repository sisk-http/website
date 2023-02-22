# Property Verbose

## Definition
Namespace: Sisk.Core.Http

```csharp
[Obsolete]
[System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
public VerboseMode Verbose { get; set; }
```

Gets or sets the message level the console will write. This property is now deprecated. Use [AccessLogsStream](/spec/Sisk/Core/Http/HttpServerConfiguration/AccessLogsStream) or [ErrorsLogsStream](/spec/Sisk/Core/Http/HttpServerConfiguration/ErrorsLogsStream) instead.

> Since Sisk 0.8.1, this property was deprecated. The defaults for the it's the verbose mode.
