(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/config/report.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ef92fCytGVCMISD5MY0T5eN', 'report', __filename);
// script/wx/config/report.js

"use strict";

/**
 * 脚本错误信息上报 
 */
module.exports = {
  loginError: {
    event: "login_error",
    wx_error: "wx_login_error",
    server_error: "server_login_error"
  },
  vipError: {
    event: "vip_info",
    vip_error: "vip_error"
  }
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
        //# sourceMappingURL=report.js.map
        