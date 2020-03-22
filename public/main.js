// import Editor from '../src';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/addon/selection/active-line';

import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/javascript-hint';

import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/foldcode.js';

import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/fold/foldgutter.css';
// import 'codemirror/addon/edit/closetag.js';

import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/addon/lint/css-lint';
import 'codemirror/addon/lint/html-lint';
import 'codemirror/addon/lint/lint.css';
import jshint from 'jshint';
import csslint from 'csslint';

import 'codemirror/addon/fold/foldgutter.css';

// import 'codemirror/theme/monokai.css';
import './codemirror.css';

window.JSHINT = jshint.JSHINT;
window.CSSLint = csslint.CSSLint;

// import Editor from '../src-cm';
window.CodeMirror = CodeMirror;
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
    Object.keys();
    function myScript(){return 100;}
    function a(1){
        /*aa11*/
        // aa
        'aaa'
        /a\sa/i
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
    lineWrapping: true,
    lint: true,
    foldOptions: {
        widget: () => {
            let span = document.createElement('span');
            span.innerText = '…';
            return span;
        },
    },
    hintOptions: null,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers']
});
code.foldCode(CodeMirror.Pos(2, 0));
// window.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
//     mode: mime,
//     indentWithTabs: true,
//     smartIndent: true,
//     styleActiveLine: true,
//     lineNumbers: true,
//     lineWrapping: true,
//     matchBrackets: true,
//     autofocus: true,
//     extraKeys: {'Ctrl-Space': 'autocomplete'},
//     hintOptions: {
//         tables: result.data
//     }
// });
code.on('keyup', function (cm, event) {
    console.log(event);
    console.log('up', code.getCursor());
    if (
        
        !cm.state.completionActive &&
        (
            (event.keyCode >= 65 && event.keyCode <= 90 ) ||
            event.keyCode == 52 ||
            event.keyCode == 219 ||
            event.keyCode == 190
        )
    )
    {
        CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
    }
    // CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
    // 所有的字母和'$','{','.'在键按下之后都将触发自动完成
    // if (!cm.state.completionActive &&
    //         ((event.keyCode >= 65 && event.keyCode <= 90 ) || event.keyCode == 52 || event.keyCode == 219 || event.keyCode == 190)) {
    //     CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
    // }
    // if (cm.state.completionActive  && event.keyCode === 13)
    //     code.closeHint();
    
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
// code.on('beforeChange', (...args) => {
//     console.log('beforeChange', args);
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
