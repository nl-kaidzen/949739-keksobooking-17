'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_WIDTH = 70;
  var DropZoneStyle = {
    BORDER_HIGHLITED: '#b53737',
    BORDER_DEFAULT: '#c7c7c7',
    BG_HIGHLITED: 'rgba(185, 55, 55, 0.2)',
    BG_DEFAULT: 'transparent'
  };

  var avatarChooser = window.common.adForm.querySelector('#avatar');
  var avatarImg = window.common.adForm.querySelector('#avatar-img');
  var avatarDefault = avatarImg.src;

  var photoChooser = window.common.adForm.querySelector('#images');
  var photo = window.common.adForm.querySelector('.ad-form__photo');
  var photoContainer = window.common.adForm.querySelector('.ad-form__photo-container');

  var avatarFile;
  var photoFiles = []; //  Array for files from FileChooser
  var photosCorrect = []; // Array with correct photos for download at server
  var image; // Image for room photo

  //  Clear avatar
  var clearAvatar = function () {
    avatarImg.src = avatarDefault;
    window.attachment.avatarFile = undefined;
  };

  //  Check types of files
  var checkType = function (file) {
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  // Render avatar
  var renderPreview = function (file, preview) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  avatarChooser.addEventListener('change', function () {
    avatarFile = avatarChooser.files[0];
    if (avatarFile && checkType(avatarFile)) {
      renderPreview(avatarFile, avatarImg);
    }
    window.attachment.avatarFile = undefined;
  });

  // Render some files

  photoChooser.addEventListener('change', function () {
    photoFiles = Array.from(photoChooser.files);
    photoFiles.forEach(function (element) {
      if (checkType(element)) {
        if (!image) {
          image = document.createElement('img');
          image.width = IMAGE_WIDTH;
          renderPreview(element, image);
          photo.appendChild(image);
        } else {
          var photoClone = photo.cloneNode(true);
          image = photoClone.querySelector('img');
          renderPreview(element, image);
          photoContainer.appendChild(photoClone);
        }
        photosCorrect.push(element);
      }
    });
  });

  var clearPhoto = function () {
    var photoList = photoContainer.querySelectorAll('.ad-form__photo');
    photoList.forEach(function (it) {
      it.remove();
    });
    var newPhoto = document.createElement('div');
    newPhoto.classList.add('ad-form__photo');
    photoContainer.appendChild(newPhoto);

    image = undefined;
    photo = window.common.adForm.querySelector('.ad-form__photo');
  };

  // Drag'n'drop functional

  var avatarDropZone = window.common.adForm.querySelector('.ad-form-header__drop-zone');
  //  var photoDropZone = window.common.adForm.querySelector('.ad-form__drop-zone');

  var preventDefaults = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  };

  var setIndication = function (element) {
    element.style.borderColor = DropZoneStyle.BORDER_HIGHLITED;
    element.style.backgroundColor = DropZoneStyle.BG_HIGHLITED;
  };

  var removeIndication = function (element) {
    element.style.borderColor = DropZoneStyle.BORDER_DEFAULT;
    element.style.backgroundColor = DropZoneStyle.BG_DEFAULT;
  };

  avatarDropZone.addEventListener('dragenter', function (evt) {
    preventDefaults(evt);
    setIndication(avatarDropZone);
  });

  avatarDropZone.addEventListener('dragover', function (evt) {
    preventDefaults(evt);
    setIndication(avatarDropZone);
    evt.dataTransfer.dropEffect = 'copy';
  });

  avatarDropZone.addEventListener('dragleave', function (evt) {
    preventDefaults(evt);
    removeIndication(avatarDropZone);
  });

  avatarDropZone.addEventListener('drop', function (evt) {
    preventDefaults(evt);
    removeIndication(avatarDropZone);
    avatarFile = evt.dataTransfer.files[0];
    if (avatarFile && checkType(avatarFile)) {
      renderPreview(avatarFile, avatarImg);
      window.attachment.avatarFile = avatarFile;
    }
  });


  window.attachment = {
    clearAvatar: clearAvatar,
    clearPhoto: clearPhoto,
    avatarFile: avatarFile,
    photosCorrect: photosCorrect
  };
})();
