# Basic Auth

The Basic Auth package adds a request handler capable of handling basic authentication scheme in your Sisk application with very little configuration and effort.
Basic HTTP authentication is a minimal input form of authenticating requests by an user id and password, where the session is controlled exclusively
by the client and there are no authentication or access tokens.

<img src="https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Authentication/httpauth.png">

Read more about the Basic authentication scheme in the [MDN specification](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Authentication).

# Installing

To get started, install the Sisk.BasicAuth package in your project:

    > dotnet add package Sisk.BasicAuth

You can view more ways to install it in your project in the [Nuget repository](https://www.nuget.org/packages/Sisk.BasicAuth/0.15.0).

# Creating your auth handler

You can control the authentication scheme for an entire module or for individual routes. For that, let's first write our first basic authentication handler.

In the example below, a connection is made to the database, it checks if the user exists and if the password is valid, and after that, stores the user in the context bag.

```cs
public class UserAuthHandler : BasicAuthenticateRequestHandler
{
    public UserAuthHandler() : base()
    {
        Realm = "To enter this page, please, inform your credentials.";
    }

    public override HttpResponse? OnValidating(BasicAuthenticationCredentials credentials, HttpContext context)
    {
        DbContext db = new DbContext();

        // in this case, we're using the email as the user id field, so we're
        // going to search for an user using their email.
        User? user = db.Users.FirstOrDefault(u => u.Email == credentials.UserId);
        if (user == null)
        {
            return base.CreateUnauthorizedResponse("Sorry! No user was found by this email.");
        }

        // validates that the credentials password is valid for this user.
        if (!user.ValidatePassword(credentials.Password))
        {
            return base.CreateUnauthorizedResponse("Invalid credentials.");
        }

        // adds the logged user to the http context
        // and continues the execution
        context.Bag.Add("loggedUser", user);
        return null;
    }
}
```

So, just associate this request handler with our route or class.

```cs
public class UsersController
{
    [RouteGet("/")]
    [RequestHandler(typeof(UserAuthHandler))]
    public string Index(HttpRequest request)
    {
        User loggedUser = (User)request.Context.RequestBag["loggedUser"];
        return "Hello, " + loggedUser.Name + "!";
    }
}
```

Or using [RouterModule](/read?q=/contents/spec/Sisk.Core.Routing.RouterModule.md) class:

```cs
public class UsersController : RouterModule
{
    public ClientModule()
    {
        // now all routes inside this class will be handled by
        // UserAuthHandler.
        base.HasRequestHandler(new UserAuthHandler());
    }

    [RouteGet("/")]
    public string Index(HttpRequest request)
    {
        User loggedUser = (User)request.Context.RequestBag["loggedUser"];
        return "Hello, " + loggedUser.Name + "!";
    }
}
```

# Remarks

The primary responsibility of basic authentication is carried out on the client-side. Storage, cache control,
and encryption are all handled locally on the client. The server only receives the
credentials and validates whether access is allowed or not.

Note that this method is not one of the most secure because it places a significant responsibility on
the client, which can be difficult to trace and maintain the security of its credentials. Additionally, it is
crucial for passwords to be transmitted in a secure connection context (SSL), as they do not have any inherent
encryption. A brief interception in the headers of a request can expose the access credentials of your user.

Opt for more robust authentication solutions for applications in production and avoid using too many off-the-shelf
components, as they may not adapt to the needs of your project and end up exposing it to security risks.