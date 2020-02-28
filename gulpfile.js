const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const buildCSS = () => {
  return gulp.src('./src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    // .pipe(cleanCSS())
    .pipe(gulp.dest('./dist'));
}

const minifyCss = () => {
  return gulp.src('./dist/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
}

const htmlCopy = () => {
  return gulp.src('./src/*html')
    .pipe(gulp.dest('./dist'));
}

const style = () => {
  return gulp.src('./src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/'))
    .pipe(browserSync.stream());
}

const serve = () => {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });

  gulp.watch('./src/scss/**/*scss', style);
  gulp.watch('./src/*html').on('change', browserSync.reload);
}

exports.serve = serve;
exports.build = gulp.series(
  buildCSS,
  htmlCopy
);
