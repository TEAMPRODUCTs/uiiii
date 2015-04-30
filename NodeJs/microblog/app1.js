var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');//文件形式的本地引入
var users = require('./routes/users');

var app = express();

/*
*
* app.set 是 Express 的参数设置工具，接受一个键（key）和一个值（value），可用的参
 数如下所示。
  basepath：基础地址，通常用于 res.redirect() 跳转。
  views：视图文件的目录，存放模板文件。
  view engine：视图模板引擎。
  view options：全局视图参数对象。
  view cache：启用视图缓存。
  case sensitive routes：路径区分大小写。
  strict routing：严格路径，启用后不会忽略路径末尾的“ / ”。
  jsonp callback：开启透明的 JSONP 支持。
* */


// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置views路径 fish
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);//访问路径 fish

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
