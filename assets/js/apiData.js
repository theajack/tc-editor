var data=[
//0 默认样式
  '<div class="api-item-title">默认样式</div>\
    <div class="api-item-text">获取汉字完整拼音</div>\
    <div class="api-show-text">本节介绍如何使用默认样式来向html中插入一个最简单的代码编辑器。</div>\
    <div class="api-show-text">使用起来其实特别简单，只需要插入一个<span class="red">editor</span>标签，就像插入一个textarea标签一样</div>\
    <div class="api-show-text">就像下面一样</div>\
    <editor height="auto" disabled>&lt;div>&lt;/div></editor>\
    <div class="api-show-text">效果就是这样的。它支持<span class="red">多行缩进和缩退</span>。</div>\
    <editor></editor>\
    <div class="api-show-text">默认大小是宽300px；高200px。试着在里面随便编写几行代码看看。</div>',
//1 初始代码
  '<div class="api-item-title">初始代码</div>\
    <div class="api-item-text">为editor标签添加代码</div>\
    <div class="api-show-text">本节介绍添加初始代码。</div>\
    <div class="api-show-text">就像对textarea一样，直接把代码放到editor开始标签和结束标签之间就可以。</div>\
    <div class="api-show-text">（注：代码首尾的空格和换行会被删除掉。）</div>\
    <div class="api-show-text">请看下面这个实例：</div>\
    <editor height="auto" disabled>&lt;editor>\n\
\n\
//首尾的换行和空格不会显示\n\
function getDate(){\n\
	return new Date();\n\
}\n\
\n\
&lt;/editor></editor>\
    <div class="api-show-text">效果：</div>\
    <editor>\n\
//首尾的换行和空格不会显示\n\
function getDate(){\n\
	return new Date();\n\
}\n\
</editor>',

//2 禁用编辑
  '<div class="api-item-title">禁用编辑</div>\
    <div class="api-item-text">禁止用户编辑文字</div>\
    <div class="api-show-text">本节介绍如何使用属性让编辑器只可读，成为一个展示代码的容器，也就是禁用编辑功能。</div>\
    <div class="api-show-text">使用起来也很简单，就像对textarea和input一样，添加一个<span class="red">disabled</span>属性就可以</div>\
    <editor height="auto" disabled>&lt;editor disabled>\n\
function getDate(){\n\
	return new Date();\n\
}\n\
&lt;/editor></editor>\
    <div class="api-show-text">或者 <span class="red">disabled="true"</span>或<span class="red">disabled="disabled"</span></div>\
    <editor height="auto" disabled>&lt;editor disabled="true">\n\
function getDate(){\n\
	return new Date();\n\
}\n\
&lt;/editor></editor>\
    <div class="api-show-text">效果是这样的。编辑器不可被选中。</div>\
    <editor disabled="true">\
function getDate(){\n\
	return new Date();\n\
}\n\
</editor>',

//3 功能按钮
  '<div class="api-item-title">功能按钮</div>\
        <div class="api-item-text">通过按钮点击实现功能</div>\
        <div class="api-show-text">本节介绍如何启用功能按钮，功能按钮提供了丰富对编辑器操作的功能，你也可以自定义选择只要某些功能。</div>\
        <div class="api-show-text">启用全部功能只需要加上<span class="red">buttons="all"</span>属性，或者使用<span class="red">buttons="true"</span>或<span class="red">buttons="buttons"</span>。如下所示：</div>\
        <editor height="auto" disabled>&lt;editor buttons="true">\n\
function getDate(){\n\
	return new Date();\n\
}\n\
&lt;/editor></editor>\
        <div class="api-show-text">效果如下：</div>\
        <editor buttons>\
function getDate(){\n\
	return new Date();\n\
}\n\
</editor>\
        <div class="api-show-text">若想只使用某些功能，则需要列出功能名(不区分大小写)，并以分号(;)隔开。编辑器头部面板上则会按照您指定的顺序出现指定的按钮。如下所示</div>\
        <editor height="auto" width="auto" disabled>&lt;editor buttons="fontSizeDown;fontSizeUp;clearCode;fullScreen">\n\
function getDate(){\n\
	return new Date();\n\
}\n\
&lt;/editor></editor>\
        <div class="api-show-text">效果如下：</div>\
<editor buttons="fontSizeDown;fontSizeUp;clearCode;fullScreen">\
function getDate(){\n\
	return new Date();\n\
}\n\
</editor>\
<div class="api-show-text">有以下九个按钮可选(不区分大小写)<span class="red">[fontSizeUp,fontSizeDown,fullScreen,fix,changeTheme,clearCode,resetCode,copy,submit]</span>。接下来一一介绍一下它们的作用：</div>\
<div class="api-show-text"><span class="red">fontSizeUp</span>:将代码字体放大一个px(最大值35px)。其中代码默认值是18px。</div>\
<div class="api-show-text"><span class="red">fontSizeDown</span>:将代码字体缩小一个px(最小值12px)</div>\
<div class="api-show-text"><span class="red">fullScreen</span>：全屏操作编辑器。再次点击将会复原。</div>\
<div class="api-show-text"><span class="red">fix</span>：因为兼容性问题，在某些手机浏览器上(IOS上)或出现有重影的情况。用户可以使用这个按钮修复这个问题。</div>\
<div class="api-show-text"><span class="red">changeTheme</span>：清楚代码的前景色，也就是字体颜色</div>\
<div class="api-show-text"><span class="red">clearCode</span>：清空代码，该操作不可撤销</div>\
<div class="api-show-text"><span class="red">resetCode</span>：将编辑器内代码重置为初始代码，该操作不可撤销</div>\
<div class="api-show-text"><span class="red">copy</span>：复制编辑器内的代码。因为兼容性问题，某些浏览器不支持该功能。如果不支持会全选中代码，并提示用户按下Ctrl+V</div>\
<div class="api-show-text"><span class="red">submit</span>：该按钮默认是没有的，只有在加了编辑器有callback属性（下面的章节会介绍这个属性）的时候才会出现。功能是提交代码，将代码当作参数执行回调函数。</div>\
',

//4 功能函数
  '<div class="api-item-title">功能函数</div>\
    <div class="api-item-text">js调用功能函数</div>\
    <div class="api-show-text">本节介绍如何使用<span class="red">Jcode</span>对象对编辑器实现功能操作。</div>\
    <div class="api-show-text">以下是一个例子：</div>\
    <editor height="auto" width="auto" disabled>&lt;editor id="testEditor" buttons="true" callback="J.showWait(this.tagName+code)">\n\
function getDate(){\n\
	return new Date();\n\
}\n\
&lt;/editor></editor>\
    <div class="api-show-text">生成的编辑器如下：</div>\
<editor id="testEditor" buttons="true" callback="J.showWait(this.tagName+code)">\n\
function getDate(){\n\
	return new Date();\n\
}\n\
</editor>\
    <div class="api-show-text">首先介绍一下<span class="red">callback属性</span>。该属性里填写段js代码或是执行某个js函数。可以使用this参数和code参数，this参数指的是当前的editor元素，code参数指的是编辑器里的代码。</div>\
    <div class="api-show-text">当添加了这个属性之后，如果有添加按钮，则<span class="red">提交按钮</span>会出现。点击该按钮。callback里的代码会被执行。</div>\
    <div class="api-show-text">功能函数的功能与上一节的按钮完全一致。九个按钮分别对应以下九个方法.参数Obj就是你要操作的那个editor元素。点击以下方法名来操作上面的editor元素试一下</div>\
    <div class="api-show-text"><span class="click" onclick=\'Jcode.fontSizeUp(J.id("testEditor"))\'>Jcode.fontSizeUp(J.id("testEditor"))</span></div>\
    <div class="api-show-text"><span class="click" onclick=\'Jcode.fontSizeDown(J.id("testEditor"))\'>Jcode.fontSizeDown(J.id("testEditor"))</span></div>\
    <div class="api-show-text"><span class="click" onclick=\'Jcode.fullScreen(J.id("testEditor"))\'>Jcode.fullScreen(J.id("testEditor"))</span></div>\
    <div class="api-show-text"><span class="click" onclick=\'Jcode.fix(J.id("testEditor"))\'>Jcode.fix(J.id("testEditor"))</span></div>\
    <div class="api-show-text"><span class="click" onclick=\'Jcode.changeTheme(J.id("testEditor"))\'>Jcode.changeTheme(J.id("testEditor"))</span></div>\
    <div class="api-show-text"><span class="click" onclick=\'Jcode.clearCode(J.id("testEditor"))\'>Jcode.clearCode(J.id("testEditor"))</span></div>\
    <div class="api-show-text"><span class="click" onclick=\'Jcode.resetCode(J.id("testEditor"))\'>Jcode.resetCode(J.id("testEditor"))</span></div>\
    <div class="api-show-text"><span class="click" onclick=\'Jcode.copy(J.id("testEditor"))\'>Jcode.copy(J.id("testEditor"))</span></div>\
    <div class="api-show-text"><span class="click" onclick=\'Jcode.submit(J.id("testEditor"))\'>Jcode.submit(J.id("testEditor"))</span></div>',
//5 自定义大小
  '<div class="api-item-title">自定义大小</div>\
        <div class="api-item-text">自定义编辑器大小</div>\
        <div class="api-show-text">本节介绍如何通过<span class="red">width</span>和<span class="red">height</span>属性来改变编辑器大小。</div>\
        <div class="api-show-text">这两个属性设置和css规则类似。有auto,px,%,em四种不同的值，接下来为您一一介绍</div>\
        <div class="api-show-text">下面是默认大小(第一个是代码，第二个是实际效果)。也就是没有width和auto属性。默认高度200px,宽度300px;最小高度45px(有按钮情况下85px)，最小宽度245px</div>\
        <editor width="auto" height="auto" disabled>&lt;editor>\n\
function getDate(){\n\
	return new Date();\n\
}\n\
&lt;/editor></editor>\
        <editor>\n\
function getDate(){\n\
	return new Date();\n\
}\n\
</editor>\
        <div class="api-show-text">下面是都设置为auto。它会根据输入的代码来<span class="red">自适应的改变大小</span>。试着输入几行代码看看。</div>\
        <editor width="auto" height="auto" disabled>&lt;editor width="auto" height="auto">\n\
function getDate(){\n\
	return new Date();\n\
}\n\
&lt;/editor></editor>\
        <editor width="auto" height="auto">\n\
function getDate(){\n\
	return new Date();\n\
}\n\
</editor>\
        <div class="api-show-text">下面是都设置为定宽400px(这个例子设置的是px，因为px，%，em类似,笔者就不一一演示了)</div>\
        <editor width="auto" height="auto" disabled>&lt;editor width="400px" height="400px">\n\
function getDate(){\n\
	return new Date();\n\
}\n\
&lt;/editor></editor>\
        <editor width="400px" height="400px">\n\
function getDate(){\n\
	return new Date();\n\
}\n\
</editor>',
//6 自定义样式
  '<div class="api-item-title">自定义样式</div>\
        <div class="api-item-text">根据喜好自定义编辑器样式</div>\
        <div class="api-show-text">本节介绍如何使用css改变编辑器默认样式。</div>\
        <div class="api-show-text">编辑器允许使用者在style属性或是自己的css文件通过选择器对其修改css样式，下面举一个例子。该例子是直接在属性里修改样式，在css文件中使用选择器修改请读者自行尝试，笔者就不演示了</div>\
        <editor height="auto" disabled>&lt;editor buttons="true" style="background-color:#f44;border:2px dashed #f88">\n\
function getDate(){\n\
	return new Date();\n\
}\n\
&lt;/editor></editor>\
        <div class="api-show-text">效果如下：</div>\
        <editor buttons style="background-color:#ff0;border:2px dashed #f88">\
function getDate(){\n\
	return new Date();\n\
}\n\
</editor>\
        <div class="api-show-text">将背景色修改了黄色，边框修改为了红色虚线2px.大多数css样式编辑器都是支持的</div>\
        ',
//7 初始化编辑器
  '<div class="api-item-title">初始化编辑器</div>\
        <div class="api-item-text">动态添加编辑器时必须初始化</div>\
        <div class="api-show-text">本节介绍在动态添加编辑器时，如何是编辑器生效。</div>\
        <div class="api-show-text">动态添加编辑器时需要使用<span class="red"Jcode.init()</span>方法来对编辑器进行初始化。该方法参数是可选的：</div>\
        <div class="api-show-text">1.如果没有参数，则是对页面上所有编辑器初始化</div>\
        <div class="api-show-text">2.如果参数是一个editor元素，则只对该编辑器初始化</div>\
        <div class="api-show-text">3.如果参数是一个不是editor元素的元素，则对该元素的所有子元素中的编辑器初始化</div>\
        <div class="api-show-text">接下来给出一个参数是一个editor元素的例子：</div>\
        <div class="api-show-text">首先，动态添加一个editor标签(<span class="click" onclick="addEditorTest()">点我添加</span>)，代码如下：</div>\
        <editor width="auto" height="auto" disabled>\n\
var editor=J.ct("editor#testEditor").attr("buttons","true").txt("function test(){\\\n\tvar text=\'Hello Jcode!\';\\\n\talert(text);\\\n}");\n\
J.id("textInitEditor").append(editor);\n\
\
</editor>\
        <div id="textInitEditor"></div>\
        ',
//8 扩展关键词
  '<div class="api-item-title">扩展关键词</div>\
        <div class="api-item-text">允许添加自定义关键词</div>\
        <div class="api-show-text">Jcode允许使用这添加自定义的关键词，这样用户在编辑器敲出来的关键次颜色也会改变。</div>\
        <div class="api-show-text">使用<span class="red">Jcode.extend()</span>方法对关键词进行扩展。参数可以使string或者 string Array。(<span class="click" onclick="Jcode.extend(\'test\');J.show(\'添加成功\')">点我添加test为关键词</span>)，代码如下:</div>\
        <editor height="auto" width="auto" disabled>Jcode.extend("test")</editor>\
        <div class="api-show-text">试试在添加前后敲入test关键词</div>\
        <editor buttons></editor>\
        <div class="api-show-text">如果对于关键词或是其他符号颜色不满意，您也可以在css文件中对以下几个标签进行css覆盖</div>\
        <div class="api-show-text">以下是编辑器css的关于代码元素颜色的源码，您可以对某些标签覆盖css颜色修改默认颜色。需要注意的是，这个颜色并不是最终的颜色，它们被rgba(255,255,255,.5)遮盖住的颜色才是最终颜色。这与编辑器实现原理与光标的保留有关。</div>\
        <editor width="auto" height="auto" disabled>\
cd_key {\n\
	color: #22b5ff\n\
}\n\
cd_sign {\n\
	color: #f0d\n\
}\n\
cd_fun,cd_fun * {\n\
	color: #001dff\n\
}\n\
cd_dfun,cd_dfun * {\n\
	color: #b2ff00\n\
}\n\
cd_num {\n\
	color: #fff\n\
}\n\
cd_tag,cd_tag * {\n\
	color: #ff8d00\n\
}\n\
cd_str,cd_str * {\n\
	color: red!important\n\
}\n\
cd_note,cd_note * {\n\
	color: #019d00!important\n\
}\n\
cd_str cd_note,cd_str cd_note *{\n\
  color: red!important\n\
}\
</editor>\
',
];

function addEditorTest(){
  J.id("textInitEditor").append("<editor id='testEditor' buttons>\
function test(){\n\
	var text='Hello Jcode!';\n\
	alert(text);\n\
}</editor>");
  J.id("apiShowContent").append('<div class="api-show-text">可以看到，虽然已经添加了一个editor标签，但是代码并不能编辑，颜色也没有改变，按钮栏也没有出现，这时时候就需要对它进行初始化(<span class="click" onclick="initEditorTest()">点我初始化</span>),代码如下：</div>\
        <editor id="initCode" width="auto" height="auto" disabled>\n\
Jcode.init(J.id("testEditor"));\
</editor>');
  Jcode.init(J.id("initCode"));
}
function initEditorTest(){
  Jcode.init(J.id("testEditor"));
  J.id("apiShowContent").append('<div class="api-show-text">初始化完成之后就出现了一个功能完整的编辑器了</div>');
}