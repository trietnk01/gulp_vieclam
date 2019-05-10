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
    return gulp.src([
                    'src/scss/style.scss'
                    ])
    .pipe(sass().on("error",sass.logError))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(sourcemaps.write())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('src/css/'));
});

gulp.task('css-vidoco', ['scss-vidoco'], function () {
    return gulp.src(['src/bootstrap-4/css/bootstrap.min.css',
                    'src/fontawesome/css/all.min.css',
                    'src/css/spinner.css',
                    'src/owlcarousel/owl.carousel.min.css',
                    'src/ddsmoothmenu/css/ddsmoothmenu.css',
                    'src/ui/jquery-ui.css',
                    'src/select2/select2.min.css',
                    'src/datatables/jquery.dataTables.min.css',
                    'src/summernote/summernote-bs4.css',
                    'src/animated/animate-3.5.2.css',
                    'src/alophone/css/callnow.css',
                    'src/css/bundle.css',
                    ])
    .pipe(cleanCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('../vieclam/public/frontend/css/'));
});


gulp.task('js-vidoco', function() {
    return gulp.src([
        'src/js/jquery-1.11.3.min.js',
        'src/bootstrap-4/js/bootstrap.min.js',
        'src/fontawesome/js/all.min.js',
        'src/ui/jquery-ui.js',
        'src/datatables/jquery.dataTables.min.js',
        'src/select2/select2.min.js',
        'src/summernote/popper.js',
        'src/summernote/summernote-bs4.js',
        'src/ddsmoothmenu/js/ddsmoothmenu.js',
        'src/owlcarousel/owl.carousel.min.js',
        'src/counterup/jquery.counterup.min.js',
        'src/counterup/waypoints.min.js',
        'src/js/platform.js',
        'src/js/scroll-top.js',
        'src/js/owl-carousel-pro.js',
        'src/js/spinner.js',
        'src/js/table-library.js',
        'src/js/custom.js',
        'src/js/function.js',
        ])
    .pipe(plumber())
    .pipe(uglify())
    .on('error', function (err) {
        browserSync.pause();
        console.log('++++++++++++++++ JS fails ++++++++++++++++');
        logError(err);
        browserSync.notify('<div style="color:red">JS fail!!!</div>', 30000);
    })
    .pipe(concat('style.min.js'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('../vieclam/public/frontend/js/'))
});


gulp.task('default', ['scss-vidoco', 'css-vidoco','js-vidoco'], function () {
    console.log('/***DONE***/');
});