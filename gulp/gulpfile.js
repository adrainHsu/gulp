/**
 * Created by adrainHsu on 2015/8/9.
 */
var gulp = require('gulp'),
    connect = require('gulp-connect'),          //�ڱ�������һ��web server
    sass = require('gulp-ruby-sass'),           //sass����
    less = require('gulp-less'),                //less����
    imagemin = require('gulp-imagemin'),        //ѹ��ͼƬ
    pngquant = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer');//�������ĸ���ʽ�������ǰ׺

//����һ����9001Ϊ�˿ڵķ���
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
* �����￪ʼһ��gulp��ʱ��
* �������еĵ��ö���Ϊ�˲���ʹ��
* ��ʵʹ�û���Ҫ�ٴε���
* github.com
* author:adrainHsu
* email:583158795@qq.com
* phone:15026502608
*
* */
/*-----------------------*/

//����һ��sass����
gulp.task('testSass',function(){
    return sass('../sass/xxy.scss')//��֪Ϊ�β����ļ��������޷���������,ֻ��sass�����
        .on('error',function (err){
            console.error('Error!',err.message);
        })
        .pipe(gulp.dest('../css'))
        .pipe(connect.reload());
});


//����һ��html����
gulp.task('html',function(){
    gulp.src('../staticHtml/**/*.html')
        .pipe(connect.reload());
});
//����һ��less����
gulp.task('less',function(){
    gulp.src('../less/*.less')
        .pipe(less())
        .pipe(gulp.dest('../css'))
        .pipe(connect.reload());
});

//����һ������ʽ�������ǰ׺������
gulp.task('testAutoFx',function(){
    gulp.src('../css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true, //�Ƿ���������ֵ Ĭ�ϣ�true ��������
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //�Ƿ�ȥ������Ҫ��ǰ׺ Ĭ�ϣ�true
        }))
        .pipe(gulp.dest('../css/'))
        .pipe(connect.reload());
});
//����һ��ͼƬѹ������
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

//�����ļ��ĸı�
gulp.task('watch', function() {
    gulp.watch('../sass/*.scss', ['testSass']);
    gulp.watch('../less/*.less', ['less']);
    gulp.watch('../css/*.css', ['testAutoFx']);
    gulp.watch('../staticHtml/**/*.html', ['html']);
})

/*-----------------------*/
/*-----------------------*/

//Ĭ��gulp���еĶ���
gulp.task('default', ['testSass','less','testAutoFx','html','webserver', 'watch']);


/*-----------------------*/
/*
* ����ſ��ܻ��õ��ģ�����õ���ȡ��ע�ͣ�������Ӧλ�ü���Ӧ���Լ���
*
* */
/*-----------------------*/


//ʹ��connect����һ��web������
/*
gulp.task('connect',function(){
    connect.server({
        root:'www',
        port:9001,
        livereload:true
    });
});


*/




















































