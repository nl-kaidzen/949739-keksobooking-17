'use strict';
(function () {
  //  Variables
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
  var mapFiltersListener = document.querySelector('.map__filters');

  var setFilterActiveState = function () {
    mapFiltersListener.addEventListener('change', function () {
      window.debounce(getFilterParams);
    });
    getFilterParams();/*  For paint pins with default filter values */
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
