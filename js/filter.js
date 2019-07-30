'use strict';
(function () {
  //  LISTENERS FOR MAP-FILTER
  /*  variables */
  var mapFilters = document.querySelector('.map__filters');
  var filterHouseType = mapFilters.querySelector('#housing-type');
  var filterHousePrice = mapFilters.querySelector('#housing-price');
  var filterHouseRooms = mapFilters.querySelector('#housing-rooms');
  var filterHouseGuests = mapFilters.querySelector('#housing-guests');
  var filterHouseFeatures = mapFilters.querySelector('.map__features');

  var wifi = mapFilters.querySelector('#filter-wifi');
  var dishwasher = mapFilters.querySelector('#filter-dishwasher');
  var parking = mapFilters.querySelector('#filter-parking');
  var washer = mapFilters.querySelector('#filter-washer');
  var elevator = mapFilters.querySelector('#filter-elevator');
  var conditioner = mapFilters.querySelector('#filter-conditioner');

  //  CREATE OBJECT WITH FILTER
  var filterParams = {};

  // FEATURES FILTER
  var filterCheckbox = Array.from(filterHouseFeatures.querySelectorAll('.map__checkbox'));
  var setFilterActiveState = function () {
    filterHouseType.addEventListener('change', getFilterParams);
    filterHousePrice.addEventListener('change', getFilterParams);
    filterHouseRooms.addEventListener('change', getFilterParams);
    filterHouseGuests.addEventListener('change', getFilterParams);
    filterCheckbox.forEach(function (it) {
      it.addEventListener('click', getFilterParams);
    });
    getFilterParams(); /* First call after activate filters for paint some pins  */
  };

  var getFilterParams = function () {
    filterParams = {}; /* Clear object until update */
    filterParams.type = filterHouseType.value;
    filterParams.price = filterHousePrice.value;
    filterParams.rooms = filterHouseRooms.value;
    filterParams.guests = filterHouseGuests.value;
    filterParams.features = [];
    filterCheckbox.forEach(function (it) {
      if (it.checked) {
        filterParams.features.push(it.value);
      }
    });
    getFilteredObjects(window.common.objectsForRent);
  };
  //  OBJECT = objectsForRent item (1 house);
  //  param = type, rooms or guests
  //  targetValue = 'bungalo'

  var filterType = function (it) {
    return (it.offer.type === filterParams.type) || (filterParams.type === 'any');
  };

  var filterRooms = function (it) {
    return (it.offer.rooms.toString() === filterParams.rooms) || (filterParams.rooms === 'any');
  };

  var filterGuests = function (it) {
    return it.offer.guests.toString() === filterParams.guests || filterParams.guests === 'any';
  };

  var checkFeatures = function (checkbox, it) {
    return (!checkbox.checked) || (it.offer.features.indexOf(checkbox.value) !== -1);
  };


  //  MAP with min and max price for all price values
  var HousePriceMap = {
    'low': [0, 9999],
    'middle': [10000, 49999],
    'high': [50000, 1000000],
    'any': [0, 1000000]
  };

  var filterPrice = function (it) {
    var minPrice = HousePriceMap[filterParams.price][0];
    var maxPrice = HousePriceMap[filterParams.price][1];
    return (((it.offer.price >= minPrice) && (it.offer.price <= maxPrice)) || filterParams.price === 'any');
  };

  var resultFilter = function (it) {
    return filterType(it) &&
      filterRooms(it) &&
      filterGuests(it) &&
      filterPrice(it) &&
      checkFeatures(wifi, it) &&
      checkFeatures(dishwasher, it) &&
      checkFeatures(parking, it) &&
      checkFeatures(washer, it) &&
      checkFeatures(elevator, it) &&
      checkFeatures(conditioner, it);
  };

  var getFilteredObjects = function (object) {
    var data = object.filter(function (ad) {
      return resultFilter(ad);
    });
    if (data.length > 5) {
      data = data.slice(0, 5);
    }
    window.pin.removePins(window.map.containerForPin);
    window.pin.paintPin(data);
  };

  window.filter = {
    setFilterActiveState: setFilterActiveState,
    getFilteredObjects: getFilteredObjects,
    getFilterParams: getFilterParams
  };
})();
