注：所有的一切都需要node.js环境呢

gulp

这是一个可爱的gulp呢

深入设置任务之前，需先安装gulp：

$ npm install gulp -g

这会将gulp安装到全域环境下，让你可以存取gulp的CLI。接著，需要在本地端的专案进行安装。cd到你的专案根目录，执行下列指令(请先确定你有package.json档案)：

$ npm install gulp --save-dev

上述指令将gulp安装到本地端的专案内，并纪录于package.json内的devDependencies物件。

安装gulp插件

编译Sass (gulp-ruby-sass) Autoprefixer (gulp-autoprefixer) 缩小化(minify)CSS (gulp-minify-css) JSHint (gulp-jshint) 拼接 (gulp-concat) 丑化(Uglify) (gulp-uglify) 图片压缩 (gulp-imagemin) 即时重整(LiveReload) (gulp-livereload) 清理档案 (gulp-clean) 图片快取，只有更改过得图片会进行压缩 (gulp-cache)

更动通知 (gulp-notify)

安装方法： $ npm install gulp-ruby-sass --save-dev $ npm install gulp-autoprefixer $ npm install gulp-minify-css $ npm install gulp-jshint $ npm install gulp-concat $ npm install gulp-uglify $ npm install gulp-imagemin $ npm install gulp-livereload $ npm install gulp-clean $ npm install gulp-cache

$ npm install gulp-notify

当然也可以：

$ npm install