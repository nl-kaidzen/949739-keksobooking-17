'use strict';

/*  ____________________________MOCKUPS DATA___________________________*/
// createNumber function from WINDOW;
// objectsForRent from WINDOW;
(function () {
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var SCREEN_WIDTH = 1200;

  /*  Create data for rent object */
  var createObjectForRent = function (i) {
    return {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        type: OFFER_TYPE[window.common.createNumber(0, 3)]
      },
      location: {
        x: window.common.createNumber(0, (SCREEN_WIDTH)),
        y: window.common.createNumber(130, 630)
      }
    };
  };

  /*  Generate array of objects */
  for (var index = 0; index < 8; index++) {
    window.common.objectsForRent.push(createObjectForRent(index));
  }
})();
