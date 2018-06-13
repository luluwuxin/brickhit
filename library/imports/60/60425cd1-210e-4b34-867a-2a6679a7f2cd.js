"use strict";
cc._RF.push(module, '60425zRIQ5LNIZ6KmZ5p/LN', 'Over');
// scripts/Over.js

"use strict";

var got = 10;
var common = require("Common");
var Const = require("Const");
var bannerWidth = Const.bannerWidth;
var bannerTop = Const.bannerTop;
cc.Class({
	extends: cc.Component,

	properties: {
		scoreLabel: cc.Label,
		bestLabel: cc.Label,
		share4Gold: cc.Node,
		help4Gold: cc.Node
	},
	// use this for initialization
	onLoad: function onLoad() {
		this.wxAddLayer = this.getComponent("wxAddLayer");
		//this.showOfficalAcc();
		if (window.bannerAd) {
			this._bannerAd = this.getComponent("BannerBlock");
			this._bannerAd.startLoop();
			this._bannerAd.stopLoop();
		}
	},
	start: function start() {
		this.show();
	},

	show: function show() {
		this.scoreLabel.string = window.gameScore;
		//上传分数
		console.log("push score ", window.gameScore);
		this.wxAddLayer.setScore(window.gameScore);
		this.bestLabel.string = this.wxAddLayer.getScore();
		//for check 
		//this.share4Gold.active 	= this.wxAddLayer.checkScore();
		//this.help4Gold.active 	= this.wxAddLayer.checkScore();
		this.share4Gold.active = false;
		this.help4Gold.active = false;
	},

	onBtnRestart: function onBtnRestart() {
		cc.director.loadScene('game');
	},
	onBtnHome: function onBtnHome() {
		cc.director.loadScene('start');
	},
	getRank: function getRank() {
		this.hideBannerAd();
		this.wxAddLayer.getFriendsRankBtn();
	},
	onBtnShare: function onBtnShare() {
		this.wxAddLayer.shareBtn();
		/*
  this.wxAddLayer.shareBtnWithScore(0, (success) => {
  	if (success) {
  			//刷新操作
  		if (cc.sys.platform === cc.sys.WECHAT_GAME) {
  					wx.showModal({
  				title: ' 成功',
  				content: "炫耀成功，获得" + got.toString() + "金币",
  				showCancel: false,
  				success: function (res) {
  				}
  			});
  				}
  	}
  	else {
  	}
  }, got);
  */
	},
	showOfficalAcc: function showOfficalAcc() {
		this.wxAddLayer.officalAccActive(true);
	},
	hiddenOfficalAcc: function hiddenOfficalAcc() {
		this.wxAddLayer.officalAccActive(false);
	},
	showBannerAd: function showBannerAd() {
		if (this._bannerAd) this._bannerAd.show();
	},
	hideBannerAd: function hideBannerAd() {
		if (this._bannerAd) this._bannerAd.hide();
	},
	onDestroy: function onDestroy() {
		this.hiddenOfficalAcc();
		this.hideBannerAd();
	}
});

cc._RF.pop();