# gulp搭建的小程序开发框架
#学习/gulp#

* 目标：使用gulp搭建一个小程序开发框架
* gulp4，用法
	https://segmentfault.com/a/1190000019495629
* 实现：
	+ 检测更新自动打包
	+ 打包之前先删除一波
 eslint
	mock数据支持
	+ less转为wxss
	+ xml转为wxml
	+ 命令行打开开发工具
	+ 不同的命令启动项目，区分环境
	+ 编译错误输出 处理
	+ 发布的版本需要压缩文件? Or not?
		images
		css
		js
		json







## 插件们
[常用gulp插件介绍(一) | 进击的马斯特](http://pinkyjie.com/2015/08/02/commonly-used-gulp-plugins-part-1/)


## 删除的是目录的话
如果删除目录，需要重新编译。重新执行：
```
npm run dev
```


## Install
```
// 处理less
npm install --save-dev gulp-less

// 将小图标之类的小图片转换为base64编码图片放在css中
npm install --save-dev gulp-base64
https://www.w3cplus.com/workflow/gulp-tutorial-7-base64.html

// 根据浏览器自动处理浏览器后缀
npm install --save-dev gulp-autoprefixer
https://blog.csdn.net/wu_xiaozhou/article/details/52863115



// 打包之前删除一波build目录
npm install --save-dev gulp-clean
npm install --save-dev del
https://www.cnblogs.com/1wen/p/4586198.html
https://www.npmjs.com/package/del



// 重命名文件
npm install --save-dev gulp-rename

http://cw.hubwiz.com/card/c/562089cb1bc20c980538e25b/1/3/3/



// 想要处理结果会有一个通知的话
npm install --save-dev gulp-notify





//ES6转换ES5
npm install --save-dev babel-core
npm install --save-dev gulp-babel
npm install --save-dev babel-preset-es2015





// 压缩json文件
npm install --save-dev gulp-jsonminify

// 监听
npm install --save-dev gulp-watch

// 错误监控、输出、处理
npm install --save-dev gulp-plumber


// 环境变量区分
npm install --save-dev cross-env
https://www.weipxiu.com/2790.html



// 从package.json文件中加载gulp插件，而不再需要每一个依次引入
npm install --save-dev gulp-load-plugins
https://juejin.im/post/5d9ece67f265da5b926bc9c2

```



## 注册任务
新版本使用exports.xxx的方式来进行注册task
没有被export的task是私有task，通常在series或者parallel中使用


## 组合任务
parallel、series是用来组合task的，如果想要并发task，则使用parallel，如果想要顺序执行task则使用series


## 任务执行的顺序
	1. 编译
	2. 编译配置文件
	3. 打开开发工具
	4. 监听配置文件
	5. 监听项目

