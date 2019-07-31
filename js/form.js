'use strict';

(function () {
  var noticeForm = document.querySelector('.ad-form');
  var adHouseType = noticeForm.querySelector('select[name=type]');
  var adPrice = noticeForm.querySelector('input[name=price]');
  var adTimeIn = noticeForm.querySelector('#timein');
  var adTimeOut = noticeForm.querySelector('#timeout');
  var adRoomNumber = noticeForm.querySelector('#room_number');
  var adCapacity = noticeForm.querySelector('#capacity');
  var adClearBtn = noticeForm.querySelector('.ad-form__reset');

  var MIN_PRICES = [0, 1000, 5000, 10000];
  var BOOKING_TIMES = ['12:00', '13:00', '14:00'];

  adHouseType.addEventListener('change', function () {
    var optionIndex = window.common.getSelectedOption(adHouseType);
    adPrice.min = MIN_PRICES[optionIndex];
    adPrice.placeholder = MIN_PRICES[optionIndex];
  });
  adTimeIn.addEventListener('change', function () {
    adTimeOut.value = BOOKING_TIMES[window.common.getSelectedOption(adTimeIn)];
  });
  adTimeOut.addEventListener('change', function () {
    adTimeIn.value = BOOKING_TIMES[window.common.getSelectedOption(adTimeOut)];
  });

  var RoomsMap = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var inputValidate = function (room, capacity) {
    if (RoomsMap[room].indexOf(parseInt(capacity, 10)) === -1) {
      adCapacity.setCustomValidity('Количество комнат должно быть больше или равно количеству гостей');
    } else {
      adCapacity.setCustomValidity('');
    }
  };

  inputValidate(adRoomNumber.value, adCapacity.value);

  adRoomNumber.addEventListener('change', function () {
    inputValidate(adRoomNumber.value, adCapacity.value);
  });

  adCapacity.addEventListener('change', function () {
    inputValidate(adRoomNumber.value, adCapacity.value);
  });

  // Hendlers

  var successPopup;
  var errorPopup;
  var errorCloseBtn;

  var onSuccessClick = function (evt) {
    evt.preventDefault();
    successPopup.remove();
  };

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === 27) {
      successPopup.remove();
      document.removeEventListener('keydown', onSuccessEscPress);
    }
  };

  var onErrorClick = function (evt) {
    evt.preventDefault();
    errorPopup.remove();
  };

  var onErrorEscPress = function (evt) {
    if (evt.keyCode === 27) {
      errorPopup.remove();
      document.removeEventListener('keydown', onErrorEscPress);
    }
  };

  var onError = function () {
    var errorTemplate = document.querySelector('#error');
    var main = document.querySelector('main');
    var errorMessage = errorTemplate.content.cloneNode(true);
    main.appendChild(errorMessage);
    errorPopup = document.querySelector('.error');
    errorCloseBtn = document.querySelector('.error__button');
    document.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorEscPress);
    errorCloseBtn.addEventListener('click', onErrorClick);
  };

  var onSuccess = function () {
    var successTemplate = document.querySelector('#success');
    var main = document.querySelector('main');
    var successMessage = successTemplate.content.cloneNode(true);
    main.appendChild(successMessage);
    successPopup = document.querySelector('.success');
    document.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var formData = new FormData(noticeForm);
    window.load.post('https://js.dump.academy/keksobooking', formData, onSuccess, onError);

    /*  Set disable state for page  */
    noticeForm.reset();
    window.map.setDisabledState();
    window.pin.removePins(window.map.containerForPin);
    window.pin.moveStartPin();
  });

  var clearForm = function () {
    noticeForm.reset();
    window.map.setDisabledState();
    window.pin.removePins(window.map.containerForPin);
    window.pin.moveStartPin();
  };

  adClearBtn.addEventListener('click', clearForm);
})();
