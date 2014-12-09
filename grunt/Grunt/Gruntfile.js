/**
 * Created by shbzhang on 13-11-21.
 */
module.exports = function (grunt) {

  var path = require('path');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    config: {
      srcDir:  '<%= pkg.channels["app"].path%>',
      destDir: '<%= pkg.channels["app"].path%>/dest',
      channel: 'app',
      cfgFile: './webapp2hybrid/busbu.json'
    },

	/**
	 * jsdoc 通过js生成文档 sq_xu
	*/
	 jsdoc : {
        dist : {
            src: ['src/*.js'], 
            options: {
                destination: 'doc'
            }
        }
    },	
    /**
     * 清空任务
     */
    clean: {
      options: { force: true },
      main:    '<%= config.destDir%>'
    },

    /**
     * 复制任务
     */
    "copy": {
      //web任务，copy sbu目录下的html,样式图片至sbu/dest目录
      "web_sbu":     {
        "files": [
          {
            "expand": true,
            "cwd":    "<%= config.srcDir %>",
            "src":    ["**/*.html", "res/**/*.*"],
            "dest":   "<%= config.destDir %>"
          }
        ]
      },
      //hybrid任务,copy sbu目录下的样式,图片至out/webapp/sbu目录
      "app_sbu":     {
        "files": [
          {
            "expand": true,
            "cwd":    "<%= config.srcDir %>",
            "src":    ["assistant/**/*.*", "res/**/*.*"],
            "dest":   "<%= config.destDir %>"
          }
        ]
      },
      //hybrid任务,复制res目录下文件至图片至out/webapp/res目录
      "app_res":     {
        "files": [
          {
            "expand": true,
            "cwd":    "<%= config.srcDir%>/",
            "src":    ["images/*.*", "img/*.*", "libs/*.*", "style/*.*"],
            "dest":   "<%= config.destDir%>/"
          }
        ]
      },
      //hybrid任务,复制各个版本的common.js
      "app_app":     {
        "files": [
          {
            "expand": true,
            "cwd":    "<%= config.srcDir%>/",
            "src":    ["*/hybrid/*.js" ],
            "dest":   "<%= config.destDir%>/"
          }
        ]
      },
      // hybrid任务,复制1.0版本的common.js,保持向下兼容
      "app_app_1.0": {
        "files": [
          {
            "expand": true,
            "cwd":    "<%= config.srcDir%>/1.0//hybrid",
            "src":    ["*.js" ],
            "dest":   "<%= config.destDir%>/"
          }
        ]
      },
      //直接复制zip包
      "zip":         {
        "files": [
          {
            "expand": true,
            "cwd":    "<%= config.srcDir.replace('webapp', '') %>",
            "src":    ["*.zip"],
            "dest":   "<%= pkg.appOutDir %>/zip"
          }
        ]
      }
    },

    /**
     * js文件迷你化
     */
    "uglify": {
      "main": {
        "options": {
          "report":   "false",
          "beautify": grunt.option('debug'),
          "compress": !grunt.option('debug'),
          "mangle":   {
            "except": ['$super']
          }
        },
        "files":   [
          {
            "expand": true,
            "cwd":    "<%= config.srcDir %>",
            "src":    "**/*.js",
            "dest":   "<%= config.destDir %>"
          }
        ]
      }
    },

    /**
     *  html迷你化
     */
    "htmlmin": {
      "web": {
        "files": [
          {
            "expand": true,
            "cwd":    "<%= config.srcDir%>/",
            "src":    ["*.html", "views/**/*.html"],
            "dest":   "<%= config.destDir%>/"
          }
        ]
      },
      "app": {
        "files": {
          "<%= config.destDir %>/index.html": "<%= config.srcDir %>/app.index.html"
        }
      }
    },

    /**
     * css 迷你化任务
     */
    "cssmin": {
      //css 迷你化
      "minify":  {
        "expand": true,
        "cwd":    "<%= config.srcDir %>/res/style",
        "src":    ["*.css"],
        "dest":   "<%= config.destDir %>/res/style/"
      },
      //合并文件
      "combine": {
        "files": {
          "<%= config.destDir %>/style/main.css": ["<%= config.srcDir %>/style/common.css", "<%= config.srcDir %>/style/cui.css"]
        }
      }
    },

    /**
     * css路径替换任务
     */
    replace: {
      options:     {
        patterns: [
          {
            match:       /\.\.\.\/img/g,
            replacement: 'http://res.m.ctrip.com/html5/content/images',
            expression:  true
          },
          {
            match:       '/-calc\\(100%-/g',
            replacement: '-calc(100% - ',
            expression:  true
          }
        ]
      },
      web_app_css: {
        files: [
          {expand: true, flatten: true, cwd: '<%= config.destDir %>/', src: ['**/*.css'], dest: '<%= config.destDir %>/res/style/'}
        ]
      },
      web_res_css: {
        files: [
          {expand: true, flatten: true, cwd: '<%= config.destDir %>/', src: ['**/*.css'], dest: '<%= config.destDir %>/style/'}
        ]
      },
      templates:   {
        options: {
          patterns: [
            {
              match:       '/"views\//g',
              replacement: '"<%= config.channel %>/views\/',
              expression:  true
            },
            {
              match:       '/"dest\/views/g',
              replacement: '"<%= config.channel %>/dest/views',
              expression:  true
            },
            {
              match:       '/text!dest/views/g',
              replacement: 'text!<%= config.channel %>/dest/views',
              expression:  true
            },
            {
              match:       '/text!views/g',
              replacement: 'text!<%= config.channel %>/views',
              expression:  true
            },
            {
              match:       '/text!dest\/templates/g',
              replacement: 'text!<%= config.channel %>/dest/templates',
              expression:  true
            },
            {
              match:       '/text!templates/g',
              replacement: 'text!<%= config.channel %>/templates',
              expression:  true
            },
            {
              match:       '/text!views/templates/g',
              replacement: 'text!<%= config.channel %>/views/templates',
              expression:  true
            }
          ]
        },
        files:   [
          { flatten: true, src: ['<%= config.destDir %>/main.js'], dest: '<%= config.destDir %>/main.js'}
        ]
      }
    },

    /**
     * 去除空格任务
     */
    "strip": {
      "main": {
        "src":     "<%= config.destDir %>/**/*.js",
        "options": {
          "inline": true
        }
      }
    },

    /**
     * 执行压缩任务
     */
    "compress": {

      //webapp目录压缩，省得在itunes手动压缩
      "com_webapp": {
        "options": {
          "archive": "<%= pkg.appOutDir %>/webapp.zip"
        },
        "files":   [
          {
            "src":    ["**"],
            "cwd":    "<%= pkg.appOutDir %>/webapp",
            "dest":   "/webapp",
            "expand": true
          }
        ]
      },

      //hybrid压缩
      "app":        {
        "options": {
          "archive": "<%= pkg.appOutDir %>/zip/<%= config.channel%>.zip"
        },
        "files":   [
          {
            "src":    ["**"],
            "cwd":    "<%= config.destDir %>",
            "dest":   "<%= config.channel%>/",
            "expand": true
          }
        ]
      },
      //web 压缩
      "web":        {
        "options": {
          "archive": "<%= pkg.webOutDir %>/<%= config.channel%>.zip"
        },
        "files":   [
          {
            "src":    ["dest/**/*", "*.html", "*.js"],
            "cwd":    "<%= config.srcDir %>",
            "dest":   "/",
            "expand": true
          }
        ]
      },
      //权宜之计，真实app
      "com_app":    {
        "options": {
          "archive": "<%= pkg.appOutDir %>/zip/app.zip"
        },
        "files":   [
          {
            "src":    [ "*", "*/*", "*/*/*", "*/*/*/*" ],
            "cwd":    "<%= pkg.appOutDir %>/webapp/app",
            "dest":   "app",
            "expand": true
          }
        ]
      },
      //权宜之计，真实res
      "com_res":    {
        "options": {
          "archive": "<%= pkg.appOutDir %>/zip/res.zip"
        },
        "files":   [
          {
            "src":    [ "*", "*/*"],
            "cwd":    "<%= pkg.appOutDir %>/webapp/res",
            "dest":   "res",
            "expand": true
          }
        ]
      }
    },

    /**
     * 生成MD5码任务
     */
    "hashify": {
      main:          {
        options: {
          basedir: '<%= pkg.appOutDir %>/zip',
          copy:    true,
          hashmap: '/md5.json'
        },
        files:   [
          {
            src:  '<%= pkg.appOutDir %>/zip/<%=config.channel%>.zip',
            dest: '/<%= config.channel %>.zip',
            key:  '<%= config.channel %>'
          }
        ]
      },
      //权宜之计，真实app
      "hashify_app": {
        options: {
          basedir: '<%= pkg.appOutDir %>/zip',
          copy:    true,
          hashmap: '/md5.json'
        },
        files:   [
          {
            src:  '<%= pkg.appOutDir %>/zip/app.zip',
            dest: '/app.zip',
            key:  'app'
          }
        ]
      },
      //权宜之计，真实res
      "hashify_res": {
        options: {
          basedir: '<%= pkg.appOutDir %>/zip',
          copy:    true,
          hashmap: '/md5.json'
        },
        files:   [
          {
            src:  '<%= pkg.appOutDir %>/zip/res.zip',
            dest: '/res.zip',
            key:  'res'
          }
        ]
      }
    },

    /**
     * 拉取线上的框架包
     */
    curl:  {
      main: {
        src:  ['http://svn.ui.sh.ctripcorp.com/hybrid.zip'],
        dest: 'temp/hybrid.zip'
      }
    },

    //权宜之计
    unzip: {
      main: {
        src:  ['temp/hybrid.zip'],
        dest: '<%= pkg.appOutDir %>'
      }
    },

    /**
     * 调用lizard2.0的打包脚本
     */
    shell: {
      lizard2: {
        command: 'node ./webapp2hybrid/busbu.js <%= config.cfgFile %>'
      }
    }

  });


  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-strip');
  grunt.loadNpmTasks('grunt-hashify');
  grunt.loadNpmTasks('grunt-nodemailer');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-jsdoc');//js文档生成

  var platformCfg = {};
  /**
   * 默认任务
   */
  grunt.registerTask('default', 'default task', function () {
    grunt.task.run(['build']);
  });

  /**
   * 编译APP
   */
  grunt.registerTask('app', 'app task', function (application, branch) {
    grunt.option('platform', 'app');
    grunt.option('application', application);
    grunt.task.run(['build:app:' + application + ":" + branch]);
  });

  /**
   * 编译WEB
   */
  grunt.registerTask('web', 'web task', function (application, branch) {
    grunt.option('platform', 'web');
    grunt.option('application', application);
    grunt.task.run(['build:web:' + application + ":" + branch]);
  });

  /**
   * 真实操作的build任务
   */
  grunt.registerTask('build', 'build task', function (platform, application, branch) {

    var pkg = grunt.file.readJSON('package.json'),
      platform = grunt.option('platform'),
      application = grunt.option('application') || application,
      app = pkg.applications[application];
    grunt.log.debug(grunt.option('application'));

    branch = branch != 'undefined' ? branch : app.defaultPath;
    projectPath = grunt.option('path') || app.paths[branch];
    //检查参数完整型
    if (!platform || !application || !projectPath) {
      grunt.log.error('miss or error arguments,please check input!  \n ' +
        'right usage: "grunt --platform=[platform] --application=[application] --path=[path]"');
    }
    grunt.log.debug(platform + ";" + application + ":" + projectPath);

    //检测lizard的版本
    var cfg1 = "gruntCfg.json";
    var cfg2 = "busbu.json", cfgFile = "";

    var isVer1 = false, isVer2 = false;

    if (grunt.file.exists(projectPath + "/" + cfg2)) {
      isVer2 = true;
      cfgFile = projectPath + "/" + cfg2;
    } else if (grunt.file.exists(projectPath + "/webapp/" + cfg2)) {
      isVer2 = true;
      cfgFile = projectPath + "/" + cfg2;
    } else if (grunt.file.exists(projectPath + "/" + cfg1)) {
      isVer1 = true;
      cfgFile = projectPath + "/" + cfg1;
    } else if (grunt.file.exists(projectPath + "/webapp/" + cfg1)) {
      isVer1 = true;
      cfgFile = projectPath + "/webapp/" + cfg1;
    }
    //判断结束

    if (isVer2) {
      grunt.log.writeln('---------start lizard2.0 task------------');
      taskForV2();
    } else if (isVer1) {
      grunt.log.writeln('---------start lizard1.1 task------------');
      taskForV1();
    } else {
      //如果找不到配置文件 执行下载任务
      grunt.log.writeln('---------start download task------------');
      var tasks = null;
      if(application != 'res' && application!='app'){
        tasks = pkg.tasks.app.donwload;
      }
      taskForV1(tasks);
    }

    /**
     * lizard1 版本的任务
     */
    function taskForV1(tasks) {
      //设置源文件目录和目的目录
      var taskName = app ? app.task : '',
        srcDir, destDir;
      //如果给程序指定了编译任务名,取给定的任务,否则取默认任务
      if(!tasks){
        if (taskName) {
          tasks = pkg.tasks[platform][taskName];
        } else {
          tasks = (application == 'app' || application == 'res') ? pkg.tasks[platform][application] : pkg.tasks[platform].default;
        }
      }

      //如果是app平台的app任务,设一下src目录
      if (platform == 'app' && application == "app") {
        srcDir = projectPath;
      } else {
        srcDir = projectPath + "/webapp";
      }
      destDir = platform == 'web' ? srcDir + "/dest" : pkg.appOutDir + "/webapp/" + application;
      var config = {
        srcDir:           srcDir,
        destDir:          destDir,
        channel:          application,
        frameworkInclude: pkg.frameworkInclude
      }
      grunt.log.debug(JSON.stringify(config, null, 2));
      grunt.config.set('config', config);

      //读取gruntCfg.json
      if(cfgFile){
        var taskCfg = grunt.file.readJSON(cfgFile);
        for(var taskItem in taskCfg){
            if(taskItem == 'replace'){
                grunt.log.debug(JSON.stringify(taskCfg[taskItem]));
                grunt.log.debug("------------------------------------");
                grunt.config.set(taskItem, taskCfg[taskItem]);
                grunt.log.debug(JSON.stringify(grunt.config.get('replace')));
            }
        }
      }
      
      //在各SBU目录读取gruntCfg.json目录,生成requirejs目录
      if (grunt.util._.indexOf(tasks, 'requirejs') > -1) {
        loadRequireTask(platform, cfgFile);
      }

      //运行任务
      grunt.task.run(tasks);
    }

    /**
     * lizard2 版本任务
     */
    function taskForV2() {
      var tasks = pkg.tasks2.app.default;
      var destDir = pkg.appOutDir + "/webapp/" + application;
      var config = {
        srcDir:           projectPath,
        destDir:          destDir,
        channel:          application,
        frameworkInclude: pkg.frameworkInclude,
        cfgFile:          "--path=" + cfgFile
      }
      grunt.log.debug(JSON.stringify(config, null, 2));
      grunt.config.set('config', config);

      grunt.task.run(tasks);
    }


  });


  /**
   * 读取requirejs 配置,合并文件
   * @param platform
   * @param application
   * @param projectPath
   * @returns {boolean}
   */
  function loadRequireTask(platform, cfgFile) {
    // var fileName = projectPath + "/webapp/gruntCfg.json",
    var optimize = grunt.option('debug') ? "none" : "uglify",
      requireTask;
    var modules = [];
    var config = grunt.config('config');
    var framework = config.frameworkInclude;

    grunt.log.debug('read ' + cfgFile);
    try {
      var taskCfg = grunt.file.readJSON(cfgFile);
      grunt.log.debug(JSON.stringify(taskCfg, null, 2));
      var options = taskCfg.requirejs.main.options,
        newinclude = [];
      platformCfg = options[platform];
      var requireTextPath;

      //处理require.text.js
      if (options.paths.text) {
        requireTextPath = path.join(grunt.template.process(options.baseUrl), 'require.text.js');
        grunt.file.copy(
          './require.text.js',
          requireTextPath
        );
        options.paths.text = './require.text';
      }

      //按模块打包
      if (Array.isArray(platformCfg.modules)) {
        options.templateUrl = options.templateUrl || 'templates';
        options.templateFn = options.templateFn || 'buildViewTemplatesPath';

        modules = platformCfg.modules;
        //处理框架http的js
        for (var i in options.paths) {
          if (/^http/.test(options.paths[i])) {
            options.paths[i] = 'empty:';
          }
        }
        framework.forEach(function (item) {
          if (!options.paths[item]) {
            options.paths[item] = 'empty:';
          }
        });

        requireTask = {
          main: {
            options: {
              //源码路径,由于requirejs之前，代码已经被copy到dest了
              baseUrl:               config.destDir,
              dir:                   config.destDir, //压缩后目录
              allowSourceOverwrites: true,
              keepBuildDir:          true,
              paths:                 options.paths,
              optimize:              optimize,
              uglify:                {
                "except": ["$super"]
              },
              modules:               modules,
              onBuildRead:           function (moduleName, path, contents) {
                //模板依赖解决
                var templateReg = new RegExp(options.templateFn + "\\(\['\"]([\\w-\\.\\/]+)['\"]\\)");
                var template = templateReg.exec(contents);
                var templateSrc;

                if (template) {
                  if (template[1].indexOf('.html') == -1) {
                    template[1] += '.html';
                  }
                  templateSrc = 'text!' + options.templateUrl + '/' + template[1];
                  contents = contents.replace(templateReg, '"' + templateSrc + '"');
                }

                if (moduleName === 'main') {
                  return '';
                }

                return contents;
              },
              onBuildWrite:          function (moduleName, path, contents) {
                //处理模块路径问题
                var templateReg = new RegExp('text!' + options.templateUrl);
                var templateSrc = grunt.template.process('text!<%= config.channel %>/dest/' + options.templateUrl);
                var defineReg = /define\('views/;
                var defineSrc = grunt.template.process("define('<%= config.channel %>/dest/views");

                return contents
                  .replace(templateReg, templateSrc)
                  .replace(defineReg, defineSrc);
              },
              done:                  function (done, output) {
                //删除require.text.js
                grunt.file.delete(requireTextPath, {
                  force: true
                });
                done();
              }
            }
          }
        }
      } else {
        //对gruntCfg.json中的include做一下处理,把main_r放在最前面,否则web打包后
        //报错
        if (platform == 'web') {
          for (var i = 0, ln = platformCfg.include.length; i < ln; i++) {
            var item = platformCfg.include[i];
            if (item == 'main_r') {
              newinclude.unshift('main_r');
            } else {
              newinclude.push(item);
            }
          }
        } else {
          newinclude = platformCfg.include;
        }
        requireTask = {
          main: {
            options: {
              baseUrl:  options.baseUrl,
              paths:    options.paths,
              optimize: optimize,
              uglify:   {
                "except": ["$super"]
              },
              include:  newinclude,
              out:      platformCfg.out,
              done:     function (done, output) {
                //删除require.text.js
                grunt.file.delete(requireTextPath, {
                  force: true
                });
                done();
              }
            }
          }
        }
      }

    } catch (e) {
      erreorLog();
      return false;
    }

    grunt.log.write(JSON.stringify(requireTask, null, 2));
    //注册新的requirejs task
    grunt.config.set("requirejs", requireTask);
  };


//将压缩包的MD5码转为大写,并格式话JSON
  grunt.registerTask('formatMD5', 'format MD5 task', function () {
    var md5Obj = grunt.file.readJSON('out/hybrid/zip/md5.json'),
      jsonObj = {};
    grunt.log.debug(JSON.stringify(md5Obj, null, 2));
    for (var name in md5Obj) {
      grunt.log.debug(name);
      var attrName = name.split('_')[0];
      if (md5Obj[attrName]['md5']) {
        jsonObj[attrName] = md5Obj[attrName];
        continue;
      }
      jsonObj[attrName] = {
        file: name,
        md5:  md5Obj[name].toUpperCase()
      }
    }
    var content = JSON.stringify(jsonObj, null, 4);
    grunt.file.write('out/hybrid/zip/md5.json', content);
  });

  /**
   * 修配配置里的版本号
   */
  grunt.registerTask('addBuildVersion', 'default task', function () {
    platformCfg.buildversion = "<%= config.srcDir %>/common/config.js";
    var config = grunt.config.get('config');
    var filePath = grunt.template.process(platformCfg.buildversion, config);
    grunt.log.writeln(filePath);
    if (!grunt.file.exists(filePath)) {
      return;
    }
    var jsBuffer = grunt.file.read(filePath);
    var content = jsBuffer.toString();
    content = content.replace(/version:\"\d+@\d+\"/g, "version:\"" + grunt.template.today('yyyymmdd@HHMM') + "\"");
    grunt.file.write(filePath, content);
  });


  /**
   * 添加版本号
   */
  grunt.registerTask('addVersion', 'format MD5 task', function () {
    var config = grunt.config.get('config');
    var filePath = grunt.template.process(platformCfg.out, config)
    grunt.log.writeln(filePath);
    var jsBuffer = grunt.file.read(filePath);
    var verArr = [];
    verArr = ["function getDateTime () {",
      "var d = new Date();",
      "var y = d.getFullYear();",
      "d.setFullYear(y+1);",
      "return d.toDateString();",
      "}",
      "var store = localStorage.getItem('H5_CFG') || '{\"value\":{}}';",
      "var config = JSON.parse(store);",
      "config.value." + config.channel + "_ver ='" + grunt.template.today('mmddhhMM') + "';",
      "config.timeout = getDateTime();",
      "localStorage.setItem('H5_CFG',JSON.stringify(config));"
    ]
    grunt.file.write(filePath, jsBuffer.toString() + verArr.join(" "));
  });

  /**
   * @description
   * @demo
   *  grunt web2.0:hotel
   *  grunt web2.0:hotel --debug
   *  grunt web2.0:hotel:path
   */
  grunt.registerTask('web2.0', function(channel, path) {
    var pkg = grunt.file.readJSON('package.json');
    var chanelConfig = pkg.applications[channel];
    var defaultPath = chanelConfig.defaultPath;
    var nodePath = require('path');
    var initConfig = {};
    var task = [];
    var webresourceSrc, webresourceDest;
    var isDebug = grunt.option('debug');
    var uglifyJs = require('uglify-js');
    var _ = require('underscore');

    if (!channel) {
      grunt.fatal('请配置频道名称');
    }

    if (!path) {
      path = chanelConfig.paths[defaultPath];
    }

    if (!path) {
      grunt.fatal('请配置频道路径');
    }

    var config = grunt.file.readJSON(nodePath.join(path, 'gruntCfg.json'));
    dest = nodePath.join(path, 'dest');

    _.defaults(config, {
      templateFn: 'buildViewTemplatesPath',
      templateUrl: 'templates'
    });

    var requireDefaults = {
      baseUrl: nodePath.join(path, config.webresourceSrc),
      dir: nodePath.join(dest, config.webresourceSrc),
      optimize: isDebug ? 'none' : 'uglify',
      paths: {},
      uglify: {
        "except": ["$super"]
      },
      onBuildRead: function (moduleName, path, contents) {
        //模板依赖解决
        var templateReg = new RegExp(config.templateFn + "\\(\['\"]([\\w-\\.\\/]+)['\"]\\)");
        var template = templateReg.exec(contents);
        var templateSrc;
        if (template) {
          if (template[1].indexOf('.html') == -1) {
            template[1] += '.html';
          }
          templateSrc = 'text!' + config.templateUrl + '/' + template[1];
          contents = contents.replace(templateReg, "'" + templateSrc + "'");
        }
        var main = config.modules[0] && config.modules[0].name; 

        // 替换代码路径
        if (moduleName == main) {
          contents = contents.replace(
                        config.webresourceSrc,
                        'dest/' + config.webresourceSrc
                      );
        }

        return contents;
      },
      onBuildWrite: function (moduleName, path, contents) {
        var reg = new RegExp('[\"\']' + moduleName + '[\"\']\,');
        

        //把打包的模块变成匿名模块
        config.modules.forEach(function(item) {
          if (moduleName === item.name) {
            contents = contents.replace(reg, '');
          }

          
        });

        

        
        return contents;
      },
      modules: [],
      optimizeCss: 
        isDebug ? 'standard.keepLines.keepWhitespace' : 'standard'
    };

    _.defaults(config, requireDefaults);

    // 排除框架的包
    pkg.frameworkInclude.forEach(function(item) {
      if (!config.paths[item]) {
        config.paths[item] = 'empty:';
      }
    });

    // 处理require.text.js
    config.paths.text = nodePath.join(__dirname, 'require.text');
    grunt.log.debug(JSON.stringify(config));

    initConfig.requirejs = {
      compile: {
        options: config
      }
    };
    // 复制cshtml
    initConfig.copy = {
      cshtml: {
        files: [
          {
            expand: true,
            cwd: path,
            src: ['Views/**'], 
            dest: dest
          }
        ]
      }
    };

    var cshtml = {
      expand: true,
      cwd: nodePath.join(dest, 'views'),
      src: ['**/*.cshtml'],
      dest: nodePath.join(dest, 'views')
    };
    var csthmlSrc = new RegExp(
       '\/' + channel + '\/' + config.webresourceSrc,
      'g');

    initConfig.replace = {
      change: {
        options: {
          bom: true,
          patterns: [
            { // 服务器模板
              match: /@.*?".*?"/g,   
              replacement: function (match) {
                return escape(match);
              }
            },
            { // 在标签里面的underscore模板
              match: /<%[\s\S]+?%>/g,
              replacement: function(match) {
                var result = escape(match);
                result = '_=' + result;
                
                return result;
              }
            }
          ]
        },
        files: [cshtml]
      },
      restore: {
        options: {
          bom: true,
          patterns: [
            {
                match: /@.*?%22.*?%22/g,
                replacement: function (match) {
                  return unescape(match);
                }
            }, {
              match: /_=%3C%25[\s\S]+?%25%3E/g,     // 处理常规underscore模板
              replacement: function(match) {
                var result = unescape(match);

                result = result.replace(/^_=/, '');

                return result;
              }
            },
            {
              match: /_="%3C%25[\s\S]+?%25%3E"/g,  // 处理在标签属性underscore模板
              replacement: function(match) {
                var result = unescape(match);

                result = result
                          .replace(/^_=/, '')
                          .replace(/^"/, '')
                          .replace(/"$/, '');

                return result;
              }
            },
            {
              match: /controller:.*?\.js(?!\?)/,     // controller加版本号
              replacement: function(match) {
                return match + '?v=' + defaultPath;
              }
            }, {                 
              match: csthmlSrc,
              replacement: function(match) {
                var src = config.webresourceSrc;
                return match.replace(src, 'dest/' + src);
              }
            }, {
               match: /layout[\s\S]*?~\/views\//i,                   // 处理layout
               replacement: function(match) {
                return match.replace(/\/views\//i, '/dest/views/');
              }
            }
          ]
        },
        files: [cshtml]
      }
    };

    if (!isDebug) {
      initConfig.replace.restore.options.patterns.unshift({
        match: /<script\s+type=\"text\/lizard-config\">[\w\W]+?<\/script>/,
        replacement: function(match, offset, string, source, target) {
          var reg = /<script\s+type=\"text\/lizard-config\">([\w\W]+)<\/script>/;
          var js = 'var obj=' + match.replace(reg, function($1, $2) {
            return $2.trim();
          });
          var result;
          result = uglifyJs.minify(js, {
            fromString: true
          });
          result = '<script type="text/lizard-config">' +
                   result.code.substr(8).replace(/;$/, '') +
                 '</script>';

          return result;
        }
      });
    }

    initConfig.htmlmin = {
      options: {
        removeComments: true,
        collapseWhitespace: !isDebug,
        collapseBooleanAttributes: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeOptionalTags: false,
        minifyJS: !isDebug,
        minifyCSS: !isDebug,
        processScripts: ['text/lizard-template'],
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      files: cshtml
    };

    task.push('requirejs', 'copy', 'replace:change', 'htmlmin', 'replace:restore');
    grunt.initConfig(initConfig);
    grunt.task.run(task);
  });

  // 暂时给酒店用的1.1和2.0混合打包
  grunt.registerTask('web1.0-2.0', function(channel, path) {
    var pkg = grunt.file.readJSON('package.json');
    var chanelConfig = pkg.applications[channel];
    var defaultPath = chanelConfig.defaultPath;
    var nodePath = require('path');
    var initConfig = {};
    var task = [];
    var webresourceSrc;
    var isDebug = grunt.option('debug');
    var uglifyJs = require('uglify-js');

    if (!channel) {
      grunt.fatal('请配置频道名称');
    }

    if (!path) {
      path = chanelConfig.paths[defaultPath];
    }

    if (!path) {
      grunt.fatal('请配置频道路径');
    }

    var options = {
      templateFn: 'buildViewTemplatesPath',
      templateUrl: 'templates',
      channel: channel
    };

    var config = grunt.file.readJSON(nodePath.join(path, 'gruntCfg.json'));
    webresourceSrc = nodePath.join(path, config.webresourceSrc);
    dest = nodePath.join(path, 'dest');


    var requireDefaults = {
      baseUrl: webresourceSrc,
      dir: dest,
      optimize: isDebug ? 'none' : 'uglify',
      paths: {},
      uglify: {
        "except": ["$super"]
      },
      onBuildRead:           function (moduleName, path, contents) {
        // 处理首页main的路径引用
        if (moduleName === 'main') {
          var srcReg = new RegExp(config.webresourceSrc + '/', 'g');
          contents = contents.replace(srcReg, 'dest/');
          return contents;
        }

        //模板依赖解决
        var templateReg = new RegExp(options.templateFn + "\\(\['\"]([\\w-\\.\\/]+)['\"]\\)");
        var template = templateReg.exec(contents);
        var templateSrc;
        if (template) {
          if (template[1].indexOf('.html') == -1) {
            template[1] += '.html';
          }
          templateSrc = 'text!' + options.templateUrl + '/' + template[1];
          contents = contents.replace(templateReg, "'" + templateSrc + "'");
        }
       
        return contents;
      },
      onBuildWrite: function (moduleName, path, contents) {
        var reg = new RegExp('[\"\']' + moduleName + '[\"\']\,');
        //把打包的模块变成匿名模块
        config.modules.forEach(function(item) {
          if (moduleName === item.name) {
            contents = contents.replace(reg, '');
          }
        });
        var defineReg = /define\('business/;
        var defineSrc = grunt.template.process("define('<%= options.channel %>/dest/business");

        return contents
                 .replace(defineReg, defineSrc);
      },
      modules: [],
      optimizeCss: 
        isDebug ? 'standard.keepLines.keepWhitespace' : 'standard'
    };



    for (var i in requireDefaults) {
      if (!config[i]) {
        config[i] = requireDefaults[i];
      }
    }

    // 排除框架的包
    pkg.frameworkInclude.forEach(function(item) {
      if (!config.paths[item]) {
        config.paths[item] = 'empty:';
      }
    });

    // 处理require.text.js
    config.paths.text = nodePath.join(__dirname, 'require.text');
    initConfig.requirejs = {
      compile: {
        options: config
      }
    };
    // 注册grunt打包时候的参数
    initConfig.options = options;

    var cshtml = {
      expand: true,
      cwd: nodePath.join(dest, 'views'),
      src: ['**/*.cshtml'],
      dest: nodePath.join(dest, 'views')
    };

    // 替换服务器模板
    initConfig.replace = {
      change: {
        options: {
          bom: true,
          patterns: [
            { // 
              match: /[\w~]\/src\/\w/g,   
              replacement: function (match) {
                return match.replace('src', 'dest');
              }
            },
            {
              // 服务器代码
              match: /@[\w\.\[\{\}"]+/g,
              replacement: function (match) {
                return escape(match);
              }
            },
            { // 在标签里面的underscore模板
              match: /<%[\s\S]+?%>/g,
              replacement: function(match) {
                var result = escape(match);
                result = '_=' + result;
                
                return result;
              }
            }
          ]
        },
        files: [cshtml]
      },
      restore: {
        options: {
          bom: true,
          patterns: [
            {
              match: /@[\w\.%5B%22%7B%7D]+/g,
              replacement: function (match) {
                return unescape(match);
              }
            }, 
            {
              match: /_="?%3C%25[\s\S]+?%25%3E/g,
              replacement: function(match) {
                var result = unescape(match);
                result = result
                           .replace(/^_=/, '')
                           .replace(/[\t\n]/g, '')
                           .replace(/[(<%)\{]\s+/g, function($1) {
                              return $1.replace(/\s+$/, '');
                           })
                           .replace(/\s+[\}(%>)]/, function($1) {
                              return $1.replace(/^\s+/, '');
                           });
                return result;
              }
            }
          ]
        },
        files: [cshtml]
      }
    };

    initConfig.replace.change.options.patterns.push({
      match: /<script\s+type=\"text\/lizard-config\">[\w\W]+?<\/script>/,
      replacement: function(match) {
        /*var reg = /<script\s+type=\"text\/lizard-config\">([\w\W]+)<\/script>/;
        var js = match.replace(/[^'"]@\w+/g, function($1) {
          return $1.replace('@', '_net');
        }).replace(reg, function($1, $2) {
          return $2.trim();
        });
        js = 'var obj=' + js;
        var result;

        try {
          result = uglifyJs.minify(js, {
            fromString: true
          });
          result = '<script type="text/lizard-config">' +
                   result.code.substr(8).replace(/;$/, '') +
                 '</script>';
        } catch (e) {
          result = match;
        }*/
        return match;
      }
    });
    // html min
    initConfig.htmlmin = {
      options: {
        removeComments: true,
        collapseWhitespace: isDebug,
        collapseBooleanAttributes: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeOptionalTags: true,
        minifyJS: isDebug,
        minifyCSS: isDebug,
        processScripts: ['text/lizard-template'],
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      files: cshtml
    };
    task.push('requirejs', 'replace:change', 'htmlmin', 'replace:restore');
    //task.push('requirejs', 'replace:change', 'htmlmin', 'replace:restore');
    grunt.initConfig(initConfig);
    grunt.task.run(task);
  });

  function erreorLog(e) {
    grunt.log.error(e);
    grunt.file.writeln('build_error.log', e)
  }
}