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

        let queryFormatted = query;
        if (!query.endsWith(".md"))
            queryFormatted += ".md";

        fetch(queryFormatted)
            .then(res => res.text())
            .then(md => {
                docContainer.innerHTML = new showdown.Converter().makeHtml(md);
                document.getElementById("docsWrapper").style.height = Math.max(docContainer.clientHeight, window.innerHeight) + "px";
                Prism.highlightAll();
                initializeDocLinks();
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

                    document.querySelectorAll("#docsContainer h1[id]").forEach(e => {
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