"use strict";
cc._RF.push(module, '010a7M1HpBGFZSfemIzdWX3', 'Ground');
// scripts/gameLogic/Ground.js

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
var timeOut = 0.35;
var tagConst = require("Const").PHYSICIS_TAG;
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
        paddle: require("Paddle")
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    reset: function reset(game) {
        this.game = game;
    },
    onBeginContact: function onBeginContact(contact, self, other) {
        switch (other.tag) {
            case tagConst.TAG_BALL:
                window.gameBalls -= 1;
                var id = other.node.getComponent("Ball").id;
                other.node.destroy();
                if (window.gameBalls <= 0) {
                    console.log("gg smd");
                    this.game.rebornCtrl();
                } else {
                    if (!window.ballsMap[id]) window.inBalls -= 1;
                    this.paddle.contackBall(id);
                }
                /*
                this.scheduleOnce(() => {
                    other.node.active = false;
                    other.node.destroy();
                }, timeOut)*/
                break;
            case tagConst.TAG_BUFF:
                other.node.destroy();
                break;
        }
    },

    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();