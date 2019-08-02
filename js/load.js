'use strict';

(function () {
  window.load = {
    get: function (url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Ошибка сервера: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Прозиошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Произошла ошибка таймаута');
      });

      xhr.timeout = 10000;

      xhr.open('GET', url);
      xhr.send();
    },
    post: function (url, formData, onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Ошибка сервера: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Прозиошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Произошла ошибка таймаута');
      });

      xhr.timeout = 10000;

      xhr.open('POST', url);
      xhr.send(formData);
    }
  };
})();
