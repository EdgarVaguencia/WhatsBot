const gulp = require('gulp');
const _$ = require('gulp-load-plugins')();
const rsequence = require('run-sequence');
const path = require('path');

const srcJs = ['./src/js/*.js', './src/public/*.js'];
const srcCs = ['./src/stylus/*.styl'];

gulp.task('clean', function() {
    return gulp.src('./tmp')
        .pipe(_$.clean());
});

gulp.task('build', ['clean'], function() {
    rsequence('chrome')
})

gulp.task('dist', function() {
    rsequence('chrome_js:min', 'chrome:zip');
});

gulp.task('chrome_js:min', function() {
    return gulp.src(['./tmp/chrome/*.js', './tmp/chrome/js/*.js', './tmp/chrome/public/*.js'])
        .pipe(_$.foreach(function(stream, file) {
            var dirFile = path.dirname(file.path);
            return stream
                .pipe(_$.uglify())
                .pipe(gulp.dest(dirFile));
        }))
});

gulp.task('chrome', ['chrome:html', 'chrome:js', 'chrome:icons', 'chrome:css', 'chrome:vendor', 'chrome:public'], function() {
    return gulp.src('./src/chrome/*')
        .pipe(gulp.dest('./tmp/chrome'));
});

gulp.task('chrome:html', function() {
    return universalFile('chrome', 'html');
});

gulp.task('chrome:js', function() {
    return universalFile('chrome', 'js');
});

gulp.task('chrome:icons', function() {
    return universalFile('chrome', 'icons');
});

gulp.task('chrome:css', function() {
    return universalFile('chrome', 'css');
});

gulp.task('chrome:vendor', function() {
    return universalFile('chrome', 'vendor');
});

gulp.task('chrome:public', function() {
    return universalFile('chrome', 'public');
});

gulp.task('chrome:zip', function() {
    return gulp.src('./tmp/chrome/**/*')
        .pipe(_$.zip('chrome.zip'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('stylus', function() {
    return gulp.src(srcCs)
        .pipe(_$.stylus())
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('watch', function() {
    gulp.watch(srcJs, ['build']);
    gulp.watch(srcCs, ['stylus', 'build'])
    gulp.watch(['src/chrome/manifest.json','src/chrome/*.js', 'src/html/*.html'], ['build'])
});

function universalFile(folderName, files) {
    return gulp.src('./src/' + files + '/*')
        .pipe(gulp.dest('./tmp/' + folderName + '/' + files));
}