"use strict";
cc._RF.push(module, '1b850wqbRlIMKo36AUwh9ga', 'BannerBlock');
// scripts/adb/BannerBlock.js

"use strict";

var bannerWidth = 300;
var bannerTop = 100;
var bannerId = "adunit-98121687e3c35615"; //广告id，自定义
var adTime = 180; //loop 周期

var wxBversionLess = function wxBversionLess(vs) {
    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
        var bVersion = wx.getSystemInfoSync().SDKVersion;
        var vs2vn = function vs2vn(vs) {
            return parseInt(vs.split(".").join("").slice(0, 3));
        };
        return vs2vn(bVersion) < vs2vn(vs);
    }
    return true;
};
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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},


    replace: function replace() {
        var old = this._bannerAd;
        this._bannerAd = this._prevAd;
        this._prevAd = this.create();
        this.refresh();
        if (old) {
            old.hide();
            old.destroy();
        }
    },
    //创建广告
    create: function create() {
        //if (cc.sys.platform == cc.sys.WECHAT_GAME ) {
        if (!wxBversionLess("2.0.4")) {
            var myWidth = 0; //屏幕宽度
            var myHeight = 0; //屏幕高度
            var adHeight = 0; //广告高度

            //得到屏幕尺

            var res = wx.getSystemInfoSync();
            myWidth = res.screenWidth;
            myHeight = res.screenHeight;
            console.log(res);

            var dh = myHeight - bannerTop;
            var dw = (myWidth - bannerWidth) / 2;
            var bannerAd = wx.createBannerAd({
                adUnitId: bannerId,
                style: {
                    left: dw,
                    top: dh,
                    width: bannerWidth
                    //height: 50,
                }
            });

            //监听隐藏广告，得到真实的广告高度
            //bannerAd.onResize(function (res) {
            //    adHeight = res.height;  //125
            //    dh = myHeight - adHeight;
            //    console.log("#############", adHeight);
            //})

            //显示广告
            //this._bannerAd = bannerAd;
            return bannerAd;
        }
    },

    //显示开关
    show: function show() {
        //if (this._bannerAd) this._bannerAd.show();
        this._showBannerAd = true;
        this.refresh();
    },
    hide: function hide() {
        //if (this._bannerAd) this._bannerAd.hide();
        this._showBannerAd = false;
        this.refresh();
    },
    //轮询开关
    startLoop: function startLoop() {
        this.replace();
        this.replace();
        this.show();
        this.schedule(this.replace, adTime);
    },
    stopLoop: function stopLoop() {
        this.unschedule(this.replace, this);
        //this.hide();
    },


    refresh: function refresh() {
        if (this._bannerAd) this._showBannerAd ? this._bannerAd.show() : this._bannerAd.hide();
    },
    destroyIt: function destroyIt() {
        if (this._bannerAd) {
            var old = this._bannerAd;
            this._bannerAd = null;
            old.hide();
            old.destroy();
        }
        if (this._prevAd) {
            var _old = this._prevAd;
            this._bannerAd = null;
            _old.hide();
            _old.destroy();
        }
    },
    onDestroy: function onDestroy() {
        this.unscheduleAllCallbacks();
        this.destroyIt();
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();