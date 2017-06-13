var index=-1;
var n=9;
J.ready(function(){
  J.noteStyle("simple");
  Jcode.extend("color:");
  J.class("api-item").clk(function(){
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
function showApiDetail(i){
  J.id("apiShowContent").html(data[i]);
  Jcode.init();
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