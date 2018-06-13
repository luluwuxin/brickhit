(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/GameView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '841e4bUuGxCNo+fKSC+l7kG', 'GameView', __filename);
// scripts/GameView.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label,
        bestLabel: cc.Label,
        goldLabel: cc.Label,
        help4Gold: cc.Node
    },
    onLoad: function onLoad() {
        this.wxAddLayer = this.getComponent("wxAddLayer");
        //
    },
    update: function update() {
        //this.updateScore(gameScore);
        this.updateScore(gameScore1);
    },
    start: function start() {
        this.updateScore(gameScore1);
        this.updateBest(this.wxAddLayer.getScore());
        //this.help4Gold.active = this.wxAddLayer.checkScore();
        this.help4Gold.active = false;
    },
    updateScore: function updateScore(score) {
        this.scoreLabel.string = score;
    },
    updateGold: function updateGold(val) {
        //this.goldLabel.string = val;
    },
    updateBest: function updateBest(val) {
        this.bestLabel.string = val;
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
        //# sourceMappingURL=GameView.js.map
        