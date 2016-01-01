var gulp = require('gulp');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var del = require('del');
var packager = require('electron-packager');
var exec = require('child_process').exec;
var package = require('./package.json');

gulp.task('clean', function (cb) {
  del(['output/**'], cb);
});

function getVersions() {
  return {
    electronVersion: package.devDependencies['electron-prebuilt'].replace('^', ''),
    appVersion: package.version
  };
};

gulp.task('icons', shell.task([
  'iconutil -c icns icons/main.iconset -o icons/main.icns'
]));

gulp.task('zip-mac', ['build-electron-mac'], function(cb) {
  var versions = getVersions();
  var cmd = 'zip -r ../../output/SuuntoDMEditor-darwin-x64/SuuntoDMEditor-osx-x64-' + versions.appVersion + '.zip  ../../output/SuuntoDMEditor-darwin-x64/SuuntoDMEditor.app -q -9';
  exec(cmd, function (err, stdout, stderr) {
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.error(stderr);
    }
    cb(err);
  });
});

gulp.task('build-electron-mac', function(cb) {
  var versions = getVersions();
  var opts = {};
  opts['dir'] = '.';
  opts['name'] = 'SuuntoDMEditor';
  opts['platform'] = 'darwin';
  opts['arch'] = 'all';
  opts['version'] = versions.electronVersion;
  opts['app-version'] = versions.appVersion;
  opts['out'] = '../../output';
  opts['icon'] = 'icons/main.icns';
  opts['sign'] = 'Developer ID Application: Jonas Folleso (F9MU884WT4)';
  opts['overwrite'] = true;

  packager(opts, function(err, appPath) {
    if (err) {
      console.error('Error building: ' + err);
    } else {
      console.log('App built to path: ' + appPath);
    }
    cb(err);
  });
});

gulp.task('build-mac', ['build-electron-mac', 'zip-mac']);
