(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/RebornLayout.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'aac9exIVRNNTJ+J+W4DsUm+', 'RebornLayout', __filename);
// scripts/RebornLayout.js

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

var timeOut = 0;
var cost1 = 5;
var cost2 = 10;
var common = require("Common");
var lang = require("Lang");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        scoreLabel: cc.Label,
        skip: cc.Node,
        shareBtn: cc.Node,
        adBtn: cc.Node
    },
    init: function init(ctl) {
        this.gameCtl = ctl;
        this.node.active = false;
        this.reborned = 0;
    },
    reborn: function reborn() {
        this.node.active = false;
        this.reborned += 1;
        this.gameCtl.reborn();
    },
    show: function show() {
        this.node.active = true;
        this.scoreLabel.string = window.gameScore1;
        if (this.reborned >= 2) {
            this.onSkipBtn();
            return;
        }
        this.shareLeftTimes = 1;
        //this.shareBtn.active = this.gameCtl.getComponent("wxAddLayer").checkScore();
        this.shareBtn.active = this.gameCtl.getComponent("wxAddLayer").checkScore() && getVersionData().versionStartSeconds > 1200;
        this.adBtn.active = window.flashAd;
        if (!this.shareBtn.active && !this.adBtn.active) {
            this.onSkipBtn();
            return;
        }
        if (this.reborned == 1) {}
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    //友助复活
    onAdBtn: function onAdBtn() {
        var self = this;
        var callBack = function callBack() {
            self.reborn();
        };
        //this.gameCtl.getComponent("wxAddLayer").shareBtnWithScore(0,callBack, 10);
        //this.gameCtl.subGold(cost1, callBack);
        //this.gameCtl.getComponent("wxAddLayer").assistTwoBtn(callBack, this.reborned == 0 ? cost1 : cost2);
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            this.gameCtl.wxAddLayout.shareBtnWithUrl(0, callBack);
        } else callBack();
    },
    //广告复活
    onShareBtn: function onShareBtn() {
        var _this = this;

        var self = this;
        this.gameCtl.hideBannerAd();
        if (this.reborned == 0) {
            var success = function success() {
                _this.reborn();
            };
            var fail = null;
            common.playAd(success, fail);
        } else if (this.reborned == 1) {
            this.onReshareBtn();
        }
    },
    onReshareBtn: function onReshareBtn() {
        var self = this;
        var success = function success() {
            self.reborn();
        };
        var fail = null;
        common.playAd(success, fail);
    },

    onSkipBtn: function onSkipBtn() {
        this.node.active = false;
        this.gameCtl.stopGame();
    },
    onDestroy: function onDestroy() {}
    // update (dt) {},
});

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
        //# sourceMappingURL=RebornLayout.js.map
        