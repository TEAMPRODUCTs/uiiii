无线金融支付H5 API文档
===========

此文档提供一个快速查阅支付h5代码相关api的平台，帮助开发人员及相关人员快速熟悉代码。
## 阅读帮助

该API主要分Modules 和 Namespace.  

### Modules

   Modules用于定义项目中 的Model 及 Store, 具体结构参阅右侧导航栏**Modules**
   
    /**
    @module  
    @name BusinessModel  
    @description 业务Model,此类作用是重写url指向  
    @author lh_sun@ctrip.com  
    @memberof paybasemodel  
    @version 6.2
    */
    
### Namespace

   Namespace对应一个js文件, 具体结构参阅右侧导航栏**Namespace**
   
    Namespace定义
     /**
    * @namespace common/bankmap
    * @description 银行图标初始化
    */
    
    
    Namespace成员属性定义
     /**
    * 初始化银行数据
    * @Array
    * @name datas
    * @description 初始化银行数据
    * @author lh_sun@ctrip.com
    * @memberof common/bankmap
    * @inner
    */

    
    Namespace成员函数定义
    /**
    * 过滤出卡片类型从字典中获取classname
    * @function
    * @name getBankClass
    * @description 过滤出卡片类型从字典中获取classname
    * @param {JSON} card - 银行卡数据
    * @author lh_sun@ctrip.com
    * @memberof common/bankmap
    * @inner
    */

## 报告bug/提建议

如果你发现bug1,或者有什么意见建议 [Just email us](mailto:sq_xu@ctrip.com) .

## 文档生成
此Api文档是通过 [JSDoc](http://usejsdoc.org/) 生成的。

## Grunt使用

项目通过使用 [Grunt](http://gruntjs.com) 打包生成API文档，安装grunt及相应依赖包，然后运行以下grunt文档。

### 安装 Grunt

在命令行输入以下命令:

-  通过输入`npm install -g grunt-cli` 安装 `grunt-cli`
-  通过`npm install` 安装 [必要的本地依赖](https://github.com/nicoespeon/gitgraph.js/blob/master/.editorconfig).


[> 更多关于Grunt的信息?](http://gruntjs.com/getting-started)

## 版权

Copyright (c) 2015 无线金融支付H5
