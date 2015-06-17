var _ = require('lodash');
var moment = require('moment');
var sqlite3 = require('sqlite3').verbose();

var getDives = function (dbPath) {
  var promise = new Promise(function (resolve, reject) {
    var db = new sqlite3.Database(dbPath);
    var dives = [];

    db.all('SELECT DiveId, StartTime, Duration, Mode, MaxDepth, Note, BottomTemperature, DiveNumberInSerie, Source FROM Dive ORDER BY StartTime DESC', function (err, rows) {
      _(rows).each(function (row) {
        row.Selected = false;
        row.StartDate = moment((row.StartTime - 621355968000000000)/10000).utcOffset(0).format('DD.MM.YYYY');
        row.StartTime = moment((row.StartTime - 621355968000000000)/10000).utcOffset(0).format('HH:mm');
        row.Duration = moment.utc(0).add(row.Duration, 's').format('HH:mm:ss');
        row.MaxDepth = Math.round(row.MaxDepth);
        dives.push(row);
      });
      resolve(dives);
    });

    db.close();
  });

  return promise;
}

var saveDive = function (dbPath, dive) {
  var db = new sqlite3.Database(dbPath);
  db.serialize(function () {
    var stmt = db.prepare('UPDATE Dive SET Mode = (?) WHERE DiveId = (?)');
    stmt.run(dive.Mode, dive.DiveId);
    stmt.finalize();
  });
  db.close();
}

module.exports.getDives = getDives;
module.exports.saveDive = saveDive;
