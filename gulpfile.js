var NwBuilder = require('nw-builder');
var gulp = require('gulp');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var del = require('del');

gulp.task('clean', function (cb) {
  del(['output/**'], cb);
});

gulp.task('icons', shell.task([
  'iconutil -c icns icons/main.iconset -o icons/main.icns'
]));

gulp.task('nw', ['clean', 'icons'], function () {
  var nw = new NwBuilder({
    version: '0.12.2',
    files: './src/nwjsapp/**/**',
    buildDir: './output/nwjs',
    macIcns: './icons/main.icns',
    platforms: ['osx64']
  });

  nw.on('log', function (msg) {
    gutil.log('nw-builder', msg);
  });

  return nw.build().catch(function (err) {
    gutil.log('nw-builder', err);
  });
});

gulp.task('default', ['nw']);
