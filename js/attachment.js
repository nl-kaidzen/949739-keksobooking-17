'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = window.common.adForm.querySelector('#avatar');
  var avatarImg = window.common.adForm.querySelector('#avatar-img');
  var avatarDefault = avatarImg.src;

  var avatarFile;

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

  window.attachment = {
    clearAvatar: clearAvatar,
    avatarFile: avatarFile
  };
})();
