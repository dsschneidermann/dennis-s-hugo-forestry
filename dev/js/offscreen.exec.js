/*! Offscreen.js | (c) 2016 @gijsroge | MIT license | https://github.com/gijsroge/offscreen.js

Heavily modified, DSS

*/
;(function($, window, document, undefined) {

    $.fn.offscreen = function(opt) {

        // Set default options
        var defaults = {
            target: $(this),
            targetClass: 'offscreen',
            smartScroll: true,
            onetime: true
        };

        // Call in the default otions
        var options = $.extend(defaults, opt);

        var $this = $(this);
        var hasrun = false;

        function isElementInViewport(el) {
            var rect = el.getBoundingClientRect();

            var rectBottomShowing = rect.top + rect.height >= 0;
            var result = rectBottomShowing;

            return result;
        }

        function offscreenInitiate() {
            $this.each(function() {
                if (options.onetime && hasrun) return;

                if (isElementInViewport(this)) {
                    options.target.removeClass(options.targetClass);
                } else {
                    options.target.addClass(options.targetClass);
                    hasrun = true;
                }
            });
        }

        // Run once first
        offscreenInitiate();

        if (options.smartScroll === true) {
            // Debouncing function from John Hann
            // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
            (function(e, t) {
                var n = function(e, t, n) {
                    var r;
                    return function() {
                        function u() {
                            if (!n) e.apply(s, o);
                            r = null;
                        }
                        var s = this,
                            o = arguments;
                        if (r) clearTimeout(r);
                        else if (n) e.apply(s, o);
                        r = setTimeout(u, t || 100);
                    };
                };
                $.fn[t] = function(e) {
                    return e ? this.bind("scroll", n(e)) : this.trigger(t);
                };
            })($, "smartscroll");

            $(window).smartscroll(function() {
                offscreenInitiate();
            });
        } else {
            $(window).scroll(function() {
                offscreenInitiate();
            });
        }
    };

})(jQuery, window, document);