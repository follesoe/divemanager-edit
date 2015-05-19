angular.module('suuntoDMEditor')
  .filter('round', function () {
    return function (input) {
      console.log(input);
      return Math.round(input);
    };
  });
