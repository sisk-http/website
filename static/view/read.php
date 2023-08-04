<!DOCTYPE html>
<html lang="en">
<?= render_view('layout.head') ?>

<body>
    <?= render_view('layout.nav') ?>
    <main class="doc-reader" id="docsWrapper" style="height: 100svh;">
        <div id="docsContainer" onbeforeunload="onunload()"></div>
        <div id="docsNav"></div>
    </main>
    <?php if (str_contains($_GET['q'], '/contents/docs')) : ?>
        <script>
            window.documentsIndex = docsIndex;
        </script>
    <?php elseif (str_contains($_GET['q'], '/contents/spec')) : ?>
        <script>
            window.documentsIndex = specsIndex;
        </script>
    <?php endif; ?>
    <script>
        const query = '<?= $_GET['q'] ?>';

        var docContainer = document.getElementById("docsContainer");
        var docWrapper = document.getElementById("docsWrapper");

        let queryFormatted = query;
        if (!query.endsWith(".md"))
            queryFormatted += ".md";

        fetch(queryFormatted)
            .then(res => res.text())
            .then(md => {
                docContainer.innerHTML = new showdown.Converter().makeHtml(md);
                Prism.highlightAll();
                initializeDocLinks();

                const images = [...document.querySelectorAll("#docsWrapper img")];

                const proms = images.map(im => new Promise(res =>
                    im.onload = () => res([im.width, im.height])
                ))

                Promise.all(proms).then(data => {
                    docWrapper.style.height = Math.max(docContainer.clientHeight + 200, window.innerHeight) + "px";
                });
            });

        addEventListener("beforeunload", (event) => {
            let docsContainer = docContainer;
            docsContainer.classList.remove("loading");
            docsContainer.classList.add("unloading");
        });

        function initializeDocLinks() {
            for (const navItem of window.documentsIndex) {
                if (typeof(navItem) == "string") {
                    document.getElementById("docsNav").innerHTML += html`
                        <div class="divider">
                            ${navItem}
                        </div>
                    `;
                    continue;
                }
                let classes = "";
                let before = "";
                let after = "";
                if (navItem.icon != null) {
                    before = html`
                        <img class="icon" src="/assets/img/icons/${navItem.icon}.svg">
                    `;
                }
                if (query.includes(navItem.href)) {
                    classes += "active scroll-to-component";

                    let firstLinkAdded = false;
                    document.querySelectorAll("#docsContainer h1[id]").forEach(e => {
                        if (firstLinkAdded == false) {
                            firstLinkAdded = true;
                            return; // skip the first h1
                        }
                        after += html` 
                            <a class="sub-link" href="#${e.id}">
                                ${e.innerText}
                            </a>
                        `;
                    });
                }
                document.getElementById("docsNav").innerHTML += html`
                    <a class="${classes}" href="read?q=${navItem.href}">
                        ${before} ${navItem.title}
                    </a>
                    ${after}
                `;
            }
            document.querySelector(".scroll-to-component").scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest"
            });
            docContainer.classList.add("loading");
        }
    </script>
    <?= render_view('layout.footer') ?>
</body>

</html>