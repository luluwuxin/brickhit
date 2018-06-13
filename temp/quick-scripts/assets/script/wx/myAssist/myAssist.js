(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/myAssist/myAssist.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a74cbzqUKxMK7jwlQeEUtDh', 'myAssist', __filename);
// script/wx/myAssist/myAssist.js

"use strict";

var self = null;
var myAssist = cc.Class({
    statics: {
        instance: null,
        getInstance: function getInstance() {
            if (myAssist.instance == null) {
                myAssist.instance = new myAssist();
            }
            return myAssist.instance;
        }
    },

    ctor: function ctor() {
        self = this;
        //this._loadMyssistWidget();
    },
    _loadMyssistWidget: function _loadMyssistWidget(callBack) {
        cc.loader.loadRes("wx/myAssit/assistWiiget", cc.Prefab, function (err, prefab) {
            self._myAssistWidgetPrefab = prefab;
            if (callBack) {
                callBack();
            }
        });
    },

    loadMyAssistWidget: function loadMyAssistWidget(target, name) {
        cc.loader.loadRes("wx/myAssit/assistWiiget", cc.Prefab, function (err, prefab) {
            var rankWidget = cc.instantiate(prefab);
            target.node.addChild(rankWidget);
            //适配高 宽
            var _size = rankWidget.getContentSize();
            var tagSize = target.node.getContentSize();

            var scaleX = tagSize.width / _size.width;
            var scaleY = tagSize.height / _size.height;
            if (scaleX || scaleY) {
                var _scale = scaleX;
                if (scaleX > scaleY) {
                    _scale = scaleY;
                }
                rankWidget.setScale(scaleX, scaleY);
                self.adapterHeight("ui", rankWidget, scaleX, scaleY, _scale);
                // self.adapterHeight("myRankBg",rankWidget,scaleX,scaleY,_scale);
                // self.adapterHeight("rankSp",rankWidget,scaleX,scaleY,_scale);                   
            } else {
                rankWidget.setContentSize(tagSize.width, tagSize.height);
            }

            rankWidget.setPosition(cc.p(0, 0));

            rankWidget.active = false;
            name = name || "myAssistWidget";
            target[name] = rankWidget;
            // var loadFunc = function(){
            //     var rankWidget = cc.instantiate(self._myAssistWidgetPrefab);
            //     target.node.addChild(rankWidget);
            //     //适配高 宽
            //     var _size = rankWidget.getContentSize();
            //     var tagSize = target.node.getContentSize();

            //     var scaleX = tagSize.width/_size.width;
            //     var scaleY = tagSize.height/_size.height;
            //     if(scaleX || scaleY){
            //         var _scale = scaleX;
            //         if(scaleX > scaleY){
            //             _scale = scaleY;  
            //         }
            //         rankWidget.setScale(scaleX,scaleY);
            //         // self.adapterHeight("top",rankWidget,scaleX,scaleY,_scale);
            //         // self.adapterHeight("myRankBg",rankWidget,scaleX,scaleY,_scale);
            //         // self.adapterHeight("rankSp",rankWidget,scaleX,scaleY,_scale);                   

            //     }else{
            //         rankWidget.setContentSize(tagSize.width,tagSize.height);  
            //     }

            //     rankWidget.setPosition(cc.p(0,0))

            //     rankWidget.active = false;
            //     name = name || "myAssistWidget";
            //     target[name] = rankWidget;
            // }
            // if(!!!self._myAssistWidgetPrefab){
            //     self._loadMyssistWidget(loadFunc); 
            // }else{
            //     loadFunc();
            // }
        });
    },
    loadAssistLayerTwo: function loadAssistLayerTwo(target, name) {
        cc.loader.loadRes("wx/myAssit/assistLayerTwo", cc.Prefab, function (err, prefab) {
            var rankWidget = cc.instantiate(prefab);
            target.node.addChild(rankWidget);
            //适配高 宽
            var _size = rankWidget.getContentSize();
            var tagSize = target.node.getContentSize();

            var scaleX = tagSize.width / _size.width;
            var scaleY = tagSize.height / _size.height;
            if (scaleX || scaleY) {
                var _scale = scaleX;
                if (scaleX > scaleY) {
                    _scale = scaleY;
                }
                rankWidget.setScale(scaleX, scaleY);
                self.adapterHeight("ui", rankWidget, scaleX, scaleY, _scale);
                // self.adapterHeight("myRankBg",rankWidget,scaleX,scaleY,_scale);
                // self.adapterHeight("rankSp",rankWidget,scaleX,scaleY,_scale);                   
            } else {
                rankWidget.setContentSize(tagSize.width, tagSize.height);
            }

            rankWidget.setPosition(cc.p(0, 0));

            rankWidget.active = false;
            name = name || "assistLayerTwo";
            target[name] = rankWidget;
        });
    },
    adapterHeight: function adapterHeight(name, widget, scaleX, scaleY, _scale) {
        var isNeedSetContent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

        var _widget = cc.find(name, widget);
        if (_widget) {
            _widget.setScale(1 / scaleX * _scale, 1 / scaleY * _scale);
            if (isNeedSetContent) {
                self.adapterHeightContent(name, widget, scaleX, scaleY, _scale);
                self.adapterHeightContent("viewport", _widget, scaleX, scaleY, _scale);
            }
        }
    },
    adapterHeightContent: function adapterHeightContent(name, widget, scaleX, scaleY, _scale) {
        var _widget = cc.find(name, widget);
        if (_widget) {
            var _widgetSize = _widget.getContentSize();
            _widgetSize.height = _widgetSize.height * scaleY / _scale;
            _widget.setContentSize(_widgetSize.width, _widgetSize.height);
        }
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
        //# sourceMappingURL=myAssist.js.map
        