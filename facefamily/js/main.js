/*global $, console, jQuery*/

jQuery(function ($) {
    "use strict";

    //$("html").niceScroll();
    $(".chat-page .person-list").niceScroll();

    // Toopltip 
    $('[data-toggle="tooltip"]').tooltip();


    /*==============================================================================================================*/
    /*======= Start Navbar ==========*/
    /* === Start Search Section ====*/
    /* $('.show_result').focusin(function () {
         $('.search .search_result').fadeIn();
     });*/





    $('.close_search_bdy').click(function () {
        $('.search .search_result').fadeOut();
        document.getElementById('form_search').reset();
        $('.search_result .body .person-info').remove();

    });





    /* $('.show_result').blur(function () {
         $('.search .search_result').fadeOut();     
     });*/

    $('.search .search_type button').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.search .search_result').show();
    });
    /* === End Search Section ====*/
    /*==============================================================================================================*/


    /*==============================================================================================================*/
    /*====== Start Feature Contactus Team Links Animation ========*/
    /* Start Navbar smoth scroll Class Active*/
    $(".link").click(function (e) {
        e.preventDefault;
        var navHeight = $('nav').outerHeight() - 1,
            linkHref = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(linkHref).offset().top - navHeight
        }, 800);
    });// End Function
    
    /*====== Endsmoth scroll ========*/
    /*======= End Navbar ==========*/
    
    /*==============================================================================================================*/

    /*==============================================================================================================*/
    /* Start Tema Model Content Close*/
    $(".team .modal-dialog i").click(function () {
        $(".team .modal").fadeOut();
        $("body .modal-backdrop").fadeOut();
        $("body").removeClass('modal-open');
        $("body").css('padding', "0");
    });
    /* End Tema Model Content Close*/
    /*==============================================================================================================*/


    /*==============================================================================================================*/


    $('.post .btns .textareaFocus').click(function () {
        $('.post textarea').select();
    });

    $('.post textarea').hover(function () {
        $(this).focus();
    }); /* End Post */

    /* Start Profile Members*/
    $('.members').click(function () {
        $('.member-sec').toggle();
        $('.add-post-profile').toggleClass('col-sm-offset-2');
    });
    /* End Profile Members*/
    /*==============================================================================================================*/


    //==============================================================================================================*/

    // Start Friends List and All People

    $('#allPeople').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.allusers .row > div').hide();
        var myClass = $(this).attr('data-class');
        $("." + myClass).show();
    });

    // My Frinds
    $('#myFrinds').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.allusers .row > div').hide();
        var myClass = $(this).attr('data-class');
        $("." + myClass).show();

    });
    //  Friends List and All People
    /*==============================================================================================================*/
    /*=========== Start Button Scrool Top =================*/
    $(".scroll-top").on("click", function () {
        $("html,body").animate({
            scrollTop: 0
        }, 600);
    });
    $(window).scroll(function () {

        if ($(this).scrollTop() >= 400) {
            $(".scroll-top").fadeIn().css("right", "10px");
        } else {
            $(".scroll-top").fadeOut().css("right", "-100px");
        }


        // Start Add active linl duraing scroll
        var link = $('.link'),
            navHeight = $('nav').outerHeight(),
            scrollPos = $(this).scrollTop();
        
        link.each(function () {
            var secTop = $(this.hash);
            if (secTop.length) {
                var secOffset = $(this.hash).offset().top - navHeight;
                if (secOffset <= scrollPos) {
                    $(this).parent().addClass('active');
                    $(this).parent().siblings().removeClass('active');
                }
            }

        }); // End Add active linl duraing scroll 



    });
    /*=========== End Button Scrool Top =================*/
    /*==============================================================================================================*/


    /*==============================================================================================================*/
    // Start send Message Button Disabled
    $('#sendMsg').prop('disabled', true);
    $('#msg').keyup(function () {
        $('#sendMsg').prop('disabled', this.value == "" ? true : false);
    });
    // End send Message Button Disabled
    /*==============================================================================================================*/


    /*==============================================================================================================*/
    // Start send Message Button Disabled
    $('#cahtMsg').prop('disabled', true);
    $('.msg-typing').keyup(function () {
        $('#chatMsg').prop('disabled', this.value == "" ? true : false);
    });
    // End send Message Button Disabled
    /*==============================================================================================================*/




    //Function to change Direction Of Textarea by selected language
    //=============================================================
    var arabicPattern = /[\u0600-\u06FF]/;
    $('textarea').bind('input propertychange', function (ev) {

        var text = ev.target.value;

        if (arabicPattern.test(text)) {
            // arabic;
            $('textarea').css('direction', 'rtl');
            $('.post-content').css('direction', 'rtl');

        } else {
            $('textarea').css('direction', 'ltr');
            $('.post-content').css('direction', 'rtl');
        }
    });



    //=============================================================
    $('input[type=text]').bind('input propertychange', function (ev) {

        var text = ev.target.value;

        if (arabicPattern.test(text)) {
            // arabic;
            $($(this)).css('direction', 'rtl');
        } else {
            $($(this)).css('direction', 'ltr');
        }
    });
    //=============================================================
    $('#lastName').bind('input propertychange', function (ev) {

        var text = ev.target.value;

        if (arabicPattern.test(text)) {
            // arabic;
            $('#lastName').css('direction', 'rtl');
        } else {
            $('#lastName').css('direction', 'ltr');
        }
    });
    //=============================================================





    var langarabic = /[\u0600-\u06FF]/;
    $('div').on('load', function (ev) {
        var text = ev.target.value;

        if (langarabic.test(text)) {
            // arabic;
            $('.post-content').css('text-align', 'right');
        } else {
            $('.post-content').css('text-align', 'left');
        }
    });

    /*==============================================================================================================*/
    /*=== Start Button Create Profile Disabeld if feild Empty ===*/


    $(function () {
        function submitState(el) {

            var $form = $(el),
                $requiredInputs = $form.find('input:required'),
                $submit = $('button[type="submit"]');

            $submit.attr('disabled', 'disabled');

            $requiredInputs.keyup(function () {

                $form.data('empty', 'false');

                $requiredInputs.each(function () {
                    if ($(this).val() === '') {
                        $form.data('empty', 'true');
                    }
                });

                if ($form.data('empty') === 'true') {
                    $submit.attr('disabled', 'disabled').attr('title', 'fill in all required fields');
                } else {
                    $submit.removeAttr('disabled').attr('title', 'click to submit');
                }
            });
        }

        // apply to each form element individually
        submitState('#form-profile');
        submitState('#formLogin');
    });






    /* ======= Start Validation ============*/

    // Create Profile
    // First Name
    $('#firstName').blur(function (e) {
        var firstName = $(this).val();
        firstName = firstName.replace(/[^a-zA-Z]/g, '');

        if (firstName.length == 0) {
            return true;
        } else if (firstName.length < 3) {
            $('#error').text('First Name must be at least 3 letters');
            $('#firstName').val('');
            $('#firstName').focus();
            $('#firstName').css({
                "border-color": '#fb0c17',
                "box-shadow": ' 0 1px 1px rgba(220, 41, 41, 0.6), 0 0 8px rgba(202, 20, 20, 0.6)'
            });
        } else if (firstName.length >= 3) {
            $('#error').text(' ');
            $('#firstName').css({
                "border-color": '#CCC',
                "box-shadow": 'none'
            });
        }
    });

    // Last Name
    $('#lastName').blur(function (e) {
        var lastName = $(this).val();
        lastName = lastName.replace(/[^a-zA-Z]/g, '');

        if (lastName.length == 0) {
            return true;
        } else if (lastName.length < 3) {
            $('#error').text('Last Name must be at least 3 letters');
            $('#lastName').val('');
            $('#lastName').focus();
            $('#lastName').css({
                "border-color": '#fb0c17',
                "box-shadow": ' 0 1px 1px rgba(220, 41, 41, 0.6), 0 0 8px rgba(202, 20, 20, 0.6)'
            });
        } else if (lastName.length >= 3) {
            $('#error').text(' ');
            $('#lastName').css({
                "border-color": '#CCC',
                "box-shadow": 'none'
            });
        }
    });

    // Email
    $('#email').blur(function (e) {
        var email = $(this).val();
        email = email.replace(/[^a-zA-Z][0-9\-\(\)\s]+/g, '');

        if (email.length == 0) {
            return true;
        } else if (email.length < 7) {
            $('#error').text('email must be at least 7 letters');
            $('#email').val('');
            $('#email').focus();
            $('#email').css({
                "border-color": '#fb0c17',
                "box-shadow": ' 0 1px 1px rgba(220, 41, 41, 0.6), 0 0 8px rgba(202, 20, 20, 0.6)'
            });
        } else if (email.length >= 7) {
            $('#error').text(' ');
            $('#email').css({
                "border-color": '#CCC',
                "box-shadow": 'none'
            });
        }
    });



    // Phone Number 
    $('#number').blur(function (e) {
        
        var number = $(this).val();
        number = number.replace(/[^0-9]/g, '');

        /*if (number.length ==0) {
            return true;
            
        } else*/
        if (number.length != 11) {
            $('#error').text('Please Enter Correct Number');
            $('#number').val('');
            $('#number').focus();
            $('#number').css({
                "border-color": '#fb0c17',
                "box-shadow": ' 0 1px 1px rgba(220, 41, 41, 0.6), 0 0 8px rgba(202, 20, 20, 0.6)'
            });
        } else if (number.length == 11) {
            $('#error').text(' ');
            $('#number').css({
                "border-color": '#CCC',
                "box-shadow": 'none'
            });
        }
    });

    // Password
    $('#password').blur(function (e) {
        var password = $(this).val();
        password = password.replace(/[^a-z][A-Z][0-9\-\(\)\s]+/g, '');

        if (password.length == 0) {
            return true;
        } else if (password.length < 8) {
            $('#error').text('Password must be at least 8 letters');
            $('#password').val('');
            $('#password').focus();
            $('#password').css({
                "border-color": '#fb0c17',
                "box-shadow": ' 0 1px 1px rgba(220, 41, 41, 0.6), 0 0 8px rgba(202, 20, 20, 0.6)'
            });
        } else if (password.length >= 8) {
            $('#error').text(' ');
            $('#password').css({
                "border-color": '#CCC',
                "box-shadow": 'none'
            });
        }
    });




    // Update Email
    $('#editemail').blur(function (e) {
        var email = $(this).val();
        email = email.replace(/[^a-zA-Z][0-9\-\(\)\s]+/g, '');

        if (email.length == 0) {
            return true;
        } else if (email.length < 7) {
            $('.mail-err').text('email must be at least 7 letters');
            $('#editemail').val('');
            $('#editemail').focus();
            $('#editemail').css({
                "border-color": '#fb0c17',
            });
        } else if (email.length >= 7) {
            $('.mail-err').text(' ');
            $('#editemail').css({
                "border-color": '#CCC',
            });
        }
    });



    // Add Post Validation
    $('#textPost').keyup(function () {
        if ($(this).val().length == 0) {
            $('#btnAddPost').attr('disabled', 'disabled');
        } else {
            $('#btnAddPost').attr('disabled', false);
        }
    });




    // Update Password Validation
    $('#editpassword').blur(function (e) {
        var upassword = $(this).val();
        upassword = upassword.replace(/[^a-z][A-Z][0-9\-\(\)\s]+/g, '');

        if (upassword.length == 0) {
            return true;
        } else if (upassword.length < 8) {
            $('.error-pass').text('Password must be at least 8 letters');
            $('#editpassword').val('');
            $('#editpassword').focus();
            $('#editpassword').css({
                "border-color": '#fb0c17',

            });
        } else if (upassword.length >= 8) {
            $('#editpassword').text(' ');
            $('#password').css({
                "border-color": '#CCC',
                "box-shadow": 'none'
            });
        }
    });

    /*
    $('#location').change(function() {
        // update disabled property
        $("#btnAddPost").prop('disabled', this.value == 1);
        // trigger change event to set initial value
      }).change();*/
    /* ======= End Validation ============*/





}); //End JQuery








/*==============================================================================================================*/
