(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/match/matchManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2317ehcyMdOFIV1HowYmJRi', 'matchManager', __filename);
// script/wx/match/matchManager.js

'use strict';

var match = require('match');
var share = require('share');

var MatchManager = cc.Class({
    statics: {
        instance: null,
        getInstance: function getInstance() {
            if (MatchManager.instance == null) {
                MatchManager.instance = new MatchManager();
            }
            return MatchManager.instance;
        }
    },

    ctor: function ctor() {
        var _this = this;

        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            console.log('match manager be constructed');

            this.launchOpt = wx.getLaunchOptionsSync();
            console.log('match manager be created, launchOption:', this.launchOpt);

            this.target = null;
            this.matchData = null;
            this.layerIndex = 18000;
            this._shareTicket = null;

            // 微信设置
            wx.showShareMenu({
                withShareTicket: true
            });

            // 设置 withShareTicket: true
            wx.updateShareMenu({
                withShareTicket: true
            });

            wx.onShow(function (res) {
                if (!_this.target) {
                    console.log('wx show game false: no target');
                    return;
                }

                console.log('wx show game again:', res);
                if (Object.keys(res.query).length > 0) {
                    _this.launchOpt.query = res.query;
                    _this.launchOpt.shareTicket = res.shareTicket;
                    console.log('on show launchOpt:', _this.launchOpt);

                    _this.checkEnter();
                }
            });

            wx.onHide(function () {
                console.log('wx game is hide');
            });
        }
    },

    setTarget: function setTarget(target) {
        this.target = target;
    },

    update: function update() {
        var _this2 = this;

        // 判断是否从群分享的卡片进来, 是的话就不向服务器请求match信息
        if (this.checkEnter()) {
            console.log('got match info from LaunchOption');
            return;
        }

        console.log('getting match info from server .....');
        // 主动向服务器获取match信息
        match.getMatchInfo(function (data) {
            // 201 为没有拿到比赛数据
            if (!!data.code && data.code == 201) {
                console.log('no match now');
            } else {
                // 拿到活动，游戏界面显示红包icon
                _this2.showMatchHongbaoIcon(data);
            }
        });
    },

    /**
     * LaunchOption: {
     *      scene: number,
     *      query: Object,
     *      isSticky: boolean,
     *      shareTicket: string
     * }
     */
    checkEnter: function checkEnter() {
        console.log('check enter, matchid:', this.launchOpt.query.matchId);
        if (!!this.launchOpt.query.matchId && !!this.launchOpt.shareTicket) {
            // 是从群里卡片点进来的
            this.matchData = {
                _id: this.launchOpt.query.matchId,
                starttime: this.launchOpt.query.starttime,
                endtime: this.launchOpt.query.endtime,
                limitscore: this.launchOpt.query.limitscore
            };

            this.getQunRankInfo(this.launchOpt.shareTicket);

            return true;
        } else {
            return false;
        }
    },

    getQunRankInfo: function getQunRankInfo(shareTicket) {
        var _this3 = this;

        this._shareTicket = shareTicket;
        match.setHasMatch(true);

        // 之后使用这个接口
        // share.shareGroup(shareTicket);

        // 通过返回的shareTicket获取群相关的信息
        wx.getShareInfo({
            shareTicket: shareTicket,
            success: function success(res) {
                console.log('get share info success, res:', res);

                // 根据群里的信息初始化并显示MatchRankLayer
                _this3.showMatchRankLayer(res.encryptedData);
            },
            fail: function fail(res) {
                console.log('get share info fail, res:', res);
            }
        });
    },

    showMatchHongbaoIcon: function showMatchHongbaoIcon(data) {
        if (!!!this.target.hongbaoIcon) {
            console.log('hongbaoIcon not be loaded yet');
            return;
        }

        this.matchData = data;
        this.target.hongbaoIcon.active = true;
        this.target.hongbaoIcon.on('click', this.showMatchShareLayer, this);
    },

    showMatchShareLayer: function showMatchShareLayer() {
        this.target.matchShareWidget.active = true;
        this.target.matchShareWidget.getComponent('matchLayer').init(this.matchData);
    },

    showMatchRankLayer: function showMatchRankLayer(rankData) {
        var mobData = [{ name: 'aaa', score: 100 }, { name: 'bbb', score: 90 }, { name: 'ccc', score: 80 }, { name: 'ddd', score: 70 }, { name: 'eee', score: 60 }, { name: 'fff', score: 50 }, { name: 'ggg', score: 40 }, { name: 'hhh', score: 30 }, { name: 'iii', score: 20 }, { name: 'jjj', score: 10 }];
        this.target.matchRankWidget.active = true;
        this.target.matchRankWidget.getComponent('matchRankLayer').init(this.matchData, mobData);
    },

    // 供外部调用, 主动来显示小比赛排行榜
    showMatchRankView: function showMatchRankView() {
        if (!!!this._shareTicket) {
            console.log('shareTicket not exist');
            return;
        }

        this.getQunRankInfo(this._shareTicket);
    },

    loadMatchHongbaoIcon: function loadMatchHongbaoIcon(target, name) {
        var path = "wx/matchRes/hongbaoIcon";
        name = name || "hongbaoIcon";
        this._loadPrefab(path, target, name, this.layerIndex);
    },

    loadMatchShareWidget: function loadMatchShareWidget(target, name) {
        var path = "wx/matchRes/matchShareWidget";
        name = name || "matchShareWidget";
        this._loadPrefab(path, target, name, this.layerIndex + 1);
    },

    loadMatchRankWidget: function loadMatchRankWidget(target, name) {
        var path = "wx/matchRes/matchRankWidget";
        name = name || "matchRankWidget";
        this._loadPrefab(path, target, name, this.layerIndex + 2);
    },

    _loadPrefab: function _loadPrefab(path, target, name, layer) {
        cc.loader.loadRes(path, cc.Prefab, function (err, prefab) {
            var widget = cc.instantiate(prefab);
            target.node.addChild(widget);

            widget.active = false;
            target[name] = widget;

            widget.setLocalZOrder(layer);
        });
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
        //# sourceMappingURL=matchManager.js.map
        