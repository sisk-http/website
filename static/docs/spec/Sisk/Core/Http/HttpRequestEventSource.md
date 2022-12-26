# Class HttpRequestEventSource
Last updated: Sunday, 25 December 2022

## Definition
Namespace: Sisk.Core.Http

```csharp
public class HttpRequestEventSource
```

An [HttpRequestEventSource](/spec/Sisk/Core/Http/HttpRequestEventSource) instance opens a persistent connection to the request, which sends events in text/event-stream format.

## Properties

| Property name | Description |
| --- | --- |
| [MaximumErrorAttempts](/spec/Sisk/Core/Http/HttpRequestEventSource/MaximumErrorAttempts) | Maximum attempts to resend a message if it fails. Leave it as -1 to never stop trying to resent failed messages. | 

## Methods

| Method name | Description |
| --- | --- |
| [Send(String)](/spec/Sisk/Core/Http/HttpRequestEventSource/Send--String) | Writes a event message with their data to the event listener. | 
| [Close()](/spec/Sisk/Core/Http/HttpRequestEventSource/Close--) | Closes the event listener and it's connection. | 
| [Cancel()](/spec/Sisk/Core/Http/HttpRequestEventSource/Cancel--) | Cancels the sending queue from sending pending messages and clears the queue. | 

