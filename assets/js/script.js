var productModal, userModal;

$(document).ready(function() {
    $('.page-spinner').removeClass('d-flex').addClass('d-none');

    if ($('#dataTable').length) {
        $('#dataTable').DataTable({
            responsive: true,
            dom: '<"table-controls-top"fl>rt<"table-controls-bottom"ip>',
            language: {
                emptyTable: "--",
                info: "_START_-_END_ / _TOTAL_ ",
                infoEmpty: "",
                infoFiltered: "",
                infoPostFix: "",
                lengthMenu: "_MENU_",
                loadingRecords: "...",
                processing: '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>',
                search: '<i class="bi bi-search"></i> ',
                zeroRecords: "--",
                paginate: site_direction == 'rtl' ? { last: '<i class="bi bi-chevron-double-left"></i>', first: '<i class="bi bi-chevron-double-right"></i>', next: '<i class="bi bi-chevron-left"></i>', previous: '<i class="bi bi-chevron-right"></i>' } : { first: '<i class="bi bi-chevron-double-left"></i>', last: '<i class="bi bi-chevron-double-right"></i>', previous: '<i class="bi bi-chevron-left"></i>', next: '<i class="bi bi-chevron-right"></i>' }
            },
            sortable: true,
            searching: true,
            searchDelay: 800,
            pageLength: 15,
            lengthMenu: [
                [15, 30],
                [15, 30],
            ],
            createdRow: function (row, data, index) {
                $(row).addClass("rowa");
                if ($(row).find(".thumb").length || $(row).find(".vid").length) {
                    $(row).addClass("gallindex");
                }
            },
            drawCallback: function (settings) {
            },
            initComplete: function () {
                checkSelecta();
                placeHolderheight();
                $(this).closest(".tableblock.ghost").removeClass("ghost-hidden");
                $(this).closest(".pmblock").find(".overload").remove();
                var api = this.api();
                var pageinfo = api.page.info();
                if (pageinfo.recordsDisplay < 1) {
                    $(this).closest(".pmblock").hide();
                    $(".hidetable").removeClass("d-none");
                } else {
                    $(".hidetable").addClass("d-none");
                }
                $("#dataTable_wrapper div.dataTables_length").addClass("ms-auto");
                $("#dataTable_wrapper .table-controls-top").addClass("d-flex w-100 mb-3");
                $("#dataTable_wrapper .table-controls-bottom").addClass("d-flex w-100");
                $("#dataTable_wrapper .dataTables_paginate").addClass("ms-auto");
            },
        });
    }

    /* Product Actions */
    if ($('#ProductModal').length) {
        productModal = new bootstrap.Modal($('#ProductModal'));
    }

    $('.btn-add-product').click(function() {
        $('#ProductModal').find('[name="id"]').val('');
        $('#ProductModal').find('.modal-title span').html(strings_add_product);
        $('#ProductModal').find('.btn-update-product').html(strings_add);

        $('#ProductModal').find('[name="sku_no"]').val('');
        $('#ProductModal').find('[name="barcode"]').val('');
        $('#ProductModal').find('[name="description_1"]').val('');
        $('#ProductModal').find('[name="description_2"]').val('');
        $('#ProductModal').find('[name="brand"]').val('');
        $('#ProductModal').find('[name="brand_sku"]').val('');
        $('#ProductModal').find('[name="text_1"]').val('');
        $('#ProductModal').find('[name="text_2"]').val('');
        $('#ProductModal').find('[name="country"]').val('');
        $('#ProductModal').find('[name="pic_1"]').val('');
        $('#ProductModal').find('.form-group.pic_1 img').addClass('d-none');
        $('#ProductModal').find('[name="pic_2"]').val('');
        $('#ProductModal').find('.form-group.pic_2 img').addClass('d-none');
        $('#ProductModal').find('[name="pic_3"]').val('');
        $('#ProductModal').find('.form-group.pic_3 img').addClass('d-none');
        $('#ProductModal').find('[name="pic_4"]').val('');
        $('#ProductModal').find('.form-group.pic_4 img').addClass('d-none');
        $('#ProductModal').find('[name="video_1"]').val('');
        $('#ProductModal').find('.form-group.video_1 video').addClass('d-none');
        $('#ProductModal').find('[name="video_2"]').val('');
        $('#ProductModal').find('.form-group.video_2 video').addClass('d-none');

        productModal.show();
    });
    $('.btn-edit-product').click(function() {
        editProduct(this);
    });
    $('.btn-delete-product').click(function() {
        deleteProduct(this);
    });

    $('.btn-update-product').click(function() {
        if (validateForm($('#ProductModal'))) {
            var user_form_data = new FormData();
            user_form_data.append("action", 'update-product');
            user_form_data.append("id", $('#ProductModal').find('[name="id"]').val());
            user_form_data.append("sku_no", $('#ProductModal').find('[name="sku_no"]').val());
            user_form_data.append("barcode", $('#ProductModal').find('[name="barcode"]').val());
            user_form_data.append("description_1", $('#ProductModal').find('[name="description_1"]').val());
            user_form_data.append("description_2", $('#ProductModal').find('[name="description_2"]').val());
            user_form_data.append("brand", $('#ProductModal').find('[name="brand"]').val());
            user_form_data.append("brand_sku", $('#ProductModal').find('[name="brand_sku"]').val());
            user_form_data.append("text_1", $('#ProductModal').find('[name="text_1"]').val());
            user_form_data.append("text_2", $('#ProductModal').find('[name="text_2"]').val());
            user_form_data.append("country", $('#ProductModal').find('[name="country"]').val());
            if ($('#ProductModal').find('[name="pic_1"]')[0].files[0]) {
                user_form_data.append('pic_1', $('#ProductModal').find('[name="pic_1"]')[0].files[0]);
            }
            if ($('#ProductModal').find('[name="pic_2"]')[0].files[0]) {
                user_form_data.append('pic_2', $('#ProductModal').find('[name="pic_2"]')[0].files[0]);
            }
            if ($('#ProductModal').find('[name="pic_3"]')[0].files[0]) {
                user_form_data.append('pic_3', $('#ProductModal').find('[name="pic_3"]')[0].files[0]);
            }
            if ($('#ProductModal').find('[name="pic_4"]')[0].files[0]) {
                user_form_data.append('pic_4', $('#ProductModal').find('[name="pic_4"]')[0].files[0]);
            }
            user_form_data.append("video_1", $('#ProductModal').find('[name="video_1"]')[0].files[0]);
            user_form_data.append("video_2", $('#ProductModal').find('[name="video_2"]')[0].files[0]);

            $('.page-spinner').removeClass('d-none').addClass('d-flex');

            $.ajax({
                method: "POST",
                url: "ajax.php",
                data: user_form_data,
                processData: false,
                contentType: false,
                success: function (response) {
                    $('.page-spinner').removeClass('d-flex').addClass('d-none');
                    if (response.status) {
                        window.location.reload();
                    } else {
                        for (var error_key in response.errors) {
                            if (error_key == 'overall') {
                                var error_el = $('#ProductModal').find('p.text-danger.overall');
                                if (error_el && error_el.length) {
                                    error_el.html(response.errors[error_key]);
                                } else {
                                    $('#ProductModal').prepend('<p class="text-danger overall small">' + response.errors[error_key] + '</p>')
                                }
                            } else {
                                var error_el = $('#ProductModal').find('[name="' + error_key + '"]').closest('.form-group').find('p.text-danger');
                                if (error_el && error_el.length) {
                                    error_el.html(response.errors[error_key]);
                                } else {
                                    $('#ProductModal').find('[name="' + error_key + '"]').closest('.form-group').append('<p class="text-danger small">' + response.errors[error_key] + '</p>')
                                }
                            }
                        }
                    }
                }
            });
        }
    });

    $('.btn-import-product').click(function() {
        $('.import-product-form [name="import"]').click();
    });
    $('.import-product-form [name="import"]').change(function() {
        if ($('.import-product-form [name="import"]').val()) {
            bootbox.confirm({
                title: '<i class="bi bi-upload"></i> ' + strings_import_products,
                message: strings_confirm_import_products,
                callback: function(result) {
                    var products_form_data = new FormData();
                    products_form_data.append("action", 'import-products');
                    products_form_data.append('import', $('.import-product-form [name="import"]')[0].files[0]);
            
                    $('.page-spinner').removeClass('d-none').addClass('d-flex');
                    $.ajax({
                        method: "POST",
                        url: "ajax.php",
                        data: products_form_data,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            $('.page-spinner').removeClass('d-flex').addClass('d-none');

                            window.location.reload();
                        }
                    })
                }
            });
        }
    });
    $('.btn-export-product').click(function() {
        $('.page-spinner').removeClass('d-none').addClass('d-flex');
        $.ajax({
            method: "POST",
            url: "ajax.php",
            data: { action: 'export-products' },
            success: function (response) {
                $('.page-spinner').removeClass('d-flex').addClass('d-none');
            }
        })
    });

    /* User Actions */
    if ($('#UserModal').length) {
        userModal = new bootstrap.Modal($('#UserModal'));
    }

    $('.btn-add-user').click(function() {
        $('#UserModal').find('[name="id"]').val('');
        $('#UserModal').find('.modal-title span').html(strings_add_user);
        $('#UserModal').find('.btn-update-user').html(strings_add);

        $('#UserModal').find('[name="name"]').val('');
        $('#UserModal').find('[name="email"]').val('');
        $('#UserModal').find('[name="telephone_number"]').val('');
        $('#UserModal').find('[name="additional_info"]').val('');
        $('#UserModal').find('[name="expiry_date"]').val('');
        $('#UserModal').find('[name="logo"]').val('');
        $('#UserModal').find('.form-group.logo img').addClass('d-none');
        $('#UserModal').find('[name="level"]').val('');
        $('#UserModal').find('[name="information"]').val('');
        $('#UserModal').find('[name="password"]').val('');

        userModal.show();
    });
    $('.btn-edit-user').click(function() {
        editUser(this);
    });
    $('.btn-delete-user').click(function() {
        deleteUser(this);
    });

    $('.btn-update-user').click(function() {
        if (validateForm($('#UserModal'))) {
            var user_form_data = new FormData();
            user_form_data.append("action", 'update-user');
            user_form_data.append("id", $('#UserModal').find('[name="id"]').val());
            user_form_data.append("name", $('#UserModal').find('[name="name"]').val());
            user_form_data.append("email", $('#UserModal').find('[name="email"]').val());
            if ($('#UserModal').find('[name="logo"]')[0].files[0]) {
                user_form_data.append('logo', $('#UserModal').find('[name="logo"]')[0].files[0]);
            } 
            user_form_data.append("telephone_number", $('#UserModal').find('[name="telephone_number"]').val());
            user_form_data.append("additional_info", $('#UserModal').find('[name="additional_info"]').val());
            user_form_data.append("expiry_date", $('#UserModal').find('[name="expiry_date"]').val());
            user_form_data.append("level", $('#UserModal').find('[name="level"]').val());
            user_form_data.append("information", $('#UserModal').find('[name="information"]').val());
            user_form_data.append("password", $('#UserModal').find('[name="password"]').val());
    
            $('.page-spinner').removeClass('d-none').addClass('d-flex');
            $.ajax({
                method: "POST",
                url: "ajax.php",
                data: user_form_data,
                processData: false,
                contentType: false,
                success: function (response) {
                    $('.page-spinner').removeClass('d-flex').addClass('d-none');
                    if (response.status) {
                        window.location.reload();
                    } else {
                        for (var error_key in response.errors) {
                            if (error_key == 'overall') {
                                var error_el = $('#UserModal').find('p.text-danger.overall');
                                if (error_el && error_el.length) {
                                    error_el.html(response.errors[error_key]);
                                } else {
                                    $('#UserModal').prepend('<p class="text-danger overall small">' + response.errors[error_key] + '</p>')
                                }
                            } else {
                                var error_el = $('#UserModal').find('[name="' + error_key + '"]').closest('.form-group').find('p.text-danger');
                                if (error_el && error_el.length) {
                                    error_el.html(response.errors[error_key]);
                                } else {
                                    $('#UserModal').find('[name="' + error_key + '"]').closest('.form-group').append('<p class="text-danger small">' + response.errors[error_key] + '</p>')
                                }
                            }
                        }
                    }
                }
            });
        }
    });

    $('.btn-import-user').click(function() {
        $('.import-user-form [name="import"]').click();
    });
    $('.import-user-form [name="import"]').change(function() {
        if ($('.import-user-form [name="import"]').val()) {
            bootbox.confirm({
                title: '<i class="bi bi-upload"></i> ' + strings_import_users,
                message: strings_confirm_import_users,
                callback: function(result) {
                    var users_form_data = new FormData();
                    users_form_data.append("action", 'import-users');
                    users_form_data.append('import', $('.import-user-form [name="import"]')[0].files[0]);
            
                    $('.page-spinner').removeClass('d-none').addClass('d-flex');
                    $.ajax({
                        method: "POST",
                        url: "ajax.php",
                        data: users_form_data,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            $('.page-spinner').removeClass('d-flex').addClass('d-none');
        
                            window.location.reload();
                        }
                    })
                }
            })
        }
    });
    $('.btn-export-user').click(function() {
        $('.page-spinner').removeClass('d-none').addClass('d-flex');
        $.ajax({
            method: "POST",
            url: "ajax.php",
            data: { action: 'export-users' },
            success: function (response) {
                $('.page-spinner').removeClass('d-flex').addClass('d-none');

                var downloadLink = document.createElement("a");
                var fileData = ['\ufeff' + response];

                var blobObject = new Blob(fileData,{
                    type: "text/csv;charset=utf-8;"
                });

                var url = URL.createObjectURL(blobObject);
                downloadLink.href = url;
                downloadLink.download = "users.csv";

                /*
                * Actually download CSV
                */
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }
        })
    });

    $('.btn-change-lang').click(function() {
        $('.page-spinner').removeClass('d-none').addClass('d-flex');
        $.ajax({
            method: "POST",
            url: "ajax.php",
            dataType: "JSON",
            data: { action: 'change-language', lang: $(this).data('lang') },
            success: function (response) {
                $('.page-spinner').removeClass('d-flex').addClass('d-none');
                window.location.reload();
            }
        })
    });

    $(document).on("keydown", "form :input:not(textarea)", function(event) {
        if (event.key == "Enter") {
            event.preventDefault();
        }
    });
});

function validateForm(form) {
    var validate_result = true;
    var form_inputs = form.find('input, select, textarea');
    for (var form_input_index = 0; form_input_index < form_inputs.length; form_input_index++) {
        var form_input = $(form_inputs[form_input_index]);
        var form_input_name = form_input.attr('name');
        var form_input_pattern = form_input.attr('pattern');
        var form_input_required = form_input.attr('required');
        var form_input_match = form_input.attr('match');
        var form_input_validate = true;
        if (form_input_required) {
            if (!form_input.val()) {
                validate_result = form_input_validate = false;
                if (form_input.closest('.form-group').find('.text-danger').length) {
                    form_input.closest('.form-group').find('.text-danger').html(strings_please_input + ' ' + form_input_name);
                } else {
                    form_input.closest('.form-group').append('<p class="text-danger small">' + strings_please_input + ' ' + form_input_name + '</p>');
                }
            }
        }
        if (form_input_validate) {
            if (form_input_pattern) {
                var reg_exp_form_input_tag = new RegExp(form_input_pattern);
                if (form_input.val()) {
                    if (!reg_exp_form_input_tag.test(form_input.val())) {
                        validate_result = form_input_validate = false;
                        if (form_input.closest('.form-group').find('.text-danger').length) {
                            form_input.closest('.form-group').find('.text-danger').html(strings_please_match + ' ' + form_input_name + ' (' + form_input_pattern + ')');
                        } else {
                            form_input.closest('.form-group').append('<p class="text-danger small">' + strings_please_match + ' ' + form_input_name + ' (' + form_input_pattern + ')</p>');
                        }
                    }
                }
            }
        }
        if (form_input_validate) {
            if (form_input_match) {
                if (form_input.val()) {
                    if (form.find('[name="' + form_input_match + '"]').length) {
                        if (form_input.val() != form.find('[name="' + form_input_match + '"]').val()) {
                            validate_result = form_input_validate = false;
                            if (form_input.closest('.form-group').find('.text-danger').length) {
                                form_input.closest('.form-group').find('.text-danger').html(strings_please_match + ' ' + form_input_match);
                            } else {
                                form_input.closest('.form-group').append('<p class="text-danger small">' + strings_please_match + ' ' + form_input_match + '</p>');
                            }
                        }
                    }
                }
            }
        }
        if (form_input_validate) {
            if (form_input.closest('.form-group').find('p.text-danger').length) {
                form_input.closest('.form-group').find('p.text-danger').remove();
            }
        }
    }

    return validate_result;
}
function editProduct(el) {
    var parent_tr = $(el).closest('tr');
    if (parent_tr.hasClass('child')) {
        parent_tr = parent_tr.prev();
    }
    $('#ProductModal').find('[name="id"]').val(parent_tr.data('id'));

    $('.page-spinner').removeClass('d-none').addClass('d-flex');
    $.ajax({
        method: "POST",
        url: "ajax.php",
        dataType: "JSON",
        data: { action: 'get-product', id: parent_tr.data('id') },
        success: function (response) {
            $('.page-spinner').removeClass('d-flex').addClass('d-none');
            if (response.status) {
                $('#ProductModal').find('.modal-title span').html(strings_edit_product);
                $('#ProductModal').find('.btn-update-product').html(strings_update);

                $('#ProductModal').find('[name="sku_no"]').val(response.data.sku_no);
                $('#ProductModal').find('[name="barcode"]').val(response.data.barcode);
                $('#ProductModal').find('[name="description_1"]').val(response.data.description_1);
                $('#ProductModal').find('[name="description_2"]').val(response.data.description_2);
                $('#ProductModal').find('[name="brand"]').val(response.data.brand);
                $('#ProductModal').find('[name="brand_sku"]').val(response.data.brand_sku);
                $('#ProductModal').find('[name="text_1"]').val(response.data.text_1);
                $('#ProductModal').find('[name="text_2"]').val(response.data.text_2);
                $('#ProductModal').find('[name="country"]').val(response.data.country);
                if (response.data.pic_1) {
                    $('#ProductModal').find('.form-group.pic_1 img').attr('src', response.data.pic_1).removeClass('d-none');
                } else {
                    $('#ProductModal').find('.form-group.pic_1 img').addClass('d-none');
                }
                if (response.data.pic_2) {
                    $('#ProductModal').find('.form-group.pic_2 img').attr('src', response.data.pic_2).removeClass('d-none');
                } else {
                    $('#ProductModal').find('.form-group.pic_2 img').addClass('d-none');
                }
                if (response.data.pic_3) {
                    $('#ProductModal').find('.form-group.pic_3 img').attr('src', response.data.pic_3).removeClass('d-none');
                } else {
                    $('#ProductModal').find('.form-group.pic_3 img').addClass('d-none');
                }
                if (response.data.pic_4) {
                    $('#ProductModal').find('.form-group.pic_4 img').attr('src', response.data.pic_4).removeClass('d-none');
                } else {
                    $('#ProductModal').find('.form-group.pic_4 img').addClass('d-none');
                }
                if (response.data.video_1) {
                    $('#ProductModal').find('.form-group.video_1 video').attr('src', response.data.video_1).removeClass('d-none');
                } else {
                    $('#ProductModal').find('.form-group.video_1 video').addClass('d-none');
                }
                if (response.data.video_2) {
                    $('#ProductModal').find('.form-group.video_2 video').attr('src', response.data.video_2).removeClass('d-none');
                } else {
                    $('#ProductModal').find('.form-group.video_2 video').addClass('d-none');
                }

                productModal.show();
            }
        }
    })
}
function deleteProduct(el) {
    var parent_tr = $(el).closest('tr');
    if (parent_tr.hasClass('child')) {
        parent_tr = parent_tr.prev();
    }
    bootbox.confirm({
        title: '<i class="bi bi bi-trash"></i> ' + strings_delete_product,
        message: strings_confirm_delete_product,
        callback: function(result) {
            $('.page-spinner').removeClass('d-none').addClass('d-flex');
            $.ajax({
                method: "POST",
                url: "ajax.php",
                dataType: "JSON",
                data: { action: 'delete-product', id: parent_tr.data('id') },
                success: function (response) {
                    $('.page-spinner').removeClass('d-flex').addClass('d-none');
                    window.location.reload();
                }
            });
        }
    })
}
function editUser(el) {
    var parent_tr = $(el).closest('tr');
    if (parent_tr.hasClass('child')) {
        parent_tr = parent_tr.prev();
    }

    $('#UserModal').find('[name="id"]').val(parent_tr.data('id'));

    $('.page-spinner').removeClass('d-none').addClass('d-flex');
    $.ajax({
        method: "POST",
        url: "ajax.php",
        dataType: "JSON",
        data: { action: 'get-user', id: parent_tr.data('id') },
        success: function (response) {
            $('.page-spinner').removeClass('d-flex').addClass('d-none');

            if (response.status) {
                $('#UserModal').find('.modal-title span').html(strings_edit_user);
                $('#UserModal').find('.btn-update-user').html(strings_update);

                $('#UserModal').find('[name="name"]').val(response.data.name);
                $('#UserModal').find('[name="email"]').val(response.data.email);
                $('#UserModal').find('[name="telephone_number"]').val(response.data.telephone_number);
                $('#UserModal').find('[name="additional_info"]').val(response.data.additional_info);
                $('#UserModal').find('[name="expiry_date"]').val(response.data.expiry_date);
                if (response.data.logo) {
                    $('#UserModal').find('.form-group.logo img').attr('src', response.data.logo).removeClass('d-none');
                } else {
                    $('#UserModal').find('.form-group.logo img').addClass('d-none');
                }
                $('#UserModal').find('[name="level"]').val(response.data.level);
                $('#UserModal').find('[name="information"]').val(response.data.information);
                $('#UserModal').find('[name="password"]').val('');

                userModal.show();
            }
        }
    });
}
function deleteUser(el) {
    var parent_tr = $(el).closest('tr');
    if (parent_tr.hasClass('child')) {
        parent_tr = parent_tr.prev();
    }

    bootbox.confirm({
        title: '<i class="bi bi bi-trash"></i> ' + strings_delete_user,
        message: strings_confirm_delete_user,
        callback: function(result) {
            $('.page-spinner').removeClass('d-none').addClass('d-flex');
            $.ajax({
                method: "POST",
                url: "ajax.php",
                dataType: "JSON",
                data: { action: 'delete-user', id: parent_tr.data('id') },
                success: function (response) {
                    $('.page-spinner').removeClass('d-flex').addClass('d-none');
                    window.location.reload();
                }
            });
        }
    })
}