(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/share/share.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dfdc48va/BI3JvpeHC4ZqVT', 'share', __filename);
// script/wx/share/share.js

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var urls = require('config').urls;
var config = require('config');
var global = require('global');
var globalFunc = require('globalFunc');
var util = require('../utils/util');
var consume = require('consume').getInstance();
var shareUtil = require('shareUtil').getInstance();
var self = null;

var share = function () {
  function share() {
    _classCallCheck(this, share);

    this.updateShareMenu = function () {
      console.log("updateShareMenu");
      if (cc.sys.platform == cc.sys.WECHAT_GAME) {
        wx.updateShareMenu({
          withShareTicket: true,
          success: function success(res) {
            console.log("updateShareMenu true res:", res);
          },
          fail: function fail(res) {
            console.log("updateShareMenu fail res:", res);
          },
          complete: function complete(res) {}
        });
      }
    };

    this.showShareMenu = function () {
      console.log("showShareMenu");
      if (cc.sys.platform == cc.sys.WECHAT_GAME) {
        wx.showShareMenu({
          withShareTicket: true,
          success: function success(res) {
            console.log("showShareMenu true res:", res);
          },
          fail: function fail(res) {
            console.log("showShareMenu fail res:", res);
          },
          complete: function complete(res) {}
        });
      }
    };

    this.onShareAppMessage = function () {
      if (cc.sys.platform == cc.sys.WECHAT_GAME) {
        wx.onShareAppMessage(function (res) {
          var _this = this;

          // 用户点击了“转发”按钮
          var _index = Math.random() > 0.5 ? 1 : 0;
          var _title = 0;
          var _titleIndex = Math.floor(Math.random() * 10) % config.shareTitles['1'].length;
          _title = config.shareTitles['1'][_titleIndex].title;
          return {
            title: _title,
            imageUrl: self._getImgUrl(_index),
            query: "uid=" + config.UID,
            success: function success(res) {
              console.log("onShareAppMessage success", res, self, _this);
              if (res.shareTickets) {
                if (res.shareTickets && res.shareTickets[0] && self) {
                  if (config.gamecenter_link) {
                    self.getShareInfo(res.shareTickets[0], self.shareGroup);
                  }
                }
              }
            },
            fail: function fail(res) {
              console.log(res);
            }
          };
        });
      }
    };

    this.shareGroup = function (groupid) {
      var url = urls.user + "/add_group";
      var param = {
        groupid: groupid
      };
      util.request({
        url: url,
        data: param,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: function success(res) {
          var d = res.data;
        },
        fail: function fail(er) {
          console.error(er);
        }
      });
    };

    this.getShareOpenGid = function (res, callBack) {
      var url = urls.share + "/getShareInfo";
      var param = {
        sessionKey: config.sessionkey,
        encryptedData: res.encryptedData,
        iv: res.iv
      };
      util.request({
        url: url,
        data: param,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: function success(res) {
          //服务器存储的用户数据
          console.log("send getShareInfo ", res);
          if (res.data && res.data.data && res.data.data.openGId) {
            //保存群的openGID;
            config.groupOpenGID = res.data.data.openGId;
            if (callBack && typeof callBack == 'function') callBack(res.data.data.openGId);
          }
        },
        fail: function fail(res) {
          console.log("send getShareInfo fail ", res);
        }
      });
    };

    this.getShareOpenGidLocal = function (res, callBack) {
      util.decodeOpenId(res, function (openid) {
        if (openid && callBack && typeof callBack == 'function') {
          callBack(openid);
        }
      });
    };

    this.getShareInfo = function (_shareTicket, callBack) {
      var _this2 = this;

      wx.getShareInfo({
        shareTicket: _shareTicket,
        success: function success(res) {
          //保存shareTicket
          config.shareTicket = _shareTicket;
          if (config.gamecenter_link) {
            _this2.getShareOpenGid(res, callBack);
          } else {
            // 解密拿到群openid后保存到本地    
            _this2.getShareOpenGidLocal(res, function (gopenid) {
              console.log('get group open id:', gopenid);
              shareUtil.setShareGroupInfo(gopenid);
            });
          }
        },
        fail: function fail(res) {
          console.log('getShareInfo fail', res);
        }
      });
    };

    this.shareAppMessage = function (callBack) {
      var score = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isSpecial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var obj = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var isPeople = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var wxAddLayer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var gold = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var isAssit = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

      self._shareAppMessage(callBack, score, isSpecial, obj, isPeople, gold, wxAddLayer, isAssit);
    };

    this.shareAppMessageWithRevived = function (callBack) {
      var score = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isSpecial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var obj = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var isPeople = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var wxAddLayer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var gold = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var isAssit = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

      self._shareAppMessage(callBack, score, isSpecial, obj, isPeople, gold, wxAddLayer, isAssit, true);
    };

    this.shareAppMessageWithAssit = function (callBack) {
      var score = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isSpecial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var obj = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var isPeople = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var wxAddLayer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var gold = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var isAssit = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : true;

      self._shareAppMessage(callBack, score, isSpecial, obj, isPeople, gold, wxAddLayer, isAssit);
    };

    this.shareAppMessageWithGold = function (callBack, score, gold, wxAddLayer) {
      var isSpecial = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var obj = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var isPeople = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var isAssit = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

      self._shareAppMessage(callBack, score, isSpecial, obj, isPeople, gold, wxAddLayer, isAssit);
    };

    this.shareAppMessageWithImgUrl = function (callBack) {
      var score = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isSpecial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var obj = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var isPeople = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var wxAddLayer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var gold = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var isAssit = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

      self._shareAppMessage(callBack, score, isSpecial, obj, isPeople, gold, wxAddLayer, isAssit);
    };

    this.shareAppMessageForGroup = function (callBack) {
      var score = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isSpecial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var obj = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var isPeople = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var wxAddLayer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var gold = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var isAssit = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

      self._shareAppMessage(callBack, score, isSpecial, obj, isPeople, gold, wxAddLayer, isAssit);
    };

    this.shareAppMessageWithSpecial = function (callBack, obj) {
      var score = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var isSpecial = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var isPeople = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var wxAddLayer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var gold = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var isAssit = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

      self._shareAppMessage(callBack, score, isSpecial, obj, isPeople, gold, wxAddLayer, isAssit);
      console.log("shareAppMessageWithSpecial");
    };

    this.addFriend = function (_appID) {
      var url = urls.user + "/add_friend";
      var param = {
        frienduid: _appID //config.getParam();
      };util.request({
        url: url,
        data: param,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: function success(res) {
          console.log("addFriend Success");
        }
      });
    };

    self = this;
    //this.shareTicket = ''  
    self._getStorage();
    self._url = [{ url: 'res/raw-assets/resources/share/share1.jpg' }, { url: 'res/raw-assets/resources/share/share2.jpg' }];
    this.updateShareMenu();
    this.showShareMenu();
    this.onShareAppMessage();
  }

  _createClass(share, [{
    key: '_getStorage',
    value: function _getStorage() {
      var _sharedGroupList = void 0;
      var sharedGroupListItem = cc.sys.localStorage.getItem('sharedGroupList');
      if (!sharedGroupListItem) {
        sharedGroupListItem = new Array();
        cc.sys.localStorage.setItem('sharedGroupList', JSON.stringify(sharedGroupListItem));

        _sharedGroupList = sharedGroupListItem;
      } else {
        _sharedGroupList = JSON.parse(sharedGroupListItem);
      }
      var i = _sharedGroupList.length;
      while (i--) {
        var groupInfo = _sharedGroupList[i];
        // 删除过期记录
        if (!self.isToday(groupInfo.timestamp)) {
          console.log('timestamp Invalid, not today:', groupInfo.timestamp);
          _sharedGroupList.splice(i, 1);
        }
      }
      config.shareGroupTime = _sharedGroupList.length;
      console.log("config.shareGroupTime", config.shareGroupTime, _sharedGroupList);
    }
  }, {
    key: '_setStorage',
    value: function _setStorage() {
      var groupInfo = {
        timestamp: new Date().getTime()
      };
      var _sharedGroupList = void 0;
      var sharedGroupListItem = cc.sys.localStorage.getItem('sharedGroupList');
      if (!sharedGroupListItem) {
        sharedGroupListItem = new Array();
        cc.sys.localStorage.setItem('sharedGroupList', JSON.stringify(sharedGroupListItem));

        _sharedGroupList = sharedGroupListItem;
      } else {
        _sharedGroupList = JSON.parse(sharedGroupListItem);
      }
      _sharedGroupList.push(groupInfo);

      config.shareGroupTime = _sharedGroupList.length;
      console.log('config.shareGroupTime,  today:', config.shareGroupTime);
      cc.sys.localStorage.setItem('sharedGroupList', JSON.stringify(_sharedGroupList));
    }
  }, {
    key: 'isToday',
    value: function isToday(time) {
      return new Date(time).toDateString() === new Date().toDateString();
    }
  }, {
    key: '_getImgUrl',
    value: function _getImgUrl(index) {
      return self._url[index].url;
    }
    // getShareTicket(){
    //   return this.shareTicket
    // };
    // 转发后； 点击 转发的卡片 会得到一个shareTicket 通过调用 wx.getShareInfo() 接口传入 shareTicket 可以获取群相关信

    //  右上角可以点击转发按钮

    //分享群

    /**
     *  share 炫耀成绩获得金币
     * 
     */

    /**
     *  share 个人/群
     * 
     */

    /**
     * share 分享给群
     */

    /**
     * 分享 特殊功能
     */

  }, {
    key: '_shareAppMessage',
    value: function _shareAppMessage() {
      var callBack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var score = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isSpecial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var obj = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var isPeople = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var gold = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var wxAddLayer = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

      var _this3 = this;

      var isAssit = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
      var isRevive = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;

      console.log("_shareAppMessage", callBack, score, isSpecial, isPeople, gold, wxAddLayer, isAssit, isRevive);

      var _index = Math.random() > 0.5 ? 1 : 0;
      var _title = 0;
      if (typeof score == 'number') {
        var _titleIndex = Math.floor(Math.random() * 10) % config.shareTitles['2'].length;
        _title = config.shareTitles['2'][_titleIndex].title;
        _title = globalFunc.getTextext({ title: _title, score: score });
      } else {
        var _titleIndex = Math.floor(Math.random() * 10) % config.shareTitles['1'].length;
        _title = config.shareTitles['1'][_titleIndex].title;
      }
      var randString = null;
      if (isAssit || isRevive) {
        randString = util.randomString();
        var _titleIndex = Math.floor(Math.random() * 10) % config.shareTitles['3'].length;
        _title = config.shareTitles['3'][_titleIndex].title;
      }
      wx.shareAppMessage({
        title: _title,
        imageUrl: self._getImgUrl(_index),
        query: isAssit ? "randStr=" + randString + "&uid=" + config.UID : "uid=" + config.UID,
        success: function success(res) {
          console.log("wx.shareAppMessage", res);
          var shareHasCallBack = false;
          if (!!!config.gamecenter_link) {
            if (isSpecial) {
              self._setStorage();
              if (!!!shareHasCallBack && callBack && typeof callBack == "function") {
                shareHasCallBack = true;
                callBack.call(obj);
              }
            }
            if (gold) {
              var shareWithGold = false;
              //let times = global.getStartGameTimes();
              //console.log(times,wxAddLayer._isShareWithGold);
              //if(times > config.startGameTimes){
              // 已获得一次金币,其他不获取
              if (wxAddLayer._isShareWithGold) {
                var isShareGold = Math.floor(Math.random() * 10) % 3;
                if (isShareGold === 1) {
                  consume.addGold(gold);
                  wxAddLayer._isShareWithGold = false;
                  shareWithGold = true;
                };
              }
              //}
              if (!!!shareHasCallBack && callBack && typeof callBack == "function") {
                shareHasCallBack = true;
                callBack.call(obj, shareWithGold);
              }
            }
          }
          if (isAssit) {
            global.addRandString(randString);
            if (!!!shareHasCallBack && callBack && typeof callBack == "function") {
              shareHasCallBack = true;
              callBack.call(obj);
            }
          }
          if (isRevive) {
            global.addRandString(randString);
            if (!!!shareHasCallBack && callBack && typeof callBack == "function") {
              shareHasCallBack = true;
              callBack.call(obj);
            }
          }
          var isGroup = false;
          if (res.shareTickets && res.shareTickets[0]) {
            if (config.gamecenter_link) {
              _this3.getShareInfo(res.shareTickets[0], _this3.shareGroup);
            }
            //保存shareTicket
            config.shareTicket = res.shareTickets[0];
            if (!!!shareHasCallBack && callBack && typeof callBack == "function") {
              shareHasCallBack = true;
              isGroup = true;
              callBack.call(obj, isGroup);
            }
          };

          if (isPeople) {
            //console.log("getShareInfo",isSpecial)
            if (!!!shareHasCallBack && callBack && typeof callBack == "function") {
              shareHasCallBack = true;
              callBack.call(obj);
            }
          } else {
            if (!!!shareHasCallBack && callBack && typeof callBack == "function") {
              shareHasCallBack = true;
              callBack.call(obj, isGroup);
            }
          }
          if (score) {
            if (!!!shareHasCallBack && callBack && typeof callBack == "function") {
              shareHasCallBack = true;
              callBack.call(obj);
            }
          }
        },
        fail: function fail(res) {
          console.log("shareAppMessage fail", res);
        }
      });
    }
  }]);

  return share;
}();

exports.default = share;
;

// // 转发后； 点击 转发的卡片 会得到一个shareTicket 通过调用 wx.getShareInfo() 接口传入 shareTicket 可以获取群相关信
// const  updateShareMenu = function(){
//   console.log("updateShareMenu")
//   if (cc.sys.platform == cc.sys.WECHAT_GAME){
//     wx.updateShareMenu({
//       withShareTicket: true,
//       success: function(res) {
//         console.log("updateShareMenu true res:",res)
//       },
//       fail: function(res) 
//       {
//         console.log("updateShareMenu fail res:",res)
//       },
//       complete: function(res) {},
//     })
//   }
// }(); 
// const  showShareMenu = function(){
//   console.log("showShareMenu")
//   if (cc.sys.platform == cc.sys.WECHAT_GAME){
//     wx.showShareMenu({
//       withShareTicket: true,
//       success: function(res) {
//         console.log("showShareMenu true res:",res)
//       },
//       fail: function(res) 
//       {
//         console.log("showShareMenu fail res:",res)
//       },
//       complete: function(res) {},
//     })
//   }
// }(); 
// const onShareAppMessage = function(){
//   if (cc.sys.platform == cc.sys.WECHAT_GAME){ 
//     console.log("onShareAppMessage")
//     wx.onShareAppMessage(function (res) {
//       console.log("onShareAppMessage",res)
//       // 用户点击了“转发”按钮
//       return  {
//         //title: '转发标题',
//         imageUrl: canvas.toTempFilePathSync({
//           destWidth: 500,
//           destHeight: 400
//         }),
//         query:{
//           key1:123456,

//         },
//         success:res=>{

//         if (res.shareTickets) {
//             wx.getShareInfo({
//               // 请问这里的shareTickets为什么是数组类型，并不允许或出现一次转发多个群组的情况啊
//               // 如果是有其他使用情况，还请做说明，指点指点，谢谢。
//               shareTicket: res.shareTickets[0],
//               success:er=>{
//                 console.log(er)
//               },
//               fail() { }
//             })
//           }
//         },
//         fail:res=>{
//           console.log(res)
//         }
//       }
//     })
//   }
// }();
//   //分享群
// const shareGroup = function(groupid){
//     var url = urls.user +"/add_group";
//     var param = {
//         groupid: groupid,
//       };
//     util.request({
//         url: url,
//         data: param,
//         header: { 'content-type': 'application/x-www-form-urlencoded' },
//         method: 'POST',
//         success:res=>{
//             console.log("add_group Success")
//             var d = res.data;
//             console.log(d);
//         },
//         fail: function (er) {
//             console.error(er);
//           }
//     })      
// };
// const getShareInfo = function(res,callBack){
//   wx.getShareInfo({
//     shareTicket:res.shareTickets[0],
//     success:res=>{
//       var url = urls.share +"/getShareInfo";
//       var param = {
//         sessionKey:config.sessionkey,
//         encryptedData:res.encryptedData,
//         iv:res.iv,
//       }
//       util.request({
//           url: url,
//           data: param,
//           header: { 'content-type': 'application/x-www-form-urlencoded' },
//           method: 'POST',
//           success:res=>{
//               //服务器存储的用户数据
//               console.log("send getShareInfo ",res)
//               if (callBack && typeof callBack == 'function') callBack(res.data.data.openGId)
//           },
//           fail:res=>{

//           },
//       })            
//     },
//     fail:res=>{
//       console.log('getShareInfo fail',res)
//     }
//   });
// };
// const shareAppMessage = function(uid){
//   uid = config.UID;
//   console.log("shareAppMessage",uid)
//   wx.shareAppMessage( {
//     title: '转发标题',
//     imageUrl: canvas.toTempFilePathSync({
//       destWidth: 500,
//       destHeight: 400
//     }),
//     query:{
//       uid: uid ,
//     },
//     success:res=>{
//       console.log("shareAppMessage",res);
//       if (res.shareTickets && res.shareTickets[0]){
//         console.log('shareAppMessage getShareInfo')
//         getShareInfo(res,shareGroup); 
//       }

//     },
//     fail:res=>{
//       console.log("shareAppMessage fail",res)
//     }
//   });
// };
// const addFriend = function(_appID){
//   var url = urls.user +"/add_friend"
//   var param = {
//     appid :_appID,
//     frienduid :"chen",
//   }//config.getParam();
//   util.request({
//       url: url,
//       data: param,
//       header: { 'content-type': 'application/x-www-form-urlencoded' },
//       method: 'POST',
//       success:res=>{
//           console.log("addFriend Success")
//       }
//   })
// };


// module.exports = {  
//   shareAppMessage: shareAppMessage,
//   getShareInfo: getShareInfo,
//   addFriend: addFriend,
//   shareGroup:shareGroup,
// }

module.exports = exports['default'];

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
        //# sourceMappingURL=share.js.map
        