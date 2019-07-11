'use strict';

  window.card.changeCardData = function (object) {
    //  VARIABLES
    var card = document.querySelector('.popup');
    var cardUserPic = card.querySelector('.popup__avatar');
    var cardCloseBtn = card.querySelector('.popup__close');
    var cardTitle = card.querySelector('.popup__title');
    var cardAddress = card.querySelector('.popup__text--address');
    var cardHousePrice = card.querySelector('.popup__text--price');
    var cardHouseType = card.querySelector('.popup__type');
    var HouseTypeMap = {
      "bungalo": 'Бунгало',
      "flat": 'Квартира',
      "house": 'Дом',
      "palace": 'Дворец'
    };
    var cardRoomNumber = card.querySelector('.popup__text--capacity');
    var cardCheckTime = card.querySelector('.popup__text--time');
    var cardHouseFeatures = card.querySelector('.popup__features');
    //  HOUSE FEATURES
    var houseWifi = cardHouseFeatures.querySelector('.popup__feature--wifi');
    var houseDishwasher = cardHouseFeatures.querySelector('.popup__feature--dishwasher');
    var houseParking = cardHouseFeatures.querySelector('.popup__feature--parking');
    var houseWasher = cardHouseFeatures.querySelector('.popup__feature--washer');
    var houseElevator = cardHouseFeatures.querySelector('.popup__feature--elevator');
    var houseConditioner = cardHouseFeatures.querySelector('.popup__feature--conditioner');
    // DESCRIPTION
    var cardDescription = card.querySelector('.popup__description');
    //  IMAGES
    var cardImagesContainer = card.querySelector('.popup__photos');
    var houseImage = cardImagesContainer.querySelector('.popup__photo');
    var object = window.common.objectsForRent[1];

    /*  Change data */
    cardUserPic.src = object.author.avatar;
    cardTitle.innerHTML = object.offer.title;
    cardAddress.innerHTML = object.offer.address;
    cardHousePrice.innerHTML = object.offer.price;
    cardHouseType.innerHTML = HouseTypeMap[object.offer.type];
    cardRoomNumber.innerHTML = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей.';
    cardCheckTime.innerHTML = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    cardDescription.innerHTML = object.offer.description;
    console.dir(object);
    console.dir(card);
  };
