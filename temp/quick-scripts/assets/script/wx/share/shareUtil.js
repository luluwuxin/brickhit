(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/share/shareUtil.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd1be6Y5tD1PwKlKmhPkmJ85', 'shareUtil', __filename);
// script/wx/share/shareUtil.js

'use strict';

var config = require('config');
var util = require('util');
// var Share = require('share');

var ShareUtil = cc.Class({
    statics: {
        instance: null,
        getInstance: function getInstance() {
            if (ShareUtil.instance == null) {
                ShareUtil.instance = new ShareUtil();
            }
            return ShareUtil.instance;
        }
    },

    ctor: function ctor() {
        this.sharedGroupList = null;
        this.loadShareGroupInfo();
    },

    loadShareGroupInfo: function loadShareGroupInfo() {
        // let _sharedGroupList = JSON.parse(cc.sys.localStorage.getItem('sharedGroupList'));
        var _sharedGroupList = void 0;
        var sharedGroupListItem = cc.sys.localStorage.getItem('sharedGroupList');
        if (!sharedGroupListItem) {
            sharedGroupListItem = new Array();
            cc.sys.localStorage.setItem('sharedGroupList', JSON.stringify(sharedGroupListItem));

            _sharedGroupList = sharedGroupListItem;
        } else {
            _sharedGroupList = JSON.parse(sharedGroupListItem);
        }

        console.log('loadShareGroupInfo group:', _sharedGroupList);
        var i = _sharedGroupList.length;
        while (i--) {
            var groupInfo = _sharedGroupList[i];
            // 删除过期记录
            if (!this.isToday(groupInfo.timestamp)) {
                console.log('timestamp Invalid, not today:', groupInfo.timestamp);
                _sharedGroupList.splice(i, 1);
            }
        }

        this.sharedGroupList = _sharedGroupList;
        config.shareGroupTime = _sharedGroupList.length;
        cc.sys.localStorage.setItem('sharedGroupList', JSON.stringify(this.sharedGroupList));

        console.log('loaded shareGroupTime:', config.shareGroupTime);
    },

    setShareGroupInfo: function setShareGroupInfo(openGID) {
        var i = this.sharedGroupList.length;
        while (i--) {
            var groupInfo = this.sharedGroupList[i];
            // 删除过期记录
            if (!this.isToday(groupInfo.timestamp)) {
                console.log('timestamp Invalid, not today, will be delete:', groupInfo.timestamp);
                this.sharedGroupList.splice(i, 1);
            }
        }

        var exist = false;
        for (var _i = 0; _i < this.sharedGroupList.length; _i++) {
            if (this.sharedGroupList[_i].openGID == openGID) {
                exist = true;
                break;
            }
        }

        // 新的群id
        if (!exist) {
            console.log('group open id will be saved:', openGID);
            var _groupInfo = {
                openGID: openGID,
                timestamp: new Date().getTime()
            };
            this.sharedGroupList.push(_groupInfo);

            config.shareGroupTime = this.sharedGroupList.length;
            cc.sys.localStorage.setItem('sharedGroupList', JSON.stringify(this.sharedGroupList));
        } else {
            console.log('group open id already exist:', openGID);
        }
    },

    isToday: function isToday(time) {
        return new Date(time).toDateString() === new Date().toDateString();
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
        //# sourceMappingURL=shareUtil.js.map
        