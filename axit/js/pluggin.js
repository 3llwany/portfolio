/*global $, console*/
/*=============================
   Start NavBar Opacity
=============================*/
$(function () {
    "use strict";
    $(window).scroll(function () {
        var navBar = $(".navbar");
        if ($(window).scrollTop() >= navBar.height()) {
            if (navBar.hasClass('nav-scrolled')) {
                return true;
            } else {
                navBar.addClass("nav-scrolled");
            }
        } else {
            navBar.removeClass("nav-scrolled");
        }
    });
});/*=============================
      Edn NavBar Opacity
=============================*/


/*=============================
      Start Taps 
=============================*/
$('.tap-switch li').click(function () {
    "use strict";
    $(this).addClass('active').siblings().removeClass('active');
    
    // hide all div
    $('.taps-sec .taps-content > div').hide();
    // show div whitch include tap content 
    $($(this).data('class')).show();
    
    
});/*=============================
      End Taps 
=============================*/