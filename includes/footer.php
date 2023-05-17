            </div>
        </div>
    </div>

    <script>
        var site_language = '<?php echo $_SESSION["lang"]; ?>';
        var site_direction = '<?php echo $_SESSION["direction"]; ?>';
        
        var strings_confirm_import_products = '<?php echo $_LANGUAGE["confirm_import_products"]; ?>';

        var strings_ok = '<?php echo $_LANGUAGE["ok"]; ?>';
        var strings_confirm_folder_download = '<?php echo $_LANGUAGE["confirm_folder_download"]; ?>';
        var strings_cancel = '<?php echo $_LANGUAGE["cancel"]; ?>';
        var strings_confirm = '<?php echo $_LANGUAGE["confirm"]; ?>';
        var strings_files = '<?php echo $_LANGUAGE["files"]; ?>';
        var strings_folders = '<?php echo $_LANGUAGE["folders"]; ?>';

        var strings_add = '<?php echo $_LANGUAGE["add"]; ?>';
        var strings_update = '<?php echo $_LANGUAGE["update"]; ?>';
        var strings_add_user = '<?php echo $_LANGUAGE["add_user"]; ?>';
        var strings_edit_user = '<?php echo $_LANGUAGE["edit_user"]; ?>';
        var strings_delete_user = '<?php echo $_LANGUAGE["delete_user"]; ?>';
        var strings_confirm_delete_user = '<?php echo $_LANGUAGE["confirm_delete_user"]; ?>';
        var strings_import_users = '<?php echo $_LANGUAGE["import_users"]; ?>';
        var strings_confirm_import_users = '<?php echo $_LANGUAGE["confirm_import_users"]; ?>';
        var strings_please_input = '<?php echo $_LANGUAGE["please_input"]; ?>';
        var strings_please_select = '<?php echo $_LANGUAGE["please_select"]; ?>';
        var strings_please_match = '<?php echo $_LANGUAGE["please_match"]; ?>';
        
        var strings_please_wait_for_the_upload_do_not_cancel = '<?php echo $_LANGUAGE["please_wait_for_the_upload_do_not_cancel"]; ?>';
        var strings_add_product = '<?php echo $_LANGUAGE["add_product"]; ?>';
        var strings_edit_product = '<?php echo $_LANGUAGE["edit_product"]; ?>';
        var strings_delete_product = '<?php echo $_LANGUAGE["delete_product"]; ?>';
        var strings_confirm_delete_product = '<?php echo $_LANGUAGE["confirm_delete_product"]; ?>';
        var strings_import_products = '<?php echo $_LANGUAGE["import_products"]; ?>';
        var strings_confirm_import_products = '<?php echo $_LANGUAGE["confirm_import_products"]; ?>';
    </script>

    <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() {
            IconCaptcha.init('.iconcaptcha-holder', {
                general: {
                    validationPath: '<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/library/captcha/captcha-request.php',
                    fontFamily: 'Poppins',
                    credits: 'show',
                },
                security: {
                    clickDelay: 500,
                    hoverDetection: true,
                    enableInitialMessage: true,
                    initializeDelay: 500,
                    selectionResetDelay: 3000,
                    loadingAnimationDelay: 1000,
                    invalidateTime: 1000 * 60 * 2,
                },
                messages: {
                    initialization: {
                        verify: 'Verify that you are human.',
                        loading: 'Loading challenge...',
                    },
                    header: 'Select the image displayed the <u>least</u> amount of times',
                    correct: 'Verification complete.',
                    incorrect: {
                        title: 'Uh oh.',
                        subtitle: "You've selected the wrong image."
                    },
                    timeout: {
                        title: 'Please wait 60 sec.',
                        subtitle: 'You made too many incorrect selections.'
                    }
                }
            })
            // .bind('init', function(e) { // You can bind to custom events, in case you want to execute custom code.
            //     console.log('Event: Captcha initialized', e.detail.captchaId);
            // }).bind('selected', function(e) {
            //     console.log('Event: Icon selected', e.detail.captchaId);
            // }).bind('refreshed', function(e) {
            //     console.log('Event: Captcha refreshed', e.detail.captchaId);
            // }).bind('invalidated', function(e) {
            //     console.log('Event: Invalidated', e.detail.captchaId);
            // }).bind('reset', function(e) {
            //     console.log('Event: Reset', e.detail.captchaId);
            // }).bind('success', function(e) {
            //     console.log('Event: Correct input', e.detail.captchaId);
            // }).bind('error', function(e) {
            //     console.log('Event: Wrong input', e.detail.captchaId);
            // });
        });
    </script>
    
    <script type="text/javascript" src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/js/spectrum.min.js"></script>
    <script type="text/javascript" src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/js/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/js/plyr.poly.js"></script>
    <script type="text/javascript" src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/js/bundle.min.js"></script>
    <script type="text/javascript" src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/icon-captcha/js/icon-captcha.min.js"></script>

    <script type="text/javascript" src="<?php echo DOMAIN_NAME . DIRECTORY_SEPARATOR . DOMAIN_ROOT; ?>/assets/js/script.js?v=<?php echo time(); ?>"></script>
</body>
</html>
