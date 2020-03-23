import CodeMirror from 'codemirror/lib/codemirror';

CodeMirror.defineInitHook((code) => {
    code.on('renderLine', (cm, line, dom) => {
        // console.log(dom.innerHTML);
        console.log(line, dom);
        let cs = cm.display.lineDiv.children;
        if (cs.length > 0) {
            // console.log(cs[cs.length - 1].innerHTML);
        }
        Date.now();
        // console.log(cm.display.lineDiv.children[0].innerText);
        // debugger;
        // let vars = cm.display.lineDiv.querySelectorAll('.cm-variable');
        // if (vars.length > 0) {
        //     for (let i = 0; i < vars.length; i++) {
        //         if (vars[i].innerText) {}
        //     }
        // }
    });
    code.on('change', (cm, a, b) => {
        console.log(cm, a, b);
    });
});