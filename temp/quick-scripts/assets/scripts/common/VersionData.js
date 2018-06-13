(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/common/VersionData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '64d6cHVPElIa7Uh5ilkEyw0', 'VersionData', __filename);
// scripts/common/VersionData.js

"use strict";

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
var getVersionData = function getVersionData() {
    return common.getStorageSync(Const.version);
};
var setVersionData = function setVersionData(val) {
    return common.setStorageSync(Const.version, val);
};
var defaultData = {};
var VersionData = cc.Class({
    properties: {
        //本地存储

        versionStartSeconds: {
            get: function get() {
                return (Date.parse(new Date()) - this._data.timestamp) / 1000;
            }
        }
    },
    instance: function instance() {
        var data = getVersionData();
        if (!data) {
            this._data = defaultData;
            this._data.timestamp = Date.parse(new Date());
            setVersionData(this._data);
        } else this._data = data;
        //this._data = data ? data : defaultData;
        return this;
    }
});
var self;

//单例
window.getVersionData = function () {
    if (self != undefined) return self;
    self = new VersionData();
    return self.instance();
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
        //# sourceMappingURL=VersionData.js.map
        