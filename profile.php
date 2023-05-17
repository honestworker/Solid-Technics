<?php include './includes/init.php'; ?>

<?php $page_title = $_LANGUAGE['profile']; ?>

<?php include './includes/header.php'; ?>

<?php
    if (isset($_POST['id'])) {
        $user_name = $_SESSION['user']['name'];
        $logo_path = '';
        $errors = [];
        $has_error = false;
        if (isset($_FILES['logo']) && $_FILES['logo']) {
            $logo_name = LOGO_NAME;
            $logo_path = $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $logo_name;
            move_uploaded_file($_FILES['logo']['tmp_name'], ".." . DIRECTORY_SEPARATOR . $logo_path);
            compress_image(dirname(__FILE__) . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . $logo_path, LOGO_MAX_WIDTH, LOGO_MAX_SIZE * 1024 * 1024);
        } else {
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
        }
        if (!$has_error) {
            $user_sql = "UPDATE `users` SET `logo`='" . $logo_name . "' WHERE `id` = '" . $_POST['id'] . "'";
            $db_conn->query($user_sql);
            
            $response['status'] = true;
        }
    }

    $user_sql = "SELECT * FROM `users` WHERE `id`='" . $_SESSION['user']['id'] . "';";
    $sql_result = $db_conn->query($user_sql);
    if ($sql_result->num_rows) {
        $user_row = $sql_result->fetch_assoc();
        
        $uploaded_percent = 0;
        $uploaded_max_size = '-';
        if ($user_row['level'] == 'star1') {
            $uploaded_max_size = STAR1_LIMIT;
        } else if ($user_row['level'] == 'star2') {
            $uploaded_max_size = STAR2_LIMIT;
        }  else if ($user_row['level'] == 'star3') {
            $uploaded_max_size = STAR3_LIMIT;
        }  else if ($user_row['level'] == 'star4') {
            $uploaded_max_size = STAR4_LIMIT;
        }  else if ($user_row['level'] == 'star5') {
            $uploaded_max_size = STAR5_LIMIT;
        }        
        
        $uploaded_size = 0;
        $media_files = scandir("../" . $user_row['name'] . DIRECTORY_SEPARATOR . MEDIA_PATH);
        foreach ($media_files as $media_file) {
            if ($media_file != '.' && $media_file != '..' && $media_file != EXPORT_PRODUCT && $media_file != LOGO_NAME) {
                $uploaded_size += filesize(".." . DIRECTORY_SEPARATOR . $user_row['name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $media_file);
            }
        }
        if ($user_row['level'] != 'admin') {
            $uploaded_percent = number_format($uploaded_size / $uploaded_max_size / 1024 / 1024 * 100, 2);
        }
    }
?>

<div class="container">
    <form autocomplete="off" role="form" method="post" enctype="multipart/form-data">
        <input readonly="" name="id" type="hidden" value="<?php echo $user_row['id'] ?>" />

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group mb-3 name">
                    <label for="logo" class="form-label"><?php echo $_LANGUAGE['name'] ?></label>
                    <p class="form-control" id="name"><?php echo $user_row['name'] ?></p>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group mb-3 email">
                    <label for="logo" class="form-label"><?php echo $_LANGUAGE['email'] ?></label>
                    <p class="form-control" id="email"><?php echo $user_row['email'] ?></p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group mb-3 level">
                    <label for="logo" class="form-label"><?php echo $_LANGUAGE['level'] ?></label>
                    <p class="form-control" id="level"><?php echo $_LANGUAGE[$user_row['level']] ?></p>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group mb-3 consumption">
                    <label for="logo" class="form-label"><?php echo $_LANGUAGE['consumption'] ?></label>
                    <p class="form-control" id="consumption"><?php echo format_size($uploaded_size, 'MB') ?><?php if ($user_row['level'] != 'admin') { echo ', ' . $uploaded_percent . '% ' . $_LANGUAGE['used'] . ", " . $_LANGUAGE['max_size'] . ' ' . $uploaded_max_size . ' MB'; } ?></p>
                </div>
            </div>
        </div>
        <div class="form-group mb-3 logo">
            <label for="logo" class="form-label"><?php echo $_LANGUAGE['logo'] ?></label>
            <input
                type="file"
                class="form-control"
                id="logo"
                name="logo"
            />
            <?php if ($user_row['logo']) { ?>
                <img class="w-300-p mt-2" src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . strtolower($user_row['name']) . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . LOGO_NAME ?>?v=<?php echo time() ?>" accept="image/png, image/jpg, image/jpeg" />
            <?php } ?>
            <?php if (isset($errors['logo'])) { ?>
                <p class="text-danger small"><?php echo $errors['logo'] ?></p>
            <?php } ?>
        </div>
        <div class="mb-3">
            <button class="btn btn-primary d-grid w-100" type="submit"><?php echo $_LANGUAGE['update'] ?></button>
        </div>
    </form>
</div>

<?php include './includes/footer.php'; ?>