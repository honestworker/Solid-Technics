<?php include './includes/init.php'; ?>

<?php $page_title = $_LANGUAGE['install']; ?>

<?php include './includes/header.php'; ?>

<?php
    $error_msg = '';
    if (isset($_POST['db_host']) && isset($_POST['db_name']) && isset($_POST['db_user'])) {
        set_env('DB_HOST', $_POST['db_host']);
        set_env('DB_NAME', $_POST['db_name']);
        set_env('DB_USER', $_POST['db_user']);
        set_env('DB_PASSWORD', $_POST['db_password']);
        set_env('SITE_NAME', isset($_POST['site_name']) ? $_POST['site_name'] : '');

        $db_conn = new mysqli($_POST['db_host'], $_POST['db_user'], $_POST['db_password'], $_POST['db_name']);
        if ($db_conn->connect_error) {
            $error_msg = 'Database Information is incorrect!';
        } else {
            $db_conn->query("SET NAMES utf8;");
            $db_conn->query("SET time_zone = '+00:00';");
            $db_conn->query("SET foreign_key_checks = 0;");
            $db_conn->query("SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';");

            $db_conn->query("DROP TABLE IF EXISTS `products`;");
            $db_conn->query("CREATE TABLE `products` ("
            . "    `id` int(11) NOT NULL AUTO_INCREMENT,"
            . "    `user_id` int(10) unsigned NOT NULL,"
            . "    `sku_no` varchar(10) NOT NULL,"
            . "    `barcode` varchar(30) NOT NULL,"
            . "    `description_1` varchar(90) DEFAULT NULL,"
            . "    `description_2` varchar(90) DEFAULT NULL,"
            . "    `brand` varchar(90) DEFAULT NULL,"
            . "    `brand_sku` varchar(90) DEFAULT NULL,"
            . "    `text_1` varchar(240) DEFAULT NULL,"
            . "    `text_2` varchar(240) DEFAULT NULL,"
            . "    `country` varchar(60) DEFAULT NULL,"
            . "    `pic_1` varchar(1023) DEFAULT NULL,"
            . "    `pic_2` varchar(1023) DEFAULT NULL,"
            . "    `pic_3` varchar(1023) DEFAULT NULL,"
            . "    `pic_4` varchar(1023) DEFAULT NULL,"
            . "    `video_1` varchar(1023) DEFAULT NULL,"
            . "    `video_2` varchar(1023) DEFAULT NULL,"
            . "    `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',"
            . "    `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,"
            . "    PRIMARY KEY (`id`),"
            . "    KEY `user_id` (`user_id`),"
            . "    CONSTRAINT `products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE"
            . ") ENGINE=InnoDB DEFAULT CHARSET=utf8;");

            $db_conn->query("DROP TABLE IF EXISTS `users`;");
            $db_conn->query("CREATE TABLE `users` ("
            . "    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,"
            . "    `name` varchar(255) NOT NULL,"
            . "    `email` varchar(255) NOT NULL,"
            . "    `telephone_number` varchar(255) NOT NULL,"
            . "    `password` varchar(511) NOT NULL,"
            . "    `additional_info` varchar(500) NOT NULL,"
            . "    `expiry_date` date NOT NULL,"
            . "    `logo` varchar(1023) NOT NULL,"
            . "    `level` enum('star1','star2','star3','star4','star5','admin') NOT NULL,"
            . "    `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',"
            . "    `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,"
            . "    PRIMARY KEY (`id`)"
            . ") ENGINE=InnoDB DEFAULT CHARSET=utf8;");
            
            $db_conn->query("INSERT INTO `users` (`id`, `name`, `email`, `password`, `additional_info`, `expiry_date`, `logo`, `level`, `created_at`, `updated_at`) VALUES "
            . "(1,	'admin',	'admin@admin.com',	'5f4dcc3b5aa765d61d8327deb882cf99',	'',	'',	'" . TRANSPARENT_PNG_NAME . "',	'admin', '" . date("Y-m-d") . "',	'0000-00-00 00:00:00');");

            $admin_dir = ".." . DIRECTORY_SEPARATOR . 'admin';
            $admin_path = realpath($admin_dir);
            if ($admin_path === false || !is_dir($admin_path)) {
                mkdir($admin_dir);
            }
            $admin_media_dir = ".." . DIRECTORY_SEPARATOR . 'admin' . DIRECTORY_SEPARATOR . MEDIA_PATH;
            $admin_media_path = realpath($admin_media_dir);
            if ($admin_media_path === false || !is_dir($admin_media_path)) {
                mkdir($admin_media_dir);
            }
            
            set_env('APP_INSTALLED', true);

            echo("<script>location.href = '" . DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT . DIRECTORY_SEPARATOR . 'login.php' . "';</script>");
            die;
        }
    }
?>

<div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner">
            <div class="card">
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

                    <?php if ($error_msg) { ?>
                        <div class="card bg-danger text-white mb-3">
                            <div class="card-body">
                                <p class="card-text"><?php echo $_LANGUAGE['please_insert_the_correct_database_information'] ?></p>
                            </div>
                        </div>
                    <?php } ?>

                    <form id="formInstall" class="mb-3" action="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT ?>/install.php" method="POST">
                        <div class="mb-3">
                            <label for="db_host" class="form-label"><?php echo $_LANGUAGE['database_host'] ?></label>
                            <input
                                type="text"
                                class="form-control"
                                id="db_host"
                                name="db_host"
                                placeholder="<?php echo $_LANGUAGE['enter_your_database_host'] ?>"
                                value="<?php echo get_env('DB_HOST') ?>"
                                required
                                autofocus
                            />
                        </div>
                        <div class="mb-3">
                            <label for="db_name" class="form-label"><?php echo $_LANGUAGE['database_name'] ?></label>
                            <input
                                type="text"
                                class="form-control"
                                id="db_name"
                                name="db_name"
                                placeholder="<?php echo $_LANGUAGE['enter_your_database_name'] ?>"
                                value="<?php echo get_env('DB_NAME') ?>"
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <label for="db_user" class="form-label"><?php echo $_LANGUAGE['database_user'] ?></label>
                            <input
                                type="text"
                                class="form-control"
                                id="db_user"
                                name="db_user"
                                placeholder="<?php echo $_LANGUAGE['enter_your_database_user'] ?>"
                                value="<?php echo get_env('DB_USER') ?>"
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <label for="db_password" class="form-label"><?php echo $_LANGUAGE['database_password'] ?></label>
                            <input
                                type="password"
                                id="db_password"
                                class="form-control"
                                name="db_password"
                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                value="<?php echo get_env('DB_PASSWORD') ?>"
                                aria-describedby="password"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="site_name" class="form-label"><?php echo $_LANGUAGE['site_name'] ?></label>
                            <input
                                type="text"
                                class="form-control"
                                id="site_name"
                                name="site_name"
                                placeholder="<?php echo $_LANGUAGE['enter_your_site_name'] ?>"
                                value="<?php echo get_env('SITE_NAME') ?>"
                                autofocus
                            />
                        </div>
                        <div class="mb-3">
                            <button class="btn btn-primary d-grid w-100" type="submit"><?php echo $_LANGUAGE['install'] ?></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include './includes/footer.php'; ?>