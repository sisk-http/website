# Class ServiceProvider

## Definition
Namespace: Sisk.Provider

```csharp
public class ServiceProvider
```

Provides a class that organizes and facilitates the porting management of a service or application that uses Sisk.

## Properties

| Property name | Description |
| --- | --- |
| [AccessLogs](/spec/Sisk/Provider/ServiceProvider/AccessLogs) | Gets the configured access log stream. This property is inherited from [ServerConfiguration](/spec/Sisk/Provider/ServiceProvider/ServerConfiguration) . | 
| [ErrorLogs](/spec/Sisk/Provider/ServiceProvider/ErrorLogs) | Gets the configured error log stream. This property is inherited from [ServerConfiguration](/spec/Sisk/Provider/ServiceProvider/ServerConfiguration) . | 
| [ConfigurationFile](/spec/Sisk/Provider/ServiceProvider/ConfigurationFile) | Gets or sets the Sisk server portable configuration file. | 
| [ServerConfiguration](/spec/Sisk/Provider/ServiceProvider/ServerConfiguration) | Gets the emitted server configuration object interpreted from the configuration file. | 
| [HttpServer](/spec/Sisk/Provider/ServiceProvider/HttpServer) | Gets the emitted HTTP server object instance interpreted from the configuration file. | 
| [Initialized](/spec/Sisk/Provider/ServiceProvider/Initialized) | Gets an boolean indicating if the configuration was successfully interpreted and the server is functional. | 
| [RouterFactoryInstance](/spec/Sisk/Provider/ServiceProvider/RouterFactoryInstance) | Gets or sets the [RouterFactory](/spec/Sisk/Core/Routing/RouterFactory) object instance which will provide an entry point for this service. | 
| [Verbose](/spec/Sisk/Provider/ServiceProvider/Verbose) | Gets or sets whether this [ServiceProvider](/spec/Sisk/Provider/ServiceProvider) should write mensagens to console indicating if the server is listening or not. | 

## Methods

| Method name | Description |
| --- | --- |
| [Initialize()](/spec/Sisk/Provider/ServiceProvider/Initialize--) | Opens and reads the configuration file, parses it and starts the HTTP server with the router and settings parsed from the file. | 
| [Wait()](/spec/Sisk/Provider/ServiceProvider/Wait--) | Prevents the executable from closing automatically after starting the executable. | 

## Constructors

| Method name | Description |
| --- | --- |
| [ServiceProvider(RouterFactory)](/spec/Sisk/Provider/ServiceProvider/_ctor--RouterFactory) | Creates an new [ServiceProvider](/spec/Sisk/Provider/ServiceProvider) instance with given router factory. | 
| [ServiceProvider(RouterFactory, String)](/spec/Sisk/Provider/ServiceProvider/_ctor--RouterFactory-String) | Creates an new [ServiceProvider](/spec/Sisk/Provider/ServiceProvider) instance with given router factory and custom settings file name. | 

