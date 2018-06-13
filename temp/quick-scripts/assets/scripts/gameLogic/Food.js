(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/gameLogic/Food.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9993er8vEhE0pzXmVfPE2Zw', 'Food', __filename);
// scripts/gameLogic/Food.js

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
var FoodType = require("Const").FOOD_TYPE;
var startSpeed = 780;
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
        sprite: cc.Sprite,
        spriteFrame: {
            default: [],
            type: [cc.SpriteFrame],
            displayName: "spriteFrame"
        },
        ballPrefab: {
            default: null,
            type: cc.Prefab
        },
        ballSpriteFrames: [cc.SpriteFrame],
        buffPrefab: cc.Prefab
        //audio: {
        //    url: cc.AudioClip,
        //    default: null
        //}
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        //this.node.color = cc.color(255, 0, 0);
    },
    init: function init(_type) {
        var balls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        this._type = _type;
        this.balls = balls;
        //let sprite = this.node.getComponent(cc.Sprite);
        var sprite = this.sprite;
        sprite.spriteFrame = this.spriteFrame[_type - 1];
    },
    //碰到球
    onContacked: function onContacked(other, self) {
        if (this._type == FoodType.TYPE_BOOM) {
            //炸弹
            audioManager.play("hitBoom");
            var pos = cc.v2(this.node.x, this.node.y);
            this.node.destroy();
            this.node.parent.getComponent("BrickLayout").destroy4Side(pos);
        } else if (this._type == FoodType.TYPE_BALL) {
            //分裂一个球
            audioManager.play("hitBall");
            var _pos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
            var mntNode = cc.find("Canvas/gameLogic/mntNode");
            _pos = mntNode.convertToNodeSpaceAR(_pos);
            for (var i = 0; i < this.balls; i++) {
                var newBall = cc.instantiate(this.ballPrefab);
                var rand = cc.random0To1();
                var alpha = rand * Math.PI / 2 + Math.PI / 4;
                newBall.getComponent("Ball").setSpeed(startSpeed * Math.cos(alpha), startSpeed * Math.sin(alpha));
                newBall.parent = mntNode;
                newBall.setPosition(_pos);
                //let color = Math.min(Math.floor(this.ballSpriteFrames.length * rand), this.ballSpriteFrames.length - 1);
                //newBall.getComponent(cc.Sprite).spriteFrame = this.ballSpriteFrames[color]
                newBall.getComponent(cc.Sprite).spriteFrame = other.getComponent(cc.Sprite).spriteFrame;
                newBall.active = true;
                window.gameBalls += 1;
                window.ballsMap[newBall.getComponent("Ball").id] = window.ballsMap[other.getComponent("Ball").id];
                window.inBalls += window.ballsMap[newBall.getComponent("Ball").id] ? 0 : 1;
            }
            this.node.destroy();
        } else if (this._type == FoodType.TYPE_BUFF) {
            //buff
            audioManager.play("hitCoin");
            var newBuff = cc.instantiate(this.buffPrefab);
            newBuff.getComponent("Buff").init(window.gameScore);
            var _pos2 = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
            var _mntNode = cc.find("Canvas/gameLogic/buffMntNode");
            _pos2 = _mntNode.convertToNodeSpaceAR(_pos2);
            newBuff.parent = _mntNode;
            newBuff.setPosition(_pos2);
            newBuff.active = true;
            this.node.destroy();
        } else {}
    },
    onDestroy: function onDestroy() {
        window.gameScore1 += 1;
    },


    start: function start() {}

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
        //# sourceMappingURL=Food.js.map
        