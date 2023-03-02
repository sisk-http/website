new Docute({
    target: '#docute',
    sourcePath: './docs/',
    nav: [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'GitHub',
            link: 'https://github.com/sisk-http/core'
        },
        {
            title: 'Nuget',
            link: 'https://www.nuget.org/packages/Sisk.HttpServer/'
        }
    ],
    highlight: ['json', 'csharp', 'cshtml', 'bash'],
    cssVariables(theme) {
        return {
            accentColor: "blue",
            headerTextColor: "blue",
            linkColor: "blue",
            codeFont: "Consolas,Liberation Mono,Menlo,Courier,monospace",
            codeBlockBackground: "#f7f7f7",
            codeBlockTextColor: "black",
            inlineCodeBackground: "rgb(239 239 239)",
            inlineCodeColor: "black"
        }
    },
    sidebar: [
        {
            title: 'Sisk Documentation',
            links: [
                {
                    title: 'Welcome',
                    link: '/'
                },
                {
                    title: 'Getting Started',
                    link: '/getting-started'
                },
                {
                    title: 'Installing',
                    link: '/installing'
                }
            ]
        },
        {
            title: "Fundamentals",
            links: [
                {
                    title: 'Routing',
                    link: '/fundamentals/routing.md'
                },
                {
                    title: 'Request handling',
                    link: '/fundamentals/request-handlers.md'
                },
                {
                    title: 'Requests',
                    link: '/fundamentals/requests.md'
                },
                {
                    title: 'Responses',
                    link: '/fundamentals/responses.md'
                }
            ]
        },
        {
            title: "Features",
            links: [
                {
                    title: 'Service Provider',
                    link: '/features/service-provider'
                },
                {
                    title: 'Native AOT support',
                    link: '/features/native-aot'
                }
            ]
        },
        {
            title: "API Specification",
            links: specLinks
        }
    ]
})