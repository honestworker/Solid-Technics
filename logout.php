<?php

include './includes/init.php';

session_destroy();
header('Location: '. DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT . DIRECTORY_SEPARATOR);

exit();