/**
 * Created by shbzhang on 13-11-21.
 */
module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        config: {
            srcDir: '<%= pkg.channels["app"].path%>',
            destDir: '<%= pkg.channels["app"].path%>/dest',
            channel: 'app'
        },

        /**
         * 清空任务
         */
        clean: {
            options: { force: true },
            main: '<%= config.destDir %>',
            css: ['<%= config.destDir %>/res/style/*.css','!<%= config.destDir %>/res/style/iwan.min.css']//把多余的css清除掉除了iwan.min.css

        },


        /**
         * 复制任务
         */
        "copy": {
            //web任务，copy sbu目录下的html,样式图片至sbu/dest目录
            "web_sbu": {
                "files": [
                  {
                      "expand": true,
                      "cwd": "<%= config.srcDir %>",
                      "src": ["**/*.html", "res/**/*.*"],
                      "dest": "<%= config.destDir %>"
                  }
                ]
            },
            //hybrid任务,copy sbu目录下的样式,图片至out/webapp/sbu目录
            "app_sbu": {
                "files": [
                  {
                      "expand": true,
                      "cwd": "<%= config.srcDir %>",
                      "src": ["res/**/*.*"],
                      "dest": "<%= config.destDir %>"
                  }
                ]
            },
            //hybrid任务,复制res目录下文件至图片至out/webapp/res目录
            "app_res": {
                "files": [
                  {
                      "expand": true,
                      "cwd": "<%= config.srcDir%>/",
                      "src": ["images/*.*", "img/*.*", "libs/*.*", "style/*.*"],
                      "dest": "<%= config.destDir%>/"
                  }
                ]
            },
            //hybrid任务,复制各个版本的common.js
            "app_app": {
                "files": [
                  {
                      "expand": true,
                      "cwd": "<%= config.srcDir%>/",
                      "src": ["*/hybrid/*.js"],
                      "dest": "<%= config.destDir%>/"
                  }
                ]
            },
            // hybrid任务,复制1.0版本的common.js,保持向下兼容
            //"app_app_1.0": {
            //    "files": [
            //      {
            //          "expand": true,
            //          "cwd": "<%= config.srcDir%>/1.0//hybrid",
            //          "src": ["*.js"],
            //          "dest": "<%= config.destDir%>/"
            //      }
            //    ]
            //},
            // hybrid任务,复制1.1版本的common.js,保持向下兼容
            "app_app_1.1": {
                "files": [
                  {
                      "expand": true,
                      "cwd": "<%= config.srcDir%>/1.1/hybrid",
                      "src": ["*.js"],
                      "dest": "<%= config.destDir%>/"
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
                    "report": "false",
                    "mangle": {
                        "except": ['$super']
                    }
                },
                "files": [
                  {
                      "expand": true,
                      "cwd": "<%= config.srcDir %>",
                      "src": "**/*.js",
                      "dest": "<%= config.destDir %>"
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
                      "cwd": "<%= config.srcDir%>/",
                      "src": ["*.html", "views/**/*.html"],
                      "dest": "<%= config.destDir%>/"
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
            //合并文件
            "combine": {
                "files": {
                    "<%= config.destDir %>/res/style/iwan.min.css" : "<%= config.srcDir %>/res/style/*"
                }
            },
            //css 迷你化
            "minify": {
                "expand": true,
                "cwd": "<%= config.destDir %>/res/style",
                "src": ["*"],
                "dest": "<%= config.destDir %>/res/style/"
            }

        },

        /**
         * css路径替换任务
         */
        replace: {
            options: {
                patterns: [
                  {
                      match: /\.\.\/img/g,
                      replacement: 'http://webresource.c-ctrip.com/ResFunOnline/R3/mobile_image',
                      expression: true
                  },
                  {
                      match: '/-calc\\(100%-/g',
                      replacement: '-calc(100% - ',
                      expression: true
                  }
                ]
            },
            web_app_css: {
                files: [
                  { expand: true, flatten: true, cwd: '<%= config.destDir %>/', src: ['**/*.css'], dest: '<%= config.destDir %>/res/style/' }
                ]
            },
            web_res_css: {
                files: [
                  { expand: true, flatten: true, cwd: '<%= config.destDir %>/', src: ['**/*.css'], dest: '<%= config.destDir %>/style/' }
                ]
            },
            templates: {
                options: {
                    patterns: [
                      {
                          match: '/"views/g',
                          replacement: '"<%= config.channel %>/views',
                          expression: true
                      },
                      {
                          match: '/dest\/views/g',
                          replacement: '/<%= config.channel %>/dest/views',
                          expression: true
                      },
                      {
                          match: '/text!views/g',
                          replacement: 'text!<%= config.channel %>/views',
                          expression: true
                      },
                      {
                          match: '/text!dest\/templates/g',
                          replacement: 'text!<%= config.channel %>/dest/templates',
                          expression: true
                      },
                      {
                          match: '/text!templates/g',
                          replacement: 'text!<%= config.channel %>/templates',
                          expression: true
                      },
                      {
                          match: '/text!views/templates/g',
                          replacement: 'text!<%= config.channel %>/views/templates',
                          expression: true
                      }
                    ]
                },
                files: [
                  { flatten: true, src: ['<%= config.destDir %>/main.js'], dest: '<%= config.destDir %>/main.js' }
                ]
            }
        },

        /**
         * 去除空格任务
         */
        "strip": {
            "main": {
                "src": "<%= config.destDir %>/**/*.js",
                "options": {
                    "inline": true
                }
            }
        },

        /**
         * 执行压缩任务
         */
        "compress": {
            //hybrid压缩
            "app": {
                "options": {
                    "archive": "<%= pkg.appOutDir %>/zip/<%= config.channel%>.zip"
                },
                "files": [
                  {
                      "src": ["**"],
                      "cwd": "<%= config.destDir %>",
                      "dest": "<%= config.channel%>/",
                      "expand": true
                  }
                ]
            },
            //web 压缩
            "web": {
                "options": {
                    "archive": "<%= pkg.webOutDir %>/<%= config.channel%>.zip"
                },
                "files": [
                  {
                      "src": ["dest/**/*", "*.html", "*.js"],
                      "cwd": "<%= config.srcDir %>",
                      "dest": "/",
                      "expand": true
                  }
                ]
            }
        },

        /**
         * 生成MD5码任务
         */
        "hashify": {
            main: {
                options: {
                    basedir: '<%= pkg.appOutDir %>/zip',
                    copy: true,
                    hashmap: '/md5.json'
                },
                files: [
                  {
                      src: '<%= pkg.appOutDir %>/zip/<%=config.channel%>.zip',
                      dest: '/<%= config.channel %>.zip',
                      key: '<%= config.channel %>'
                  }
                ]
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
        grunt.log.write(platform + ";" + application + ":" + projectPath);
        //设置源文件目录和目的目录
        grunt.log.write("app:"+ app);
        var taskName = app.task,
          srcDir, destDir,
          tasks;
        //如果给程序指定了编译任务名,取给定的任务,否则取默认任务
        if (taskName) {
            tasks = pkg.tasks[platform][taskName];
        } else {
            tasks = (application == 'app' || application == 'res') ? pkg.tasks[platform][application] : pkg.tasks[platform].default;
        }
        grunt.log.write("tasks:"+ tasks);
        //如果是app平台的app任务,设一下src目录
        if (platform == 'app' && application == "app") {
            srcDir = projectPath;
        } else {
            srcDir = projectPath;
        }

        destDir = platform == 'web' ? srcDir + "/dest" : pkg.appOutDir + "/webapp/" + application;

        var config = {
            srcDir: srcDir,
            destDir: destDir,
            channel: application
        };

        grunt.log.debug(JSON.stringify(config, null, 2));
        grunt.config.set('config', config);

        grunt.log.debug(projectPath);
        //在各SBU目录读取gruntCfg.json目录,生成requirejs目录
        if (grunt.util._.indexOf(tasks, 'requirejs') > -1) {
            loadRequireTask(platform, application, projectPath);
        }
        //运行任务
        grunt.task.run(tasks);
    });


    /**
     * 读取requirejs 配置,合并文件
     * @param platform
     * @param application
     * @param projectPath
     * @returns {boolean}
     */
    function loadRequireTask(platform, application, projectPath) {
        var fileName = projectPath + "/gruntCfg.json",
          optimize = grunt.option('debug') ? "none" : "uglify",
          requireTask;
        grunt.log.debug('read ' + fileName);
        try {
            var taskCfg = grunt.file.readJSON(fileName);
            grunt.log.debug(JSON.stringify(taskCfg, null, 2));
            var options = taskCfg.requirejs.main.options,
              platformCfg = options[platform];

            requireTask = {
                main: {
                    options: {
                        baseUrl: options.baseUrl,
                        paths: options.paths,
                        optimize: optimize,
                        uglify: {
                            "except": ["$super"]
                        },
                        include: platformCfg.include,
                        out: platformCfg.out
                    }
                }
            }

        } catch (e) {
            erreorLog();
            return false;
        }

        grunt.log.debug(JSON.stringify(requireTask, null, 2));
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
                md5: md5Obj[name].toUpperCase()
            }
        }
        var content = JSON.stringify(jsonObj, null, 4);
        grunt.file.write('out/hybrid/zip/md5.json', content);
    });

    /**
     * 添加版本号
     */
    grunt.registerTask('addVersion', 'format MD5 task', function () {
        var config = grunt.config.get('config');
        var jsBuffer = grunt.file.read(config.destDir + "/main.app.js");
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
        grunt.file.write(config.destDir + "/main.app.js", jsBuffer.toString() + verArr.join(" "));
    });

    function erreorLog(e) {
        grunt.log.error(e);
        grunt.file.writeln('build_error.log', e)
    }
}