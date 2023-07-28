<?php
function nav_active($name)
{
    if (!isset($_GET['q'])) return '';
    return str_contains($_GET['q'], $name) ? 'nav-active' : '';
}
?>

<header>
    <div class="contents">
        <div class="logo">
            <img src="/assets/img/Icon.png" alt="">
            <h1>
                Sisk
            </h1>
        </div>
        <div class="nav-links">
            <a href="/">
                Home
            </a>
            <a <?= nav_active('contents/docs') ?> href="/read?q=/contents/docs/welcome.md">
                Getting Started
            </a>
            <a <?= nav_active('contents/spec') ?> href="/read?q=/contents/spec/index.md">
                Specification
            </a>
        </div>
    </div>
</header>