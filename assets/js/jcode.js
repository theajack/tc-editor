//tabIndent.js
//html java c#
//
//html str note key fun sign
//str key fun note
//sign
//html
//lang style width height tab
//(HTML)(Note,Str,Fun,Key,Num),(sign)
//Note>Str>HTML>Fun>key>Num>sign
//
var _ce_btn="j-btn";
var _def_w=300,_def_h=200;
var Jcode={
  init:function(element){
    if(element==undefined){
      J.tag("editor").each(function(item){
        _initFrame(item);
      });
      _initCodeMain(J.class("code_editor"));
    }else{
      _initFrame(element);
      _initCodeMain(element.findClass("code_editor"));
    }
  },
  fix:function(obj){
    var par=obj.parent(2);
    if(obj.data("flag")){
      obj.data("flag",false);
      par.findClass("code_editor_view").css("left","3px");
    }else{
      obj.data("flag",true);
      par.findClass("code_editor_view").css("left","0px");
    }
  },
  clearColor:function(obj){
    var par=obj.parent(2);
    par.findClass("code_editor").toggleClass("bg");
    par.findClass("code_editor_view").fadeToggle();
  },
  clearCode:function(obj){
    J.confirm("是否确认清空代码？",function(){
      var par=obj.parent(2);
      par.findClass("code_editor_view").empty();
      par.findClass("code_editor").val("").focus();
    });
  },
  resetCode:function(obj){
    J.confirm("是否确认重置代码？",function(){
      var c=obj.parent(2).findClass("code_editor");
      c.val(c.data("code")).focus();
      _geneViewCode(c);
    });
  },
  copy:function(obj){
    if(J.isMobile()){
      J.show('Sorry,this function is just for PC',"warn","slow");
    }else{
      var par=obj.parent(2);
      if(par.findClass("code_editor").copy()){
        J.show('复制成功！');
      }else{
        par.findClass("code_editor").select();
        J.show("您的浏览器不支持该方法。请按Ctrl+V手动复制","info");
      }
    }
  }
};
function _initFrame(item){
  if(item.findClass("code_editor").length==0){//防止两次初始化
    var cont=item.html();
    var num=/^\d+$/;
    var w=item.hasAttr("width")?item.attr("width"):_def_w+"px";
    if(num.test(w)){
      w+="px";
    }
    var h=item.hasAttr("height")?item.attr("height"):_def_h+"px";
    if(num.test(h)){
      h+="px";
    }
    item.empty();
    item.append(J.new("pre.code_editor_view._bottom").html(cont));
    item.append(J.new("pre.code_editor_view").html(cont));
    item.append(J.new("textarea.code_editor[spellcheck=false]").html(cont).data("code",cont));
    if(h=="auto"){
      var rh=item.child(0).hei()+'px';
      item.css({
        width:w,
        height:rh
      }).child().css("height",rh);
    }else{
      item.css({
        width:w,
        height:h
      }).child().css("height","100%");
    }
    var mh=45;
    if(item.attr(_ce_btn)=="true"){
      item.child().css("padding-top","40px");
      mh+=40;
      item.append(J.new("div.code_set_w").append([
        J.new("img").clk("Jcode.fix(this)").tip("修复重影问题(若显示没有问题，请忽略该按钮)").attr("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABKCAYAAADzEqlPAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAABfBJREFUeF7lnFmoVVUYx//rODaQpg1Wako2UUZFYkFCUUkUFVgQRnM00RwFIUk9RK8RPfZgRJlKBVFRKJVCA2phExJmaWZFdbXpdr3dM/x6+Pax7dc9wzrXezl73R8c7rlr+PZe/7P3Gr41BLUBMEnSpZIWSjpd0ixJ47LoXyRtlbRW0mpJn4QQalnc6AK4mf8o5757+rO/24B7gAO9reQBDsoEiKEM7AQu8faSBzgAeCcToV2q2d+ngTHeZtIAE4G3gMpeOdqjCrwNTPA2kwYYD7xOvGBlYCVQ8jaTBhgHvEq8YFVgqbeXPMBYYEUmQAwV4BRvr1AAJ/mwVgBjgBeIE6wMrPO2CgMwNSvI3T6uFZhgy+pKRHCWt1UESpIuzr4/A9yZj2xFCKEqaaMPb0FF0v0+sBAAz7Nv/+k+n6YRwC25fDH8QRH7XsBnviTAwz6dB7geqPmMEczzNrse7FcejCU+bR1gMUMTagC4wdvteoA9viQ5HgeCS38VcS3gYPQDT+TtFoGSpGbulMckPUEmGHCFpBWyfEMhSDrAB3Y7YyXtktTMnbJE0nhgraRXNHSh6uwvOyNGSdJmHzgID0l6Q5Z+n9eyQ5D0qw/sdkqSPpL0j49owP4QSjIv6zc+sNspyZ6YkXaflCRt8IHdTsDcJtskzfSRw8i3IYTjfGC3U8omF56UVPWRw8gqH1AE6l2CiZK+lnS0RqaV+lrS/BDCbz6imylJUgihX9JN9f9HgFmS1gFTfURhAJ5i6L3zdhkANgOH+/soBJh/6jXiXcadMgBsAab5eykE2CzOiwxtoBzDAPANcLS/l0IABOARzM8VM1fYKQPAdmCGv5fCAJwArMkK9M/eorWmk3pvAPgemOXvo1AAc4FngV1ZwcqYa6c/96nzBfAwcAfxr3IZ+BHoyg5r1FgPc9WcKmmupNmSJksqS/pDNiDfFELYmUt/taTliuuSVCTtlrQghLDFRyYNcCXWusY8ZWWgBzjZ20se4HI6E2w3MNfbSx7gEqwSjxXsd+B0by95gIuwVjWmtawAf1LQidkhAZyPtZ6xgvUCZ3t7yQMsAPqIF+xv4FxvL3mAc7LCx4xDK1j/7jxvL3mAecBfmQjtUsXqvQu9veQBzsRmxWPGoFWsZa0vahk9AKcBvxEnWA1Lf5m3lzzAKVivPVawCrDI20se4ETgF+IFq2Lj0NEFMAf4iTjBwES71ttLHmA28ANWicdQA2709pIHOBbYQbxgALd5e8kDTMf2DXUi2F3eXvIARwFb6UywB3J2AnAE9opPBepbANMCOBL4is4E+wB4mcGXg/YBq4HbgYP9dQsLcBjwJZ0J1ixPLfv0AktJZUMWMAX4lOaFHwplbA4zDXc2MBn4mOEVrBdY4K9dSIBDgPUMn2BVrI6b469dSICDsco7tqffLmWsFd67qjpmPq+rCCH0yk4DeF8219guVUl7JOEjHGMlHSvp3npA1CRrN5L98j1qvjxdMnG2y45T2CE7cmGhpINkwjSiT9LMEMIuH1FIgFU0r7+qwBJgH1Gw1nX5vkn/xwBwaz5focH8YI2oAY/6PHmAl2hc99WANT5PIcFaxmZ8R4uhDXAo5qltRD8QClvB55jkA3Ig6b0QQtlH5MkWAr+pxvuYJkg6LAWxdvuAHAOyyrwdNsrSN2J6CmL1yZY9DcYESfN9YANmSGq2u7bPBxQSzG/fiD7gKJ8nD1ACPnf5PIen8GRJ1jFtVN+MlfQ8zU8ruVO2QK8Rv8u2GhYf4Dr/GDhq2Hk4x7h8JeBBWvfRVkoJ9OAlCdtO84OkKT4uR1k2LHpX0nrZ1psLJB2fTzQINUnXhBBW+ojCAtyXPQXtsIf21lfUsCXnzSr+4oHtDtlE4554pyz210oCbDKih/aemlZUgGX+GkkBnIEJ1qzSbkUF+JCcLytZsOmzDVmhY6jXectIZeKiHbBD0W4DfsZEa1aXlTGhtmLr9pPoJUSDHe64GHPD7P5Pn730AM8Bi2jR6o06BbHXa5qsz9UTQmj3mAb9C76oIgVkim9FAAAAAElFTkSuQmCC"),
        J.new("img").clk("Jcode.clearColor(this)").tip("清除颜色").attr("src","data:image/png;base64,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"),
        J.new("img").clk("Jcode.clearCode(this)").tip("清除代码(无法撤销)").attr("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAA0CAYAAAD19ArKAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAkBJREFUaEPtmj1rFEEYx3/P5XyPKDYq+IIQbBJQ0M42tY2dir34DfwUmlqx8ENYigQtLBTBQtCAVyhGfMHVnCTx7m8xu5e9Mett1rvJCPOD43ae5z/Dn7mdveGZhYZIOiTpjqRlbY2epI6km5J2+uNOFDnT7yWtlh1tkRVJi5Km/PEnhqQFSWvDPhqRSbrkj1+Hlh+oyUVgB9D7x89+4AINsOJCkgGzwLGNdCVTOOPjYA3o+0EPAa/MrFMEDEDSPuABcA5YL5KRsRu4B9wws35bUgt4BMwBu4ak8XE1/77eyhunid80wDRwRdKcSXqJu7f/FwTcNUnCLZCeJ4iVPcC7NnAwbwCcBI4OJHHxBviUX2eDxyGApAy3ervleAQcAJbMbKYItEtJgGVgBieMjSflRtN/zm0nGQ9NE+Nd4DnwFlgdTg2oq3kGdKjWVOIvzjpkuD3NNPDVyxXU0XwDzuN2iF+83EiazPgPM5OZfcftEjejjmYl12RUayppYjwKkvHQJOOhScZDk4yHJhkPTTIemmQ8NMl4aJLx0CTjoUnGQ5OMh6aJ8TaApL+V78alqaRJpyOSFoDjwE82jmHKHJZ0GziBK27u9fLgxrkFnKJaU4l/lPIadyIxij6jf61xaQrum9m1ouF3qnvy5vfbjHFpCn6VG37Hp147FrrA43LAv1XOAIu4mnVMfABmzWxQRx+acTN7AVwGPuOK86Peapgk67ji/xIwXzYN3owX5G9TzANn2b7Z/4g7anloZn+svd+553OhClXmmwAAAABJRU5ErkJggg=="),
        J.new("img").clk("Jcode.resetCode(this)").tip("重置代码(无法撤销)").attr("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA0CAYAAAAuT6DoAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAABWZJREFUaEPVmluoVGUUx/8rx3PMJDItqCBC7SKp5YPS1UJLugiVvaj1EKFIj1FEN+olfOmhEiMKe4nIoPKhHlIyichQMCORIDxHy/BWVmQXPTNnz6+HtfeZfb5m9t4zZ/a5/GCYmb2+b31rffdvfdtUAsAsSUskXStpvqS5kqZJ6o0/f0s6KumwpJ8kfSdpu5kd0XgEmA9sAA7iDAID8e8sqnhagH7gVWBxqH/UAQy4E9gZG1fEmTwSHbuAewALyy0d4Dpgb2xIUvPdJNH5A3BbWH4pANOAV4AIqCWWlEgUf28Czgvt6RrAbLwmq0NFjx5V4AhljEdgOXCa0WmtVkTAWeCu0L6OAe6LFSddpCh13Jh6KIip0lqWRQSsCe0MMaBiZoOhIAFYJmmbpEmSisxcdUlIiiRtl7Rb0gH5ejYgqSZpuqTLJc2RtFzSrZJ64jyTVAwkPWJm74SCIYD9wOPA1Cay64EzcU3lEeGtsB9YDUwL9bUCmALcD+yOdRXt+jVgUahviFTCP4AXgBnx86lAX6wgjxpwGFjBCNcl4EZgH8WWl0HgBHBxqEeSBOxJJa7hY2QjsC3+X4Q36eI0DVSAp/Dy83rNAPAlzSoV2BokhuJO1YF1oc5uAdwE/EW+PRGwKswv4HXyMzejDqwO9XUbYB7wK/nd9DhwbjrvOZJOyme4dkDS82a2JRR0GzM7IOlu5ds4U9IT6QeJc+ekHxbAJP0Z1lRZmNleSevlldqKiqRnhtmET8GdEOEz7IvAzEYZ5QF8SvbWb/jYw6febvAa0JuypesAV5M9e0bAjnSGWWGKNkkKW5qyozSAzWS3Xh24TGqMuU5I+v97ki4ws51pYYm8JWly+DAFku5o/PMtVjvU8PG2sqFzdMBP//3DzRnGALBRasySp1L5i/CZpLlmtjUUlI2ZIekjSdVQFtMj6Qap4dyJhqwlNUlnJK2VdK+ZFclTFvuU3TUXAJMS544OE/2fuqRvJM0zs7fj2htLvlX28atX0kWJc8clNTvTDcafpyXdYmaHAvlYkdcYktRbiX8024JFkg5KWmVm+wPZWHM2fNCE3qTl0luwSD6dvixp4Th0THHkIGyMkCnplqvIHTsmabWZ7RpKNs4Azlf+ftiHGX5uAniXNsIDYwUeEM7DwybApcCKQMe4BVhJdtTslORdUWZ2TN4dJwrL5OtuTyiI6Zfy++24A4+VPKDWjtXk6+DEc07SYkmXhA9TVCR9HD6cEACfkH3kOQtMCfONe/ALziwiYOK1Gh7L3Et2q0XAg2HecQ/wHPkhyD5gZPMI8CjNgqAlgV8fZ8VOwOOaD4d5C4Ofgl9KKXwoTNNtgKVkd0XwBf1nINlOtgfQC2yJFaWVrqdZnL4LAGvIvt9LqAONuEk7ADOAr2kd0v4QuDDM1yn4DdPmoIxWVIFNoY5C4Pfgh2IlragCJ4G1QKudQy74jLgO+IX8yQO8svtpcreYCzAZv2AoSnJf9iT+FlEh8Ap8FviR/IkjIcJvgOaH+hJyxwpwszza1aPiV7pVefo+STvi7z75a1EVeYxjtqQF8kjVNfI9YVbQJ01dXsbtZrYnFCbkOidJ+NXs55KmqriDCUkcpkeNvSxy4ypqX19dfqhebmZfBLLOwA+Iv5M99sqmCvwGLAntGzH4oXYH+VNzGQwCXwFZJ4KRgS/kj+Fh69FoxSru2AY6XaTbBZiDx1yi2IBukywF7wOzw/JHBeAK4A3cwRqtF/oiRHj+QfzctjAsb0wApuPbpQ+Af2JjB/DtUyuSCgF3bCe+KZ8e6u+EQktBu+C7lEWSrpS/AnWVfF2TfFmIJP0rf20q+XxvZqfjNF3hPyP7hmtj9uxwAAAAAElFTkSuQmCC"),
        J.new("img").clk("Jcode.copy(this)").tip("复制代码(部分浏览器可能不兼容)").attr("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAA6CAYAAADP/mu6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAfBJREFUaEPt2j9rU2EUgPHnTUtjjFSKIFixi0snJ8FBcBAHd3EQv4KCk3tH3fwAIvgBqqOUilNF0AbBtYPopCBoiYN/mschCdy8SHqL5niF9zddzgk3D5fLTSABQD2pPlY/G+Mmf0pdUT+pP7OTz9JX9XbeciDqE3UvO/GsvK4c99W7asqbahmdIMK70ft9qMz66gN1Lu/aTwvo5sNAXeAq8EhdyJfTtPLBP9AFLgFP1doXsQnhAB3gLPBcXcqXv9OUcIBDwCqwrZ7Il7kmhQMsAKeAnno6X1Y1LRxgHjgOvFLP5MuxJobDsOsosKWez5fQ3HCABBwBNtTL+bLJ4WOHgXX1WnUYGT7+dNybmNbTAe6rN8aDyPBjaht4CQzyZQ0d4I66pqakmr9iRr4At4BN4AXD+/cg31ESw2f9D+BeZDjALnAF2AIuAPt+0FSsAGuj4958dRNgEVgHdoBnwPvJ9VSLlWOjr3iVwPd8OEVieGvNAdvRV7wqAe18WFfkU+WvKuHRSni0Eh6thEcr4dFKeLQSHq2ERyvh0Up4tBIerYRHK+HRSni0Eh6thEdrMfwV63/TbwFv8mnDfQM2k3oO2GDyV62mGgAfgdUEoF4EHgJLNPfWaQM94HpK6e3EX+fUZWC5OmuIAbCTUtodD34BgjFYH8TuYhwAAAAASUVORK5CYII=")
      ]));
    }
    item.css("min-height",mh+"px");
    if(cont!=""){
      _geneViewCode(item.child(2));
    }
  }
}

function _initCodeMain(item){
  item.on({
    mouseleave:function(){
      //showResult(false);
    },
    keydown:_codeChange,
    keyup:function(e){
      if(e.keyCode==13||e.keyCode==9){
        _geneViewCode(this);
      }
    },
    input:function(){
      //showResultHtml();
      _geneViewCode(this);
    },
    scroll:function(event){
      _getView(this).scrollTo(this.scroll(),null,10).scrollXTo(this.scrollX(),null,10);
    },
    //onclick:moveCursor
  });
  _tabEnable(item);
}
var _code={
  _str:1,
  _key:["if","else","for","switch","while","try","catch","finally","new ","return","this","break",
      "default","case","continue","throw","throws","in ",//common
  "function","var","undefined","typeof",//js
  "private","protected","public","abstract","static","void",
  "boolean","byte","char","int ","double","enum","const","final","float","long","short","true","True",
    "false","False","null","String","string","object",
  "assert","class ","do","extends","goto","implements","import","instanceof","interface","native",
    "package","strictfp","super","synchronized","transient","volatile",
  "operator","out ","override","params","readonly","ref","sbyte","sealed","sizeof","stackalloc",
  "struct","uint","ulong","unchecked","unsafe","ushort","using","virtual","void","volatile","as ",
  "base","bool","checked","decimal","delegate","event","explicit","extern","foreach","internal",
  "is ","lock","namespace"//c#
 ],
  _tag:3,
  _attr:4,
  _sign:["=","&gt;","&lt;","{","}","\\(","\\)","\\[","\\]",",","&&","\\.",
    "\\?","\\|","\\+","-",";\n",":","!","%","\\^"],//转义
};
J.ready(function(){
  J.tag("head").append(J.new("style").txt("editor{border:1px solid rgba(255,255,255,.5);display:block;position:relative;white-space:pre;background-color:#222;border-radius:5px;overflow:hidden}.code_editor,.code_editor_view{width:100%;background-color:transparent;font-size:18px;padding:10px;line-height:22px;font-family:Microsoft Yahei;overflow:auto;position:absolute;white-space:pre;border:0;outline:0;-webkit-appearance:none;word-break:break-all;word-wrap:normal;margin:0}.code_set_w{background-color:#444;width:100%;height:30px;position:absolute;border-radius:5px 5px 0 0;border-bottom:1px solid #aaa;text-align:right;padding-right:5px;white-space:normal}.code_set_w img{width:20px;height:20px;margin:5px 3px;cursor:pointer}.code_editor_view{background-color:transparent;color:transparent}.code_editor_view._bottom{color:#888}.code_editor{color:rgba(255,255,255,.5);border-color:transparent;transition:background-color .3s;-o-transition:background-color .3s;-moz-transition:background-color .3s;-webkit-transition:background-color .3s;resize:none}.code_editor.bg{background-color:rgba(20,20,20,.9)}cd_key{color:#22b5ff}cd_sign{color:#f0d}cd_fun,cd_fun *{color:#001dff}cd_dfun,cd_dfun *{color:#b2ff00}cd_num{color:#fff}cd_tag,cd_tag *{color:#ff8d00}cd_str,cd_str *{color:red!important}cd_note,cd_note *{color:#019d00!important}"));
  Jcode.init();
});

function _tabEnable(obj){
  obj.on("keydown",_keyDown,true);
}
function _keyDown(e) {
  var a = '\t';
  var b = a.length;
  if (e.keyCode === 9) {
    e.preventDefault();
    var c = this.selectionStart,
      currentEnd = this.selectionEnd;
    if (e.shiftKey === false) {
      if (!_isMultiLine(this)) {
        this.value = this.value.slice(0, c) + a + this.value.slice(c);
        this.selectionStart = c + b;
        this.selectionEnd = currentEnd + b
      } else {
        var d = _findStartIndices(this),
          l = d.length,
          newStart = undefined,
          newEnd = undefined,
          affectedRows = 0;
        while (l--) {
          var f = d[l];
          if (d[l + 1] && c != d[l + 1]) f = d[l + 1];
          if (f >= c && d[l] < currentEnd) {
            this.value = this.value.slice(0, d[l]) + a + this.value.slice(d[l]);
            newStart = d[l];
            if (!newEnd) newEnd = (d[l + 1] ? d[l + 1] - 1 : 'end');
            affectedRows++
          }
        }
        this.selectionStart = newStart;
        this.selectionEnd = (newEnd !== 'end' ? newEnd + (b * affectedRows) : this.value.length)
      }
    } else {
      if (!_isMultiLine(this)) {
        if (this.value.substr(c - b, b) == a) {
          this.value = this.value.substr(0, c - b) + this.value.substr(c);
          this.selectionStart = c - b;
          this.selectionEnd = currentEnd - b
        } else if (this.value.substr(c - 1, 1) == "\n" && this.value.substr(c, b) == a) {
          this.value = this.value.substring(0, c) + this.value.substr(c + b);
          this.selectionStart = c;
          this.selectionEnd = currentEnd - b
        }
      } else {
        var d = _findStartIndices(this),
          l = d.length,
          newStart = undefined,
          newEnd = undefined,
          affectedRows = 0;
        while (l--) {
          var f = d[l];
          if (d[l + 1] && c != d[l + 1]) f = d[l + 1];
          if (f >= c && d[l] < currentEnd) {
            if (this.value.substr(d[l], b) == a) {
              this.value = this.value.slice(0, d[l]) + this.value.slice(d[l] + b);
              affectedRows++
            } else {}
            newStart = d[l];
            if (!newEnd) newEnd = (d[l + 1] ? d[l + 1] - 1 : 'end')
          }
        }
        this.selectionStart = newStart;
        this.selectionEnd = (newEnd !== 'end' ? newEnd - (affectedRows * b) : this.value.length)
      }
    }
  } else if (e.keyCode === 13 && e.shiftKey === false) {
    cursorPos = this.selectionStart,
    d = _findStartIndices(this),
    numStartIndices = d.length,
    startIndex = 0,
    endIndex = 0,
    tabMatch = new RegExp("^" + a.replace('\t', '\\t').replace(/ /g, '\\s') + "+", 'g'),
    lineText = '';
    tabs = null;
    for (var x = 0; x < numStartIndices; x++) {
      if (d[x + 1] && (cursorPos >= d[x]) && (cursorPos < d[x + 1])) {
        startIndex = d[x];
        endIndex = d[x + 1] - 1;
        break
      } else {
        startIndex = d[numStartIndices - 1];
        endIndex = this.value.length
      }
    }
    lineText = this.value.slice(startIndex, endIndex);
    tabs = lineText.match(tabMatch);
    if (tabs !== null) {
      e.preventDefault();
      var h = tabs[0];
      var i = h.length;
      var j = cursorPos - startIndex;
      if (i > j) {
        i = j;
        h = h.slice(0, j)
      }
      this.value = this.value.slice(0, cursorPos) + "\n" + h + this.value.slice(cursorPos);
      this.selectionStart = cursorPos + i + 1;
      this.selectionEnd = this.selectionStart
    }
  }
}
function _isMultiLine(a) {
  var b = a.value.slice(a.selectionStart, a.selectionEnd),
    nlRegex = new RegExp(/\n/);
  if (nlRegex.test(b)) return true;
  else return false
}
function _findStartIndices(a) {
  var b = a.value,
    startIndices = [],
    offset = 0;
  while (b.match(/\n/) && b.match(/\n/).length > 0) {
    offset = (startIndices.length > 0 ? startIndices[startIndices.length - 1] : 0);
    var c = b.search("\n");
    startIndices.push(c + offset + 1);
    b = b.substring(c + 1)
  }
  startIndices.unshift(0);
  return startIndices
}


//html str note key fun sign
//str key fun note
//sign
//html
//lang style width height tab
//(HTML)(Note,Str,Fun,Key,Num),(sign)
//Note>Str>HTML>Fun>key>Num>sign

//html  
//sign

function _getView(obj,i){
  if(i!=undefined){
    return obj.parent().child(i);
  }
  return obj.parent().findClass("code_editor_view");
}
function _codeChange(e){
  if(this.attr("jet-change")=="0"){
    this.attr("jet-change","1");
  }
  if(e.keyCode==13||e.keyCode==9){
    _geneViewCode(this);
  }
  //_geneViewCode();
}
function _geneViewCode(obj){
  //moveCursor();.replaceAll("<","&lt;").replaceAll(">","&gt;")
  var html=obj.val().replaceAll("<","&lt;").replaceAll(">","&gt;")+" ";//为了不让最后一个字符是换行
  html=_geneHtmlElement(html);
  html=_geneKey(html);
  html=_geneFun(html);
  //html=_geneDefineFun(html);
  html=_geneNumber(html);
  html=_geneString(html);
  html=_geneNote(html);
  html=_geneHtmlNote(html);
  _getView(obj,1).html(html); 
  
  var htmlSign=_geneSign(obj.val().replaceAll("<","&lt;").replaceAll(">","&gt;")+" ");
  _getView(obj,0).html(htmlSign); 
}
  function _geneSign(html){
    _code._sign.each(function(a){
      html=html.replaceAll(a,"<cd_sign>"+(a.has("\\")?a.substring(1):a)+"</cd_sign>");
    });
    return html;
  }
  function _geneDefineFun(html){//js
    var dFun=html.match(/(function)(.*?)(<)/g);
    if(dFun!=null){
      dFun.each(function(a,i){
        dFun[i]=a.substring(a.lastIndexOf(" ")+1,a.length-1);
      });
      dFun.sortByAttr("length",false);
      dFun.each(function(a,i){
        if(a!=""&&a!="function"){//匿名函数排除掉
          html=html.replaceAll(a,"<cd_dfun>"+a+"</cd_dfun>");
        }
      });
    }
    return html;
  }
  var funReg=/(\.)(.*?)(\()/g;
  function _geneFun(html){
    var arr=html.match(funReg);
    if(arr!=null){
      arr.each(function(a,i){
        arr[i]=arr[i].replace(a,a[0]+"<cd_fun>"+a.substring(1,a.length-1)+"</cd_fun>(");
      });
      return html.replaceAll(funReg,arr);
    }
    return html;
  }
  function _geneKey(html){
    _code._key.each(function(a){
      html=html.replaceAll(a,"<cd_key>"+a+"</cd_key>");
    });
    return html;
  }
  function _geneHtmlElement(html){
    return _geneCommon(html,/(&lt;)(.*?)(&gt;)/g,"cd_tag");
  }
  function _geneNumber(html){
    return _geneCommon(html,/(\d+)/g,"cd_num");
  }
  function _geneString(html){
    return _geneCommon(html,/((")(.*?)("))|((')(.*?)('))/g,"cd_str");
  }
  function _geneNote(html){
    return _geneCommon(html,/((\/\/)(.*?)(\n))|((\/\*)((.|\n)*?)(\*\/))/g,"cd_note");
  }
  function _geneHtmlNote(html){
    return _geneCommon(html,/(&lt;!--)((.|\n)*?)(--&gt;)/g,"cd_note");
  }
  function _geneCommon(html,reg,tag){
    var arr=html.match(reg);
    if(arr!=null){
      arr.each(function(a,i){
        arr[i]="<"+tag+">"+a+"</"+tag+">";
      });
      html=html.replaceAll(reg,arr);
    }
    return html;
  }