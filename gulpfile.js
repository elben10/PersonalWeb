var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

gulp.task('vendor', function(){

  // Bootstrap CSS
  gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
  ])
  .pipe(gulp.dest('./static/vendor/bootstrap/css/'))

  // Bootstrap JS
  gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
  ])
  .pipe(gulp.dest('./static/vendor/bootstrap/js/'))

  // jQuery
  gulp.src([
    './node_modules/jquery/jquery.js',
    './node_modules/jquery/jquery.min.js',
  ])
  .pipe(gulp.dest('./static/vendor/jquery/js/'))

  // popper.js
  gulp.src([
    './node_modules/popper.js/dist/popper.js',
    './node_modules/popper.js/dist/popper.min.js',
  ])
  .pipe(gulp.dest('./static/vendor/popper.js/js/'))
})


// Default task
gulp.task('default', ['vendor']);
