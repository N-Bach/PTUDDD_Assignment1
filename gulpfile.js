var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('scripts', function() {
    return gulp.src('./public/controllers/*.js')
        .pipe(concat('angularCtrl.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('default', function() {
    console.log('Hello from code');
});