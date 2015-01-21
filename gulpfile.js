/**
 * 
 * @authors gooofly (QQ941721234, wangfei.f2e@gmail.com, http://www.gooofly.com)
 * @date    2015-01-21 11:02:58
 * @version $Id$
 *
 * title
 * --------------------------------------------
 */

var
  // core modules
  path = require('path'),

  gulp = require('gulp'),
  debug = require('debug')('gf:gulpfile'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  nodemon = require('gulp-nodemon'),
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
  uglify = require('gulp-uglify'),
  // file operation
  // sourcemaps = require('gulp-sourcemaps'),
  rename = require("gulp-rename"),
  copy = require('gulp-copy');

// 编译 jade 模板为 html
gulp.task('jade', function () {
  var locals = {};

  gulp.src('app/**/*.jade')
    .pipe(jade({locals: locals}))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest('app'))
    .pipe(reload({stream: true}));
});
// 复制 html 到 dist 
gulp.task('copyHtml', function () {
  var locals = {};

  gulp.src('app/*/*.jade')
    .pipe(jade({locals: locals}))
    .pipe(prettify({indent_size: 2}))
    .pipe(rename(function ( path ) {
      path.dirname += '/dist';
    }))
    .pipe(gulp.dest('app'))
    .pipe(reload({stream: true}));
});
// 编译 less
gulp.task('less', function () {
  
  gulp.src('app/*/less/main.less')
    .pipe(less())
    .pipe(prefix('Android 2.3', 'Android >=4', 'Chrome >=20', 'Firefox >=24', 'Explorer >=8', 'IOS > 6', 'Opera >= 12', 'Safari >= 6'))
    .pipe(csscomb())
    .pipe(rename(function ( path ) {
      path.dirname += '/../css';
    }))
    .pipe(gulp.dest('app'))
    .pipe(reload({stream: true}));
});
// 压缩 css 并保存到 dist
gulp.task('cssmin', function () {
  gulp.src('app/*/css/*.css')
    .pipe(cssmin())
    .pipe(rename(function ( path ) {
      path.dirname += '/../dist/css';
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app'));
});

gulp.task('jshint', function() {
  gulp.src('app/*/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(reload({stream: true}));
});
// 压缩 js 并 保存到 dist
gulp.task('jsmin', function() {
  gulp.src('app/*/js/*.js')
    .pipe(uglify())
    .pipe(rename(function ( path ) {
      path.dirname += '/../dist/js';
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app'));
});



// 启动web server, 用于开发
gulp.task('default', ['connect', 'browser-sync', 'jade', 'less', 'jshint'], 
function() {
  gulp.watch('app/*/js/*.js', ['jshint']);
  gulp.watch('app/*/less/*.less', ['less']);
  gulp.watch(['app/*/*.jade'], ['jade']);
  // gulp.watch(['app/*/*.html'], reload);
});

// 编译项目
gulp.task('build', ['copyHtml', 'cssmin', 'jsmin'], function () {
  debug('building ok!');
});

// 创建新项目
gulp.task('new', function () {

});


// 启动node web服务
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    port: 8888
  });
});
// 同步浏览器
gulp.task('browser-sync', function() {
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
    logPrefix: "gf: ",
    browser: "google chrome"
  }, function(err, cb) {
    if (!err) {
      debug('BrowserSync is ready!');
    }
  });
});