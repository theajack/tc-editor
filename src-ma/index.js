// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
// import 'monaco-editor/esm/vs/basic-languages/html/html.contribution';
// import 'monaco-editor/esm/vs/basic-languages/css/css.contribution';
// import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main';


monaco.editor.defineTheme('myCustomTheme', {
    base: 'vs-dark', // can also be vs-dark or hc-black
    inherit: true, // can also be false to completely replace the builtin rules
    rules: [
        {token: 'comment', foreground: 'ffa500', fontStyle: 'italic underline'},
        {token: 'comment.js', foreground: '008800', fontStyle: 'bold'},
        {token: 'comment.css', foreground: '0000ff'}, // will inherit fontStyle from `comment` above
        {token: 'keyword', foreground: '0000ff'} // will inherit fontStyle from `comment` above
    ]
});
monaco.editor.create(document.getElementById('code'), {
    value: getCode (),
    language: 'text/html',
    theme: 'myCustomTheme'
});

function getCode () {
    return `<html><!-- // !!! Tokens can be inspected using F1 > Developer: Inspect Tokens !!! -->\n<head>\n	<!-- HTML comment -->\n	<style type="text/css">\n		/* CSS comment */\n	</style>\n	<script type="javascript">\n		// JavaScript comment\n	</script>\n</head>\n<body></body>\n</html>`;
}
// monacoInstance.dispose();// 使用完成销毁实例

