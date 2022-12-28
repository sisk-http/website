# Class RequestHandlerAttribute
Last updated: Wednesday, 28 December 2022

## Definition
Namespace: Sisk.Core.Routing

```csharp
[AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
public class RequestHandlerAttribute : Attribute
```

Specifies that the method, when used on this attribute, will instantiate the type and call the [IRequestHandler](/spec/Sisk/Core/Routing/Handlers/IRequestHandler) with given parameters.

## Properties

| Property name | Description |
| --- | --- |
| [RequestHandlerType](/spec/Sisk/Core/Routing/RequestHandlerAttribute/RequestHandlerType) | Gets or sets the type that implements [IRequestHandler](/spec/Sisk/Core/Routing/Handlers/IRequestHandler) which will be instantiated. | 
| [ConstructorArguments](/spec/Sisk/Core/Routing/RequestHandlerAttribute/ConstructorArguments) | Specifies parameters for the given type's constructor. | 

## Constructors

| Method name | Description |
| --- | --- |
| [RequestHandlerAttribute(Type)](/spec/Sisk/Core/Routing/RequestHandlerAttribute/_ctor--Type) | Creates a new instance of this attribute with the informed parameters. | 

