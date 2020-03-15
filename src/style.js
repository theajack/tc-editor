
import $ from 'easy-dom-util';
import initRenderStyle from './render/style';
$.reportStyle({
    func: initStyle,
    usePool: true,
    id: 'JCODE'
});
$.reportStyle({
    func: initRenderStyle,
    usePool: true,
    id: 'JCODE'
});
$.initStylePool();
function initStyle () {
    return /* css*/` 
    .j-code {
        width: 300px;
        height: 200px;
        border: 1px solid #ddd;
        display: inline-block;
        position: relative;
        white-space: pre;
        border-radius: 5px;
        overflow: hidden;
        font-size: 16px;
        line-height: 20px;
        min-width: 245px;
        text-align: left;
        text-indent: 0;
        background-color: rgba(240,240,240,.95);
    }
    .j-code,.j-code *{
        box-sizing:border-box;
    }
    .j-code *::-webkit-scrollbar {
        width:5px;
        cursor: pointer;
        height: 5px;
    }
    .j-code *::-webkit-scrollbar-button    {
        display: none;
    }
    .j-code *::-webkit-scrollbar-track     {
        display: none;
    }
    .j-code *::-webkit-scrollbar-track-piece {
        background-color:#ddd;
    }
    .j-code.j-c-dark *::-webkit-scrollbar-track-piece {
        background-color:#ddd;
    }
    .j-code *::-webkit-scrollbar-thumb{
        background-color:#ccc;
        border-radius:5px;
        cursor: pointer;
    }
    .j-code *::-webkit-scrollbar-thumb:hover{
        background-color:#bbb;
        cursor: pointer;
    }
    .j-code.j-c-dark *::-webkit-scrollbar-track-piece {
        background-color:#666;
    }
    .j-code.j-c-dark *::-webkit-scrollbar-thumb{
        background-color:#999;
    }
    
    .j-code.j-c-dark {
        background-color: rgba(20,20,20,.95);
        border: 1px solid rgba(255,255,255,.5);
    }
    
    
    .j_hidden {
        overflow: hidden!important
    }
    
    .code_editor,.code_editor_view {
        width: 100%;
        background-color: transparent;
        font-size: inherit;
        padding: 10px;
        line-height: inherit;
        font-family: Consolas, 'Courier New', monospace;
        overflow: auto;
        position: absolute;
        white-space: pre;
        border: 0;
        outline: 0;
        -webkit-appearance: none;
        word-break: break-all;
        word-wrap: normal;
        margin: 0;
        min-width: 245px;
        padding-left:35px;
    }
    
    .code_line_w{
        min-height: 100%;
        position: absolute;
        left: 0;
        top: 0px;
        padding-top:10px;
        height: 100%;
        text-align: center;
        width: 30px;
        font-size: 12px;
        line-height: 20px;
        border-right: 1px solid #ccc;
        color: #aaa;
        background-color: #eee;
    }
    .j-c-dark .code_line_w{
        background-color: #444;
        color: #ddd;
        border-right: 1px solid #666;
    }
    .j-code[buttons] .code_line_w{
        padding-top: 40px;
    }
    .code_line_w div{
        font-weight: normal;
        transition: all .3s ease;
        position:relative;
        left:0;
        -webkit-transition: all .3s ease;
    }
    .code_line_w div.j-active{
        color: #444;
        left: -3px;
        font-weight: bold;
    }
    .j-c-dark .code_line_w div.j-active{
        color: #fff;
    }
    .code_active_line{
        width: 100%;
        height: 20px;
        position: absolute;
        background-color: #ddd;
        top: 11px;
        opacity:0;
        transform: translate(0,0);
        -webkit-transform: translate(0,0);
        transition: opacity .3s ease;
        -webkit-transition: opacity .3s ease;
    }
    .j-c-dark .code_active_line{
        background-color: #333;
    }
    .code_set_w {
        width: 100%;
        height: 30px;
        position: absolute;
        top: 0;
        border-radius: 5px 5px 0 0;
        background-color: #bbb;
        border-bottom: 1px solid #ddd;
        text-align: right;
        padding-right: 5px;
        white-space: normal;
        padding-top: 1px;
        z-index: 1;
    }
    
    .code_set_w img {
        margin: 5px 3px;
        cursor: pointer;
        color: #444;
        font-size: 18px;
        vertical-align: text-top;
        display: inline-block;
        width: 15px;
        height: 15px;
    }
    
    .j-c-dark .code_set_w{
        border-bottom: 1px solid #aaa;
        background-color: #666;
    }
    
    .code_editor_view {
        background-color: transparent;
    }
    
    
    .code_editor {
        position: relative;
        color: transparent;
        border-color: transparent;
        transition: background-color .3s;
        -o-transition: background-color .3s;
        -moz-transition: background-color .3s;
        -webkit-transition: background-color .3s;
        resize: none;
        caret-color: #444;
    }
    .code_editor[disabled]{
        cursor: no-drop;
    }
    .j-c-dark .code_editor{
        caret-color: #ddd;
    }
    
    .code_editor.bg {    background-color: rgba(20,20,20,.9)}
    .j-c-dark .j-c-editor-cline{
        border-color: #444;
        background-color: rgba(100,100,100,.1);
    }
    .j-c-dark .j-c-editor-cbtn{
        background-color: rgba(68,68,68,.9);
        border-color:#fff;
        box-shadow:0px 0px 10px 2px #ccc;
    }
    .j-c-dark .j-c-ed-lines div{
        background-color:#444;
    }
    .j-code.j_full {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%!important;
        height: 100%!important;
        max-width: 100%!important;
        max-height: 100%!important;
        border: 0;
        border-radius: 0;
        z-index: 1000;
    }
    .j-code.j_full .code_editor, .j-code.j_full .code_editor_view{
        min-height: 100%!important;
        width: 100%!important;
    }
    .j-code.j_full .code_set_w{
        border: 0;
        border-radius: 0;
    }
    .j-code.j_full .code_line_w{
        min-height: 100%;
        height: auto;
    }
    #j_c_copy{
        height:10px;position:fixed;top:-100px;white-space:pre;opacity:0;
    }`;
}