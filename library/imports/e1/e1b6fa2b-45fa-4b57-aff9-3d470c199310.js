"use strict";
cc._RF.push(module, 'e1b6forRfpLV6/5PUcMGZMQ', 'rank');
// script/wx/rank/rank.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var urls = require('config').urls;
var config = require('config');
var util = require('../utils/util');

//// 类版本 全局函数太多可以使用类版本
var self = null;

var rank =
// 类似构成函数
function rank() {
    _classCallCheck(this, rank);

    this.loadRankWidget = function (target, name) {
        cc.loader.loadRes("wx/rankRes/rankWidget", cc.Prefab, function (err, prefab) {
            var rankWidget = cc.instantiate(prefab);
            target.node.addChild(rankWidget);
            //适配高 宽
            var _size = rankWidget.getContentSize();
            var tagSize = target.node.getContentSize();

            var scaleX = tagSize.width / _size.width;
            var scaleY = tagSize.height / _size.height;
            console.log("rankWidget Size", tagSize, _size, target.node.getScale());
            if (scaleX || scaleY) {
                var _scale = scaleX;
                if (scaleX > scaleY) {
                    _scale = scaleY;
                }
                rankWidget.setScale(scaleX, scaleY);
                self.adapterHeight("top", rankWidget, scaleX, scaleY, _scale);
                self.adapterHeight("rankScroll", rankWidget, scaleX, scaleY, _scale, "true");
                self.adapterHeight("rankScroll2", rankWidget, scaleX, scaleY, _scale, "true");
                // var top = cc.find("top",rankWidget);
                // if(top){
                //     top.setScale(1/scaleX * _scale,1/scaleY *_scale);
                // }

                // var rankScroll2 = cc.find("rankScroll2",rankWidget);
                // if(rankScroll2){
                //     rankScroll2.setScale(1/scaleX * _scale,1/scaleY *_scale);
                //     var scrollSize = rankScroll2.getContentSize();
                //     scrollSize.y = scrollSize.height*scaleY;
                //     rankScroll2.setContentSize(scrollSize.width,scrollSize.height);
                //     var _content = cc.find("viewport",rankScroll2);
                //     var contentSize = _content.getContentSize();
                //     contentSize.y = contentSize.height*scaleY;
                //     _content.setContentSize(contentSize.width,contentSize.height);
                // }
                // var rankScroll = cc.find("rankScroll",rankWidget);
                // if(rankScroll){
                //     rankScroll.setScale(1/scaleX * _scale,1/scaleY *_scale);
                // }
            } else {
                rankWidget.setContentSize(tagSize.width, tagSize.height);
            }

            var widget = rankWidget.getComponent(cc.Widget);
            widget.target = target.node;
            rankWidget.setPosition(cc.p(0, 0));

            rankWidget.active = false;
            name = name || "rankWidget";
            target[name] = rankWidget;
        });
    };

    this.loadQunRankWidget = function (target, name) {
        cc.loader.loadRes("wx/rankRes/qunRank", cc.Prefab, function (err, prefab) {

            var qunRankWidget = cc.instantiate(prefab);
            target.node.addChild(qunRankWidget);
            //适配高 宽
            var _size = qunRankWidget.getContentSize();
            var tagSize = target.node.getContentSize();
            var scaleX = tagSize.width / _size.width;
            var scaleY = tagSize.height / _size.height;
            if (scaleX || scaleY) {
                var _scale = scaleX;
                if (scaleX > scaleY) {
                    _scale = scaleY;
                }
                console.log("qunRankWidget", scaleX, scaleY, _size, tagSize);
                qunRankWidget.setScale(scaleX, scaleY);
                self.adapterHeight("top", qunRankWidget, scaleX, scaleY, _scale);
                self.adapterHeight("rankScroll", qunRankWidget, scaleX, scaleY, _scale, "true");
                // var top = cc.find("top",qunRankWidget);
                // if(top){
                //     top.setScale(1/scaleX * _scale,1/scaleY *_scale);
                // }
                // var rankScroll = cc.find("rankScroll",qunRankWidget);
                // if(rankScroll){
                //     rankScroll.setScale(1/scaleX * _scale,1/scaleY *_scale);
                // }
            } else {
                qunRankWidget.setContentSize(tagSize.width, tagSize.height);
            }

            qunRankWidget.setPosition(cc.p(0, 0));

            qunRankWidget.active = false;
            name = name || "qunRankWidget";
            target[name] = qunRankWidget;
        });
    };

    this.loadFriendRankWidget = function (target, name) {
        cc.loader.loadRes("wx/rankRes/friendRank", cc.Prefab, function (err, prefab) {
            var rankWidget = cc.instantiate(prefab);
            target.node.addChild(rankWidget);
            //适配高 宽
            var _size = rankWidget.getContentSize();
            var tagSize = target.node.getContentSize();

            var scaleX = tagSize.width / _size.width;
            var scaleY = tagSize.height / _size.height;
            console.log("friendRank Size", tagSize, _size, target.node.getScale());
            if (scaleX || scaleY) {
                var _scale = scaleX;
                if (scaleX > scaleY) {
                    _scale = scaleY;
                }
                rankWidget.setScale(scaleX, scaleY);
                self.adapterHeight("top", rankWidget, scaleX, scaleY, _scale);
                self.adapterHeight("myRankBg", rankWidget, scaleX, scaleY, _scale);
                self.adapterHeight("rankSp", rankWidget, scaleX, scaleY, _scale);
            } else {
                rankWidget.setContentSize(tagSize.width, tagSize.height);
            }

            rankWidget.setPosition(cc.p(0, 0));

            rankWidget.active = false;
            name = name || "friendRank";
            target[name] = rankWidget;
        });
    };

    this.adapterHeight = function (name, widget, scaleX, scaleY, _scale) {
        var isNeedSetContent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

        var _widget = cc.find(name, widget);
        if (_widget) {
            _widget.setScale(1 / scaleX * _scale, 1 / scaleY * _scale);
            if (isNeedSetContent) {
                self.adapterHeightContent(name, widget, scaleX, scaleY, _scale);
                self.adapterHeightContent("viewport", _widget, scaleX, scaleY, _scale);
            }
        }
    };

    this.adapterHeightContent = function (name, widget, scaleX, scaleY, _scale) {
        var _widget = cc.find(name, widget);
        if (_widget) {
            var _widgetSize = _widget.getContentSize();
            _widgetSize.height = _widgetSize.height * scaleY / _scale;
            _widget.setContentSize(_widgetSize.width, _widgetSize.height);
        }
    };

    this.getFriendRank = function (callBack) {
        var url = urls.user + "/friendrank";
        var param = {}; //config.getParam();
        util.request({
            url: url,
            data: param,
            method: 'GET',
            success: function success(res) {
                //服务器存储的用户数据
                console.log(res);
                if (callBack && typeof callBack == 'function') callBack(res.data);
            }
        });
    };

    this.getWorldRank = function (callBack) {
        var url = urls.user + "/worldrank";
        var param = {}; //config.getParam();
        util.request({
            url: url,
            data: param,
            method: 'GET',
            success: function success(res) {
                //服务器存储的用户数据
                console.log(res);
                if (callBack && typeof callBack == 'function') callBack(res.data);
            }
        });
    };

    this.getRank = function (callBack, isWeek) {
        var url = urls.user + "/rank";
        var _week = null;
        if (isWeek) {
            _week = 'isweek';
        }
        var param = {
            week: _week //config.getParam();
        };util.request({
            url: url,
            data: param,
            method: 'GET',
            success: function success(res) {
                //服务器存储的用户数据
                if (callBack && typeof callBack == 'function') callBack(res.data);
            },
            fail: function fail(res) {}
        });
    };

    this.getQunRank = function (groupid, callBack, isWeek) {
        var url = urls.user + "/grouprank";
        var _week = null;
        if (isWeek) {
            _week = 'isweek';
        }
        var param = {
            groupid: groupid,
            week: _week //config.getParam();
        };util.request({
            url: url,
            data: param,
            method: 'GET',
            success: function success(res) {
                //服务器存储的用户数据
                if (callBack && typeof callBack == 'function') callBack(res.data);
            },
            fail: function fail(res) {}
        });
    };

    this.getWeekRank = function (callBack, isWeek) {
        var url = urls.user + "/rank";
        var _week = null;
        if (isWeek) {
            _week = 'isweek';
        }
        var param = {
            groupid: groupId,
            week: _week //config.getParam();
        };util.request({
            url: url,
            data: param,
            method: 'GET',
            success: function success(res) {
                //服务器存储的用户数据
                if (callBack && typeof callBack == 'function') callBack(res.data);
            },
            fail: function fail(res) {}
        });
    };

    self = this;
}
/* *******添加rankLayer *******
**target为self（this）
**name 为你自己设置（默认rankWidget）
*/

// 获取群排行榜

//获取好友rank

// 获取世界rank

// 获取rank  好友跟世界rank 一起
// 现在使用此方法（以上两种弃用）
// isWeek为true 就是获取周 排行

// 获取群排名 isWeek为true 就是获取周群 排行

// 获取周排名
;

exports.default = rank;
;
/////////////////////////////////////////////////////
/////全局变量版本//////////////////////////////////
//////////////////////////////////////////////////
// const loadRankWidget = function(target){
//     cc.loader.loadRes("wx/rankRes/rankWidget",cc.Prefab,function(err,prefab){
//                 console.log(prefab)
//                 var rankWidget = cc.instantiate(prefab);
//                 target.node.addChild(rankWidget);
//                 rankWidget.active = false;
//                 target.rankWidget = rankWidget;
//             })
//   };
//   const getFriendRank = function(callBack){
//     var url = urls.user +"/friendrank"
//     var param = {}//config.getParam();
//     util.request({
//         url: url,
//         data: param,
//         method: 'GET',
//         success:res=>{
//             //服务器存储的用户数据
//             console.log(res)
//             if (callBack && typeof callBack == 'function') callBack(res.data)
//         },
//     })
// }

// const getWorldRank = function(callBack){
//     var url = urls.user +"/worldrank"
//     var param = {}//config.getParam();
//     util.request({
//         url: url,
//         data: param,
//         method: 'GET',
//         success:res=>{
//             //服务器存储的用户数据
//             console.log(res)
//             if (callBack && typeof callBack == 'function') callBack(res.data)
//         },
//     })
// }

// const getRank = function(callBack){
//   var url = urls.user +"/rank"
//   var param = {}//config.getParam();
//   util.request({
//       url: url,
//       data: param,
//       method: 'GET',
//       success:res=>{
//           //服务器存储的用户数据
//           console.log(res)
//           if (callBack && typeof callBack == 'function') callBack(res.data)
//       },
//       fail:res=>{

//       },
//   })
// }

//   module.exports = {
//     loadRankWidget: loadRankWidget,
//     getFriendRank:getFriendRank,
//     getWorldRank:getWorldRank,  
//     getRank:getRank,
//   }

module.exports = exports['default'];

cc._RF.pop();