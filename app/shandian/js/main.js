/* 
* 
* @authors gooofly (wangfei.f2e@gmail.com)
* @date    2015-01-22 16:11:14
* @version $Id$
*
* title
* --------------------------------------------------
*/
// 为jshint定义全局变量
/* jshint es3: true */
/* global Hammer */


(function() {
  'use strict';

  function cccccc(msg) {
    var message = document.querySelector('.message');

    message.innerHTML +=  '<br>' + msg;
  }

  function removeClass(el, className) {

    if (el.classList) {

      el.classList.remove(className);
    }
    else {

      el.className = el.className.replace(new RegExp('(^|\\b)' +
        className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    return el;
  }

  function addClass(el, className) {

    if (el.classList) {

      el.classList.add(className);
    }
    else {

      el.className += ' ' + className;
    }

    return el;
  }



  // 页面自适应
  var 
    wrapper = document.querySelector('.wrapper'),
    bodyHeight = document.body.offsetHeight,
    bodyWidth = document.body.offsetWidth,
    hammer = new Hammer(wrapper),
    arrow = document.querySelector('.arrow');

  function setBodySize() {

    if ( bodyWidth > bodyHeight * 0.63 ) {
      wrapper.style.width = bodyHeight * 0.63 + 'px';
    }
    else if ( bodyHeight > bodyWidth / 0.63 ) {
      wrapper.style.height = bodyWidth / 0.63 + 'px';
    }
  }

  document.body.addEventListener('resize', setBodySize, false);
  window.onresize = setBodySize;





  // 页面转场动画
  function switchClass(currentElement, nextElement, inName, outName) {
    removeClass(currentElement, 'current');
    addClass(currentElement, outName);

    removeClass(nextElement, inName);
    addClass(nextElement, 'current');
  }

  function prevPage(current) {
    var
      prev = current.previousElementSibling;

    if ( ~prev.className.indexOf('up') | ~prev.className.indexOf('down') ) {

      return prev;
    }

    return prevPage(prev);
  }

  function nextPage(current) {
    var
      next = current.nextElementSibling;

    if (~next.className.indexOf('up') | ~next.className.indexOf('down')) {

      return next;
    }
    // next element既不是up也不是down, 递归
    return nextPage(next);
  }

  function rightPage(current) {
    var
      right = current.nextElementSibling;

    return right;
  }

  /*
   *
   * 绑定职业名称，滑出对应的职业详情
   */
  function toJobDesc(ev) {
    var
      current = document.querySelector('.current');

    if ( ~current.className.indexOf('hassubpage') ) {
      switchClass(current, rightPage(current), 'right', 'left');
      arrow.style.display = 'none';
    }

    ev.preventDefault();
  }

  var
    toJobDescs = document.querySelectorAll('.toJobDesc'),
    bindEvent = toJobDescs[ 0 ].touchstart ? 'touchstart' : 'click',
    l = toJobDescs.length,
    i = 0;

  for (; i < l; i++) {
    toJobDescs[ i ].addEventListener(bindEvent, toJobDesc, false);
  }

  /*
   *
   * 职业详情页，返回按钮事件绑定
   */
  function backToPage(ev) {
    var
      current = document.querySelector('.current');


    switchClass(current, current.previousElementSibling, 'left', 'right');
    arrow.style.display = 'block'; 

    ev.preventDefault();
  }

  var
    backbtns = document.querySelectorAll('.backbtn'),
    len = backbtns.length,
    k = 0;

  for (; k < len; k++) {
    backbtns[ k ].addEventListener(bindEvent, backToPage, false);
  }


  hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL }); // 设置swipe在所有方向开启
  hammer.on('swipeup swiperight swipedown swipeleft', function(ev) {
    var 
      type = ev.type,
      current = document.querySelector('.current');

    // 在职业详情页，只允许向左滑动
    if ( current.className.indexOf('jobDesc') !== -1 ) {

      if ( type === 'swiperight' ) {

        switchClass(current, current.previousElementSibling, 'left', 'right');
        arrow.style.display = 'block'; 
      }
    }
    else {

      switch (type) {
        case 'swipeup':
          switchClass(current, nextPage(current), 'down', 'up');
          break;

        case 'swipeleft':
          if ( ~current.className.indexOf('hassubpage') ) {
            switchClass(current, rightPage(current), 'right', 'left');
            arrow.style.display = 'none';
          }
          break;

        case 'swipedown':
          switchClass(current, prevPage(current), 'up', 'down');
          break;
          
        default:
      }
    }

  });


  /*
   *
   * 用于处理IOS safari上，局部滚动
   *
   * 在IOS上，不允许对局部进行滚动，通过touchmove来模拟滚动
   */
  function isTouchDevice() {
    try {
      document.createEvent('TouchEvent');

      return true;
    } 
    catch (e) {
      return false;
    }
  }

  function touchScroll(el) {
    if (isTouchDevice()) { // if touch events exist...   
      var 
        scrollStartPos = 0;

      el.addEventListener('touchstart', function(event) {
        scrollStartPos = this.scrollTop + event.touches[ 0 ].pageY;
        event.preventDefault();
      }, false);
      el.addEventListener('touchmove', function(event) {
        this.scrollTop = scrollStartPos - event.touches[ 0 ].pageY;
        event.preventDefault();
      }, false);
    }
  }

  var 
    imgwraps = document.querySelectorAll('.imgwrap'),
    j = 0,
    l2 = imgwraps.length;

  for (; j < l2; j++) {
    touchScroll(imgwraps[ j ]);
  }





})();
