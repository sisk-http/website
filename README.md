# Sisk documentation

Sisk documentation and specification, written in Markdown and Javascript. This documentation doesn't currently have tutorials or walkthroughs, but it will.

You can visit the documentation from [this link](https://sisk-web-framework.github.io/docs/static/#/).

## Building docs

To build markdown files for a git release, compile Sisk in the Release configuration. Make sure you have this snippet in your `Sisk.Core.csproj`:

```xml
<PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|AnyCPU'">
	<DebugType>embedded</DebugType>
</PropertyGroup>
```

After that you can compile eng/GenerateMdDoc and run it with the generated `Sisk.HttpServer.xml` from the Sisk build:

```powershell
PS .\GenerateMdDoc.exe Sisk.HttpServer.xml
```

## Credits

- [egoist/docute](https://github.com/egoist/docute)