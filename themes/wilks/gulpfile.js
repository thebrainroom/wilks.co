'use strict'

const postcss = require('gulp-postcss')
const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('autoprefixer')
const sassLint = require('gulp-sass-lint')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const standard = require('gulp-semistandard')
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');

const styleInput = './static/css/src/**/*.scss'
const styleOutput = './static/css/'
const styleCompiled = './static/css/*.css'

const scriptInput = './static/scripts/src/**/*.js'
const scriptOutput = './static/scripts/'
const scriptCompiled = './static/scripts/*.js'

const imageInput = './static/images/src/*'
const imageOutput = './static/images/'

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
}

// Lint source styles through sass-lint
function lintStyles() {
  return gulp
    .src(styleInput)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError()
  );
}

// Compile styles with autoprefixer
function styles() {
  const processors = [
    autoprefixer()
  ]
  return gulp
    .src(styleInput)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest(styleOutput)
  );
}

function minifyStyles() {
  return gulp
    .src(styleCompiled)
    .pipe(cleanCSS())
    .pipe(gulp.dest(styleOutput));
}

// Lint source scripts with standard
function lintScripts() {
  return gulp
    .src(scriptInput)
    .pipe(standard())
    .pipe(standard.reporter('default', {
      showFilePath: true,
      quiet: true
    })
  );
}

// Compile scripts with babel for backwards compatibility
function scripts() {
  return gulp
    .src(scriptInput)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(scriptOutput)
  );
}

function minifyScripts() {
  return gulp
    .src(scriptCompiled)
    .pipe(terser())
    .pipe(gulp.dest(scriptOutput));
}

// Compress all images using imagemin
function images() {
  return gulp
    .src(imageInput)
    .pipe(imagemin())
    .pipe(gulp.dest(imageOutput)
  );
}

function watchAssets() {
  // Watch styles
  gulp.watch(styleInput, gulp.series(lintStyles, styles));
  // Watch images
  gulp.watch(imageInput, gulp.series(images));
}

// Lint and compile scripts only
const js = gulp.series(lintScripts, scripts);
// Lint and compile styles only
const css = gulp.series(lintStyles, styles);
// Lint styles and scripts then compile styles, scripts and images
const build = gulp.series(lintStyles, gulp.parallel(styles, scripts, images), minifyStyles, minifyScripts);
// As above but then watch for changes in styles, scripts and images
const watch = gulp.series(build, gulp.parallel(watchAssets));

// Export private tasks to public gulp functions e.g. `gulp watch`
exports.js = js;
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = watch;