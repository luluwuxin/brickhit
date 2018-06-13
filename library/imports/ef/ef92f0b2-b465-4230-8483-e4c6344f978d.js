"use strict";
cc._RF.push(module, 'ef92fCytGVCMISD5MY0T5eN', 'report');
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