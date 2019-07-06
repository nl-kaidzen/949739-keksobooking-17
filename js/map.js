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

  /*  Clone Pin-Element*/
  var containerForPin = mapForPin.querySelector('.map__pins');
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
  var pinTemplate = document.querySelector('#pin');
  var pinButton = pinTemplate.content.querySelector('.map__pin');
  var paintPin = function () {
    for (var i = 0; i < window.common.objectsForRent.length; i++) {
      var newPinElement = pinButton.cloneNode(true);
      addPinToMap(newPinElement);
      changePinData(newPinElement, window.common.objectsForRent[i]);
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

    paintPin();
  };

  window.map = {
    mapForPin: mapForPin,
    setActiveState: setActiveState
  };

})();
