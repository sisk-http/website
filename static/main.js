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
            link: 'https://github.com/CypherPotato/Sisk'
        },
        {
            title: 'Nuget',
            link: 'https://www.nuget.org/packages/Sisk.HttpServer/'
        }
    ],
    highlight: ['json', 'csharp', 'cshtml'],
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
            title: "API Specification",
            links: specLinks
        }
    ]
})