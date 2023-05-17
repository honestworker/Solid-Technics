<?php

include './includes/init.php';

header("Content-Type: application/json");

$action = !empty($_POST['action']) ? $_POST['action'] : '';
$id = !empty($_POST['id']) ? $_POST['id'] : '';
$data = !empty($_POST['data']) ? $_POST['data'] : '';
$lang = !empty($_POST['lang']) ? $_POST['lang'] : '';

$response = [
    'status' => false,
    'data' => [],
    'errors' => [],
];

if ($action) {
    switch ($action) {
        case 'change-language':
            $_SESSION['lang'] = $lang;
            $response['status'] = true;

            break;
        
        case 'get-product':
            $product_sql = "SELECT `products`.`id`, `products`.`sku_no`, `products`.`barcode`, `products`.`description_1`, `products`.`description_2`, `products`.`brand`, `products`.`brand_sku`, `products`.`text_1`, `products`.`text_2`, `products`.`country`, `products`.`pic_1`, `products`.`pic_2`, `products`.`pic_3`, `products`.`pic_4`, `products`.`video_1`, `products`.`video_2`, `users`.`name` as 'user_name' FROM `products` LEFT JOIN `users` ON `products`.`user_id` = `users`.`id` WHERE `products`.`id` ='" . $id . "'";
            $sql_result = $db_conn->query($product_sql);
            if ($sql_result->num_rows) {
                $product_row = $sql_result->fetch_assoc();
                $response['status'] = true;
                $response['data'] = [
                    'sku_no' => $product_row['sku_no'],
                    'barcode' => $product_row['barcode'],
                    'description_1' => $product_row['description_1'],
                    'description_2' => $product_row['description_2'],
                    'brand' => $product_row['brand'],
                    'brand_sku' => $product_row['brand_sku'],
                    'text_1' => $product_row['text_1'],
                    'text_2' => $product_row['text_2'],
                    'country' => $product_row['country'],
                    'pic_1' => ($product_row['pic_1']) ? (DOMAIN_NAME . DIRECTORY_SEPARATOR . (($product_row['pic_1'] == TRANSPARENT_PNG_NAME) ? (DOMAIN_ROOT . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_PATH . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_NAME) : ($product_row['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $product_row['pic_1']))) . "?v=" . time() : '',
                    'pic_2' => ($product_row['pic_2']) ? (DOMAIN_NAME . DIRECTORY_SEPARATOR . (($product_row['pic_2'] == TRANSPARENT_PNG_NAME) ? (DOMAIN_ROOT . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_PATH . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_NAME) : ($product_row['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $product_row['pic_2']))) . "?v=" . time() : '',
                    'pic_3' => ($product_row['pic_3']) ? (DOMAIN_NAME . DIRECTORY_SEPARATOR . (($product_row['pic_3'] == TRANSPARENT_PNG_NAME) ? (DOMAIN_ROOT . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_PATH . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_NAME) : ($product_row['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $product_row['pic_3']))) . "?v=" . time() : '',
                    'pic_4' => ($product_row['pic_4']) ? (DOMAIN_NAME . DIRECTORY_SEPARATOR . (($product_row['pic_4'] == TRANSPARENT_PNG_NAME) ? (DOMAIN_ROOT . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_PATH . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_NAME) : ($product_row['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $product_row['pic_4']))) . "?v=" . time() : '',
                    'pic_1_transparent' => ($product_row['pic_1']) ? ($product_row['pic_1'] == TRANSPARENT_PNG_NAME ? true : false) : true,
                    'pic_2_transparent' => ($product_row['pic_2']) ? ($product_row['pic_2'] == TRANSPARENT_PNG_NAME ? true : false) : true,
                    'pic_3_transparent' => ($product_row['pic_3']) ? ($product_row['pic_3'] == TRANSPARENT_PNG_NAME ? true : false) : true,
                    'pic_4_transparent' => ($product_row['pic_4']) ? ($product_row['pic_4'] == TRANSPARENT_PNG_NAME ? true : false) : true,
                    'video_1' => $product_row['video_1'],
                    'video_2' => $product_row['video_2'],
                ];
            }

            break;
        
        case 'update-product':
            $user_id = '';
            $user_name = '';
            $pic_1_name = '';
            $pic_2_name = '';
            $pic_3_name = '';
            $pic_4_name = '';
            $video_1_name = '';
            $video_2_name = '';
            $has_error = false;
            $user_id = $_SESSION["user"]['id'];
            $user_name = $_SESSION["user"]['name'];
            
            if ($_POST['id']) {
                $products_sql = "SELECT * FROM `products` WHERE `id`='" . $_POST['id'] . "'";
                $products_sql_result = $db_conn->query($products_sql);
                if ($products_sql_result->num_rows) {
                    $product_row = $products_sql_result->fetch_assoc();
                    if ($_SESSION["user"]['level'] == 'admin') {
                        $user_id = $product_row['user_id'];

                        $users_sql = "SELECT * FROM `users` WHERE `id`='" . $user_id . "'";
                        $users_sql_result = $db_conn->query($users_sql);
                        if ($users_sql_result->num_rows) {
                            $user_row = $users_sql_result->fetch_assoc();
                            $user_name = $user_row['name'];
                        }
                    }
                    $pic_1_name = $product_row['pic_1'];
                    if (!file_exists(".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $pic_1_name)) {
                        $pic_1_name = TRANSPARENT_PNG_NAME;
                    }
                    $pic_2_name = $product_row['pic_2'];
                    if (!file_exists(".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $pic_2_name)) {
                        $pic_2_name = TRANSPARENT_PNG_NAME;
                    }
                    $pic_3_name = $product_row['pic_3'];
                    if (!file_exists(".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $pic_3_name)) {
                        $pic_3_name = TRANSPARENT_PNG_NAME;
                    }
                    $pic_4_name = $product_row['pic_4'];
                    if (!file_exists(".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $pic_4_name)) {
                        $pic_4_name = TRANSPARENT_PNG_NAME;
                    }
                    $video_1_name = $product_row['video_1'];
                    if (!file_exists(".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $video_1_name)) {
                        $video_1_name = '';
                    }
                    $video_2_name = $product_row['video_2'];
                    if (!file_exists(".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $video_2_name)) {
                        $video_2_name = '';
                    }
                }
            }

            $uploaded_size = 0;
            $uploaded_max_size = 0;
            if ($_SESSION["user"]['level'] != 'admin') {
                $media_files = scandir(".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH);
                foreach ($media_files as $media_file) {
                    if ($media_file != '.' && $media_file != '..' && $media_file != EXPORT_PRODUCT && $media_file != LOGO_NAME) {
                        $uploaded_size += filesize(".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $media_file);
                    }
                }
                if ($_SESSION["user"]['level'] == 'star1') {
                    $uploaded_max_size = STAR1_LIMIT;
                } else if ($_SESSION["user"]['level'] == 'star2') {
                    $uploaded_max_size = STAR2_LIMIT;
                } else if ($_SESSION["user"]['level'] == 'star3') {
                    $uploaded_max_size = STAR3_LIMIT;
                } else if ($_SESSION["user"]['level'] == 'star4') {
                    $uploaded_max_size = STAR4_LIMIT;
                } else if ($_SESSION["user"]['level'] == 'star5') {
                    $uploaded_max_size = STAR5_LIMIT;
                }
            }

            if ($_POST['sku_no']) {
                if (!preg_match("/^[0-9a-zA-Z_-]{1,10}$/i", $_POST['sku_no'])) {
                    $response['errors']['sku_no'] = $_LANGUAGE['please_match'] . " " . $_LANGUAGE['sku_no'] . " (" . "/^[0-9a-zA-Z_-]{1,10}$/i" . ")";
                    $has_error = true;
                } else {
                    $products_sql = "SELECT * FROM `products` WHERE `sku_no`='" . $_POST['sku_no'] . "' AND `user_id`='" . $user_id . "'";
                    if ($_POST['id']) {
                        $products_sql .= " AND `id` !='" . $_POST['id'] . "'";
                    }
                    $products_sql_result = $db_conn->query($products_sql);
                    if ($products_sql_result->num_rows) {
                        $response['errors']['sku_no'] = $_LANGUAGE['sku_no_already_exist'];
                        $has_error = true;
                    }
                }
            } else {
                $response['errors']['sku_no'] = $_LANGUAGE['please_input_sku_no'];
                $has_error = true;
            }
            if ($_POST['barcode']) {
                if (!preg_match("/^[0-9]{1,30}$/i", $_POST['barcode'])) {
                    $response['errors']['barcode'] = $_LANGUAGE['please_match'] . " " . $_LANGUAGE['barcode'] . " (" . "/^[0-9]{1,30}$/i" . ")";
                    $has_error = true;
                } else {
                    $products_sql = "SELECT * FROM `products` WHERE `barcode`='" . $_POST['barcode'] . "' AND `user_id`='" . $user_id . "'";
                    if ($_POST['id']) {
                        $products_sql .= " AND `id` !='" . $_POST['id'] . "'";
                    }
                    $products_sql_result = $db_conn->query($products_sql);                    
                    if ($products_sql_result->num_rows) {
                        $response['errors']['barcode'] = $_LANGUAGE['barcode_already_exist'];
                        $has_error = true;
                    }
                }
            } else {
                $response['errors']['barcode'] = $_LANGUAGE['please_input_barcode'];
                $has_error = true;
            }
            if (!$_POST['description_1']) {
                $response['errors']['description_1'] = $_LANGUAGE['please_input_description_1'];
                $has_error = true;
            } else {
                if (mb_strlen($_POST['description_1']) > 30) {
                    $response['errors']['description_1'] = $_LANGUAGE['description_1'] . ' ' . $_LANGUAGE['length_exceeded'];
                    $has_error = true;
                }
            }
            if (!$_POST['description_2']) {
                $response['errors']['description_2'] = $_LANGUAGE['please_input_description_2'];
                $has_error = true;
            } else {
                if (mb_strlen($_POST['description_2']) > 30) {
                    $response['errors']['description_2'] = $_LANGUAGE['description_2'] . ' ' . $_LANGUAGE['length_exceeded'];
                    $has_error = true;
                }
            }
            if (!$_POST['brand']) {
                $response['errors']['brand'] = $_LANGUAGE['please_input_brand'];
                $has_error = true;
            } else {
                if (mb_strlen($_POST['brand']) > 30) {
                    $response['errors']['brand'] = $_LANGUAGE['brand'] . ' ' . $_LANGUAGE['length_exceeded'];
                    $has_error = true;
                }
            }
            if (!$_POST['brand_sku']) {
                $response['errors']['brand_sku'] = $_LANGUAGE['please_input_brand_sku'];
                $has_error = true;
            } else {
                if (mb_strlen($_POST['brand_sku']) > 30) {
                    $response['errors']['brand_sku'] = $_LANGUAGE['brand_sku'] . ' ' . $_LANGUAGE['length_exceeded'];
                    $has_error = true;
                }
            }
            if (!$_POST['text_1']) {
                $response['errors']['text_1'] = $_LANGUAGE['please_input_text_1'];
                $has_error = true;
            } else {
                if (mb_strlen($_POST['text_1']) > 80) {
                    $response['errors']['text_1'] = $_LANGUAGE['text_1'] . ' ' . $_LANGUAGE['length_exceeded'];
                    $has_error = true;
                }
            }
            if (!$_POST['text_2']) {
                $response['errors']['text_2'] = $_LANGUAGE['please_input_text_2'];
                $has_error = true;
            } else {
                if (mb_strlen($_POST['text_2']) > 80) {
                    $response['errors']['text_2'] = $_LANGUAGE['text_2'] . ' ' . $_LANGUAGE['length_exceeded'];
                    $has_error = true;
                }
            }
            if (!$_POST['country']) {
                $response['errors']['country'] = $_LANGUAGE['please_input_country'];
                $has_error = true;
            } else {
                if (mb_strlen($_POST['country']) > 20) {
                    $response['errors']['country'] = $_LANGUAGE['country'] . ' ' . $_LANGUAGE['length_exceeded'];
                    $has_error = true;
                }
            }

            if (isset($_FILES['pic_1']) && $_FILES['pic_1']) {
                $mine_type = mime_content_type($_FILES['pic_1']['tmp_name']);
                if (!in_array($mine_type, $pic_allows)) {
                    $response['errors']['pic_1'] = $_LANGUAGE['please_input_vaild_type_image'] . ' (' . join(", ", $pic_allows) . ')';
                    $has_error = true;
                } else {
                    $pic_1_file_size = filesize($_FILES['pic_1']['tmp_name']);
                    if ($_SESSION["user"]['level'] != 'admin') {
                        if ($uploaded_size + min($pic_1_file_size, PIC_MAX_SIZE * 1024 * 1024) > $uploaded_max_size * 1024 * 1024) {
                            $response['errors']['overall'] = $_LANGUAGE['you_exceeded_the_limit'] . ' (' . $uploaded_max_size . 'MB)';
                            $has_error = true;
                        }
                    }
                    if (!$has_error) {
                        $pic_1_name = basename($_FILES['pic_1']['name']);
                        $products_sql = "SELECT * FROM `products` WHERE `pic_1`='" . $pic_1_name . "' AND `user_id`='" . $user_id . "'";
                        if ($_POST['id']) {
                            $products_sql .= " AND `id` !='" . $_POST['id'] . "'";
                        }
                        $products_sql_result = $db_conn->query($products_sql);
                        if ($products_sql_result->num_rows) {
                            $pic_1_name = get_media_name($pic_1_name, $user_name);
                        }
                        if ($pic_1_name == TRANSPARENT_PNG_NAME) get_media_name($pic_1_name, $user_name);
                        $pic_1_path = $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $pic_1_name;
                        $uploaded_size += min($pic_1_file_size, PIC_MAX_SIZE * 1024 * 1024);
                        move_uploaded_file($_FILES['pic_1']['tmp_name'], ".." . DIRECTORY_SEPARATOR . $pic_1_path);
                        compress_image(dirname(__FILE__) . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . $pic_1_path, PIC_MAX_WIDTH, PIC_MAX_SIZE * 1024 * 1024);
                    }
                }
            } else {
                if (!$pic_1_name) {
                    $pic_1_name = TRANSPARENT_PNG_NAME;
                }
            }
            if (isset($_FILES['pic_2']) && $_FILES['pic_2']) {
                $mine_type = mime_content_type($_FILES['pic_2']['tmp_name']);
                if (!in_array($mine_type, $pic_allows)) {
                    $response['errors']['pic_2'] = $_LANGUAGE['please_input_vaild_type_image'] . ' (' . join(", ", $pic_allows) . ')';
                    $has_error = true;
                } else {
                    $pic_2_file_size = filesize($_FILES['pic_2']['tmp_name']);
                    if ($_SESSION["user"]['level'] != 'admin') {
                        if ($uploaded_size + min($pic_2_file_size, PIC_MAX_SIZE * 1024 * 1024) > $uploaded_max_size * 1024 * 1024) {
                            $response['errors']['overall'] = $_LANGUAGE['you_exceeded_the_limit'] . ' (' . $uploaded_max_size . 'MB)';
                            $has_error = true;
                        }
                    }
                    if (!$has_error) {
                        $pic_2_name = basename($_FILES['pic_2']['name']);
                        $products_sql = "SELECT * FROM `products` WHERE `pic_2`='" . $pic_2_name . "' AND `user_id`='" . $user_id . "'";
                        if ($_POST['id']) {
                            $products_sql .= " AND `id` !='" . $_POST['id'] . "'";
                        }
                        $products_sql_result = $db_conn->query($products_sql);
                        if ($products_sql_result->num_rows) {
                            $pic_2_name = get_media_name($pic_2_name, $user_name);
                        }
                        if ($pic_2_name == TRANSPARENT_PNG_NAME) get_media_name($pic_2_name, $user_name);
                        $pic_2_path = $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $pic_2_name;
                        $uploaded_size += min($pic_2_file_size, PIC_MAX_SIZE * 1024 * 1024);
                        move_uploaded_file($_FILES['pic_2']['tmp_name'], ".." . DIRECTORY_SEPARATOR . $pic_2_path);
                        compress_image(dirname(__FILE__) . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . $pic_2_path, PIC_MAX_WIDTH, PIC_MAX_SIZE * 1024 * 1024);
                    }
                }
            } else {
                if (!$pic_2_name) {
                    $pic_2_name = TRANSPARENT_PNG_NAME;
                }
            }
            if (isset($_FILES['pic_3']) && $_FILES['pic_3']) {
                $mine_type = mime_content_type($_FILES['pic_3']['tmp_name']);
                if (!in_array($mine_type, $pic_allows)) {
                    $response['errors']['pic_3'] = $_LANGUAGE['please_input_vaild_type_image'] . ' (' . join(", ", $pic_allows) . ')';
                    $has_error = true;
                } else {
                    $pic_3_file_size = filesize($_FILES['pic_3']['tmp_name']);
                    if ($_SESSION["user"]['level'] != 'admin') {
                        if ($uploaded_size + min($pic_3_file_size, PIC_MAX_SIZE * 1024 * 1024) > $uploaded_max_size * 1024 * 1024) {
                            $response['errors']['overall'] = $_LANGUAGE['you_exceeded_the_limit'] . ' (' . $uploaded_max_size . 'MB)';
                            $has_error = true;
                        }
                    }
                    if (!$has_error) {
                        $pic_3_name = basename($_FILES['pic_3']['name']);
                        $products_sql = "SELECT * FROM `products` WHERE `pic_3`='" . $pic_3_name . "' AND `user_id`='" . $user_id . "'";
                        if ($_POST['id']) {
                            $products_sql .= " AND `id` !='" . $_POST['id'] . "'";
                        }
                        $products_sql_result = $db_conn->query($products_sql);
                        if ($products_sql_result->num_rows) {
                            $pic_3_name = get_media_name($pic_3_name, $user_name);
                        }
                        if ($pic_3_name == TRANSPARENT_PNG_NAME) get_media_name($pic_3_name, $user_name);
                        $pic_3_path = $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $pic_3_name;
                        $uploaded_size += min($pic_3_file_size, PIC_MAX_SIZE * 1024 * 1024);
                        move_uploaded_file($_FILES['pic_3']['tmp_name'], ".." . DIRECTORY_SEPARATOR . $pic_3_path);
                        compress_image(dirname(__FILE__) . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . $pic_3_path, PIC_MAX_WIDTH, PIC_MAX_SIZE * 1024 * 1024);
                    }
                }
            } else {
                if (!$pic_3_name) {
                    $pic_3_name = TRANSPARENT_PNG_NAME;
                }
            }
            if (isset($_FILES['pic_4']) && $_FILES['pic_4']) {
                $mine_type = mime_content_type($_FILES['pic_4']['tmp_name']);
                if (!in_array($mine_type, $pic_allows)) {
                    $response['errors']['pic_4'] = $_LANGUAGE['please_input_vaild_type_image'] . ' (' . join(", ", $pic_allows) . ')';
                    $has_error = true;
                } else {
                    $pic_4_file_size = filesize($_FILES['pic_4']['tmp_name']);
                    if ($_SESSION["user"]['level'] != 'admin') {
                        if ($uploaded_size + min($pic_4_file_size, PIC_MAX_SIZE * 1024 * 1024) > $uploaded_max_size * 1024 * 1024) {
                            $response['errors']['overall'] = $_LANGUAGE['you_exceeded_the_limit'] . ' (' . $uploaded_max_size . 'MB)';
                            $has_error = true;
                        }
                    }
                    if (!$has_error) {
                        $pic_4_name = basename($_FILES['pic_4']['name']);
                        $products_sql = "SELECT * FROM `products` WHERE `pic_4`='" . $pic_4_name . "' AND `user_id`='" . $user_id . "'";
                        if ($_POST['id']) {
                            $products_sql .= " AND `id` !='" . $_POST['id'] . "'";
                        }
                        $products_sql_result = $db_conn->query($products_sql);
                        if ($products_sql_result->num_rows) {
                            $pic_4_name = get_media_name($pic_4_name, $user_name);
                        }
                        if ($pic_4_name == TRANSPARENT_PNG_NAME) get_media_name($pic_4_name, $user_name);
                        $pic_4_path = $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $pic_4_name;
                        $uploaded_size += min($pic_4_file_size, PIC_MAX_SIZE * 1024 * 1024);
                        move_uploaded_file($_FILES['pic_4']['tmp_name'], ".." . DIRECTORY_SEPARATOR . $pic_4_path);
                        compress_image(dirname(__FILE__) . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . $pic_4_path, PIC_MAX_WIDTH, PIC_MAX_SIZE * 1024 * 1024);
                    }
                }
            } else {
                if (!$pic_4_name) {
                    $pic_4_name = TRANSPARENT_PNG_NAME;
                }
            }
            if (isset($_FILES['video_1']) && $_FILES['video_1']) {
                $mine_type = mime_content_type($_FILES['video_1']['tmp_name']);
                if (!in_array($mine_type, $video_allows)) {
                    $response['errors']['video_1'] = $_LANGUAGE['please_input_vaild_type_video'] . ' (' . join(", ", $video_allows) . ')';
                    $has_error = true;
                } else {
                    $video_1_file_size = filesize($_FILES['video_1']['tmp_name']);
                    if ($_SESSION["user"]['level'] != 'admin') {
                        if ($uploaded_size + $video_1_file_size > $uploaded_max_size * 1024 * 1024) {
                            $response['errors']['overall'] = $_LANGUAGE['you_exceeded_the_limit'] . ' (' . $uploaded_max_size . 'MB)';
                            $has_error = true;
                        }
                    }
                    if (!$has_error) {
                        $video_1_name = basename($_FILES['video_1']['name']);
                        $video_1_path = $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $video_1_name;
                        $uploaded_size += $video_1_file_size;
                        move_uploaded_file($_FILES['video_1']['tmp_name'], ".." . DIRECTORY_SEPARATOR . $video_1_path);
                    }
                }
            }
            if (isset($_FILES['video_2']) && $_FILES['video_2']) {
                $mine_type = mime_content_type($_FILES['video_2']['tmp_name']);
                if (!in_array($mine_type, $video_allows)) {
                    $response['errors']['video_2'] = $_LANGUAGE['please_input_vaild_type_video'] . ' (' . join(", ", $video_allows) . ')';
                    $has_error = true;
                } else {
                    $video_2_file_size = filesize($_FILES['video_2']['tmp_name']);
                    if ($_SESSION["user"]['level'] != 'admin') {
                        if ($uploaded_size + $video_2_file_size > $uploaded_max_size * 1024 * 1024) {
                            $response['errors']['overall'] = $_LANGUAGE['you_exceeded_the_limit'] . ' (' . $uploaded_max_size . 'MB)';
                            $has_error = true;
                        }
                    }
                    if (!$has_error) {
                        $video_2_name = basename($_FILES['video_2']['name']);
                        $video_2_path = $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $video_2_name;
                        $uploaded_size += $video_2_file_size;
                        move_uploaded_file($_FILES['video_2']['tmp_name'], ".." . DIRECTORY_SEPARATOR . $video_2_path);
                    }
                }
            }

            if (!$has_error) {
                if ($_POST['id']) {
                    $product_sql = "UPDATE `products` SET `sku_no`='" . $_POST['sku_no'] . "', `barcode`='" . $_POST['barcode'] . "'";
                    $product_sql .= ", `description_1`='" . str_replace(";", "", $_POST['description_1']) . "', `description_2`='" . str_replace(";", "", $_POST['description_2']) . "', `brand`='" . str_replace(";", "", $_POST['brand']) . "'";
                    $product_sql .= ", `brand_sku`='" . str_replace(";", "", $_POST['brand_sku']) . "', `text_1`='" . str_replace(";", "", $_POST['text_1']) . "', `text_2`='" . str_replace(";", "", $_POST['text_2']) . "', `country`='" . str_replace(";", "", $_POST['country']) . "'";
                    $product_sql .= ", `pic_1`='" . $pic_1_name . "', `pic_2`='" . $pic_2_name . "', `pic_3`='" . $pic_3_name . "', `pic_4`='" . $pic_4_name . "'";
                    $product_sql .= ", `video_1`='" . $video_1_name . "', `video_2`='" . $video_2_name . "'";
                    $product_sql .= " WHERE `id` = '" . $_POST['id'] . "'";
                    $db_conn->query($product_sql);
                } else {
                    $product_sql = "INSERT INTO `products` (`user_id`, `sku_no`, `barcode`, `description_1`, `description_2`, `brand`, `brand_sku`, `text_1`, `text_2`, `country`, `pic_1`, `pic_2`, `pic_3`, `pic_4`, `video_1`, `video_2`)";
                    $product_sql .= " VALUES ('" . $user_id . "', '" . str_replace(";", "", $_POST['sku_no']) . "', '" . str_replace(";", "", $_POST['barcode']) . "', '" . str_replace(";", "", $_POST['description_1']) . "', '" . str_replace(";", "", $_POST['description_2']) . "'";
                    $product_sql .= ", '" . str_replace(";", "", $_POST['brand']) . "', '" . str_replace(";", "", $_POST['brand_sku']) . "', '" . str_replace(";", "", $_POST['text_1']) . "', '" . str_replace(";", "", $_POST['text_2']) . "'";
                    $product_sql .= ", '" . str_replace(";", "", $_POST['country']) . "', '" . $pic_1_name . "', '" . $pic_2_name . "', '" . $pic_3_name . "', '" . $pic_4_name . "'";
                    $product_sql .= ", '" . $video_1_name . "', '" . $video_2_name . "')";
                    $db_conn->query($product_sql);
                }
                
                $response['status'] = true;
            }

            break;
        
        case 'delete-product':
            $products_sql = "SELECT `products`.`user_id`, `products`.`pic_1`, `products`.`pic_2`, `products`.`pic_3`, `products`.`pic_4`, `products`.`video_1`, `products`.`video_2`, `users`.`name` as `user_name` FROM `products` LEFT JOIN `users` ON `products`.`user_id` = `users`.`id` WHERE `products`.`id`='" . $_POST['id'] . "'";
            $products_sql_result = $db_conn->query($products_sql);
            if ($products_sql_result->num_rows) {
                $product_row = $products_sql_result->fetch_assoc();
                if ($product_row['pic_1']) {
                    if ($product_row['pic_1'] != TRANSPARENT_PNG_NAME) {
                        $pic_1_products_sql = "SELECT * FROM `products` WHERE `pic_1`='" . $product_row['pic_1'] . "' AND `id`!='" . $_POST['id'] . "' AND `user_id=`'" . $product['user_id'] . "'";
                        $pic_1_products_sql_result = $db_conn->query($pic_1_products_sql);
                        if (!$pic_1_products_sql_result->num_rows) {
                            unlink(".." . DIRECTORY_SEPARATOR . $product_row['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $product_row['pic_1']);
                        }
                    }
                }
                if ($product_row['pic_2']) {
                    if ($product_row['pic_2'] != TRANSPARENT_PNG_NAME) {
                        $pic_2_products_sql = "SELECT * FROM `products` WHERE `pic_2`='" . $product_row['pic_2'] . "' AND `id`!='" . $_POST['id'] . "' AND `user_id=`'" . $product['user_id'] . "'";
                        $pic_2_products_sql_result = $db_conn->query($pic_2_products_sql);
                        if (!$pic_2_products_sql_result->num_rows) {
                            unlink(".." . DIRECTORY_SEPARATOR . $product_row['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $product_row['pic_2']);
                        }
                    }
                }
                if ($product_row['pic_3']) {
                    if ($product_row['pic_3'] != TRANSPARENT_PNG_NAME) {
                        $pic_3_products_sql = "SELECT * FROM `products` WHERE `pic_3`='" . $product_row['pic_3'] . "' AND `id`!='" . $_POST['id'] . "' AND `user_id=`'" . $product['user_id'] . "'";
                        $pic_3_products_sql_result = $db_conn->query($pic_3_products_sql);
                        if (!$pic_3_products_sql_result->num_rows) {
                            unlink(".." . DIRECTORY_SEPARATOR . $product_row['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $product_row['pic_3']);
                        }
                    }
                }
                if ($product_row['pic_4']) {
                    if ($product_row['pic_4'] != TRANSPARENT_PNG_NAME) {
                        $pic_4_products_sql = "SELECT * FROM `products` WHERE `pic_4`='" . $product_row['pic_4'] . "' AND `id`!='" . $_POST['id'] . "' AND `user_id=`'" . $product['user_id'] . "'";
                        $pic_4_products_sql_result = $db_conn->query($pic_4_products_sql);
                        if (!$pic_4_products_sql_result->num_rows) {
                            unlink(".." . DIRECTORY_SEPARATOR . $product_row['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $product_row['pic_4']);
                        }
                    }
                }
                if ($product_row['video_1']) {
                    $video_1_products_sql = "SELECT * FROM `products` WHERE `video_1`='" . $product_row['video_1'] . "' AND `id`!='" . $_POST['id'] . "' AND `user_id=`'" . $product['user_id'] . "'";
                    $video_1_products_sql_result = $db_conn->query($video_1_products_sql);
                    if (!$video_1_products_sql_result->num_rows) {
                        unlink(".." . DIRECTORY_SEPARATOR . $product_row['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $product_row['video_1']);
                    }
                }
                if ($product_row['video_2']) {
                    $video_2_products_sql = "SELECT * FROM `products` WHERE `video_2`='" . $product_row['video_2'] . "' AND `id`!='" . $_POST['id'] . "' AND `user_id=`'" . $product['user_id'] . "'";
                    $video_2_products_sql_result = $db_conn->query($video_2_products_sql);
                    if (!$video_2_products_sql_result->num_rows) {
                        unlink(".." . DIRECTORY_SEPARATOR . $product_row['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $product_row['video_2']);
                    }
                }
            }
            $product_sql = "DELETE FROM `products` WHERE `id`='" . $_POST['id'] . "'";
            $db_conn->query($product_sql);
            $response['status'] = true;
            break;
        
        case 'import-products':
            if (isset($_FILES['import']) && $_FILES['import']) {
                $import_path = UPLOADS_PATH . DIRECTORY_SEPARATOR . basename($_FILES["import"]["name"]);
                move_uploaded_file($_FILES['import']['tmp_name'], "." . DIRECTORY_SEPARATOR . $import_path);

                $import_rows = [];
                $open = fopen("." . DIRECTORY_SEPARATOR . $import_path, "r");
                if (($import_open = fopen("." . DIRECTORY_SEPARATOR . $import_path, "r")) !== FALSE) {
                    while (($import_data = fgets($import_open)) !== false) {
                        $import_rows[] = explode(';', $import_data);
                    }
                
                    fclose($import_open);
                }
                
                $imported_products = 0;
                $user_id = $_SESSION['user']['id'];
                $user_name = $_SESSION['user']['name'];
                $product_id = 0;
                foreach ($import_rows as $import_index => $import_row) {
                    $has_error = false;
                    if (!$import_index) continue;
                    if (count($import_row) != 15) continue;

                    $sku_no = mb_substr($import_row[0], 0, 10);
                    if (!$sku_no || !preg_match("/^[0-9a-zA-Z_-]{1,10}$/i", $sku_no)) {
                        $has_error = true;
                    } else {
                        $products_sql = "SELECT * FROM `products` WHERE `sku_no`='" . $sku_no . "' AND `user_id`='" . $user_id . "'";
                        $products_sql_result = $db_conn->query($products_sql);
                        if ($products_sql_result->num_rows) {
                            $product_row = $products_sql_result->fetch_assoc();
                            $product_id = $product_row['id'];
                        }
                    }
                    
                    $barcode = mb_substr($import_row[0], 0, 30);
                    if (!$barcode || !preg_match("/^[0-9]{1,30}$/i", $barcode)) {
                        $has_error = true;
                    } else {
                        $products_sql = "SELECT * FROM `products` WHERE `barcode`='" . $barcode . "' AND `user_id`='" . $user_id . "'";
                        $products_sql_result = $db_conn->query($products_sql);
                        if ($products_sql_result->num_rows) {
                            $product_row = $products_sql_result->fetch_assoc();
                            $product_id = $product_row['id'];
                        }
                    }

                    $description_1 = mb_substr($import_row[2], 0, 30);
                    $description_2 = mb_substr($import_row[3], 0, 30);
                    $brand = mb_substr($import_row[4], 0, 30);
                    $brand_sku = mb_substr($import_row[5], 0, 30);
                    $text_1 = mb_substr($import_row[6], 0, 80);
                    $text_2 = mb_substr($import_row[7], 0, 80);
                    $country = mb_substr($import_row[8], 0, 20);
                    $pic_1 = $import_row[9];
                    if (!$pic_1) {
                        $pic_1 = TRANSPARENT_PNG_NAME;
                    } else {
                        if (!file_exists(".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $pic_1)) {
                            $pic_1 = TRANSPARENT_PNG_NAME;
                        }
                    }
                    $pic_2 = $import_row[10];
                    if (!$pic_2) {
                        $pic_2 = TRANSPARENT_PNG_NAME;
                    } else {
                        if (!file_exists(".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $pic_2)) {
                            $pic_2 = TRANSPARENT_PNG_NAME;
                        }
                    }
                    $pic_3 = $import_row[11];
                    if (!$pic_3) {
                        $pic_3 = TRANSPARENT_PNG_NAME;
                    } else {
                        if (!file_exists(".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $pic_3)) {
                            $pic_3 = TRANSPARENT_PNG_NAME;
                        }
                    }
                    $pic_4 = $import_row[12];
                    if (!$pic_4) {
                        $pic_4 = TRANSPARENT_PNG_NAME;
                    } else {
                        if (!file_exists(".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $pic_4)) {
                            $pic_4 = TRANSPARENT_PNG_NAME;
                        }
                    }
                    $video_1 = $import_row[13];
                    if (!file_exists(".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $video_1)) {
                        $video_1 = '';
                    }
                    $video_2 = $import_row[14];
                    if (!file_exists(".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $video_2)) {
                        $video_2 = '';
                    }
                    if (!$has_error) {
                        if ($product_id) {
                            $product_sql = "UPDATE `products` SET `sku_no`='" . $sku_no . "', `barcode`='" . $barcode . "'";
                            $product_sql .= ", `description_1`='" . $description_1 . "', `description_2`='" . $description_2 . "', `brand`='" . $brand . "'";
                            $product_sql .= ", `brand_sku`='" . $brand_sku . "', `text_1`='" . $text_1 . "', `text_2`='" . $text_2 . "', `country`='" . $country . "'";
                            $product_sql .= ", `pic_1`='" . $pic_1 . "', `pic_2`='" . $pic_2 . "', `pic_3`='" . $pic_3 . "', `pic_4`='" . $pic_4 . "'";
                            $product_sql .= ", `video_1`='" . $video_1 . "', `video_2`='" . $video_2 . "'";
                            $product_sql .= " WHERE `id` = '" . $product_id . "'";
                            $db_conn->query($product_sql);
                        } else {
                            $product_sql = "INSERT INTO `products` (`user_id`, `sku_no`, `barcode`, `description_1`, `description_2`, `brand`, `brand_sku`, `text_1`, `text_2`, `country`, `pic_1`, `pic_2`, `pic_3`, `pic_4`, `video_1`, `video_2`)";
                            $product_sql .= " VALUES ('" . $user_id . "', '" . $sku_no . "', '" . $barcode . "', '" . $description_1 . "', '" . $description_2 . "'";
                            $product_sql .= ", '" . $brand . "', '" . $brand_sku . "', '" . $text_1 . "', '" . $text_2 . "'";
                            $product_sql .= ", '" . $country . "', '" . $pic_1 . "', '" . $pic_2 . "', '" . $pic_3 . "', '" . $pic_4 . "'";
                            $product_sql .= ", '" . $video_1 . "', '" . $video_2 . "')";
                            $db_conn->query($product_sql);
                            $imported_products += 1;
                        }
                    }
                }
                
                $response['status'] = true;
                $response['data'] = $_LANGUAGE['successfully_imported'] . ' ' . $imported_products . $_LANGUAGE['products'];
            }
            break;
        
        case 'export-products':
            header('Content-Encoding: UTF-8');
            header('Content-Type: text/csv; charset=utf-8' );
            
            $header_args = array( $_LANGUAGE['sku_no'], $_LANGUAGE['barcode'], $_LANGUAGE['description_1'], $_LANGUAGE['description_2'], $_LANGUAGE['brand'], $_LANGUAGE['brand_sku'],
                $_LANGUAGE['text_1'], $_LANGUAGE['text_2'], $_LANGUAGE['country'], $_LANGUAGE['pic_1'], $_LANGUAGE['pic_2'], $_LANGUAGE['pic_3'], $_LANGUAGE['pic_4'], $_LANGUAGE['video_1'], $_LANGUAGE['video_2'] );

            $products = [];
            $products_sql = "SELECT `products`.`id`, `products`.`sku_no`, `products`.`barcode`, `products`.`description_1`, `products`.`description_2`, `products`.`brand`, `products`.`brand_sku`, `products`.`text_1`, `products`.`text_2`, `products`.`country`, `products`.`pic_1`, `products`.`pic_2`, `products`.`pic_3`, `products`.`pic_4`, `products`.`video_1`, `products`.`video_2`, `users`.`name` as 'user_name' FROM `products` LEFT JOIN `users` ON `products`.`user_id` = `users`.`id` WHERE `products`.`sku_no` != 'NULL' AND `products`.`sku_no` != '' AND `products`.`barcode` != 'NULL' AND `products`.`barcode` != '' AND `products`.`user_id`='" . $_SESSION['user']['id'] . "'";
            $products_sql_result = $db_conn->query($products_sql);
            if ($products_sql_result->num_rows) {
                while ($product_row = $products_sql_result->fetch_assoc()) {
                    $products[] = [str_replace(";", "", $product_row['sku_no']), str_replace(";", "", $product_row['barcode']), str_replace(";", "", $product_row['description_1']), str_replace(";", "", $product_row['description_2']),
                        str_replace(";", "", $product_row['brand']), str_replace(";", "", $product_row['brand_sku']), str_replace(";", "", $product_row['text_1']), str_replace(";", "", $product_row['text_2']), str_replace(";", "", $product_row['country']), 
                        str_replace(";", "", $product_row['pic_1']), str_replace(";", "", $product_row['pic_2']), str_replace(";", "", $product_row['pic_3']), str_replace(";", "", $product_row['pic_4']), str_replace(";", "", $product_row['video_1']), str_replace(";", "", $product_row['video_2'])];
                }
            }

            $output = fopen( ".." . DIRECTORY_SEPARATOR . $_SESSION['user']['name'] . DIRECTORY_SEPARATOR . EXPORT_PRODUCT, 'w' );

            fputs( $output, implode(';', str_replace('"', '', $header_args)) . "\n" );

            foreach( $products as $product_index => $product ) {
                fputs( $output, ($product_index ? "\n" : "") . implode(';', str_replace('"', '', $product)) );
            }

            fclose( $output );
            exit;
        
        case 'get-user':
            $user_sql = "SELECT * FROM `users` WHERE `id` ='" . $id . "'";
            $sql_result = $db_conn->query($user_sql);
            if ($sql_result->num_rows) {
                $user_row = $sql_result->fetch_assoc();
                $response['status'] = true;
                $response['data'] = [
                    'name' => $user_row['name'],
                    'email' => $user_row['email'],
                    'telephone_number' => $user_row['telephone_number'],
                    'additional_info' => $user_row['additional_info'],
                    'expiry_date' => $user_row['expiry_date'],
                    'logo' => DOMAIN_NAME . DIRECTORY_SEPARATOR . ($user_row['logo'] == TRANSPARENT_PNG_NAME ? (DOMAIN_ROOT . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_PATH . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_NAME) : (strtolower($user_row['name']) . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . LOGO_NAME)) . "?v=" . time(),
                    'level' => $user_row['level'],
                ];
            }
            break;
        
        case 'update-user':
            $user_name = '';
            $logo_path = '';
            $has_error = false;
            if ($_POST['name']) {
                if ($_POST['name'] == DOMAIN_ROOT) {
                    $response['errors']['name'] = $_LANGUAGE['name_can_not_be_same_domain_root'];
                    $has_error = true;
                } else {
                    if (!preg_match("/^[a-z]+$/i", $_POST['name'])) {
                        $response['errors']['name'] = $_LANGUAGE['please_match'] . " " . $_LANGUAGE['name'] . " (" . "/^[a-z]+$/i" . ")";
                        $has_error = true;
                    } else {
                        $user_name = str_replace("-", "", str_replace("_", "", str_replace(" ", "", strtolower($_POST['name']))));
                        $users_sql = "SELECT * FROM `users` WHERE `name`='" . $user_name . "'";
                        if ($_POST['id']) {
                            $users_sql .= " AND `id` !='" . $_POST['id'] . "'";
                        }
                        $users_sql_result = $db_conn->query($users_sql);
                        if ($users_sql_result->num_rows) {
                            $response['errors']['name'] = $_LANGUAGE['name_already_exist'];
                            $has_error = true;
                        }
                    }
                }
            } else {
                $response['errors']['name'] = $_LANGUAGE['please_input_name'];
                $has_error = true;
            }
            if (!$has_error) {
                $user_dir = ".." . DIRECTORY_SEPARATOR . $user_name;
                $user_path = realpath($user_dir);
                if ($user_path === false || !is_dir($user_path)) {
                    mkdir($user_dir);
                }
                $user_media_dir = ".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH;
                $user_media_path = realpath($user_media_dir);
                if ($user_media_path === false || !is_dir($user_media_path)) {
                    mkdir($user_media_dir);
                }
            }
            if ($_POST['email']) {
                $users_sql = "SELECT * FROM `users` WHERE `email`='" . $_POST['email'] . "'";
                if ($_POST['id']) {
                    $users_sql .= " AND `id` !='" . $_POST['id'] . "'";
                }
                $users_sql_result = $db_conn->query($users_sql);
                if ($users_sql_result->num_rows) {
                    $response['errors']['email'] = $_LANGUAGE['email_already_exist'];
                    $has_error = true;
                }
            } else {
                $response['errors']['email'] = $_LANGUAGE['please_input_email'];
                $has_error = true;
            }
            if (!$_POST['telephone_number']) {
                $response['errors']['telephone_number'] = $_LANGUAGE['please_input_telephone_number'];
                $has_error = true;
            }
            if (!$_POST['additional_info']) {
                $response['errors']['additional_info'] = $_LANGUAGE['please_input_additional_info'];
                $has_error = true;
            } else {
                if (mb_strlen($_POST['additional_info']) > 500) {
                    $response['errors']['additional_info'] = $_LANGUAGE['additional_info'] . ' ' . $_LANGUAGE['length_exceeded'];
                    $has_error = true;
                }
            }
            if (!$_POST['expiry_date']) {
                $response['errors']['expiry_date'] = $_LANGUAGE['please_input_expiry_date'];
                $has_error = true;
            }
            if (isset($_FILES['logo']) && $_FILES['logo']) {
                $mine_type = mime_content_type($_FILES['logo']['tmp_name']);
                if (!in_array($mine_type, $logo_allows)) {
                    $response['errors']['logo'] = $_LANGUAGE['please_input_vaild_type_image'] . ' (' . join(", ", $logo_allows) . ')';
                    $has_error = true;
                } else {
                    $logo_name = LOGO_NAME;
                    $logo_path = $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $logo_name;
                    move_uploaded_file($_FILES['logo']['tmp_name'], ".." . DIRECTORY_SEPARATOR . $logo_path);
                    compress_image(dirname(__FILE__) . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . $logo_path, LOGO_MAX_WIDTH, LOGO_MAX_SIZE * 1024 * 1024);
                }
            } else {
                if ($_POST['id']) {
                    $user_sql = "SELECT * FROM `users` WHERE `id` ='" . $_POST['id'] . "'";
                    $sql_result = $db_conn->query($user_sql);
                    if ($sql_result->num_rows) {
                        $user_row = $sql_result->fetch_assoc();
                        if (!$user_row['logo']) {
                            $logo_name = TRANSPARENT_PNG_NAME;
                        } else {
                            $logo_name = $user_row['logo'];
                        }
                    }
                } else {
                    $logo_name = TRANSPARENT_PNG_NAME;
                }
            }
            if (!$_POST['level']) {
                $response['errors']['level'] = $_LANGUAGE['please_input_level'];
                $has_error = true;
            }
            if ($_POST['password']) {
                if ($_POST['password'] != $_POST['password']) {
                    $response['errors']['password'] = $_LANGUAGE['does_not_match_password'];
                    $has_error = true;
                }
                if (!$has_error) {
                    if (!preg_match("/^[0-9a-zA-Z@]+$/i", $_POST['password'])) {
                        $response['errors']['password'] = $_LANGUAGE['please_match'] . " " . $_LANGUAGE['password'] . " (" . "/^[0-9a-zA-Z@]+$/i" . ")";
                        $has_error = true;
                    } else {
                    }
                }
            }
            if (!$has_error) {
                if ($_POST['id']) {
                    $user_sql = "UPDATE `users` SET `name`='" . $user_name . "', `email`='" . $_POST['email'] . "', `telephone_number`='" . $_POST['telephone_number'] . "', `additional_info`='" . $_POST['additional_info'] . "', `expiry_date`='" . $_POST['expiry_date'] . "', `logo`='" . $logo_name . "', `level`='" . $_POST['level'] . "'";
                    if ($_POST['password']) {
                        $user_sql .= ", `password` = '" . md5($_POST['password']) . "'";
                    }
                    $user_sql .= " WHERE `id` = '" . $_POST['id'] . "'";
                    $db_conn->query($user_sql);
                } else {
                    $user_sql = "INSERT INTO `users` (`name`, `email`, `telephone_number`, `additional_info`, `expiry_date`, `logo`, `level`, `password`) VALUES ('" . $user_name . "', '" . $_POST['email'] . "', '" . $_POST['telephone_number'] . "', '" . $_POST['additional_info'] . "', '" . $_POST['expiry_date'] . "', '" . $logo_name . "', '" . $_POST['level'] . "', '" . md5($_POST['password']) . "')";
                    $db_conn->query($user_sql);
                }
                
                $response['status'] = true;
            }
            break;
        
        case 'delete-user':
            $user_sql = "SELECT * FROM `users` WHERE `id` ='" . $_POST['id'] . "'";
            $sql_result = $db_conn->query($user_sql);
            if ($sql_result->num_rows) {
                $user_row = $sql_result->fetch_assoc();
                rrmdir(".." . DIRECTORY_SEPARATOR . $user_row['name']);
            }
            $user_sql = "DELETE FROM `users` WHERE `id`='" . $_POST['id'] . "'";
            $db_conn->query($user_sql);
            $response['status'] = true;
            break;
        
        case 'import-users':
            if (isset($_FILES['import']) && $_FILES['import']) {
                $import_path = UPLOADS_PATH . DIRECTORY_SEPARATOR . basename($_FILES["import"]["name"]);
                move_uploaded_file($_FILES['import']['tmp_name'], "." . DIRECTORY_SEPARATOR . $import_path);

                $import_rows = [];
                $open = fopen("." . DIRECTORY_SEPARATOR . $import_path, "r");
                if (($import_open = fopen("." . DIRECTORY_SEPARATOR . $import_path, "r")) !== FALSE) {
                    while (($import_data = fgets($import_open)) !== false) {
                        $import_rows[] = explode(';', $import_data);
                    }
                
                    fclose($import_open);
                }
                
                $imported_users = 0;
                foreach ($import_rows as $import_index => $import_row) {
                    $has_error = false;
                    if (!$import_index) continue;

                    $name = mb_substr($import_row[0], 0, 255);
                    if ($name) {
                        $user_name = str_replace("-", "", str_replace("_", "", str_replace(" ", "", $name)));
                        $users_sql = "SELECT * FROM `users` WHERE `name`='" . $name . "'";
                        $users_sql_result = $db_conn->query($users_sql);
                        if ($users_sql_result->num_rows) {
                            $has_error = true;
                        }
                    } else {
                        $has_error = true;
                    }
                    
                    $email = mb_substr($import_row[1], 0, 255);
                    if ($email) {
                        $users_sql = "SELECT * FROM `users` WHERE `email`='" . $email . "'";
                        $users_sql_result = $db_conn->query($users_sql);
                        if ($users_sql_result->num_rows) {
                            $has_error = true;
                        }
                    } else {
                        $has_error = true;
                    }
                    
                    if (!$has_error) {
                        $user_dir = ".." . DIRECTORY_SEPARATOR . $user_name;
                        $user_path = realpath($user_dir);
                        if ($user_path === false || !is_dir($user_path)) {
                            mkdir($user_dir);
                        }
                        $user_media_dir = ".." . DIRECTORY_SEPARATOR . $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH;
                        $user_media_path = realpath($user_media_dir);
                        if ($user_media_path === false || !is_dir($user_media_path)) {
                            mkdir($user_media_dir);
                        }
                    }

                    $telephone_number = mb_substr($import_row[2], 0, 255);
                    $additional_info = mb_substr($import_row[3], 0, 500);
                    $expiry_date = $import_row[4];
                    if (!$expiry_date) {
                        $has_error = true;
                    }
                    $logo = $import_row[5];
                    if (!$logo) {
                        $logo = TRANSPARENT_PNG_NAME;
                    }
                    $level = $import_row[6];
                    if (!$level || ($level != 'star1' && $level != 'star2' && $level != 'star3' && $level != 'star4' && $level != 'star5' && $level != 'admin')) {
                        $level = 'star1';
                    }
                    if (!$has_error) {
                        $user_sql = "INSERT INTO `users` (`name`, `email`, `telephone_number`, `additional_info`, `expiry_date`, `logo`, `level`) VALUES ('" . 
                            $name . "', '" . $email . "', '" . $telephone_number . "', '" . $additional_info . "', '" . $expiry_date . "', '" . $logo . "', '" . $level . "')";
                        $db_conn->query($user_sql);
                    }
                }
                
                $response['status'] = true;
                $response['data'] = $_LANGUAGE['successfully_imported'] . ' ' . $imported_users . $_LANGUAGE['users'];
            }
            break;
        
        case 'export-users':
            ob_start();

            header('Content-Encoding: UTF-8');
            header('Content-Type: text/csv; charset=utf-8' );
            header('Content-Disposition: attachment; filename=users_export.csv');

            $header_args = array( $_LANGUAGE['name'], $_LANGUAGE['email'], $_LANGUAGE['telephone_number'], $_LANGUAGE['additional_info'], $_LANGUAGE['expiry_date'],
                $_LANGUAGE['logo'], $_LANGUAGE['level'] );
                
            $users = [];
            $users_sql = "SELECT * FROM `users`";
            $users_sql_result = $db_conn->query($users_sql);
            if ($users_sql_result->num_rows) {
                while ($user_row = $users_sql_result->fetch_assoc()) {
                    $users[] = [str_replace(";", "", $user_row['name']), str_replace(";", "", $user_row['email']), str_replace(";", "", $user_row['telephone_number']), str_replace(";", "", $user_row['additional_info']),
                        str_replace(";", "", $user_row['expiry_date']), str_replace(";", "", $user_row['logo']), str_replace(";", "", $user_row['level'])];
                }
            }

            ob_end_clean();

            $output = fopen( 'php://output', 'w' );

            fputs( $output, implode(';', str_replace('"', '', $header_args)) ."\n" );

            foreach( $users as $user_index => $user ) {
                fputs( $output, ($user_index ? "\n" : "") . implode(';', str_replace('"', '', $user)) );
            }

            fclose( $output );
            exit;

        default:
            break;
    }
}

echo json_encode($response);
exit;