<?php include './includes/init.php'; ?>

<?php $page_title = $_LANGUAGE['profile']; ?>

<?php include './includes/header.php'; ?>

<?php
    if (isset($_POST['id'])) {
        $user_name = '';
        $logo_path = '';
        $errors = [];
        $has_error = false;
        if ($_POST['name']) {
            $user_name = str_replace("-", "", str_replace("_", "", str_replace(" ", "", strtolower($_POST['name']))));
            $users_sql = "SELECT * FROM `users` WHERE `name`='" . $user_name . "'";
            if ($_POST['id']) {
                $users_sql .= " AND `id` !='" . $_POST['id'] . "'";
            }
            $users_sql_result = $db_conn->query($users_sql);
            if ($users_sql_result->num_rows) {
                $errors['name'] = $_LANGUAGE['name_already_exist'];
                $has_error = true;
            }
        } else {
            $errors['name'] = $_LANGUAGE['please_input_name'];
            $has_error = true;
        }
        if ($_POST['email']) {
            $users_sql = "SELECT * FROM `users` WHERE `email`='" . $_POST['email'] . "'";
            if ($_POST['id']) {
                $users_sql .= " AND `id` !='" . $_POST['id'] . "'";
            }
            $users_sql_result = $db_conn->query($users_sql);
            if ($users_sql_result->num_rows) {
                $errors['email'] = $_LANGUAGE['email_already_exist'];
                $has_error = true;
            }
        } else {
            $errors['email'] = $_LANGUAGE['please_input_email'];
            $has_error = true;
        }
        if (!$_POST['telephone_number']) {
            $errors['telephone_number'] = $_LANGUAGE['please_input_telephone_number'];
            $has_error = true;
        }
        if (!$_POST['additional_info']) {
            $errors['additional_info'] = $_LANGUAGE['please_input_additional_info'];
            $has_error = true;
        }
        if (!$_POST['expiry_date']) {
            $errors['expiry_date'] = $_LANGUAGE['please_input_expiry_date'];
            $has_error = true;
        }
        if (isset($_FILES['logo']) && $_FILES['logo']) {
            $logo_path = $user_name . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . LOGO_NAME;
            move_uploaded_file($_FILES['logo']['tmp_name'], ".." . DIRECTORY_SEPARATOR . $logo_path);
            compress_image(dirname(__FILE__) . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . $logo_path, LOGO_MAX_WIDTH, LOGO_MAX_SIZE * 1024 * 1024);
        } else {
            $user_sql = "SELECT * FROM `users` WHERE `id` ='" . $_POST['id'] . "'";
            $sql_result = $db_conn->query($user_sql);
            if ($sql_result->num_rows) {
                $user_row = $sql_result->fetch_assoc();
                if (!$user_row['logo']) {
                    $logo_path = TRANSPARENT_PNG_NAME;
                } else {
                    $logo_path = $user_row['logo'];
                }
            }
        }
        if (!$_POST['information']) {
            $errors['information'] = $_LANGUAGE['please_input_information'];
            $has_error = true;
        }
        if ($_POST['password']) {
            if ($_POST['password'] != $_POST['password']) {
                $errors['password'] = $_LANGUAGE['does_not_match_password'];
                $has_error = true;
            }
        }
        if (!$has_error) {
            $user_sql = "UPDATE `users` SET `name`='" . $user_name . "', `email`='" . $_POST['email'] . "', `telephone_number`='" . $_POST['telephone_number'] . "', `additional_info`='" . $_POST['additional_info'] . "', `expiry_date`='" . $_POST['expiry_date'] . "', `logo`='" . $logo_path . "',";
            $user_sql .= " `information`='" . $_POST['information'] . "'";
            if ($_POST['password']) {
                $user_sql .= ", `password` = '" . md5($_POST['password']) . "'";
            }
            $user_sql .= " WHERE `id` = '" . $_POST['id'] . "'";
            $db_conn->query($user_sql);
            
            $response['status'] = true;
        }
    }

    $user_sql = "SELECT * FROM `users` WHERE `id`='" . $_SESSION['user']['id'] . "';";
    $sql_result = $db_conn->query($user_sql);
    if ($sql_result->num_rows) {
        $user_row = $sql_result->fetch_assoc();
    }
?>

<form autocomplete="off" role="form" method="post" enctype="multipart/form-data">
    <input readonly="" name="id" type="hidden" value="<?php echo $user_row['id'] ?>" />

    <div class="form-group mb-3 name">
        <label for="name" class="form-label"><?php echo $_LANGUAGE['name'] ?></label>
        <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            placeholder="^[a-z]+$"
            pattern="^[a-z]+$"
            autocomplete="false"
            value="<?php echo $user_row['name'] ?>"
            required
            autofocus
        />
        <?php if (isset($errors['name'])) { ?>
            <p class="text-danger small"><?php echo $errors['name'] ?></p>
        <?php } ?>
    </div>
    <div class="form-group mb-3 email">
        <label for="email" class="form-label"><?php echo $_LANGUAGE['email'] ?></label>
        <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            value="<?php echo $user_row['email'] ?>"
            placeholder="<?php echo $_LANGUAGE['enter_your_email'] ?>"
            autocomplete="false"
            required
        />
        <?php if (isset($errors['email'])) { ?>
            <p class="text-danger small"><?php echo $errors['email'] ?></p>
        <?php } ?>
    </div>
    <div class="form-group mb-3 telephone_number">
        <label for="telephone_number" class="form-label"><?php echo $_LANGUAGE['telephone_number'] ?></label>
        <input
            type="text"
            class="form-control"
            id="telephone_number"
            name="telephone_number"
            value="<?php echo $user_row['telephone_number'] ?>"
            placeholder="<?php echo $_LANGUAGE['enter_your_telephone_number'] ?>"
            required
        />
        <?php if (isset($errors['telephone_number'])) { ?>
            <p class="text-danger small"><?php echo $errors['telephone_number'] ?></p>
        <?php } ?>
    </div>
    <div class="form-group mb-3 additional_info">
        <label for="additional_info" class="form-label"><?php echo $_LANGUAGE['additional_info'] ?></label>
        <textarea
            class="form-control"
            id="additional_info"
            name="additional_info"
            value="<?php echo $user_row['additional_info'] ?>"
            placeholder="<?php echo $_LANGUAGE['additional_info'] ?>"
            required
        ><?php echo $user_row['additional_info'] ?></textarea>
        <?php if (isset($errors['telephone_number'])) { ?>
            <p class="text-danger small"><?php echo $errors['additional_info'] ?></p>
        <?php } ?>
    </div>
    <div class="form-group mb-3 expiry_date">
        <label for="expiry_date" class="form-label"><?php echo $_LANGUAGE['expiry_date'] ?></label>
        <input
            type="date"
            class="form-control"
            id="expiry_date"
            name="expiry_date"
            value="<?php echo $user_row['expiry_date'] ?>"
            required
        />
        <?php if (isset($errors['expiry_date'])) { ?>
            <p class="text-danger small"><?php echo $errors['expiry_date'] ?></p>
        <?php } ?>
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
            <img class="w-300-p mt-2" src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . strtolower($user_row['name']) . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . LOGO_NAME ?>" accept="image/png, image/jpg, image/jpeg" />
        <?php } ?>
        <?php if (isset($errors['logo'])) { ?>
            <p class="text-danger small"><?php echo $errors['logo'] ?></p>
        <?php } ?>
    </div>
    <div class="form-group mb-3 information">
        <label for="information" class="form-label"><?php echo $_LANGUAGE['information'] ?></label>
        <textarea
            class="form-control"
            id="information"
            name="information"
            placeholder="<?php echo $_LANGUAGE['information'] ?>"
            required
        ><?php echo $user_row['information'] ?></textarea>
        <?php if (isset($errors['information'])) { ?>
            <p class="text-danger small"><?php echo $errors['information'] ?></p>
        <?php } ?>
    </div>
    <div class="form-group mb-3 password">
        <label for="password" class="form-label"><?php echo $_LANGUAGE['password'] ?></label>
        <input
            type="password"
            id="password"
            class="form-control"
            name="password"
            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
            aria-describedby="password"
            pattern="[a-zA-Z@]+"
            match="confirm_password"
            autocomplete="false"
        />
        <?php if (isset($errors['password'])) { ?>
            <p class="text-danger small"><?php echo $errors['password'] ?></p>
        <?php } ?>
    </div>
    <div class="form-group mb-3 confirm_password">
        <label for="confirm_password" class="form-label"><?php echo $_LANGUAGE['confirm_password'] ?></label>
        <input
            type="password"
            id="confirm_password"
            class="form-control"
            name="confirm_password"
            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
            aria-describedby="confirm_password"
            pattern="[a-zA-Z@]+"
        />
        <?php if (isset($errors['confirm_password'])) { ?>
            <p class="text-danger small"><?php echo $errors['confirm_password'] ?></p>
        <?php } ?>
    </div>
    <div class="mb-3">
        <button class="btn btn-primary d-grid w-100" type="submit"><?php echo $_LANGUAGE['update'] ?></button>
    </div>
</form>

<?php include './includes/footer.php'; ?>