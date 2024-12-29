(function() {
    'use strict';
    
 
    const modernUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1";
    

    Object.defineProperties(navigator, {
        userAgent: {
            get: () => modernUserAgent
        },
        platform: {
            get: () => 'iPhone'
        },
        vendor: {
            get: () => 'Apple Computer, Inc.'
        },
        maxTouchPoints: {
            get: () => 5
        }
    });


    function emitTouchEvent(event, touchType) {
        if (typeof Touch === 'undefined' || typeof TouchEvent === 'undefined') {
            console.warn('Touch API не поддерживается в этом браузере');
            return;
        }

        const touchObj = new Touch({
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
            force: 1.0,
        });

        const touchEvent = new TouchEvent(touchType, {
            cancelable: true,
            bubbles: true,
            composed: true,
            touches: touchType !== 'touchend' ? [touchObj] : [],
            targetTouches: touchType !== 'touchend' ? [touchObj] : [],
            changedTouches: [touchObj]
        });

        event.target.dispatchEvent(touchEvent);
        
        
        event.preventDefault();
    }

   
    const handleMouseDown = (event) => emitTouchEvent(event, 'touchstart');
    const handleMouseMove = (event) => emitTouchEvent(event, 'touchmove');
    const handleMouseUp = (event) => emitTouchEvent(event, 'touchend');

    
    document.addEventListener('mousedown', handleMouseDown, { passive: false });
    document.addEventListener('mousemove', handleMouseMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp, { passive: false });

   
    window.clearTouchEmulation = () => {
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };
})();
