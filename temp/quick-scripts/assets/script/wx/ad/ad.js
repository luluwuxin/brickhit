(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/ad/ad.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2c3b84CGFBKNKZDxssa8mnu', 'ad', __filename);
// script/wx/ad/ad.js

"use strict";

//import { format } from 'util';


var config = require('config');

var self = null;

var postAdvert = function postAdvert() {
    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
        var launcInfo = wx.getLaunchOptionsSync();
        var appId = "";
        if (typeof launcInfo.referrerInfo == "undefined") {} else {
            appId = launcInfo.referrerInfo.appId;
        }
        wx.getUserInfo({
            success: function success(res) {
                var city = res.userInfo.city;
                var gender = res.userInfo.gender;
                var param2 = {
                    deviceId: config.UID,
                    fromAppid: appId,
                    gender: gender,
                    city: city
                };
                console.log(param2);
                if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                    var util = require('../utils/util');
                    var urls = require('config').urls;
                    util.request({
                        url: urls.advert,
                        data: param2,
                        header: { 'content-type': 'application/x-www-form-urlencoded' },
                        method: 'POST',
                        success: function success(res) {
                            console.log("postAdvert success");
                        },
                        fail: function fail(res) {
                            console.log("postAdvert fail");
                        }
                    });
                }
            }
        });
    }
};

module.exports = {
    postAdvert: postAdvert
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
        //# sourceMappingURL=ad.js.map
        