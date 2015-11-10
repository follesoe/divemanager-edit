var fs = require('fs-extra');
var shell = require('shell');
var path = require('path');
var dbpath = require('./dbpath');

var pathResult = dbpath.getPath();

function openFolder() {
  if (pathResult.exists) {
    shell.showItemInFolder(pathResult.path);
  }
}

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function runBackup() {
  if (pathResult.exists) {
    var filename = 'SuuntoDiveManagerBackup-' + (new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-')) + '.backup';
    var backupPath = path.join(getUserHome(), 'Desktop', filename);    
    fs.copy(pathResult.path, backupPath, function (err) {
      if (err) return console.error(err);
      shell.showItemInFolder(backupPath);
    });
  }
}

module.exports = {
  openFolder,
  runBackup
}
