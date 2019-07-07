'use strict';

(function () {
  var noticeForm = document.querySelector('.notice');
  var adHouseType = noticeForm.querySelector('select[name=type]');
  var adPrice = noticeForm.querySelector('input[name=price]');
  var adTimeIn = noticeForm.querySelector('#timein');
  var adTimeOut = noticeForm.querySelector('#timeout');
  var adRoomNumber = noticeForm.querySelector('#room_number');
  var adCapacity = noticeForm.querySelector('#capacity');

  var MIN_PRICES = [0, 1000, 5000, 10000];
  var BOOKING_TIMES = ['12:00', '13:00', '14:00'];
  var ROOMS_NUMBER = [{
    select: 0,
    firstIndex: 2,
    lastIndex: 2
  },
  {
    select: 1,
    firstIndex: 1,
    lastIndex: 2
  },
  {
    select: 2,
    firstIndex: 0,
    lastIndex: 2
  },
  {
    select: 3,
    firstIndex: 3,
    lastIndex: 3
  }
  ];

  var setDisabledOption = function (object, selectorIndex) {
    /*  set Disabled status for all SELECT */
    for (var i = 0; i < object.children.length; i++) {
      object.children[i].disabled = true;
    }

    /*  set Enabled status for SELECT from firstIndex to lastIndex */
    var startSelector = ROOMS_NUMBER[selectorIndex].firstIndex;
    var endSelector = ROOMS_NUMBER[selectorIndex].lastIndex;
    for (startSelector; startSelector <= endSelector; startSelector++) {
      object.children[startSelector].disabled = false;
    }
  };

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
  adRoomNumber.addEventListener('change', function () {
    setDisabledOption(adCapacity, window.common.getSelectedOption(adRoomNumber));
  });

})();
