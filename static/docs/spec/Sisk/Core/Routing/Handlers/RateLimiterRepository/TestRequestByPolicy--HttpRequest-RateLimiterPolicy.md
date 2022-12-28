# Method TestRequestByPolicy
Last updated: Wednesday, 28 December 2022

## Definition
Namespace: Sisk.Core.Routing.Handlers

```csharp
public bool TestRequestByPolicy(HttpRequest request, RateLimiterPolicy policy)
```

Tests whether a request is eligible to continue or will be throttled.

## Parameters

| Key | Value |
| --- | --- |
| request | The testing HTTP request. | 
| policy | The Rate Limiter parameters for testing. | 

