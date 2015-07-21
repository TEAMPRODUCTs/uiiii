在你的项目的 devDependencies 下安装gulp

$ npm install --save-dev gulp
3.在你项目的根目录下创建 gulpfile.js 文件

var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
});
4.运行 gulp

$ gulp
这个默认任务将会运行但不会产生任何东西。