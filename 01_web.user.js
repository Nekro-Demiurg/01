// ==UserScript==
// @name         01_web
// @version      1.1
// @author       Nekro-Demiurg
// @match        *://mmbump.pro/*
// @run-at       document-start
// @icon         https://sun9-16.userapi.com/impg/g93WJxPJtCopVIAqWbzvaGWbkn-LaY-pEyCh1Q/Jvut2jMz7Rc.jpg?size=640x640&quality=95&sign=2f4460fee947b101894f4c274a599bff&c_uniq_tag=hQ43e9wzpBH6S4E0mWytfXtp5gde33mgCvmnGLVj-rI&type=album
// @grant        none
// @downloadURL https://github.com/Nekro-Demiurg/01/raw/main/01_web.user.js
// @updateURL    https://github.com/Nekro-Demiurg/01/raw/main/01_web.user.js
// @homepage     https://github.com/Nekro-Demiurg/01
// ==/UserScript==


(function() {
    'use strict';

    var modernUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1";

    Object.defineProperty(navigator, 'userAgent', {
        get: function() { return modernUserAgent; }
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
