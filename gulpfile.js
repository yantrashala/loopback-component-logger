/*******************************************************************************
 *@file gulpfile.js contains details of all gulp tasks required
 *
 *@author : sapient
 ******************************************************************************/
'use strict';

var gulp = require('gulp');

var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var runSequence = require('run-sequence');

// js linting
gulp.task('jsLint', function () {
  return gulp.src(['index.js','lib/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

});

// mocha test runner
gulp.task('mochaTest', function (cb) {
  gulp.src(['index.js','lib/**/*.js'])
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      gulp.src(['test/**/*-test.js'])
        .pipe(mocha({ timeout: 10000 }))
        .pipe(istanbul.writeReports())// Creating the reports after tests runned
        .on('end', function(){
          cb();
        });
    });
});

// default task
gulp.task('default', function (callback) {
  runSequence(
    'jsLint',
    'mochaTest',
    function (error) {
      if (error) {
        console.log(error.message);
      }
      callback(error);
    });
});


gulp.task('build', ['default']);
