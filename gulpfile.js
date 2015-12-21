"use strict";

var gulp = require("gulp"),
    wiredep = require('wiredep').stream,
    browserSync = require('browser-sync');

// сборка html css javascript + удаление папки dist
var rimraf = require('gulp-rimraf'),    
    useref = require('gulp-useref'),    
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'), 
    minifyCss = require('gulp-minify-css');

gulp.task('server', function () {
    browserSync ({
        port: 9000,
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('watch', function () {
    gulp.watch([
        'app/*.html',
        'app/js/**/*.js',
        'app/css/**/*.css'
    ]).on('change', browserSync.reload);
    gulp.watch('bower.json', ['wiredep']);
});

gulp.task('default', ['server', 'watch']);

// Следим за bower
    gulp.task('wiredep', function () {
      gulp.src('app/*.html')
        .pipe(wiredep())
        .pipe(gulp.dest('app/'))
    });

// Переносим HTML, CSS, JS в папку dist 
    gulp.task('useref', function () {
      return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
        .pipe(gulp.dest('dist'));
    });

// Очистка
    gulp.task('clean', function() {
        return gulp.src('dist', { read: false }) 
        .pipe(rimraf());
    });