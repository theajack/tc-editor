import Editor from '../src';
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

new Editor({
    el: document.getElementById('app2'),
    theme: 'dark',
    buttons: false,
    code: `<!--script 标签引用-->
<div 
id='editor'>111</div>
<script src="https://www.theajack.com/tc-editor/dist/tc-editor.latest.min.js"></script>
<script>
    export default {}
    new TCEditor({el: '#editor'});
    1+1+1
    a.alert=
    (1,2,3,4,var,new,aa,'','','','')
    this.$alert()
    this.$message()

</script>`,
    height: 'auto',
    width: '100%',
    language: ['html']
    // width: 800,
    // height: 300,
    // code: 'var b=true;',
    // tab: '  '
});
