<?php include './includes/init.php'; ?>

<?php
    if (!isset($_SESSION['user']) || $_SESSION['user']['level'] != 'admin') {
        echo("<script>location.href = '" . DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT . DIRECTORY_SEPARATOR . "';</script>");
        die;
    }
?>

<?php $page_title = $_LANGUAGE['users']; ?>

<?php include './includes/header.php'; ?>

<?php
    $users_sql = "SELECT * FROM `users`";
    $users_sql_result = $db_conn->query($users_sql);
?>

<div class="row">
    <div class="col-sm-12">
        <button class="btn btn-primary float-end btn-add-user">
            <i class="bi bi-plus"></i> <?php echo $_LANGUAGE['add_user'] ?></button>
        <button class="btn btn-info float-end btn-import-user">
            <i class="bi bi-upload"></i> <?php echo $_LANGUAGE['import'] ?></button>
        <button class="btn btn-success float-end btn-export-user">
            <i class="bi bi-download"></i> <?php echo $_LANGUAGE['export'] ?></button>
        <form class="import-user-form" role="form" method="post" enctype="multipart/form-data" style="display: none;">
            <input type="file" name="import" />
            <button type="submit"></button>
        </form>
    </div>
</div>

<div class="row">
    <div class="col-sm-12">
        <div class="tableblock ghost bg-light-lighter p-3 shadow-sm">
            <table id="dataTable" class="w-100 table listview dataTable no-footer" style="width:100%">
                <thead>
                    <tr>
                        <th><span class="sorta"><?php echo $_LANGUAGE['name'] ?></span></th>
                        <th><span class="sorta"><?php echo $_LANGUAGE['email'] ?></span></th>
                        <th><?php echo $_LANGUAGE['additional_info'] ?></th>
                        <th><?php echo $_LANGUAGE['expiry_date'] ?></th>
                        <th><?php echo $_LANGUAGE['logo'] ?></th>
                        <th><span class="sorta"><?php echo $_LANGUAGE['level'] ?></span></th>
                        <th><?php echo $_LANGUAGE['information'] ?></th>
                        <th><?php echo $_LANGUAGE['actions'] ?></th>
                    </tr>
                </thead>
                <tbody class="gridbody">
                    <?php
                        if ($users_sql_result->num_rows) {
                            while ($user = $users_sql_result->fetch_assoc()) { ?>
                                <?php
                                    $uploaded_size = 0;
                                    $media_files = scandir("../" . $user['name'] . DIRECTORY_SEPARATOR . MEDIA_PATH);
                                    foreach ($media_files as $media_file) {
                                        if ($media_file != '.' && $media_file != '..' && $media_file != EXPORT_PRODUCT && $media_file != LOGO_NAME) {
                                            $uploaded_size += filesize(".." . DIRECTORY_SEPARATOR . $user['name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $media_file);
                                        }
                                    }
                                    if ($user['level'] == 'star1') {
                                        $uploaded_max_size = STAR1_LIMIT;
                                    } else if ($user['level'] == 'star2') {
                                        $uploaded_max_size = STAR2_LIMIT;
                                    } else if ($user['level'] == 'star3') {
                                        $uploaded_max_size = STAR3_LIMIT;
                                    } else if ($user['level'] == 'star4') {
                                        $uploaded_max_size = STAR4_LIMIT;
                                    } else if ($user['level'] == 'star5') {
                                        $uploaded_max_size = STAR5_LIMIT;
                                    }
                                    if ($user['level'] != 'admin') {
                                        $uploaded_percent = number_format($uploaded_size / $uploaded_max_size / 1024 / 1024 * 100, 2);
                                    }
                                ?>
                                <tr data-id="<?php echo $user['id'] ?>">
                                    <td><?php echo $user['name'] ?></td>
                                    <td><?php echo $user['email'] ?></td>
                                    <td><?php echo mb_substr($user['additional_info'], 0, 20) ?></td>
                                    <td><?php if ($user['expiry_date']) { echo date("m/d/Y", strtotime($user['expiry_date'])); } ?></td>
                                    <td><?php if ($user['logo']) { ?><img class="w-100-p" src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR ?><?php if ($user['logo'] == TRANSPARENT_PNG_NAME) { echo DOMAIN_ROOT . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_PATH . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_NAME; } else { echo $user['name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $user['logo']; } ?>?v=<?php echo time() ?>" /><?php } ?></td>
                                    <td><?php echo $_LANGUAGE[$user['level']] ?></td>
                                    <td><?php echo format_size($uploaded_size, 'MB') ?><?php if ($user['level'] != 'admin') { echo ', ' . $uploaded_percent . '% ' . $_LANGUAGE['used']; } ?></td>
                                    <td>
                                        <button class="round-btn btn-mini btn-edit-user" onClick="editUser(this)"><i class="bi bi-pencil-square"></i></button>
                                        <button class="round-btn btn-mini btn-delete-user" onClick="deleteUser(this)"><i class="bi bi-x-lg"></i></button>
                                    </td>
                                </tr>
                            <?php }
                        }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="modal fade show" id="UserModal" tabindex="-1" aria-modal="true" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <p class="modal-title"><i class="bi bi-pencil-square"></i> <span></span></p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form autocomplete="off" role="form" method="post">
                    <input readonly="" name="id" type="hidden">

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
                            required
                            autofocus
                        />
                    </div>
                    <div class="form-group mb-3 email">
                        <label for="email" class="form-label"><?php echo $_LANGUAGE['email'] ?></label>
                        <input
                            type="email"
                            class="form-control"
                            id="email"
                            name="email"
                            placeholder="<?php echo $_LANGUAGE['enter_your_email'] ?>"
                            autocomplete="false"
                            required
                        />
                    </div>
                    <div class="form-group mb-3 telephone_number">
                        <label for="telephone_number" class="form-label"><?php echo $_LANGUAGE['telephone_number'] ?></label>
                        <input
                            type="tel"
                            class="form-control"
                            id="telephone_number"
                            name="telephone_number"
                            placeholder="<?php echo $_LANGUAGE['enter_your_telephone_number'] ?>"
                            required
                        />
                    </div>
                    <div class="form-group mb-3 additional_info">
                        <label for="additional_info" class="form-label"><?php echo $_LANGUAGE['additional_info'] ?></label>
                        <input
                            type="text"
                            class="form-control"
                            id="additional_info"
                            name="additional_info"
                            placeholder="<?php echo $_LANGUAGE['additional_info'] ?>"
                            maxlength="500"
                            required
                        />
                    </div>
                    <div class="form-group mb-3 expiry_date">
                        <label for="expiry_date" class="form-label"><?php echo $_LANGUAGE['expiry_date'] ?></label>
                        <input
                            type="date"
                            class="form-control"
                            id="expiry_date"
                            name="expiry_date"
                            required
                        />
                    </div>
                    <div class="form-group mb-3 logo">
                        <label for="logo" class="form-label"><?php echo $_LANGUAGE['logo'] ?></label>
                        <input
                            type="file"
                            class="form-control"
                            id="logo"
                            name="logo"
                            accept="image/png, image/jpg, image/jpeg"
                        />
                        <img src="" class="w-100-p mt-2 d-none" />
                    </div>
                    <div class="form-group mb-3 level">
                        <label for="level" class="form-label"><?php echo $_LANGUAGE['level'] ?></label>
                        <select
                            class="form-control"
                            id="level"
                            name="level"
                            required
                        >
                            <option value="star1"><?php echo $_LANGUAGE['star1'] ?></option>
                            <option value="star2"><?php echo $_LANGUAGE['star2'] ?></option>
                            <option value="star3"><?php echo $_LANGUAGE['star3'] ?></option>
                            <option value="star4"><?php echo $_LANGUAGE['star4'] ?></option>
                            <option value="star5"><?php echo $_LANGUAGE['star5'] ?></option>
                            <option value="admin"><?php echo $_LANGUAGE['admin'] ?></option>
                        </select>
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
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary d-grid w-100 btn-update-user" type="button"></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include './includes/footer.php'; ?>