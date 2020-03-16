"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initButtons = initButtons;
exports.buttons = void 0;

var _easyDomUtil = _interopRequireDefault(require("easy-dom-util"));

var _activeLine = require("./activeLine");

var _line = require("./line");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var buttons = {
  fontSizeUp: ['放大字体', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOgSURBVEhLtZdLSFRhGIZzytIkdWFGJF0GhaQiMqJFYhCShEhitqhNYBERohG6kCjoIhFRhEQuuywqRCrDcBUqREQWia0SdUyJEHWsHBuby5meb+bj5OgMc4ZmXnj5/v+7vO9/Lp6mZZEQCARsMNswjGq/3//S5/O52QfB+gP5epjPNlVH/g8I2RDcidkdOAadcBKzr3CQ9QicgFPsZ4jt9JfDdJWIH5imwdMIjiM4S+wnXlHhQpgH82EJrKPWBeVgf+BtZnNUyjoYWolYE2YGIhOsz8USop5K32Fm3uvcE/a5WrYGBo8z6CWOIViqaRNyMJgN0zRlArNNzL6iFiC2sLd22+nPwvAzQ3MMVWs6DORLqLd6vd5q+pdr2gT1AjQG4Rw9B+lJ0VJ00FyLqBt2OhyOJVckQLhGDgZvaCoMYoROI/V5+MDSVTMgb+pvmmsRsElOhKCd01cQK6nfhXK4DvqqYAXcRc28evZFaMlLOcQ69rNmWJ6NGMttDN4iEWR/FpFpFZuXPqJf97PMtJIy7xD9W8jLn5lT1pqODhonEZHnewoh84rZF8F66uepP4Vu1j3kGiVHLKNvRVAEsN9O/iccdblc6zUdHTRegh4RXyi0EIieoC5/MhGfsQCNM9TlGT9HZ7WmowPRdTzLUQZ/sT6gaRN69YcQ7KDnZKTDUc+j1kePh3iMnuCdiwma66DgIyJFmjaBUBr5tTBDUybI5WJ4nx55V545nc4sLcWGCDLUIsNqXsUyW8sRQd3m8Xj2MfdY5ohvmCvUsnUwlMnwZYyniB602sjVEIuJBTCP9WbM9siHhJ57cFhNu6jvUKn4gUYKouUIyVs8raLfYR/LHuJbDjYieaJ8Yh3a85Cw5IsWNzj9GoRKiRcQfQRfiyk5MW+Ht1hXUt+vNRe8zn4v+difSytASF6sDUQ73AjDXh4xw/Sb3AHiJ9gs/VpOHjDJxLSfAwWBsaCTZbG2JAcYp2N0U9xC1iGwHSAc1bbkwO1252P0JWT5D+TGuRt13d3dEb+ICQFX3oCRTz0X4ge1i3CVtiYWCOdydb1qFgYOJG/9VZaJ+VW6GJiXYT4TsgsHxvLPaQNLa9/xeIBoKgbXotxy+ehMcrgj2p5YoJ+D8YuQ1VJQk7fdru2JBcJbubp3QadFwFg+NM3amnjwj8luzOUzGwZM5efTgLYlBzzPbfi0Qfmh6IPyKwZf34i2JA+YZ3Ch8l+jXig/BocNw2j6CzDK/h78B3eqAAAAAElFTkSuQmCC'],
  fontSizeDown: ['缩小字体', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKqSURBVEhLtZVfaI1xHMY5wppxssi/hkLUysjf5oqrKbtQI+4OqSnFjYkbK8qFW4mbKZFc6diNcsXNlKZdoDCTaa3EQpOinff4PHufHVtn5905x/s+9fT+fs/v+zzP+57Oec+sUsjn8zVBEBzM5XJZ+It9nusYfMoyw9lSj8YDAtcRfg2OqkxgPQKH4RdL0oT7zO+ytXoQcpzM7w5+yf4s3ANXIaXhctbbYTvrJ5oT2Hc6onJgvuAcFWfgHB+VBJ4WbvCtTFy7uKR8VB4IaLN5iHWT5bKAbQm+Z/LjvWh5ZjA/F+MniC/YZ7ki4FuDX9+DP6w3Wo4Ggyd0t5iylqoC/svOuWIpGgy+lwFkLOlTqOWGWmArPFCKzKVt0QPsVgh5zy1FQ8MCxv2WFLLBciSY22lLwUPxAJfZlkuDwWGHHLWkm6lj3yYtiswttkWebcohr89SNAg4Z8MdS1WBnA7n3LAUDQwLGNY38jfrzZYrAr56/IMqZt1seWYwfNJ3q7fVSstlAds8fFn7uyyXD0zXbX5H+V7LkWCukfnH8gG9Qut8VBkIuRRmjN9AN5dDhDdwrYUp1vPhCqhX5W045tm7aIscUx0IaCbooQInwH4QvoYDMGdZ+jdfr9r+/+AGGuFpQu/BF7Af9sEH6J1wB52r2b9SOfszcJntyYOyJsp/+Mm/cjnvo2RBsX5KIyqeAPtu9AaPJAN6UhTdCiv/Ae0D5eX/pqsBPWspGv+4JwNtlPLCqzgRUFL4KU4GOt1Bu8fiBx1pSvrDumJQfsqj8YPwVvdMC86PeDR+8NQ33VMEzn5SvtWj8YLghXT0hlXTQmc1Ho8XlK/n6YbCnmJwfsyj8YP8LZR/DKumAv2Rx5IBHZso6QnrpqDXI8mBj1V/pfqz6YGf4ZsgCA7/BV8WPydhVVSVAAAAAElFTkSuQmCC'],
  fullScreen: ['全屏显示', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIFSURBVEhLrZYxSxxRFEZ3wQ0pRE0iaiESIWgTwS39BVYWIWwhpBNiaZMmP0BJetOlVwiymBQqaLkgQrpICJgtrCwCqWIhzGzOnfetYSEz+968OfB4M3fvPd/OMI5bi6XX6z1MkuQLuzf072i8PGmaLiG6k9ML+r9rvDx4GnYFrMRph0NrV+Px4GuZ0KmLoe9KY9XAbV9B+kf+XCoNxjeBcI+VOn0+lQVzpY+ReT/ZlQTjeYTo2Cn9iA7GMYPk1On8iQpmfgTBZ6cqhr6frPs/t9jgltMUQ8ghz8C87SrFBTO8K08u9JwR+sT62Rc5v1H9OpOUAdGbzJ4D8g49U2rP4PwV9VvWiUrh4J5E8M3FDEL9KyGzah2A+gotT3VaDI11Bl4gfM/xO47XrM7epHZhYX04P6f+LBuMAdcosn2n/Qe1D/Y5IWOsVdYWZXvgxrPBYWjQLr+h0j0mIaDN/l+Y21BrOIg7LOOjShl47Y1U+Brk8wO1hyNHn9eq2Qv/yJXyoeeErZ6JQnEKB6Jf3L6X7L5vpG1pwpEjGEJ/sM1JE47ThEFolzvTlKIccnmjK13WeHmczg9CL7nS5xqNQ86hEGpvpAWNxSNvIYSSmW5qpBrkHgrhvwl/y+EDjcbhtP7wBdp8gWmNl0e+IAhe13h5TMJV2O/hfe1F6xPLfnn4/T/NpVb7C5lEFoLauD3OAAAAAElFTkSuQmCC'],
  changeTheme: ['切换主题', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAeCAYAAABAFGxuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOuSURBVFhHvZfbSxVRFMZPWBFiKWkRdiWqtx6iDIsi6iHpQplSRmAaPdRDRQT9BYFFkOaL9GBU2pNCBEUY1UMXCFKiiBQ1iqwH6WqYt/Sc02/tvZwcZ/JyZo4ffMxe37f2WuvMmTlnJpIIYrHYUlgYjUZvwFb4Gw4pe2AbrCWnKB6PL4PTdGu4kMI0yaXZJfgCxtAmDPIb4WWWm2CKlg0GBsqj6B04YLoEADUGYQM1d2n5yYPN2RSpgkNa1wX0DvgIflfJAdpP+BC+V8kDvGp6LNJ2EwMbdrOxXWt4gCefeqXmrid+pZZ4bWi54hEuJ75nHS/wZPD9kjsuKHqIDb/sVi/wBsnZrukGxCfVjrM+rrIB0lr29FrXC7x+DqWa7g+KHiFxzGsJf4i8PN1iQHxCbc9gxHJGe9T2BX6UvKO6xQ2MjfjdmmtA3A5fwj6VDIjvk7+CZSrHdcRvrGO8ZtFYpsIlxLeNMQ7IG2DfNh3HAj0No9GmmKQYvMoyS3w27CV2XeTEnfAp9Pvau9CfwU8aO0CT37pm6Lkx0ORazTBDCWh8yloWJHSizVXbAK1c7SDoom4BxzSYQc1Ko44A/lnTkPV0El5b2YL4CwdztobhV2SyoMZNLWfAEPPRvqptQNzGId1cnFb6B0z5KqvkrBGmcdxJ/MO6iYMaNTqTAVIWmmswAf3y5ExUaewB3gf4FsotHRg6RL4MRfM5xBXWcQO9TAbzXKDJBP16odzpLSp5gHdNBhvU2AHaOyh3TihnKgHUeQYjrpTTzDKF40Hib9aZOtCzXgb7rLEI8tsy+m6st+6U4ro0vqKBGYyzlKkzGSDXWXdKcUHujlwNDBiuXL/KWRwLiD23czJBP9rGNssZmUng/NcJiOXil5+JwA+Hw6BWP/R9thsJcir0yzK/KadVDxU06YZl1M+Bq+EauAEeQD8Hb8En8Dm8i17Mthk6lv0Th01SLCzQqE8G0BaJgyJbKPbfBzo/kC//DPKE0aGSA7THWjo4GO4wBce9rsiRu3cfywVQnsmyYQm6/PkbsG5Fm6elg4NixRT9o/U9wJPbplDTXUA/pmkGxEVqhQNq5tPf92UEXR6tCzTVBexSm2VBboNa4YHmiylcDaPaxwGSvAntYZmuuZlQXmI+2gwL4m70HFMwbFB4Bw0aoN+114T+ADqvb6PB/hItlRzQYCsDXIQtcMy3nmGQJ2d2lZZILmg0G8qPpdyF56G8rdcyh/yn1rGuEQ3/DFyo2yaJSOQv890x9+fnG9MAAAAASUVORK5CYII='],
  clearCode: ['清除代码', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIOSURBVEhL7Zc9aFNRGIazpdGxU0EQQagU689YJweXVgfnipQWFwdFhMxiqQhdXITiIkKwOreQOiQlBU1Rd4dMuovJTW7S+5Pc9vnO/fKjt5o2XnG5D7ycnPd853vPPTeUNHVUXNed9n3/aafTefY7sX5Ty+PBcZxz7Xb76/4QqHHQbd12PIIgSKOT9Dkh0vk8T/QJbaPiH1RGj6nPiLo9RNo+SqVSSXNVT9i4y6k/DOg9KuG/Q1tDJDVF3SPq9viI/7bVap3WuD4s3uFk/xQyNhnGNDKEE+WQ8J2CH3FKeza40YDxrkaG8E7OsnADrVH4QsY4RC/RSwn0PO8KOWc0sg/XIN9el0IfeTFKnjSrMVEIviTB8j7ihr73NSYK6xLshKUhXM0+V1bHr8vnLsxtVBv0qNtDVdQ3FWofaEwU1iPBAl4WLenUQPPnaO6Xw2zwHmcYG2r1wBsp+BYh13RqwHvEX7RJnRp4lznLssb5WAudPqMGLxJ8XacGQlZ42os6NeC9aTabpxgttXokwT/BehJsSIKFJFhIggcZNXiB4FmdGmi+TPB5nRrw1m3bnvgfwa/xJqg/XjCbLlMQ+QWC9xmVdWrgIF/wCuxRx9R94z+OPKOvVg+8hxoThSYXDtsUB/xAuKcxUQjOcF15rY0NHqZK7ymNORwK5Fu5igps2EGlv9AOfV6RfVXbK6nUARxpSe8JYAMtAAAAAElFTkSuQmCC'],
  resetCode: ['重置代码', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALwSURBVEhLtZdNbExhFIZbU1Xxk0Z3xEQTFSGk8RuprRULC+3CRkKiZSNBTGPnL13YCInubCyoCBWJkCJEBAsbi8ZC/SU0UemING3QmfGc775zzXXvTOdOZ57kzfd957znnG/Mz626OGSz2TZ0LJfLPclkMmk0jb6jR8RTaKWss4chjTTcp2HTrEUhbzzDfwDNV4v4UNxBo6fqGwvqXrBsV6vyoeggxROuS4VQP8nlj6jlzGA+qtpIaGjv7zs0jEYI/fAy0dAvpdb/oPAsCf9DwX4vsYxqAhB+Tv4Q2oCWEGpibUGbUA/5om8L+f0a4YH5N7JP5hmSu1hH5fUhNkaum22DyiIhn8BnF//kCgsglmZpl9UNfuClXDKrrQ+xzzTrkL0s8K+l7o1a+BC7x1LvTBwue+Ew5CZostUZY0LdKupDr5z4zrzhhGIhKJxC/Xi2oNjfS2r2UB/4V+R8yyXZd3qh0vg3jQmD/LfS4JymV6vdarNikWD8hqcHLVCvWFDXpVaFdFqiTYcQDB0iv0Y9KoL65fT5qpYOzqctsZTNT8UcnI0+cpX/3graJegV+H5zvmqDF7P5oJgF37PsVl1VoOeg192D80270Rw2b/MBlqT8VUN9fewi+cQQOkcs4QJVht7/f7Kv2Suutw+APFWH/s0MGnYTBecLStcOXpQ90wMPHWLdStcOZl7SPIddgsHrla4NzFmNAs9q5r5i8DxZosGXRAt1jAV1cxliT6MADD0sSzR4NlI4ggbYNypcFvgbqOu3QYUQs9+IZtnCcKsdmPw/CNgPEmtVuiTYk7psCHp0yRaG5DYKJ+X1IfaRpRetQIHvu53tYiiFL/QMNohfkT0aipdhCnzhCyE3jh6ii6hP62M0LksIcvfpu0gjimMmzLdVNyvoc4d+LWo9M9Q0UXQKTXkt4mF16DxDK3vCUWi/PNfRL/UsCb4/6C7b+P+LiIILrEPHaTqAXqIvaAyNotcMukH+JGs78v6SLEpd3V+6zXjkAInoGgAAAABJRU5ErkJggg=='],
  copy: ['复制代码', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFKSURBVEhL7Za7SgNBGEa38wl8B0FEghdQwfewsNAiKILaCTaWNhY+gQ8kxNZKxEDwEhRZjNm7nsUPiTgmM8PazYGPYYbZ7+ySFH9kIkmSmaqq9i1zQI6yLFvV437EcTxdFMV1WZaVTfI853rxTHrI11XjDm+/+OEA4iHSQ17ihe0r8jVVuYF46avSDqTvZIfcat9HvqI6e1y/WOI9cqej+uwR+bIq7WhCXMP+HvmCaifjIR5I3NXRN/z+vTRNW6oej4c4IW3+XA86+gHyJ+Tzqv8bV3EN0lPkJ6xXrJ2RXJIu8ht6Z6Uw4yOmfEj5GWub7I5ki/Nz3dmWwoyPeBLIK8QbUpj5DzHSIP5NEDdBEBsJ4iYIYiNB3AS2Yqe52hbEm1KYYTCb093GQJrxQePnbC5MMbRdcDlmZBkwG7/5hufrmbtPjlUvougTzebgrLsTaLEAAAAASUVORK5CYII='],
  submit: ['提交代码', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHkSURBVEhL7ZQ9LENRGIabDgbx1wWLMAiLVCwWExKzMBro0DBLJGwSu10MRoPNJmHCgviJxSYkpibcaEj/6zm9r1M0FeXcBU/y5es933u+957v3tvQP7+GYrEYJloKhUJHKpXqJQ8QnSoHQy6XmyXOiFvC4wZKYByTxC00bsrn81vysRhzalOSuYX+7Rjs+1ZlWDtPp9NRydzCaVoxOJaXxdxIMplsk8wtnudFMDiUl4W1HTN6ydxC/3qe6Z5vVYa13UQi0SiZezKZzKa8LJz0gNQsiXuy2eyKb1UG0wvzvCVxDwbT8rKwdotptyTuoXkUk6T8SnCdYX1YEveYtxSTU/lZWJuTJBh4W9fkZeFZr6kcDBiMy8vCSc9IDZLUBuNrpOkouV9LFVAz/0zXvp0P1898ToOSfB32htkcJ65eGzHKHW5iRBILaxtG8xb0iyrXBs1W1eMdNMwTC5IZ3ZhKFupHpDpJaoMxzdOg4LeqhFrc6MgnWirBtfl0hkpNvgtNYow3p54f8aht67eFCaxr+8+g0SQ38Ki+n4LuntSlrT/HPEfiyW9fHSawrC3uwHiCE1UbuzntDSkiuVtoPuPbVGJqkgUDBtPEJRN4IN8x3iPyksrBYv6piD6ih8MGM94/Qij0AhsuMvn6QO+1AAAAAElFTkSuQmCC']
};
exports.buttons = buttons;

function initButtons() {
  var _this = this;

  var item = this.el;
  var mh = 45;

  if (this.config.buttons !== false) {
    var pl = 30;

    _line.setLinePT.call(this, pl);

    _activeLine.setActiveLineDefTop.call(this, pl);

    pl += 10;
    this.els.bottomView.style('padding-top', pl + 'px');
    this.els.topView.style('padding-top', pl + 'px');
    this.els.codearea.style('padding-top', pl + 'px');
    mh += pl;
    var btn = this.config.buttons;
    var arr = [];

    if (btn === 'all' || btn === true) {
      // 全部按钮都要
      for (var attr in buttons) {
        if (attr !== 'submit' || this.config.onsubmit) {
          arr.push(createButton(attr, buttons[attr], this));
        }
      }
    } else {
      btn.forEach(function (item) {
        if (!buttons[item]) {
          throw new Error('buttons 名称有误：' + item);
        }

        arr.push(createButton(item, buttons[item], _this));
      });
    }

    item.append(_easyDomUtil["default"].create('div.code_set_w').append(arr));
  } else {
    _line.setLinePT.call(this, 0);

    _activeLine.setActiveLineDefTop.call(this, 0);
  }

  item.style('min-height', mh + 'px');
}

function createButton(name, btnInfo, editor) {
  return _easyDomUtil["default"].create('img').attr('title', btnInfo[0]).src(btnInfo[1]).click(function () {
    if (name === 'clearCode') {
      if (window.confirm('是否确认清空代码(该操作不可撤销)？')) {
        editor[name]();
      }
    } else if (name === 'resetCode') {
      if (window.confirm('是否确认重置代码(该操作不可撤销)？')) {
        editor[name]();
      }
    } else {
      editor[name]();
    }
  });
}