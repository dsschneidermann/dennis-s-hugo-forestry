// knobAnimate.js

require('jquery-knob');

;(function($, window, document, undefined) {
    
    // jQuery.Knob animate after ScrollReveal starts
    $(function() {
        $('.dial').each(function() {
            $(this).knob({
                'value': 0,
                'min': 0,
                'max': 100,
                'readOnly': true,
                'dynamicDraw': true,
                'displayInput': false
            });
        });

        $('.dial').each(function() {
            var elm = $(this);
            var srParent = elm.closest('*[data-scrollreveal]');
            var percent = elm.attr('value');

            // Set the value to 0 while waiting to animate
            elm.val(0).trigger('change');

            var waitOnScrollReveal = parseInt(elm.attr('data-waitOnScrollReveal')) || 0;
            var waitBefore = parseInt(elm.attr('data-waitBefore')) || 0;
            var labelColor = elm.attr('data-labelColor');

            var scrollRevealStyle;
            var checkScrollReveal = setInterval(function() {
                var newStyle = $(srParent).attr('style');
                var scrollRevealComplete = $(srParent).attr('data-sr-complete');

                if (newStyle && !scrollRevealStyle) {
                    // Capture first style set on the element
                    scrollRevealStyle = newStyle;
                } else if (newStyle && scrollRevealStyle !== newStyle) {
                    // When any change happens to the first style
                    clearInterval(checkScrollReveal);
                    var totalWait = waitOnScrollReveal + waitBefore;
                    startKnobAnimate(elm, percent, totalWait);
                } else if (scrollRevealComplete === "true") {
                    // When initialized with scroll reveal already complete
                    clearInterval(checkScrollReveal);
                    startKnobAnimate(elm, percent, waitBefore);
                }
            }, 100);

            // Label
            elm.append(function() {
                elm.parent().parent().find('.circular-bar-content').css('color', labelColor);
                elm.parent().parent().find('.circular-bar-content label').text(percent);
            });
        });
    });

    function startKnobAnimate(elm, percent, waitTime) {
        var duration = elm.attr('data-duration');

        setTimeout(function() {
            $({
                value: 0
            }).animate({
                value: percent
            }, {
                duration: duration ? parseInt(duration) : 1500,
                easing: 'swing',
                progress: function() {
                    elm.val(Math.ceil(this.value)).trigger('change');
                }
            });

        }, waitTime || 0);
    }
})(jQuery, window, document);