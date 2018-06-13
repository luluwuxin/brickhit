(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/savePhotos/savePhotos.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fc6dak4PdZB96CZTnc2delR', 'savePhotos', __filename);
// script/wx/savePhotos/savePhotos.js

'use strict';

// import { EFAULT } from "constants";
// import { fail } from "assert";
// import { connect } from "net";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var self = null;
var preview = require('./preview');
var config = require('config');
cc.Class({
    extends: cc.Component,
    properties: {
        leftSpr: cc.SpriteFrame,
        rightSpr: cc.SpriteFrame
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {},
    start: function start() {
        self = this;
        var btn = self.getComponent(cc.Button);
        btn.node.on("click", preview.previewImage, self);
        var spr = self.getComponent(cc.Sprite);
        if (config.officalAccount.direction == "left") {
            console.log("left");
            spr.spriteFrame = self.leftSpr;
        } else {
            spr.spriteFrame = self.rightSpr;
            console.log("other");
        }
    }
}

// update (dt) {},
);

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
        //# sourceMappingURL=savePhotos.js.map
        