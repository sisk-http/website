# Interface IRequestHandler

## Definition
Namespace: Sisk.Core.Routing.Handlers

```csharp
public interface IRequestHandler
```

Represents an interface that is executed before a request.

## Properties

| Property name | Description |
| --- | --- |
| [Identifier](/spec/Sisk/Core/Routing/Handlers/IRequestHandler/Identifier) | Gets or sets the unique identifier of the instance of this interface. | 
| [ExecutionMode](/spec/Sisk/Core/Routing/Handlers/IRequestHandler/ExecutionMode) | Gets or sets when this RequestHandler should run. | 

## Methods

| Method name | Description |
| --- | --- |
| [Execute(HttpRequest, HttpContext)](/spec/Sisk/Core/Routing/Handlers/IRequestHandler/Execute--HttpRequest-HttpContext) | This method is called by the [Router](/spec/Sisk/Core/Routing/Router) before executing a request when the [Route](/spec/Sisk/Core/Routing/Route) instantiates an object that implements this interface. If it returns a [HttpResponse](/spec/Sisk/Core/Http/HttpResponse) object, the route callback is not called and all execution of the route is stopped. If it returns "null", the execution is continued. | 

