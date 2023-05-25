<!DOCTYPE html>

<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title><?php echo !empty($page_title) ? $page_title : ''; ?> | <?php echo SITE_NAME; ?></title>

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/img/favicon/favicon.png" />

    <link rel="stylesheet" href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/css/bootstrap-icons.min.css">
    <link rel="stylesheet" href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/css/flag-icon.min.css">
    <link rel="stylesheet" href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/css/bundle.min.css">
    <link rel="stylesheet" href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/css/colors.css">
    <link rel="stylesheet" href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/css/spectrum.min.css">
    <link rel="stylesheet" href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/css/colors-12.css">
    <link rel="stylesheet" href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/icon-captcha/css/icon-captcha.min.css">
    <link rel="stylesheet" href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/css/style.css?v=<?php echo time(); ?>">

    <script type="text/javascript">
        /* <![CDATA[ */
        var PMmodals = '{"zoomview":{"baselink":"download\/","script_url":"https:\/\/veno.es\/filemanager\/","directlink":false}}';
        var PMvars = '{}';
        /* ]]> */
    </script>
    <script type="text/javascript" src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/js/jquery-3.6.1.min.js"></script>
</head>

<body id="page-top" class="pm-body d-flex flex-column justify-content-between min-vh-100 inlinethumbs unlogged pt-5 header-below">
    <div class="position-absolute w-100 h-100 start-0 top-0 botom-0 d-flex flex-sm-column align-items-center justify-content-center page-spinner">
        <div class="spinner-message"></div>
        <div class="spinner-border" role="status"></div>
    </div>
    <nav class="navbar bg-dark navbar-expand-lg shadow fixed-top">
        <div class="container">
            <a class="navbar-brand" href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>">
                <img src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/img/logo/logo.png" class="" />
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-pm-menu" aria-controls="collapse-pm-menu" aria-expanded="false" aria-label="Toggle navigation">
                <i class="bi bi-list"></i>
            </button>
            <div class="collapse navbar-collapse" id="collapse-pm-menu">
                <ul class="navbar-nav ms-auto" data-level="<?php echo (isset($_SESSION["user"]) ? $_SESSION["user"]['level'] : ''); ?>">
                    <?php if (isset($_SESSION["user"]) && $_SESSION["user"]['logo']) { ?>
                        <li class="nav-item">
                            <img src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . $_SESSION["user"]['logo']; ?>?v=<?php echo time(); ?>" class="" />
                        </li>
                    <?php } ?>
                    <?php if (isset($_SESSION["user"]) && $_SESSION["user"]['level'] == 'admin') { ?>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/users.php">
                                <?php echo $_LANGUAGE['users']; ?>
                            </a>
                        </li>
                    <?php } ?>
                    <?php if (isset($_SESSION["user"])) { ?>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>">
                                <?php echo $_LANGUAGE['products']; ?>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link btn-import-product" role="button">
                                <?php echo $_LANGUAGE['import']; ?>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link btn-export-product" role="button">
                                <?php echo $_LANGUAGE['export_to_app']; ?>
                            </a>
                        </li>
                    <?php } ?>
                    <?php if (isset($_SESSION["user"])) { ?>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT ?>/profile.php">
                                <?php echo $_LANGUAGE['profile']; ?>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT ?>/logout.php">
                                <i class="bi bi-box-arrow-right"></i>
                                <?php echo $_LANGUAGE['logout']; ?>
                            </a>
                        </li>
                    <?php } else { ?>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT ?>/login.php">
                                <i class="bi bi-box-arrow-left"></i>
                                <?php echo $_LANGUAGE['login']; ?>
                            </a>
                        </li>
                    <?php } ?>
                    <li class="dropdown nav-item">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" role="button" aria-expanded="true">
                            <i class="flag-icon flag-icon-<?php echo lang_to_country($lang); ?>"></i>
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end lang-menu" data-bs-popper="none">
                            <?php foreach ($langs as $lang_item) { ?>
                                <li><a class="dropdown-item btn-change-lang <?php if ($lang == $lang_item) { echo 'active'; } ?>" data-lang="<?php echo $lang_item; ?>" role="button"><i class="flag-icon flag-icon-<?php echo lang_to_country($lang_item); ?>"></i></a></li>
                            <?php } ?>
                        </ul>
                    </li>
                </ul>
            </div>
            <form class="import-product-form" role="form" method="post" enctype="multipart/form-data" style="display: none;">
                <input type="file" name="import" />
                <button type="submit"></button>
            </form>
        </div>
    </nav>
    <div class="mb-auto pt-3">
        <div class="main-content row">
            <section class="col-12 my-5">