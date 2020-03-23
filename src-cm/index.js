// import Editor from '../src';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/addon/selection/active-line';

import '../src-cm/hint';
import '../src-cm/lint';
import '../src-cm/fold';
import '../src-cm/mode';
import '../src-cm/keyword';


// import Editor from '../src-cm';
window.CodeMirror = CodeMirror;

// var keyword1 = [ var ,  new ,  const ,  let ,  typeof ,  in ,  function ,  this ,  true ,  false ,  null ,  undefined ,  async ,  delete ,  class ,  extends ]; // var
    
// var keyword2 = [ return ,  for ,  while ,  else if ,  if ,  else ,  switch ,  case ,  default ,  break ,  continue ,  await ,  yield ,  try ,  catch ,  finally ,  throw ,  export ,  import ,  from ]; // return
    
// var keyword3 = [ console ,  window ,  document ,  Date ,  Array ,  Object ,  Boolean ,  Number ,  String ,  alert ,  RegExp ,  Function ,  JSON ,  Date ]; // Date
let code = CodeMirror(document.getElementById('code'), {
    // value: '<script>\nfunction a(){\n\n}\n</script>',
    value: /* html*/`
<div attr="111">aaa</div>
<!--111-->

<script>
window.aa = {a:1}
if(a>10){

}
 console.log({
    a:1,
})
a.function(){

}
console.log
Object.keys();
function myScript(){return 100;}
function a(1){
    /*aa11*/
    // aa
    'aaa'
    /asa/i
}
var a={
    aaaa: 1,
    b: 2,
    cccc(){},
    dddd : function(){

    },
    ffff:()=>
    {

    }
}
</script>`,
    mode: 'htmlmixed',
    theme: 'te-dark',
    // extraKeys: {'Tab': 'autocomplete'},
    lineNumbers: true,
    styleActiveLine: true,
    extraKeys: {
        'Tab': function (cm) {
            var spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
            cm.replaceSelection(spaces);
        },
        'Ctrl-Q': function (cm) { cm.foldCode(cm.getCursor()); },
        'F11': function (cm) {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'));
        },
        'Esc': function (cm) {
            if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false);
        }
    },
    foldGutter: true,
    // lineWrapping: true,
    tabSize: 4,
    lint: true,
    foldOptions: {
        widget: () => {
            let span = document.createElement('span');
            span.innerText = '…';
            return span;
        },
    },
    hintOptions: {
        closeOnUnfocus: false,
    },
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers']
});

// code.foldCode(CodeMirror.Pos(4, 0));


code.on('keyup', function (cm, event) {
    let kc = event.keyCode;
    if (
        
        !cm.state.completionActive &&
        (
            (event.shiftKey && kc === 188) ||
            !event.ctrlKey && !event.shiftKey &&
            (
                (kc >= 65 && kc <= 90 ) ||
                kc == 52 ||
                kc == 219 ||
                kc == 190
            )
        )
    )
    {
        CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
    }
    
});
window.code = code;


// setValue
// code.on('cursorActivity', (cm, event) => {
//     // CodeMirror.commands.autocomplete(code, null, {hint: CodeMirror.hint.javascript});
//     // console.log(args);
//     // // console.log('cursorActivity', code.getCursor());
//     // console.log(cm, event);
//     // console.log(cm.state);
//     // code.showHint();
//     // CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
//     // CodeMirror.commands.autocomplete(code, null, {hint: CodeMirror.hint.anyword});
// });
// code.on('blur', (...args) => {
//     console.log('blur', args);
// });
// code.on('update', (...args) => {
//     console.log('update', args);
// });
// import Editor from '../npm';
// import Editor from '../npm';
// import $ from '../tnpm/repository';
// import $ from '../src';
// var a = new Editor({
//     el: '#app',
//     width: 'auto',
//     height: 400,
//     // code: '\nvar a=1;1111111111111111111111111111111111111111111',
//     // lineIndex: false,
//     // buttons: false,
//     fontSize: 20,
//     theme: 'normal',
//     trim: false,
//     // disabled: true,
//     tab: '    ',
//     onload () {
//         console.log(this);
//     },
//     // fullScreen: true,
//     onsubmit (code) {
//         console.log(this, code);
//     }
// });
// window.a = a;

// new Editor({
//     el: document.getElementById('app2'),
//     theme: 'dark',
//     buttons: false,
//     code: `<!--script 标签引用-->
// <div
// id='editor'>111</div>
// <script src="https://www.theajack.com/tc-editor/dist/tc-editor.latest.min.js"></script>
// <script>
//     export default {}
//     new TCEditor({el: '#editor'});
//     1+1+1
//     a.alert=
//     (1,2,3,4,var,new,aa,'','','','')
//     this.$alert()
//     this.$message()

// </script>`,
//     height: 'auto',
//     width: '100%',
//     language: ['html']
//     // width: 800,
//     // height: 300,
//     // code: 'var b=true;',
//     // tab: '  '
// });
