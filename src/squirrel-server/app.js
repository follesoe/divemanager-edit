var fs = require('fs');
var express = require('express');
var cmp = require('semver-compare');
var app = express();

app.use(express.static('../../output'));

app.get('/', function (req, res) {
  res.send('Squirrel Test Server');
});

app.get('/update/darwin/:version', function (req, res) {
  var version = req.params.version;
  fs.readdir('../../output/SuuntoDMEditor-darwin-x64', function (err, files) {
    var zipFiles = files.filter(f => f.endsWith('.zip')).sort(cmp).reverse();
    var match = /\d+\.\d+\.\d+/.exec(zipFiles[0]);
    if (match) {
      var latestVersion = match[0];
      console.log('Checking for version newer than ' + version + ', found ' + latestVersion);

      if (cmp(latestVersion, version) == 1) {
        var url = req.protocol + '://' + req.get('host') + '/SuuntoDMEditor-darwin-x64/' + zipFiles[0];
        var update = {
          url: url,
          name: latestVersion,
          notes: 'New ' + latestVersion + ' update with awesome new features!'
        };
        res.send(update);
      } else {
        res.status(204).send();
      }
    }
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Squirrel Server listening at http://%s:%s', host, port);
});
