export default function initRenderStyle () {
    return /* css*/`
    /* HTML */
    .code_editor_view{ color: rgb(0,16,144);}
    cd_tag,cd_tag * {color: rgb(128,0,82)}
    cd_str,cd_str * {color: rgb(209,74,71)}
    cd_note,cd_note * {color:rgb(106,153,85)}
    cd_attr{color: rgb(0,16,144);}
    cd_attr_equal{color: #666;}
    cd_attr_punc{color: rgb(128,0,0);}
    cd_html_c,cd_html_c cd_str{color: #2e2e2e;}
    
    .j-c-dark .code_editor_view {color: #9cdcfe;}
    .j-c-dark cd_tag,.j-c-dark cd_tag * {color: rgb(62,156,214)}
    .j-c-dark cd_str,.j-c-dark cd_str * {color: rgb(199,141,117)}
    .j-c-dark cd_attr{color: rgb(156, 220,254);}
    .j-c-dark cd_attr_equal{color: #ddd;}
    .j-c-dark cd_attr_punc{color: rgb(128,128,128);}
    .j-c-dark cd_html_c,.j-c-dark cd_html_c cd_str{color: #d4d4d4;}
    .j-c-dark cd_note,.j-c-dark cd_note *{color: #6a8a35;}

    /* css */
    
    /* JS */

    .j-c-js-punc{color: #666;}
    .j-c-js-k1{color: #00f;}
    .j-c-js-k2{color: #af00db;}
    .j-c-js-k3{color: #267f99;}
    .j-c-js-cm,.j-c-js-cm *{color:rgb(106,153,85)}
    .j-c-js-str,.j-c-js-str *{color: #d14a47;}
    .j-c-js-num{color: #09885a;}
    .j-c-js-f{color: #b27878;}
    .j-c-js-reg,.j-c-js-reg *{color: #f00;}
    
    .j-c-dark .j-c-js-punc{color: #ddd;}
    .j-c-dark .j-c-js-k1{color: #569cd6;}
    .j-c-dark .j-c-js-k2{color: #c586c0;}
    .j-c-dark .j-c-js-k3{color: #3ac9b0;}
    .j-c-dark .j-c-js-cm,.j-c-dark .j-c-js-cm *{color: #6a8a35;}
    .j-c-dark .j-c-js-str,.j-c-dark .j-c-js-str *{color: #ce9178;}
    .j-c-dark .j-c-js-num{color: #b5cea8;}
    .j-c-dark .j-c-js-f{color: #dcdcaa;}
    .j-c-dark .j-c-js-reg,.j-c-dark .j-c-js-reg *{color: #d16969;}`;
}