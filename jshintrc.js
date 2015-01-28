/**
 * 
 * @authors Wangfei (wangfei.f2e@gmail.com)
 * @date    2015-01-28 14:23:33
 * @version $Id$
 *
 * jshint 配置参数说明 [jshint options](http://jshint.com/docs/options/)
 */
// 为jshint定义全局变量, 未注释的配置项为我自定义的配置项
/* jshint es5: true */
/* global Modernizr */

var jshintrc = {
	// enforcing options， 报 errors 错误
	// bitwise: false, // 设置为true，禁用位运算符(如^，|，&)
	camelcase: false, // 设置为true，强制使用驼峰命名(camelCase)或全大写下划线命名(UPPER_CASE)
	curly: false, // 设置为true，强制if，for和while等语句中使用{}来明确代码块
	// enforceall: false, // 设置为true，强制启用所有enforcing options，并禁用所有relaxing options
	eqeqeq: false, // 设置为true， 强制使用全等
	// es3: false, // 设置为true，强制使用es3规范
	es5: false, // 设置为true，
	forin: false, // 设置为true，在for in循环中使用Object.prototype.hasOwnProperty()来过滤原型链中的属性
	freeze: false, // 设置为true，禁止复写原生对象(如Array, Date)的原型
	// funcscope: false, // 设置为true，允许在控制体内定义变量而在外部使用
	// globals: false, // 设置为true，
	// globalstrict: false, // 设置为true，允许全局严格模式
	immed: false, // 设置为true，匿名函数调用必须(function() { /* body */ }());而不是(function() { /* body */ })();这是为了表明，表达式的值是函数的结果，而不是函数本身。
	indent: '?', // 代码缩进宽度（空格数）
	// iterator: false, // 设置为true，允许__iterator__,不是所有的浏览器都支持__iterator__。
	latedef: false, // 设置为true，变量定义前禁止使用
	// maxcomplexity: 'number', // 设置函数的最大圈复杂度
	// maxdepth: 'number', // 设置代码块中可以嵌入{}的最大深度，
	// maxerr: 50, // 设置为true，SHint中断扫描前允许的最大错误数, 默认50
	maxlen: 'number', // 设置一行中最大字符数
	// maxparams: 'number', // 设置函数可以接受的最大参数数量,函数参数数量应该控制在3个以内，超出则可能造成使用困难，比如需要记忆参数顺序，难以设定默认值等。
	// maxstatements: 'number', // 设置函数中最大语句数，
	newcap: false, // 设置为true，构造函数名首字母必须大写
	noarg: false, // 设置为true，禁止使用arguments.caller和arguments.callee
	// nocomma: false, // 设置为true，
	noempty: false, // 设置为true，禁止出现空的代码块
	nonbsp: false, // 设置为true，禁止"non-breaking whitespace" 这是Mac键盘在某种情况下可以键入的字符，据说会破坏非UTF8编码的页面。
	// nonew: false, // 设置为true，禁止使用构造器
	// notypeof: false, // 设置为true，允许非法的typeof操作
	quotmark: false, // 设置为true，统一使用单引号或双引号 "single" or "double"
	// shadow: false, // 设置为true，允许变量shadow,基于“函数作用域”，多次定义变量和单次定义是没有区别的，但是会造成阅读障碍。
	// singleGroups: false, // 设置为true，
	undef: false, // 设置为true，禁止使用不在全局变量列表中的未定义的变量
	unused: false, // 设置为true，禁止定义却未使用的变量

	// Relaxing options 报 warning 错
	// asi: false, // 设置为true，允许省略分号
	// boss: false, // 设置为true，允许在if，for，while语句中使用赋值
	// debug: false, // 设置为true，允许debugger语句
	// elision: false, // 设置为true，
	eqnull: false, // 设置为true，允许==null, ==null通常用来比较=== null || === undefined
	esnext: false, // 设置为true，允许ECMAScript 6规约
	// evil: false, // 设置为true，允许使用eval
	expr: false, // 设置为true，允许应该出现赋值或函数调用的地方使用表达式 例如： a || (a = 1)
	// lastsemic: false, // 设置为true，允许单行控制块省略分号
	// laxbreak: false, // 设置为true，允许不安全的行中断(与laxcomma配合使用)
	// laxcomma: false, // 设置为true，允许逗号开头的编码样式
	// loopfunc: false, // 设置为true，允许循环中定义函数
	// moz: false, // 设置为true，
	// multistr: false, // 设置为true，允许多行字符串
	// noyield: false, // 设置为true，允许发生器中没有yield语句
	// phantom: false, // 设置为true，
	// plusplus: false, // 设置为true，
	// proto: false, // 设置为true，允许 proto,不是所有的浏览器都支持__proto__.
	// scripturl: false, // 设置为true，
	strict: false, // 设置为true，
	// sub: false, // 设置为true，允许person['name']
	// supernew: false, // 设置为true，允许new function() {...}和new Object;
	// validthis: false, // 设置为true，允许严格模式下在非构造函数中使用this
	// withstmt: false // 设置为true，
	// Enviroments 预定义一些全局变量，如node等，没什么好理解的。
};
