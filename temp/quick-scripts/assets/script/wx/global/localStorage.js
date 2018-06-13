(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/global/localStorage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8826fTat0dM+oLEZiEWi508', 'localStorage', __filename);
// script/wx/global/localStorage.js

"use strict";

var localStorage = {
    getLocalStorage: function getLocalStorage(name) {
        var storage = cc.sys.localStorage.getItem(name);
        if (storage) {
            storage = JSON.parse(storage);
        }
        return storage;
    },
    setLocalStorage: function setLocalStorage(name, info) {
        cc.sys.localStorage.setItem(name, JSON.stringify(info));
    }
};

module.exports = localStorage;

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
        //# sourceMappingURL=localStorage.js.map
        