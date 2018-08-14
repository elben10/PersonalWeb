var gulp = require('gulp');
var clean = require('gulp-clean');
var cleanCSS = require('gulp-clean-css');
var insert = require('gulp-insert');
var rename = require("gulp-rename");
var run = require('gulp-run');
var runSequence = require('run-sequence');
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

// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./static/css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      './static/css/*.css',
      '!./static/css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./static/css'));
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
      './static/js/*.js',
      '!./static/js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./static/js'))
});

// js
gulp.task('js', ['js:minify']);


// hugo
gulp.task('hugo:clean_new_site', function(){
  return gulp.src('testsite')
    .pipe(clean())
})

gulp.task('hugo:new_site', function(){
  return run('hugo new site testsite').exec()
})

gulp.task('hugo:copy_theme', function(){
  return gulp.src([
    './**/*',
    '!./testsite',
    '!./testsite/*/**'
  ])
  .pipe(gulp.dest('./testsite/themes/PersonalWeb'))
})

gulp.task('hugo:add_theme_config', function(){
  return run("echo 'theme = \"PersonalWeb\"' >> testsite/config.toml").exec()
})

gulp.task('hugo:build_test', function(){
  return run('cd testsite; hugo').exec()
})



gulp.task('hugo', function(callback) {
  runSequence(
    'hugo:clean_new_site',
    'hugo:new_site',
    'hugo:copy_theme',
    'hugo:add_theme_config',
    'hugo:build_test',
    'hugo:clean_new_site',
    callback
  );
});

gulp.task('hugo:move_theme', function(){
  return run('cp -a  testsite/themes/PersonalWeb').exec()
})


// Default task
gulp.task('default', ['css', 'js', 'vendor']);

gulp.task('test', ['hugo'])
