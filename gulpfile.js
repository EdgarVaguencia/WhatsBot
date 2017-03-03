const gulp = require('gulp');
const _$ = require('gulp-load-plugins')();
const rsequence = require('run-sequence');
const del = require('del');

const srcJs = ['src/**/*.js', '!src/vendor/*.js'];
const srcCs = ['src/stylus/*.styl'];

gulp.task('clean', function(cb) {
    return del('./tmp/**/*');
    cb(err);
});

gulp.task('build', ['clean'], function() {
    rsequence('chrome')
})

gulp.task('dist', ['chrome:zip']);

gulp.task('chrome', ['chrome:html', 'chrome:js', 'chrome:icons', 'chrome:css', 'chrome:vendor'], function() {
    return gulp.src('./src/chrome/*.json')
        .pipe(gulp.dest('./tmp/chrome'));
});

gulp.task('chrome:html', function(cb) {
    return universalFile('chrome', 'html');
    cb(err);
});

gulp.task('chrome:js', function(cb) {
    return gulp.src(srcJs)
        .pipe(_$.jsmin())
        .pipe(_$.rename(function(path) {
            if (path.dirname === 'chrome') {
                path.dirname = './'
            }
            path.basename += '.min';
        }))
        .pipe(gulp.dest('tmp/chrome'))
        cb(err);
});

gulp.task('chrome:icons', function(cb) {
    return universalFile('chrome', 'icons');
    cb(err);
});

gulp.task('chrome:css', function(cb) {
    return gulp.src(srcCs)
        .pipe(_$.stylus())
        .pipe(_$.csso())
        .pipe(gulp.dest('src/css/'))
        .pipe(_$.rename({dirname: 'css', suffix: '.min'}))
        .pipe(gulp.dest('tmp/chrome'))
    cb(err);
});

gulp.task('chrome:vendor', function(cb) {
    return universalFile('chrome', 'vendor');
    cb(err);
});

gulp.task('chrome:zip', function() {
    return gulp.src('./tmp/chrome/**/*')
        .pipe(_$.zip('chrome.zip'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    gulp.watch(srcJs, ['build']);
    gulp.watch(srcCs, ['build'])
    gulp.watch(['src/chrome/manifest.json', 'src/html/*.html'], ['build'])
});

function universalFile(folderName, files) {
    return gulp.src('./src/' + files + '/*')
        .pipe(gulp.dest('./tmp/' + folderName + '/' + files));
}