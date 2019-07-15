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

  // SET START (DISABLED) STATEMENT
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

  filterHouseType.addEventListener('change', function () {
    var newHouseType = filterHouseType.value;
    var objectsForPaint = getFilteredObject(window.common.objectsForRent, 'type', newHouseType);
    if (objectsForPaint.length > 5) {
      objectsForPaint.slice(0, 5);
    }
    window.pin.removePins(containerForPin);
    window.pin.paintPin(objectsForPaint);
  });

  /*  Clone Pin-Element*/
  var containerForPin = mapForPin.querySelector('.map__pins');

  /*  Search for ad-form to changeState */
  var adForm = document.querySelector('.ad-form');

  /*  Add Hendler for MainPin */
  var setActiveState = function () {
    mapForPin.classList.remove('map--faded');
    changeNoticeState(fieldsetsArray, false);
    changeNoticeState(mapFiltersArray, false);
    adForm.classList.remove('ad-form--disabled');
    window.pin.paintPin(getFilteredObject(window.common.objectsForRent, 'type', 'any'));
  };

  window.map = {
    mapForPin: mapForPin,
    setActiveState: setActiveState,
    containerForPin: containerForPin
  };

})();
