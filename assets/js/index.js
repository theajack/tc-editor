var index=-1;
var n=9;
J.cls('demo-code').each(function(dom){
  new TCEditor({
    el:dom,
    theme: 'dark',
    height: 'auto',
    width: '80%',
    buttons: true
  })
})
J.ready(function(){
  J.noteStyle("simple");
  // Jcode.extend("color:");
  J.cls("api-item").clk(function(){
    J.show('文档升级中, 请先参考 github README.md, 即将跳转...')
    setTimeout(function(){
      J.open('https://github.com/theajack/tc-editor/blob/master/README.md')
    },2000)
    return;
    index=this.index();
    if(index==0){
      J.id("naviLeft").hide();
    }else if(index==n-1){
      J.id("naviRight").hide();
    }
    showApiDetail(this.index());
    J.body().css("overflow","hidden");
    changeNaviText();
  });
});
function changeNaviText(){
  var obj=J.id("apiItemWrapper").child(index);
  if(index>0){
    var text=obj.prev().child(0).txt();
    J.id("naviLeft").findClass("navi-text").txt("上一节:"+text);
  }
  if(index<n-1){
    var text=obj.next().child(0).txt();
    J.id("naviRight").findClass("navi-text").txt("下一节:"+text);
  }
}
var editors=[];
function showApiDetail(i){
  editors = [];
  J.id("apiShowContent").html(data[i]);
  J.id("apiShowContent").findTag('editor').each(function(dom){
    var disabled = dom.hasAttr('disabled');
    var buttons = !(disabled);
    if(dom.hasAttr('buttons')){
      var attr = dom.attr('buttons');
      console.log(attr)
      if(attr ==='all'||attr==='true'||attr===''){
        buttons = true;
      }else{
        buttons = attr.split(';')
      }
    }
    var height = (dom.hasAttr('height'))?dom.attr('height'):'auto';
    var width = (dom.hasAttr('width'))?dom.attr('width'):'auto';
    editors.push(new TCEditor({
      el:dom,
      disabled: disabled,
      buttons: buttons,
      height: height,
      width: width
    }))
  })
  // Jcode.init();
  J.id("apiShowWrapper").fadeIn();
}
function nextApi(obj){
  if(index==n-1){
    J.show("已是最后一节","warn")
  }else{
    index++;
    showApiDetail(index);
    if(index==n-1){
      obj.fadeOut();
    }else if(index==1){
      obj.prev().fadeIn();
    }
    changeNaviText();
  }
}
function lastApi(obj){
  if(index==0){
    J.show("已是第一节","warn")
  }else{
    index--;
    showApiDetail(index);
    if(index==0){
      obj.fadeOut();
    }else if(index==n-2){
      obj.next().fadeIn();
    }
    changeNaviText();
  }
}
function closeDetail(){
  J.id("naviRight").fadeIn();
  J.id("naviLeft").fadeIn();
  J.id("apiShowWrapper").fadeOut();
    J.body().css("overflow","auto");
}