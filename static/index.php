<?php

define("APP_ROOT", __DIR__);
require_once 'lib/fw.php';

usleep(200 * 1000);

set_view('/', 'home');
set_view('/read', 'read');

router_execute();
