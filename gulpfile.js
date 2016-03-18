'use strict';

//Utilizacion de modulos
var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

//Paths de origen
var srcPaths = {
    images:   'src/img/',
    scripts:  'src/js/',
    styles:   'src/scss/',
    files:    'src/'
};


//Paths de destino
var distPaths = {
    images:   'dist/img/',
    scripts:  'dist/js/',
    styles:   'dist/css/',
    files:    'dist/'
};



//Elimina todos los archivos de dist
gulp.task('clean', function(cb) {
    del([ distPaths.files+'*.html', distPaths.images+'**/*', distPaths.scripts+'*.js', distPaths.styles+'*.css'], cb);
});

// Copia de los cambios en los ficheros html en el directorio dist.
gulp.task('copyHtml', function() {
    return gulp.src([srcPaths.files+'*.html'])
        .pipe(gulp.dest(distPaths.files))
        .pipe(browserSync.stream());
});

// Copia de los cambios en los ficheros img en el directorio dist.
gulp.task('copyImg', function() {
    return gulp.src([srcPaths.images+'**/*'])
        .pipe(gulp.dest(distPaths.images))
        .pipe(browserSync.stream());
});



//Inicia browser-sync
gulp.task('browser-sync', function(){
        browserSync.init({
        server:{
            baseDir:"./dist"
        }
    });
});


//Genera el css a partir de sass
gulp.task('build-css', function() {
    return gulp.src([srcPaths.styles+'**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});



//Utiliza jshint para detectar errores en javascript
gulp.task('lint', function() {
    return gulp.src([srcPaths.scripts+'**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});



//Concatena todos los ficheros javascritp en uno solo y lo minimiza.
//Antes de ejecutarse, lanza la tarea lint
gulp.task('js', ['lint'], function() {
//    return gulp.src([srcPaths.scripts+'main.js', srcPaths.scripts+'extra.js'])
    return gulp.src([srcPaths.scripts+'**/*.js'])
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(distPaths.scripts))
        .pipe(browserSync.stream());
});


//Agrega los watch para los cambios en los ficheros. Antes ejecuta todas las tareas
//y lanza browser-sync
gulp.task('watch', ['copyHtml', 'copyImg', 'build-css', 'js', 'browser-sync'], function() {
    gulp.watch(srcPaths.files+'*.html', ['copyHtml']);
    gulp.watch(srcPaths.images+'**/*', ['copyImg']);
    gulp.watch(srcPaths.styles+'**/*.scss', ['build-css']);
    gulp.watch(srcPaths.scripts+'**/*.js', ['js']);
});

//La tarea por defecto, limpia los ficheros y lanza la tarea watch
gulp.task('default', ['clean', 'watch'], function() {});

