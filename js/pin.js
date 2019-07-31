'use strict';

(function () {
  //  GET ADRESS FROM PIN LOGIC
  var mainPin = document.querySelector('.map__pin--main');
  var MAINPIN_NEEDLE_HEIGHT = 22 - 6; /*  Height = 22px and translate top for 6px */
  var PIN_START_COORDS = {
    x: 570,
    y: 375
  };

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

      if (((mainPin.offsetLeft - shift.x) <= LIMIT_COORDS.right) && ((mainPin.offsetLeft - shift.x) >= LIMIT_COORDS.left)) {
        startCoords.x = moveEvt.clientX;
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      if (((mainPin.offsetTop - shift.y) <= LIMIT_COORDS.bottom) && ((mainPin.offsetTop - shift.y) >= LIMIT_COORDS.top)) {
        startCoords.y = moveEvt.clientY;
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
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

  /*  Clone Pin-Element*/
  var addPinToMap = function (newPinElement, objectsForPaint) {
    window.map.containerForPin.appendChild(newPinElement);
    newPinElement.addEventListener('click', function () {
      window.card.showCard(objectsForPaint);
    });
  };
  /*  Change Object Data at created pin */
  var changePinData = function (newPinElement, objectForRentData) {
    newPinElement.style = 'left: ' + (objectForRentData.location.x - newPinElement.clientWidth / 2) + 'px; top: ' + (objectForRentData.location.y - newPinElement.clientHeight) + 'px;';
    newPinElement.children[0].src = objectForRentData.author.avatar; /* Method .children could be replaced to .querySelector()  */
    newPinElement.children[0].alt = 'Здесь будет текст объявления';
  };
  /*  Paint new Pins to Map*/
  var pinTemplate = document.querySelector('#pin');
  var pinButton = pinTemplate.content.querySelector('.map__pin');

  var paintPin = function (objectsForPaint) {
    for (var i = 0; i < objectsForPaint.length; i++) {
      var newPinElement = pinButton.cloneNode(true);
      addPinToMap(newPinElement, objectsForPaint[i]);
      changePinData(newPinElement, objectsForPaint[i]);
    }
  };

  //  CLEAR NODE with Pins
  var removePins = function (nodeForClear) {
    while (nodeForClear.children.length >= 3) { /*  First 3 object is overlay, text and map__pin--main  */
      nodeForClear.lastChild.remove();
    }
  };

  var moveStartPin = function () {
    mainPin.style.left = PIN_START_COORDS.x + 'px';
    mainPin.style.top = PIN_START_COORDS.y + 'px';
    setAddress(mainPin, mainPinAddressInput);
  };

  window.pin = {
    addPinToMap: addPinToMap,
    changePinData: changePinData,
    paintPin: paintPin,
    removePins: removePins,
    moveStartPin: moveStartPin
  };
})();
