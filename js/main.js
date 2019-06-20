'use strict';

var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var mapForPin = document.querySelector('.map');
var containerForPin = mapForPin.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin');
var pinButton = pinTemplate.content.querySelector('.map__pin');

var SCREEN_WIDTH = mapForPin.clientWidth;
var objectsForRent = [];

/*  Search for MainPin  */
var mainPin = document.querySelector('.map__pin--main');
var MAINPIN_NEEDLE_HEIGHT = 22 - 6; /*  Height = 22px and translate top for 6px */

/*  Serch for fieldsets and selects for changeState */
var fieldsetsArray = document.querySelectorAll('fieldset');
var mapFiltersArray = document.querySelectorAll('select[class=map__filter]');

/*  Search for ad-form to changeState */
var adForm = document.querySelector('.ad-form');

/*  Create random number (min, max) */
var createNumber = function (minNumber, maxNumber) {
  return (Math.round(minNumber + Math.random() * (maxNumber - minNumber)));
};

/*  Create data for rent object */
var createObjectForRent = function (i) {
  return {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      type: OFFER_TYPE[createNumber(0, 3)]
    },
    location: {
      x: createNumber(0, (SCREEN_WIDTH)),
      y: createNumber(130, 630)
    }
  };
};

/*  Generate array of objects */
for (var index = 0; index < 8; index++) {
  objectsForRent.push(createObjectForRent(index));
}

/*  Paint new Pins to Map*/

var paintPin = function () {
  for (var i = 0; i < objectsForRent.length; i++) {
    var newPinElement = pinButton.cloneNode(true);
    addPinToMap(newPinElement);
    changePinData(newPinElement, objectsForRent[i]);
  }
};

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


/*  Disable/Enable ad form business-logic */
var changeNoticeState = function (objectForChange, newState) {
  for (var idx = 0; idx < objectForChange.length; idx++) {
    objectForChange[idx].disabled = newState;
  }
};

/*  Set disabled state at opened window */
changeNoticeState(fieldsetsArray, true);
changeNoticeState(mapFiltersArray, true);

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

/*  Add Hendler for MainPin */
mainPin.addEventListener('mouseup', function () {
  mapForPin.classList.remove('map--faded');
  changeNoticeState(fieldsetsArray, false);
  changeNoticeState(mapFiltersArray, false);
  adForm.classList.remove('ad-form--disabled');
  paintPin();
  setAddress(mainPin, mainPinAddressInput);
});

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
  adPrice.min = MIN_PRICE[getSelectedOption(adHouseType)];
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
