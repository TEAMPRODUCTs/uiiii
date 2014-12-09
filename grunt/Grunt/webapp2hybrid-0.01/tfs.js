'use strict';

var through2 = require('through2');
var exec = require('child_process').exec;

/**
 * �����ڽ��и�ʽ��
 * @param date Ҫ��ʽ��������
 * @param format ���и�ʽ����ģʽ�ַ���
 *     ֧�ֵ�ģʽ��ĸ�У�
 *     y:��,
 *     M:���е��·�(1-12),
 *     d:�·��е���(1-31),
 *     h:Сʱ(0-23),
 *     m:��(0-59),
 *     s:��(0-59),
 *     S:����(0-999),
 *     q:����(1-4)
 * @return String
 * @author yanis.wang@gmail.com
 */
function dateFormat(date, format) {
    if(format === undefined){
        format = date;
        date = new Date();
    }
    var map = {
        "M": date.getMonth() + 1, //�·�
        "d": date.getDate(), //��
        "h": date.getHours(), //Сʱ
        "m": date.getMinutes(), //��
        "s": date.getSeconds(), //��
        "q": Math.floor((date.getMonth() + 3) / 3), //����
        "S": date.getMilliseconds() //����
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
}

function shell(command) {
    exec(command, function(error, stdout, stderr) {
        stdout && console.log('stdout: ' + stdout);
        stderr && console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}

exports.checkout = function() {
    return through2.obj(function(file, enc, cb) {
        var filepath = file.path;
        shell('tf checkout /recursive ' + filepath);
    });
};

exports.checkin = function() {
    return through2.obj(function(file, enc, cb) {
        var filepath = file.path;
        shell('tf checkin /recursive /noprompt /comment:"Compress Javascript ' + dateFormat(new Date, 'yyyy-MM-dd hh:mm:ss') + '" ' + filepath);
    });
};

exports.undo = function() {
    return through2.obj(function(file, enc, cb) {
        var filepath = file.path;
        shell('tf undo /recursive /noprompt ' + filepath);
    });
};

exports.add = function() {
    return through2.obj(function(file, enc, cb) {
        var filepath = file.path;
        shell('tf add ' + filepath + ' /recursive /noprompt');
    });
};