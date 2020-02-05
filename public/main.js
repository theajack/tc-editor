import Editor from '../src';
// import $ from '../tnpm/repository';
// import $ from '../src';
new Editor({
    el: '#app',
    width: 'auto',
    height: 400,
    code: 'var a=1;'
});
new Editor({
    el: '#app2',
    width: 800,
    height: 300,
    code: 'var b=true;',
    tab: '  '
});
