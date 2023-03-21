const query = (q) => document.querySelector(q);
const queryAll = (q) => document.querySelectorAll(q);

function setPageTitle(title) {
    document.title = "Sisk - " + title;
}

function onNavigated() {
    query("body").classList.add("page-loaded");
    queryAll("[role='nav-link']").forEach(navLink => {
        if (app.navPage == navLink.getAttribute("navpage")) {
            navLink.classList.add("current-page");
        }
    });
    createDocLinks();
    Prism.highlightAll();
}

function onNavigating() {
    query("body").classList.remove("page-loaded");
    window.app.delayNavigation = 250;
}

function createDocLinks() {
    if (window.path.startsWith("/docs/") || window.path.startsWith("/spec/")) {
        let docNavigator = queryAll(".doc-navigator > a");
        docNavigator.forEach(a => {
            let aHref = a.getAttribute("href");
            if (aHref.endsWith(window.path)) {
                a.classList.add("current");


                let htmlList = "";
                queryAll("article h2[id]").forEach(h2 => {
                    let id = h2.getAttribute("id");

                    let obj = /*html*/`
                        <a class="anchor" href="javascript:scrollToView('#${id}')">
                            ${h2.innerText}
                        </a>
                    `;

                    htmlList += obj;
                });
                a.insertAdjacentHTML('afterend', htmlList);
            }
        });
    }
}

function scrollToView(element) {
    query(element).scrollIntoView({ block: 'center', behavior: 'smooth' });
}