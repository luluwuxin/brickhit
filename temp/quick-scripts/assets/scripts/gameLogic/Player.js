(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/gameLogic/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2e894CF4cRON4TnkX5YmOFS', 'Player', __filename);
// scripts/gameLogic/Player.js

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
        ballNode: cc.Node,
        line: cc.Node,
        touch: cc.Node,
        ballPrefab: cc.Prefab,
        mntNode: cc.Node,
        buffMnt: cc.Node,
        paddle: require("Paddle"),
        minRotation: 5,
        speed: 800
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {},

    reset: function reset(game) {
        this.paddlePos = this.paddlePos ? this.paddlePos : this.paddle.node.getPosition();
        this.game = game;
        this.balls = 0;
        //this.mntNode.removeAllChildren();
        this.buffMnt.removeAllChildren();
        this.paddle.stop();
        this.paddle.node.setPosition(this.paddlePos);
        //console.log("set paddle position#################", this.paddle.node.getPosition(), "------", this.paddlePos);
        this.ballNode.active = true;
        this.getInput();
    },
    getInput: function getInput() {
        //console.log("getInput");
        this.touch.on("touchstart", this.onTouchStart, this);
        this.touch.on("touchmove", this.onTouchMove, this);
        this.touch.on("touchend", this.onTouchEnd, this);
    },
    onTouchStart: function onTouchStart(event) {
        var src = this.ballNode.parent.convertToWorldSpaceAR(this.ballNode.getPosition());
        var dst = event.getLocation();
        var dir = cc.v2(dst.x - src.x, dst.y - src.y);
        var alph = 0.0;
        if (dir.y != 0.0) alph = Math.atan(dir.x / dir.y);
        alph = alph * 180 / Math.PI;
        //console.log(alph);
        this.line.setPosition(this.line.parent.convertToNodeSpaceAR(src));
        this.line.rotation = alph;
        this.line.active = Math.abs(alph) <= 90 - this.minRotation;
    },
    onTouchMove: function onTouchMove(event) {
        var src = this.ballNode.parent.convertToWorldSpaceAR(this.ballNode.getPosition());
        var dst = event.getLocation();
        var dir = cc.v2(dst.x - src.x, dst.y - src.y);
        {
            var alph = 0.0;
            if (dir.y != 0.0) alph = Math.atan(dir.x / dir.y);
            alph = alph * 180 / Math.PI;
            //console.log(alph);
            this.line.rotation = alph;
            this.line.active = Math.abs(alph) <= 90 - this.minRotation;
        }
        {
            var _alph = Math.PI / 2;
            if (dir.x != 0.0) _alph = Math.atan(dir.y / dir.x);
            _alph = _alph * 180 / Math.PI;
            if (Math.abs(_alph) < this.minRotation) return;
            if (dir.y < 0) {
                dir.x = -dir.x;
                dir.y = -dir.y;
            }
            this._dir = dir;
        }
    },
    onTouchEnd: function onTouchEnd(event) {
        this.line.active = false;
        var src = this.ballNode.parent.convertToWorldSpaceAR(this.ballNode.getPosition());
        var dst = this.node.convertToNodeSpace(event.getLocation());
        var dir = cc.v2(dst.x - src.x, dst.y - src.y);
        var alph = Math.PI / 2;
        if (dir.x != 0.0) alph = Math.atan(dir.y / dir.x);
        alph = alph * 180 / Math.PI;
        if (Math.abs(alph) < this.minRotation) return;
        if (dir.y < 0) {
            dir.x = -dir.x;
            dir.y = -dir.y;
        }
        //console.log(dir);
        this.touch.off("touchstart", this.onTouchStart, this);
        this.touch.off("touchmove", this.onTouchMove, this);
        this.touch.off("touchend", this.onTouchEnd, this);
        this.ballNode.active = false;
        alph = alph * Math.PI / 180;
        var newBall = cc.instantiate(this.ballPrefab);
        dir = common.normalizev([dir.x, dir.y]);
        newBall.getComponent("Ball").setSpeed(this.speed * dir[0], this.speed * dir[1]);
        var pos = src;
        //let mntNode = cc.find("Canvas/gameLogic/mntNode");
        //pos = mntNode.convertToNodeSpaceAR(pos);
        pos = this.mntNode.convertToNodeSpaceAR(pos);
        newBall.parent = this.mntNode;
        newBall.setPosition(pos);
        newBall.active = true;
        window.gameBalls += 1;
        window.ballsMap[newBall.getComponent("Ball").id] = true;
        //console.log(window.ballsMap[newBall.getComponent("Ball").id]);
        this.paddle.reset(this.game);
    },

    start: function start() {}
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
        //# sourceMappingURL=Player.js.map
        