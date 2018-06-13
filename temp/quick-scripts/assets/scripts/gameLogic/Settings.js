(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/gameLogic/Settings.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a4b7fcDjW5OXYOg4v6UAbfE', 'Settings', __filename);
// scripts/gameLogic/Settings.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
/*
FOOD_TYPE: {
        TYPE_BOOM: 1,         //炸弹
        TYPE_BALL: 2,         //分裂
        TYPE_BUFF :3,         //BUFF

        TYPE_BRICK:100,        //砖块
        TYPE_NULL: 101,         //空

    },

    BUFF_TYPE:{
        LANG15: 1,  //  1.5倍长度
        SHORT15: 2, //  1/1.5 倍长度
        REVERSE: 3, //  反向操作
    },
    */

var buffType = require("Const").BUFF_TYPE;
var foodType = require("Const").FOOD_TYPE;
var brick = [//砖块出现概率控制
{ score: 10, config: [{ type: foodType.TYPE_BRICK, pList: [[2, 50], [3, 30], [4, 20]] }, { type: foodType.TYPE_BOOM, pList: [[0, 50], [1, 50]] }, { type: foodType.TYPE_BALL, pList: [[0, 30], [1, 70]] }, { type: foodType.TYPE_BUFF, pList: [[0, 30], [1, 70]] }], hppl: [[[1, 2], 80], [[2, 3], 20]] }, { score: 40, config: [{ type: foodType.TYPE_BRICK, pList: [[2, 50], [3, 30], [4, 20]] }, { type: foodType.TYPE_BOOM, pList: [[0, 50], [1, 50]] }, { type: foodType.TYPE_BALL, pList: [[0, 30], [1, 70]] }, { type: foodType.TYPE_BUFF, pList: [[0, 30], [1, 70]] }], hppl: [[[1, 2], 80], [[2, 3], 20]] }, { score: 70, config: [{ type: foodType.TYPE_BRICK, pList: [[2, 50], [3, 30], [4, 20]] }, { type: foodType.TYPE_BOOM, pList: [[0, 50], [1, 50]] }, { type: foodType.TYPE_BALL, pList: [[0, 30], [1, 70]] }, { type: foodType.TYPE_BUFF, pList: [[0, 30], [1, 70]] }], hppl: [[[1, 2], 80], [[2, 3], 20]] }, { score: 100, config: [{ type: foodType.TYPE_BRICK, pList: [[2, 50], [3, 30], [4, 20]] }, { type: foodType.TYPE_BOOM, pList: [[0, 50], [1, 50]] }, { type: foodType.TYPE_BALL, pList: [[0, 30], [1, 70]] }, { type: foodType.TYPE_BUFF, pList: [[0, 30], [1, 70]] }], hppl: [[[1, 2], 80], [[2, 3], 20]] }, { score: 130, config: [{ type: foodType.TYPE_BRICK, pList: [[2, 50], [3, 30], [4, 20]] }, { type: foodType.TYPE_BOOM, pList: [[0, 50], [1, 50]] }, { type: foodType.TYPE_BALL, pList: [[0, 30], [1, 70]] }, { type: foodType.TYPE_BUFF, pList: [[0, 30], [1, 70]] }], hppl: [[[1, 2], 80], [[2, 3], 20]] }, { score: 160, config: [{ type: foodType.TYPE_BRICK, pList: [[2, 50], [3, 30], [4, 20]] }, { type: foodType.TYPE_BOOM, pList: [[0, 50], [1, 50]] }, { type: foodType.TYPE_BALL, pList: [[0, 30], [1, 70]] }, { type: foodType.TYPE_BUFF, pList: [[0, 30], [1, 70]] }], hppl: [[[1, 2], 80], [[2, 3], 20]] }, { score: 190, config: [{ type: foodType.TYPE_BRICK, pList: [[2, 50], [3, 30], [4, 20]] }, { type: foodType.TYPE_BOOM, pList: [[0, 50], [1, 50]] }, { type: foodType.TYPE_BALL, pList: [[0, 30], [1, 70]] }, { type: foodType.TYPE_BUFF, pList: [[0, 30], [1, 70]] }], hppl: [[[1, 2], 80], [[2, 3], 20]] }, { score: 220, config: [{ type: foodType.TYPE_BRICK, pList: [[2, 50], [3, 30], [4, 20]] }, { type: foodType.TYPE_BOOM, pList: [[0, 50], [1, 50]] }, { type: foodType.TYPE_BALL, pList: [[0, 30], [1, 70]] }, { type: foodType.TYPE_BUFF, pList: [[0, 30], [1, 70]] }], hppl: [[[1, 2], 80], [[2, 3], 20]] }, { score: 250, config: [{ type: foodType.TYPE_BRICK, pList: [[2, 50], [3, 30], [4, 20]] }, { type: foodType.TYPE_BOOM, pList: [[0, 50], [1, 50]] }, { type: foodType.TYPE_BALL, pList: [[0, 30], [1, 70]] }, { type: foodType.TYPE_BUFF, pList: [[0, 30], [1, 70]] }], hppl: [[[1, 2], 80], [[2, 3], 20]] }, { score: 280, config: [{ type: foodType.TYPE_BRICK, pList: [[2, 50], [3, 30], [4, 20]] }, { type: foodType.TYPE_BOOM, pList: [[0, 50], [1, 50]] }, { type: foodType.TYPE_BALL, pList: [[0, 30], [1, 70]] }, { type: foodType.TYPE_BUFF, pList: [[0, 30], [1, 70]] }], hppl: [[[1, 2], 80], [[2, 3], 20]] }, { score: 310, config: [{ type: foodType.TYPE_BRICK, pList: [[2, 50], [3, 30], [4, 20]] }, { type: foodType.TYPE_BOOM, pList: [[0, 50], [1, 50]] }, { type: foodType.TYPE_BALL, pList: [[0, 30], [1, 70]] }, { type: foodType.TYPE_BUFF, pList: [[0, 30], [1, 70]] }], hppl: [[[1, 2], 80], [[2, 3], 20]] }];
var buff = [{ score: 5, pList: [[buffType.LANG15, 70], [buffType.SHORT15, 20], [buffType.REVERSE, 0]] }, { score: 10, pList: [[buffType.LANG15, 70], [buffType.SHORT15, 20], [buffType.REVERSE, 0]] }, { score: 65, pList: [[buffType.LANG15, 70], [buffType.SHORT15, 20], [buffType.REVERSE, 0]] }, { score: 95, pList: [[buffType.LANG15, 70], [buffType.SHORT15, 20], [buffType.REVERSE, 0]] }, { score: 125, pList: [[buffType.LANG15, 70], [buffType.SHORT15, 20], [buffType.REVERSE, 0]] }];
var getSet = function getSet(sets, score) {
    var arr = sets;
    var search = function search(idx) {
        if (idx >= arr.length) return arr[arr.length - 1];
        var ans = arr[idx];
        if (ans.score > score) return ans;else return search(idx + 1);
    };
    return search(0);
};
var head = function head(arr) {
    return arr.slice(0, 1)[0];
};
var tail = function tail(arr) {
    return arr.slice(1);
};
var computepl = function computepl(pl) {
    var total = 0;
    pl.map(function (pv) {
        total += pv[1];
    });
    var ps = pl.map(function (pv) {
        return pv[1] / total;
    });
    var random = cc.random0To1();

    for (var i = 0; i < pl.length; i++) {
        if (random <= ps[i]) {
            return pl[i][0];
        } else random -= ps[i];
    }
    console.log("error");
};
module.exports = {
    brickSetting: brick,
    buffSetting: buff,
    getSet: getSet,
    computepl: computepl
};

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
        //# sourceMappingURL=Settings.js.map
        