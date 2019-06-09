'use strict';

var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var mapForPin = document.querySelector('.map');
var containerForPin = mapForPin.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin');
var pinButton = pinTemplate.content.querySelector('.map__pin');

var SCREEN_WIDTH = mapForPin.clientWidth;
var objectsForRent = [{}, {}, {}, {}, {}, {}, {}, {}];

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
  objectsForRent[index] = createObjectForRent(index);
}

/*  Delete class  */
mapForPin.classList.remove('map--faded');

/*  Clone Pin-Element*/
var addPinToMap = function () {
  containerForPin.appendChild(newPinElement);
};

/*  Change Object Data at created pin */
var changePinData = function (i) {
  newPinElement.style = 'left: ' + (objectsForRent[i].location.x - newPinElement.clientWidth / 2) + 'px; top: ' + (objectsForRent[i].location.y - newPinElement.clientHeight) + 'px;';
  newPinElement.children[0].src = objectsForRent[i].author.avatar;/* Method .children could be replaced to .querySelector()  */
  newPinElement.children[0].alt = 'Здесь будет текст объявления';
};

/*  Paint new Pins to Map*/
for (var i = 0; i < 8; i++) {
  var newPinElement = pinButton.cloneNode(true);
  addPinToMap();
  changePinData(i);
}
