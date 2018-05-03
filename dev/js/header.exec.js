// header.js

;(function($, window, document, undefined) {
    // Activate parallax
    $(window).stellar({
        horizontalScrolling: false
    });
    
    // Activate fastclick
    FastClick.attach(document.body);
    
    // Activate offscreen
    $('.header-parallax').offscreen( { target: $('#main-nav'), targetClass: 'navbar-visible' } );
    $('.header-parallax').offscreen( { target: $('.transition-logo'), targetClass: 'logo-visible' } );
})(jQuery, window, document);