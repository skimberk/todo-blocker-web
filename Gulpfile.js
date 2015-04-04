var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('css', function() {
  gulp.src(['./dev/scss/*.scss'])
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function() {
  gulp.src('./dev/js/index.jsx', {read: false})
  .pipe(browserify({
    transform: ['reactify'],
    extensions: ['.jsx']
  }))
  .pipe(rename('index.js'))
//  .pipe(uglify())
  .pipe(gulp.dest('./public/js'));
});

gulp.task('build', ['css', 'js']);

gulp.task('watch', function() {
  gulp.watch(['./dev/scss/*.scss'], ['css']);
  gulp.watch('./dev/js/**/*', ['js']);
});

gulp.task('default', ['build', 'watch']);
