(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/savePhotos/saveOffical.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1e3dd8w1vJFkbpRAk9Cv42H', 'saveOffical', __filename);
// script/wx/savePhotos/saveOffical.js

'use strict';

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

    // onLoad () {},

    start: function start() {
        this.node.active = true;
    },
    saveOffical: function saveOffical() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.saveImageToPhotosAlbum({
                filePath: 'res/raw-assets/resources/wx/savePhotos/res/offical.png',
                success: function success(result) {
                    console.log("success");
                    console.log(result);
                    wx.showModal({
                        title: '怎么扫描二维码？',
                        content: '图片保存相册后，点击微信中的扫一扫，然后点击右上角的相册，从相册中选取这张图片即可！',
                        showCancel: false,
                        success: function success(res) {}
                    });
                },
                fail: function fail(result) {
                    console.log(result);
                    wx.getSetting({
                        success: function success(res) {
                            if (!res.authSetting['scope.writePhotosAlbum']) {
                                wx.showModal({
                                    title: '保存失败',
                                    content: '是否打开保存相册权限？',
                                    success: function success(res) {
                                        if (res.confirm) {
                                            wx.openSetting({});
                                        }
                                    }
                                });
                            } else {
                                //保存失败
                                wx.showModal({
                                    title: '保存失败',
                                    showCancel: false,
                                    success: function success(res) {}
                                });
                            }
                        }
                    });
                }
            });
        }
    },
    closeEvent: function closeEvent() {
        this.node.active = false;
    }

    // update (dt) {},

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
        //# sourceMappingURL=saveOffical.js.map
        