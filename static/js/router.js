var __isNavigating = false;

function routerFetchPage() {
    var path = window.location.hash.replace("#/", "");

    window.path = "/" + path.replace(/^\//, "");
    window.pathAndQuery = window.path;

    if (path == "") {
        path = "index";
        window.location.href = "#/"
    }

    if (path.includes('?')) {
        let querystring = path.substring(path.indexOf('?'));
        window.query = parseQuery(querystring);
        path = path.substring(0, path.indexOf('?'));
        window.path = window.path.substring(0, window.path.indexOf('?'));
        if (path == "") {
            path = "index";
        }
    } else {
        window.query = {};
    }

    var routerFile = window.location.origin + "/view/" + path + ".html";
    window.locationFile = routerFile;

    if (window.onNavigating !== undefined) {
        onNavigating();
    }

    __isNavigating = true;
    let delay = window.app.delayNavigation ?? 0;
    setTimeout(() => {
        fetch(routerFile)
            .then(res => res.text())
            .then(text => {
                window.appContainer.innerHTML = text;
                fetchComponents(window.appContainer);
            });
    }, delay);
}

function fetchComponents() {
    var exts = window.appContainer.querySelectorAll("include");
    if (exts.length == 0) {
        if (__isNavigating && window.onNavigated !== undefined) {
            onNavigated();
        }
        __isNavigating = false;
        return;
    }
    exts.forEach(e => {
        let name = e.getAttribute("name");
        let onload = e.getAttribute("onload");
        fetch(window.location.origin + "/view/" + name + ".html")
            .then(res => {
                if (res.ok) {
                    return res.text();
                } else {
                    throw new Error(`Cannot fetch include ${name}.`);
                }
            })
            .then(text => {
                if (e.parentNode != null) {
                    e.outerHTML = text;
                    if (onload != "") {
                        eval(onload);
                    }
                }
                fetchElements();
                fetchComponents();
            });
    });
}

function fetchElements() {
    window.appContainer.querySelectorAll("script").forEach(s => {
        s.remove();
        try {
            eval(s.innerText);
        } catch (e) {
            throw e;
        }
    });
    window.appContainer.querySelectorAll("a").forEach(e => {
        let href = e.getAttribute("href");
        if (href.startsWith("/") && !href.startsWith("/#/")) {
            e.setAttribute("href", "/#" + href);
        }
    });
}

function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

window.addEventListener('hashchange', function () {
    routerFetchPage();
});

routerFetchPage();