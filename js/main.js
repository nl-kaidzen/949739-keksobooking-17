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

/*  Add Hendler for MainPin */
mainPin.addEventListener('mouseup', function () {
  mapForPin.classList.remove('map--faded');
  changeNoticeState(fieldsetsArray, false);
  changeNoticeState(mapFiltersArray, false);
  adForm.classList.remove('ad-form--disabled');
  paintPin();
});
