// preloader.js
require('../css/preloader.less')

$(window).load(function() {
    // First fade out the loading divs
    $(".preloader div").delay(600).fadeOut("slow");

    // Fade out the whole DIV that covers the website.
    $(".preloader").delay(600).fadeOut("slow");
});
