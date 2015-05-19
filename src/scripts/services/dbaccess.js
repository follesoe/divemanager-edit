var _ = require('lodash');
var moment = require('moment');
var sqlite3 = require("sqlite3").verbose();

angular.module('suuntoDMEditor')
  .service('dbaccess', function ($q) {

    this.getDives = function (dbPath) {
      var deferred = $q.defer();
      var db = new sqlite3.Database(dbPath);
      var dives = [];

      db.all('SELECT DiveId, StartTime, Duration, Mode, MaxDepth, Note, BottomTemperature, DiveNumberInSerie FROM Dive ORDER BY StartTime DESC', function (err, rows) {
        _(rows).each(function (row) {
          row.Selected = false;
          row.StartDate = moment((row.StartTime - 621355968000000000)/10000).zone(0).format('DD.MM.YYYY');
          row.StartTime = moment((row.StartTime - 621355968000000000)/10000).zone(0).format('hh:mm');
          row.Duration = moment.utc(0).add(row.Duration, 's').format('HH:mm:ss');
          dives.push(row);
        });
        deferred.resolve(dives);
      });

      db.close();
      return deferred.promise;
    };

    this.saveDive = function (dbPath, dive) {
      var db = new sqlite3.Database(dbPath);
      db.serialize(function () {
        var stmt = db.prepare('UPDATE Dive SET Mode = (?) WHERE DiveId = (?)');
        stmt.run(dive.Mode, dive.DiveId);
        stmt.finalize();
      });
      db.close();
    }

  });
