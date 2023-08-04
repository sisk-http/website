# Web Sockets

Sisk supports web sockets as well, such as receiving and sending messages to their client.

This feature works fine in most browsers, but in Sisk it is still experimental. Please, if you find any bugs, report it on github.

# Accepting and receiving messages asynchronously

The example below shows how websocket works in practice, with an example of opening a connection, receiving a message and displaying it in the console.

All messages received by WebSocket are received in bytes, so you will have to decode them upon receipt.

By default, messages are fragmented into chunks and the last piece is sent as the final packet of the message. You can configure the packet size with the [WebSocketBufferSize](/read?q=/contents/spec/Sisk.Core.Http.HttpServerFlags.WebSocketBufferSize) flag. This buffering is the same for sending and receiving messages.

```cs
static ListeningHost BuildLhA()
{
    Router r = new Router();

    r += new Route(RouteMethod.Get, "/", (req) =>
    {
        var ws = req.GetWebSocket();

        ws.OnReceive += (sender, msg) =>
        {
            string msgText = Encoding.UTF8.GetString(msg.MessageBytes);
            Console.WriteLine("Received message: " + msgText);

            // gets the HttpWebSocket context which received the message
            HttpWebSocket senderWebSocket = (HttpWebSocket)sender!;
            senderWebSocket.Send("Response!");
        };

        ws.WaitForClose();

        return ws.Close();
    });

    return new ListeningHost("localhost", 5551, r);
}
```

# Accepting and receiving messages synchronously

The example below contains a way for you to use a synchronous websocket, without an asynchronous context, where you receive the messages, deal with them, and finish using the socket.

```cs
static ListeningHost BuildLhA()
{
    Router r = new Router();

    r += new Route(RouteMethod.Get, "/connect", (req) =>
    {
        var ws = req.GetWebSocket();
        WebSocketMessage? msg;

    askName:
        ws.Send("What is your name?");
        msg = ws.WaitNext();

        string? name = msg?.GetString();

        if (string.IsNullOrEmpty(name))
        {
            ws.Send("Please, insert your name!");
            goto askName;
        }

    askAge:
        ws.Send("And your age?");
        msg = ws.WaitNext();

        if (!Int32.TryParse(msg?.GetString(), out int age))
        {
            ws.Send("Please, insert an valid number");
            goto askAge;
        }

        ws.Send($"You're {name}, and you are {age} old.");

        return ws.Close();
    });

    return new ListeningHost("localhost", 5551, r);
}
```

# Sending messages

The Send method has three overloads, which allow you to send text, a byte array, or a byte span. All of them is chunked if the server's [WebSocketBufferSize](/read?q=/contents/spec/Sisk.Core.Http.HttpServerFlags.WebSocketBufferSize) flag is greater than the total payload size.

```cs
static ListeningHost BuildLhA()
{
    Router r = new Router();

    r += new Route(RouteMethod.Get, "/", (req) =>
    {
        var ws = req.GetWebSocket();

        byte[] myByteArrayContent = ...;

        ws.Send("Hello, world");     // will be encoded as an UTF-8 byte array
        ws.Send(myByteArrayContent);

        return ws.Close();
    });

    return new ListeningHost("localhost", 5551, r);
}
```

# Waiting for websocket close

The method [WaitForClose()](/read?q=/contents/spec/Sisk.Core.Http.HttpWebSocket.WaitForClose()) blocks the current call stack until the connection is terminated by either the client or the server.

With this, the execution of the callback of the request will be blocked until the client or the server disconnects.

You can also manually close the connection with the [Close()](/read?q=/contents/spec/Sisk.Core.Http.HttpWebSocket.Close()) method. This method returns an empty [HttpResponse](/read?q=/contents/spec/Sisk.Core.Http.HttpResponse) object, which is not sent to the client, but works as a return from the function where the HTTP request was received.

```cs
static ListeningHost BuildLhA()
{
    Router r = new Router();

    r += new Route(RouteMethod.Get, "/", (req) =>
    {
        var ws = req.GetWebSocket();

        // wait for client close connection
        ws.WaitForClose();

        // waits until no messages are exchanged in the 60 seconds
        // or until some party closes the connection
        ws.WaitForClose(TimeSpan.FromSeconds(60));

        return ws.Close();
    });

    return new ListeningHost("localhost", 5551, r);
}
```

# Ping Policy

Similar to how ping policy in Server Side Events works, you can also configure a ping policy to keep the TCP connection open if there is inactivity in it.

```cs
ws.WithPing(ping =>
{
    ping.DataMessage = "ping-message";
    ping.Interval = TimeSpan.FromSeconds(5);
    ping.Start();
});
```