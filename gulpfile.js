'use strict';

const gulp = require('gulp');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

const buildSource = function() {
  const b = browserify({
    entries: './src/index.js',
    debug: true,
    // Tell browserify that firebase is loaded already
    external: ['firebase']
  })
  .transform('babelify', {
    plugins: ['transform-object-rest-spread'],
    presets: ['env', 'react']
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/assets/js'));
};

const copy = function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
};

const build = gulp.parallel([copy, buildSource]);

gulp.task('browserify', buildSource);
gulp.task('copy', copy)

gulp.task('build', build);
gulp.task('dev', gulp.series(build, function watch() {
  gulp.watch(['src/**/*'], build);
}));

gulp.task('default', build);
