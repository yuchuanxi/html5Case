# html5Case
learning html5, take notes, make demonstration

提供了一个环境, 用于开发, 打包, 新建项目.
在开发中主要通过自动监听静态文件的变动, 自动更新浏览器来减少重复的工作量.









## gulp使用方法:

1. 项目开发

```
gulp --projectName
eg: gulp --history
```
or
```
gulp default --projectName
eg: gulp default --history
```

**说明:**
该模式用于开发. 该模式通过 `gulp-connect` 启动了一个 `web server` ,并通过 `browser-sync` 实现浏览器的同步. 开发的时候无论修改了 `jade`, `html`, `less`, `css`, `JavaScript` `gulp`都会对代码进行自动的编译,hint, 添加浏览器前缀等操作.并且浏览器会自动更新到最新状态.

2. 项目编译

```
gulp build --projectName
eg: gulp build --history
```

**说明:**
该模式用于编译项目, 执行命令后会生成一个`dist`目录,将压缩打包后的文件置于该目录.

3. 创建项目

**说明:**

```
gulp new --projectName
eg: gulp new --history
```

必须提供 `projectName`, 并且 `projectName` 不能和当前已存在工程同名.

*note:* 现在的 `new` 操作只是简单的copy了一份初始工程.

