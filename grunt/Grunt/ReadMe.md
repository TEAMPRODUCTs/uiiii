################12/4 jsdoc##########################

---1) GruntĿ¼�°�װgrunt-jsdoc -------

npm install grunt-jsdoc --save-dev  


grunt.initConfig({


---2) jsdoc task ����-------
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

---3) ���� jsdoc ���-------
grunt.loadNpmTasks('grunt-jsdoc');


----4��Դ�������src �ĵ�����  doc��



###########################################################