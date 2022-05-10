/*global $*/
$(function () {
    'use strict';

/*$(document).on('click', '[data-toggle="lightbox"]', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});*/


    $('[data-toggle="tooltip"]').tooltip({
        width: 'auto'
    });
    

    $('.portfolio button').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var clas = $(this).data('calss');
        if (clas === 'all') {
            $('.portfolio .row > div ').fadeIn();
        } else {
            $('.portfolio .row > div ').hide();
            $(clas).fadeIn();
        }
    });
    
    
    
    var scrollButton = $("#scroll-top");
    
    $(window).scroll(function () {
       
        if ($(this).scrollTop() >= 500) {
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
    
    
}); //End Doc ready 
