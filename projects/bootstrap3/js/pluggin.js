/*global $, console*/
$(document).ready(function () {
    "use strict";
    $(".icon").click(function () {
        $(".colors-box").fadeToggle();
    });





    /* =============== Start Nice Scroll======================= */

    $("html").niceScroll();

    /* =============== End Nice Scroll======================= */







    /* =============== start Change Theme ======================= */
    var coloLi = $(".colors-box ul li"),
        scrollButton = $("#scroll-top");

    coloLi
        .eq(0).css("backgroundColor", "#be1616").end()
        .eq(1).css("backgroundColor", "#2b6393").end()
        .eq(2).css("backgroundColor", "#3ed962").end()
        .eq(3).css("backgroundColor", "#eef283");


    coloLi.click(function () {
        $("link[href*='them']").attr("href", $(this).attr("data-value"));
    });
    /* =============== End Change Theme ======================= */





    /* =============== Start Scroll Top Button ======================= */



    $(window).scroll(function () {
        if ($(this).scrollTop() >= 760) {
            scrollButton.fadeIn();
        } else {
            scrollButton.fadeOut();
        }
    });
    
    scrollButton.click(function () {
        $("html,body").animate({
            scrollTop: 0
        }, 600);
    });
    /* =============== End Scroll Top Button ======================= */
//
//   // Function To Make NaveBar Button in Mobile Change the Icon from 3 lines under them to (X) 
//    $('.navbar-toggle').click(function () {
//        $('.icon-bar-top').css({"transform": "rotate(45deg) translate(3px)"});
//        $('.icon-bar-Middle').css({"transform": "rotate(-45deg) translate(3px)"});
//        $('.icon-bar-bottom').css({"display": "none"});
//
//    });


}); /*End doucment ready*/









/*============= Start Loading Page==============================*/
$(window).on("load", function () {
    "use strict";
    $(".loader").fadeOut(function () {
        $(".loading").fadeOut(function () {
            $("body").css("overflow", "auto");
        });
    });
});

/*============= End Loading Page==============================*/