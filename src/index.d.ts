import {Ele, ToolStatic} from 'easy-dom-util';

declare type buttonType = 'fontSizeUp' | 'fontSizeDown' | 'fullScreen' | 'changeTheme' | 'clearCode' | 'resetCode' | 'copy' | 'submit';
declare type themeType = 'normal' | 'dark';

declare interface configStatic {
    el: Ele|string|HTMLElement;
    buttons?: boolean|string|Array<buttonType>;
    fontSize?: number;
    theme?: themeType;
    width?: string|number;
    height?: string|number;
    code?: string;
    tab?: string;
    trim?: boolean;
    disabled?: boolean;
    fullScreen?: boolean;
    lineIndex?: boolean;
    onload?: (this: Editor)=>{};
    onsubmit?: (this: Editor, code: string)=>{};
}

declare interface elsStatic {
    bottomView: Ele;
    topView: Ele;
    codearea: Ele;
    line: Ele;
    activeLine: Ele;
}

export default class Editor {
    constructor(config: configStatic);
    static versiom: string;
    static tool: ToolStatic;
    static create(config: configStatic): Editor;
    el: Ele;
    config: configStatic;
    els: elsStatic;
    fix(): void;
    clearCode(): void;
    resetCode(): void;
    copy(): boolean;
    changeTheme(theme?: themeType): changeTheme;
    fullScreen(fullScreen?: boolean): boolean;
    disable(fullScreen?: boolean): boolean;
    fontSize(size?: number): number;
    fontSizeUp(): number;
    fontSizeDown(): number;
    submit(): void;
    code(code?: string): void|string; 
}
