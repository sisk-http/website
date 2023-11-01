import { docsIndex } from "./links/index";
import { specsIndex } from "./links/spec";
import "./search";

window.showdown = require("showdown");
window.html = (strings, ...placeholders) => {
    const N = placeholders.length;
    let out = '';
    for (let i = 0; i < N; i++) {
        out += strings[i] + placeholders[i];
    }
    out += strings[N];
    return out;
};
window.toggleDocNav = () => {
    document.querySelector("main")
        ?.classList.toggle("nav-visible");
};

window.docContents = {
    documentation: docsIndex,
    specification: specsIndex
}; 