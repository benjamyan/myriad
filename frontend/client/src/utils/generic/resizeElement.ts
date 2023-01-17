import React from "react";

function throttled(delay, fn) {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date).getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    }
  }

  function debounced(delay, fn) {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    }
  }


export function resizeElement(givenElement: HTMLElement) {
    var resizable = givenElement, // document.querySelector('.resizable'),
        // resizer = document.querySelector( '.resizer' ),
        startX, startY, startWidth, startHeight;
    
    const dimensions = [0,0]
        
    //create box in bottom-left
    var resizer = document.createElement('div');
    resizer.style.width = '10px';
    resizer.style.height = '10px';
    resizer.style.background = 'red';
    resizer.style.position = 'absolute';
    resizer.style.right = '0';
    resizer.style.bottom = '0';
    resizer.style.cursor = 'se-resize';

    //Append Child to Element
    resizable.appendChild(resizer);
    resizer.addEventListener( 'mousedown', initDrag, false );

    function initDrag( e ) {
        startX = e.clientX;
        startY = e.clientY;

        startWidth = parseInt( document.defaultView.getComputedStyle( resizable ).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle( resizable ).height, 10);

        document.documentElement.addEventListener('mousemove', doDrag, false);
        document.documentElement.addEventListener('mouseup', stopDrag, false);
    }

    function doDrag(e) {
        resizable.style.width = (startWidth + e.clientX - startX) + 'px';
        dimensions[0] = startWidth + e.clientX - startX
        resizable.style.height = (startHeight + e.clientY - startY) + 'px';
        dimensions[1] = startHeight + e.clientY - startY
    }

    function stopDrag(e) {
        document.documentElement.removeEventListener('mousemove', doDrag, false);    
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }

    return dimensions

}
