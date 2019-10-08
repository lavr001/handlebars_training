var gulp = require('gulp'),
    connect = require('gulp-connect'),
    less = require('gulp-less'),
    browserSync = require('browser-sync').create();

function server(done) {
  connect.server({
    port: 8888
  });
  done();
}

function style(done) {
  return gulp.src('./less/*.less')
  .pipe(less())
  .pipe(gulp.dest('./release/css'))
  done();
}

// function reload(done) {
//   browserSync.reload()
//   done();
// }

function watch_style(done) {
  gulp.watch('./less/*.less', gulp.parallel(style));
  done();
}

gulp.task('default', gulp.parallel(server, style, watch_style));
