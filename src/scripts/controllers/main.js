var fs = require('fs');
var moment = require('moment');
var _ = require('lodash');
var sqlite3 = require("sqlite3").verbose();

//	'~/.config/Suunto/Suunto\ DM4/1.1.14.3463/';

'use strict';
angular.module('suuntoDMEditor')
  .controller('main', function ($scope, dbpath, dbaccess) {
    var pathResult = dbpath.getPath();

    $scope.mode = 0;
    $scope.note = '';
    $scope.file = pathResult.path;
    $scope.fileExists = pathResult.exists;
    $scope.dives = [];
    $scope.selectedDives = [];

    $scope.save = function () {
      /*
      db = new sqlite3.Database($scope.file);
      db.serialize(function () {
        var stmt = db.prepare('UPDATE Dive SET Mode = (?), Note = (?) WHERE DiveId = (?)');
        _($scope.dives).filter('selected').forEach(function (dive) {
          dive.Mode = $scope.mode;
          dive.Note = $scope.note;
          stmt.run(dive.Mode, dive.Note,	 dive.DiveId);
        });
        stmt.finalize();
      });
      db.close();
      alert('Changes committed!');
      */
    }

    $scope.backup = function () {
      /*
      if (!$scope.fileExists) {
        return;
      }
      fs.createReadStream($scope.file).pipe(fs.createWriteStream(dmDir + '/DM4.backup.db'));
      */
    }

    $scope.deselect = function () {
      /*
      _($scope.dives).forEach(function (dive) {
        dive.selected = false;
      });*/
    }

    if ($scope.fileExists) {
      dbaccess.getDives($scope.file).then(function (dives) {
        $scope.dives = dives;
      });
    }

  });
