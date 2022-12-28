# Constructor #ctor
Last updated: Wednesday, 28 December 2022

## Definition
Namespace: Sisk.Core.Entity

```csharp
public CrossOriginResourceSharingHeaders(string[] allowOrigins, string[] allowMethods, string[] allowHeaders, TimeSpan maxAge)
```

Create a new [CrossOriginResourceSharingHeaders](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders) class instance with given parameters.

## Parameters

| Key | Value |
| --- | --- |
| allowOrigins | The origin hostnames allowed by the browser. | 
| allowMethods | The allowed HTTP request methods. | 
| allowHeaders | The allowed HTTP request headers. | 
| maxAge | Defines the max-age cache expirity time. | 

