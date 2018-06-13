"use strict";
cc._RF.push(module, '04f745nIE9OUa36I/A06bgG', 'commonLayer');
// script/wx/common/commonLayer.js

"use strict";

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
        mask: cc.Node,
        textPreb: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        self = this;
        cc.game.addPersistRootNode(self.node);
        self._textList = new Array();
        self._speed = 100;
        self._textNode = cc.instantiate(self.textPreb);
        self._maskSize = self.mask.getContentSize();
        self._textSize = self._textNode.getContentSize();
        self._x = self._maskSize.width / 2 + self._textSize.width / 2;
        self.mask.addChild(self._textNode);
        self._textNode.setPosition(cc.v2(self._x, 0));
    },
    start: function start() {},
    addText: function addText(text) {
        self._textList.push(text);
    },
    update: function update(dt) {
        if (self._textList.length > 0) {
            var point = self._textNode.getPosition();
            if (point.x < -self._x) {
                self._textList.splice(0, 1);
                if (self._textList[0]) {
                    var _textNode = cc.find("text", self._textNode);
                    _textNode.getComponent(cc.Label).string = self._textList[0];
                }
                point.x = self._x;
            } else {
                point.x -= dt * self._speed;
            }
            self._textNode.setPosition(point);
        }
    }
});

cc._RF.pop();