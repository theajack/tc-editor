# [tc-editor](https://github.com/theajack/tc-editor)


<p>
    <a href="https://www.github.com/theajack/tc-editor/stargazers" target="_black">
        <img src="https://img.shields.io/github/stars/theajack/tc-editor?logo=github" alt="stars" />
    </a>
    <a href="https://www.github.com/theajack/tc-editor/network/members" target="_black">
        <img src="https://img.shields.io/github/forks/theajack/tc-editor?logo=github" alt="forks" />
    </a>
    <a href="https://www.npmjs.com/package/tc-editor" target="_black">
        <img src="https://img.shields.io/npm/v/tc-editor?logo=npm" alt="version" />
    </a>
    <a href="https://www.npmjs.com/package/tc-editor" target="_black">
        <img src="https://img.shields.io/npm/dm/tc-editor?color=%23ffca28&logo=npm" alt="downloads" />
    </a>
    <a href="https://www.jsdelivr.com/package/npm/tc-editor" target="_black">
        <img src="https://data.jsdelivr.com/v1/package/npm/tc-editor/badge" alt="jsdelivr" />
    </a>
    <a href="https://github.com/theajack/tc-editor/issues"><img src="https://img.shields.io/github/issues-closed/theajack/tc-editor.svg" alt="issue"></a>
</p>
<p>
    <a href="https://github.com/theajack" target="_black">
        <img src="https://img.shields.io/badge/Author-%20theajack%20-7289da.svg?&logo=github" alt="author" />
    </a>
    <a href="https://www.github.com/theajack/tc-editor/blob/master/LICENSE" target="_black">
        <img src="https://img.shields.io/github/license/theajack/tc-editor?color=%232DCE89&logo=github" alt="license" />
    </a>
    <a href="https://cdn.jsdelivr.net/npm/tc-editor/tc-editor.min.js"><img src="https://img.shields.io/bundlephobia/minzip/tc-editor.svg" alt="Size"></a>
    <a href="https://github.com/theajack/tc-editor/search?l=javascript"><img src="https://img.shields.io/github/languages/top/theajack/tc-editor.svg" alt="TopLang"></a>
    <a href="https://www.github.com/theajack/tc-editor"><img src="https://img.shields.io/librariesio/dependent-repos/npm/tc-editor.svg" alt="Dependent"></a>
    <a href="https://github.com/theajack/tc-editor/blob/master/test/test-report.txt"><img src="https://img.shields.io/badge/test-passed-44BB44" alt="test"></a>
</p>

### 🚀 功能强大，体积小巧，简单易用的代码编辑器

<!--<a href="#64-使用实例大全">快速上手</a>-->

**[文档](https://theajack.gitee.io/tc-editor/) | [更新日志](https://github.com/theajack/tc-editor/blob/master/helper/version.md) | [应用:jui-code](https://theajack.gitee.io/jet/#/code) | [反馈](https://github.com/theajack/tc-editor/issues/new)**

---

[TOC]

---

### 前言

tc-editor 是一款 功能强大，体积小巧（包含图标素材和依赖库共 40kb），简单易用的代码编辑器，一行代码便可以生成一个在线的代码编辑器，支持强大的自定义功能配置，多行代码缩进缩退，向vscode看齐的代码风格。

### 0.快速使用

使用 npm 安装：

```
npm i tc-editor
```

```html
<div id='editor'></div>
```

```js
import TCEditor from 'tc-editor';

new TCEditor({el: '#editor'});

```

使用 script 标签使用会在window上定义 TCEditor 类：

```html
<div id='editor'></div>
<script src="https://cdn.jsdelivr.net/npm/tc-editor/tc-editor.min.js"></script>
<script>
    new TCEditor({el: '#editor'})
</script>
```

<!-- <a href="#64-使用实例大全">更多详细使用示例</a> | <a href="#6-spell-stroke-参数">参数详细介绍</a> -->

### 1.功能

1. 代码上色，向vscode看齐的代码风格
2. 多行缩进缩退、字体缩放等快捷键
3. light 与 dark 模式
4. 一键复制代码
5. 自适应宽高、自定义宽高、全屏编写
6. 强大丰富的 api 与 配置

### 2 详细使用

#### 2.1 参数配置

```js
new TCEditor(config);
```

config 是一个参数配置的json对象，具体属性如下：

|  参数  |  必选  | 默认值 |    类型        | 备注 |
| :----: | :----------------------: | :------: | :---------: | :---------: |
| el  |         是         | -- |    Ele/string/HTMLElement    | 容器 |
| buttons  |      否      | true |    boolean/string/Array    | 功能按钮配置 |
|   fontSize   |      否      | 16 |    number    | 字体大小 |
|  theme   |      否      | 'dark' |    string    | 编辑器主题，可选值为 'normal','dark' |
|  width  |      否      | 300 |    string/number    |     宽      |
|  height  |  否 | 200 |    string/number    |     高      |
| code | 否 |    --    | string | 初始代码 |
| tab | 否 |    '\t'    | string | 缩进的字符串 |
| trim | 否 |    true    | boolean | 是否清空前后的换行符 |
| disabled | 否 |    false    | boolean | 是否启用编辑 |
| fullScreen | 否 |    false    | boolean | 是否全屏显示 |
| lineIndex | 否 |    true    | boolean | 是否显示行序号 |
| onload | 否 |    --    | function | 渲染完成的回调函数，this 指代 TCEditor对象 |
| onsubmit | 否 |    --    | function | submit按钮点击的回调函数，this 指代 TCEditor对象，参数为编辑器中的代码内容 |


注：
1. 如果 el 元素内部有html内容，则 TCEditor 会将其作为 code 渲染，不过 code配置优先级高于 html 内容
2. buttons 为 true 或 'all' 表示启用所有功能按钮，false表示不启用功能按钮，为数组表示选择性启用
3. buttons 为数组时可选值有：`'fontSizeUp' | 'fontSizeDown' | 'fullScreen' | 'fix' | 'changeTheme' | 'clearCode' | 'resetCode' | 'copy' | 'submit'`, 详细含义可以参考 2.2 的api方法说明，其中 submit 按钮仅在含有 onsubmit 参数时才会有效
4. height与width 为auto时表示自适应代码的显示区域大小，其他值直接渲染为编辑器的样式

#### 2.2 api 方法

```js
let editor = new TCEditor(config);
editor[api](args);
```

api 方法说明如下：

|  名称  |  返回值  | 参数 | 备注 |
| :----: | :----: | :----: | :----: |
| clearCode | -- | -- | 清空代码 |
| fix | -- | -- | 修复ios和macos上可能出现的重影问题 |
| resetCode | -- | -- | 重置代码为初始化代码 |
| copy | boolean | -- | 复制代码，返回值表示是否复制成功 |
| changeTheme | string? | string | 切换编辑器主题，可选值为 'normal','dark'，无参数表示来回切换 |
| fullScreen | boolean? | boolean | 切换全屏状态，无参数表示来回切换 |
| disable | boolean? | boolean | 切换禁用状态，无参数表示来回切换 |
| fontSize | number? | number | 获取或设置字体大小 |
| fontSizeUp | -- | number | 增大字体 |
| fontSizeDown | -- | number | 减小字体 |
| submit | -- | -- | 提交代码，用户执行参数配置中的onsubmit |
| code | string? | string? | 获取或设置代码 |

#### 2.3 静态属性和方法

静态属性：

```js
TCEditor.version; // 版本信息
TCEditor.tool; // easy-dom-util 暴露的工具方法
```

`TCEditor.tool` 详情见 [easy-dom-util](https://github.com/theajack/easy-dom)


静态方法：
```js
TCEditor.create(config); // 等价于 new TCEditor(config)
```

### 3 应用例子

[jui-code](https://theajack.gitee.io/jet/#/code)