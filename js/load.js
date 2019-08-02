'use strict';

(function () {
  var SERVER_TIMEOUT = 10000;
  var SERVER_OK_RESPONCE = 200;

  window.load = {
    get: function (url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SERVER_OK_RESPONCE) {
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

      xhr.timeout = SERVER_TIMEOUT;

      xhr.open('GET', url);
      xhr.send();
    },
    post: function (url, formData, onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SERVER_OK_RESPONCE) {
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

      xhr.timeout = SERVER_TIMEOUT;

      xhr.open('POST', url);
      xhr.send(formData);
    }
  };
})();
