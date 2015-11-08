var fs = require('fs');

var getFirstSubDirectory = function (fromDir) {
  var content = fs.readdirSync(fromDir);
  return content.filter(function (f) {
    return fs.statSync(fromDir + f).isDirectory();
  }).reverse()[0];
}

var getPath = function () {
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
}

module.exports.getPath = getPath;
