
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/addon/lint/css-lint';
import 'codemirror/addon/lint/html-lint';
import 'codemirror/addon/lint/lint.css';
import '../src-cm/htmlmixed-lint.js';
import jshint from 'jshint';
import csslint from 'csslint';

window.JSHINT = jshint.JSHINT;
window.CSSLint = csslint.CSSLint;