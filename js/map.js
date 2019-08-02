'use strict';
(function () {
  var mapForPin = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsetsArray = document.querySelectorAll('fieldset');
  var mapFiltersArray = document.querySelectorAll('select[class=map__filter]');

  /*  Disable/Enable ad form business-logic */
  var changeNoticeState = function (objectForChange, newState) {
    for (var i = 0; i < objectForChange.length; i++) {
      objectForChange[i].disabled = newState;
    }
  };

  /*  Set disabled state  */
  var setDisabledState = function () {
    if (!mapForPin.classList.contains('map--faded')) {
      mapForPin.classList.add('map--faded');
    }
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.add('ad-form--disabled');
    }
    changeNoticeState(fieldsetsArray, true);
    changeNoticeState(mapFiltersArray, true);

  };
  setDisabledState();

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

  window.load.get('https://js.dump.academy/keksobooking/data', onSuccess, onError);

  /*  Clone Pin-Element*/
  var containerForPin = mapForPin.querySelector('.map__pins');


  /*  Add Hendler for MainPin */
  var setActiveState = function () {
    mapForPin.classList.remove('map--faded');
    changeNoticeState(fieldsetsArray, false);
    changeNoticeState(mapFiltersArray, false);
    adForm.classList.remove('ad-form--disabled');
    window.filter.setFilterActiveState();
  };

  window.map = {
    mapForPin: mapForPin,
    setActiveState: setActiveState,
    setDisabledState: setDisabledState,
    containerForPin: containerForPin
  };

})();
