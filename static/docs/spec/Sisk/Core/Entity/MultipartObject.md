# Class MultipartObject
Last updated: Friday, 06 January 2023

## Definition
Namespace: Sisk.Core.Entity

```csharp
public class MultipartObject
```

Represents an multipart/form-data object.

## Properties

| Property name | Description |
| --- | --- |
| [Headers](/spec/Sisk/Core/Entity/MultipartObject/Headers) | The multipart form data object headers. | 
| [Filename](/spec/Sisk/Core/Entity/MultipartObject/Filename) | The name of the file provided by Multipart form data. Null is returned if the object is not a file. | 
| [Name](/spec/Sisk/Core/Entity/MultipartObject/Name) | The multipart form data object field name. | 
| [ContentBytes](/spec/Sisk/Core/Entity/MultipartObject/ContentBytes) | The multipart form data content bytes. | 
| [ContentLength](/spec/Sisk/Core/Entity/MultipartObject/ContentLength) | The multipart form data content length. | 

## Methods

| Method name | Description |
| --- | --- |
| [ReadContentAsString(Encoding)](/spec/Sisk/Core/Entity/MultipartObject/ReadContentAsString--Encoding) | Reads the content bytes with the given encoder. | 
| [ReadContentAsString()](/spec/Sisk/Core/Entity/MultipartObject/ReadContentAsString--) | Reads the content bytes as an ASCII string. | 
| [GetImageFormat()](/spec/Sisk/Core/Entity/MultipartObject/GetImageFormat--) | Determine the image format based in the file header for each image content type. | 

