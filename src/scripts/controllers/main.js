var fs = require("fs");
var moment = require('moment');
var file = '/Users/follesoe/Desktop/DM4.db';
var sqlite3 = require("sqlite3").verbose();

'use strict';
angular.module('suuntoDMEditor')
  .controller('main', function ($scope) {
		$scope.file = file;
		$scope.dives = [];

		var db = new sqlite3.Database(file);
		db.each("SELECT DiveId, StartTime, Duration, Mode, MaxDepth FROM Dive", function(err, row) {
			row.selected = false;
			row.StartTime = moment((row.StartTime - 621355968000000000)/10000);
			$scope.dives.push(row);
			$scope.$apply();
		});
		db.close();
	});
