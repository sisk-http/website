# Class RateLimiterRepository
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Routing.Handlers

```csharp
public class RateLimiterRepository
```

Represents an [RateLimiter](/spec/Sisk/Core/Routing/Handlers/RateLimiter) cache repository.

## Properties

| Property name | Description |
| --- | --- |
| [HeapSize](/spec/Sisk/Core/Routing/Handlers/RateLimiterRepository/HeapSize) | Gets or sets the maximum number of requests this cache can store. | 

## Methods

| Method name | Description |
| --- | --- |
| [CacheRequest(HttpRequest)](/spec/Sisk/Core/Routing/Handlers/RateLimiterRepository/CacheRequest--HttpRequest) | Caches the given HTTP request. | 
| [TestRequestByPolicy(HttpRequest, RateLimiterPolicy)](/spec/Sisk/Core/Routing/Handlers/RateLimiterRepository/TestRequestByPolicy--HttpRequest-RateLimiterPolicy) | Tests whether a request is eligible to continue or will be throttled. | 

