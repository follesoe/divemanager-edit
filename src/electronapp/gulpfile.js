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
