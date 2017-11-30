//jQuery.noConflict( [removeAll] )    //释放jQuery对全局变量$、jQuery的控制权

_jQuery = window.jQuery;

_$ = window.$;



jQuery.extend({
  noConflict: funciton( deep ){
    if( window.$ === jQuery ) {
      window.$ = _$;
    }
    if( deep && window.jQuery === jQuery ) {
      window.jQuery = _jQuery;
    }
    return jQuery;
  }
})
// 	jQuery初始化时,  把可能存在的window.jQuery 和 window.$备份到局部变量_jQuery和_$中
// 	如果window.$ === jQuery,  则设置window.$为初始化时备份的_$。只有在当前的jQuery库持有有全局变量$的情况下, 才会释放$的控制权给前一个javascript库。
// 	如果参数deep为true， 并且window.jQuery == jQuery , 则设置window.jQuery为初始化备份的_jQuery,也就是说 deep 为true时，只有在当前的jQuery库持有有全局变量jQuery的情况下, 才会释放jQuery的控制权给前一个javascript库。
// 	从jQuery 1.6开始增加了对window.$ === jQuery的检测。 如果不检测， 则每次调用jQuery.noConflict( true )时都会释放jQuery给前一个Javascript库， 当页面中有两个以上定义了jQuery的Javascript库时， 对jQuery的管理将会变得混乱 
