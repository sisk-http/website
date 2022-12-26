# Method SetObject
Last updated: Sunday, 25 December 2022

## Definition
Namespace: Sisk.Core.Routing

```csharp
public void SetObject(object attrClassInstance)
```

Searches the object instance for methods with attribute [RouteAttribute](/spec/Sisk/Core/Routing/RouteAttribute) and optionals [RequestHandlerAttribute](/spec/Sisk/Core/Routing/RequestHandlerAttribute) , and creates routes from them.

## Parameters

| Key | Value |
| --- | --- |
| attrClassInstance | The instance of the class where the methods are. The routing methods must be static and marked with . | 

