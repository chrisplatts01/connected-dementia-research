'use strict';


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// Testing Webpack
var vinylPaths = require('vinyl-paths');
var gutil = require('gulp-util');
var gprint = require('gulp-print');
var del = require('del');
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');


// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

var input = './';
var inputTemplates = input + '/pages/**/*.njk';
var inputPages = input + '/pages/*.njk';
var inputStyles = input + '/styles/**/*.scss';
var inputStylesMain = input + '/styles/main.scss';
var inputImages = input + '/images/**/*';
var inputFonts = input + '/fonts/**/*';
var inputScripts = [
      'scripts/main.js'
    ];

var output = './dist';
var outputStyles = output + '/styles';
var outputImages = output + '/images';
var outputFonts = output + '/fonts';
var outputScripts = output + '/scripts';

var sassOptions = { outputStyle: 'expanded' };
var autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] };
var sassdocOptions = { dest: output + '/sassdoc' };

// -----------------------------------------------------------------------------
// Scripts (using Webpack)
// -----------------------------------------------------------------------------
gulp.task('clean_scripts', () => {
    return gulp.src(`${outputScripts}*`)
      .pipe(vinylPaths(del));
});

gulp.task('scripts', ['clean_scripts'] ,() => {
    return webpackStream(webpackConfig)
      .pipe(gulp.dest(`${outputScripts}`));
      // .pipe(browserSync.stream());
});


// -----------------------------------------------------------------------------
// Sass compilation
// -----------------------------------------------------------------------------
gulp.task('sass', function() {
  return gulp
    .src(inputStylesMain)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(outputStyles))
    .pipe(browserSync.stream());
});


// -----------------------------------------------------------------------------
// Templating
// -----------------------------------------------------------------------------
gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['./templates/']);
  return gulp.src(inputPages)
  .pipe(nunjucksRender())
  .pipe(gulp.dest(output))
});


// -----------------------------------------------------------------------------
// Imagemin
// -----------------------------------------------------------------------------
gulp.task('img', function() {
  return gulp.src(inputImages)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(outputImages));
});


// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------
gulp.task('fonts', function() {
  return gulp.src([inputFonts])
  .pipe(gulp.dest(outputFonts));
});


// -----------------------------------------------------------------------------
// Sass documentation generation
// -----------------------------------------------------------------------------
gulp.task('sassdoc', function() {
  return gulp
    .src(input)
    .pipe(sassdoc(sassdocOptions))
    .resume();
});

// -----------------------------------------------------------------------------
// Clean distribution directory
// -----------------------------------------------------------------------------
gulp.task('clean', () => {
    return gulp.src(`${output}*`)
      .pipe(vinylPaths(del));
});


// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------
gulp.task('watch', function() {
    // Watch the sass input folder for change,
    // and run `sass` task when something happens
    gulp.watch(inputStyles, ['sass']).on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    gulp.watch(inputScripts, ['webpack_scripts']).on('change', browserSync.reload);

    // Watch nunjuck templates and reload browser if change
    gulp.watch(inputTemplates, ['nunjucks']).on('change', browserSync.reload);

});


// -----------------------------------------------------------------------------
// Static server
// -----------------------------------------------------------------------------

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: output
    }
  });
});


// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------

gulp.task('default', ['sass', 'nunjucks', 'img', 'scripts', 'fonts', 'watch', 'browser-sync']);
