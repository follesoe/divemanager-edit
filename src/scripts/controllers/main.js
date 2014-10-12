var fs = require('fs');
var moment = require('moment');
var _ = require('lodash');
var sqlite3 = require("sqlite3").verbose();

//	'~/.config/Suunto/Suunto\ DM4/1.1.14.3463/';

'use strict';
angular.module('suuntoDMEditor')
  .controller('main', function ($scope) {
		var db;
		var dmDir = process.env.HOME + '/.config/Suunto/Suunto DM4';

		if (fs.existsSync(dmDir)) {
			var files = fs.readdirSync(dmDir);
			var versionDir = _(files).filter(function (f) {
				var stat = fs.statSync(dmDir + '/' + f);
				return stat.isDirectory();
			}).first();
			dmDir = dmDir + '/' + versionDir;
		}

		$scope.mode = 0;
		$scope.note = '';
		$scope.file = dmDir + '/DM4.db';
		$scope.fileExists = fs.existsSync($scope.file);
		$scope.dives = [];
		$scope.selectedDives = [];

		$scope.save = function () {
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
		}

		$scope.backup = function () {
			if (!$scope.fileExists) {
				return;
			}
			fs.createReadStream($scope.file).pipe(fs.createWriteStream(dmDir + '/DM4.backup.db'));
		}

		$scope.deselect = function () {
			_($scope.dives).forEach(function (dive) {
				dive.selected = false;
			});
		}

		if ($scope.fileExists) {
			db = new sqlite3.Database($scope.file);
			db.each('SELECT DiveId, StartTime, Duration, Mode, MaxDepth, Note FROM Dive ORDER BY StartTime DESC', function (err, row) {
				row.selected = false;
				row.StartTime = moment((row.StartTime - 621355968000000000)/10000).zone(0).format('DD.MM.YY hh:mm');
				console.log(row.Duration);
				row.Duration = moment.utc(0).add(row.Duration, 's').format('HH:mm:ss');
				$scope.dives.push(row);
				$scope.$apply();
			});
			db.close();
		}
	});
