# Property AccessLogsStream

## Definition
Namespace: Sisk.Core.Http

```csharp
public TextWriter? AccessLogsStream { get; set; }
```

Gets or sets the [TextWriter](/spec/System/IO/TextWriter) object which the HTTP server will write HTTP server access messages to.

> This property defaults to Console.Out. By setting this property to null, no output will be written, completely ignoring the `Verbose` property.
