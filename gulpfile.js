const polyfill = require('babel-polyfill');
const gulp = require('gulp');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const concat = require('gulp-concat-sourcemap');
const sourcemaps = require('gulp-sourcemaps');
const jsmin = require('gulp-jsmin');
const addsrc = require('gulp-add-src');
const notify = require("gulp-notify");

gulp.task('default', [
    'build-js',
]);

gulp.task('watch', () => {
    gulp.watch('./src/*.js', ['build-js']);
});

gulp.task('build-js', () => {
    gulp.src('./src/js/event-emitter.js')
        .pipe(addsrc.append('./src/PSXhr.js'))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(jsmin())
        .pipe(concat('PSXhr.min.js'))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('./public/'))
        .pipe(notify("Build js done."));

});
