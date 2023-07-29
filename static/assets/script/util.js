var allDocLinks = [];
var index = 0;

for (const docLink of specsIndex) {
    if (typeof (docLink) !== 'object') continue;
    allDocLinks.push({
        title: docLink.title + " " + docLink.icon,
        filt: docLink.title.toLowerCase(),
        ref: "Specification",
        href: docLink.href
    });
}
for (const docLink of docsIndex) {
    if (typeof (docLink) !== 'object') continue;
    allDocLinks.push({
        title: docLink.title,
        filt: docLink.title.toLowerCase(),
        ref: "Documentation",
        href: docLink.href
    });
}

var searchIntervalToken = 0;
window.addEventListener("keydown", e => {
    if (e.key == "/") {
        let input = document.getElementById("searchInput");
        setTimeout(() => {
            input.focus();
        }, 0);
    }
});

function html(strings, ...placeholders) {
    const N = placeholders.length;
    let out = '';
    for (let i = 0; i < N; i++) {
        out += strings[i] + placeholders[i];
    }
    out += strings[N];
    return out;
}

function openSearchBox() {
    index = -1;
    document.getElementById("searchResults").classList.add("visible");
    setTimeout(() => {
        window.addEventListener("click", closeSearchBox);
        window.addEventListener("keydown", onKey);
    }, 500);
}

function closeSearchBox() {
    var results = document.getElementById("searchResults");
    var isHovering = document.querySelectorAll("#searchResults:hover");
    if (isHovering.length == 0) {
        results.classList.remove("visible");
        results.innerHTML = "";
        document.getElementById("searchInput").value = "";
        window.removeEventListener("click", closeSearchBox);
        window.removeEventListener("keydown", onKey);
    }
}

function doSearch() {
    var query = document.getElementById("searchInput").value
        .toLowerCase();
    if (query.length == 0) {
        return;
    } else {
        openSearchBox();
    }
    var sresults = document.getElementById("searchResults");
    if (searchIntervalToken != 0) clearTimeout(searchIntervalToken);
    searchIntervalToken = setTimeout(() => {
        sresults.innerHTML = "";
        for (const item of allDocLinks) {
            if (item.filt.includes(query)) {
                sresults.innerHTML += html`
                    <a href="/read?q=${item.href}">
                        <div class="title">${item.title}</div>
                        <div class="ref">${item.ref}</div>
                    </a>
                `;
            }
        }
    }, 150);
}

function onKey(e) {
    var searchResults = document.querySelectorAll("#searchResults > a");

    document.querySelectorAll("#searchResults > a.selected")
        .forEach(e => e.classList.remove("selected"));

    //down key
    if (e.which === 40) {
        index = Math.min(++index, searchResults.length);
        searchResults[index].classList.add("selected");
    }

    //upkey
    else if (e.which === 38) {
        index = Math.max(0, --index);
        searchResults[index].classList.add("selected");
    }

    //Enter key
    else if (e.key === "Enter") {
        searchResults[index].click();
    }
}