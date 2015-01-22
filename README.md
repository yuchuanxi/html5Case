# html5Case
learning html5, take notes, make demonstration









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
gulp --projectName
eg: gulp --history
```
or
```
gulp build --projectName
eg: gulp build --history
```

**说明:**
该模式用于编译项目, 执行命令后会生成一个`dist`目录,将压缩打包后的文件置于该目录.

3. 创建项目

**未完成...**


