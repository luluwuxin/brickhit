(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/utils/tokenMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '63de4lNRX9EaKE7j9iu116y', 'tokenMgr', __filename);
// script/wx/utils/tokenMgr.js

"use strict";

var key = "__token__";

var token = null;

function getToken() {
    return token;
}

function checkToken() {
    if (!token) return false;
    return true;
}

function setToken(info) {
    token = info;
    console.log('setToken:' + token);
}

module.exports = {
    getToken: getToken,
    checkToken: checkToken,
    setToken: setToken
};

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
        //# sourceMappingURL=tokenMgr.js.map
        