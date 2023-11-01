var esbuild = require('esbuild');

(async function () {
    let ctx = await esbuild.context({
        entryPoints: ["assets/js/app.js"],
        outdir: "dist",
        bundle: true,
        minify: true
    });

    await ctx.watch();
})();