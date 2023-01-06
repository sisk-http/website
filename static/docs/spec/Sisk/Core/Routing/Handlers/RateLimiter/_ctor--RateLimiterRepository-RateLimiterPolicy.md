# Constructor #ctor
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Routing.Handlers

```csharp
public RateLimiter(RateLimiterRepository repository, RateLimiterPolicy limitingPolicy)
```

Creates a new [RateLimiter](/spec/Sisk/Core/Routing/Handlers/RateLimiter) instance with given parameters.

## Parameters

| Key | Value |
| --- | --- |
| repository | Gets or sets the cache of requests that this Rate Limiter stores. | 
| limitingPolicy | Gets or sets the routing limitation policy settings for this RateLimiter. | 

