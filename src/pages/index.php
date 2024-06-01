<?php

session_start();

define("APP_ROOT", __DIR__);
define("CACHE_INDEX", uniqid());
require_once 'lib/fw.php';

set_view('/', 'home');
set_view('/license', 'license');

router_execute();
