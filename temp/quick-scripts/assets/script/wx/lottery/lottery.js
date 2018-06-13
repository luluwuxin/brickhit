(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/lottery/lottery.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '300251Wb91BT6Ve/i/7iO52', 'lottery', __filename);
// script/wx/lottery/lottery.js

'use strict';

var urls = require('config').urls;
var util = require('../utils/util');

var startActivity = function startActivity(callback) {
    var url = urls.lottery + "/startActivity";
    var param = {};
    util.request({
        url: url,
        data: param,
        method: 'POST',
        success: function success(res) {
            console.log('start activity success:', res);
            if (callback && typeof callback == 'function') {
                callback(res.data);
            }
        },
        fail: function fail(res) {
            console.log('start activity failed');
        }
    });
};

var runLottery = function runLottery(type, callback) {
    var url = urls.lottery + "/runLottery";
    var param = {
        lotteryType: type
    };
    util.request({
        url: url,
        data: param,
        method: 'POST',
        success: function success(res) {
            console.log('run lottery success:', res);
            if (callback && typeof callback == 'function') {
                callback(res.data);
            }
        },
        fail: function fail(res) {
            console.log('run lottery failed');
        }
    });
};

/**
 * @deprecated - 弃用
 * @param {*} callback 
 */
var quitActivity = function quitActivity(callback) {
    var url = urls.lottery + "/quitActivity";
    var param = {};
    util.request({
        url: url,
        data: param,
        method: 'POST',
        success: function success(res) {
            console.log('quit activity success:', res);
            if (callback && typeof callback == 'function') {
                callback(res.data);
            }
        },
        fail: function fail(res) {
            console.log('quit activity failed');
        }
    });
};

module.exports = {
    startActivity: startActivity,
    runLottery: runLottery,
    quitActivity: quitActivity
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
        //# sourceMappingURL=lottery.js.map
        