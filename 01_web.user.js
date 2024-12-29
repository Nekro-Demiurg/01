(function() {
    'use strict';

    var newUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";

    Object.defineProperty(navigator, 'userAgent', {
        get: function() { return newUserAgent; }
    });

    Object.defineProperty(navigator, 'platform', {
        get: function() { return 'iPhone'; }
    });

    Object.defineProperty(navigator, 'vendor', {
        get: function() { return 'Apple Computer, Inc.'; }
    });
    function emitTouchEvent(event, touchType) {
        var touchObj = new Touch({
            identifier: Date.now(),
            target: event.target,
            clientX: event.clientX,
            clientY: event.clientY,
            screenX: event.screenX,
            screenY: event.screenY,
            pageX: event.pageX,
            pageY: event.pageY,
            radiusX: 2.5,
            radiusY: 2.5,
            rotationAngle: 10,
            force: 0.5,
        });

        var touchEvent = new TouchEvent(touchType, {
            cancelable: true,
            bubbles: true,
            shiftKey: true,
            touches: [touchObj],
            targetTouches: [touchObj],
            changedTouches: [touchObj],
        });

        event.target.dispatchEvent(touchEvent);
    }

    document.addEventListener('mousedown', function(event) {
        emitTouchEvent(event, 'touchstart');
    });

    document.addEventListener('mousemove', function(event) {
        emitTouchEvent(event, 'touchmove');
    });

    document.addEventListener('mouseup', function(event) {
        emitTouchEvent(event, 'touchend');
    });

})();
