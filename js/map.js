'use strict';
(function () {
  var mapForPin = document.querySelector('.map');

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

  //  PIN PAINTING LOGIC

  /*  Get objectForRent from server */
  var onError = function () {
    var errorTemplate = document.querySelector('#error');
    var main = document.querySelector('main');
    var errorMessage = errorTemplate.content.cloneNode(true);
    main.appendChild(errorMessage);
  };

  var onSuccess = function (data) {
    window.common.objectsForRent = data;
  };

  window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);

  // SHOW INFO-CARD WITH OBJECT PARAMETERS
  var showCard = function () {
    var cardTemplate = document.querySelector('#card');
    var modalCard = cardTemplate.content.cloneNode(true);
    containerForPin.appendChild(modalCard);
    window.card.changeCardData();
  };

  //  CHANGE DATA IN CARD
  /*  var changeCardData = function () {

  }*/

  //  FILTER FUNCTIONAL
  /*  Generate new array with filtered objects. Throw inside OBJECT, KEY for filter, finding VALLUE */
  var getFilteredObject = function (object, objectParam, value) {
    if (value !== 'any') {
      return (object.filter(function (it) {
        return it.offer[objectParam] === value;
      }));
    } else {
      return object.slice(0, 5);
    }
  };
  //  LISTENERS FOR MAP-FILTER
  /*  variables */
  var mapFilters = document.querySelector('.map__filters');
  var filterHouseType = mapFilters.querySelector('#housing-type');
  /*  var filterHousePrice = mapFilters.querySelector('#housing-price');  */

  //  CLEAR NODE with Pins
  var removePins = function (nodeForClear) {
    while (nodeForClear.children.length >= 3) { /*  First 3 object is overlay, text and map__pin--main  */
      nodeForClear.lastChild.remove();
    }
  };

  filterHouseType.addEventListener('change', function () {
    var newHouseType = filterHouseType.value;
    var objectsForPaint = getFilteredObject(window.common.objectsForRent, 'type', newHouseType);
    if (objectsForPaint.length > 5) {
      objectsForPaint.slice(0, 5);
    }
    removePins(containerForPin);
    paintPin(objectsForPaint);
  });

  /*  Clone Pin-Element*/
  var containerForPin = mapForPin.querySelector('.map__pins');
  var addPinToMap = function (newPinElement) {
    containerForPin.appendChild(newPinElement);
    newPinElement.addEventListener('click', showCard);
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
      addPinToMap(newPinElement);
      changePinData(newPinElement, objectsForPaint[i]);
    }
  };

  /*  Search for ad-form to changeState */
  var adForm = document.querySelector('.ad-form');

  /*  Add Hendler for MainPin */
  var setActiveState = function () {
    mapForPin.classList.remove('map--faded');
    changeNoticeState(fieldsetsArray, false);
    changeNoticeState(mapFiltersArray, false);
    adForm.classList.remove('ad-form--disabled');
    paintPin(getFilteredObject(window.common.objectsForRent, 'type', 'any'));
  };

  window.map = {
    mapForPin: mapForPin,
    setActiveState: setActiveState
  };

})();
