# Property MaximumErrorAttempts

## Definition
Namespace: Sisk.Core.Http

```csharp
public int MaximumErrorAttempts { get; set; }
```

Maximum attempts to resend a message if it fails. Leave it as -1 to never stop trying to resent failed messages.

