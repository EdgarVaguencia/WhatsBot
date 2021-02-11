const gulp = require('gulp')
const _$ = require('gulp-load-plugins')()
const del = require('del')
const manifest = require('./src/chrome/manifest.json')

const srcJs = ['src/**/*.js', '!src/vendor/*.js']
const srcCs = ['src/stylus/*.styl']

function clean (cb) {
  del('./tmp/**/*')
  cb()
}

const chromeFiles = gulp.series(chromeHtml, chromeJs, chromeIcons, chromeCss, chromeVendor, chromeJson)

gulp.task('build', gulp.series(clean, chromeFiles))

gulp.task('dist', gulp.series(chromeFiles, chromeZip))

function chromeJson (cb) {
  gulp.src('./src/chrome/*.json')
    .pipe(gulp.dest('./tmp/chrome'))
  cb()
}

function chromeHtml (cb) {
  universalFile('chrome', 'html', cb)
}

function chromeJs (cb) {
  return gulp.src(srcJs)
    .pipe(_$.jsmin())
    .pipe(_$.rename(function (path) {
      if (path.dirname === 'chrome') {
        path.dirname = './'
      }
      path.basename += '.min'
    }))
    .pipe(gulp.dest('tmp/chrome'))
    .on('error', function (err) {
      console.error('Js: ' + err.toString())
    })
}

function chromeIcons (cb) {
  universalFile('chrome', 'icons', cb)
}

function chromeCss (cb) {
  gulp.src(srcCs)
    .pipe(_$.stylus())
    .pipe(_$.csso())
    .on('error', err => {
      console.error(err.toString())
    })
    .pipe(_$.rename({ dirname: 'css', suffix: '.min' }))
    .pipe(gulp.dest('tmp/chrome'))
    .on('error', err => {
      console.error(err.toString())
    })
  cb()
}

function chromeVendor (cb) {
  universalFile('chrome', 'vendor', cb)
}

function chromeZip (cb) {
  gulp.src('./tmp/chrome/**/*')
    .pipe(_$.zip(`whatsbot_${manifest.version}.zip`))
    .pipe(gulp.dest('./dist'))
  cb()
}

gulp.task('watch', function (cb) {
  gulp.watch(srcJs, gulp.series(chromeJs))
  gulp.watch(srcCs, gulp.series(chromeCss))
  gulp.watch(['src/chrome/manifest.json'], gulp.series(chromeJson))
  gulp.watch(['src/html/*.html'], gulp.series(chromeHtml))
  cb()
})

function universalFile (folderName, files, cb) {
  gulp.src('./src/' + files + '/*')
    .pipe(gulp.dest('./tmp/' + folderName + '/' + files))
  cb()
}

exports.default = gulp.series('watch')
