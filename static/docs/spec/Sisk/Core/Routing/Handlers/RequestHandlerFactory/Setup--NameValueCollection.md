# Method Setup

## Definition
Namespace: Sisk.Core.Routing.Handlers

```csharp
public abstract void Setup(NameValueCollection setupParameters);
```

Method that is called by the Agirax instantiator with the parameters defined in configuration before calling [BuildRequestHandlers](/spec/Sisk/Core/Routing/Handlers/RequestHandlerFactory/BuildRequestHandlers) .

## Parameters

| Key | Value |
| --- | --- |
| setupParameters | Parameters that are defined in a configuration file. | 

