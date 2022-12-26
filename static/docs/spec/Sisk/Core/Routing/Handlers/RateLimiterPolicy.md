# Class RateLimiterPolicy
Last updated: Sunday, 25 December 2022

## Definition
Namespace: Sisk.Core.Routing.Handlers

```csharp
public class RateLimiterPolicy
```

Represents the settings of a [RateLimiter](/spec/Sisk/Core/Routing/Handlers/RateLimiter) object.

## Properties

| Property name | Description |
| --- | --- |
| [TimeToLive](/spec/Sisk/Core/Routing/Handlers/RateLimiterPolicy/TimeToLive) | Gets or sets the maximum time between the maximum requests that it should be executed. | 
| [MaximumRequests](/spec/Sisk/Core/Routing/Handlers/RateLimiterPolicy/MaximumRequests) | Gets or sets the maximum number of requests that will be allowed in the time specified in TimeToLive. | 
| [LimitByOriginIP](/spec/Sisk/Core/Routing/Handlers/RateLimiterPolicy/LimitByOriginIP) | Gets or sets if the [RateLimiter](/spec/Sisk/Core/Routing/Handlers/RateLimiter) will limit by the IP address. | 
| [LimitByCookies](/spec/Sisk/Core/Routing/Handlers/RateLimiterPolicy/LimitByCookies) | Gets or sets if the [RateLimiter](/spec/Sisk/Core/Routing/Handlers/RateLimiter) will limit by the Cookie value. | 

## Constructors

| Method name | Description |
| --- | --- |
| [RateLimiterPolicy(TimeSpan, Int32, Boolean, Boolean)](/spec/Sisk/Core/Routing/Handlers/RateLimiterPolicy/_ctor--TimeSpan-Int32-Boolean-Boolean) | Create a new [RateLimiterPolicy](/spec/Sisk/Core/Routing/Handlers/RateLimiterPolicy) instance with given parameters. | 

