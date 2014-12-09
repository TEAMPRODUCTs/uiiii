################12/4 jsdoc##########################

---1) Grunt目录下安装grunt-jsdoc -------

npm install grunt-jsdoc --save-dev  


grunt.initConfig({


---2) jsdoc task 配置-------
    jsdoc : {
        dist : {
            src: ['src/*.js', 'test/*.js'], 
            options: {
                destination: 'doc'
            }
        }
    }
});

----run   grunt jsdoc

---3) 加载 jsdoc 插件-------
grunt.loadNpmTasks('grunt-jsdoc');


----4）源代码放在src 文档生成  doc下



###########################################################