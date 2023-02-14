# Method SetObject

## Definition
Namespace: Sisk.Core.Routing

```csharp
public void SetObject(object attrClassInstance)
```

Searches the object instance for methods with attribute [RouteAttribute](/spec/Sisk/Core/Routing/RouteAttribute) and optionals [RequestHandlerAttribute](/spec/Sisk/Core/Routing/RequestHandlerAttribute) , and creates routes from them.

## Parameters

| Key | Value |
| --- | --- |
| attrClassInstance | The instance of the class where the instance methods are. The routing methods must be instance methods and marked with . | 

