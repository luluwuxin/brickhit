(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/gameLogic/Ball.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7c20ai4xVtHLJVu+ItaU2HE', 'Ball', __filename);
// scripts/gameLogic/Ball.js

"use strict";

function Norm() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i] * arguments[i];
    }
    return Math.sqrt(sum);
};
function dot() {
    var sum = 0;
    var length = arguments.length / 2;
    for (var i = 0; i < length; i++) {
        sum += arguments[i] * arguments[i + length];
    }
};
var angle = 10;
var modifyv = [1, 1]; //标准修正向量
function angle2radian(angle) {
    return angle / 180 * Math.PI;
}
var common = require("Common");
var physicTag = require("Const").PHYSICIS_TAG;
//let maxSpeed = 2500;
window.maxSpeed = 900;
cc.Class({
    extends: cc.Component,

    properties: {},

    /*    init(gameCtl) {
            this.gameCtl = gameCtl;
            this.node.position = cc.v2(360,270);//初始化位置
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(800,800);//初始化速度
        }, */

    onBeginContact: function onBeginContact(contact, self, other) {
        switch (other.tag) {
            case physicTag.TAG_BRICK:
                //球碰到砖块
                other.node.getComponent("Brick").onContacked();
                audioManager.play("hitBrick", true);
                //this.gameCtl.onBallContactBrick(self.node, other.node);
                break;
            case physicTag.TAG_GROUND:
                //球碰到地面
                //this.gameCtl.onBallContactGround(self.node, other.node);
                break;
            case physicTag.TAG_PADDLE:
                //球碰到托盘
                //this.gameCtl.onBallContactPaddle(self.node, other.node);
                break;
            case physicTag.TAG_PADDLE:
                //球碰到墙
                //this.gameCtl.onBallContactWall(self.node, other.node);
                break;
            case physicTag.TAG_FOOD:
                //console.log("touch food");
                other.node.getComponent("Food").onContacked(self, other);
            //other.node.getComponent("Brick").onContacked();
        }
    },
    onEndContact: function onEndContact(contack, self, other) {
        if (self.node.parent) {
            switch (other.tag) {
                case physicTag.TAG_PADDLE:
                    //paddle
                    var y1 = self.node.parent.convertToWorldSpaceAR(self.node.getPosition()).y;
                    var y2 = other.node.parent.convertToWorldSpaceAR(other.node.getPosition()).y;
                    if (y1 < y2) return;
                    var vec1 = common.normalizev(this.getSpeedv());
                    vec1[1] = Math.abs(vec1[1]);
                    if (vec1[1] > 0) {
                        var _vec = common.normalizev(modifyv);
                        _vec[0] *= vec1[0] > 0 ? 1 : -1; //修正向量
                        this.setSpeed(vec1[0] + _vec[0], vec1[1] + _vec[1]);
                    }
                    break;
            }
        }
        this.updateSpeed();
    },
    setSpeed: function setSpeed(x, y) {
        //设置速度方向
        //this.speed = cc.v2(x, y);
        var speedVec = common.normalizev([x, y]).map(function (a) {
            return a * maxSpeed;
        });
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(speedVec[0], speedVec[1]);
        //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(x, y);
    },
    getSpeedv: function getSpeedv() {
        var v2 = this.getComponent(cc.RigidBody).linearVelocity;
        return [v2.x, v2.y];
    },
    ctor: function ctor() {
        this.id = common.getIdentifier();
    },
    onLoad: function onLoad() {
        this.node.group = "ball";
        //this.getComponent(cc.Sprite).spriteFrame = this.getSpriteFrame();
    },

    onEnable: function onEnable() {},
    onDisable: function onDisable() {},
    updateSpeed: function updateSpeed() {

        var x = this.getComponent(cc.RigidBody).linearVelocity.x;
        var y = this.getComponent(cc.RigidBody).linearVelocity.y;
        //if(Norm(x, y) >= maxSpeed){
        var speedVec = common.normalizev([x, y]).map(function (a) {
            return a * maxSpeed;
        });
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(speedVec[0], speedVec[1]);
        //console.log(speedVec, this.getComponent(cc.RigidBody).linearVelocity)
        //}
        if (Math.abs(Math.atan(y / x)) < angle2radian(angle)) {
            this.setSpeed(x, (y / x > 0 ? 1 : -1) * Math.tan(angle2radian(angle)) * x);
        } else this.setSpeed(x, y);
    },
    update: function update() {
        //this.updateSpeed();
    },
    onDestroy: function onDestroy() {
        //cc.audioEngine.stop(this.current);
    }
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
        //# sourceMappingURL=Ball.js.map
        