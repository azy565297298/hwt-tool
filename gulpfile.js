/*
* @Author: Marte
* @Date:   2017-07-09 12:30:19
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-12 19:58:20
*/

'use strict';
/**
 * 1.less 编译压缩 合并
 * 2.js合并 压缩 混淆
 * 3.img复制
 * 4.html压缩
 */
var gulp = require('gulp');

var less = require("gulp-less");

var cssnano = require("gulp-cssnano");

var concat = require("gulp-concat");

var uglify = require("gulp-uglify");

//E:\DEMO\gulp-demo>npm install gulp-less gulp-concat gulp-uglify gulp-cssnano gup-htmlmin --save-dev
//ess 编译压缩 合并
gulp.task('style',function(){
    gulp.src(['src/styles/*.less','! src/styles/_*.less']).pipe(less()).
    pipe(cssnano()).
    pipe(gulp.dest("dist/styles")).
      pipe(browserSync.reload({stream:true}));

    })

gulp.task('script',function(){
    gulp.src(['src/scripts/*.js','! src/scripts/_*.js']).pipe(concat('all.js')).
    pipe(uglify()).
    pipe(gulp.dest("dist/scripts")).
      pipe(browserSync.reload({stream:true}));
    })

gulp.task('image',function(){
    gulp.src('src/images/*.*').
    pipe(gulp.dest("dist/images")).
      pipe(browserSync.reload({stream:true}));
    })

var htmlmin = require('gulp-htmlmin');
gulp.task('html',function(){
    gulp.src('src/i*.html').
    pipe(htmlmin({collapseWhitecase:true,removeComments:true})).
    pipe(gulp.dest("dist/")).
    pipe(browserSync.reload({stream:true}));
    })

var browserSync = require('browser-sync');

gulp.task('serve',function(){
    browserSync({
        server:{
            baseDir:['dist/']
        },
        port:8888,
        function(err,bs){
            console.log(bs.options.getIn(['urls','local']));
        }
        })
    });

gulp.watch("src/styles/*.less",['style']);
gulp.watch("src/scripts/*.js",['script']);
gulp.watch("src/images/*.*",['image']);
gulp.watch("src/*.html",['html']);