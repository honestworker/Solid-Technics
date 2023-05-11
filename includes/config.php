<?php

define('DOMAIN_NAME', get_env('DOMAIN_NAME'));
define('DOMAIN_ROOT', get_env('DOMAIN_ROOT'));

define('SITE_NAME', get_env('SITE_NAME'));

define('DB_HOST', get_env('DB_HOST'));
define('DB_NAME', get_env('DB_NAME'));
define('DB_USER', get_env('DB_USER'));
define('DB_PASSWORD', get_env('DB_PASSWORD'));

define('MEDIA_PATH', get_env('MEDIA_PATH'));
define('UPLOADS_PATH', get_env('UPLOADS_PATH'));

define('LOGO_NAME', get_env('LOGO_NAME'));
define('LOGO_ALLOWS', get_env('LOGO_ALLOWS'));
define('LOGO_MAX_SIZE', get_env('LOGO_MAX_SIZE'));
define('LOGO_MAX_WIDTH', get_env('LOGO_MAX_WIDTH'));

define('PIC_ALLOWS', get_env('PIC_ALLOWS'));
define('PIC_MAX_SIZE', get_env('PIC_MAX_SIZE'));
define('PIC_MAX_WIDTH', get_env('PIC_MAX_WIDTH'));
define('VIDEO_ALLOWS', get_env('VIDEO_ALLOWS'));

define('EXPORT_PRODUCT', get_env('EXPORT_PRODUCT'));

define('IMPORT_USER_PASSWORD', get_env('IMPORT_USER_PASSWORD'));

define('TRANSPARENT_PNG_PATH', get_env('TRANSPARENT_PNG_PATH'));
define('TRANSPARENT_PNG_NAME', get_env('TRANSPARENT_PNG_NAME'));

define('STAR1_LIMIT', get_env('STAR1_LIMIT'));
define('STAR2_LIMIT', get_env('STAR2_LIMIT'));
define('STAR3_LIMIT', get_env('STAR3_LIMIT'));
define('STAR4_LIMIT', get_env('STAR4_LIMIT'));
define('STAR5_LIMIT', get_env('STAR5_LIMIT'));

$app_installed = get_env('APP_INSTALLED');
$app_installed_value = true;
if (!$app_installed || (strtoupper($app_installed) != 'TRUE' && $app_installed != 1 && $app_installed != '1')) {
    $app_installed_value = false;
}
define('APP_INSTALLED', $app_installed_value);

//////////////////// Check MySql Connection ////////////////////
$db_conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if (APP_INSTALLED && $db_conn->connect_error) {
    die("Database Connection failed: " . $db_conn->connect_error);
}