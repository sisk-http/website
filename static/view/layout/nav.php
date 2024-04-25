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
    <div class="container contents">
        <a href="/" class="logo">
            <img src="/assets/img/Icon.png" alt="">
            <h1>
                Sisk Framework
            </h1>
        </a>
        <label for="navVisible" class="nav-toggle">
            <i class="las la-bars"></i>
        </label>
        <div class="nav-links">
            <input type="checkbox" id="navVisible">
            <a <?= $_SERVER['REQUEST_URI'] == "/" ? "nav-active" : "" ?> href="/">
                Home
            </a>
            <a target="_blank" href="https://docs.sisk-framework.org/">
                Get Started
            </a>
            <a <?= nav_active('license') ?> href="/license">
                License
            </a>
            <a href="https://github.com/sisk-http">
                <i class="lab la-github"></i>
            </a>
        </div>
    </div>
</header>