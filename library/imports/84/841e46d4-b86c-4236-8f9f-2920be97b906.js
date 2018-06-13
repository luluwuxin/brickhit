"use strict";
cc._RF.push(module, '841e4bUuGxCNo+fKSC+l7kG', 'GameView');
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