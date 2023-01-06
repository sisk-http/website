# Class RateLimiter
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Routing.Handlers

```csharp
public class RateLimiter : IRequestHandler
```

Represents a rate limiter that is executed after the socket receives the HTTP message from the server.

## Properties

| Property name | Description |
| --- | --- |
| [Repository](/spec/Sisk/Core/Routing/Handlers/RateLimiter/Repository) | Gets or sets the cache of requests that this Rate Limiter stores. | 
| [LimitingPolicy](/spec/Sisk/Core/Routing/Handlers/RateLimiter/LimitingPolicy) | Gets or sets the routing limitation policy settings for this RateLimiter. | 
| [Identifier](/spec/Sisk/Core/Routing/Handlers/RateLimiter/Identifier) | Gets a unique identifier for this [RateLimiter](/spec/Sisk/Core/Routing/Handlers/RateLimiter) instance. | 
| [ExecutionMode](/spec/Sisk/Core/Routing/Handlers/RateLimiter/ExecutionMode) | Gets or sets when this RequestHandler should run. | 

## Methods

| Method name | Description |
| --- | --- |
| [Execute(HttpRequest, HttpContext)](/spec/Sisk/Core/Routing/Handlers/RateLimiter/Execute--HttpRequest-HttpContext) | Executes the rate limiter action on the route and checks if it will be blocked or not. | 

## Constructors

| Method name | Description |
| --- | --- |
| [RateLimiter(RateLimiterRepository, RateLimiterPolicy)](/spec/Sisk/Core/Routing/Handlers/RateLimiter/_ctor--RateLimiterRepository-RateLimiterPolicy) | Creates a new [RateLimiter](/spec/Sisk/Core/Routing/Handlers/RateLimiter) instance with given parameters. | 

