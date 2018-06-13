(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/match/match.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0b3c1Sy0g1NH6CCQD39xszJ', 'match', __filename);
// script/wx/match/match.js

'use strict';

var urls = require('config').urls;
var config = require('config');
var util = require('../utils/util');
// var matchManager = require('matchManager').getInstance()

// var self = null;
/*
export default class match {
    constructor() {
        // self = this;
    };

    getMatchInfo = function(callback) {
        var url = urls.match + "/getmatchinfo";
        var param = {};
        util.request({
            url: url,
            data: param,
            method: 'POST',
            success: res => {
                if (callback && typeof callback == 'function') {
                    console.log('get match info success:', res);
                    callback(res.data);
                }
            },
            fail: res => {
                console.log('get match info failed');
            },
        });
    };

    enterMatch = function(callback) {
        var url = urls.match + "/entermatch";
        var param = {};
        util.request({
            url: url,
            data: param,
            method: 'POST',
            success: res => {
                console.log('enter match success, res:', res);
                if (callback && typeof callback == 'function') {
                    callback(res.data);
                }
            },
            fail: res => {
                console.log('enter match failed, res:', res);
            },
        });
    };

    queryMyMatch = function(obj) {
        var url = urls.match + "/querymymatch";
        var param = {
            matchID: obj.matchID
        };
        util.request({
            url: url,
            data: param,
            method: 'POST',
            success: res => {
                console.log('query match success, res:', res);
                if (obj.success && typeof obj.success == 'function') {
                    obj.success(res.data);
                }
            },
            fail: res => {
                console.log('query match failed, res:', res);
                if (obj.fail && typeof obj.fail == 'function') {
                    obj.fail(res.data);
                }
            },
        });
    };

    getMoney = function() {

    };

    update = function() {
        // 判断是否从群分享的卡片进来, 是的话就不向服务器请求match信息
        if (matchManager.checkEnter()) {
            console.log('got match info from LaunchOption');
            return;
        }

        console.log('getting match info from server .....');
        // 主动向服务器获取match信息
        this.getMatchInfo(function(data) {
            // 200 为拿到比赛数据
            if (!!data.code && data.code == 201) {
                console.log('no match now');
            } else {
                // 拿到活动，游戏界面显示红包icon
                matchManager.showMatchHongbaoIcon(data);
            }
        });
    };

    hasMatch = function() {
        return true;
    };

    isInMatch = function() {

    };
}*/
var _hasMatch = false;

var getMatchInfo = function getMatchInfo(callback) {
    var url = urls.match + "/getmatchinfo";
    var param = {};
    util.request({
        url: url,
        data: param,
        method: 'POST',
        success: function success(res) {
            console.log('get match info success:', res);
            if (callback && typeof callback == 'function') {
                callback(res.data);
            }
        },
        fail: function fail(res) {
            console.log('get match info failed');
        }
    });
};

var enterMatch = function enterMatch(callback) {
    var url = urls.match + "/entermatch";
    var param = {};
    util.request({
        url: url,
        data: param,
        method: 'POST',
        success: function success(res) {
            console.log('enter match success, res:', res);
            if (callback && typeof callback == 'function') {
                callback(res.data);
            }
        },
        fail: function fail(res) {
            console.log('enter match failed, res:', res);
        }
    });
};

var queryMyMatch = function queryMyMatch(obj) {
    var url = urls.match + "/querymymatch";
    var param = {
        matchId: obj.matchId
    };
    util.request({
        url: url,
        data: param,
        method: 'POST',
        success: function success(res) {
            console.log('query match success, res:', res);
            if (obj.success && typeof obj.success == 'function') {
                obj.success(res.data);
            }
        },
        fail: function fail(res) {
            console.log('query match failed, res:', res);
            if (obj.fail && typeof obj.fail == 'function') {
                obj.fail(res.data);
            }
        }
    });
};

var getCurMatchMoney = function getCurMatchMoney(obj) {
    var url = urls.match + "/getcurmatchmoney";
    var param = {
        matchId: obj.matchId
    };
    util.request({
        url: url,
        data: param,
        method: 'POST',
        success: function success(res) {
            console.log('get cur match money success, res:', res);
            if (obj.success && typeof obj.success == 'function') {
                obj.success(res.data);
            }
        },
        fail: function fail(res) {
            console.log('get cur match money failed, res:', res);
            if (obj.fail && typeof obj.fail == 'function') {
                obj.fail(res.data);
            }
        }
    });
};

var getAllMoney = function getAllMoney(callback) {
    var url = urls.match + "/getallmoney";
    var param = {};
    util.request({
        url: url,
        data: param,
        method: 'POST',
        success: function success(res) {
            console.log('get all money success, res:', res);
            if (callback && typeof callback == 'function') {
                callback(res.data);
            }
        },
        fail: function fail(res) {
            console.log('get all money failed, res:', res);
        }
    });
};

var hasMatch = function hasMatch() {
    return _hasMatch;
};

var setHasMatch = function setHasMatch(bool) {
    _hasMatch = bool;
};

module.exports = {
    getMatchInfo: getMatchInfo,
    enterMatch: enterMatch,
    queryMyMatch: queryMyMatch,
    getCurMatchMoney: getCurMatchMoney,
    getAllMoney: getAllMoney,
    hasMatch: hasMatch,
    setHasMatch: setHasMatch
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
        //# sourceMappingURL=match.js.map
        