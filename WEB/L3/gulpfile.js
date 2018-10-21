const gulp = require("gulp4");
const less = require("gulp-less");
const babel = require("gulp-babel");
const rename = require("gulp-rename");
const pug = require('gulp-pug');
const cleanCSS = require("gulp-clean-css");
const minify = require("gulp-uglify");
const cleanHTML = require("gulp-minify-html");
const del = require('del');

const clean = () => {
    return del(["build"]);
};

const styles = () => {
    return gulp.src('src/**/*.less')
        .pipe(less())
       // .pipe(cleanCSS())
        .pipe(rename({
            dirname: 'css',
            suffix: '.min'
        }))
        .pipe(gulp.dest('build/'));
};

const code = () => {
    return gulp.src('src/**/*.js ')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        //.pipe(minify())
        .pipe(gulp.dest('build/'))
};

const views = () => {
    return gulp.src('src/pug/*.pug')
        .pipe(pug())
      //  .pipe(cleanHTML())
        .pipe(rename({
            dirname: 'html'
        }))
        .pipe(gulp.dest('build/'))
};

const libraries = () => {
    return gulp.src('lib/**')
        .pipe(gulp.dest('build/lib/'))
};

const res = () => {
    return gulp.src('res/**')
        .pipe(gulp.dest('build/res/'))
};

const data = () => {
    return gulp.src('data/**')
        .pipe(gulp.dest('build/data/'))
}

gulp.task("clean", gulp.series(clean));
gulp.task("default", gulp.series(clean, styles, code, views, res, data, libraries));