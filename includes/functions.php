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
                        return str_replace('/^"/', '', str_replace('/"$/', '', $env_value));
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
    function compress_image($image, $max_width = 0, $max_size = 0, $to = '') {
        if ($max_width || $max_size) {
            if ($max_width) {
                list($width, $height) = getimagesize($image);

                if ($max_width < $width) {
                    $transparent_image = imagecreatetruecolor($max_width, $height * $max_width / $width);
                
                    $info = getimagesize($image);
                    if ($to) {
                        switch($to) {
                            case 'image/jpeg':
                                $new_image = imagecreatefromjpeg($image);
                                break;
                            case 'image/png':
                                $new_image = imagecreatefrompng($image);
                                break;
                            default:
                                $new_image = imagecreatefromjpeg($image);
                        }
                    } else {
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
                    }

                    imagecopyresampled($transparent_image, $new_image, 0, 0, 0, 0, $max_width, $height * $max_width / $width, $width, $height);

                    if ($to) {
                        switch($to) {
                            case 'image/jpeg':
                                imagejpeg($transparent_image, $image, 100);
                                break;
                            case 'image/png':
                                imagepng($transparent_image, $image, 100);
                                break;
                            default:
                                imagejpeg($transparent_image, $image, 100);
                        }
                    } else {
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
            }
            if ($max_size) {
                $image_size = filesize($image);
                if ($max_size < $image_size) {
                    list($width, $height) = getimagesize($image);
                    
                    $transparent_image = imagecreatetruecolor($width, $height);
                
                    $info = getimagesize($image);
                    if ($to) {
                        switch($to) {
                            case 'image/jpeg':
                                $new_image = imagecreatefromjpeg($image);
                                break; 
                            case 'image/png':
                                $new_image = imagecreatefrompng($image);
                                break; 
                            default: 
                                $new_image = imagecreatefromjpeg($image);
                        }
                    } else {
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
                    }
                
                    imagecopyresampled($transparent_image, $new_image, 0, 0, 0, 0, $width, $height, $width, $height);
                    
                    if ($to) {
                        switch($to) {
                            case 'image/jpeg':
                                imagejpeg($transparent_image, $image, $max_size / $image_size * 100);
                                break;
                            case 'image/png':
                                imagepng($transparent_image, $image, $max_size / $image_size * 100);
                                break;
                            default:
                                imagejpeg($transparent_image, $image, $max_size / $image_size * 100);
                        }
                    } else {
                        switch($info['mime']) {
                            case 'image/jpeg':
                                imagejpeg($transparent_image, $image, $max_size / $image_size * 100);
                                break;
                            case 'image/png':
                                imagepng($transparent_image, $image, $max_size / $image_size * 100);
                                break;
                            default:
                                imagejpeg($transparent_image, $image, $max_size / $image_size * 100);
                        }
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

        return isset($lang_country_codes[$lang]) ? $lang_country_codes[$lang] : 'us';
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

?>