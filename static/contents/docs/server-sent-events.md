# Server Sent Events

Sisk supports sending messages through Server Sent Events out of the box. You can create disposable and persistent connections, get the connections during runtime and use them.

This feature has some limitations imposed by browsers, such as sending only texts messages and not being able to permanently close a connection. A server-side closed connection will have a client periodically trying to reconnect every 5 seconds (3 for some browsers).

These connections are useful for sending events from the server to the client without having the client request the information every time.

# Creating an SSE connection

A SSE connection works like a regular HTTP request, but instead of sending a response and immediately closing the connection, the connection is kept open to send messages.

Calling the [HttpRequest.GetEventSource()](/read?q=/contents/spec/Sisk.Core.Http.HttpRequest.GetEventSource(string)) method, the request is put in a waiting state while the SSE instance is created.

```cs
r += new Route(RouteMethod.Get, "/", (req) =>
{
    var sse = req.GetEventSource();

    sse.Send("Hello, world!");

    return sse.Close();
});
```

In the above code, we create an SSE connection and send a "Hello, world" message, then we close the SSE connection from the server side.

> **Note:**
> 
> When closing a server-side connection, by default the client will try to connect again at that end and the connection will be restarted, executing the method again, forever.
> 
> It's common to forward a termination message from the server whenever the connection is closed from the server to prevent the client from trying to reconnect again.

# Appending headers

If you need to send headers, you can use the [HttpRequestEventSource.AppendHeader](/read?q=/contents/spec/Sisk.Core.Http.HttpRequestEventSource.AppendHeader(string-string)) method before sending any messages.

```cs
r += new Route(RouteMethod.Get, "/", (req) =>
{
    var sse = req.GetEventSource();
    sse.AppendHeader("Header-Key", "Header-value");

    sse.Send("Hello!");

    return sse.Close();
});
```

Note that it is necessary to send the headers before sending any messages.

# Keep-Alive connections

Connections are normally terminated when the server is no longer able to send messages due to an possible client-side disconnection. With that, the connection is automatically terminated and the instance of the class is discarded.

Even with a reconnection, the instance of the class will not work, as it is linked to the previous connection. In some situations, you may need this connection later and you don't want to manage it via the callback method of the route.

For this, we can identify the SSE connections with an identifier and get them using it later, even outside the callback of the route. In addition, we mark the connection with KeepAlive so as not to terminate the route and terminate the connection automatically.

An SSE connection in KeepAlive will wait for a send error (caused by disconnection) to resume method execution. It is also possible to set a Timeout for this. After the time, if no message has been sent, the connection is terminated and execution resumes.

```cs
r += new Route(RouteMethod.Get, "/", (req) =>
{
    var sse = req.GetEventSource("my-index-connection");

    sse.KeepAlive(TimeSpan.FromSeconds(15)); // wait for 15 seconds without any message before terminating the connection

    return sse.Close();
});
```

The above method will create the connection, handle it and wait for a disconnection or error.

```cs
HttpRequestEventSource? evs = server.EventSources.GetByIdentifier("my-index-connection");
if (evs != null)
{
    // the connection is still alive
    evs.Send("Hello again!");
}
```

And the snippet above will try to look for the newly created connection, and if it exists, it will send a message to it.

All active server connections that are identified will be available in the collection [HttpServer.EventSources](/read?q=/contents/spec/Sisk.Core.Http.HttpServer.EventSources). This collection only stores active and identified connections. Closed connections are removed from the collection.

> **Note:**
> 
> It is important to note that keep alive has a limit established by components that may be connected to Sisk in an uncontrollable way, such as an web proxy, an HTTP kernel or a network driver, and they close idle connections after a certain period of time.
> 
> Therefore, it is important to keep the connection open by sending periodic pings or extending the maximum time before the connection is closed. Read the next section to better understand sending periodic pings.

# Setup connections ping policy

Ping Policy is an automated way of sending periodic messages to your client. This function allows the server to understand when the client has disconnected from that connection without having to keep the connection open indefinitely.

```cs
[RouteGet("/sse")]
public HttpResponse Events(HttpRequest request)
{
    var sse = request.GetEventSource();
    sse.WithPing(ping =>
    {
        ping.DataMessage = "ping-message";
        ping.Interval = TimeSpan.FromSeconds(5);
        ping.Start();
    });

    sse.KeepAlive();
    return sse.Close();
}
```

In the code above, every 5 seconds, a new ping message will be sent to the client. This will keep the TCP connection alive and prevent it from being closed due to inactivity. Also, when a message fails to be sent, the connection is automatically closed, freeing up the resources used by the connection.

# Querying connections

You can search for active connections using a predicate on the connection identifier, to be able to broadcast, for example.

```cs
HttpRequestEventSource[] evs = server.EventSources.Find(es => es.StartsWith("my-connection-"));
foreach (HttpRequestEventSource e in evs)
{
    e.Send("Broadcasting to all event sources that starts with 'my-connection-'");
}
```

You can also use the [All](/read?q=/contents/spec/Sisk.Core.Http.HttpEventSourceCollection.All()) method to get all active SSE connections.