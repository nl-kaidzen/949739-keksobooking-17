'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_WIDTH = 70;

  var avatarChooser = window.common.adForm.querySelector('#avatar');
  var avatarImg = window.common.adForm.querySelector('#avatar-img');
  var avatarDefault = avatarImg.src;

  var photoChooser = window.common.adForm.querySelector('#images');
  var photo = window.common.adForm.querySelector('.ad-form__photo');
  var photoContainer = window.common.adForm.querySelector('.ad-form__photo-container');

  var avatarFile;
  var photoFiles = []; //  Array for files from FileChooser
  //  var photoCorrect = []; // Array with correct photos for download at server
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
      }
    });
  });

  window.attachment = {
    clearAvatar: clearAvatar,
    avatarFile: avatarFile
  };
})();
