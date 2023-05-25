<?php

if (!function_exists('get_env')) {
    function get_env($env_name, $env_default = '') {
        $env_file_content = file_get_contents('./.env', true);
        $env_contents = explode(PHP_EOL, $env_file_content);

        foreach ($env_contents as $env_content) {
            if ($env_content) {
                $env_pairs = explode('=', $env_content);
                if (count($env_pairs)) {
                    $env_key = $env_pairs[0];
                    $env_value = '';
                    if (count($env_pairs) > 1) {
                        $env_value = $env_pairs[1];
                    }
                    if ($env_key == $env_name) {
                        $env_value = str_replace('/^"/', '', str_replace('/"$/', '', $env_value));
                        if (is_string($env_value) && strtoupper($env_value) == 'TRUE') {
                            return true;
                        }
                        if (is_string($env_value) && strtoupper($env_value) == 'FALSE') {
                            return false;
                        }
                        return $env_value;
                    }
                }
            }
        }

        return $env_default;
    }
}

if (!function_exists('set_env')) {
    function set_env($env_name, $env_value) {
        $env_file_content = file_get_contents('./.env', true);
        $env_contents = explode(PHP_EOL, $env_file_content);

        $new_env_file_content = '';
        $env_exist = false;
        foreach ($env_contents as $env_content) {
            $env_new_content = $env_content;
            if ($env_content) {
                $env_pairs = explode('=', $env_content);
                if (count($env_pairs)) {
                    $env_key = $env_pairs[0];
                    if ($env_key == $env_name) {
                        $env_new_content = $env_key . '=';
                        if (strpos($env_value, '=') == FALSE) {
                            $env_new_content .= $env_value;
                        } else {
                            $env_new_content .= '"' . $env_value . '"';
                        }
                        $env_exist = true;
                    }
                }
            }

            if ($new_env_file_content) {
                $new_env_file_content .= PHP_EOL;
            }
            $new_env_file_content .= $env_new_content;
        }
        if (!$env_exist) {
            if ($new_env_file_content) {
                $new_env_file_content .= PHP_EOL;
            }
            $new_env_file_content .= $env_key . '="' . $env_value . '"';
        }
        file_put_contents('./.env', $new_env_file_content);
    }
}

if (!function_exists('compress_image')) {
    function compress_image($image, $max_width = 0, $max_size = 0) {
        if ($max_width || $max_size) {
            if ($max_width) {
                list($width, $height) = getimagesize($image);

                if ($max_width < $width) {
                    $transparent_image = imagecreatetruecolor($max_width, $height * $max_width / $width);
                
                    $info = getimagesize($image);
                    switch($info['mime']) {
                        case 'image/jpeg':
                            $new_image = imagecreatefromjpeg($image);
                            break;
                        case 'image/png':
                            $new_image = imagecreatefrompng($image);
                            break;
                        default:
                            $new_image = imagecreatefromjpeg($image);
                    }

                    imagecopyresampled($transparent_image, $new_image, 0, 0, 0, 0, $max_width, $height * $max_width / $width, $width, $height);
                    switch($info['mime']) {
                        case 'image/jpeg':
                            imagejpeg($transparent_image, $image, 100);
                            break;
                        case 'image/png':
                            imagepng($transparent_image, $image, 100);
                            break;
                        default:
                            imagejpeg($transparent_image, $image, 100);
                    }
                }
            }
            if ($max_size) {
                $image_size = filesize($image);
                if ($max_size < $image_size) {
                    list($width, $height) = getimagesize($image);
                    
                    $transparent_image = imagecreatetruecolor($width, $height);
                
                    $info = getimagesize($image);
                    switch($info['mime']) {
                        case 'image/jpeg':
                            $new_image = imagecreatefromjpeg($image);
                            break; 
                        case 'image/png':
                            $new_image = imagecreatefrompng($image);
                            break; 
                        default: 
                            $new_image = imagecreatefromjpeg($image);
                    }
                
                    imagecopyresampled($transparent_image, $new_image, 0, 0, 0, 0, $width, $height, $width, $height);
                    $image_ratio = (int)($max_size / $image_size * 100);
                    switch($info['mime']) {
                        case 'image/jpeg':
                            imagejpeg($transparent_image, $image, $image_ratio);
                            break;
                        case 'image/png':
                            imagepng($transparent_image, $image, $image_ratio);
                            break;
                        default:
                            imagejpeg($transparent_image, $image, $image_ratio);
                    }
                }
            }
        }
    }
}

if (!function_exists('lang_to_country')) {
    function lang_to_country($lang) {
        $lang_country_codes = [
            'ca' => 'ad',
            'ar' => 'ae',
            'ps' => 'af',
            'fa' => 'af',
            'uz' => 'af',
            'en' => 'us',
            'es' => 'es',
            'zh' => 'cn',
        ];

        return isset($lang_country_codes[$lang]) ? $lang_country_codes[$lang] : $lang;
    }
}

if (!function_exists('format_size')) {
    function format_size($size, $format='') {
        $size = (double)$size;
        if ($format) {
            if (strtoupper($format) == 'B') {
                return $size . ' B';
            } else if (strtoupper($format) == 'KB') {
                return (number_format($size / 1024, 2) ? number_format($size / 1024, 2) : 0) . ' KB';
            } else if (strtoupper($format) == 'MB') {
                return (number_format($size / 1024 / 1024, 2) ? number_format($size / 1024 / 1024, 2) : 0) . ' MB';
            } else if (strtoupper($format) == 'GB') {
                return (number_format($size / 1024 / 1024 / 1024, 2) ? number_format($size / 1024 / 1024 / 1024, 2) : 0) . ' GB';
            }
        } else {
            if ($size > 1024 * 1024 * 1024) {
                return (number_format($size / 1024 / 1024 / 1024, 2) ? number_format($size / 1024 / 1024 / 1024, 2) : 0) . ' GB';
            } else if ($size > 1024 * 1024) {
                return (number_format($size / 1024 / 1024, 2) ? number_format($size / 1024 / 1024, 2) : 0) . ' MB';
            } else if ($size > 1024) {
                return (number_format($size / 1024, 2) ? number_format($size / 1024, 2) : 0) . ' KB';
            } else {
                return $size . ' B';
            }
        }
    }
}

if (!function_exists('get_media_name')) {
    function get_media_name($media, $user_name) {
        $media_ext = pathinfo($media, PATHINFO_EXTENSION);
        $media_name = basename($media, "." . $media_ext);
        $check_media = $media_name . "." . $media_ext;
        $media_suffix = 0;
        $media_check = false;
        while (!$media_check) {
            $check_media = $media_name . "." . $media_ext;
            if ($media_suffix) {
                $check_media = $media_name . '_' . $media_suffix . "." . $media_ext;
            }
            if (!file_exists(".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $check_media)) {
                $media_check = true;
            }
            $media_suffix += 1;
        }
        return $check_media;
    }
}

if (!function_exists('check_product_media')) {
    function check_product_media($db_conn) {
        $products_sql = "SELECT `products`.`id`, `products`.`pic_1`, `products`.`pic_2`, `products`.`pic_3`, `products`.`pic_4`, `products`.`video_1`, `products`.`video_2`, `users`.`name` as 'user_name' FROM `products` LEFT JOIN `users` ON `products`.`user_id` = `users`.`id`";
        $products_sql_result = $db_conn->query($products_sql);
        $products[] = [];
        if ($products_sql_result->num_rows) {
            while ($product = $products_sql_result->fetch_assoc()) {
                $products[] = $product;
            }
        }
        foreach ($products as $product) {
            $pic_1_name = $product['pic_1'];
            if (!file_exists(".." . DIRECTORY_SEPARATOR . $product['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $pic_1_name)) {
                $pic_1_name = TRANSPARENT_PNG_NAME;
            }
            $pic_2_name = $product['pic_2'];
            if (!file_exists(".." . DIRECTORY_SEPARATOR . $product['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $pic_2_name)) {
                $pic_2_name = TRANSPARENT_PNG_NAME;
            }
            $pic_3_name = $product['pic_3'];
            if (!file_exists(".." . DIRECTORY_SEPARATOR . $product['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $pic_3_name)) {
                $pic_3_name = TRANSPARENT_PNG_NAME;
            }
            $pic_4_name = $product['pic_4'];
            if (!file_exists(".." . DIRECTORY_SEPARATOR . $product['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $pic_4_name)) {
                $pic_4_name = TRANSPARENT_PNG_NAME;
            }
            $video_1_name = $product['video_1'];
            if (!file_exists(".." . DIRECTORY_SEPARATOR . $product['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $video_1_name)) {
                $video_1_name = '';
            }
            $video_2_name = $product['video_2'];
            if (!file_exists(".." . DIRECTORY_SEPARATOR . $product['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $video_2_name)) {
                $video_2_name = '';
            }
            $product_sql = "UPDATE `products` SET `pic_1`='" . $pic_1_name . "', `pic_2`='" . $pic_2_name . "', `pic_3`='" . $pic_3_name . "', `pic_4`='" . $pic_4_name . "'";
            $product_sql .= ", `video_1`='" . $video_1_name . "', `video_2`='" . $video_2_name . "'";
            $product_sql .= " WHERE `id` = '" . $product['id'] . "'";
            $db_conn->query($product_sql);
        }
    }
}

if(!function_exists("mime_content_type"))
{
    function mime_content_type($file)
    {
        $open_bit = finfo_open(FILEINFO_MIME_TYPE);
        return finfo_file($open_bit, $file);
    }
}

if (!function_exists('rrmdir')) {
    function rrmdir($dir) {
        foreach(glob($dir . '/*') as $file) {
            if ($file != '.' && $file != '..') {
                if (is_dir($file)) {
                    rrmdir($file);
                } else {
                    unlink($file);
                }
            }
        }
        rmdir($dir); 
    }
}
?>