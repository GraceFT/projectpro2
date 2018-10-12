const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
//const browserify = require('gulp-browserify');
//const rename = require('gulp-rename');
//const browserSync = require('browser-sync').create();
// const concat = require('gulp-concat');
// const addsrc = require('gulp-add-src');
// const uglify = require('gulp-uglify');
// const htmlmin = require('gulp-htmlmin');
// const connect = require('gulp-connect-php');

const config = {
  src: './src/',
  dist: './dist/'
};

const paths = {
  html: '*.pug',
  js: 'js/*.js',
  scss: 'scss/styles.scss',
  jquery: 'js/vendor/*.js',
  img: 'img/*.+(png|jpg|gif|svg|ico)',
 
};

// gulp.task('html', (done) => {
//   gulp.src(config.src + paths.html)
//     .pipe(htmlmin({
//       collapseWhitespace: true
//     }))
//     .pipe(gulp.dest(config.dist))
//     // browserSync.reload();
//     .pipe(browserSync.reload({
//       stream: true
//     }))
//   done();
// });

gulp.task('pug', () => {
    gulp.src(config.src + paths.html)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(config.dist))
});

gulp.task('js', () => {
  return gulp.src(config.src + paths.js)
    // .pipe(uglify())
    // .pipe(browserify())
    .pipe(rename('scripts.js'))
    .pipe(gulp.dest(config.dist + 'js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('sass', () => {
  gulp.src(config.src + paths.scss)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('Error', sass.logError))
    .pipe(gulp.dest(config.dist + 'css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// gulp.task('styles', () => {
//   gulp.src(config.src + paths.styles)
//     .pipe(sass({
//       outputStyle: 'compressed'
//     }).on('Error', sass.logError))
//     .pipe(gulp.dest(config.dist + 'css'))
//     .pipe(browserSync.reload({
//       stream: true
//     }))
// });

gulp.task('img', () => {
  gulp.src(config.src + 'assets/' + paths.img)
    .pipe(gulp.dest(config.dist + 'assets/' + 'img'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('start', ['pug', 'js', 'sass', 'img']);

/*gulp.task('serve', () => {
  connect.server({}, function() {
    browserSync.init({
      proxy: '127.0.0.1:8000'
    });
  });
*/
  gulp.watch(config.src + paths.html, ['pug']);
  gulp.watch(config.src + paths.js, ['js']);
  gulp.watch(config.src + paths.scss, ['sass']);
  // gulp.watch(config.src + 'assets/' + paths.img, ['img']);


