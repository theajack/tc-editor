"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = initRenderStyle;

function initRenderStyle() {
  return (
    /* css*/
    "\n    /* HTML */\n    .code_editor_view{ color: rgb(0,16,144);}\n    cd_tag,cd_tag * {color: rgb(128,0,82)}\n    cd_str,cd_str * {color: rgb(209,74,71)}\n    cd_note,cd_note * {color:rgb(106,153,85)}\n    cd_attr{color: rgb(0,16,144);}\n    cd_attr_equal{color: #666;}\n    cd_attr_punc{color: rgb(128,0,0);}\n    cd_html_c,cd_html_c cd_str{color: #2e2e2e;}\n    \n    .j-c-dark .code_editor_view {color: rgb(103,205,254);}\n    .j-c-dark cd_tag,.j-c-dark cd_tag * {color: rgb(62,156,214)}\n    .j-c-dark cd_str,.j-c-dark cd_str * {color: rgb(199,141,117)}\n    .j-c-dark cd_attr{color: rgb(156, 220,254);}\n    .j-c-dark cd_attr_equal{color: #ddd;}\n    .j-c-dark cd_attr_punc{color: rgb(128,128,128);}\n    .j-c-dark cd_html_c,.j-c-dark cd_html_c cd_str{color: #d4d4d4;}\n    .j-c-dark cd_note,.j-c-dark cd_note *{color: #6a8a35;}\n\n    /* css */\n    \n    /* JS */\n\n    .j-c-js-punc{color: #666;}\n    .j-c-js-k1{color: #00f;}\n    .j-c-js-k2{color: #af00db;}\n    .j-c-js-k3{color: #267f99;}\n    .j-c-js-cm,.j-c-js-cm *{color:rgb(106,153,85)}\n    .j-c-js-str,.j-c-js-str *{color: #d14a47;}\n    .j-c-js-num{color: #09885a;}\n    .j-c-js-f{color: #b27878;}\n    .j-c-js-reg,.j-c-js-reg *{color: #f00;}\n    \n    .j-c-dark .j-c-js-punc{color: #ddd;}\n    .j-c-dark .j-c-js-k1{color: #569cd6;}\n    .j-c-dark .j-c-js-k2{color: #c586c0;}\n    .j-c-dark .j-c-js-k3{color: #3ac9b0;}\n    .j-c-dark .j-c-js-cm,.j-c-dark .j-c-js-cm *{color: #6a8a35;}\n    .j-c-dark .j-c-js-str,.j-c-dark .j-c-js-str *{color: #ce9178;}\n    .j-c-dark .j-c-js-num{color: #b5cea8;}\n    .j-c-dark .j-c-js-f{color: #dcdcaa;}\n    .j-c-dark .j-c-js-reg,.j-c-dark .j-c-js-reg *{color: #d16969;}"
  );
}