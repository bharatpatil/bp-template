/* required by splash page */
$(function() {
    /********* clickthrough form ***********/
    $('body').delegate('.atn-plugin-clickthrough-button', 'click', function() {
        var form = $('#atn-plugin-form-clickthrough');
        form.attr('action', '/plugin/clickthrough/auth');
        form.attr('method', 'post');
        form.submit();
    });
    /********* guestbook form ***********/
    $('body').delegate('.atn-plugin-guestbook-button', 'click', function() {
        if ($('#atn-plugin-guestbook-username').val() == '' || $('#atn-plugin-guestbook-password').val() == '') {
            alert('All the fields are required.');
            return false;
        }
        var form = $('#atn-plugin-form-guestbook');
        form.attr('action', '/plugin/localUm/auth');
        form.attr('method', 'post');
        form.submit();
    });
    /********* social form ***********/
    $('body').delegate('.atn-social-facebook', 'click', function() {
        var form = $('#atn-plugin-form-social');
        form.attr('action', '/plugin/facebook/login');
        form.attr('method', 'post');
        form.submit();
    });
    $('body').delegate('.atn-social-twitter', 'click', function() {
        var form = $('#atn-plugin-form-social');
        form.attr('action', '/plugin/twitter/login');
        form.attr('method', 'post');
        form.submit();
    });
    $('body').delegate('.atn-social-linkedin', 'click', function() {
        var form = $('#atn-plugin-form-social');
        form.attr('action', '/plugin/linkedin/login');
        form.attr('method', 'post');
        form.submit();
    });
    $('body').delegate('.atn-social-google-plus', 'click', function() {
        var form = $('#atn-plugin-form-social');
        form.attr('action', '/plugin/gplus/login');
        form.attr('method', 'post');
        form.submit();
    });
    /************** Webform validation ****************/
    $('body').delegate('#popupWebformSubmit', 'click', function() {
        $("#webformForm").submit();
    });
    $("#webformForm").submit(function() {
        if (!($("#gender").is(':visible'))) {
            $("#gender").prepend("<option value='' selected='selected'></option>");
            //alert($("#gender").val());
        }
        $.blockUI();
        $.ajax({
            url: "/plugin/webForm/auth",
            type: "post",
            data: $("#webformForm").serialize(),
            error: function() {
                $.unblockUI();
            },
            success: function(result) {
                var obj = $.parseJSON(result);
                if (obj.status === true) {
                    window.location = obj.value;
                } else {
                    //$("#webformForm_error").empty();
                    $("#error_msg").empty();
                    var flag = 0;
                    for (var attr in obj.value) {
                        //$("#webformForm_error").append(obj.value[attr]);
                        if (obj.value[attr] == "Username cannot be blank.") {
                            if (flag == 1) {
                                $("#error_msg").append(", Username");
                            }
                            if (flag == 0) {
                                $("#error_msg").append("Username");
                                flag = 1;
                            }
                        } else if (obj.value[attr] == "First name cannot be blank." || obj.value[attr] == "First name is too long (maximum is 30 characters).") {
                            if (flag == 1) {
                                $("#error_msg").append(", First name (Max 30 characters)");
                            }
                            if (flag == 0) {
                                $("#error_msg").append("First name (Max 30 characters)");
                                flag = 1;
                            }
                        } else if (obj.value[attr] == "Last name cannot be blank." || obj.value[attr] == "Last name is too long (maximum is 30 characters).") {
                            if (flag == 1) {
                                $("#error_msg").append(", Last name (Max 30 characters)");
                            }
                            if (flag == 0) {
                                $("#error_msg").append("Last name (Max 30 characters)");
                                flag = 1;
                            }
                        } else if (obj.value[attr] == "Birth day cannot be blank.") {
                            if (flag == 1) {
                                $("#error_msg").append(", Birth day");
                            }
                            if (flag == 0) {
                                $("#error_msg").append("Birth day");
                                flag = 1;
                            }
                        } else if (obj.value[attr] == "Birth month cannot be blank.") {
                            if (flag == 1) {
                                $("#error_msg").append(", Birth month");
                            }
                            if (flag == 0) {
                                $("#error_msg").append("Birth month");
                                flag = 1;
                            }
                        } else if (obj.value[attr] == "Birth year cannot be blank.") {
                            if (flag == 1) {
                                $("#error_msg").append(", Birth year");
                            }
                            if (flag == 0) {
                                $("#error_msg").append("Birth year");
                                flag = 1;
                            }
                        } else if (obj.value[attr] == "Location cannot be blank." || obj.value[attr] == "Location is too long (maximum is 200 characters).") {
                            if (flag == 1) {
                                $("#error_msg").append(", Location (Max 200 characters)");
                            }
                            if (flag == 0) {
                                $("#error_msg").append("Location (Max 200 characters)");
                                flag = 1;
                            }
                        } else if (obj.value[attr] == "Email cannot be blank." || obj.value[attr] == "Email is not a valid email address.") {
                            if (flag == 1) {
                                $("#error_msg").append(", Email");
                            }
                            if (flag == 0) {
                                $("#error_msg").append("Email");
                                flag = 1;
                            }
                        } else if (obj.value[attr] == "Phone number cannot be blank." || obj.value[attr] == "Phone number must be a number.") {
                            if (flag == 1) {
                                $("#error_msg").append(", Phone number");
                            }
                            if (flag == 0) {
                                $("#error_msg").append("Phone number");
                                flag = 1;
                            }
                        }
                    }
                    //$("#webformForm_error").fadeIn();
                    $("#error_lbl").fadeIn();
                    $.unblockUI();
                } //else close
            } // success close
        });
        return false;
    });
    /****** poll daddy *******/
    window.pd_callback = function(json) {
        var obj = jQuery.parseJSON(json);
        if (obj.result == 'registered' || obj.result == 'already-registered') {
            // alert('Thank you for voting!');
            var form = $('#atn-plugin-form-polldaddy');
            form.attr('action', '/plugin/clickthrough/auth');
            form.attr('method', 'post');
            form.submit();
        }
    };

    /********** video *************/    
    $('body').delegate('#btnVideoButton', 'click', function() {
        var form = $('#atn-plugin-form-video');
        form.attr('action', '/plugin/clickthrough/auth');
        form.attr('method', 'post');
        form.submit();
    });
}); //document ready end