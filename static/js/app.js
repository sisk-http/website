const query = (q) => document.querySelector(q);
const queryAll = (q) => document.querySelectorAll(q);

function setPageTitle(title) {
    document.title = "Sisk - " + title;
}

function createDocLinks() {
    if (window.path.startsWith("/docs/") || window.path.startsWith("/spec/")) {
        let docNavigator = queryAll(".doc-navigator > a");
        docNavigator.forEach(a => {
            let aHref = a.getAttribute("href");
            if (aHref.endsWith(window.path)) {
                a.classList.add("current");
                a.scrollIntoView({ block: 'center' });

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
    query(element).classList.add("flash");
    setTimeout(() => query(element).classList.remove("flash"), 2500);
}