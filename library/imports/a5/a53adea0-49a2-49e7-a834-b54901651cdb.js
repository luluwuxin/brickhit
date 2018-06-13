"use strict";
cc._RF.push(module, 'a53ad6gSaJJ56g0tUkBZRzb', 'UsrData');
// scripts/common/UsrData.js

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var common = require("Common");
var Const = require("Const");
var getUsrData = function getUsrData() {
    return common.getStorageSync(Const.usrData);
};
var setUsrData = function setUsrData(val) {
    return common.setStorageSync(Const.usrData, val);
};
var defaultData = { sound: true };
var UsrData = cc.Class({
    properties: {
        //本地存储
        sound: {
            get: function get() {
                //向前兼容
                return _typeof(this._data.sound) != _typeof(defaultData.sound) ? defaultData.sound : this._data.sound;
            },
            set: function set(val) {
                this._data.sound = val;
                setUsrData(this._data);
            }
        },

        //---------------------------------------------------------------华丽的分割线-----------------------------------------------

        gameStartSeconds: {
            get: function get() {
                return (Date.parse(new Date()) - this._data.timestamp) / 1000;
            }
        }
    },
    instance: function instance() {
        var data = getUsrData();
        if (!data) {
            this._data = defaultData;
            this._data.timestamp = Date.parse(new Date());
            setUsrData(this._data);
        } else this._data = data;
        //this._data = data ? data : defaultData;
        return this;
    }
});
var self;

//单例
window.getUsrData = function () {
    if (self != undefined) return self;
    self = new UsrData();
    return self.instance();
};

cc._RF.pop();