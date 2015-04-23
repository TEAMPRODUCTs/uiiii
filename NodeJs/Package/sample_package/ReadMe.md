Node.js 的包是一个目录，其中包含一个 JSON 格式的包说明文件 package.json。严格符
合 CommonJS 规范的包应该具备以下特征：
 package.json 必须在包的顶层目录下；
 二进制文件应该在 bin 目录下；
 JavaScript 代码应该在 lib 目录下；
 文档应该在 doc 目录下；
 单元测试应该在 test 目录下。
Node.js 对包的要求并没有这么严格，只要顶层目录下有 package.json，并符合一些规范
即可。当然为了提高兼容性，我们还是建议你在制作包的时候，严格遵守 CommonJS 规范。
'

npm init
npm adduser
npm publish

npm install sample_package
