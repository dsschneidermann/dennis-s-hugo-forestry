// mobileEffects.js

;(function($, window, document, undefined) {

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) ||
                navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var clickEvent = "click";

    if (isMobile.iOS()) {
        // Fix iOS not handling body click events by default
        $('html').css('cursor', 'pointer');
        // Change click event name
        clickEvent = "click";
    }

    /* Disable transition effects on Windows Phone */
    if (isMobile.Windows()) {
        $('.transition-effect').each(function() {
            $(this).removeClass('transition-effect');
            $(this).addClass('no-transition');
        });
    }

    /* Disable scroll reveal on specific elements on Windows Phone */
    if (isMobile.Windows()) {
        $('.companies__reveal').each(function() {
            $(this).removeAttr('data-scrollreveal');
        });
    }

    /* Touch to "hover" on mobile devices */
    if (isMobile.any()) {
        $('.touch-enabled').click(function() {
            $('.touch-open').removeClass('touch-open');
            $(this).addClass('touch-open');
            event.stopPropagation();
        });
        $('html').click(function() {
            $('.touch-open').removeClass('touch-open');
        });
    }

    /* Display "press me" arrow on mobile devices */
    if (isMobile.any()) {
        var elm = $('.companies__arrow-mobile');
        elm.removeClass('hidden-for-desktop');

        /* Fallback if pointer-events: none; does not work on div */
        elm.click(function() {
            elm.hide();
            $('.touch-open').removeClass('touch-open');
            elm.parent().find('.touch-enabled').first().addClass('touch-open');
            event.stopPropagation();
        });

        $('.companies .touch-enabled').click(function() {
            elm.hide();
        });
    }
})(jQuery, window, document);