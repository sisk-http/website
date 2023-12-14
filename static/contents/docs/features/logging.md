# Logging

You can configure Sisk to write access and error logs automatically. It is possible to define log rotation, format and frequency.

The [LogStream](/read?q=/contents/spec/Sisk.Core.Http.LogStream) class provides an asynchronous way of writing logs and keeping them in an awaitable write queue.

In this article we will show you how to configure logging for your application.

# File based access logs

Logs to files open the file, write the line text, and then close the file for every line written. This procedure was adopted to maintain write security in the logs.

```cs
Router router = new Router();
HttpServerConfiguration config = new HttpServerConfiguration();

config.ListeningHosts.Add(new ListeningHost("localhost", 5555, router));
config.AccessLogsStream = new LogStream("logs/access.log");
```

The above code will write all incoming requests to the `logs/access.log` file. Note that, the file is created automatically if it does not exist, however the folder before it does not. In this case, it will be necessary to create the `logs` folder.

# Stream based logging

You can write log files to TextWriter objects instances, such as `Console.Out`, by passing an TextWriter object in the constructor:

```cs
config.AccessLogsStream = new LogStream(Console.Out);
```

For every message written in the stream-based log, the `TextWriter.Flush()` method is called.

# Access log formatting

You can customize the access log format by predefined variables. Consider the following line:

```cs
config.AccessLogsFormat = "%dd/%dmm/%dy %tH:%ti:%ts %tz %ls %ri %rs://%ra%rz%rq [%sc %sd] %lin -> %lou in %lmsms [%{user-agent}]";
```

It will write an message like:

29/mar./2023 15:21:47 -0300 Executed ::1 http://localhost:5555/ \[200 OK\] 689B -> 707B in 84ms \[Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/111.0.0.0 Safari/537.36\]

You can format your log file by the format described by the table:

<table>
    <thead>
        <tr><th>Variable</th>
        <th>Description</th>
        <th>Example</th>
    </tr></thead>
    <tbody>
        <tr>
            <td>
                %dd
            </td>
            <td>
                The current timestamp's day, in 00 format.
            </td>
            <td>
                25
            </td>
        </tr>
        <tr>
            <td>
                %dm
            </td>
            <td>
                The current timestamp's month, in 00 format.
            </td>
            <td>
                03
            </td>
        </tr>
        <tr>
            <td>
                %dmm
            </td>
            <td>
                The current timestamp's month, in abreviated name format.
            </td>
            <td>
                mar.
            </td>
        </tr>
        <tr>
            <td>
                %dmmm
            </td>
            <td>
                The current timestamp's month, in full name format.
            </td>
            <td>
                March
            </td>
        </tr>
        <tr>
            <td>
                %dy
            </td>
            <td>
                The current timestamp's year, in 0000 format.
            </td>
            <td>
                2023
            </td>
        </tr>
        <tr>
            <td>
                %th
            </td>
            <td>
                The current timestamp's hour, in 12-hours format.
            </td>
            <td>
                03
            </td>
        </tr>
        <tr>
            <td>
                %tH
            </td>
            <td>
                The current timestamp's hour, in 24-hours format.
            </td>
            <td>
                15
            </td>
        </tr>
        <tr>
            <td>
                %ti
            </td>
            <td>
                The current timestamp's minutes, in 00 format.
            </td>
            <td>
                25
            </td>
        </tr>
        <tr>
            <td>
                %ts
            </td>
            <td>
                The current timestamp's seconds, in 00 format.
            </td>
            <td>
                32
            </td>
        </tr>
        <tr>
            <td>
                %tm
            </td>
            <td>
                The current timestamp's millisecond, in 000 format.
            </td>
            <td>
                633
            </td>
        </tr>
        <tr>
            <td>
                %tz
            </td>
            <td>
                The current timezone difference, in +/- 0000 format.
            </td>
            <td>
                +0300<br>
                -0500<br>
                +0000
            </td>
        </tr>
        <tr>
            <td>
                %ri
            </td>
            <td>
                The requesting user IP address (may be IPv4 or IPv6).
            </td>
            <td>
                192.168.0.1
            </td>
        </tr>
        <tr>
            <td>
                %rm
            </td>
            <td>
                The request method in upper case.
            </td>
            <td>
                GET
            </td>
        </tr>
        <tr>
            <td>
                %rs
            </td>
            <td>
                The requesting user URL scheme.
            </td>
            <td>
                https<br>
                http
            </td>
        </tr>
        <tr>
            <td>
                %ra
            </td>
            <td>
                The requesting user URL authority.
            </td>
            <td>
                my.contorso.com:8080
            </td>
        </tr>
        <tr>
            <td>
                %rh
            </td>
            <td>
                The requesting user URL host.
            </td>
            <td>
                my.contorso.com
            </td>
        </tr>
        <tr>
            <td>
                %rp
            </td>
            <td>
                The requesting user URL port.
            </td>
            <td>
                8080
            </td>
        </tr>
        <tr>
            <td>
                %rz
            </td>
            <td>
                The requesting user URL absolute path.
            </td>
            <td>
                /index.html
            </td>
        </tr>
        <tr>
            <td>
                %rq
            </td>
            <td>
                The requesting user URL query string.
            </td>
            <td>
                ?foo=bar&amp;aaa=bbb
            </td>
        </tr>
        <tr>
            <td>
                %sc
            </td>
            <td>
                The response status code, in 000 format.
            </td>
            <td>
                404
            </td>
        </tr>
        <tr>
            <td>
                %sd
            </td>
            <td>
                The response status description.
            </td>
            <td>
                Not Found
            </td>
        </tr>
        <tr>
            <td>
                %lin
            </td>
            <td>
                The incoming request content size, in an human readable form.
            </td>
            <td>
                12,5kb
            </td>
        </tr>
        <tr>
            <td>
                %lou
            </td>
            <td>
                The outcoming response content size, in an human readable form.
            </td>
            <td>
                65,8kb
            </td>
        </tr>
        <tr>
            <td>
                %lms
            </td>
            <td>
                The server processing time of the request and deliver of the response, in milliseconds
                format (000).
            </td>
            <td>
                18
            </td>
        </tr>
        <tr>
            <td>
                %{header}
            </td>
            <td>
                Gets the value of an HTTP header, where <code>header</code> is the header name, or an
                empty value if the header ins't present. This field is case-insensitive.
            </td>
            <td>
                %{user-agent}
            </td>
        </tr>
    </tbody>
</table>

# Rotating logs

> **Tip:**
>
> In Sisk 0.15 and older, this function is only available with the Sisk.ServiceProvider package. In Sisk 0.16 and above, this function is implemented on it's core package.

You can configure the HTTP server to rotate the log files to a compressed .gz file when they reach a certain size. The size is checked periodically by the limiar you define.

```cs
config.AccessLogsStream = new LogStream("access.log");

var rotater = new RotatingLogPolicy(config.AccessLogsStream);
rotater.Configure(1024 * 1024, TimeSpan.FromHours(6));
```

The above code will check every six hours if the LogStream's file has reached it's 1MB limit. If so, the file is compressed to an .gz file and it then `access.log` is cleaned.

During this process, writing to the file is locked until the file is compressed and cleaned. All lines that enter to be written in this period will be in a queue waiting for the end of compression.

This function only works with file-based LogStreams.

# Error logging

When a server is not throwing errors to the debugger, it forwards the errors to log writing when there are any. You can configure error writing with:

```cs
config.ThrowExceptions = false;
config.ErrorsLogsStream = new LogStream("error.log");
```

This property will only write something to the log if the error is not captured by the callback or the [Router.CallbackErrorHandler](/read?q=/contents/spec/Sisk.Core.Routing.Router.CallbackErrorHandler) property.

The error written by the server always writes the date and time, the request headers (not the body), the error trace, and the inner exception trace, if theres any.

# Other logging instances

Your application can have zero or multiple LogStreams, there is no limit on how many log channels it can have. Therefore, it is possible to direct your application's log to a file other than the default AccessLog or ErrorLog.

```cs
LogStream appMessages = new LogStream("messages.log");
appMessages.WriteLine("Application started at {0}", DateTime.Now);
```