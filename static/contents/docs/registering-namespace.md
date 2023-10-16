# Configuring namespace reservations on Windows

Sisk works with the HttpListener network interface, which binds a virtual host to the system to listen for requests.

On Windows, this binding is a bit bureaucratic, only allowing `localhost` to be bound as a valid host. When trying to listen to another host, an access danied error is thrown on the server. This tutorial explains how to create authorization to listen on any host you want on the system.

```cmd
@echo off

:: insert prefix here, without spaces or quotes
SET PREFIX=

SET DOMAIN=%ComputerName%\%USERNAME%
netsh http add urlacl url=%PREFIX% user=%DOMAIN%

pause
```

Where in `PREFIX`, is the prefix ("Listening Host->Port") that your server will listen to. It must be formatted with the URL scheme, host, port and a slash at the end, example:

```cmd
SET PREFIX=https://my-application.example.test/
```

So that you can be listened in your application through:

```json
{
  "Server": {
    "DefaultEncoding": "UTF-8",
    "ThrowExceptions": false
  },
  "ListeningHost": {
    "Label": "My Application",
    "Ports": [
      "https://my-application.example.test/"
    ],
    "CrossOriginResourceSharingPolicy": {},
    "Parameters": {}
  }
}
```