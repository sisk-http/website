# Class CrossOriginResourceSharingHeaders
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Entity

```csharp
public class CrossOriginResourceSharingHeaders
```

Provides a class to provide Cross Origin response headers for when communicating with a browser.

## Properties

| Property name | Description |
| --- | --- |
| [AllowOrigins](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/AllowOrigins) | The origin hostnames allowed by the browser. | 
| [AllowMethods](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/AllowMethods) | The allowed HTTP request methods. | 
| [AllowHeaders](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/AllowHeaders) | The allowed HTTP request headers. | 
| [MaxAge](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/MaxAge) | Defines the Max-Age cache expirity. | 

## Methods

| Method name | Description |
| --- | --- |
| [GetAllowOriginsHeader()](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/GetAllowOriginsHeader--) | Get the Cross-Origin Resource Sharing header for the allowed origins. | 
| [GetAllowMethodsHeader()](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/GetAllowMethodsHeader--) | Get the Cross-Origin Resource Sharing header for the allowed request methods. | 
| [GetAllowHeadersHeader()](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/GetAllowHeadersHeader--) | Get the Cross-Origin Resource Sharing header for the allowed request headers. | 
| [GetMaxAgeHeader()](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/GetMaxAgeHeader--) | Get the total of seconds in the Max-Age property as a request header. | 

## Constructors

| Method name | Description |
| --- | --- |
| [CrossOriginResourceSharingHeaders(String[], String[], String[], TimeSpan)](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/_ctor--String[]-String[]-String[]-TimeSpan) | Create a new [CrossOriginResourceSharingHeaders](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders) class instance with given parameters. | 
| [CrossOriginResourceSharingHeaders()](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders/_ctor--) | Creates an empty [CrossOriginResourceSharingHeaders](/spec/Sisk/Core/Entity/CrossOriginResourceSharingHeaders) instance with no predefined CORS headers. | 

