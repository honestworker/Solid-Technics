<?php include './includes/init.php'; ?>

<?php $page_title = $_LANGUAGE['login']; ?>

<?php include './includes/header.php'; ?>

<?php
    $errors = [];
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!$_POST['name']) {
            $errors['name'] = $_LANGUAGE['please_input_name'];
        }
        if (!$_POST['password']) {
            $errors['password'] = $_LANGUAGE['please_input_password'];
        }
        if (!$has_error) {
            $user_sql = "SELECT * FROM `users` WHERE (`name`='" . $_POST['name'] . "' OR `email`='" . $_POST['name'] . "') AND `password`='" . md5($_POST['password']) . "';";
            $sql_result = $db_conn->query($user_sql);
            if ($sql_result->num_rows) {
                $user_row = $sql_result->fetch_assoc();
                $_SESSION['user'] = [
                    'id' => $user_row['id'],
                    'name' => $user_row['name'],
                    'email' => $user_row['email'],
                    'level' => $user_row['level'],
                    'logo' => $user_row['name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . LOGO_NAME
                ];

                echo("<script>location.href = '" . DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT . DIRECTORY_SEPARATOR . "';</script>");
                die;
            } else {
                $user_sql = "SELECT * FROM `users` WHERE `name`='" . $_POST['name'] . "' OR `email`='" . $_POST['name'] . "';";
                $sql_result = $db_conn->query($user_sql);
                if ($sql_result->num_rows) {
                    $errors['password'] = $_LANGUAGE['credential_is_incorrect'];
                } else {
                    $errors['name'] = $_LANGUAGE['name_does_not_exist'];
                }
            }
        }
    }
?>

<div class="row justify-content-center">
    <div class="col-xl-4 col-lg-5 col-md-6">
        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body">
                <!-- Logo -->
                <div class="app-brand justify-content-center">
                    <a href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT ?>" class="app-brand-link gap-2">
                        <span class="app-brand-logo demo">
                            <img src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT ?>/assets/img/logo/logo.png" />
                        </span>
                    </a>
                </div>
                <!-- /Logo -->
                <p class="mb-4"><?php echo $_LANGUAGE['please_sign_in_to_your_account'] ?></p>

                <form id="formAuthentication" class="mb-3" action="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT ?>/login.php" method="POST">
                    <div class="mb-3">
                        <label for="name" class="form-label"><?php echo $_LANGUAGE['email_or_username'] ?></label>
                        <input
                            type="text"
                            class="form-control"
                            id="name"
                            name="name"
                            placeholder="<?php echo $_LANGUAGE['enter_your_email_or_username'] ?>"
                            autofocus
                        />
                        <?php if (isset($errors['name'])) { ?>
                            <p class="text-danger small"><?php echo $errors['name'] ?></p>
                        <?php } ?>
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label"><?php echo $_LANGUAGE['password'] ?></label>
                        <input
                            type="password"
                            id="password"
                            class="form-control"
                            name="password"
                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                            aria-describedby="password"
                        />
                        <?php if (isset($errors['password'])) { ?>
                            <p class="text-danger small"><?php echo $errors['password'] ?></p>
                        <?php } ?>
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary d-grid w-100" type="submit"><?php echo $_LANGUAGE['login'] ?></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include './includes/footer.php'; ?>