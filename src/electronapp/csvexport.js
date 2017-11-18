var moment       = require('moment');
var dbpath       = require('./services/dbpath');
var dbaccess     = require('./services/dbaccess');

var pathResult = dbpath.getPath();

dbaccess.getDives(pathResult.path).then(function (dives) {
  for (var i = 0; i < dives.length; ++i) {
      console.log(`${dives[i].StartDateTime.format('MM/DD/YY')}, ${dives[i].StartTime}, ${dives[i].Duration}, ${dives[i].MaxDepth}, ${dives[i].AvgDepth}, ${dives[i].ModeType}, ${dives[i].Source}`)
  }
});