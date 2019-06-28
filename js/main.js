'use strict';

/*  ----------- MAP LOGIC ------------  */

var mapForPin = document.querySelector('.map');
var containerForPin = mapForPin.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin');
var pinButton = pinTemplate.content.querySelector('.map__pin');
var mainPin = document.querySelector('.map__pin--main');

// SET START STATEMENT

var fieldsetsArray = document.querySelectorAll('fieldset');
var mapFiltersArray = document.querySelectorAll('select[class=map__filter]');
/*  Disable/Enable ad form business-logic */
var changeNoticeState = function (objectForChange, newState) {
  for (var i = 0; i < objectForChange.length; i++) {
    objectForChange[i].disabled = newState;
  }
};
/*  Set disabled state at opened window */
changeNoticeState(fieldsetsArray, true);
changeNoticeState(mapFiltersArray, true);

/*  Search for ad-form to changeState */
var adForm = document.querySelector('.ad-form');

/*  Add Hendler for MainPin */
var setActiveState = function () {
  mapForPin.classList.remove('map--faded');
  changeNoticeState(fieldsetsArray, false);
  changeNoticeState(mapFiltersArray, false);
  adForm.classList.remove('ad-form--disabled');
  paintPin();
};

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

  setActiveState();
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

//  PIN PAINTING LOGIC

/*  Search for MainPin  */
//  var mainPin = document.querySelector('.map__pin--main'); use from map.js
var MAINPIN_NEEDLE_HEIGHT = 22 - 6; /*  Height = 22px and translate top for 6px */
/*  Clone Pin-Element*/
var addPinToMap = function (newPinElement) {
  containerForPin.appendChild(newPinElement);
};
/*  Change Object Data at created pin */
var changePinData = function (newPinElement, objectForRentData) {
  newPinElement.style = 'left: ' + (objectForRentData.location.x - newPinElement.clientWidth / 2) + 'px; top: ' + (objectForRentData.location.y - newPinElement.clientHeight) + 'px;';
  newPinElement.children[0].src = objectForRentData.author.avatar; /* Method .children could be replaced to .querySelector()  */
  newPinElement.children[0].alt = 'Здесь будет текст объявления';
};
/*  Paint new Pins to Map*/
var paintPin = function () {
  for (var i = 0; i < window.common.objectsForRent.length; i++) {
    var newPinElement = pinButton.cloneNode(true);
    addPinToMap(newPinElement);
    changePinData(newPinElement, window.common.objectsForRent[i]);
  }
};

var getAddress = function (objectForTrack) {
  var currentXPosition = objectForTrack.offsetLeft + objectForTrack.clientWidth / 2;
  var currentYPosition = objectForTrack.offsetTop + objectForTrack.clientHeight + MAINPIN_NEEDLE_HEIGHT;
  return (currentXPosition + ', ' + currentYPosition);
};

var setAddress = function (objectForTrack, objectInput) {
  if (mapForPin.classList.contains('map--faded') === true) {
    objectInput.value = mainPin.offsetLeft + mainPin.clientWidth / 2 + ', ' + (mainPin.offsetTop + mainPin.clientHeight / 2);
  } else {
    objectInput.value = getAddress(objectForTrack);
  }
};

var mainPinAddressInput = document.querySelector('#address');
setAddress(mainPin, mainPinAddressInput);

/*  --------Validation----------  */
var noticeForm = document.querySelector('.notice');
/*  var adTitle = noticeForm.querySelector('input[name=title]');  */
var adHouseType = noticeForm.querySelector('select[name=type]');
var adPrice = noticeForm.querySelector('input[name=price]');
var adTimeIn = noticeForm.querySelector('#timein');
var adTimeOut = noticeForm.querySelector('#timeout');
var adRoomNumber = noticeForm.querySelector('#room_number');
var adCapacity = noticeForm.querySelector('#capacity');

var MIN_PRICE = [0, 1000, 5000, 10000];
var BOOKING_TIMES = ['12:00', '13:00', '14:00'];
var ROOMS_NUMBER = [
  {select: 0, firstIndex: 2, lastIndex: 2},
  {select: 1, firstIndex: 1, lastIndex: 2},
  {select: 2, firstIndex: 0, lastIndex: 2},
  {select: 3, firstIndex: 3, lastIndex: 3}];

/*  getSelectFunction return index of selected option at object,which linked inside function as parameter */
var getSelectedOption = function (object) {
  var objectOptions = object.querySelectorAll('option');
  var selectedOption = 0;
  for (var i = 0; i < objectOptions.length; i++) {
    if (objectOptions[i].selected === true) {
      selectedOption = i;
    }
  }
  return selectedOption;
};

var setDisabledOption = function (object, selectorIndex) {
  /*  set Disabled status for all SELECT */
  for (var startI = 0; startI < object.children.length; startI++) {
    object.children[startI].disabled = true;
  }

  /*  set Enabled status for SELECT from firstIndex to lastIndex */
  var startSelector = ROOMS_NUMBER[selectorIndex].firstIndex;
  var endSelector = ROOMS_NUMBER[selectorIndex].lastIndex;
  for (startSelector; startSelector <= endSelector; startSelector++) {
    object.children[startSelector].disabled = false;
  }
};

adHouseType.addEventListener('change', function () {
  var optionIndex = getSelectedOption(adHouseType);
  adPrice.min = MIN_PRICE[optionIndex];
  adPrice.placeholder = MIN_PRICE[optionIndex];
});
adTimeIn.addEventListener('change', function () {
  adTimeOut.value = BOOKING_TIMES[getSelectedOption(adTimeIn)];
});
adTimeOut.addEventListener('change', function () {
  adTimeIn.value = BOOKING_TIMES[getSelectedOption(adTimeOut)];
});
adRoomNumber.addEventListener('change', function () {
  setDisabledOption(adCapacity, getSelectedOption(adRoomNumber));
});
