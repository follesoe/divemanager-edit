var fs = require('fs');
var _ = require('lodash');

angular.module('suuntoDMEditor')
  .service('dbpath', function () {

    var getFirstSubDirectory = function (fromDir) {
      var content = fs.readdirSync(fromDir);

      var firstSub =
        _(content)
          .filter(function (f) { return fs.statSync(fromDir + f).isDirectory(); })
          .reverse()
          .first();

      return firstSub;
    }

    this.getPath = function () {
      var suuntoDir = process.env.HOME + '/.config/Suunto/';
      var dmDir = suuntoDir + getFirstSubDirectory(suuntoDir) + '/';
      var buildDir = dmDir + getFirstSubDirectory(dmDir) + '/';
      var dbPath = buildDir + 'DM4.db';

      if (fs.existsSync(dbPath)) {
        return {
          exists: true,
          path: dbPath
        };
      } else {
        return {
          exists: false,
          path: ''
        };
      }
    };
  });
