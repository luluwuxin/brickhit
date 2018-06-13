(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/gameLogic/BrickLayout.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd1224DHR6FItqWqcS9l42sI', 'BrickLayout', __filename);
// scripts/gameLogic/BrickLayout.js

"use strict";

var timeOut = 0.5;
var ballLimit = 20;

var map = function map(f, arr) {
    return arr.map(f);
};
var compose = function compose(f1, f2) {
    return function (x) {
        return f1(f2(x));
    };
};
var equi = function equi(a, b) {
    return Math.floor(Math.abs(a - b)) == 0;
};
var getSameRow = function getSameRow(pos, arr) {
    return map(function (node) {
        return node && equi(node.y, pos.y) ? node : null;
    }, arr);
};
var getSameColumn = function getSameColumn(pos, arr) {
    return map(function (node) {
        return node && equi(node.x, pos.x) ? node : null;
    }, arr);
};
var distance = function distance(p1, p2) {
    var dx = p1.x - p2.x;
    var dy = p1.y - p2.y;
    var squre = function squre(x) {
        return x * x;
    };
    return Math.sqrt(squre(dx) + squre(dy));
};
var foodType = require("Const").FOOD_TYPE;
var concatnv = function concatnv(n, value, arr) {
    if (n <= 0) return arr;
    return concatnv(n - 1, value, arr.concat(value));
};
//{@num 数量}
//{@flg 标签}
//{@arr Map}
var getSetting = function getSetting(num, flg, ar) {
    var prime = 251;
    var size = ar.length;
    //@dp 递归层数
    var hashMap = function hashMap(dp, idx, arr) {
        if (dp > size) {
            //没有空位
            console.log("error settings!!!", arr, flg);
            return arr;
        }
        //console.log(arr, idx, arr[idx], foodType.TYPE_NULL);
        idx = idx % size;
        if (arr[idx] == foodType.TYPE_NULL) {
            var left = arr.slice(0, idx); //[0, idx)
            var right = arr.slice(idx + 1); //[idx + 1, size)
            return left.concat(flg, right);
        }
        //冲突处理
        else return hashMap(dp + 1, idx + prime, arr);
    };
    var getHashMap = function getHashMap(n, arr) {
        if (n > num) return arr;
        var rand = Math.floor(cc.random0To1() * size);
        var map = hashMap(1, rand, arr);
        return getHashMap(n + 1, map);
    };
    return getHashMap(1, ar);
};
var sets = require("Settings").brickSetting;
var getSet = function getSet(score) {
    return require("Settings").getSet(sets, score);
};
/*
const getSet = (score)=>{
    const arr = sets
    const search = (idx)=>{
        if(idx >= arr.length) return;
        const ans = arr[idx]
        if(ans.score > score) return ans;
        else return search(idx + 1);
    }
    return search(0);
};
*/
var computepl = require("Settings").computepl;
cc.Class({
    extends: cc.Component,

    properties: {
        padding: 0,
        spacing: 0,
        cols: 0,
        brickPrefab: cc.Prefab,
        brick1Prefab: cc.Prefab,
        foodPrefab: cc.Prefab,
        //bricksNumber: 0,
        line: {
            default: null,
            type: cc.Node
        }
    },
    getCentorPos: function getCentorPos() {
        var pos = cc.p(this.node.width / 2, -this.node.height / 2);
        return this.node.convertToWorldSpaceAR(pos);
    },
    onLoad: function onLoad() {
        this.ceng = 0;
    },

    reset: function reset(ctl) {
        this.node.children.map(function (node) {
            return node.destroy();
        });
        this.node.removeAllChildren();
        var brickNode = cc.instantiate(this.brickPrefab);
        this.nodeWidth = brickNode.width;
        this.nodeHeight = brickNode.height;
        this.bricksNumber = Math.floor((this.node.width - this.padding) / (brickNode.width + this.padding));
        brickNode.destroy();
        brickNode = null;
        this.gameCtl = ctl;
        //this.newBrickLayout();
        this.ceng = 0;
    },
    newBrickLayout: function newBrickLayout(repeat) {
        var _this = this;

        var self = this;

        var _loop = function _loop(j) {
            var yoffset = j * (_this.spacing + _this.nodeHeight);
            var score = window.gameScore + j;

            var empty = concatnv(_this.bricksNumber, foodType.TYPE_NULL, []);
            //console.log(empty);
            var set = getSet(score);
            var map = empty;
            set.config.map(function (item) {
                var type = item.type;
                var pl = item.pList;
                var num = computepl(pl);
                map = getSetting(num, type, map);
            });
            /*
            const brickNum = computepl(set.brickpl);
            const brickSet = getSetting(brickNum, foodType.TYPE_BRICK,empty);
            //console.log("brickSet", brickSet);
            const ballNum = computepl(set.ballpl);
            const ballSet = getSetting(ballNum, foodType.TYPE_BALL,brickSet);
            //console.log("ballSet", ballSet);
            const boomNum = computepl(set.boompl);
            const boomSet = getSetting(boomNum, foodType.TYPE_BOOM,ballSet);
            //console.log("boomSet:", boomSet);
            const buffNum = computepl(set.buffpl);
            const buffSet = getSetting(buffNum, foodType.TYPE_BUFF,boomSet);
            //console.log("buffSet:", buffSet);
            const map = buffSet;
            */

            var _loop2 = function _loop2(i) {
                var hppl = computepl(set.hppl);
                var hp = hppl[0] + Math.floor((hppl[1] - hppl[0]) * cc.random0To1());
                var configNode = function configNode(node) {
                    node.parent = _this.node;
                    node.x = _this.padding + i % _this.cols * (_this.nodeWidth + _this.padding) + _this.nodeWidth / 2;
                    node.y = yoffset - _this.spacing - _this.nodeHeight / 2;
                };
                var _type = map[i];

                var brickNode = void 0;
                if (_type == foodType.TYPE_NULL) return "continue";else if (_type == foodType.TYPE_BRICK) {
                    var node = cc.instantiate(_this.brickPrefab);
                    node.getComponent("Brick").init(hp);
                    configNode(node);
                } else {
                    var _node = cc.instantiate(_this.foodPrefab);
                    _node.getComponent("Food").init(_type);
                    configNode(_node);
                }
            };

            for (var i = 0; i < _this.bricksNumber; i++) {
                var _ret2 = _loop2(i);

                if (_ret2 === "continue") continue;
            }
        };

        for (var j = 0; j < repeat; j++) {
            _loop(j);
        }
        /*
        let special = 0;
        for (var j = 0; j < repeat; j++) {
            let yoffset = j * (this.spacing + this.nodeHeight);
            let score = window.gameScore + j;
            let ballCnt = 0;
            let boomCnt = 0;
            let buffCnt = 0;
            const ballMax = score < 30 ? 3 : (score < 80 ? 2 : 1)
            const boomMax = 1;
            const buffMax = 2;
            let pleft = (score < 10) ? 0.0 : 0.02;
              let poff = (score < 20) ? 0.05 : 0.0;
            let brickCnt = 0;
              this.ceng += 1;
            let ceng = this.ceng;
            if (ceng == 1) {
                this.map = new Array();
                let total = 2 * this.bricksNumber;
                //@dp 递归层数
                var setHashMap = function (map, key, dp) {
                    if (dp >= total) return;
                    key = key % total;
                    if (!map[key]) map[key] = true;
                    //冲突处理 注意total大小
                    else setHashMap(map, (key + 1) % total, dp + 1);
                }
                var setMap = (r) => setHashMap(this.map, r, 1);
                //第一个块位置
                let random = Math.floor(cc.random0To1() * total) % total;
                setMap(random)
                //第二个块位置
                random = Math.floor(cc.random0To1() * total) % total;
                setMap(random);
            }
            var getBrickLimit = function () {
                if (score < 10) return 2;
                if (score < 30) return 3;
                if (score < 60) return 4;
                if (score < 100) return 5;
            }
            var getBrickPrefabNode = function () {
                let rand = cc.random0To1();
                let p1 = 2.0;
                if (rand < p1) return cc.instantiate(self.brickPrefab);
                else {
                    let node = cc.instantiate(self.brick1Prefab);
                    let p = (1.0 - p1) / 4;
                    node.rotation = 90.0 * Math.ceil((rand - p1) / p);
                    return node;
                }
            }
            let hpSetting = [1, 2, 3, 7, 12]
            let idx = Math.floor(score / 30);
            for (let i = 0; i < this.bricksNumber; i++) {
                  //if(this.ceng % 10 == 1 || this.ceng % 10 == 2) break;
                  let rand = cc.random0To1();
                  let rand2 = cc.random0To1();
                let hp = 1;
                let base, dhp;
                if(idx + 1 > hpSetting.length) {base = hpSetting[hpSetting.length - 1]; dhp = 0;}
                else {base = hpSetting[idx]; dhp = hpSetting[idx + 1] - hpSetting[idx];}
                hp = base + Math.floor(rand2 * dhp);
                  //特殊处理 必出一个分裂球，和一个加长buff
                if (ceng <= 2 && this.map[(ceng - 1) * this.bricksNumber + i]) {
                    let brickNode = cc.instantiate(this.foodPrefab);
                    let _type;
                    if(special == 0) {
                        _type = foodType.TYPE_BALL
                        ballCnt++;
                    }
                    else if(special == 1){
                        _type = foodType.TYPE_BUFF;
                        buffCnt++;
                    }
                    else;
                    special++;
                    brickNode.getComponent("Food").init(_type, base);
                    brickNode.parent = this.node;
                    brickNode.x = this.padding + (i % this.cols) * (this.nodeWidth + this.padding) + this.nodeWidth / 2;
                    brickNode.y = yoffset - this.spacing - this.nodeHeight / 2;
                    //brickCnt++;
                    continue;
                }
                  if (rand > 0.45 + pleft + poff) {
                    let brickNode;
                    if (rand > 0.8 + pleft) {
                        brickNode = cc.instantiate(this.foodPrefab);
                        //let _type = foodType.TYPE_BALL;
                        let _type = foodType.TYPE_BUFF;
                        if (rand > 0.96) {
                            _type = foodType.TYPE_BOOM;
                            boomCnt++;
                        }
                        else if (rand > 0.91) (_type = foodType.TYPE_BALL) && ballCnt++;
                        else buffCnt++;
                        //else ballCnt++;
                        if ((_type == foodType.TYPE_BALL && (ballCnt > ballMax || window.gameBalls > ballLimit))|| 
                            (_type == foodType.TYPE_BOOM && (boomCnt > boomMax)) || 
                            (_type == foodType.TYPE_BUFF && (buffCnt > buffMax))) {
                            brickNode.destroy();
                            continue;
                        }
                        brickNode.getComponent("Food").init(_type);
                    }
                    else {
                        //出块数量控制
                        if (brickCnt >= getBrickLimit()) {
                            continue;
                        }
                        //brickNode = cc.instantiate(this.brickPrefab);
                        brickNode = getBrickPrefabNode();
                        brickNode.getComponent("Brick").init(hp);
                        brickCnt++;
                    }
                    brickNode.parent = this.node;
                    brickNode.x = this.padding + (i % this.cols) * (this.nodeWidth + this.padding) + this.nodeWidth / 2;
                    brickNode.y = yoffset - this.spacing - this.nodeHeight / 2;
                }
            }
        } */

        var down = repeat;
        var over = false;

        this.node.children.map(function (node) {
            var pos = _this.node.convertToWorldSpaceAR(node.getPosition());
            var death = _this.line.parent.convertToWorldSpaceAR(_this.line.getPosition()).y;
            var left = Math.floor((pos.y - death) / (_this.nodeHeight + _this.spacing) + 0.5);
            down = Math.min(left, down);
            if (left <= repeat) over = true;
        });

        this.node.children.map(function (node) {
            var pos = _this.node.convertToWorldSpaceAR(node.getPosition());
            var death = _this.line.parent.convertToWorldSpaceAR(_this.line.getPosition()).y;

            var finished = cc.callFunc(function (obj, target) {}, _this, _this.node.children.length);
            var action = cc.sequence(cc.moveBy(timeOut * down / repeat, cc.p(0, -(_this.nodeHeight + _this.spacing) * down)), finished);
            node.runAction(action);
        });
        return over;
        //}
    },

    //then, fp
    destroyNode: function destroyNode(node) {
        var brick = node ? node.getComponent("Brick") : null;
        if (brick) brick.broken();
    },

    destroyOneRow: function destroyOneRow(pos) {
        var _this2 = this;

        var getList = function getList(arr) {
            return getSameRow(pos, arr);
        };
        var destroyList = function destroyList(arr) {
            return map(_this2.destroyNode, arr);
        };
        compose(destroyList, getList)(this.node.children);
    },
    destroyOneColumn: function destroyOneColumn(pos) {
        var _this3 = this;

        var getList = function getList(arr) {
            return getSameColumn(pos, arr);
        };
        var destroyList = function destroyList(arr) {
            return map(_this3.destroyNode, arr);
        };
        compose(destroyList, getList)(this.node.children);
    },
    destroy4Side: function destroy4Side(pos) {
        var _this4 = this;

        {
            var isNear = function isNear(p2) {
                return equi(distance(pos, p2), _this4.nodeWidth + _this4.padding);
            };
            var getRow = function getRow(arr) {
                return getSameRow(pos, arr);
            };
            var getNear = function getNear(arr) {
                return map(function (node) {
                    return node && isNear(node) ? node : null;
                }, arr);
            };
            var getList = compose(getNear, getRow);
            var destroyList = function destroyList(arr) {
                return map(_this4.destroyNode, arr);
            };
            compose(destroyList, getList)(this.node.children);
        }
        {
            var _isNear = function _isNear(p2) {
                return equi(distance(pos, p2), _this4.nodeHeight + _this4.spacing);
            };
            var getColumn = function getColumn(arr) {
                return getSameColumn(pos, arr);
            };
            var _getNear = function _getNear(arr) {
                return map(function (node) {
                    return node && _isNear(node) ? node : null;
                }, arr);
            };
            var _getList = compose(_getNear, getColumn);
            var _destroyList = function _destroyList(arr) {
                return map(_this4.destroyNode, arr);
            };
            compose(_destroyList, _getList)(this.node.children);
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
        //# sourceMappingURL=BrickLayout.js.map
        