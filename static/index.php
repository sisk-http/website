<?php

define("APP_ROOT", __DIR__);
define("CACHE_INDEX", 3);
require_once 'lib/fw.php';

usleep(200 * 1000);

set_view('/', 'home');
set_view('/read', 'read');
set_view('/license', 'license');

router_execute();
