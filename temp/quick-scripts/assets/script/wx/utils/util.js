(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/utils/util.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7b5beVJqxpORpezh/mvvNl6', 'util', __filename);
// script/wx/utils/util.js

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var tokenMgr = require('tokenMgr');
var urls = require('config').urls;
var md5 = require('md5');
var config = require('config');
var global = require('../global/global');
var WXBizDataCrypt = require('WXBizDataCrypt');

var formatTime = function formatTime(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

var formatNumber = function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
};

var randomStr = function randomStr(n) {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz".split('');
    var res = "";
    for (var i = 0; i < n; i++) {
        res = res + chars[(Math.random() * 1e3 | 0) % chars.length];
    }
    return res;
};

// 获取本次登录的会话密钥
var getSession = function getSession(callback) {
    wx.login({
        success: function success(res) {
            console.log('wx login success:', res);
            var code = res.code;
            wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session',
                data: {
                    appid: config.config.appid,
                    secret: config.config.appsecret,
                    js_code: code,
                    grant_type: 'authorization_code'
                },
                success: function success(res) {
                    console.log('get session key success:', res);
                    // self.session_key = res.data.session_key;
                    config.sessionkey = res.data.session_key;
                    if (callback && typeof callback == 'function') {
                        callback();
                    }
                },
                fail: function fail(res) {
                    console.log('get session key fail:', res);
                }
            });
        },
        fail: function fail(res) {
            console.log('wx login fail:', res);
        }
    });
};

var decodeOpenId = function decodeOpenId(res, callback) {
    checkSession(function () {
        console.log('config.sessionkey:', config.sessionkey);
        if (config.sessionkey && config.sessionkey != '') {
            var pc = new WXBizDataCrypt(config.config.appid, config.sessionkey);
            var data = pc.decryptData(res.encryptedData, res.iv);
            console.log('解密后openid: ', data);
            if (data && data["openGId"]) {
                // return data;
                if (callback && typeof callback == 'function') {
                    callback(data.openGId);
                }
            }
        }
    });
};

var checkSession = function checkSession(callback) {
    wx.checkSession({
        success: function success(res) {
            console.log('check session success', res);
            if (config.sessionkey == '') {
                getSession(callback);
            } else {
                if (callback && typeof callback == 'function') {
                    callback();
                }
            }
            // if (res.errMsg != 'checkSession:ok') {
            //     getSession(callback);
            // } else if (res.errMsg == 'checkSession:ok') {

            // }
        },
        fail: function fail(res) {
            console.log('check session fail', res);
            getSession(callback);
        }
    });
};
/**
 * 不联网 本地获取OpenID 
 * @param {*} code 
 */
var getLocalOpenID = function getLocalOpenID(code) {
    wx.request({
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        data: {
            appid: config.config.appid,
            secret: config.config.appsecret,
            js_code: code,
            grant_type: 'authorization_code'
        },
        success: function success(res) {
            console.log('get session key success:', res);
            // self.session_key = res.data.session_key;
            config.sessionkey = res.data.session_key;
            config.UID = res.data.openid;
        },
        fail: function fail(res) {
            console.log('get session key fail:', res);
        }
    });
};

var reLogin = function reLogin() {
    wx.login({
        success: function success(res) {
            var param = config.getParam();
            param["appsign"] = sign(param);
            param["js_code"] = res.code;
            request({
                url: config.urls.login,
                data: param,
                success: function success(res) {
                    console.log("login +", res);
                    if (res.data["uid"]) {
                        var d = res.data;
                        if (d && (d.ecode == 0 || d.ecode == 2)) {
                            console.log("login +", res);
                            if (res.data["uid"]) {
                                config.UID = res.data["uid"];
                            }
                            if (res.data['sessionkey']) {
                                config.sessionkey = res.data.sessionkey;
                            }
                            reloginGetUserInfo();
                        }
                    }
                }
            });
        },
        fail: function fail(res) {
            console.log(res);
        }
    });
};

var reloginGetUserInfo = function reloginGetUserInfo() {
    var url = config.urls.user + "/get_user";
    var param = {}; //config.getParam();
    request({
        url: url,
        data: param,
        method: 'GET',
        success: function success(res) {
            //服务器存储的用户数据
            console.log("getUserData", res);
            global.setUserDataInfo(res.data.data);
        }
    });
};

var request = function request(p) {
    if (!!!config.gamecenter_link) {
        var _fail = p.fail || function (err) {};
        _fail();
        return;
    }
    var url = p.url;
    var data = p.data || {};
    var header = p.header || {};
    var method = p.method || 'GET';
    var dataType = p.dataType || "";
    var _success = p.success || function (res) {};
    var _fail = p.fail || function (err) {};
    var complete = p.complete || function () {};
    if (tokenMgr.checkToken()) {
        header.token = tokenMgr.getToken();
    } else {
        //非登录接口
        if (!data["js_code"]) {
            reLogin();
            return;
        }
    }
    console.log(url, p, header.token);
    wx.request({
        url: url,
        data: data,
        header: header,
        method: method,
        dataType: dataType,
        success: function success(res) {
            if (res.data["token"]) {
                tokenMgr.setToken(res.data.token);
            }

            if (res.statusCode != 200) {
                console.error('response error:', res.statusCode);
                return;
            }

            _success(res);
        },
        fail: function fail(res) {
            console.log("fail", res);
            _fail(res);
            tokenMgr.setToken(null);
        },
        complete: complete
    });
};

var key = config.config.appsecret;
var appId = config.config.appid;

/**
 * 微信支付签名
 * @param {*代签名object} p
 */
var sign = function sign(p) {
    var list = new Array();
    for (var item in p) {
        var type = _typeof(p[item]);
        if (type == "string" || type == "number") {
            var tmp = item + "=" + p[item];
            list.push(tmp);
        }
    }
    list.sort(function (o0, o1) {
        return o0 > o1;
    });
    list.push("key=" + key);
    var res = list.join("&");
    console.log("sign_source:" + res);
    return md5.md5(res);
};

var getXMLNodeValue = function getXMLNodeValue(node_name, xml) {
    console.log("xml:" + xml);
    var tmp = xml.split("<" + node_name + ">");
    var _tmp = tmp[1].split("</" + node_name + ">");
    return _tmp[0];
};

var randomString = function randomString() {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < 32; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};

var createTimeStamp = function createTimeStamp() {
    return parseInt(new Date().getTime() / 1000) + '';
};

/**
 * 微信支付
 * @param {*} fee 支付额度，单位分
 * @param {*} success 支付成功
 * @param {*} fail 支付失败
 * @param {*} complete 支付完成
 */
var _pay = function _pay(fee, _success2, fail, complete) {
    fee = fee || 1;
    _success2 = _success2 || function (res) {};
    fail = fail || function () {};
    complete = complete || function () {};

    var url_unifiedOrder = urls.unifiedOrder;
    var wx_unifiedOrder = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    request({
        url: url_unifiedOrder,
        data: {
            fee: fee
        },
        success: function success(res) {
            console.log("UNIFIEDORDER:" + JSON.stringify(res));
            request({
                url: wx_unifiedOrder,
                data: res.data,
                method: "POST",
                success: function success(res) {
                    var xml = res.data;
                    var return_code = getXMLNodeValue('return_code', xml.toString("utf-8"));
                    var returnCode = return_code.split('[')[2].split(']')[0];
                    if (returnCode == 'FAIL') {
                        var err_code_des = getXMLNodeValue('err_code_des', res.data.toString("utf-8"));
                        var errDes = err_code_des.split('[')[2].split(']')[0];
                        fail();
                    } else {
                        var prepay_id = getXMLNodeValue('prepay_id', res.data.toString("utf-8"));
                        var tmp = prepay_id.split('[');
                        var tmp1 = tmp[2].split(']');
                        var timeStamp = createTimeStamp(); //时间戳
                        var nonceStr = randomString(); //随机数
                        var dat = {
                            appId: appId,
                            nonceStr: nonceStr,
                            package: "prepay_id=" + tmp1[0],
                            signType: "MD5",
                            timeStamp: timeStamp
                        };
                        dat.paySign = sign(dat).toUpperCase();
                        wx.requestPayment({
                            timeStamp: dat.timeStamp,
                            nonceStr: dat.nonceStr,
                            package: dat.package,
                            signType: dat.signType,
                            paySign: dat.paySign,
                            success: _success2,
                            fail: fail,
                            complete: complete
                        });
                    }
                },
                fail: function fail() {},
                complete: function complete() {}
            });
        },
        fail: function fail() {},
        complete: function complete() {}
    });
};

/**
 * 微信支付
 * @param {*} fee 支付额度，单位分
 * @param {*} success 支付成功
 * @param {*} fail 支付失败
 * @param {*} complete 支付完成
 */
var pay = function pay(fee, _success3, fail, complete) {
    fee = fee || 1;
    _success3 = _success3 || function (res) {};
    fail = fail || function () {};
    complete = complete || function () {};

    request({
        url: urls.pay,
        method: "POST",
        data: {
            fee: fee
        },
        success: function success(res) {
            var d = res.data;
            console.log("pay response:" + JSON.stringify(d));
            if (d && d.ecode == 0) {
                var dat = d.data.args;
                console.log(dat);
                wx.requestPayment({
                    timeStamp: dat.timeStamp,
                    nonceStr: dat.nonceStr,
                    package: dat.package,
                    signType: dat.signType,
                    paySign: dat.paySign,
                    success: _success3,
                    fail: fail,
                    complete: complete
                });
            }
        },
        fail: function fail() {},
        complete: function complete() {}
    });
};

module.exports = {
    formatTime: formatTime,
    randomStr: randomStr,
    randomString: randomString,
    request: request,
    sign: sign,
    pay: pay,
    reLogin: reLogin,
    reloginGetUserInfo: reloginGetUserInfo,
    getSession: getSession,
    checkSession: checkSession,
    decodeOpenId: decodeOpenId,
    getLocalOpenID: getLocalOpenID
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
        //# sourceMappingURL=util.js.map
        