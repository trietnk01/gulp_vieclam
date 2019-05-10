var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var sass = require("gulp-sass");
var sassGlob = require('gulp-sass-glob');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var scsslint = require('gulp-scss-lint');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var critical = require('critical').stream;

function logError(err) {
    if (err.file) {
        console.log("File ==>", err.file);
    }

    if (err.fileName) {
        console.log("File ==>", err.fileName);
    }

    if (err.line) {
        console.log("Line ==>", err.line);
    }

    if (err.lineNumber) {
        console.log("Line ==>", err.lineNumber);
    }

    if (err.message) {
        console.log("Full message ==>", err.message);
    }
}

gulp.task('scss-vidoco', function () {
    return gulp.src(['scss/pcss.scss',
                    'scss/style.scss'
                    ])
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(sourcemaps.write())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('css/'));
});

gulp.task('css-vidoco', ['scss-vidoco'], function () {
    return gulp.src(['css/normalize-4.2.0.css',
                    'css/bootstrap.min.css',
                    'css/jquery-ui.min.css',
                    'css/all.min.css',
                    'css/animate-3.5.2.css',
                    'css/simplelightbox.min.css',
                    'css/modal-video.min.css',
                    'css/owl.carousel.min.css',
                    'css/ddsmoothmenu.css',
                    'css/select2.min.css',
                    'css/callnow.css',
                    'css/bundle.css'
                    ])
    .pipe(cleanCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('css/'));
});


gulp.task('js-vidoco', function() {
    return gulp.src([
        'js/bootstrap.min.js',
        'js/jquery-ui.min.js',
        'js/simple-lightbox.min.js',
        'js/jquery-modal-video.min.js',
        'js/owl.carousel.min.js',
        'js/wow.min.js',
        'js/jquery.counterup.min.js',
        'js/waypoints.min.js',
        'js/scroll-top.js',
        'js/ddsmoothmenu.js',
        'js/select2.min.js',
        'js/jquery.matchHeight-min.js',
        'js/owl-carousel-pro.js',
        'js/function.js',
        'js/custom.js',
        ])
    .pipe(plumber())
    .pipe(uglify())
    .on('error', function (err) {
        browserSync.pause();
        console.log('++++++++++++++++ JS fails ++++++++++++++++');
        logError(err);
        browserSync.notify('<div style="color:red">JS fail!!!</div>', 30000);
    })
    .pipe(concat('app.min.js'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('js/'))
});


gulp.task('default', ['scss-vidoco', 'css-vidoco','js-vidoco'], function () {
    console.log('/***DONE***/');
});