( function(){
  //选择器引擎入口， 查找与选择器表达式 selector 匹配的元素集合
  var Sizzle = function( selector, context, results, seed ) {...};
  //工具方法， 去重、排序
  Sizzle.uniqueSort = function( results ) {...};
  //便携方法， 使用指定的选择器表达式 expr 对元素集合 set 进行过滤
  Sizzle.matches = function( expr, set ) {...};
  //便携方法， 检查某个元素 node 是否匹配选择器表达式 expr
  Sizzle.matchesSelector = function( node, expr ) {...};
  //内部方法， 对块表达式进行查找
  Sizzle.find = function( expr, context, isXML ) {...};
  //内部方法, 用块表达式过滤元素集合
  Sizzle.filter = function ( expr, set, inplace, not ) {...};
  //工具方法，抛出异常
  Sizzle.error = function( msg ) {...};
  //工具方法, 获取dom元素集合额文本内容
  var getText = Sizzle.getText = function( elem ) {...};
  //拓展方法和属性
  var Expr = Sizzle.selectors = {
    //块表达式的查找顺序
    order : [ "ID", "NAME", "TAG"],
    //正则表达式集， 用于匹配和解析块表达式
    match: { ID, ClASS, NAME, ATTR, TAG, CHILD, POS, PSEUDO },
    leftMatch: { ... },
    //属性名修正函数集
    attrMap : { "class", "for" },
    //属性值读取函数集
    attrHandle: { href, type },
    //块间关系过滤函数集
    relative: { "+", ">", "", "~" },
    //块表达式查找函数集
    find: { ID, NAME, TAG },
    //块表达式预过滤函数集
    preFilter: { CLASS, ID, TAG, CHILD, ATTR, PSEUDO, POS },
    //伪类过滤函数集
    filters: { enabled, disabled, checked, selected, parent, empty, has, header, text, radio, checkbox, file, password, submit, image, reset, button, input, focus },
    //位置伪类过滤函数集
    setFilters: { first, last, even, odd, lt, gt, nth, eq },
    //块表达式过滤函数集
    filter: { PSEUDO, CHILD, ID, TAG, CLASS, ATTR, POS }
  };

  //如果支持方法document.querySelectorAll(), 则调用该方法查找元素
  if( document.querySelectorAll ) {
    ( function(){
        var oldSizzle = Sizzle;
        Sizzle = function( query, context, extra, seed ) {
            //尝试调用 querySelectorAll() 查找元素
            //如果上下文是document, 则直接调用querySelectorAll() 查找元素
            return makeArray( context.querySelectorAll(query), extra );
            //如果上下文是元素， 则为选择器表达式增加上下文， 然后调用querySelectorAll()
            //查找元素
            return makeArray( context.querySelectorAll( "[id = '"+ nid + "']" + query ), extra )
            //如果查找失败, 则仍然调用 oldSizzle()
            return oldSizzle( query, context, extra, seed );
        }
    } )()
  }

    //如果支持方法 matchesSelector(), 则调用该方法检查元素是否匹配选择器表达式
    (function(){
        var matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;
        if ( matches ) {
            Sizzle.matchesSelector = function( node, expr ) {
                //尝试调用方法 matchesSelector()
                var ret = matches.call( node, expr );
                return ret;
                //如果查找失败， 则仍然调用Sizzle()
                return Sizzle( expr, null, null, [node]).length > 0;
            }
        }
    })();

    //检查浏览器是否支持 getElementsByClassName()
    (function(){
        Expr.order.splice(1, 0, "CLASS");
        Expr.find.CLASS = function( match, context, isXML ) { ... };
    })();
    //工具方法, 检测元素a是否包含元素b
    Sizzle.contains = function( a, b ) { ... };
})()
