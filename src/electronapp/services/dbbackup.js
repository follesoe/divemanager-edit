var fs = require('fs-extra');
var shell = require('shell');
var path = require('path');
var dbpath = require('./dbpath');
var dialog = require('dialog');

var pathResult = dbpath.getPath();

function openFolder() {
  if (pathResult.exists) {
    shell.showItemInFolder(pathResult.path);
  }
}

function runBackup() {
  if (pathResult.exists) {
    var filename = 'SuuntoDiveManagerBackup-' +
      (new Date().toISOString()
        .replace(/T/, '-')
        .replace(/\..+/, '')
        .replace(/:/g, '-')) + '.backup';

    var directories = dialog.showOpenDialog({ properties: ['openDirectory']});
    if (!directories) return;

    var backupPath = path.join(directories[0], filename);
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
