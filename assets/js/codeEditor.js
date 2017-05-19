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
var _ce_btn="ce-btn";
var _def_w=300,_def_h=200;
var Ced={
  init:function(element){
    if(element==undefined){
      J.tag("editor").each(function(item){
        initFrame(item);
      });
      initFunBtn();//未完成
      initCodeMain(J.class("code_editor"));
      
    }else{
      initFrame(element);
      initFunBtn();//未完成
      initCodeMain(element.findClass("code_editor"));
    }
  },
  fix:function(obj){
    
  },
  clearColor:function(obj){
    
  },
  clearCode:function(obj){
    
  },
  resetCode:function(obj){
    
  },
  copy:function(obj){
    
  }
}
function initFrame(item){
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
    item.append(J.new("textarea.code_editor[spellcheck=false]").html(cont));
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
      item.append(J.new("div.code_set_w").append('\
        <img src="assets/images/fix.png" onclick="Ced.fix(this)"/>\
        <img src="assets/images/color.png" onclick="Ced.clearColor(this)"/>\
        <img src="assets/images/clear.png" onclick="Ced.clearCode(this)"/>\
        <img src="assets/images/reset.png" onclick="Ced.resetCode(this)"/>\
        <img src="assets/images/copy.png" onclick="Ced.copy(this)"/>'));
    }
    item.css("min-height",mh+"px");
    if(cont!=""){
      geneViewCode(item.child(2));
    }
  }
}

function initFunBtn(){
  
}

function initCodeMain(item){
  item.on({
    mouseleave:function(){
      //showResult(false);
    },
    keydown:codeChange,
    keyup:function(e){
      if(e.keyCode==13||e.keyCode==9){
        geneViewCode(this);
      }
    },
    input:function(){
      //showResultHtml();
      geneViewCode(this);
    },
    //mousewheel:redefineMouseWhell,
    scroll:function(event){
      getView(this).scrollTo(this.scroll(),null,10).scrollXTo(this.scrollX(),null,10);
    },
    //onclick:moveCursor
  });
  tabEnable(item);
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
}
var ed;
J.ready(function(){
  Ced.init();
});

function tabEnable(obj){
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

function getView(obj,i){
  if(i!=undefined){
    return obj.parent().child(i);
  }
  return obj.parent().findClass("code_editor_view");
}
function codeChange(e){
  if(this.attr("jet-change")=="0"){
    this.attr("jet-change","1");
  }
  if(e.keyCode==13||e.keyCode==9){
    geneViewCode(this);
  }
  //geneViewCode();
}
function geneViewCode(obj){
  //moveCursor();.replaceAll("<","&lt;").replaceAll(">","&gt;")
  var html=obj.val().replaceAll("<","&lt;").replaceAll(">","&gt;")+" ";//为了不让最后一个字符是换行
  html=geneHtmlElement(html);
  html=geneKey(html);
  html=geneFun(html);
  //html=geneDefineFun(html);
  html=geneNumber(html);
  html=geneString(html);
  html=geneNote(html);
  getView(obj,1).html(html); 
  
  var htmlSign=geneSign(obj.val().replaceAll("<","&lt;").replaceAll(">","&gt;")+" ");
  getView(obj,0).html(htmlSign); 
}
  function geneHtmlElement(html){
    var arr=html.match(/(&lt;)(.*?)(&gt;)/g);
    if(arr!=null){
      arr.each(function(a,i){
        arr[i]="<cd_tag>"+a+"</cd_tag>";
      });
      return html.replaceAll(/(&lt;)(.*?)(&gt;)/g,arr);
    }
    return html;
  }
  function geneSign(html){
    _code._sign.each(function(a){
      html=html.replaceAll(a,"<cd_sign>"+(a.has("\\")?a.substring(1):a)+"</cd_sign>");
    });
    return html;
  }
  function geneNumber(html){
    var num=/(\d+)/g;
    var arr=html.match(num);
    if(arr!=null){
      arr.each(function(a,i){
        arr[i]="<cd_num>"+a+"</cd_num>";
      });
      return html.replaceAll(num,arr);
    }
    return html;
  }
  
  function geneDefineFun(html){//js
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
  function geneFun(html){
    var arr=html.match(funReg);
    if(arr!=null){
      arr.each(function(a,i){
        arr[i]=arr[i].replace(a,a[0]+"<cd_fun>"+a.substring(1,a.length-1)+"</cd_fun>(");
      });
      return html.replaceAll(funReg,arr);
    }
    return html;
  }
  function geneKey(html){
    _code._key.each(function(a){
      html=html.replaceAll(a,"<cd_key>"+a+"</cd_key>");
    });
    return html;
  }
  var strReg=/((")(.*?)("))|((')(.*?)('))/g;
  function geneString(html){
    var arr=html.match(strReg);
    if(arr!=null){
      arr.each(function(a,i){
        arr[i]="<cd_str>"+a+"</cd_str>";
      });
      return html.replaceAll(strReg,arr);
    }
    return html;
  }
  var noteReg=/((\/\/)(.*?)(\n))|((\/\/)(.*?)(\n))/g;
  function geneNote(html){
    var arr=html.match(noteReg);
    if(arr!=null){
      arr.each(function(a,i){
        arr[i]="<cd_note>"+a+"</cd_note>";
      });
      html=html.replaceAll(/((\/\/)(.*?)(\n))|((\/\/)(.*?)(\n))/g,arr);
    }
    return html;
  }
  var htmlNoteReg=/((\/\/)(.*?)(\n))|((\/\/)(.*?)(\n))/g;
  var htmlNoteTag="cd_note";
  function geneHtmlNote(html){
    return geneCommon(html,htmlNoteReg,htmlNoteTag);
  }
  function geneCommon(html,reg,tag){
    var arr=html.match(reg);
    if(arr!=null){
      arr.each(function(a,i){
        arr[i]="<"+tag+">"+a+"</"+tag+">";
      });
      html=html.replaceAll(reg,arr);
    }
    return html;
  }