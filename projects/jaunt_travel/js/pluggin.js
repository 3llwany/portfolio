/*global $, console, alert */

$(document).ready(function () {
    "use strict";
    /* Start function to make Navbar Fixed */
    $(function () {
        var nav = $(".nav-fixed"),
            beforeNav = $(".slider").height();
        $(window).scroll(function () {
            var scrollHeight = $(window).scrollTop();
            if (scrollHeight >= beforeNav) {
                nav.addClass("navbar-fixed-top");
            } else {
                nav.removeClass('navbar-fixed-top');
            }
        });

    });
    /* Start function to make Navbar Fixed */

    /*=========== Start Overs =================*/

    var btnMore = $(".features-pacages button.more"),
        btnLess = $(".features-pacages button.less"),
        row2 = $(".features-pacages .row-tow"),
        row3 = $(".features-pacages .row-three");

    btnMore.on("click", function () {
        row2.fadeIn();
        btnMore.on("click", function () {
            row3.fadeIn();
        });
    });

    btnLess.on("click", function () {
        row3.fadeOut();
        btnLess.on("click", function () {
            row2.fadeOut();
        });
    });


    /*=========== Start Overs =================*/




    /*=========== Start Button Scrool Top =================*/

    $(".scroll-top").on("click", function () {
        $("html,body").animate({
            scrollTop: 0
        }, 600);
    });
    $(window).scroll(function () {

        if ($(this).scrollTop() >= 500) {
            $(".scroll-top").fadeIn().css("right", "10px");
        } else {
            $(".scroll-top").fadeOut().css("right", "-100px");
        }
    });

    /*=========== End Button Scrool Top =================*/


}); /*End document ready*/