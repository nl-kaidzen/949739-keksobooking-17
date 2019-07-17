'use strict';

(function () {
  // SHOW INFO-CARD WITH OBJECT PARAMETERS
  var showCard = function (object) {
    var cardTemplate = document.querySelector('#card');
    var oldCard = window.map.containerForPin.querySelector('.map__card');
    if (oldCard) {
      oldCard.remove();
    }
    var newCard = cardTemplate.content.cloneNode(true);
    window.map.containerForPin.appendChild(newCard);
    window.card.changeCardData(object);
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
    //  HOUSE FEATURES
    var FeaturesClassMap = {
      'wifi': 'popup__feature--wifi',
      'dishwasher': 'popup__feature--dishwasher',
      'parking': 'popup__feature--parking',
      'washer': 'popup__feature--washer',
      'elevator': 'popup__feature--elevator',
      'conditioner': 'popup__feature--conditioner'
    };
    var featuresList = Array.from(cardHouseFeatures.children);
    featuresList.forEach(function (node) {
      node.remove();
    });
    object.offer.features.forEach(function (feature) {
      var houseFeature = document.createElement('li');
      houseFeature.className = 'popup__feature';
      houseFeature.classList.add(FeaturesClassMap[feature]);
      cardHouseFeatures.appendChild(houseFeature);
    });
    // DESCRIPTION
    var cardDescription = card.querySelector('.popup__description');
    //  IMAGES
    var cardImagesContainer = card.querySelector('.popup__photos');
    var houseImage = cardImagesContainer.querySelector('.popup__photo');
    object.offer.photos.forEach(function (image) {
      var newImage = houseImage.cloneNode(true);
      newImage.src = image;
      cardImagesContainer.appendChild(newImage);
    });
    houseImage.remove();

    /*  Change data */
    cardUserPic.src = object.author.avatar;
    cardTitle.innerHTML = object.offer.title;
    cardAddress.innerHTML = object.offer.address;
    cardHousePrice.innerHTML = object.offer.price;
    cardHouseType.innerHTML = HouseTypeMap[object.offer.type];
    cardRoomNumber.innerHTML = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей.';
    cardCheckTime.innerHTML = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    cardDescription.innerHTML = object.offer.description;

    /*  ADD EventListner at CLOSE BUTTON  */
    cardCloseBtn.addEventListener('click', function () {
      card.remove();
    });
  };

  window.card = {
    showCard: showCard,
    changeCardData: changeCardData
  };
})();
