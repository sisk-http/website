/* PrismJS 1.29.0
https://prismjs.com/download.html#themes=prism-dark&languages=markup+clike+javascript+csharp+http+json&plugins=normalize-whitespace */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {}
    , Prism = function (e) {
        var n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i
            , t = 0
            , r = {}
            , a = {
                manual: e.Prism && e.Prism.manual,
                disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function e(n) {
                        return n instanceof i ? new i(n.type, e(n.content), n.alias) : Array.isArray(n) ? n.map(e) : n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                    },
                    type: function (e) {
                        return Object.prototype.toString.call(e).slice(8, -1)
                    },
                    objId: function (e) {
                        return e.__id || Object.defineProperty(e, "__id", {
                            value: ++t
                        }),
                            e.__id
                    },
                    clone: function e(n, t) {
                        var r, i;
                        switch (t = t || {},
                        a.util.type(n)) {
                            case "Object":
                                if (i = a.util.objId(n),
                                    t[i])
                                    return t[i];
                                for (var l in r = {},
                                    t[i] = r,
                                    n)
                                    n.hasOwnProperty(l) && (r[l] = e(n[l], t));
                                return r;
                            case "Array":
                                return i = a.util.objId(n),
                                    t[i] ? t[i] : (r = [],
                                        t[i] = r,
                                        n.forEach((function (n, a) {
                                            r[a] = e(n, t)
                                        }
                                        )),
                                        r);
                            default:
                                return n
                        }
                    },
                    getLanguage: function (e) {
                        for (; e;) {
                            var t = n.exec(e.className);
                            if (t)
                                return t[1].toLowerCase();
                            e = e.parentElement
                        }
                        return "none"
                    },
                    setLanguage: function (e, t) {
                        e.className = e.className.replace(RegExp(n, "gi"), ""),
                            e.classList.add("language-" + t)
                    },
                    currentScript: function () {
                        if ("undefined" == typeof document)
                            return null;
                        if ("currentScript" in document)
                            return document.currentScript;
                        try {
                            throw new Error
                        } catch (r) {
                            var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack) || [])[1];
                            if (e) {
                                var n = document.getElementsByTagName("script");
                                for (var t in n)
                                    if (n[t].src == e)
                                        return n[t]
                            }
                            return null
                        }
                    },
                    isActive: function (e, n, t) {
                        for (var r = "no-" + n; e;) {
                            var a = e.classList;
                            if (a.contains(n))
                                return !0;
                            if (a.contains(r))
                                return !1;
                            e = e.parentElement
                        }
                        return !!t
                    }
                },
                languages: {
                    plain: r,
                    plaintext: r,
                    text: r,
                    txt: r,
                    extend: function (e, n) {
                        var t = a.util.clone(a.languages[e]);
                        for (var r in n)
                            t[r] = n[r];
                        return t
                    },
                    insertBefore: function (e, n, t, r) {
                        var i = (r = r || a.languages)[e]
                            , l = {};
                        for (var o in i)
                            if (i.hasOwnProperty(o)) {
                                if (o == n)
                                    for (var s in t)
                                        t.hasOwnProperty(s) && (l[s] = t[s]);
                                t.hasOwnProperty(o) || (l[o] = i[o])
                            }
                        var u = r[e];
                        return r[e] = l,
                            a.languages.DFS(a.languages, (function (n, t) {
                                t === u && n != e && (this[n] = l)
                            }
                            )),
                            l
                    },
                    DFS: function e(n, t, r, i) {
                        i = i || {};
                        var l = a.util.objId;
                        for (var o in n)
                            if (n.hasOwnProperty(o)) {
                                t.call(n, o, n[o], r || o);
                                var s = n[o]
                                    , u = a.util.type(s);
                                "Object" !== u || i[l(s)] ? "Array" !== u || i[l(s)] || (i[l(s)] = !0,
                                    e(s, t, o, i)) : (i[l(s)] = !0,
                                        e(s, t, null, i))
                            }
                    }
                },
                plugins: {},
                highlightAll: function (e, n) {
                    a.highlightAllUnder(document, e, n)
                },
                highlightAllUnder: function (e, n, t) {
                    var r = {
                        callback: t,
                        container: e,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    a.hooks.run("before-highlightall", r),
                        r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),
                        a.hooks.run("before-all-elements-highlight", r);
                    for (var i, l = 0; i = r.elements[l++];)
                        a.highlightElement(i, !0 === n, r.callback)
                },
                highlightElement: function (n, t, r) {
                    var i = a.util.getLanguage(n)
                        , l = a.languages[i];
                    a.util.setLanguage(n, i);
                    var o = n.parentElement;
                    o && "pre" === o.nodeName.toLowerCase() && a.util.setLanguage(o, i);
                    var s = {
                        element: n,
                        language: i,
                        grammar: l,
                        code: n.textContent
                    };
                    function u(e) {
                        s.highlightedCode = e,
                            a.hooks.run("before-insert", s),
                            s.element.innerHTML = s.highlightedCode,
                            a.hooks.run("after-highlight", s),
                            a.hooks.run("complete", s),
                            r && r.call(s.element)
                    }
                    if (a.hooks.run("before-sanity-check", s),
                        (o = s.element.parentElement) && "pre" === o.nodeName.toLowerCase() && !o.hasAttribute("tabindex") && o.setAttribute("tabindex", "0"),
                        !s.code)
                        return a.hooks.run("complete", s),
                            void (r && r.call(s.element));
                    if (a.hooks.run("before-highlight", s),
                        s.grammar)
                        if (t && e.Worker) {
                            var c = new Worker(a.filename);
                            c.onmessage = function (e) {
                                u(e.data)
                            }
                                ,
                                c.postMessage(JSON.stringify({
                                    language: s.language,
                                    code: s.code,
                                    immediateClose: !0
                                }))
                        } else
                            u(a.highlight(s.code, s.grammar, s.language));
                    else
                        u(a.util.encode(s.code))
                },
                highlight: function (e, n, t) {
                    var r = {
                        code: e,
                        grammar: n,
                        language: t
                    };
                    if (a.hooks.run("before-tokenize", r),
                        !r.grammar)
                        throw new Error('The language "' + r.language + '" has no grammar.');
                    return r.tokens = a.tokenize(r.code, r.grammar),
                        a.hooks.run("after-tokenize", r),
                        i.stringify(a.util.encode(r.tokens), r.language)
                },
                tokenize: function (e, n) {
                    var t = n.rest;
                    if (t) {
                        for (var r in t)
                            n[r] = t[r];
                        delete n.rest
                    }
                    var a = new s;
                    return u(a, a.head, e),
                        o(e, a, n, a.head, 0),
                        function (e) {
                            for (var n = [], t = e.head.next; t !== e.tail;)
                                n.push(t.value),
                                    t = t.next;
                            return n
                        }(a)
                },
                hooks: {
                    all: {},
                    add: function (e, n) {
                        var t = a.hooks.all;
                        t[e] = t[e] || [],
                            t[e].push(n)
                    },
                    run: function (e, n) {
                        var t = a.hooks.all[e];
                        if (t && t.length)
                            for (var r, i = 0; r = t[i++];)
                                r(n)
                    }
                },
                Token: i
            };
        function i(e, n, t, r) {
            this.type = e,
                this.content = n,
                this.alias = t,
                this.length = 0 | (r || "").length
        }
        function l(e, n, t, r) {
            e.lastIndex = n;
            var a = e.exec(t);
            if (a && r && a[1]) {
                var i = a[1].length;
                a.index += i,
                    a[0] = a[0].slice(i)
            }
            return a
        }
        function o(e, n, t, r, s, g) {
            for (var f in t)
                if (t.hasOwnProperty(f) && t[f]) {
                    var h = t[f];
                    h = Array.isArray(h) ? h : [h];
                    for (var d = 0; d < h.length; ++d) {
                        if (g && g.cause == f + "," + d)
                            return;
                        var v = h[d]
                            , p = v.inside
                            , m = !!v.lookbehind
                            , y = !!v.greedy
                            , k = v.alias;
                        if (y && !v.pattern.global) {
                            var x = v.pattern.toString().match(/[imsuy]*$/)[0];
                            v.pattern = RegExp(v.pattern.source, x + "g")
                        }
                        for (var b = v.pattern || v, w = r.next, A = s; w !== n.tail && !(g && A >= g.reach); A += w.value.length,
                            w = w.next) {
                            var E = w.value;
                            if (n.length > e.length)
                                return;
                            if (!(E instanceof i)) {
                                var P, L = 1;
                                if (y) {
                                    if (!(P = l(b, A, e, m)) || P.index >= e.length)
                                        break;
                                    var S = P.index
                                        , O = P.index + P[0].length
                                        , j = A;
                                    for (j += w.value.length; S >= j;)
                                        j += (w = w.next).value.length;
                                    if (A = j -= w.value.length,
                                        w.value instanceof i)
                                        continue;
                                    for (var C = w; C !== n.tail && (j < O || "string" == typeof C.value); C = C.next)
                                        L++,
                                            j += C.value.length;
                                    L--,
                                        E = e.slice(A, j),
                                        P.index -= A
                                } else if (!(P = l(b, 0, E, m)))
                                    continue;
                                S = P.index;
                                var N = P[0]
                                    , _ = E.slice(0, S)
                                    , M = E.slice(S + N.length)
                                    , W = A + E.length;
                                g && W > g.reach && (g.reach = W);
                                var z = w.prev;
                                if (_ && (z = u(n, z, _),
                                    A += _.length),
                                    c(n, z, L),
                                    w = u(n, z, new i(f, p ? a.tokenize(N, p) : N, k, N)),
                                    M && u(n, w, M),
                                    L > 1) {
                                    var I = {
                                        cause: f + "," + d,
                                        reach: W
                                    };
                                    o(e, n, t, w.prev, A, I),
                                        g && I.reach > g.reach && (g.reach = I.reach)
                                }
                            }
                        }
                    }
                }
        }
        function s() {
            var e = {
                value: null,
                prev: null,
                next: null
            }
                , n = {
                    value: null,
                    prev: e,
                    next: null
                };
            e.next = n,
                this.head = e,
                this.tail = n,
                this.length = 0
        }
        function u(e, n, t) {
            var r = n.next
                , a = {
                    value: t,
                    prev: n,
                    next: r
                };
            return n.next = a,
                r.prev = a,
                e.length++,
                a
        }
        function c(e, n, t) {
            for (var r = n.next, a = 0; a < t && r !== e.tail; a++)
                r = r.next;
            n.next = r,
                r.prev = n,
                e.length -= a
        }
        if (e.Prism = a,
            i.stringify = function e(n, t) {
                if ("string" == typeof n)
                    return n;
                if (Array.isArray(n)) {
                    var r = "";
                    return n.forEach((function (n) {
                        r += e(n, t)
                    }
                    )),
                        r
                }
                var i = {
                    type: n.type,
                    content: e(n.content, t),
                    tag: "span",
                    classes: ["token", n.type],
                    attributes: {},
                    language: t
                }
                    , l = n.alias;
                l && (Array.isArray(l) ? Array.prototype.push.apply(i.classes, l) : i.classes.push(l)),
                    a.hooks.run("wrap", i);
                var o = "";
                for (var s in i.attributes)
                    o += " " + s + '="' + (i.attributes[s] || "").replace(/"/g, "&quot;") + '"';
                return "<" + i.tag + ' class="' + i.classes.join(" ") + '"' + o + ">" + i.content + "</" + i.tag + ">"
            }
            ,
            !e.document)
            return e.addEventListener ? (a.disableWorkerMessageHandler || e.addEventListener("message", (function (n) {
                var t = JSON.parse(n.data)
                    , r = t.language
                    , i = t.code
                    , l = t.immediateClose;
                e.postMessage(a.highlight(i, a.languages[r], r)),
                    l && e.close()
            }
            ), !1),
                a) : a;
        var g = a.util.currentScript();
        function f() {
            a.manual || a.highlightAll()
        }
        if (g && (a.filename = g.src,
            g.hasAttribute("data-manual") && (a.manual = !0)),
            !a.manual) {
            var h = document.readyState;
            "loading" === h || "interactive" === h && g && g.defer ? document.addEventListener("DOMContentLoaded", f) : window.requestAnimationFrame ? window.requestAnimationFrame(f) : window.setTimeout(f, 16)
        }
        return a
    }(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
    "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: !0
    },
    prolog: {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: !0
    },
    doctype: {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
            "internal-subset": {
                pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
                lookbehind: !0,
                greedy: !0,
                inside: null
            },
            string: {
                pattern: /"[^"]*"|'[^']*'/,
                greedy: !0
            },
            punctuation: /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/i,
            name: /[^\s<>'"]+/
        }
    },
    cdata: {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: !0
    },
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/
                }
            },
            "special-attr": [],
            "attr-value": {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: {
                    punctuation: [{
                        pattern: /^=/,
                        alias: "attr-equals"
                    }, {
                        pattern: /^(\s*)["']|["']$/,
                        lookbehind: !0
                    }]
                }
            },
            punctuation: /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    namespace: /^[^\s>\/:]+:/
                }
            }
        }
    },
    entity: [{
        pattern: /&[\da-z]{1,8};/i,
        alias: "named-entity"
    }, /&#x?[\da-f]{1,8};/i]
},
    Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity,
    Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup,
    Prism.hooks.add("wrap", (function (a) {
        "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
    }
    )),
    Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
        value: function (a, e) {
            var s = {};
            s["language-" + e] = {
                pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                lookbehind: !0,
                inside: Prism.languages[e]
            },
                s.cdata = /^<!\[CDATA\[|\]\]>$/i;
            var t = {
                "included-cdata": {
                    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                    inside: s
                }
            };
            t["language-" + e] = {
                pattern: /[\s\S]+/,
                inside: Prism.languages[e]
            };
            var n = {};
            n[a] = {
                pattern: RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, (function () {
                    return a
                }
                )), "i"),
                lookbehind: !0,
                greedy: !0,
                inside: t
            },
                Prism.languages.insertBefore("markup", "cdata", n)
        }
    }),
    Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
        value: function (a, e) {
            Prism.languages.markup.tag.inside["special-attr"].push({
                pattern: RegExp("(^|[\"'\\s])(?:" + a + ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))", "i"),
                lookbehind: !0,
                inside: {
                    "attr-name": /^[^\s=]+/,
                    "attr-value": {
                        pattern: /=[\s\S]+/,
                        inside: {
                            value: {
                                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                                lookbehind: !0,
                                alias: [e, "language-" + e],
                                inside: Prism.languages[e]
                            },
                            punctuation: [{
                                pattern: /^=/,
                                alias: "attr-equals"
                            }, /"|'/]
                        }
                    }
                }
            })
        }
    }),
    Prism.languages.html = Prism.languages.markup,
    Prism.languages.mathml = Prism.languages.markup,
    Prism.languages.svg = Prism.languages.markup,
    Prism.languages.xml = Prism.languages.extend("markup", {}),
    Prism.languages.ssml = Prism.languages.xml,
    Prism.languages.atom = Prism.languages.xml,
    Prism.languages.rss = Prism.languages.xml;
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0,
        greedy: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0,
        greedy: !0
    }],
    string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: {
            punctuation: /[.\\]/
        }
    },
    keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    boolean: /\b(?:false|true)\b/,
    function: /\b\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [Prism.languages.clike["class-name"], {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
        lookbehind: !0
    }],
    keyword: [{
        pattern: /((?:^|\})\s*)catch\b/,
        lookbehind: !0
    }, {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0
    }],
    function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    number: {
        pattern: RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"),
        lookbehind: !0
    },
    operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
}),
    Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,
    Prism.languages.insertBefore("javascript", "keyword", {
        regex: {
            pattern: RegExp("((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))"),
            lookbehind: !0,
            greedy: !0,
            inside: {
                "regex-source": {
                    pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                    lookbehind: !0,
                    alias: "language-regex",
                    inside: Prism.languages.regex
                },
                "regex-delimiter": /^\/|\/$/,
                "regex-flags": /^[a-z]+$/
            }
        },
        "function-variable": {
            pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
            alias: "function"
        },
        parameter: [{
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }, {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }, {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }, {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }),
    Prism.languages.insertBefore("javascript", "string", {
        hashbang: {
            pattern: /^#!.*/,
            greedy: !0,
            alias: "comment"
        },
        "template-string": {
            pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
            greedy: !0,
            inside: {
                "template-punctuation": {
                    pattern: /^`|`$/,
                    alias: "string"
                },
                interpolation: {
                    pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                    lookbehind: !0,
                    inside: {
                        "interpolation-punctuation": {
                            pattern: /^\$\{|\}$/,
                            alias: "punctuation"
                        },
                        rest: Prism.languages.javascript
                    }
                },
                string: /[\s\S]+/
            }
        },
        "string-property": {
            pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
            lookbehind: !0,
            greedy: !0,
            alias: "property"
        }
    }),
    Prism.languages.insertBefore("javascript", "operator", {
        "literal-property": {
            pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
            lookbehind: !0,
            alias: "property"
        }
    }),
    Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"),
        Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")),
    Prism.languages.js = Prism.languages.javascript;
!function (e) {
    function n(e, n) {
        return e.replace(/<<(\d+)>>/g, (function (e, s) {
            return "(?:" + n[+s] + ")"
        }
        ))
    }
    function s(e, s, a) {
        return RegExp(n(e, s), a || "")
    }
    function a(e, n) {
        for (var s = 0; s < n; s++)
            e = e.replace(/<<self>>/g, (function () {
                return "(?:" + e + ")"
            }
            ));
        return e.replace(/<<self>>/g, "[^\\s\\S]")
    }
    var t = "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void"
        , r = "class enum interface record struct"
        , i = "add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)"
        , o = "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield";
    function l(e) {
        return "\\b(?:" + e.trim().replace(/ /g, "|") + ")\\b"
    }
    var d = l(r)
        , p = RegExp(l(t + " " + r + " " + i + " " + o))
        , c = l(r + " " + i + " " + o)
        , u = l(t + " " + r + " " + o)
        , g = a("<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>", 2)
        , b = a("\\((?:[^()]|<<self>>)*\\)", 2)
        , h = "@?\\b[A-Za-z_]\\w*\\b"
        , f = n("<<0>>(?:\\s*<<1>>)?", [h, g])
        , m = n("(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*", [c, f])
        , k = "\\[\\s*(?:,\\s*)*\\]"
        , y = n("<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?", [m, k])
        , w = n("[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>", [g, b, k])
        , v = n("\\(<<0>>+(?:,<<0>>+)+\\)", [w])
        , x = n("(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?", [v, m, k])
        , $ = {
            keyword: p,
            punctuation: /[<>()?,.:[\]]/
        }
        , _ = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'"
        , B = '"(?:\\\\.|[^\\\\"\r\n])*"';
    e.languages.csharp = e.languages.extend("clike", {
        string: [{
            pattern: s("(^|[^$\\\\])<<0>>", ['@"(?:""|\\\\[^]|[^\\\\"])*"(?!")']),
            lookbehind: !0,
            greedy: !0
        }, {
            pattern: s("(^|[^@$\\\\])<<0>>", [B]),
            lookbehind: !0,
            greedy: !0
        }],
        "class-name": [{
            pattern: s("(\\busing\\s+static\\s+)<<0>>(?=\\s*;)", [m]),
            lookbehind: !0,
            inside: $
        }, {
            pattern: s("(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)", [h, x]),
            lookbehind: !0,
            inside: $
        }, {
            pattern: s("(\\busing\\s+)<<0>>(?=\\s*=)", [h]),
            lookbehind: !0
        }, {
            pattern: s("(\\b<<0>>\\s+)<<1>>", [d, f]),
            lookbehind: !0,
            inside: $
        }, {
            pattern: s("(\\bcatch\\s*\\(\\s*)<<0>>", [m]),
            lookbehind: !0,
            inside: $
        }, {
            pattern: s("(\\bwhere\\s+)<<0>>", [h]),
            lookbehind: !0
        }, {
            pattern: s("(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>", [y]),
            lookbehind: !0,
            inside: $
        }, {
            pattern: s("\\b<<0>>(?=\\s+(?!<<1>>|with\\s*\\{)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))", [x, u, h]),
            inside: $
        }],
        keyword: p,
        number: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
        operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
        punctuation: /\?\.?|::|[{}[\];(),.:]/
    }),
        e.languages.insertBefore("csharp", "number", {
            range: {
                pattern: /\.\./,
                alias: "operator"
            }
        }),
        e.languages.insertBefore("csharp", "punctuation", {
            "named-parameter": {
                pattern: s("([(,]\\s*)<<0>>(?=\\s*:)", [h]),
                lookbehind: !0,
                alias: "punctuation"
            }
        }),
        e.languages.insertBefore("csharp", "class-name", {
            namespace: {
                pattern: s("(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])", [h]),
                lookbehind: !0,
                inside: {
                    punctuation: /\./
                }
            },
            "type-expression": {
                pattern: s("(\\b(?:default|sizeof|typeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<<0>>)*(?=\\s*\\))", [b]),
                lookbehind: !0,
                alias: "class-name",
                inside: $
            },
            "return-type": {
                pattern: s("<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))", [x, m]),
                inside: $,
                alias: "class-name"
            },
            "constructor-invocation": {
                pattern: s("(\\bnew\\s+)<<0>>(?=\\s*[[({])", [x]),
                lookbehind: !0,
                inside: $,
                alias: "class-name"
            },
            "defaults": {
                pattern: s("\\b(Int16|Int32|Int64|Math|Encoding|Thread|JsonSerializer|HttpServer|HttpWebSocket|Console|File|Path)\\b", [x]),
                alias: "class-name"
            },
            "struct": {
                pattern: s("\\b(HttpStatusCode|Guid|RouteMethod|StringSplitOptions)\\b", [x]),
                alias: "struct"
            },
            "generic-method": {
                pattern: s("<<0>>\\s*<<1>>(?=\\s*\\()", [h, g]),
                inside: {
                    function: s("^<<0>>", [h]),
                    generic: {
                        pattern: RegExp(g),
                        alias: "class-name",
                        inside: $
                    }
                }
            },
            "type-list": {
                pattern: s("\\b((?:<<0>>\\s+<<1>>|record\\s+<<1>>\\s*<<5>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>|<<1>>\\s*<<5>>|<<6>>)(?:\\s*,\\s*(?:<<3>>|<<4>>|<<6>>))*(?=\\s*(?:where|[{;]|=>|$))", [d, f, h, x, p.source, b, "\\bnew\\s*\\(\\s*\\)"]),
                lookbehind: !0,
                inside: {
                    "record-arguments": {
                        pattern: s("(^(?!new\\s*\\()<<0>>\\s*)<<1>>", [f, b]),
                        lookbehind: !0,
                        greedy: !0,
                        inside: e.languages.csharp
                    },
                    keyword: p,
                    "class-name": {
                        pattern: RegExp(x),
                        greedy: !0,
                        inside: $
                    },
                    punctuation: /[,()]/
                }
            },
            preprocessor: {
                pattern: /(^[\t ]*)#.*/m,
                lookbehind: !0,
                alias: "property",
                inside: {
                    directive: {
                        pattern: /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
                        lookbehind: !0,
                        alias: "keyword"
                    }
                }
            }
        });
    var E = B + "|" + _
        , R = n("/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>", [E])
        , z = a(n("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [R]), 2)
        , S = "\\b(?:assembly|event|field|method|module|param|property|return|type)\\b"
        , j = n("<<0>>(?:\\s*\\(<<1>>*\\))?", [m, z]);
    e.languages.insertBefore("csharp", "class-name", {
        attribute: {
            pattern: s("((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])", [S, j]),
            lookbehind: !0,
            greedy: !0,
            inside: {
                target: {
                    pattern: s("^<<0>>(?=\\s*:)", [S]),
                    alias: "keyword"
                },
                "attribute-arguments": {
                    pattern: s("\\(<<0>>*\\)", [z]),
                    inside: e.languages.csharp
                },
                "class-name": {
                    pattern: RegExp(m),
                    inside: {
                        punctuation: /\./
                    }
                },
                punctuation: /[:,]/
            }
        }
    });
    var A = ":[^}\r\n]+"
        , F = a(n("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [R]), 2)
        , P = n("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [F, A])
        , U = a(n("[^\"'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)", [E]), 2)
        , Z = n("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [U, A]);
    function q(n, a) {
        return {
            interpolation: {
                pattern: s("((?:^|[^{])(?:\\{\\{)*)<<0>>", [n]),
                lookbehind: !0,
                inside: {
                    "format-string": {
                        pattern: s("(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)", [a, A]),
                        lookbehind: !0,
                        inside: {
                            punctuation: /^:/
                        }
                    },
                    punctuation: /^\{|\}$/,
                    expression: {
                        pattern: /[\s\S]+/,
                        alias: "language-csharp",
                        inside: e.languages.csharp
                    }
                }
            },
            string: /[\s\S]+/
        }
    }
    e.languages.insertBefore("csharp", "string", {
        "interpolation-string": [{
            pattern: s('(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"', [P]),
            lookbehind: !0,
            greedy: !0,
            inside: q(P, F)
        }, {
            pattern: s('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"', [Z]),
            lookbehind: !0,
            greedy: !0,
            inside: q(Z, U)
        }],
        char: {
            pattern: RegExp(_),
            greedy: !0
        }
    }),
        e.languages.dotnet = e.languages.cs = e.languages.csharp
}(Prism);
!function (t) {
    function a(t) {
        return RegExp("(^(?:" + t + "):[ \t]*(?![ \t]))[^]+", "i")
    }
    t.languages.http = {
        "request-line": {
            pattern: /^(?:CONNECT|DELETE|GET|HEAD|OPTIONS|PATCH|POST|PRI|PUT|SEARCH|TRACE)\s(?:https?:\/\/|\/)\S*\sHTTP\/[\d.]+/m,
            inside: {
                method: {
                    pattern: /^[A-Z]+\b/,
                    alias: "property"
                },
                "request-target": {
                    pattern: /^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,
                    lookbehind: !0,
                    alias: "url",
                    inside: t.languages.uri
                },
                "http-version": {
                    pattern: /^(\s)HTTP\/[\d.]+/,
                    lookbehind: !0,
                    alias: "property"
                }
            }
        },
        "response-status": {
            pattern: /^HTTP\/[\d.]+ \d+ .+/m,
            inside: {
                "http-version": {
                    pattern: /^HTTP\/[\d.]+/,
                    alias: "property"
                },
                "status-code": {
                    pattern: /^(\s)\d+(?=\s)/,
                    lookbehind: !0,
                    alias: "number"
                },
                "reason-phrase": {
                    pattern: /^(\s).+/,
                    lookbehind: !0,
                    alias: "string"
                }
            }
        },
        header: {
            pattern: /^[\w-]+:.+(?:(?:\r\n?|\n)[ \t].+)*/m,
            inside: {
                "header-value": [{
                    pattern: a("Content-Security-Policy"),
                    lookbehind: !0,
                    alias: ["csp", "languages-csp"],
                    inside: t.languages.csp
                }, {
                    pattern: a("Public-Key-Pins(?:-Report-Only)?"),
                    lookbehind: !0,
                    alias: ["hpkp", "languages-hpkp"],
                    inside: t.languages.hpkp
                }, {
                    pattern: a("Strict-Transport-Security"),
                    lookbehind: !0,
                    alias: ["hsts", "languages-hsts"],
                    inside: t.languages.hsts
                }, {
                    pattern: a("[^:]+"),
                    lookbehind: !0
                }],
                "header-name": {
                    pattern: /^[^:]+/,
                    alias: "keyword"
                },
                punctuation: /^:/
            }
        }
    };
    var e, n = t.languages, s = {
        "application/javascript": n.javascript,
        "application/json": n.json || n.javascript,
        "application/xml": n.xml,
        "text/xml": n.xml,
        "text/html": n.html,
        "text/css": n.css,
        "text/plain": n.plain
    }, i = {
        "application/json": !0,
        "application/xml": !0
    };
    function r(t) {
        var a = t.replace(/^[a-z]+\//, "");
        return "(?:" + t + "|\\w+/(?:[\\w.-]+\\+)+" + a + "(?![+\\w.-]))"
    }
    for (var p in s)
        if (s[p]) {
            e = e || {};
            var l = i[p] ? r(p) : p;
            e[p.replace(/\//g, "-")] = {
                pattern: RegExp("(content-type:\\s*" + l + "(?:(?:\r\n?|\n)[\\w-].*)*(?:\r(?:\n|(?!\n))|\n))[^ \t\\w-][^]*", "i"),
                lookbehind: !0,
                inside: s[p]
            }
        }
    e && t.languages.insertBefore("http", "header", e)
}(Prism);
Prism.languages.json = {
    property: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
        lookbehind: !0,
        greedy: !0
    },
    string: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
        lookbehind: !0,
        greedy: !0
    },
    comment: {
        pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
        greedy: !0
    },
    number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    punctuation: /[{}[\],]/,
    operator: /:/,
    boolean: /\b(?:false|true)\b/,
    null: {
        pattern: /\bnull\b/,
        alias: "keyword"
    }
},
    Prism.languages.webmanifest = Prism.languages.json;
!function () {
    if ("undefined" != typeof Prism) {
        var e = Object.assign || function (e, t) {
            for (var n in t)
                t.hasOwnProperty(n) && (e[n] = t[n]);
            return e
        }
            , t = {
                "remove-trailing": "boolean",
                "remove-indent": "boolean",
                "left-trim": "boolean",
                "right-trim": "boolean",
                "break-lines": "number",
                indent: "number",
                "remove-initial-line-feed": "boolean",
                "tabs-to-spaces": "number",
                "spaces-to-tabs": "number"
            };
        n.prototype = {
            setDefaults: function (t) {
                this.defaults = e(this.defaults, t)
            },
            normalize: function (t, n) {
                for (var r in n = e(this.defaults, n)) {
                    var i = r.replace(/-(\w)/g, (function (e, t) {
                        return t.toUpperCase()
                    }
                    ));
                    "normalize" !== r && "setDefaults" !== i && n[r] && this[i] && (t = this[i].call(this, t, n[r]))
                }
                return t
            },
            leftTrim: function (e) {
                return e.replace(/^\s+/, "")
            },
            rightTrim: function (e) {
                return e.replace(/\s+$/, "")
            },
            tabsToSpaces: function (e, t) {
                return t = 0 | t || 4,
                    e.replace(/\t/g, new Array(++t).join(" "))
            },
            spacesToTabs: function (e, t) {
                return t = 0 | t || 4,
                    e.replace(RegExp(" {" + t + "}", "g"), "\t")
            },
            removeTrailing: function (e) {
                return e.replace(/\s*?$/gm, "")
            },
            removeInitialLineFeed: function (e) {
                return e.replace(/^(?:\r?\n|\r)/, "")
            },
            removeIndent: function (e) {
                var t = e.match(/^[^\S\n\r]*(?=\S)/gm);
                return t && t[0].length ? (t.sort((function (e, t) {
                    return e.length - t.length
                }
                )),
                    t[0].length ? e.replace(RegExp("^" + t[0], "gm"), "") : e) : e
            },
            indent: function (e, t) {
                return e.replace(/^[^\S\n\r]*(?=\S)/gm, new Array(++t).join("\t") + "$&")
            },
            breakLines: function (e, t) {
                t = !0 === t ? 80 : 0 | t || 80;
                for (var n = e.split("\n"), i = 0; i < n.length; ++i)
                    if (!(r(n[i]) <= t)) {
                        for (var o = n[i].split(/(\s+)/g), a = 0, l = 0; l < o.length; ++l) {
                            var s = r(o[l]);
                            (a += s) > t && (o[l] = "\n" + o[l],
                                a = s)
                        }
                        n[i] = o.join("")
                    }
                return n.join("\n")
            }
        },
            "undefined" != typeof module && module.exports && (module.exports = n),
            Prism.plugins.NormalizeWhitespace = new n({
                "remove-trailing": !0,
                "remove-indent": !0,
                "left-trim": !0,
                "right-trim": !0
            }),
            Prism.hooks.add("before-sanity-check", (function (e) {
                var n = Prism.plugins.NormalizeWhitespace;
                if ((!e.settings || !1 !== e.settings["whitespace-normalization"]) && Prism.util.isActive(e.element, "whitespace-normalization", !0))
                    if (e.element && e.element.parentNode || !e.code) {
                        var r = e.element.parentNode;
                        if (e.code && r && "pre" === r.nodeName.toLowerCase()) {
                            for (var i in null == e.settings && (e.settings = {}),
                                t)
                                if (Object.hasOwnProperty.call(t, i)) {
                                    var o = t[i];
                                    if (r.hasAttribute("data-" + i))
                                        try {
                                            var a = JSON.parse(r.getAttribute("data-" + i) || "true");
                                            typeof a === o && (e.settings[i] = a)
                                        } catch (e) { }
                                }
                            for (var l = r.childNodes, s = "", c = "", u = !1, m = 0; m < l.length; ++m) {
                                var f = l[m];
                                f == e.element ? u = !0 : "#text" === f.nodeName && (u ? c += f.nodeValue : s += f.nodeValue,
                                    r.removeChild(f),
                                    --m)
                            }
                            if (e.element.children.length && Prism.plugins.KeepMarkup) {
                                var d = s + e.element.innerHTML + c;
                                e.element.innerHTML = n.normalize(d, e.settings),
                                    e.code = e.element.textContent
                            } else
                                e.code = s + e.code + c,
                                    e.code = n.normalize(e.code, e.settings)
                        }
                    } else
                        e.code = n.normalize(e.code, e.settings)
            }
            ))
    }
    function n(t) {
        this.defaults = e({}, t)
    }
    function r(e) {
        for (var t = 0, n = 0; n < e.length; ++n)
            e.charCodeAt(n) == "\t".charCodeAt(0) && (t += 3);
        return e.length + t
    }
}();
