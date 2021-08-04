    // PLUGINS 
var gulp = require('gulp'),
sourcemaps = require('gulp-sourcemaps'),
rename = require('gulp-rename'),
autoprefixer = require('gulp-autoprefixer'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat'),
watch = require('gulp-watch'),
sass = require('gulp-sass'),
pug = require('gulp-pug');

const browserSync = require('browser-sync').create();
// PATHS
var path = {
    sass:   "src/sass/",
    js:     "src/js/",
    nm:   "node_modules/",
};

// STYLES
gulp.task('styles', function() {
    return gulp.src([
        path.sass   +    "style.scss",
    ])
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed',
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(concat('style.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('../dist/css'))
    .pipe(browserSync.stream());
});

// SCRIPTS
gulp.task('scripts', function() {

    return gulp.src([
        path.nm   +     "jquery/dist/jquery.min.js",
        path.nm     +   "bootstrap/dist/js/bootstrap.min.js",
        path.js     +   "main.js",
    ], {allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('../dist/'))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('../dist/js'))
    .pipe(browserSync.stream());
});
 gulp.task('html', (done) => {
    browserSync.reload();
    done();
});
/*
gulp.task('views', function buildHTML() {
  return gulp.src('views/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('.'))
}); */

gulp.task('watch', function() {
    gulp.watch(path.sass + '**/*.scss', gulp.parallel('styles'));
    gulp.watch(path.js + '**/*.js', gulp.parallel('scripts'));
   /*  gulp.watch("views/*.pug",  gulp.parallel('views'));*/
    gulp.watch("../dist/*.html",  gulp.parallel('html')); 
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "../dist"
        }
    });
});


gulp.task('default', gulp.parallel('styles','scripts','watch','browser-sync', function (done) {
    done();
}));
