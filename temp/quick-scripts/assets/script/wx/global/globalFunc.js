(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/global/globalFunc.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '58e553MQ1NJ44AqfwornmdT', 'globalFunc', __filename);
// script/wx/global/globalFunc.js

"use strict";

var globalFunc = {
    getTextext: function getTextext(text) {
        if (!!!text || !!!text["title"] || text.title.length === 0) {
            return "";
        }
        console.log(text);
        var num = text.title.indexOf('#');
        if (num == -1) {
            return text.title;
        }
        var nextNum = text.title.indexOf('#', num + 1);
        if (nextNum == -1) {
            return text.title;
        }
        var beforeStr = text.title.slice(0, num);
        var curStr = text.title.slice(num + 1, nextNum);
        var nextStr = text.title.slice(nextNum + 1);
        console.log(beforeStr, "curStr", curStr, "next", nextStr);
        text.title = beforeStr + text[curStr] + nextStr;
        console.log(text.title);
        return text.title;
    }
};

module.exports = globalFunc;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=globalFunc.js.map
        