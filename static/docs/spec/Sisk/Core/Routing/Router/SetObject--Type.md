# Method SetObject

## Definition
Namespace: Sisk.Core.Routing

```csharp
public void SetObject(Type attrClassType)
```

Searches the object instance for methods with attribute [RouteAttribute](/spec/Sisk/Core/Routing/RouteAttribute) and optionals [RequestHandlerAttribute](/spec/Sisk/Core/Routing/RequestHandlerAttribute) , and creates routes from them.

## Parameters

| Key | Value |
| --- | --- |
| attrClassType | The type of the class where the static methods are. The routing methods must be static and marked with . | 

