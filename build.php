<?php

echo "Building PHP...\n";
sleep(3);

const BASE_PATH = "http://localhost:5151/";

copy(BASE_PATH, "dist/index.html");
copy(BASE_PATH . 'license', "dist/license.html");

echo "Assets built. You can now exit PHP.";
