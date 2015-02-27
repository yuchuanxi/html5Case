/**
 *
 * @authors gooofly (QQ941721234, wangfei.f2e@gmail.com, http://www.gooofly.com)
 * @date    2015-01-21 11:02:58
 * @version $Id$
 *
 * title
 * --------------------------------------------
 */
'use strict';

var
// core modules
  path = require('path'),
  fs = require('fs'),

  gulp = require('gulp'),
  debug = require('debug')('gf:gulpfile'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  // notify = require( 'gulp-notify' ),
  // nodemon = require( 'gulp-nodemon' ),
  connect = require('gulp-connect'),
  // html
  jade = require('gulp-jade'),
  prettify = require('gulp-prettify'),
  // css
  less = require('gulp-less'),
  prefix = require('gulp-autoprefixer'),
  csscomb = require('gulp-csscomb'),
  cssmin = require('gulp-cssmin'),
  // js
  jshint = require('gulp-jshint'),
  jscs = require('gulp-jscs'),
  stylish = require('gulp-jscs-stylish'),
  uglify = require('gulp-uglify'),
  // file operation
  // sourcemaps = require( 'gulp-sourcemaps' ),
  rename = require('gulp-rename'),
  copy = require('gulp-copy'),

  // 变量
  noop = function() {},
  argv = process.argv,
  arg = argv.pop(),
  subProject = arg.search('--') === 0 ? arg.slice(2) : false,
  subProjectDir = 'app/' + (subProject || '*');

// 编译 jade 模板为 HTML, 并格式化HTML
gulp.task('jade', function() {
  var
    locals = {},
    stream = gulp.src(subProjectDir + '/jade/*.jade')
    .pipe(jade({
      locals: locals
    }))
    .pipe(prettify({
      indent_size: 2,
      brace_style: 'end-expand',
      end_with_newline: true,
      indent_handlebars: true,
      indent_inner_html: false,
      unformatted: [ 
        'code', 'pre', 'sub', 'sup', 'strike',
        'big', 'small', 'pre', 'h4', 'h5', 'h6'
      ]
    }));

  if (subProject) {

    stream.pipe(gulp.dest('app/' + subProject));
  }
  else {

    stream
      .pipe(rename(function(path) {
        path.dirname += '/../';
      }))
      .pipe(gulp.dest('app'));
  }

  stream.pipe(reload({
    stream: true
  }));

  debug('jade compiled ok!');

  return stream;
});
// 格式化, 复制 HTML 到 dist 
gulp.task('copyHtml', [ 'jade' ], function() {
  var
    stream = gulp.src(subProjectDir + '/*.html')
    .pipe(prettify({
      indent_size: 2
    }));

  if (subProject) {

    stream.pipe(gulp.dest('app/' + subProject + '/dist'));
  }
  else {

    stream
      .pipe(rename(function(path) {
        path.dirname += '/dist';
      }))
      .pipe(gulp.dest('app'));
  }

  debug('copyed HTML ok!');

  return stream;
});
// 编译 less 为 CSS, 并给CSS加浏览器私有前缀, 给CSS属性排序
gulp.task('less', function() {

  var stream = gulp.src(subProjectDir + '/less/main.less')
    .pipe(less())
    .pipe(prefix(
      'Android >=4',
      'Chrome >=30',
      'Firefox >=30',
      'Explorer >=9',
      'IOS > =6',
      'Safari >= 6'
    ))
    .pipe(csscomb());

  if (subProject) {

    stream.pipe(gulp.dest('app/' + subProject + '/css'));
  }
  else {

    stream
      .pipe(rename(function(path) {
        path.dirname += '/../css';
      }))
      .pipe(gulp.dest('app'));
  }
  stream.pipe(reload({
    stream: true
  }));

  debug('LESS compiled ok!');

  return stream;
});
// 处理 CSS 给CSS加浏览器私有前缀, 给CSS属性排序
gulp.task('css', [ 'less' ], function() {

  var stream = gulp.src(subProjectDir + '/css/*.css')
    .pipe(prefix(
      'Android >=4',
      'Chrome >=30',
      'Firefox >=30',
      'Explorer >=9',
      'IOS > =6',
      'Safari >= 6'
    ))
    .pipe(csscomb());

  if (subProject) {

    stream.pipe(gulp.dest('app/' + subProject + '/css'));
  }
  else {

    stream.pipe(gulp.dest('app'));
  }

  stream.pipe(reload({
    stream: true
  }));

  debug('CSS prefixed ok!');

  return stream;
});
// 压缩 css 并保存到 dist
gulp.task('cssmin', [ 'css' ], function() {

  var stream = gulp.src(subProjectDir + '/css/*.css')
    .pipe(cssmin());

  if (subProject) {

    stream
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('app/' + subProject + '/dist/css'));
  }
  else {

    stream
      .pipe(rename(function(path) {
        path.dirname += '/../dist/css';
      }))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('app'));
  }

  debug('minify CSS ok!');

  return stream;
});
// 对js语法和代码风格进行 lint
gulp.task('jshint', function() {
  var stream = gulp.src(subProjectDir + '/js/*.js')
    .pipe(jscs())
    .on('error', noop)
    .pipe(stylish())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(reload({
      stream: true
    }));

  debug('hint JavaScript ok!');

  return stream;
});
// 压缩 js 并 保存到 dist
gulp.task('jsmin', [ 'jshint' ], function() {
  var stream = gulp.src(subProjectDir + '/js/*.js')
    .pipe(uglify());

  if (subProject) {

    stream
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('app/' + subProject + '/dist/js'));
  }
  else {

    stream
      .pipe(rename(function(path) {
        path.dirname += '/../dist/js';
      }))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('app'));
  }

  debug('minify JavaScript ok!');

  return stream;
});



// 启动web server, 用于开发
gulp.task('default', [ 'browser-sync' ],
  function() {
    gulp.watch(subProjectDir + '/js/*.js', [ 'jshint' ]);
    gulp.watch(subProjectDir + '/less/*.less', [ 'less' ]);
    gulp.watch(subProjectDir + '/css/*.css', [ 'css' ]);
    gulp.watch([ subProjectDir + '/jade/*.jade' ], [ 'jade' ]);
    gulp.watch([ subProjectDir + '/*.html' ], reload);
  });
// 编译项目

gulp.task('build', [ 'copyHtml', 'cssmin', 'jsmin' ], function() {

  debug('building ok!');
});

// 创建新项目
gulp.task('new', function() {
  if (subProject) {
    var
      filePath = path.resolve(__dirname, 'app'),
      newFolderPath = path.resolve(filePath, subProject);

    fs.readdir(filePath, function(err, folders) {

      if (!err) {
        // 如果传入工程名已经存在了
        if (folders.indexOf(subProject) !== -1) {
          throw new Error('Project has existed!');
        }

        fs.mkdir(newFolderPath, function() {

          var stream = gulp.src('template/**')
            .pipe(copy(newFolderPath, {
              prefix: 1
            }));

          debug('Create new project success!');

          return stream;
        });
      }
    });
  }
  else { // 如果没有传入工程名

    throw new Error('Must provide a name of project!');
  }
});


// 启动node web服务
gulp.task('connect', function() {
  connect.server({
    // root: './',
    port: 2015
  });
});
// 同步浏览器
gulp.task('browser-sync', [ 'connect', 'jade', 'css', 'jshint' ], function() {
  browserSync({
    proxy: {
      host: 'http://localhost',
      port: 5000
    },
    ghostMode: {
      clicks: true,
      location: true,
      forms: true,
      scroll: true
    },
    logLevel: 'info', // 'info', 'debug', 'warn', 'silent',
    logPrefix: 'gf:',
    browser: 'google chrome'
  }, function(err) {
    if (!err) {
      debug('BrowserSync is ready!');
    }
  });
});

