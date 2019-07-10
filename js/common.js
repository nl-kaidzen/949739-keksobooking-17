'use strict';
(function () {
  var objectsForRent = [];

  /*  Create random number (min, max) */
  var createNumber = function (minNumber, maxNumber) {
    return (Math.round(minNumber + Math.random() * (maxNumber - minNumber)));
  };

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

  window.common = {
    objectsForRent: objectsForRent,
    createNumber: createNumber,
    getSelectedOption: getSelectedOption
  };
})();
