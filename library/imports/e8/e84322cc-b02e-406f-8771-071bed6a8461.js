"use strict";
cc._RF.push(module, 'e8432LMsC5Ab4dxBxvtaoRh', 'userOperate');
// script/wx/userOperate/userOperate.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

///////////////////////////////////////////
//定义 用户操作  上传数据或拉取数据
/////////////////////////////////////////////
var global = require('../global/global');
var urls = require('config').urls;
var config = require('config');
var util = require('../utils/util');

//// 类版本 全局函数太多可以使用类版本
var self = null;

var userOperate = function () {
    // 类似构成函数
    function userOperate() {
        _classCallCheck(this, userOperate);

        this.setScore = function (_score) {
            if (!!!config.gamecenter_link) {
                this._setStorageScore(_score);
                return;
            }
            var score = global.getUserDataInfoByName('score');
            if (!!!score || score < _score) {
                this._setScore(_score);
            }
            var score = global.getUserDataInfoByName('weekScore');
            if (!!!score || score < _score) {
                this._setScore(_score, "weekScore", "set_week_score");
                this.setFriendsRankScore(_score);
            }
        };

        this._setStorageScore = function (_score) {
            var score = cc.sys.localStorage.getItem('score');
            if (!!!score || parseInt(score) < _score) {
                cc.sys.localStorage.setItem('score', score);
                global.setUserDataInfoByName('score', _score);
            }
            var timetamp = cc.sys.localStorage.getItem('timetamp');
            if (timetamp) {
                if (global.isWeekTime(timetamp)) {
                    var _storageScore = cc.sys.localStorage.getItem('weekScore');
                    if (!!!_storageScore || parseInt(_storageScore) < _score) {
                        this.__setStorage(_score);
                    }
                } else {
                    this.__setStorage(_score);
                }
            } else {
                this.__setStorage(_score);
            }
        };

        this._setScore = function (_score) {
            var dataName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "score";
            var setWeek = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "set_score";

            var url = urls.user + "/" + setWeek;
            var param = {}; //config.getParam();
            param["score"] = _score;
            util.request({
                url: url,
                data: param,
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                method: 'POST',
                success: function success(res) {
                    console.log("setScore Success", res);
                    global.setUserDataInfoByName(dataName, _score);
                }
            });
        };

        this.setFriendsRankScore = function (score) {

            if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                var weekScore = global.getUserDataInfoByName('weekScore');
                if (!!!weekScore || weekScore <= score) {
                    var time = global.getTimestamp();
                    var _kvData = new Array();
                    score = score.toString();
                    time = time.toString();
                    _kvData.push({ key: 'score', value: score }, { key: 'timestamp', value: time });
                    wx.setUserCloudStorage({
                        KVDataList: _kvData,
                        success: function success(res) {
                            console.log(res);
                            global.setUserDataInfoByName('weekScore', parseInt(score));
                        },
                        fail: function fail(res) {
                            console.log("fail", res);
                        }
                    });
                }
            }
        };

        this.setLocalScore = function (score) {
            this._localScore = score;
        };

        this.getLocalScore = function () {
            return this._localScore || 0;
        };

        this.getScore = function () {
            var score = 0;
            if (!!!config.gamecenter_link) {
                var timetamp = cc.sys.localStorage.getItem('timetamp');
                if (timetamp) {
                    if (global.isWeekTime(timetamp)) {
                        var _storageScore = cc.sys.localStorage.getItem('weekScore');
                        if (_storageScore) {
                            score = _storageScore;
                        }
                    }
                }
            } else {
                score = global.getUserDataInfoByName('weekScore') || 0;
            }
            return score;
        };

        this.setBlob = function (blob, callBack) {
            var url = urls.user + "/set_blob";
            var param = {}; //config.getParam();
            param["blob"] = blob;
            util.request({
                url: url,
                data: param,
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                method: 'POST',
                success: function success(res) {
                    console.log("setBlob Success", res);
                    if (callBack && typeof callBack == 'function') callBack();
                }
            });
        };

        this.setUserInfo = function () {
            var url = urls.user + "/setuserinfo";
            var param = {}; //config.getParam();
            console.log(config.userInfo);
            param["portrait"] = config.userInfo.avatarUrl;
            param["name"] = config.userInfo.nickName;
            param["geo"] = config.userInfo.city;
            util.request({
                url: url,
                data: param,
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                method: 'POST'
            });
        };

        this.subVit = function (callBack, _num) {
            var url = urls.user + "/sub_vit";
            var param = {
                num: _num
            }; //config.getParam();
            util.request({
                url: url,
                data: param,
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                method: 'POST',
                success: function success(res) {
                    if (callBack && typeof callBack == 'function') callBack(res.data.data);
                },
                fail: function fail(er) {
                    console.error(er);
                }
            });
        };

        this.setWeekScore = function (callBack, _num) {
            var url = urls.user + "/set_week_score";
            var param = {
                num: _num
            }; //config.getParam();
            util.request({
                url: url,
                data: param,
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                method: 'POST',
                success: function success(res) {
                    console.log(res.data);
                    if (callBack && typeof callBack == 'function') callBack(res.data.data);
                },
                fail: function fail(er) {
                    console.error(er);
                }
            });
        };

        this.getUserData = function (callBack) {
            var url = urls.user + "/get_user";
            var param = {}; //config.getParam();
            util.request({
                url: url,
                data: param,
                method: 'GET',
                success: function success(res) {
                    //服务器存储的用户数据
                    console.log("getUserData", res);
                    global.setUserDataInfo(res.data.data);
                    if (callBack && typeof callBack == 'function') callBack(res.data);
                }
            });
        };

        this.getTuiguangUrl = function (callBack) {
            var url = urls.user + "/get_tuiguangUrl";
            var param = {}; //config.getParam();
            util.request({
                url: url,
                data: param,
                method: 'GET',
                success: function success(res) {
                    //服务器存储的用户数据
                    console.log(res);
                    if (callBack && typeof callBack == 'function') callBack(res.data);
                }
            });
        };

        this.getVit = function (callBack) {
            var url = urls.user + "/get_vit";
            var param = {}; //config.getParam();
            util.request({
                url: url,
                data: param,
                method: 'GET',
                success: function success(res) {
                    //服务器存储的用户数据
                    if (callBack && typeof callBack == 'function') callBack(res.data.data);
                }
            });
        };

        self = this;
    }

    // 上传 分数

    /**
     * 设置本地分数问题
     */


    _createClass(userOperate, [{
        key: '__setStorage',
        value: function __setStorage(__score) {
            console.log("__SetStorage", __score);
            cc.sys.localStorage.setItem('weekScore', __score);
            global.setUserDataInfoByName('weekScore', parseInt(__score));
            var time = global.getTimestamp();
            cc.sys.localStorage.setItem('timetamp', time);
            this.setFriendsRankScore(__score);
        }
        /**
         * 设置真实好友分数
         */

        //当局本地分数

        /** 
         * 上传 个人数据（自定义）
         * 
         * */


        /**
        * 上传个人人物数据信息 
        *
        */

        /**
         * 消耗体力
         */

        /*
        *上传周分数
        set_week_score
        */

        // 获取 用户信息 
        /*res.data{
        "user": {
            "uid": "String",
            "name": "String",
              "portrait":"String",
            "geo":"String",
            
            "blob": {
                "type": "Mixed",
                "default": {}
            },
            "score": {
                "type":"Number",
                "default":0
            },
            "weekScore": {
                "type":"Number",
                "default":0
            },
            "weekTime": {
                "type":"Number",
                "default":0
            },
            "vit": {
                "type":"Number",
                "default":0
            },
            "vitRecoverTime": {
                "type":"Number",
                "default":0
            },
            "money": {
                "type": "Number",
                "default":0
            },
            "getHongBaos": {
                "type": "Object",
                "default": []
            },
            "sendHongBaos": {
                "type": "Object",
                "default": []
            },
            "tuiguangToday": {
                "type": "Object",
                "default": []
            },
            "tuiguangScore":{
                "type":"Number",
                "default":0
            },
            "createdate": "Date",
            "gold": "Number",
            "match": {
                "type": "Object",
                "default": []
            }
        },
        }
        */

        //获得体力

    }]);

    return userOperate;
}();

exports.default = userOperate;
;
module.exports = exports['default'];

cc._RF.pop();