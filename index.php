<?php include './includes/init.php'; ?>

<?php $page_title = $_LANGUAGE['home']; ?>

<?php include './includes/header.php'; ?>

<?php
$products_sql = "SELECT `products`.`id`, `products`.`sku_no`, `products`.`barcode`, `products`.`description_1`, `products`.`description_2`, `products`.`brand`, `products`.`brand_sku`, `products`.`text_1`, `products`.`text_2`, `products`.`country`, `products`.`pic_1`, `products`.`pic_2`, `products`.`pic_3`, `products`.`pic_4`, `products`.`video_1`, `products`.`video_2`, `users`.`name` as 'user_name' FROM `products` LEFT JOIN `users` ON `products`.`user_id` = `users`.`id`";
if ($_SESSION["user"]['level'] != 'admin') {
    $products_sql .= " WHERE `users`.`id` = '" . $_SESSION["user"]['id'] . "'";
}
$products_sql_result = $db_conn->query($products_sql);
?>

<div class="row">
    <div class="col-sm-12">
        <button class="btn btn-primary float-end btn-add-product">
            <i class="bi bi-plus"></i> <?php echo $_LANGUAGE['add_product'] ?></button>
    </div>
</div>

<div class="row">
    <div class="col-sm-12">
        <div class="tableblock ghost bg-light-lighter p-3 shadow-sm">
            <table id="dataTable" class="w-100 table listview dataTable no-footer" style="width:100%">
                <thead>
                    <tr>
                        <?php if ($_SESSION['user']['level'] == 'admin') { ?>
                            <th><span class="sorta"><?php echo $_LANGUAGE['user'] ?></span></th>
                        <?php } ?>
                        <th><span class="sorta"><?php echo $_LANGUAGE['sku_no'] ?></span></th>
                        <th><span class="sorta"><?php echo $_LANGUAGE['barcode'] ?></span></th>
                        <th><?php echo $_LANGUAGE['description_1'] ?></th>
                        <th><?php echo $_LANGUAGE['description_2'] ?></th>
                        <th><span class="sorta"><?php echo $_LANGUAGE['brand'] ?></span></th>
                        <th><span class="sorta"><?php echo $_LANGUAGE['brand_sku'] ?></span></th>
                        <th><?php echo $_LANGUAGE['text_1'] ?></th>
                        <th><?php echo $_LANGUAGE['text_2'] ?></th>
                        <th><span class="sorta"><?php echo $_LANGUAGE['country'] ?></span></th>
                        <th><?php echo $_LANGUAGE['pic_1'] ?></th>
                        <th><?php echo $_LANGUAGE['pic_2'] ?></th>
                        <th><?php echo $_LANGUAGE['pic_3'] ?></th>
                        <th><?php echo $_LANGUAGE['pic_4'] ?></th>
                        <th><?php echo $_LANGUAGE['video_1'] ?></th>
                        <th><?php echo $_LANGUAGE['video_2'] ?></th>
                        <th><?php echo $_LANGUAGE['actions'] ?></th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    <?php
                        if ($products_sql_result->num_rows) {
                            while ($product = $products_sql_result->fetch_assoc()) { ?>
                                <tr data-id="<?php echo $product['id'] ?>">
                                    <?php if ($_SESSION['user']['level'] == 'admin') { ?>
                                        <td><?php echo $product['user_name'] ?></td>
                                    <?php } ?>
                                    <td><?php echo $product['sku_no'] ?></td>
                                    <td><?php echo mb_substr($product['barcode'], 0, 20) ?></td>
                                    <td><?php echo mb_substr($product['description_1'], 0, 10) ?></td>
                                    <td><?php echo mb_substr($product['description_2'], 0, 10) ?></td>
                                    <td><?php echo mb_substr($product['brand'], 0, 10) ?></td>
                                    <td><?php echo mb_substr($product['brand_sku'], 0, 10) ?></td>
                                    <td><?php echo mb_substr($product['text_1'], 0, 10) ?></td>
                                    <td><?php echo mb_substr($product['text_2'], 0, 10) ?></td>
                                    <td><?php echo mb_substr($product['country'], 0, 10) ?></td>
                                    <td><?php if ($product['pic_1']) { ?><img class="w-100-p" src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR ?><?php if ($product['pic_1'] == TRANSPARENT_PNG_NAME) { echo DOMAIN_ROOT . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_PATH . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_NAME; } else { echo $product['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $product['pic_1']; } ?>" /><?php } ?></td>
                                    <td><?php if ($product['pic_2']) { ?><img class="w-100-p" src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR ?><?php if ($product['pic_2'] == TRANSPARENT_PNG_NAME) { echo DOMAIN_ROOT . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_PATH . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_NAME; } else { echo $product['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $product['pic_2']; } ?>" /><?php } ?></td>
                                    <td><?php if ($product['pic_3']) { ?><img class="w-100-p" src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR ?><?php if ($product['pic_3'] == TRANSPARENT_PNG_NAME) { echo DOMAIN_ROOT . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_PATH . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_NAME; } else { echo $product['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $product['pic_3']; } ?>" /><?php } ?></td>
                                    <td><?php if ($product['pic_4']) { ?><img class="w-100-p" src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR ?><?php if ($product['pic_4'] == TRANSPARENT_PNG_NAME) { echo DOMAIN_ROOT . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_PATH . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_NAME; } else { echo $product['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $product['pic_4']; } ?>" /><?php } ?></td>
                                    <td><?php if ($product['video_1']) { ?><video class="w-100-p" src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . $product['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $product['video_1'] ?>"></video><?php } ?></td>
                                    <td><?php if ($product['video_2']) { ?><video class="w-100-p" src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . $product['user_name'] . DIRECTORY_SEPARATOR . MEDIA_PATH . DIRECTORY_SEPARATOR . $product['video_2'] ?>"></video><?php } ?></td>
                                    <td>
                                        <button class="round-btn btn-mini btn-edit-product" onClick="editProduct(this)"><i class="bi bi-pencil-square"></i></button>
                                        <button class="round-btn btn-mini btn-delete-product" onClick="deleteProduct(this)"><i class="bi bi-x-lg"></i></button>
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

<div class="row">
    <div class="col-sm-12">
    </div>
</div>

<div class="modal fade show" id="ProductModal" tabindex="-1" aria-modal="true" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <p class="modal-title"><i class="bi bi-pencil-square"></i> <span></span></p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form autocomplete="off" role="form" method="post">
                    <input readonly="" name="id" type="hidden">
                    <div class="form-group mb-3 sku_no">
                        <label for="sku_no" class="form-label"><?php echo $_LANGUAGE['sku_no'] ?></label>
                        <input
                            type="text"
                            class="form-control"
                            id="sku_no"
                            name="sku_no"
                            placeholder="^[0-9a-zA-Z_-]{1,10}$"
                            pattern="^[0-9a-zA-Z_-]{1,10}$"
                            maxlength="10"
                            autocomplete="false"
                            required
                            autofocus
                        />
                    </div>
                    <div class="form-group mb-3 barcode">
                        <label for="barcode" class="form-label"><?php echo $_LANGUAGE['barcode'] ?></label>
                        <input
                            type="text"
                            class="form-control"
                            id="barcode"
                            name="barcode"
                            placeholder="^[0-9]{1,30}$"
                            pattern="^[0-9]{1,30}$"
                            maxlength="30"
                            autocomplete="false"
                            required
                        />
                    </div>
                    <div class="form-group mb-3 description_1">
                        <label for="description_1" class="form-label"><?php echo $_LANGUAGE['description_1'] ?></label>
                        <input
                            type="text"
                            class="form-control"
                            id="description_1"
                            name="description_1"
                            pattern="^[^;]+$"
                            maxlength="30"
                            required
                        />
                    </div>
                    <div class="form-group mb-3 description_2">
                        <label for="description_2" class="form-label"><?php echo $_LANGUAGE['description_2'] ?></label>
                        <input
                            type="text"
                            class="form-control"
                            id="description_2"
                            name="description_2"
                            pattern="^[^;]+$"
                            maxlength="30"
                            required
                        />
                    </div>
                    <div class="form-group mb-3 brand">
                        <label for="brand" class="form-label"><?php echo $_LANGUAGE['brand'] ?></label>
                        <input
                            type="text"
                            class="form-control"
                            id="brand"
                            name="brand"
                            pattern="^[^;]+$"
                            maxlength="30"
                            required
                        />
                    </div>
                    <div class="form-group mb-3 brand_sku">
                        <label for="brand_sku" class="form-label"><?php echo $_LANGUAGE['brand_sku'] ?></label>
                        <input
                            type="text"
                            class="form-control"
                            id="brand_sku"
                            name="brand_sku"
                            pattern="^[^;]+$"
                            maxlength="30"
                            required
                        />
                    </div>
                    <div class="form-group mb-3 text_1">
                        <label for="text_1" class="form-label"><?php echo $_LANGUAGE['text_1'] ?></label>
                        <input
                            class="form-control"
                            id="text_1"
                            name="text_1"
                            pattern="^[^;]+$"
                            maxlength="80"
                            required
                        />
                    </div>
                    <div class="form-group mb-3 text_2">
                        <label for="text_2" class="form-label"><?php echo $_LANGUAGE['text_2'] ?></label>
                        <input
                            class="form-control"
                            id="text_2"
                            name="text_2"
                            pattern="^[^;]+$"
                            maxlength="80"
                            required
                        />
                    </div>
                    <div class="form-group mb-3 country">
                        <label for="country" class="form-label"><?php echo $_LANGUAGE['country'] ?></label>
                        <input
                            type="text"
                            class="form-control"
                            id="country"
                            name="country"
                            pattern="^[^;]+$"
                            maxlength="20"
                            required
                        />
                    </div>
                    <div class="form-group mb-3 pic_1">
                        <label for="pic_1" class="form-label"><?php echo $_LANGUAGE['pic_1'] ?></label>
                        <input
                            type="file"
                            class="form-control"
                            id="pic_1"
                            name="pic_1"
                            accept="image/png, image/jpg, image/jpeg"
                        />
                        <img src="" class="w-200-p mt-2 d-none" />
                    </div>
                    <div class="form-group mb-3 pic_2">
                        <label for="pic_2" class="form-label"><?php echo $_LANGUAGE['pic_2'] ?></label>
                        <input
                            type="file"
                            class="form-control"
                            id="pic_2"
                            name="pic_2"
                            accept="image/png, image/jpg, image/jpeg"
                        />
                        <img src="" class="w-200-p mt-2 d-none" />
                    </div>
                    <div class="form-group mb-3 pic_3">
                        <label for="pic_3" class="form-label"><?php echo $_LANGUAGE['pic_3'] ?></label>
                        <input
                            type="file"
                            class="form-control"
                            id="pic_3"
                            name="pic_3"
                            accept="image/png, image/jpg, image/jpeg"
                        />
                        <img src="" class="w-200-p mt-2 d-none" />
                    </div>
                    <div class="form-group mb-3 pic_4">
                        <label for="pic_4" class="form-label"><?php echo $_LANGUAGE['pic_4'] ?></label>
                        <input
                            type="file"
                            class="form-control"
                            id="pic_4"
                            name="pic_4"
                            accept="image/png, image/jpg, image/jpeg"
                        />
                        <img src="" class="w-200-p mt-2 d-none" />
                    </div>
                    <div class="form-group mb-3 video_1">
                        <label for="video_1" class="form-label"><?php echo $_LANGUAGE['video_1'] ?></label>
                        <input
                            type="file"
                            class="form-control"
                            id="video_1"
                            name="video_1"
                            accept="video/mp4"
                        />
                        <img src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_PATH . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_NAME ?>" class="w-30-p mt-2 d-none" />
                        <video src="" class="w-200-p mt-2 d-none"></video>
                    </div>
                    <div class="form-group mb-3 video_2">
                        <label for="video_2" class="form-label"><?php echo $_LANGUAGE['video_2'] ?></label>
                        <input
                            type="file"
                            class="form-control"
                            id="video_2"
                            name="video_2"
                            accept="video/mp4"
                        />
                        <img src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_PATH . DIRECTORY_SEPARATOR . TRANSPARENT_PNG_NAME ?>" class="w-30-p mt-2 d-none" />
                        <video src="" class="w-200-p mt-2 d-none"></video>
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary d-grid w-100 btn-update-product" type="button"></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include './includes/footer.php'; ?>
