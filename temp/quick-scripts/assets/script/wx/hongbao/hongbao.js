(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/hongbao/hongbao.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9b3ffnMD9pARIRbMOiELa/0', 'hongbao', __filename);
// script/wx/hongbao/hongbao.js

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var urls = require('config').urls;
var config = require('config');
var util = require('../utils/util');

//// 类版本 全局函数太多可以使用类版本

var hongbao =
// 类似构成函数
function hongbao() {
  _classCallCheck(this, hongbao);

  this.loadHongbaoWidget = function (target, name) {
    cc.loader.loadRes("wx/hongbao/hongbaoWidget", cc.Prefab, function (err, prefab) {
      console.log(prefab);
      var hongbaoWidget = cc.instantiate(prefab);
      target.node.addChild(hongbaoWidget);
      // //适配高 宽
      // var _size = hongbaoWidget.getContentSize();
      // var tagSize = target.node.getContentSize();
      // var scaleX = tagSize.width/_size.width;
      // var scaleY = tagSize.height/_size.height;
      // hongbaoWidget.setScale(scaleX,1)

      hongbaoWidget.setPosition(cc.p(0, 0));
      hongbaoWidget.active = false;
      name = name || "hongbaoWidget";
      target[name] = hongbaoWidget;
    });
  };

  this.createHongbao = function (_price, _num) {
    var url = urls.hongbao + "/create_hongbao";
    var param = {
      money: _price,
      peoplecount: _num,
      type: 1,
      blob: {}
    };
    util.request({
      url: url,
      data: param,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function success(res) {
        console.log("create_hongbao Success");
        var d = res.data;
        console.log(d);
        util.pay(_price / 100, null, null, null);
      },
      fail: function fail(er) {
        console.error(er);
      }
    });
  };

  this.lingHongbao = function (_hongbaoId, _command) {
    var url = urls.hongbao + "/ling_hongbao";
    var param = {
      hongbaoId: _hongbaoId,
      command: _command
    };
    util.request({
      url: url,
      data: param,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function success(res) {
        console.log("ling_hongbao Success");
        var d = res.data;
        console.log(d);
        //util.pay(_price/100, null, null, null);
      },
      fail: function fail(er) {
        console.error(er);
      }
    });
  };

  this.getHongbaoInfo = function (_hongbaoId, _command) {
    var url = urls.hongbao + "/get_hongbaoInfo";
    var param = {
      hongbaoId: _hongbaoId,
      command: _command
    };
    util.request({
      url: url,
      data: param,
      success: function success(res) {
        console.log("get_hongbaoInfo Success", res);
        // var d = res.data;
        // console.log(d);
        // util.pay(_price/100, null, null, null);
      },
      fail: function fail(er) {
        console.error(er);
      }
    });
  };

  this.getHongBaoGetInfos = function (_hongbaoId, _command) {
    var url = urls.hongbao + "/get_HongBaoGetInfos";
    var param = {};
    util.request({
      url: url,
      data: param,
      //header: { 'content-type': 'application/x-www-form-urlencoded' },
      //method: 'POST',
      success: function success(res) {
        console.log("get_HongBaoGetInfos Success", res);
        // var d = res.data;
        // console.log(d);
        // util.pay(_price/100, null, null, null);
      },
      fail: function fail(er) {
        console.error(er);
      }
    });
  };

  this.getHongBaoSendInfos = function (_hongbaoId, _command) {
    var url = urls.hongbao + "/get_HongBaoSendInfos";
    var param = {};
    util.request({
      url: url,
      data: param,
      success: function success(res) {
        console.log("get_HongBaoSendInfos Success", res);
        // var d = res.data;
        // console.log(d);
        // util.pay(_price/100, null, null, null);
      },
      fail: function fail(er) {
        console.error(er);
      }
    });
  };
}

//领取红包


//查询某个红包信息


//查询所有领取的红包信息


//查询所有创建的红包信息
;

// const loadHongbaoWidget = function(target){
//     cc.loader.loadRes("wx/hongbao/hongbaoWidget",cc.Prefab,function(err,prefab){
//                 console.log(prefab)
//                 var hongbaoWidget = cc.instantiate(prefab);
//                 target.node.addChild(hongbaoWidget);
//                 hongbaoWidget.active = false;
//                 target.hongbaoWidget = hongbaoWidget;
//             })
//   };

// const createHongbao = function(_price, _num){
//     var url = urls.hongbao +"/create_hongbao";
//     var param = {
//         money: _price,
//         peoplecount: _num,
//         type: 1,
//         blob: {
//         }
//       };
//     util.request({
//         url: url,
//         data: param,
//         header: { 'content-type': 'application/x-www-form-urlencoded' },
//         method: 'POST',
//         success:res=>{
//             console.log("create_hongbao Success")
//             var d = res.data;
//             console.log(d);
//             util.pay(_price/100, null, null, null);
//         },
//         fail: function (er) {
//             console.error(er);
//           }
//     })
//   };

//   //领取红包
//   const lingHongbao = function(_hongbaoId, _command){
//     var url = urls.hongbao +"/ling_hongbao";
//     var param = {
//         hongbaoId: _hongbaoId,
//         command: _command,
//       };
//     util.request({
//         url: url,
//         data: param,
//         header: { 'content-type': 'application/x-www-form-urlencoded' },
//         method: 'POST',
//         success:res=>{
//             console.log("ling_hongbao Success")
//             var d = res.data;
//             console.log(d);
//             //util.pay(_price/100, null, null, null);
//         },
//         fail: function (er) {
//             console.error(er);
//           }
//     })
//   };

// //查询某个红包信息
//   const getHongbaoInfo = function(_hongbaoId, _command){
//     var url = urls.hongbao +"/get_hongbaoInfo";
//     var param = {
//         hongbaoId: _hongbaoId,
//         command: _command,
//       };
//     util.request({
//         url: url,
//         data: param,
//         success:res=>{
//             console.log("get_hongbaoInfo Success",res)
//             // var d = res.data;
//             // console.log(d);
//             // util.pay(_price/100, null, null, null);
//         },
//         fail: function (er) {
//             console.error(er);
//           }
//     })
//   };

//     //查询所有领取的红包信息
//   const getHongBaoGetInfos = function(_hongbaoId, _command){
//     var url = urls.hongbao +"/get_HongBaoGetInfos";
//     var param = { };
//     util.request({
//         url: url,
//         data: param,
//         //header: { 'content-type': 'application/x-www-form-urlencoded' },
//         //method: 'POST',
//         success:res=>{
//             console.log("get_HongBaoGetInfos Success",res)
//             // var d = res.data;
//             // console.log(d);
//             // util.pay(_price/100, null, null, null);
//         },
//         fail: function (er) {
//             console.error(er);
//           }
//     })
//   };

// //查询所有创建的红包信息
//   const getHongBaoSendInfos = function(_hongbaoId, _command){
//     var url = urls.hongbao +"/get_HongBaoSendInfos";
//     var param = {
//       };
//     util.request({
//         url: url,
//         data: param,
//         success:res=>{
//             console.log("get_HongBaoSendInfos Success",res)
//             // var d = res.data;
//             // console.log(d);
//             // util.pay(_price/100, null, null, null);
//         },
//         fail: function (er) {
//             console.error(er);
//           }
//     })
//   };

//   module.exports = {
//     loadHongbaoWidget:loadHongbaoWidget,
//     createHongbao: createHongbao,
//     lingHongbao: lingHongbao,
//     getHongbaoInfo: getHongbaoInfo,
//     getHongBaoGetInfos: getHongBaoGetInfos,
//     getHongBaoSendInfos: getHongBaoSendInfos,

//   }


exports.default = hongbao;
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
        //# sourceMappingURL=hongbao.js.map
        