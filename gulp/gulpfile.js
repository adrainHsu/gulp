/**
 * Created by adrainHsu on 2015/8/9.
 */
var gulp = require('gulp'),
    connect = require('gulp-connect'),          //在本地启动一个web server
    sass = require('gulp-ruby-sass'),           //sass任务
    less = require('gulp-less'),                //less任务
    imagemin = require('gulp-imagemin'),        //压缩图片
    pngquant = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer');//很潇洒的给样式加浏览器前缀

//创建一个以9001为端口的服务
gulp.task('webserver', function() {
    connect.server({
        root:'../',
        livereload: true,
        port:9001
    });
});

/*-----------------------*/
/*
 *
* 从这里开始一个gulp的时代
* 里面所有的调置都是为了测试使用
* 现实使用还需要再次调试
* github.com
* author:adrainHsu
* email:583158795@qq.com
* phone:15026502608
*
* */
/*-----------------------*/

//定义一个sass任务
gulp.task('testSass',function(){
    return sass('../sass/xxy.scss')//不知为何不加文件的名字无法加载任务,只有sass这个？
        .on('error',function (err){
            console.error('Error!',err.message);
        })
        .pipe(gulp.dest('../css'))
        .pipe(connect.reload());
});


//定义一个html任务
gulp.task('html',function(){
    gulp.src('../staticHtml/**/*.html')
        .pipe(connect.reload());
});
//定义一个less任务
gulp.task('less',function(){
    gulp.src('../less/*.less')
        .pipe(less())
        .pipe(gulp.dest('../css'))
        .pipe(connect.reload());
});

//定义一个给样式加浏览器前缀的任务
gulp.task('testAutoFx',function(){
    gulp.src('../css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('../css/'))
        .pipe(connect.reload());
});
//定义一个图片压缩任务
gulp.task('imagemin',function(){
    gulp.src('../img/**/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('../img'));
});

/*-----------------------*/
/*-----------------------*/

//监听文件的改变
gulp.task('watch', function() {
    gulp.watch('../sass/*.scss', ['testSass']);
    gulp.watch('../less/*.less', ['less']);
    gulp.watch('../css/*.css', ['testAutoFx']);
    gulp.watch('../staticHtml/**/*.html', ['html']);
})

/*-----------------------*/
/*-----------------------*/

//默认gulp运行的东西
gulp.task('default', ['testSass','less','testAutoFx','html','webserver', 'watch']);


/*-----------------------*/
/*
* 这里放可能会用到的，如果用到，取消注释，并在相应位置加相应属性即可
*
* */
/*-----------------------*/


//使用connect启动一个web服务器
/*
gulp.task('connect',function(){
    connect.server({
        root:'www',
        port:9001,
        livereload:true
    });
});


*/




















































