'use strict';

(function () {
  //  Pin constants
  var PIN_HEIGHT = 81;
  var PIN_WIDTH = 65;
  var LIMIT_COORDS = {
    left: 0 - PIN_WIDTH / 2,
    right: 1200 - PIN_WIDTH / 2,
    top: 130 - PIN_HEIGHT,
    bottom: 630 - PIN_HEIGHT
  };
  var MAINPIN_NEEDLE_HEIGHT = 22 - 6; /*  Height = 22px and translate top for 6px */
  var PIN_START_COORDS = {
    x: 570,
    y: 375
  };

  //  CHANGE ADRESS LOGIC
  var mainPin = document.querySelector('.map__pin--main');

  //  Get adress from object
  var getAddress = function (pin) {
    var currentXPosition = pin.offsetLeft + pin.clientWidth / 2;
    var currentYPosition = pin.offsetTop + pin.clientHeight + MAINPIN_NEEDLE_HEIGHT;
    return (currentXPosition + ', ' + currentYPosition);
  };

  //  Set new adress to adress input @form
  var setAddress = function (pin, objectInput) {
    if (window.map.mapForPin.classList.contains('map--faded') === true) {
      objectInput.value = mainPin.offsetLeft + mainPin.clientWidth / 2 + ', ' + (mainPin.offsetTop + mainPin.clientHeight / 2);
    } else {
      objectInput.value = getAddress(pin);
    }
  };

  var mainPinAddressInput = document.querySelector('#address');
  setAddress(mainPin, mainPinAddressInput);

  //  Drag and Drop functional
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

  var onPinPressEnter = function (evt) {
    if (evt.keyCode === parseInt(window.common.KeyCodes.ENTER_KEYCODE, 10)) {
      window.map.setActiveState();
    }
    mainPin.removeEventListener('keydown', onPinPressEnter);
  };

  mainPin.addEventListener('keydown', onPinPressEnter);

  //  Clone Pin
  var addPinToMap = function (newPinElement, objectsForPaint) {
    window.map.containerForPin.appendChild(newPinElement);
    newPinElement.addEventListener('click', function () {
      window.card.showCard(objectsForPaint, newPinElement);
    });
  };

  //  Change data at cloned pin
  var changePinData = function (newPinElement, objectForRentData) {
    newPinElement.style = 'left: ' + (objectForRentData.location.x - newPinElement.clientWidth / 2) + 'px; top: ' + (objectForRentData.location.y - newPinElement.clientHeight) + 'px;';
    newPinElement.children[0].src = objectForRentData.author.avatar; /* Method .children could be replaced to .querySelector()  */
    newPinElement.children[0].alt = 'Здесь будет текст объявления';
  };

  // Paint new pin to map
  var pinTemplate = document.querySelector('#pin');
  var pinButton = pinTemplate.content.querySelector('.map__pin');

  var paintPin = function (objectsForPaint) {
    for (var i = 0; i < objectsForPaint.length; i++) {
      var newPinElement = pinButton.cloneNode(true);
      addPinToMap(newPinElement, objectsForPaint[i]);
      changePinData(newPinElement, objectsForPaint[i]);
    }
  };

  //  Clear NODE with Pins
  var removePins = function (nodeForClear) {
    while (nodeForClear.children.length >= 3) { /*  First 3 object is overlay, text and map__pin--main  */
      nodeForClear.lastChild.remove();
    }
  };

  //  Remove main pin coords to default
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
