'use strict';

(function () {
  //  GET ADRESS FROM PIN LOGIC
  var mainPin = document.querySelector('.map__pin--main');
  var MAINPIN_NEEDLE_HEIGHT = 22 - 6; /*  Height = 22px and translate top for 6px */

  var getAddress = function (objectForTrack) {
    var currentXPosition = objectForTrack.offsetLeft + objectForTrack.clientWidth / 2;
    var currentYPosition = objectForTrack.offsetTop + objectForTrack.clientHeight + MAINPIN_NEEDLE_HEIGHT;
    return (currentXPosition + ', ' + currentYPosition);
  };

  var setAddress = function (objectForTrack, objectInput) {
    if (window.map.mapForPin.classList.contains('map--faded') === true) {
      objectInput.value = mainPin.offsetLeft + mainPin.clientWidth / 2 + ', ' + (mainPin.offsetTop + mainPin.clientHeight / 2);
    } else {
      objectInput.value = getAddress(objectForTrack);
    }
  };

  var mainPinAddressInput = document.querySelector('#address');
  setAddress(mainPin, mainPinAddressInput);

  //  PIN MOVING LOGIC
  /*  ---------------D'N'D Functional-----------------------  */
  var PIN_HEIGHT = 81;
  var PIN_WIDTH = 65;
  var LIMIT_COORDS = {
    left: 0 - PIN_WIDTH / 2,
    right: 1200 - PIN_WIDTH / 2,
    top: 130 - PIN_HEIGHT,
    bottom: 630 - PIN_HEIGHT
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    window.map.setActiveState();
    setAddress(mainPin, mainPinAddressInput);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      if ((mainPin.offsetLeft - shift.x) <= LIMIT_COORDS.right) {
        if ((mainPin.offsetLeft - shift.x) >= LIMIT_COORDS.left) {
          startCoords.x = moveEvt.clientX;
          mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        }
      }
      if ((mainPin.offsetTop - shift.y) <= LIMIT_COORDS.bottom) {
        if ((mainPin.offsetTop - shift.y) >= LIMIT_COORDS.top) {
          startCoords.y = moveEvt.clientY;
          mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        }
      }
      setAddress(mainPin, mainPinAddressInput);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
