"use strict";
cc._RF.push(module, 'a337308uxxJva7vh8G06q7Z', 'Game');
// scripts/Game.js

"use strict";

//window.console.log = function () { };

var common = require("Common");
var Const = require("Const");

window.gameScore = 0; //记录层数/结束时用于传递最终分数
window.gameBalls = 0; //总球数
window.gameScore1 = 0; //记录分数

var self = void 0;
cc.Class({
    extends: cc.Component,

    properties: {
        rebornLayout: require('RebornLayout'),
        //paddle: require("Paddle"),
        brickLayout: require("BrickLayout"),
        ground: require("Ground"),
        player: require("Player"),
        ballsMnt: cc.Node
    },
    ctor: function ctor() {
        self = this;
    },
    // use this for initialization
    onLoad: function onLoad() {
        //自适应
        //var screenSize = cc.view.getFrameSize();
        //if (screenSize.height / screenSize.width >= 1.78) {
        //    this.node.getComponent(cc.Canvas).fitWidth = true
        //}
        //else {
        //    this.node.getComponent(cc.Canvas).fitHeight = true
        //}
        //安卓返回键退出
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            if (event.keyCode === cc.KEY.back) {
                cc.director.end();
            }
        });
        cc.director.preloadScene('over', function () {
            console.log('Next scene preloaded');
        });
        this.gameView = this.getComponent("GameView");
        this.wxAddLayout = this.getComponent("wxAddLayer");
        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager.enabled = true;

        if (window.bannerAd) {
            this._bannerAd = this.getComponent("BannerBlock");
            this._bannerAd.startLoop();
        }
    },
    start: function start() {
        var _this = this;

        this.startGame();
        this.wxAddLayout.setShareAssist(function () {
            return _this.gameView.updateGold(_this.getGold());
        });
    },

    init: function init() {
        var _this2 = this;

        window.gameBalls = 0;
        window.gameScore = 0;
        window.gameScore1 = 0;
        this.physicsManager.enabled = true;
        //this.gameView.updateScore(gameScore);
        this.flg = false;
        var timeOut = 1;
        this.schedule(function () {
            _this2.flg = true;
        }, timeOut);
        this.gameView.updateBest(this.dbGetScore());
        this.gameView.updateGold(this.getGold());
        this.rebornLayout.init(this);
        this.ground.reset(this);
    },

    rebornCtrl: function rebornCtrl() {
        //重生控制逻辑
        this.physicsManager.enabled = false;
        this.rebornLayout.show();
    },
    reborn: function reborn() {
        //重生逻辑
        //window.gameScore = 0;
        window.gameBalls = 0;
        this.brickLayout.reset(this);
        this.brickLayout.newBrickLayout(2);
        window.gameScore += 2;

        window.ballsMap = {};
        this.ballsMnt.removeAllChildren();
        this.physicsManager.enabled = true;

        this.player.reset(this);
        //this.rebornCtrl();
    },
    startGame: function startGame() {
        this.init();
        this.showBannerAd();
        //开始逻辑
        window.gameScore = 0;
        window.gameBalls = 0;
        window.gameScore1 = 0;

        window.ballsMap = {};
        this.ballsMnt.removeAllChildren();

        this.brickLayout.reset(this);
        this.brickLayout.newBrickLayout(2);
        window.gameScore += 2;
        this.player.reset(this);
        //this.rebornCtrl();
    },
    newStage: function newStage(success) {
        if (!this.flg) return;
        this.flg = false;
        var repeat = 1;
        window.ballsMap = {};
        this.ballsMnt.children.map(function (node) {
            return window.ballsMap[node.getComponent("Ball").id] = true;
        });
        if (this.brickLayout.newBrickLayout(repeat)) this.rebornCtrl();
        window.gameScore += repeat;
        if (typeof success == "function") success();
    },
    stopGame: function stopGame() {
        window.gameScore = window.gameScore1;
        cc.director.loadScene('over');
    },

    dbSetScore: function dbSetScore(score) {
        this.wxAddLayout.setScore(window.gameScore1);
    },
    dbGetScore: function dbGetScore() {
        return this.wxAddLayout.getScore();
    },
    addGold: function addGold(gold) {
        this.wxAddLayout.addGold(gold);
        this.gameView.updateGold(this.getGold());
    },
    subGold: function subGold(num, callBack) {
        var _this3 = this;

        var self = this;
        self.wxAddLayout.subGold(num, function (success) {
            if (success) self.gameView.updateGold(_this3.getGold());
            if (typeof callBack == "function") callBack(success);
        });
    },
    getGold: function getGold() {
        return this.wxAddLayout.getGold();
    },
    showBannerAd: function showBannerAd() {
        if (this._bannerAd) this._bannerAd.show();
    },
    hideBannerAd: function hideBannerAd() {
        if (this._bannerAd) this._bannerAd.hide();
    },
    onDestroy: function onDestroy() {
        this.physicsManager.enabled = false;
        this.hideBannerAd();
    }

});

cc._RF.pop();