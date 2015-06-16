var fs = require('fs');
var moment = require('moment');
var _ = require('lodash');
var sqlite3 = require('sqlite3').verbose();
var dbpath = require('./scripts/services/dbpath.js');
var dbaccess = require('./scripts/services/dbaccess.js');

'use strict';
angular.module('suuntoDMEditor')
  .controller('main', function ($scope) {
    var pathResult = dbpath.getPath();

    $scope.file = pathResult.path;
    $scope.fileExists = pathResult.exists;
    $scope.selectedDive;
    $scope.dives = [];

    $scope.$watch('selectedDive', function (newDive, oldDive) {
      if (newDive) {
        newDive.Selected = true;
      }

      if (oldDive) {
        oldDive.Selected = false;
      }
    });

    $scope.select = function (dive) {
      $scope.selectedDive = dive;
    };

    $scope.save = function () {
      dbaccess.saveDive($scope.file, $scope.selectedDive);
    };

    if ($scope.fileExists) {
      dbaccess.getDives($scope.file).then(function (dives) {
        console.log("Then!" + dives.length);
        $scope.dives = dives;
        if (dives.length > 0) {
          $scope.selectedDive = dives[0];
        }
      });
    }

  });
