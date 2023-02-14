# Class RouteAttribute

## Definition
Namespace: Sisk.Core.Routing

```csharp
[AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
public class RouteAttribute : Attribute
```

Represents an class that, when applied to a method, will be recognized by a router as a route.

## Properties

| Property name | Description |
| --- | --- |
| [Method](/spec/Sisk/Core/Routing/RouteAttribute/Method) | Gets or sets the matching HTTP method. If it is "Any", the route will just use the path expression to be matched, not the HTTP method. | 
| [Path](/spec/Sisk/Core/Routing/RouteAttribute/Path) | Gets or sets the path expression that will be interpreted by the router and validated by the requests. | 
| [Name](/spec/Sisk/Core/Routing/RouteAttribute/Name) | Gets or sets the route name. It allows it to be found by other routes and makes it easier to create links. | 
| [UseCors](/spec/Sisk/Core/Routing/RouteAttribute/UseCors) | Gets or sets whether this route should send Cross-Origin Resource Sharing headers in the response. | 
| [LogMode](/spec/Sisk/Core/Routing/RouteAttribute/LogMode) | Gets or sets how this route can write messages to log files on the server. | 

## Constructors

| Method name | Description |
| --- | --- |
| [RouteAttribute(RouteMethod, String)](/spec/Sisk/Core/Routing/RouteAttribute/_ctor--RouteMethod-String) | Creates an new [RouteAttribute](/spec/Sisk/Core/Routing/RouteAttribute) instance with given route method and path pattern. | 

