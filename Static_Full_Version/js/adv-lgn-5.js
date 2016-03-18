var ADV_LGN = ADV_LGN || {};
var ADV_ValidationMessages = ADV_ValidationMessages || {};

ADV_LGN.chooseQuestion = function () {
    $('.select-button').click(function() {
      $('.questions').show();
    });
    $('.questions li').click(function() {
      var theText = $(this).text();
      $('.questions li').removeClass('selected');
      $(this).addClass('selected');
      $('.select-button').text(theText);
      $('.questions').hide();
      $('.custom-question').hide();
      $('.select-button, h1').animate({
                top: 0
        }, 200);
        $('.questions').animate({
                top: 44
        }, 200);
    });
    $('.questions li.create-own').click(function() {
      $('.select-button, h1').animate({
                top: -50
        }, 200);
        $('.questions').animate({
                top: -6
        }, 200);
      $('.custom-question').show();
    });
}();

ADV_LGN.centerer = function () {
    var windowHeight = $(window).height();
    var topMargin = (windowHeight / 2) - 175
    $('#container').css('margin-top', topMargin).fadeIn(600);
};
ADV_LGN.centerer();

//ADV_LGN.modalSizer = function () {
//    var windowHeight = $(window).height();
//    var modalHeight = windowHeight - 150
//    var scrollHeight = windowHeight - 205
//    $('.custom-modal .modal-body').css('height', modalHeight);
//    $('.custom-modal .modal-body .scrolltainer').css('height', scrollHeight);

//};
//ADV_LGN.modalSizer();

ADV_LGN.forgotPassword = function () {
   setTimeout(function () {
        $('#container .form-holder .forgot-password').fadeIn();
    }, 2000);
}();

ADV_LGN.mustAccept = function () {
    $('.form-holder').append('<div class="must-accept">' + ADV_ValidationMessages.MustAccept + '</div>')
}();

$(window).resize(function () {
    ADV_LGN.centerer();
    //ADV_LGN.modalSizer();
});

ADV_LGN.logoRandomizer = function () {
    if (ADV_IDM.investorMode != "True") {
        var classes = ['logo1', 'logo2', 'logo3', 'logo4'];
        var randomnumber = Math.floor(Math.random() * classes.length);
        $('#container .rotator:not(.hide-login)').addClass(classes[randomnumber]).hide().fadeIn();
    }
}();

ADV_LGN.iePlaceholder = function () {
   $('input[placeholder]').each(function () {
       var thePlaceholder = $(this).attr('placeholder');
       if ($(this).attr('id') == 'CustomQuestion') {
         $(this).parent().append('<span class="faux-placeholder hidden">'+thePlaceholder+'</span>');
         $(this).parent().append('<span class="close-question" title="' + ADV_ValidationMessages.BackToQuestions + '">X</span>');
      } else {
         $(this).parent().append('<span class="faux-placeholder">'+thePlaceholder+'</span>');
      }
      $(this).removeAttr('placeholder').addClass('pe-removed');
   });
    $(document).on('click touchstart', '.faux-placeholder', function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.handled != true) {
            $(this).parent().find('input').focus();
            $(this).addClass('focused');

            e.handled = true;
        } else {
            return false;
        }
    });
    $('input.pe-removed').keyup(function () {
      var thisVal = $(this).val();
      if (thisVal == '') {
         $(this).parent('span').find('.faux-placeholder').addClass('focused').show();
      } else {
         $(this).parent('span').find('.faux-placeholder').removeClass('focused').hide();
      }
        $(this).addClass('focused').removeClass('filled');
    });
} ();

ADV_LGN.formAnimations = function () {
   var $emailField = $('.custom-events input[type=email]');
   if ($emailField.val() != '') {
       $emailField.parent('span').find('.faux-placeholder').removeClass('focused').hide();
      $('.custom-events input[type=password]').focus();
   } else {
       $emailField.focus();
   }
    $('.custom-events input').keyup(function () {
        $(this).addClass('focused').removeClass('filled');
        if (!$('.form-holder').hasClass('swooped')) {
            doAnimations();
        }
    });
    $('.faux-placeholder').click(function () {
        if (!$('.form-holder').hasClass('swooped')) {
            doAnimations();
        }
    });
    $('input').blur(function () {
        $(this).removeClass('focused').addClass('filled');
        $(this).parent('span').find('.faux-placeholder').removeClass('focused');
    });
    var doAnimations = function () {
        if (ADV_IDM.investorMode != "True") {
            if (!('animationsDone' in ADV_LGN)) {
                ADV_LGN.animationsDone = true;
                $('.rotator').fadeOut(500);
                $('input').animate({
                    width: 270
                }, 500);
                $('.form-holder').animate({
                        right: 134,
                        width: 300
                    }, 500, function() {
                        $('#container .form-holder h1').fadeIn();
                        $('#container .form-holder form button').addClass('ready');
                    });
            }
        }
    };
} ();

ADV_LGN.inputClearMobile = function () {
    if (navigator.userAgent.match(/Android/i)
       || navigator.userAgent.match(/webOS/i)
       || navigator.userAgent.match(/iPhone/i)
       || navigator.userAgent.match(/iPad/i)
       || navigator.userAgent.match(/iPod/i)
       || navigator.userAgent.match(/BlackBerry/i)
       || navigator.userAgent.match(/Windows Phone/i)
   ) {
        $('input[type=email]').addClass('mobile-device');
    } else {
        return;
    }
    $('input.mobile-device').keyup(function () {
        $(this).parents('span.input-holder').append('<span class="clear-this">' + ADV_ValidationMessages.Clear + '</span>')
    });
    $('input.mobile-device').blur(function () {
        $(this).parents('span.input-holder').find('.clear-this').remove();
    });
    $(document).on('click touchstart', '.clear-this', function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.handled != true) {
            $(this).parents('span.input-holder').find('input').val('').focus();
            $('.clear-this').remove();

            e.handled = true;
        } else {
            return false;
        }
    });
}();

// panels!
ADV_LGN.showPanel = function ($sel) {
    var isNewlyShown = false;
    //alert($sel.hasClass('hide'));
    if ($sel.hasClass('hide')) {
        isNewlyShown = true;
        ADV_LGN.clearFormErrorState();  // clear error state if there is any from previous panel
        $('.panel').addClass('hide');   // hide all panels
        $sel.removeClass('hide');       // show target panel
    }
    return isNewlyShown;
};

// main login screen
ADV_LGN.backToMainLoginPanelSetup = function () {
    $('#CopyNumber').val('');
    $('.form-holder').removeClass('no-error single-field');
    $('.forgot-password').show();
};

// sometimes we have a primary panel. make it easy to show it if it is hidden!  used for error messages!
ADV_LGN.showPrimaryPanel = function () {
    var $primary = $('.panel.primary.hide');
    var isNewlyShown = false;
    if ($primary.length == 1) {
        isNewlyShown = ADV_LGN.showPanel($primary);
    }
    return isNewlyShown;
};

// set the cursor position or selection in an input field
$.fn.selectRange = function(start, end) {
    if(!end) end = start;
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

// based on firm_copy_number.html
ADV_LGN.showCopyNumber = function () {
   var $field = $('.firm-copy'),
    oldVal = $field.val();
    $field.focus().val('').val(oldVal);
    if ($('.form-holder form').valid() == true) {
        if (ADV_LGN.showPanel($('#CopyPanel'))) {
         var copyNumber = $('.hiddenfirmcopy').text();
         $field.val(copyNumber);
         $field.focus();
         if (copyNumber != '') {
             $field.parent('span').find('.faux-placeholder').removeClass('focused').hide();
            $field.selectRange(copyNumber.length);
         }
            $('.forgot-password').hide();
            $('.form-holder').addClass('swooped no-error single-field');
            $('#CopyNumber').rules('add', {
                required: true,
                digits: true,
                messages: {
                    required: ADV_ValidationMessages.EnterCopyNumber,
                }
            });
        }
    }
};

// hide copy number
/*
ADV_LGN.HideCopyNumber = function () {
    if ($('#CopyNumber').parent().css('display') != 'none') {
        $('.form-holder').removeClass('no-error single-field');
        $('#CopyNumber').parent().hide();

        $('#Email').parent().show();
        $('#Password').parent().show();
        $('.forgot-password').show();
    }
};
*/

ADV_LGN.clearFormErrorState = function () {
    $('button').removeClass('error');
    $('.form-holder input').removeClass('error');
    $('#Error').removeClass('true'); // hide error message too!
};

ADV_LGN.setFormErrorState = function () {
    $('button').addClass('error');
    $('.form-holder input').addClass('error');
};

// APR: this is latest that everthing should call when an error message needs to be shown!!!
ADV_LGN.showMessage = function (msg, isError) {
    $('#container .rotator').remove();  // needed because this could be evaluated in the middle of the animation
    ADV_LGN.showPrimaryPanel();

    if (typeof msg == 'object') {
        if ('Type' in msg) {
            isError = (msg.Type == 'Error') ? true : false;
            if (isError && 'Error' in msg) {
                msg = msg.Error;
            } else {
                if ('Message' in msg) {
                    msg = msg.Message;
                }
            }
        } else {
            // unknown object
            msg = 'Unexpected Error';
        }
    }

    if (typeof msg == 'undefined' || msg == null) {
        msg = 'Unexpected Error';
    }

    if (typeof isError == 'undefined') {
        isError = true;
    }

    var $err = $('#Error');
    if (isError) {
        $err.html($('<span></span>').text(msg));
    } else {
        $err.text(msg);
    }

    if (isError) {
        ADV_LGN.setFormErrorState();
    } else {
        ADV_LGN.clearFormErrorState();
    }

    $('.form-holder').removeClass('no-error').addClass('swooped');
    $('#Error').addClass('true');
};

// APR: this just shows the message as an error message if one is already there on load (success messages on load are not supported because they should only be shown during ajax ops - if at all!)
ADV_LGN.showMessageOnLoad = function () {
    var msg = $('#Error').text();

    if (msg != '') {
        ADV_LGN.showMessage(msg, true);
    }
};

// User is submitting the login form
ADV_LGN.OnFormSubmit = function OnFormSubmit() {
   var varLogin = $('#Email').val();
   var varPwd = $('#Password').val();
   var varCopyNumber = $('#CopyNumber').val();

    var paramList = {
        "login": varLogin,
        "password": varPwd,
        "copyNumber": varCopyNumber
    };

    var submitTo = ADV_IDM.baseUrl + 'Home/ValidateLoginWithAdvs/';

   // Execute the AJAX login request
   $.ajax({
      type: "POST",
      url: submitTo,
      data: JSON.stringify(paramList),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      async: true,
      cache: false,
      success: function (data) {
          if (data.Type == "CopyNumberRequired") {
              ADV_LGN.showCopyNumber();
          }
          else if (data.Type == "MFAEnrollmentRequired") {
              window.location = ADV_IDM.baseUrl + "mfa/enroll";
          }
          else if (data.Type == "MFAValidationRequired") {
              window.location = ADV_IDM.baseUrl + "mfa/verify";
          }
          else {
              ADV_LGN.ProcessLoginWorkflow(data);
          }
      },
      error: function (data) {
          ADV_LGN.backToMainLoginPanelSetup();
          ADV_LGN.showMessage(data);
      }
   });
};

// Process the AJAX return values and perform the required action
ADV_LGN.ProcessLoginWorkflow = function (jsonObj) {
    //console.log(jsonObj);
    if (jsonObj.Type == "Validation") {
        window.location = jsonObj.RedirectUrl;
   }
   else if (jsonObj.Type == "LegalDoc") {
      // Got a LegalDoc data package back
       ADV_LGN.ShowLegalDocs(jsonObj);
       $('.scrolltainer').scroll();
   }
   else if (jsonObj.Type == "OutageResponse") {
       // Got a OutageResponse data package back
       ADV_LGN.ShowOutageResponse(jsonObj);
   }
   else if (jsonObj.Type == "Logout") {

      // Loop through the array of LogoutUrls and load them in hidden iframes
      $.each(jsonObj.LogoutUrls, function (index, obj) {
         $('<iframe />', {
            style: 'visibility:hidden;display:none;',
            src: obj
         }).appendTo('body');
      });

      ADV_LGN.backToMainLoginPanelSetup();
        if(jsonObj.ShowLogoutMessage)
            ADV_LGN.showMessage(jsonObj.LogoutMessage, false);
   }
   else if (jsonObj.Type == "Error") {
       // Got an error message back
       ADV_LGN.backToMainLoginPanelSetup();
       ADV_LGN.showMessage(jsonObj);
   }
};

ADV_LGN.redButtonDefaults = function() {
    $('input').keypress(function () {
        redButton();
    });
    $('input').keyup(function () {
        redButton();
    });
    $('input').blur(function () {
        redButton();
    });
    $('input').focus(function () {
        redButton();
    });
    var redButton = function () {
        var errorCount = $('input.error').length;
        var validCount = $('input.valid').length;
        if (errorCount == 0) {
            $('button').removeClass('error');
        } else if (validCount == 2) {
            $('button').removeClass('error');
        } else {
            $('button').addClass('error');
        }
    }
};

ADV_LGN.OnFormResetPasswordChallengeSubmit = function () {
    var paramList = {
        "securityAnswer": $('#Answer').val(),
        "securityQuestion": $('#tSecurityQuestionHidden').val(),
        "passwordResetToken": $('#ResetToken').val(),
        "newPassword": $('#Password').val()
    };

    var submitTo = ADV_IDM.baseUrl + 'Service/ProcessPasswordResetChallenge/';

    $.ajax({
        type: "POST",
        url: submitTo,
        data: JSON.stringify(paramList),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            if (data == 'success') {
                ADV_LGN.showMessage(ADV_ValidationMessages.PasswordChanged, false);
                setTimeout(function () { window.location = ADV_IDM.baseUrl; }, 4000);
            } else {
                ADV_LGN.showMessage(data);
            }
        },
        error: function (data) {
            ADV_LGN.showMessage(data);
        }
    });
};

ADV_LGN.OnFormResetPasswordSubmit = function () {

    var varLogin = $('#Email').val();
    var varCopyNumber = $('#CopyNumber').val();

    var paramList = {
        "email": varLogin,
        "copynumber": varCopyNumber
    };

    //console.log(paramList);
    var submitTo = ADV_IDM.baseUrl + 'Service/ProcessEmailResetPassword/';

    $.ajax({
        type: "POST",
        url: submitTo,
        data: JSON.stringify(paramList),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            if (data.Type == "ShowCopyNumber") {
                ADV_LGN.showCopyNumber();
            }
            else {
                ADV_LGN.showMessage(data.Message, false);
                setTimeout(function () { window.location = ADV_IDM.baseUrl; }, 4000);
            }
        },
        error: function (data) {
            ADV_LGN.showMessage(data);
        }
    });
};

ADV_LGN.FixupSecurityQuestion = function () {
    // Fix the issue with selecting the first entry
    var $cQuestion = $('#CustomQuestion');
    if ($cQuestion.val() == '') {
        var $qSelect = $('#QuestionsSelect');
        $cQuestion.val($qSelect.find('option:selected').text());
    }
    if ($('#QuestionsSelect')[0].selectedIndex <= 0) {
        ADV_LGN.showMessage(ADV_ValidationMessages.EnterQuestion);
        return false;
    }
   return true;
};

ADV_LGN.OnChangeQuestionSubmit = function () {
    var answer = $('#Answer').val();

    if (!ADV_LGN.FixupSecurityQuestion()) return;

    if (answer && answer != '') {
        var paramList = {
            "password": $('#CurPassword').val(),
            "securityQuestion": $('#CustomQuestion').val(),
            "securityAnswer": answer
        };

        var submitTo = ADV_IDM.baseUrl + 'Service/ProcessSecurityQuestionChange/';

        // Execute the AJAX login request
        $.ajax({
            type: "POST",
            url: submitTo,
            data: JSON.stringify(paramList),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            success: function (data) {
                $("#CurPassword").val('');
                $("#Answer").val('');

                // trigger placeholder text to be displayed
                $('#CurPassword').keyup().blur();
                $('#Answer').keyup().blur();

                // clear validation messages
                $("#FormLogin").validate().resetForm();

               ADV_LGN.showMessage(data);
            },
            error: function (data) {
                $("#CurPassword").val('');
                $("#Answer").val('');

                // trigger placeholder text to be displayed
                $('#CurPassword').keyup().blur();
                $('#Answer').keyup().blur();

                // clear validation messages
                $("#FormLogin").validate().resetForm();

                ADV_LGN.showMessage(data);
            }
        });
    }
};

ADV_LGN.OnChangePasswordSubmit = function () {
    var paramList = {
        "currentPassword": $('#CurPassword').val(),
        "newPassword": $('#Password').val()
    };

    var submitTo = ADV_IDM.baseUrl + 'Service/ProcessPasswordChange/';

    // Execute the AJAX login request
    $.ajax({
        type: "POST",
        url: submitTo,
        data: JSON.stringify(paramList),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            // reset form fields
            $("#FormLogin")[0].reset();

            // trigger placeholder text to be displayed for all fields
            $('input.pe-removed').keyup().blur();

            // clear validation messages
            $("#FormLogin").validate().resetForm();

            ADV_LGN.showMessage(data);
        },
        error: function (data) {
            // YKM-245
            $("#FormLogin")[0].reset();

            // trigger placeholder text to be displayed for all fields
            $('input.pe-removed').keyup().blur();

            // clear validation messages
            $("#FormLogin").validate().resetForm();

            ADV_LGN.showMessage(data);
        }
    });
};

ADV_LGN.setupQuestionSelect = function () {
    // setup question dropdown
    var $qSelect = $('#QuestionsSelect');
    $qSelect.customSelect();
    $qSelect.css('width','auto');
    $qSelect.change(function () {
        var $cQuestion = $('#CustomQuestion');
        if (this.selectedIndex == (this.options.length - 1)) {
            $(this).hide();
            $('.customSelect').hide();
         $('.faux-placeholder.hidden').show();
         $('.close-question').show();
            $cQuestion.val('');
            $cQuestion.show();

            $cQuestion.rules('add', {
                required: true,
                messages: {
                    required: ADV_ValidationMessages.EnterQuestion,
                }
            });
        } else {
            $cQuestion.val($(this).find('option:selected').text());
        }
    });

    //setTimeout(function () {
    //    $('#Answer').rules('add', {
    //        required: true,
    //        messages: {
    //            required: ADV_ValidationMessages.EnterAnswer,
    //        }
    //    });
    //}, 300);
};
ADV_LGN.goBackToDropdown = function () {
   $(document).on('click', '.close-question', function () {
      $('#QuestionsSelect').show().prop('selectedIndex', 0);
      ADV_LGN.setupQuestionSelect();
      $('.customSelect').show().removeClass('customSelectChanged');
      $('.custom-question').hide();
      $('.faux-placeholder.hidden').hide();
      $(this).hide();
    });
}();

//ADV_LGN.acceptLegal = function () {
// $('.scrolltainer').scroll(function() {
//        if (isScrollBottom()) {
//            $('.acceptedlegal').removeClass('disabled');
//            $('.acceptedlegal').removeAttr('disabled');
//        } else {
//        }
//    });
//    function isScrollBottom() {
//        var elementHeight = $('.scrolltainer')[0].scrollHeight;
//        var scrollPosition = Math.floor($('.scrolltainer').height()) + $('.scrolltainer').scrollTop();
//        return (elementHeight == scrollPosition);
//    };
//}();

ADV_LGN.OnFormUserSetupSubmit = function () {
    if ($('#QuestionPanel').css('display') == 'none') {
        $('#ConfirmPanel').hide();
        $('#QuestionPanel').show();

        ADV_LGN.setupQuestionSelect();
    } else {
        var answer = $('#Answer').val();


        if (answer && answer != '' && !('doneChanging' in ADV_LGN)) {

            if (!ADV_LGN.FixupSecurityQuestion()) return;

            var paramList = {
                "password": $('#Password').val(),
                "securityQuestion": $('#CustomQuestion').val(),
                "securityAnswer": answer,
                "passwordResetToken": $('#ResetToken').val()
            };

            var submitTo = ADV_IDM.baseUrl + 'Service/UserSetupPostData/';

            //console.log(paramList);
            //return false;

            $.ajax({
                type: "POST",
                url: submitTo,
                data: JSON.stringify(paramList),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                cache: false,
                success: function (data) {
                    ADV_LGN.doneChanging = true;
                    if (data == 'success') {
                        window.location = ADV_IDM.baseUrl;
                    } else {
                        window.location = ADV_IDM.baseUrl + 'Service/UserSetup/?t=' + encodeURIComponent($('#ResetToken').val()) + '&err=' + encodeURIComponent(data);
                    }
                    return false;
                    //ProcessPasswordResetControls(data);
                },
                error: function (data) {
                    if (!('doneChanging' in ADV_LGN)) {
                        ADV_LGN.showMessage(data);
                    }
                }
            });
        }
    }
    return false;
};

// Service/ChangeQuestion page
ADV_LGN.setChangeQuestionSetupDefaults = function () {
    jQuery.validator.setDefaults({
        success: "valid"
    });
    jQuery.validator.addMethod("caps", function(value, element) {
      return this.optional(element) || /[A-Z]/.test(value);
   });
   jQuery.validator.addMethod("lowercase", function(value, element) {
      return this.optional(element) || /[a-z]/.test(value);
   });
   jQuery.validator.addMethod("digitz", function(value, element) {
      return this.optional(element) || /[0-9]/.test(value);
   });
    var form = $('.form-holder form');
    form.validate({
        rules: {
            CurPassword: {
                required: true,
                minlength: 8,
                caps: true,
                lowercase: true,
                digitz: true
            },
            Answer: {
                required: true,
                minlength: 4
            }
        },
        messages: {
            CurPassword: ADV_ValidationMessages.RequiredField,
            Answer: ADV_ValidationMessages.PasswordEnterMinChars
        }
    });

    ADV_LGN.setupQuestionSelect();

    $('form').submit(function (e) {
        if (form.valid() == true) {
            var theForm = this;
            e.preventDefault();

            ADV_LGN.OnChangeQuestionSubmit();
        }
    });

    ADV_LGN.redButtonDefaults();

    ADV_LGN.showMessageOnLoad();
};

// Service/ChangePassword page
ADV_LGN.setChangePasswordSetupDefaults = function () {
    jQuery.validator.setDefaults({
        success: "valid"
    });
    jQuery.validator.addMethod("caps", function(value, element) {
      return this.optional(element) || /[A-Z]/.test(value);
   });
   jQuery.validator.addMethod("lowercase", function(value, element) {
      return this.optional(element) || /[a-z]/.test(value);
   });
   jQuery.validator.addMethod("digitz", function(value, element) {
      return this.optional(element) || /[0-9]/.test(value);
   });
   jQuery.validator.addMethod("loginpartofpwd", function (value) {
       var curlogin = $('#CurrentLogin').val();
       var a = curlogin.split(/[^\w]/);
       for (var i = 0; i < a.length; i++) {
           if (value.toLowerCase().indexOf(a[i].toLowerCase()) >= 0) {
               return false;
           }
       }
       return true;
   });

    var form = $('.form-holder form');
    form.validate({
        rules: {
            CurPassword: {
                required: true,
                minlength: 8,
                caps: true,
                lowercase: true,
                digitz: true
            },
            Password: {
                required: true,
                minlength: 8,
                caps: true,
                lowercase: true,
                digitz: true,
                loginpartofpwd: true
            },
            PasswordConfirm: {
                equalTo: "#Password"
            }
        },
        messages: {
            CurPassword: ADV_ValidationMessages.RequiredField,
            Password: ADV_ValidationMessages.PasswordReqs,
            PasswordConfirm: ADV_ValidationMessages.PasswordsMustMatch
        }
    });

    $('form').submit(function (e) {
        if (form.valid() == true) {
            var theForm = this;
            e.preventDefault();

            ADV_LGN.OnChangePasswordSubmit();
        }
    });

    ADV_LGN.redButtonDefaults();

    ADV_LGN.showMessageOnLoad();
};

ADV_LGN.setUserSetupDefaults = function () {
    jQuery.validator.setDefaults({
        success: "valid"
    });
    jQuery.validator.addMethod("caps", function(value, element) {
      return this.optional(element) || /[A-Z]/.test(value);
   });
   jQuery.validator.addMethod("lowercase", function(value, element) {
      return this.optional(element) || /[a-z]/.test(value);
   });
   jQuery.validator.addMethod("digitz", function(value, element) {
      return this.optional(element) || /[0-9]/.test(value);
   });
    jQuery.validator.addMethod("loginpartofpwd", function(value) {
        var curlogin = $('#CurrentLogin').val();
        var a = curlogin.split(/[^\w]/);
        for (var i = 0; i < a.length; i++) {
            if (value.toLowerCase().indexOf(a[i].toLowerCase()) >= 0) {
                return false;
            }
        }
        return true;
   });

    var form = $('.form-holder form');
    form.validate({
        rules: {
            Password: {
                required: true,
                minlength: 8,
                caps: true,
                lowercase: true,
                digitz: true,
                loginpartofpwd: true
            },
            PasswordConfirm: {
                equalTo: "#Password"
            },
            Answer: {
                required: true,
                minlength: 4
            }
        },
        messages: {
            Password: ADV_ValidationMessages.PasswordReqs,
            PasswordConfirm: ADV_ValidationMessages.PasswordsMustMatch,
            Answer: ADV_ValidationMessages.PasswordEnterMinChars
        }
    });

    $('form').submit(function (e) {
        if (form.valid() == true) {
            var theForm = this;
            e.preventDefault();

            ADV_LGN.OnFormUserSetupSubmit();
        }
    });

    ADV_LGN.redButtonDefaults();

    ADV_LGN.showMessageOnLoad();

    //$(document).on('click', '.next', function () {
    //    if ($('.form-holder form').valid()) {

    //        ADV_LGN.OnFormUserSetupSubmit();
    //    }
    //});
};


ADV_LGN.setResetPasswordDefaults = function () {
    jQuery.validator.setDefaults({
        success: "valid"
    });
    jQuery.validator.addMethod("caps", function(value, element) {
      return this.optional(element) || /[A-Z]/.test(value);
   });
   jQuery.validator.addMethod("lowercase", function(value, element) {
      return this.optional(element) || /[a-z]/.test(value);
   });
   jQuery.validator.addMethod("digitz", function(value, element) {
      return this.optional(element) || /[0-9]/.test(value);
   });
   jQuery.validator.addMethod("loginpartofpwd", function (value) {
       var curlogin = $('#CurrentLogin').val();
       var a = curlogin.split(/[^\w]/);
       for (var i = 0; i < a.length; i++) {
           if (value.toLowerCase().indexOf(a[i].toLowerCase()) >= 0) {
               return false;
           }
       }
       return true;
   });

    var form = $('.form-holder form');
    var mode = $('#hMode').val();

    if (mode == 'email') {
        form.validate({
            rules: {
                Email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                Email: ADV_ValidationMessages.ValidEmail
            }
        });

        $('form').submit(function (e) {
            if (form.valid() == true) {
                var theForm = this;
                e.preventDefault();

                ADV_LGN.OnFormResetPasswordSubmit();
            }
        });
    } else {
        $('.form-holder h2').text($('#tSecurityQuestionHidden').val());

        $('#EmailPanel').addClass('hide');
        $('#AnswerPanel').removeClass('hide');
        $('#container .form-holder').removeClass('single-field').addClass('three-fields');

        form.validate({
            rules: {
                Answer: {
                    required: true
                },
                Password: {
                    required: true,
                    minlength: 8,
                    caps: true,
                    lowercase: true,
                    digitz: true,
                    loginpartofpwd: true
                },
                PasswordConfirm: {
                    equalTo: "#Password"
                }
            },
            messages: {
                Answer: ADV_ValidationMessages.EnterAnswer,
                Password: ADV_ValidationMessages.PasswordReqs,
                PasswordConfirm: ADV_ValidationMessages.PasswordsMustMatch
            }
        });

        $('form').submit(function (e) {
            if (form.valid() == true) {
                var theForm = this;
                e.preventDefault();

                ADV_LGN.OnFormResetPasswordChallengeSubmit();
            }
        });
    }

    ADV_LGN.redButtonDefaults();

    ADV_LGN.showMessageOnLoad();
};

ADV_LGN.setLoginDefaults = function () {

    jQuery.validator.setDefaults({
        success: "valid"
    });
    var form = $('.form-holder form');
    form.validate({
        rules: {
            Email: {
                required: true,
                email: true
            },
            Password: {
                required: true
            }
        },
        messages: {
            Email: ADV_ValidationMessages.ValidEmail,
            Password: ADV_ValidationMessages.PasswordBlank
        }
    });

    $('form').submit(function (e) {
        if (form.valid() == true) {
            var theForm = this;
            e.preventDefault();
            ADV_LGN.OnFormSubmit();
        }
    });

    ADV_LGN.redButtonDefaults();

    ADV_LGN.showMessageOnLoad();

    // Check for OnLoad JSON
    var jsonStr = $('#hiOnLoadJson').val();
    if (jsonStr && jsonStr.length > 0) {
        var json = jQuery.parseJSON(jsonStr);
        ADV_LGN.ProcessLoginWorkflow(json);
    }
};

ADV_LGN.ShowOutageResponse = function (outageResponse) {

    var $lDoc = $('.custom-outage');
    var $mBody = $lDoc.find('.modal-body .tos-text');
    $mBody.html('');
    $mBody.append(outageResponse.OutageMessage);
    $(".modal-body .tos-text p:contains('Printable')").addClass('printable');
    $lDoc.fadeIn();
    $('.scrolltainer').animate({ scrollTop: 0 }, 0);
    $('.tos-buttons .close-this').focus();


    // close
    $('.tos-buttons .close-this').click(function () {
        // Execute AJAX call to update the status
        var submitTo = ADV_IDM.baseUrl + 'Home/ViewOutageNotification/';

        $.ajax({
            type: "POST",
            url: submitTo,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            success: function (data) {
                ADV_LGN.ProcessLoginWorkflow(data);
            },
            error: function (data) {
                ADV_LGN.backToMainLoginPanelSetup();
                ADV_LGN.showMessage(data);
            }
        });
        $('.custom-modal').fadeOut();
        $('.acceptedlegal').addClass('disabled');
        $('.acceptedlegal').attr('disabled', true);

        return false;
    });
};

ADV_LGN.InitLegalDoc = function () {

    // close
    $('.tos-buttons .close-this').click(function () {
        $('.must-accept').show();
        $('.custom-modal').fadeOut();
        $('.acceptedlegal').addClass('disabled');
        $('.acceptedlegal').attr('disabled', true);
        return false;
    });

    $(document).on('click', '.custom-modal .modal-body .acceptedlegal', function () {

        // Execute AJAX call to update the status
        var paramList = {
            "legalDocs": ADV_LGN.LegalDocsToAccept
        };

        var submitTo = ADV_IDM.baseUrl + 'Home/AcceptLegalDocs/';

        $.ajax({
            type: "POST",
            url: submitTo,
            data: JSON.stringify(paramList),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            success: function (data) {
                ADV_LGN.ProcessLoginWorkflow(data);
            },
            error: function (data) {
                ADV_LGN.backToMainLoginPanelSetup();
                ADV_LGN.showMessage(data);
            }
        });
        $('.must-accept').hide();
        $('.custom-modal').fadeOut();
        $('.acceptedlegal').addClass('disabled');
        $('.acceptedlegal').attr('disabled', true);

        return false;
    });

    // checkbox
    $(document).on('click', '#AcceptLegal', function () {
        //$('.custom-modal').fadeOut();
        if ($(this).is(':checked'));

    });
};

ADV_LGN.InitLegalDoc();

// User must agree to legal docs
ADV_LGN.ShowLegalDocs = function (legalDocObj) {
    var legalDocs = legalDocObj.LegalDocs;
    ADV_LGN.LegalDocsToAccept = legalDocs;
    ADV_LGN.DownloadedLegalDocs = [];

    var $lDoc = $('.custom-modal');
    var $mBody = $lDoc.find('.modal-body .tos-text');
    $mBody.html('');
    for (var i = 0; i < legalDocs.length; i++) {
        $mBody.append('<p><a href="#" onclick="ADV_LGN.DownloadLegalDoc(' + i + ')"> ' + legalDocs[i].LegalDocTypeName + '</a></p>');
        ADV_LGN.DownloadedLegalDocs[i] = false;
    }
    $lDoc.fadeIn();
};

ADV_LGN.DownloadLegalDoc = function (legalDocIndex) {
    var legalDocs = ADV_LGN.LegalDocsToAccept;
    var legalDocUrl = ADV_IDM.baseUrl + 'Terms/File/' + legalDocs[legalDocIndex].FileStorageID;

    // workaround for safari - window.open does not work when in standalone app mode
    if (("standalone" in window.navigator) && window.navigator.standalone) {
        var a = document.createElement("a");
        a.setAttribute('href', legalDocUrl);
        a.setAttribute('target', '_blank');
        a.click();
    }
    else
        window.open(legalDocUrl, '_blank');

    // mark a flag that indicates the file has been downloaded
    ADV_LGN.DownloadedLegalDocs[legalDocIndex] = true;

    var allDownloaded = true;
    for (var i = 0; i < legalDocs.length; i++) {
        if (!ADV_LGN.DownloadedLegalDocs[i])
            allDownloaded = false;
    }

    if (allDownloaded) {
        $('.acceptedlegal').removeClass('disabled');
        $('.acceptedlegal').removeAttr('disabled');
    }

    return false;
};

// ************************************************************
// OAuth2
// ************************************************************

ADV_LGN.SetOAuth2AuthorizeInitDefaults = function () {

    $('.form-holder form button').focus();

    $('form').submit(function (e) {
        var theForm = this;
        e.preventDefault();
        ADV_LGN.OAuth2AuthorizeInitSubmit();
    });
};

ADV_LGN.OAuth2AuthorizeInitSubmit = function () {
    var paramList = {
    };

    var submitTo = ADV_IDM.baseUrl + 'OAuth2/Authorize_Submit/'

    $.ajax({
        type: "POST",
        url: submitTo,
        data: JSON.stringify(paramList),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            if (data.Type == "Success") {
                window.location = data.RedirectUrl;
            } else {
                ADV_LGN.showMessage(data);
            }
        },
        error: function (data) {
            ADV_LGN.showMessage(data);
        }
    });
};

// ************************************************************
// Multi Factor Authentication
// ************************************************************

ADV_LGN.MFAEnrollCompleted = function () {
    setTimeout(function () { window.location = ADV_IDM.baseUrl; }, 4000);
};

ADV_LGN.VerificationCodeFocus = function() {
    $("#VerificationCode").focus();
    $(".input-holder .faux-placeholder").addClass("focused");
}

ADV_LGN.VerificationCodeError = function(data) {
  ADV_LGN.VerificationCodeFocus();
  $('#VerificationCode').val('');
  ADV_LGN.showMessage(data);
  return false;
}

ADV_LGN.SetVerificationCodeRules = function (form) {
    form.validate({
        rules: {
            VerificationCode: {
                required: true,
                digits: true,
                minlength: 6,
                maxlength: 6
            }
        },
        messages: {
            VerificationCode: ADV_ValidationMessages.VerificationCode
        }
    });
}

ADV_LGN.SetSMSResendTimer = function() {

   // Resend SMS link should show in 30 seconds
   setTimeout(function () {
      $('#ResendSMS').fadeIn();
   }, 30000);

};

ADV_LGN.EnrollCancel = function() {

      var paramList = {
     };

      var submitTo = ADV_IDM.baseUrl + 'MFA/Enroll_Cancel/';

    $.ajax({
        type: "POST",
        url: submitTo,
        data: JSON.stringify(paramList),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            if (data.Type == "MFASuccess") {
                window.location = data.RedirectUrl;
            } else {
                ADV_LGN.showMessage(data);
            }
        },
        error: function (data) {
            ADV_LGN.showMessage(data);
        }
    });
};


// MFA Enroll Factor Choice

ADV_LGN.setMFAChoiceDefaults = function () {

    $("#mfa-choice-google-auth").click(function () {
      ADV_LGN.OnFormMFAChoiceSubmit('GoogleAuthenticator');
   });

    $("#mfa-choice-sms").click(function () {
      ADV_LGN.OnFormMFAChoiceSubmit('SMS');
   });
};

ADV_LGN.OnFormMFAChoiceSubmit = function (val) {

    var paramList = {
        "SelectFactor": val
    };

    var submitTo = ADV_IDM.baseUrl + 'MFA/Enroll/';

    $.ajax({
        type: "POST",
        url: submitTo,
        data: JSON.stringify(paramList),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            if (data.Type == "MFASuccess") {
                window.location = data.RedirectUrl;
            } else {
                ADV_LGN.showMessage(data);
            }
        },
        error: function (data) {
            ADV_LGN.showMessage(data);
        }
    });
};

// MFA Enroll Google Authenticator Init

ADV_LGN.SetEnrollGoogleAuthenticatorInitDefaults = function () {

    $('.form-holder form button').focus();

    $('form').submit(function (e) {
        var theForm = this;
        e.preventDefault();
        ADV_LGN.EnrollGoogleAuthenticatorInitSubmit();
    });
};

ADV_LGN.EnrollGoogleAuthenticatorInitSubmit = function () {

    var submitTo = ADV_IDM.baseUrl + 'MFA/Enroll_GoogleAuthenticator/';

    $.ajax({
        type: "POST",
        url: submitTo,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            if (data.Type == "MFASuccess") {
                window.location = data.RedirectUrl;
            } else {
                ADV_LGN.showMessage(data);
            }
        },
        error: function (data) {
            ADV_LGN.showMessage(data);
        }
    });
};

// MFA Enroll TOTP

ADV_LGN.SetEnrollTOTPDefaults = function () {

    ADV_LGN.VerificationCodeFocus();

    var form = $('.form-holder form');
    jQuery.validator.setDefaults({
        success: "valid"
    });

    $('.qrcode-image').fadeIn(1000);

    ADV_LGN.redButtonDefaults();
    ADV_LGN.SetVerificationCodeRules(form);

    $('form').submit(function (e) {
        if (form.valid() == true) {
            var theForm = this;
            e.preventDefault();
            ADV_LGN.OnFormEnrollTOTPSubmit();
        }
    });
};

ADV_LGN.OnFormEnrollTOTPSubmit = function () {

    var paramList = {
        "VerificationCode": $('#VerificationCode').val()
    };

    var submitTo = ADV_IDM.baseUrl + 'MFA/Enroll_TOTP_Activate/';
    $.ajax({
        type: "POST",
        url: submitTo,
        data: JSON.stringify(paramList),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            if (data.Type == "MFASuccess") {
                window.location = data.RedirectUrl;
            } else {
                return ADV_LGN.VerificationCodeError(data);
            }
        },
        error: function (data) {
            ADV_LGN.showMessage(data);
        }
    });

};

// MFA Enroll SMS

ADV_LGN.SetEnrollSMSDefaults = function () {

    setTimeout(function() {
        $("#SMSPhoneNumber").focus();
    }, 0);

    jQuery.validator.setDefaults({
        success: "valid"
    });

    jQuery.validator.addMethod("validsmsnumber", function (value) {
        var isValid = $("#SMSPhoneNumber").intlTelInput("isValidNumber");
        return isValid;
    });

    ADV_LGN.redButtonDefaults();

    var form = $('.form-holder form');

    form.validate({
        onfocusout: false,
        rules: {
            SMSPhoneNumber: {
                required: true,
                validsmsnumber: true
            }
        },
        messages: {
            SMSPhoneNumber: ADV_ValidationMessages.ValidPhone,
        }
    });

    $('form').submit(function (e) {
        if (form.valid() == true) {
            var theForm = this;
            e.preventDefault();
            ADV_LGN.OnFormEnrollSMSSubmit();
        }
    });
};

ADV_LGN.OnFormEnrollSMSSubmit = function () {

    if ($("#SMSPhoneNumber").val() != "") {
        var paramList = {
            "SMSPhoneNumber": $("#SMSPhoneNumber").val()
        };

        var submitTo = ADV_IDM.baseUrl + 'MFA/Enroll_SMS/';
        $.ajax({
            type: "POST",
            url: submitTo,
            data: JSON.stringify(paramList),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            success: function(data) {
                if (data.Type == "MFASuccess") {
                    window.location = data.RedirectUrl;
                } else {
                    ADV_LGN.showMessage(data);
                }
            },
            error: function(data) {
                ADV_LGN.showMessage(data);
            }
        });
    }
};


// MFA Enroll SMS Activate

ADV_LGN.setEnrollSMSActivateDefaults = function () {

    ADV_LGN.VerificationCodeFocus();

    var form = $('.form-holder form');
    jQuery.validator.setDefaults({
        success: "valid"
    });

    ADV_LGN.redButtonDefaults();
    ADV_LGN.SetVerificationCodeRules(form);

    $('form').submit(function (e) {
        if (form.valid() == true) {
            var theForm = this;
            e.preventDefault();
            ADV_LGN.OnFormEnrollSMSActivateSubmit();
        }

    });

    ADV_LGN.showMessageOnLoad();

    ADV_LGN.SetSMSResendTimer();
};

ADV_LGN.OnFormEnrollSMSActivateSubmit = function () {

    var paramList = {
        "VerificationCode": $('#VerificationCode').val()
    };

    var submitTo = ADV_IDM.baseUrl + 'MFA/Enroll_SMS_Activate/';

    $.ajax({
        type: "POST",
        url: submitTo,
        data: JSON.stringify(paramList),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            if (data.Type == "MFASuccess") {
                  window.location = data.RedirectUrl;
            } else {
                return ADV_LGN.VerificationCodeError(data);
            }
        },
        error: function (data) {
            ADV_LGN.showMessage(data, true);
        }
    });
};

ADV_LGN.ResendEnrollSMS = function () {

    $('#ResendSMS').fadeOut();

    var submitTo = ADV_IDM.baseUrl + 'MFA/enroll_sms_resend/';

    $.ajax({
        type: "POST",
        url: submitTo,
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            if (data.Type == "MFASuccess") {
                ADV_LGN.SetSMSResendTimer();
            } else {
                ADV_LGN.showMessage(data);
                return false;
            }
        },
        error: function (data) {
            ADV_LGN.showMessage(data, true);
        }
    });
}

// MFA Verify SMS

ADV_LGN.setMFAVerifySMSDefaults = function(sent) {
   $('#VerifySMSSendButton').focus();

      var form = $('#VerifySMSSubmitForm');
    jQuery.validator.setDefaults({
        success: "valid"
    });

    ADV_LGN.redButtonDefaults();
    ADV_LGN.SetVerificationCodeRules(form);

    form.submit(function (e) {
        if (form.valid() == true) {
            var theForm = this;
            e.preventDefault();
            ADV_LGN.OnFormVerifySMSChallengeSubmit();
        }
    });

    ADV_LGN.showMessageOnLoad();

    if (sent == "True") {
        ADV_LGN.VerifySMSDisableSendPanel();
        ADV_LGN.OnVerifySMSSendCompleted();
    }
};

ADV_LGN.VerifySMSDisableSendPanel = function () {
    $('#VerifySMSSendPanel').addClass('disabled');
    $('#VerifySMSSendButton').prop('disabled', true);
};

ADV_LGN.OnVerifySMSSendReset = function() {

   $('#VerifySMSSendButton').text('SEND VERIFICATION CODE');

   // Enable the send panel
   $('#VerifySMSSendPanel').removeClass('disabled');
   $('#VerifySMSSendButton').prop('disabled', false);
};

ADV_LGN.OnVerifySMSSend = function() {

   $('#VerifySMSSendButton').text('SENDING');

   // Disable the send panel
   ADV_LGN.VerifySMSDisableSendPanel();

   var paramList = {
  };

  var submitTo = ADV_IDM.baseUrl + 'MFA/verify_sms_send/';

  $.ajax({
      type: "POST",
      url: submitTo,
      data: JSON.stringify(paramList),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      async: true,
      cache: false,
      success: function (data) {
          if (data.Type == "MFASuccess") {
              if (data.RedirectUrl != "")
                  window.location = data.RedirectUrl;
              else
                ADV_LGN.OnVerifySMSSendCompleted();
          } else {
              ADV_LGN.OnVerifySMSSendReset();
              ADV_LGN.showMessage(data);
              return false;
          }
      },
      error: function (data) {
          ADV_LGN.showMessage(data, true);
      }
  });
};

ADV_LGN.OnVerifySMSSendCompleted = function() {
   $('#VerifySMSSendButton').text('VERIFICATION CODE SENT');

   ADV_LGN.SetSMSResendTimer();

    // Enable the verification panel
   $('#VerifySMSSubmitPanel').removeClass('disabled');
   $('.input-holder').removeClass('disabled');
   $('#VerificationCode').prop('disabled', false);
   $('#VerifySMSSubmitButton').prop('disabled', false);

   // Set focus
   ADV_LGN.VerificationCodeFocus();
};

ADV_LGN.OnFormVerifySMSChallengeSubmit = function() {

    var paramList = {
        "VerificationCode": $('#VerificationCode').val()
    };

    var submitTo = ADV_IDM.baseUrl + 'MFA/verify_sms_challenge/';

    $.ajax({
        type: "POST",
        url: submitTo,
        data: JSON.stringify(paramList),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            if (data.Type == "MFASuccess") {
                window.location = data.RedirectUrl;
            } else {
                return ADV_LGN.VerificationCodeError(data);
            }
        },
        error: function (data) {
            ADV_LGN.showMessage(data, true);
        }
    });
};

ADV_LGN.ResendVerifySMS = function () {

   $('#ResendSMS').fadeOut();

  var submitTo = ADV_IDM.baseUrl + 'MFA/verify_sms_resend/';

  $.ajax({
      type: "POST",
      url: submitTo,
      data: "",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      async: true,
      cache: false,
      success: function (data) {
          if (data.Type == "MFASuccess") {
              if (data.RedirectUrl != "")
                  window.location = data.RedirectUrl;
              else
                  ADV_LGN.SetSMSResendTimer();
          } else {
              ADV_LGN.showMessage(data);
              return false;
          }
      },
      error: function (data) {
          ADV_LGN.showMessage(data, true);
      }
  });
};

// MFA Verify TOTP Challenge

ADV_LGN.setVerifyTOTPChallengeDefaults = function () {

    ADV_LGN.VerificationCodeFocus();

    var form = $('.form-holder form');
    jQuery.validator.setDefaults({
        success: "valid"
    });

    ADV_LGN.redButtonDefaults();
    ADV_LGN.SetVerificationCodeRules(form);

    $('form').submit(function (e) {
        if (form.valid() == true) {
            var theForm = this;
            e.preventDefault();
            ADV_LGN.OnFormVerifyTOTPChallengeSubmit();
        }
    });

    ADV_LGN.showMessageOnLoad();
};

ADV_LGN.OnFormVerifyTOTPChallengeSubmit = function () {

    var paramList = {
        "VerificationCode": $('#VerificationCode').val()
    };

    var submitTo = ADV_IDM.baseUrl + 'MFA/Verify_TOTP/';
    $.ajax({
        type: "POST",
        url: submitTo,
        data: JSON.stringify(paramList),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            if (data.Type == "MFASuccess") {
                window.location = data.RedirectUrl;
            } else {
                return ADV_LGN.VerificationCodeError(data);
            }
        },
        error: function (data) {
            ADV_LGN.showMessage(data);
        }
    });
};
