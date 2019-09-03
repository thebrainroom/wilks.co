'use strict'

const postcss = require('gulp-postcss')
const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('autoprefixer')
const sassLint = require('gulp-sass-lint')
const imagemin = require('gulp-imagemin');

const styleInput = './static/css/src/**/*.scss'
const styleOutput = './static/css/'

const scriptInput = './static/js/src/**/*.js'
const scriptOutput = './static/js/'

const imageInput = './static/images/src/*'
const imageOutput = './static/images/'

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
}

gulp.task('lint-styles', () => {
  return gulp
    .src(styleInput)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});


gulp.task('styles', gulp.series('lint-styles', () => {
  const processors = [
    autoprefixer()
  ]

  return gulp
    .src(styleInput)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest(styleOutput))
}));

gulp.task('images', (done) => {
  return gulp.src(imageInput)
    .pipe(imagemin())
    .pipe(gulp.dest(imageOutput))
});

gulp.task('watch:styles', gulp.series('styles', () => {
  return gulp
    .watch(styleInput, gulp.series('styles'));
}));

gulp.task('watch', gulp.parallel('watch:styles', 'images'));

gulp.task('default', gulp.series('watch'));