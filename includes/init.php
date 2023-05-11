<?php

// error_reporting(E_ALL);
// ini_set("display_errors", 1);
ini_set('upload_max_filesize', '1024M');

session_start();

include 'functions.php';
include 'config.php';

$current_url = $_SERVER["HTTP_HOST"] . $_SERVER['REQUEST_URI'];
$current_path = str_replace(str_replace('http://', '', str_replace('https://', '', DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT)) . DIRECTORY_SEPARATOR, '', $current_url);

$langs = [];
$lang_files = scandir("./lang/");
foreach ($lang_files as $lang_file) {
    if ($lang_file != '.' && $lang_file != '..') {
        $langs[] = str_replace(".php", "", $lang_file);
    }
}

$lang = "en";
if (!isset($_SESSION['lang'])) { 
    $_SESSION['lang'] = 'en';
}
require_once("./lang/" . $_SESSION['lang'] . ".php");
if (!isset($_SESSION['direction'])) { 
    $_SESSION['direction'] = 'ltr';
}

$app_installed = get_env('APP_INSTALLED');
if (!APP_INSTALLED) {
    if ($current_path != 'install.php') {
        echo("<script>location.href = '" . DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT . DIRECTORY_SEPARATOR . 'install.php' . "';</script>");
        die;
    }
}

if (empty($_SESSION["user"])) {
    if ($current_path != 'login.php' && $current_path != 'install.php') {
        echo("<script>location.href = '" . DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT . DIRECTORY_SEPARATOR . 'login.php' . "';</script>");
        die;
    }
} else {
    if ($current_path == 'login.php') {
        echo("<script>location.href = '" . DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT . "';</script>");
        die;
    }
}

$logo_allows = explode(",", LOGO_ALLOWS);
foreach ($logo_allows as $logo_index => $logo_allow) {
    $logo_allows[$logo_index] = 'image/' . $logo_allow;
}

$pic_allows = explode(",", PIC_ALLOWS);
foreach ($pic_allows as $pic_index => $pic_allow) {
    $pic_allows[$pic_index] = 'image/' . $pic_allow;
}

$video_allows = explode(",", VIDEO_ALLOWS);
foreach ($video_allows as $video_index => $video_allow) {
    $video_allows[$video_index] = 'video/' . $video_allow;
}

?>