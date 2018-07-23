'use strict'

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
var gulp = require('gulp')
var data = require('gulp-data')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var sassdoc = require('sassdoc')
var browserSync = require('browser-sync').create()
var nunjucksRender = require('gulp-nunjucks-render')
var imagemin = require('gulp-imagemin')
// var uglify = require('gulp-uglify')
var pngquant = require('imagemin-pngquant')
var fs = require('fs')
var bourbon = require('bourbon').includePaths
var vinylPaths = require('vinyl-paths')
var del = require('del')
var webpackStream = require('webpack-stream')
var webpackConfig = require('./webpack.config.js')

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------
var input = './app/'
var inputData = input + 'data/data.json'
var inputTemplates = input + 'templates/**/*.njk'
var inputTemplateMain = input + 'templates/'
var inputPages = input + 'pages/*.njk'
var inputStyles = input + '**/*.scss'
var inputStylesMain = input + 'styles/main.scss'
var inputImages = input + 'images/**/*'
var inputFonts = input + 'fonts/**/*'
var inputScripts = [
  input + 'scripts/**/*.js'
]

var output = './dist/'
var outputStyles = output + 'styles'
var outputImages = output + 'images'
var outputFonts = output + 'fonts'
var outputScripts = output + 'scripts'

var sassOptions = {
  outputStyle: 'expanded',
  sourcemaps: true,
  includePaths: [bourbon]
}
var autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] }
var sassdocOptions = { dest: output + 'sassdoc' }

// -----------------------------------------------------------------------------
// Scripts (using Webpack)
// -----------------------------------------------------------------------------
gulp.task('clean_scripts', () => {
  return gulp.src(`${outputScripts}*`)
    .pipe(vinylPaths(del))
})

gulp.task('scripts', ['clean_scripts'], () => {
  return webpackStream(webpackConfig)
    .pipe(gulp.dest(`${outputScripts}`))
    .pipe(browserSync.stream())
})

// -----------------------------------------------------------------------------
// Sass compilation
// -----------------------------------------------------------------------------
gulp.task('sass', function () {
  return gulp
    .src(inputStylesMain)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(outputStyles))
    .pipe(browserSync.stream())
})

// -----------------------------------------------------------------------------
// Nunkucks template compilation
// -----------------------------------------------------------------------------
gulp.task('nunjucks', function () {
  nunjucksRender.nunjucks.configure([inputTemplateMain])
  return gulp.src(inputPages)
    .pipe(data(function () {
      return JSON.parse(fs.readFileSync(inputData))
    }))
    .pipe(nunjucksRender())
    .pipe(gulp.dest(output))
})

// -----------------------------------------------------------------------------
// Imagemin
// -----------------------------------------------------------------------------
gulp.task('img', function () {
  return gulp.src(inputImages)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(outputImages))
})

// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------
gulp.task('fonts', function () {
  return gulp.src([inputFonts])
    .pipe(gulp.dest(outputFonts))
})

// -----------------------------------------------------------------------------
// Sass documentation generation
// -----------------------------------------------------------------------------
gulp.task('sassdoc', function () {
  return gulp
    .src(input)
    .pipe(sassdoc(sassdocOptions))
    .resume()
})

// -----------------------------------------------------------------------------
// Clean distribution directory
// -----------------------------------------------------------------------------
gulp.task('clean', () => {
  return gulp.src(`${output}*`)
    .pipe(vinylPaths(del))
})

// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------
gulp.task('watch', function () {
  gulp.watch(inputStyles, ['sass']).on('change', browserSync.reload)
  gulp.watch(inputScripts, ['scripts']).on('change', browserSync.reload)
  gulp.watch(inputTemplates, ['nunjucks']).on('change', browserSync.reload)
  gulp.watch(inputPages, ['nunjucks']).on('change', browserSync.reload)
  gulp.watch(inputData, ['nunjucks']).on('change', browserSync.reload)
})

// -----------------------------------------------------------------------------
// Static server
// -----------------------------------------------------------------------------
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: output
    }
  })
})

// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------
gulp.task('default', ['sass', 'nunjucks', 'img', 'scripts', 'fonts', 'watch', 'browser-sync'])
