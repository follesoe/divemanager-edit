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
      var missing = {
        exists: false,
        path: ''
      };

      var suuntoDir = process.env.HOME + '/.config/Suunto/';
      if (!fs.existsSync(suuntoDir)) { return missing; }

      var dmDir = suuntoDir + getFirstSubDirectory(suuntoDir) + '/';
      if (!fs.existsSync(dmDir)) { return missing; }

      var buildDir = dmDir + getFirstSubDirectory(dmDir) + '/';
      if (!fs.existsSync(buildDir)) { return missing; }
      
      var dbPath = buildDir + 'DM4.db';

      if (fs.existsSync(dbPath)) {
        return {
          exists: true,
          path: dbPath
        };
      } else {
        return missing;
      }
    };
  });
