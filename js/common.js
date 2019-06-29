'use strict';
(function () {
  var objectsForRent = [];

  /*  Create random number (min, max) */
  var createNumber = function (minNumber, maxNumber) {
    return (Math.round(minNumber + Math.random() * (maxNumber - minNumber)));
  };

  window.common = {
    objectsForRent: objectsForRent,
    createNumber: createNumber
  };
})();
