function html(strings, ...placeholders) {
    const N = placeholders.length;
    let out = '';
    for (let i = 0; i < N; i++) {
        out += strings[i] + placeholders[i];
    }
    out += strings[N];
    return out;
}