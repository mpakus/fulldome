var gulp      = require('gulp');

var coffee    = require('gulp-coffee');
var concat    = require('gulp-concat');
var uglify    = require('gulp-uglify');
var sass      = require('gulp-sass');
// var bourbon   = require('node-bourbon').includePaths;
var plumber   = require('gulp-plumber');
var minifycss = require('gulp-minify-css');
var gulpif    = require('gulp-if');

var paths = {
  scripts: ['public/src/javascripts/*.coffee', 'public/src/javascripts/*.js'],
  styles: ['public/src/stylesheets/application.scss', 'public/src/stylesheets/sass/*.scss']
};

gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(gulpif(/[.]coffee$/, coffee()))
    .pipe(uglify())
    .pipe(concat('application.js'))
    .pipe(gulp.dest('public/assets/'));
});

gulp.task('styles', function () {
  gulp.src('public/src/stylesheets/application.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: ['public/src/stylesheets/sass/'] // .concat(bourbon)
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('public/assets/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);
