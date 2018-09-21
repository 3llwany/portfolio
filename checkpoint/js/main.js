/*global $, jQuery, alert, console*/

/*== Start NavBar == */
$(function () {
    'use strict';


    $("html, body").niceScroll({
        cursorcolor: "#095db7",
        cursorwidth: "6px",
        cursorborder: "1px solid #095db7",
        zindex: '500'
    });
    
    // sections under Navbar margin top
    (function () {
        var navH = $("header").innerHeight();
        $('.nav-mr-b').css('margin-top',  navH);
    }());
    
    
    // navbar links active
    $(".s-header-v2__nav-link").click(function (e) {
        /* e.preventDefault();*/
        var navHeight = $('nav').outerHeight() - 1,
            linkHref = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(linkHref).offset().top - navHeight
        }, 800);
    });

    $('.s-header-v2__nav-link').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });

    $(window).scroll(function () {
        // Start Add active linl duraing scroll
        var link = $('.s-header-v2__nav-link'),
            navHeight = $('nav').outerHeight(),
            scrollPos = $(this).scrollTop(),
            secOffset;

        link.each(function () {
            var secTop = $(this.hash);
            if (secTop.length) {
                secOffset = $(this.hash).offset().top - navHeight;
                if (secOffset <= scrollPos) {
                    $('.s-header-v2__nav-link').removeClass('active');
                    $(this).addClass('active');
                }
            }
        }); // End Add active linl duraing scroll
    }); //# end window scroll


    /* Element Height*/
    (function () {
        var navHeight = $('.navbar-fixed-top').innerHeight(),
            winH = $(window).innerHeight();
        $(".login, .pro, .devlop").css({
            'padding-top': navHeight + 50
        });
       
        
    }());


    $('.panel-title a').click(function () {
        if ($(this).hasClass('open')) {
            $('.panel-title a').removeClass('open');
            $(this).removeClass('open');
        } else {
            $('.panel-title a').removeClass('open');
            $(this).addClass('open');
        }
    });
    
    //Show panel scroll-X When Resize
    (function () {
        if ($(window).width() <= 1170) {
            $('.panel-body').css({
                overflowX: 'scroll',
                marginRight: '10px'
            });
        } else {
            $('.panel-body').css({
                overflow: 'visible',
                marginRight: '0px'
            });
        }
    }());
    
    $(window).resize(function () {
        if ($(window).width() <= 1170) {
            $('.panel-body').css({
                overflowX: 'scroll',
                marginRight: '10px'
            });
        } else {
            $('.panel-body').css({
                overflow: 'visible',
                marginRight: '0px'
            });
        }
    });
    
    

}); //# End Doc Ready
