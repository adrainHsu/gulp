/**
 * Created by adrain on 2016/2/16.
 */
//创建一个统一使用的路径
var projectPath = '../weixin/',  //项目路径  pc-html\weixin\companyPc-html
    webserverPath = projectPath ,//webserver路径
    sassPath       = projectPath + 'sass/*.scss',   //sass路径
    cssPath        = projectPath + 'css/',   //css路径
	imgPath        = projectPath + 'images/**/*', //图片原路径
	imgminPath     = projectPath + 'images/',   //图片生成路径
    htmlPath       = projectPath + 'staticHtml/**/*.html';   //html路径


var gulp = require('gulp'),
    connect = require('gulp-connect'),          //在本地启动一个web server
    imagemin = require('gulp-imagemin'),        //压缩图片
    pngquant = require('imagemin-pngquant'),    //深度压缩图片
	cache    = require('gulp-cache'),

    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),     //处理浏览器私有前缀
    cssnext = require('cssnext');                //使用CSS未来的语法
    //precss = require('precss');                  //像Sass的函数

var color_rgba_fallback = require('postcss-color-rgba-fallback');   //给rgba()颜色创建十六进制颜色降级方案
var opacity = require('postcss-opacity');       //IE8也不支持opacity属性，给IE浏览器添加滤镜属性，作为降级处理
var pseudoelements = require('postcss-pseudoelements');     //将伪元素的::转换为:
var vmin = require('postcss-vmin');     //使用vm为vmin做降级处理
var pixrem = require('pixrem');     //给rem添加px作为降级处理
var will_change = require('postcss-will-change');   //提前让浏览器知道某些元素设计的动画
var bem = require('postcss-bem');
var nested = require('postcss-nested');

//安装normalize.css  npm install normalize.css
//使用@import内联加载normalize.css
var atImport = require('postcss-import');   //通过@import将多个样式组合为一个，即使你的一些样式来自Bower组件或npm模块,都可以确保你你只需要请求一个单独的http，加载网站的CSS
var mqpacker = require('css-mqpacker');     //匹配媒体查询，允许你将多个地点使用相同的媒体查询组合成一个 @media多个如果一样合并成一个
var cssnano = require('cssnano');            //使用cssnano执行各种优化，删除空白和注释，并且压缩代码
//怎么用还未知呢//var rtlcss = require('rtlcss');     //值左右互换
////var result = rtlcss.process("body { direction:ltr; }");

var sass = require('gulp-sass');        //这是一个LibSass

var circle = require('postcss-circle');      //画圆
var triangle = require('postcss-triangle'); //画三角形
// 例：triangle: pointing-right;width: 150px;height: 115px;background-color: red;

var lrcenter = require('postcss-center'); //水平垂直居中
var clearfix = require('postcss-clearfix');      //一行输出清除浮动
//var fontface = require('postcss-font-magician');    //一行输出@font-face
var position = require('postcss-position');     //一行定位
var widthheight = require('postcss-size');      //同时设置宽高
var verthorz = require('postcss-verthorz');//设置水平和垂直间距
var linkColor = require('postcss-all-link-colors');//设置设置链接样式


//创建一个以9001为端口的服务
gulp.task('webserver', function() {
    connect.server({
        root:webserverPath,
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

//定义一个用postcss编译css的任务
gulp.task('css',function(){
    var processors =[
        /*
        * 配置只支持IE11+和Safari9
        * autoprefixer({browsers:'safari >= 9, ie >= 11'}),
        * autoprefixer({browsers: ['last 1 version']})
        * */
        will_change,
        circle,
        triangle,
        lrcenter,
        clearfix,
        position,
        widthheight,
        //verthorz,
        //linkColor,
        //fontface({hosted: '../fonts'}),    //如何一键配置本地字体未可知
        autoprefixer,
        //color_rgba_fallback给rgba()颜色创建十六进制颜色降级方案
        color_rgba_fallback,
    opacity,    //IE8也不支持opacity属性，给IE浏览器添加滤镜属性，作为降级处理
        pseudoelements, //将伪元素的::转换为:
        /*使用vm为vmin做降级处理
        * IE9中并不支持viewport相对单位vmin，但可以使用vm作为等效的单位。如果你为了让IE9支持vmin
        * */
        vmin,
    pixrem,		//rem单位转换px喽
        cssnext,
        atImport,
        mqpacker,
    //cssnano,
        bem,
        nested
        //precss
    ];
    return gulp.src( sassPath )
        .pipe(sass().on('error',sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest( cssPath ))
        .pipe(connect.reload());
});

//定义一个html任务
gulp.task('html',function(){
    gulp.src(htmlPath)
        .pipe(connect.reload());
});

//定义一个图片压缩任务
/*
gulp.task('imagemin',function(){
    gulp.src('../ceshi/images/!**!/!*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
			optimizationLevel:5,   //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true,				//类型：Boolean 默认：false 无损压缩jpg图片
			interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
			multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()]       //使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest('../cheshi/img/'));
});
*/
gulp.task('imagemin',function(){
	return gulp .src(imgPath)
		.pipe(cache(imagemin([
			imagemin.jpegtran({progressive:true}),
			imagemin.optipng(),
			imagemin.svgo({removeViewBox: false}),
		],{verbose:true})))
		.pipe(gulp.dest(imgminPath))	
});
/*-----------------------*/
/*-----------------------*/

//监听文件的改变
gulp.task('watch', function() {
    gulp.watch( sassPath , ['css']);
    gulp.watch(htmlPath , ['html']);
})

/*-----------------------*/
/*-----------------------*/

//默认gulp运行的东西
gulp.task('default', ['css','html','webserver', 'watch']);



//PreCSS包结合了九个独立的PostCSS插件实现类似于Sass功能，cssnano包使用了大约20个PostCSS插件




/*will-change:
      属性用于提前让浏览器知道某些元素设计的动画。这
      允许浏览器优化呈现动画渲染过程，防止延误和闪烁。然而，
      目前IE/Edge，Safari和Opera Mini还不支持这个属性
      ----@Andrey Sitnik开发的postcss-will-change插件，添加一个回退，
      这将有助于这些浏览器渲染做得更好，即使浏览器不支持will-change属性，
      也不会影响效率。它通过添加backface-visibility属性，触发GPU处理器。
      --用法：.thisWillChange { will-change: transform; }
      把Autoprefixer插件放在它后面可以加前缀

*
* Autoprefixer是每一个项目都必须使用的工具
 Autoprefixer可以根据你的配置为你需要的浏览器添加私有前缀
 如果项目中使用动画，可以考虑使用postcss-will-change
 如果需要支持IE8，考虑使用postcss-color-rgba-fallback、postcss-opacity、postcss-pseudoelements和postcss-vmin等插件
 如果需要支持IE8、IE9和IE10，可以考虑使用node-pixrem插件
*
*cssnano优化包括下面一些类型：参数配置http://cssnano.co/options/
    例：你不想优化字体权重
        / In Gulpfile 'processors' array
        cssnano({
        minifyFontWeight: false
        })

        // In Gruntfile 'processors' array
        require('cssnano')({
        minifyFontWeight: false
        })
    使用calc()时，你可以设置小数的精度值(小数点后面的数量)：
        // In Gulpfile 'processors' array
        cssnano({
        calc: {precision: 2}
        })

        // In Gruntfile 'processors' array
        require('cssnano')({
        calc: {precision: 2}
        })
 删除空格和最后一个分号
 删除注释
 优化字体权重
 丢弃重复的样式规则
 优化calc()
 压缩选择器
 减少手写属性
 合并规则
*
* postcss-svgo  可以给内联SVG的代码做优化
* postcss-font-magician插件可以让你非常容易的使用自定义字体
 *
 *
 .lrcenter {
    top: center;
    left: center;
 }生成
 .lrcenter {
     position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
 }
 *  */



/*----例子----*/
/*postcss-all-link-colors设置链接样式
     a {
         @link-colors all #4D9ACC {
         hover: #5BB8F4;
     }
     }生成
     a {
        color: #4D9ACC
     }

     a:visited {
        color: #4D9ACC;
     }

     a:focus {
        color: #4D9ACC;
     }

     a:hover {
        color: #5BB8F4;
     }

     a:active {
        color: #4D9ACC;
     }

*/
/*postcss-circle  纯CSS来创建圆
    .circle {
        circle: 8rem #c00;
    }生成
     .circle {
         border-radius: 50%;
         width: 8rem;
         height: 8rem;
         background-color: #c00;
     }
*/
/*postcss-circle  纯CSS来创建三角形
     .isosceles-triangle {
         triangle: pointing-right;
         width: 7rem;
         height: 8rem;
         background-color: #c00;
     }生成
     .isosceles-triangle {
         width: 0;
         height: 0;
         border-style: solid;
         border-color: transparent;
         border-width: 4rem 0 4rem 7rem;
         border-left-color: #c00;
     }
 */
/*  postcss-position 一行设置定位
     .absolute {
        position: absolute 1rem 1rem 0 0;
     }生成
     .absolute {
         position: absolute;
         top: 1rem;
         right: 1rem;
         bottom: 0;
         left: 0;
     }
*/
/*postcss-size  同时设置宽度和高度
     .size_a {size: 1rem 2rem;}
     .size_b {size: 1rem;}
     生成
     .size_a {
         width: 1rem;
         height: 2rem;
     }
     .size_b {
         width: 1rem;
         height: 1rem;
     }
 */

/*
postcss-verthorz 设置水平和垂直间距
    .spacing {
        padding-vert: 1rem;
        margin-horz: 2rem;
    }生成
    .spacing {
        padding-top: 1rem;
        padding-bottom: 1rem;
        margin-left: 2rem;
        margin-right: 2rem;
    }还可以简写到两个字符，输出也是完全一样
    .spacing_short {
        pv: 1rem;
        mh: 2rem;
    }
*/



/*postcss-center    水平垂直居中
     .lrcenter {
         top: center;
         left: center;
     }生成
     .lrcenter {
         position: absolute;
         top: 50%;
         left: 50%;
         margin-right: -50%;
         transform: translate(-50%, -50%);
     }
*/
/*postcss-clearfix  一行输出清除浮动
     .clearfixed {
        clear: fix;//如果是要兼容到ie6则clear:fix-legacy;
     }生成
     .clearfixed:after {
         content: '';
         display: table;
         clear: both;
     }
*/
/* postcss-font-magician 一行输出@font-face
     body {
        font-family: "Indie Flower";
     }生成
     @font-face {
         font-family: "Indie Flower";
         font-style: normal;
         font-weight: 400;
         src: local("Indie Flower"),local(IndieFlower),
         url(//fonts.gstatic.com/s/indieflower/v7/10JVD_humAd5zP2yrFqw6nZ2MAKAc2x4R1uOSeegc5U.eot?#) format("eot"),
         url(//fonts.gstatic.com/s/indieflower/v7/10JVD_humAd5zP2yrFqw6ugdm0LZdjqr5-oayXSOefg.woff2) format("woff2"),
         url(//fonts.gstatic.com/s/indieflower/v7/10JVD_humAd5zP2yrFqw6nhCUOGz7vYGh680lGh-uXM.woff) format("woff");
     }
*/


//---------------//



//---------------//
//---------------//
//---------------//
//---------------//
//---------------//

























