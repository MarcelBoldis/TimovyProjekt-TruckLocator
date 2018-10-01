$(document).ready(function () {
    $("#toProject").click(function () {
        $('html, body').animate({
            scrollTop: $("#project").offset().top
        }, 800);
    });
    $("#toMembers").click(function () {
        $('html, body').animate({
            scrollTop: $("#members").offset().top
        }, 800);
    });
    $("#toState").click(function () {
        $('html, body').animate({
            scrollTop: $("#state").offset().top
        }, 800);
    });
    $("#toDocs").click(function () {
        $('html, body').animate({
            scrollTop: $("#docs").offset().top
        }, 800);
    });
    $("#up").click(function () {
        $('html, body').animate({
            scrollTop: $("#intro").offset().top
        }, 800);
    });

    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        if(scroll > 400) {
            $("#up").fadeIn();
        }
        else{
            $("#up").fadeOut();
        }
        
    });

});