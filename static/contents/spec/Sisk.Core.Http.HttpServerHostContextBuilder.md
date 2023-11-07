<!--

Copyrights 2023 Sisk Framework - CypherPotato
Published under MIT license

!!! DO NOT EDIT THIS FILE !!!
This file was generated by a tool in the Sisk package. To edit the information in this documentation,
edit the XML documentation present in the Sisk source code.

-->

# HttpServerHostContextBuilder class
Assembly: Sisk.Core

Namespace: Sisk.Core.Http

Definition:

```cs
public sealed class HttpServerHostContextBuilder
```

Represents a context constructor for <a href="/read?q=/contents/spec/Sisk.Core.Http.HttpServerHostContext.md">HttpServerHostContext</a>.

# Method list
<table>
    <tbody>
<tr>
    <td width="33%">
        <img class="icon" src="/assets/img/icons/method.svg">
        <a href="/read?q=/contents/spec/Sisk.Core.Http.HttpServerHostContextBuilder.Build().md">
            Build()
        </a>
    </td>
    <td>
        Builds an <a href="/read?q=/contents/spec/Sisk.Core.Http.HttpServerHostContext.md">HttpServerHostContext</a> with the specified parameters.
    <td>
</tr>
<tr>
    <td width="33%">
        <img class="icon" src="/assets/img/icons/method.svg">
        <a href="/read?q=/contents/spec/Sisk.Core.Http.HttpServerHostContextBuilder.UseAutoScan().md">
            UseAutoScan()
        </a>
    </td>
    <td>
        This method is an shortcut for calling <see cref="M:Sisk.Core.Routing.Router.AutoScanModules``1" />.
    <td>
</tr>
<tr>
    <td width="33%">
        <img class="icon" src="/assets/img/icons/method.svg">
        <a href="/read?q=/contents/spec/Sisk.Core.Http.HttpServerHostContextBuilder.UseConfiguration(HttpServerConfiguration).md">
            UseConfiguration(HttpServerConfiguration)
        </a>
    </td>
    <td>
        Calls an action that has the HTTP server configuration as an argument.
    <td>
</tr>
<tr>
    <td width="33%">
        <img class="icon" src="/assets/img/icons/method.svg">
        <a href="/read?q=/contents/spec/Sisk.Core.Http.HttpServerHostContextBuilder.UseCors(CrossOriginResourceSharingHeaders).md">
            UseCors(CrossOriginResourceSharingHeaders)
        </a>
    </td>
    <td>
        Calls an action that has an <a href="/read?q=/contents/spec/Sisk.Core.Entity.CrossOriginResourceSharingHeaders.md">CrossOriginResourceSharingHeaders</a> instance from the main listening host as an argument.
    <td>
</tr>
<tr>
    <td width="33%">
        <img class="icon" src="/assets/img/icons/method.svg">
        <a href="/read?q=/contents/spec/Sisk.Core.Http.HttpServerHostContextBuilder.UseFlags(HttpServerFlags).md">
            UseFlags(HttpServerFlags)
        </a>
    </td>
    <td>
        Overrides the HTTP server flags with the provided flags.
    <td>
</tr>
<tr>
    <td width="33%">
        <img class="icon" src="/assets/img/icons/method.svg">
        <a href="/read?q=/contents/spec/Sisk.Core.Http.HttpServerHostContextBuilder.UseHandler().md">
            UseHandler()
        </a>
    </td>
    <td>
        This method is an shortcut for calling <see cref="M:Sisk.Core.Http.HttpServer.RegisterHandler``1" />.
    <td>
</tr>
<tr>
    <td width="33%">
        <img class="icon" src="/assets/img/icons/method.svg">
        <a href="/read?q=/contents/spec/Sisk.Core.Http.HttpServerHostContextBuilder.UseHttpServer(HttpServer).md">
            UseHttpServer(HttpServer)
        </a>
    </td>
    <td>
        Calls an action that has the HTTP server instance as an argument.
    <td>
</tr>
<tr>
    <td width="33%">
        <img class="icon" src="/assets/img/icons/method.svg">
        <a href="/read?q=/contents/spec/Sisk.Core.Http.HttpServerHostContextBuilder.UseListeningPort(ListeningPort).md">
            UseListeningPort(ListeningPort)
        </a>
    </td>
    <td>
        Sets the main <a href="/read?q=/contents/spec/Sisk.Core.Http.ListeningPort.md">ListeningPort</a> of this host builder.
    <td>
</tr>
<tr>
    <td width="33%">
        <img class="icon" src="/assets/img/icons/method.svg">
        <a href="/read?q=/contents/spec/Sisk.Core.Http.HttpServerHostContextBuilder.UseListeningPort(int).md">
            UseListeningPort(int)
        </a>
    </td>
    <td>
        Sets the main <a href="/read?q=/contents/spec/Sisk.Core.Http.ListeningPort.md">ListeningPort</a> of this host builder.
    <td>
</tr>
<tr>
    <td width="33%">
        <img class="icon" src="/assets/img/icons/method.svg">
        <a href="/read?q=/contents/spec/Sisk.Core.Http.HttpServerHostContextBuilder.UseListeningPort(string).md">
            UseListeningPort(string)
        </a>
    </td>
    <td>
        Sets the main <a href="/read?q=/contents/spec/Sisk.Core.Http.ListeningPort.md">ListeningPort</a> of this host builder.
    <td>
</tr>
<tr>
    <td width="33%">
        <img class="icon" src="/assets/img/icons/method.svg">
        <a href="/read?q=/contents/spec/Sisk.Core.Http.HttpServerHostContextBuilder.UseLocale(CultureInfo).md">
            UseLocale(CultureInfo)
        </a>
    </td>
    <td>
        Overrides the <a href="/read?q=/contents/spec/Sisk.Core.Http.HttpServerConfiguration.md">DefaultCultureInfo</a> property in the HTTP server configuration.
    <td>
</tr>
<tr>
    <td width="33%">
        <img class="icon" src="/assets/img/icons/method.svg">
        <a href="/read?q=/contents/spec/Sisk.Core.Http.HttpServerHostContextBuilder.UseRouter(Router).md">
            UseRouter(Router)
        </a>
    </td>
    <td>
        Calls an action that has an <a href="/read?q=/contents/spec/Sisk.Core.Routing.Router.md">Router</a> instance from the host HTTP server.
    <td>
</tr>
    </tbody>
</table>