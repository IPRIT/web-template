var gulp = require('gulp');
var del = require('del');

var config = require('./gulp-config');

var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var cssnext = require('gulp-cssnext');
var minifyCss = require('gulp-cssnano');
var minifyJs = require('gulp-minify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

gulp.task('clean', function() {
  del([config.image.dest + '/*.*']);
  del([config.js.dest + '/*.*']);
  del([config.sass.dest + '/*.*']);
  del([config.css.dest + '/*.*']);
  del([config.jade.dest + '/*.*']);
  del([config.favicon.dest]);
  del([config.dest]);
});

gulp.task('jade', function() {
  gulp.src(config.jade.src)
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(config.jade.dest));
    //.pipe(browserSync.reload({ stream: true }));
});

gulp.task('sass', function() {
  gulp.src(config.sass.src)
    .pipe(plumber())
    .pipe(sass())
    .pipe(cssnext({ browsers: config.sass.browsers }))
    .pipe(gulpif(config.sass.minify, minifyCss()))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('css', function () {
  gulp.src(config.css.src)
    .pipe(gulp.dest(config.css.dest))
    .pipe(gulpif(config.css.minify, minifyCss()))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', function () {
  gulp.src(config.js.src)
    .pipe(plumber())
    .pipe(gulpif(config.js.minify, minifyJs()))
    .pipe(gulp.dest(config.js.dest))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('image', function () {
  gulp.src(config.image.src)
    .pipe(imagemin(config.image.imageminOptions))
    .pipe(gulp.dest(config.image.dest))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('favicon', function () {
  gulp.src(config.favicon.src)
    .pipe(gulp.dest(config.favicon.dest))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', function () {
  gulp.watch(config.js.src, ['js']);
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.css.src, ['css']);
  gulp.watch(config.jade.src[0], ['jade']);
  gulp.watch(config.image.src, ['image']);
  gulp.watch(config.favicon.src, ['favicon']);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: config.dest
    }
  });
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['image', 'js', 'sass', 'css', 'jade', 'favicon'],
    callback
  );
});

// Default Task
gulp.task('default', function(callback) {
  return runSequence(
    'build',
    'watch',
    'browser-sync',
    callback
  );
});
