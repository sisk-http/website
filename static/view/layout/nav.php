<?php
function nav_active($name)
{
    if (!isset($_GET['q'])) {
        return str_contains($_SERVER['REQUEST_URI'], $name) ? 'nav-active' : '';
    }
    return str_contains($_GET['q'], $name) ? 'nav-active' : '';
}
?>

<header>
    <div class="contents">
        <a href="/" class="logo">
            <img src="/assets/img/Icon.png" alt="">
            <h1>
                Sisk Framework
            </h1>
        </a>
        <div class="search-box">
            <div class="placeholder">
                <i class="las la-search"></i>
                Press <kbd>/</kbd> to search
            </div>
            <input type="text" id="searchInput" oninput="doSearch()">
        </div>
        <div class="nav-links">
            <a <?= $_SERVER['REQUEST_URI'] == "/" ? "nav-active" : "" ?> href="/">
                Home
            </a>
            <a <?= nav_active('contents/docs') ?> href="/read?q=/contents/docs/welcome.md">
                Getting Started
            </a>
            <a <?= nav_active('contents/spec') ?> href="/read?q=/contents/spec/index.md">
                Specification
            </a>
            <a <?= nav_active('license') ?> href="/license">
                License
            </a>
        </div>
    </div>
</header>
<div id="searchResults" onfocusout="closeSearchBox()"></div>