(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/login/login.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2eea51uPQ9NAYSwHZgWNPzS', 'login', __filename);
// script/wx/login/login.js

'use strict';

var urls = require('config').urls;
var config = require('config');
var util = require('../utils/util');
var userOperate = require('../userOperate/userOperate');
userOperate = new userOperate();
// 获取用户信息
var getUseInfo = function getUseInfo() {
  if (cc.sys.platform == cc.sys.WECHAT_GAME) {
    wx.getUserInfo({
      success: function success(res) {
        console.log(res);
        config.userInfo = res.userInfo;
        userOperate.setUserInfo();
      }
    });
  }
};

var login = function login(code, _success, _fail) {
  var param = config.getParam();
  param["appsign"] = util.sign(param);
  param["js_code"] = code;
  util.request({
    url: urls.login,
    data: param,
    success: function success(res) {
      var d = res.data;
      if (d && (d.ecode == 0 || d.ecode == 2)) {
        console.log("login +", res);
        if (res.data["uid"]) {
          config.UID = res.data["uid"];
        }
        if (res.data['sessionkey']) {
          config.sessionkey = res.data.sessionkey;
        }
        // 登录成功 获取用户数据 再登录回调
        userOperate.getUserData(function () {
          if (_success && typeof _success == 'function') _success();
        });
      } else {
        var msg = "server login fail." + JSON.stringify(res);
        if (_fail && typeof _fail == 'function') _fail();
      }
    },
    fail: function fail(er) {
      console.error(er);
      if (_fail && typeof _fail == 'function') _fail();
    }
  });
};
module.exports = {
  login: login,
  getUseInfo: getUseInfo
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
        //# sourceMappingURL=login.js.map
        