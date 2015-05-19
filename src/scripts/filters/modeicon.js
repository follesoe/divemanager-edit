angular.module('suuntoDMEditor')
  .filter('modeicon', function () {
    return function (input) {
      if (input === 0) {
        return 'images/scubaicon.png';
      } else {
        return 'images/freediveicon.png';
      }
    };
  });
