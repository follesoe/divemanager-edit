var fs = require('fs');
var moment = require('moment');
var _ = require('lodash');
var sqlite3 = require("sqlite3").verbose();

'use strict';
angular.module('suuntoDMEditor')
  .controller('main', function ($scope, dbpath, dbaccess) {
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
        $scope.dives = dives;
        if (dives.length > 0) {
          $scope.selectedDive = dives[0];
        }
      });
    }

  });
