'use strict';

(function () {
  //  Show card logic
  var showCard = function (object, pin) {
    var cardTemplate = document.querySelector('#card');

    // Check for old card a map and remove
    var oldCard = window.map.containerForPin.querySelector('.map__card');
    if (oldCard) {
      oldCard.remove();
    }

    // Create new card and change data
    var newCard = cardTemplate.content.cloneNode(true);
    window.map.containerForPin.appendChild(newCard);
    window.card.changeCardData(object);
    removePinActiveState();
    pin.classList.add('map__pin--active');
  };

  var removePinActiveState = function () {
    var pinsOnMap = Array.from(window.map.containerForPin.querySelectorAll('.map__pin'));
    pinsOnMap.forEach(function (it) {
      if (it.classList.contains('map__pin--active')) {
        it.classList.remove('map__pin--active');
      }
    });
  };

  var changeCardData = function (object) {
    //  VARIABLES
    var card = document.querySelector('.popup');
    var cardUserPic = card.querySelector('.popup__avatar');
    var cardCloseBtn = card.querySelector('.popup__close');
    var cardTitle = card.querySelector('.popup__title');
    var cardAddress = card.querySelector('.popup__text--address');
    var cardHousePrice = card.querySelector('.popup__text--price');
    var cardHouseType = card.querySelector('.popup__type');
    var HouseTypeMap = {
      'bungalo': 'Бунгало',
      'flat': 'Квартира',
      'house': 'Дом',
      'palace': 'Дворец'
    };

    var cardRoomNumber = card.querySelector('.popup__text--capacity');
    var cardCheckTime = card.querySelector('.popup__text--time');
    var cardHouseFeatures = card.querySelector('.popup__features');

    var FeaturesClassMap = {
      'wifi': 'popup__feature--wifi',
      'dishwasher': 'popup__feature--dishwasher',
      'parking': 'popup__feature--parking',
      'washer': 'popup__feature--washer',
      'elevator': 'popup__feature--elevator',
      'conditioner': 'popup__feature--conditioner'
    };

    var featuresList = Array.from(cardHouseFeatures.children);

    // Remove default features from card
    featuresList.forEach(function (node) {
      node.remove();
    });
    object.offer.features.forEach(function (feature) {
      var houseFeature = document.createElement('li');
      houseFeature.className = 'popup__feature';
      houseFeature.classList.add(FeaturesClassMap[feature]);
      cardHouseFeatures.appendChild(houseFeature);
    });

    var cardDescription = card.querySelector('.popup__description');

    var cardImagesContainer = card.querySelector('.popup__photos');
    var houseImage = cardImagesContainer.querySelector('.popup__photo');
    object.offer.photos.forEach(function (image) {
      var newImage = houseImage.cloneNode(true);
      newImage.src = image;
      cardImagesContainer.appendChild(newImage);
    });
    houseImage.remove();

    // Update data at caard from object(Pin)
    cardUserPic.src = object.author.avatar;
    cardTitle.textContent = object.offer.title;
    cardAddress.textContent = object.offer.address;
    cardHousePrice.textContent = object.offer.price;
    cardHouseType.textContent = HouseTypeMap[object.offer.type];
    cardRoomNumber.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей.';
    cardCheckTime.textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    cardDescription.textContent = object.offer.description;

    // Click callback
    var onClickCloseBtn = function () {
      card.remove();
      removePinActiveState();
    };
    //  Escape callback
    var onPressEsc = function (evt) {
      if (evt.keyCode === parseInt(window.common.KeyCodes.ESC_KEYCODE, 10)) {
        card.remove();
        removePinActiveState();
        document.removeEventListener('keydown', onPressEsc);
      }
    };

    // Add listener for CloseBtn
    cardCloseBtn.addEventListener('click', onClickCloseBtn);
    document.addEventListener('keydown', onPressEsc);
  };

  window.card = {
    showCard: showCard,
    changeCardData: changeCardData
  };
})();
