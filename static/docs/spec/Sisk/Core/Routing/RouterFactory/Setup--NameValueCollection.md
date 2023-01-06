# Method Setup
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Routing

```csharp
public abstract void Setup(NameValueCollection setupParameters);
```

Method that is called by the Agirax instantiator with the parameters defined in configuration before calling [BuildRouter](/spec/Sisk/Core/Routing/RouterFactory/BuildRouter) .

## Parameters

| Key | Value |
| --- | --- |
| setupParameters | Parameters that are defined in a configuration file. | 

