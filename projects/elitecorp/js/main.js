/*global $, jQuery, alert */

$(function () {
    'use strict';

    //#=== Start Slider ===
    var upperH = $(".upper-sec").innerHeight(),
        navH = $("nav").innerHeight(),
        winH = $(window).innerHeight();
    $('.slider,.carousel-item').innerHeight(winH - (upperH + navH));
    
    if ($(window).width() <= 576) {
        $('.slider,.carousel-item').css('height', '50vh');
    }


    //#Starr feature work
    $('.feat-work ul li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        var clss = $(this).data('class');

        if (clss === '.all') {
            $('.work-gallery .row > div').css('opacity', '1');
        } else {
            $('.work-gallery .row > div').css('opacity', '.2');
            $($(this).data('class')).css('opacity', '1');
        }

    });

    //Start Why Choose Us
    (function () {
        var contentH = $('.choose-us img').innerHeight();
        $('.choose-us .content').css({
            minHeight: contentH
        });
    }());
    
    /*$(window).resize(function () {
        var contentH = $('.choose-us .content').innerHeight();
        $('.choose-us img').css({
            height: contentH
        });
    });*/

}); //End Doc ready
