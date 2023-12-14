<!DOCTYPE html>
<html lang="en">
<?= render_view('layout.head') ?>

<body>
    <?= render_view('layout.nav') ?>
    <main class="container lp-wrapper">
        <section id="principal">
            <div>
                <h1>
                    Fast.<br>
                    Robust.<br>
                    Predictable.
                </h1>
                <p>
                    Sisk is an lightweight web framework designed for fast and robust development, which
                    allows you to take the full control of what you want to do.
                </p>
                <a class="button" href="/read?q=/contents/docs/welcome.md">
                    Get started
                </a>
                <a class="button alt" href="https://github.com/sisk-http">
                    Contribute
                </a>
            </div>
            <img src="/assets/img/Icon-HQ.png" alt="">
        </section>
        <section id="first-alternative">
            <pre><code class="lang-csharp">
                using Sisk.Core.Http;
                using Sisk.Core.Routing;

                class Program
                {
                    static void Main(string[] args)
                    {
                        var app = HttpServer.CreateBuilder(host =>
                        {
                            host.UseListeningPort("http://localhost:5000/");
                        });

                        app.Router.SetRoute(RouteMethod.Get, "/", request =>
                        {
                            return new HttpResponse(200)
                                .WithContent("Hello, world!");
                        });

                        app.Start();
                    }
                }
            </code></pre>
            <div>
                <h1>
                    Robustness hidden in it's simplicity
                </h1>
                <p>
                    Sisk allows you to create quick or
                    large projects with as less code
                    as possible, quickly, focused on
                    enabling development your way.
                </p>
                <p>
                    With Sisk you can create:
                </p>
                <div class="icons">
                    <div class="icon">
                        <img src="/assets/img/icons8/icons8-module-80.png" alt="">
                        <div>
                            Microservices
                        </div>
                    </div>
                    <div class="icon">
                        <img src="/assets/img/icons8/icons8-rest-api-80.png" alt="">
                        <div>
                            Restful APIs
                        </div>
                    </div>
                    <div class="icon">
                        <img src="/assets/img/icons8/icons8-cloud-80.png" alt="">
                        <div>
                            Cloud services
                        </div>
                    </div>
                    <div class="icon">
                        <img src="/assets/img/icons8/icons8-binary-file-80.png" alt="">
                        <div>
                            Native AOT apps
                        </div>
                    </div>
                    <div class="icon">
                        <img src="/assets/img/icons8/icons8-game-80.png" alt="">
                        <div>
                            Game servers
                        </div>
                    </div>
                    <div class="icon">
                        <img src="/assets/img/icons8/icons8-online-80.png" alt="">
                        <div>
                            Websockets
                        </div>
                    </div>
                    <div class="icon">
                        <img src="/assets/img/icons8/icons8-folder-tree-80.png" alt="">
                        <div>
                            File servers
                        </div>
                    </div>
                    <div class="icon">
                        <img src="/assets/img/icons8/icons8-plus-80.png" alt="">
                        <div>
                            And more!
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="why-sisk">
            <div>
                <h1>
                    Simple and robust development.
                </h1>
                <p>
                    Sisk can do web development the way you want. Create MVC, MVVC, SOLID applications, or
                    any other design pattern you're interested in.
                </p>
                <ul>
                    <li>
                        <b>Lightweight:</b> robust projects tested in small, low-cost, low-performance
                        environments and got good results. The entire Sisk ecosystem is less than
                        500kb in size!
                    </li>
                    <li>
                        <b>Open-source:</b> the entire Sisk ecosystem is open source, and all the libraries
                        and technologies we use must be open source as well. Sisk is entirely distributed
                        under the MIT License, which allows the commercial development.
                    </li>
                    <li>
                        <b>Sustainable:</b> you are the one who makes the project, Sisk gives you the
                        tools. Because it is open source, the community (including you) can maintain,
                        fix bugs and improve Sisk over time.
                    </li>
                </ul>
            </div>
            <img src="/assets/img/storyset/Starting a business project-bro.svg" alt="">
        </section>
        <section id="install-banner">
            <h1>
                Get started with Sisk:
            </h1>
            <pre>PM> NuGet\Install-Package Sisk.HttpServer</pre>
        </section>
        <section id="dotnet-banner">
            <img src="/assets/img/storyset/dotnet-amico.png" alt="">
            <div>
                <h1>
                    A single development for everything .NET provides.
                </h1>
                <p>
                    Get all the firepower of .NET in your project, and export the same code to Windows, Linux or Mac.
                </p>
                <p>
                    The world's leading organizations are powered by .NET and trust Microsoft to make .NET the industry's
                    best choice for their mission-critical software. Sisk is very inspired by .NET development methodologies,
                    making him feel at home when working with the framework.
                </p>
            </div>
        </section>
        <section id="links-banner">
            <a href="/read?q=/contents/docs/welcome.md">
                <i class="las la-play"></i>
                <div>
                    Start using Sisk
                </div>
                <p>
                    Read our documentation that has been prepared to get you started with Sisk today.
                </p>
            </a>
            <a href="https://github.com/sisk-http">
                <i class="lab la-github"></i>
                <div>
                    Fork Sisk
                </div>
                <p>
                    Collaborate, edit, build, access our code repository.
                </p>
            </a>
            <a href="https://www.nuget.org/packages/Sisk.HttpServer/">
                <i class="las la-download"></i>
                <div>
                    Install Sisk
                </div>
                <p>
                    Access the Nuget repository to find details on how to get started with Sisk.
                </p>
            </a>
        </section>
    </main>
    <?= render_view('layout.footer') ?>
</body>

</html>