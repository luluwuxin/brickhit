(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/gameLogic/Brick.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0ea52JCKZtFt7ynLIte9dr7', 'Brick', __filename);
// scripts/gameLogic/Brick.js

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

var Tms = 5; //变色粒度 [0, Tms)
var common = require("Common");
var map = function map(f, arr) {
    return arr.map(f);
};
var compose = function compose(f1, f2) {
    return function (x) {
        return f2(f1(x));
    };
};
var ShaderUtils = require("ShaderUtils");
var getColorFunc = function getColorFunc() {
    var N = 5;
    var RGBv = [[206, 207, 207], //0 
    [38, 207, 217], //10
    [81, 90, 255], //20
    [105, 179, 72], //30
    [238, 231, 119], //40
    [206, 47, 126], //50
    [217, 66, 54]];
    var hexv = ["AC22FF", "4522D5", "414AFF", "26CFD9", "6FF26E", "49C62B", "EEE777", "F6E738", "FF870B", "D94236", "BB0F4D", "DE1F7E", "BF37FF", "3025FF", "426AFF", "14F3FF", "5DFF76", "2EFF19", "FFF87A", "FFF14B", "FF9E17", "FF4932", "FA0055", "FF298F"];
    RGBv = map(common.hex2RGB, hexv);

    var rgb2hsv = common.rgb2hsv;
    var normalize256d = function normalize256d(x) {
        return common.normalize(256, x);
    };
    //var normalize256d = (x) => x;
    var normalize256dv = function normalize256dv(vec) {
        return map(normalize256d, vec);
    };
    var RGBv2rgbv = function RGBv2rgbv(RGBv) {
        return map(normalize256dv, RGBv);
    };
    var rgbv2hsvv = function rgbv2hsvv(rgbv) {
        return map(rgb2hsv, rgbv);
    };
    var RGBv2hsvv = compose(RGBv2rgbv, rgbv2hsvv);

    var hsvv = RGBv2hsvv(RGBv);
    //hsvv = hsvv.sort((a, b)=> a[0] > b[0]);

    var hsv2rgb = common.hsv2rgb;
    var rnormalize256d = function rnormalize256d(x) {
        return common.rnormalize(256, x);
    };
    //var rnormalize256d = (x) => x;
    var rnormalize256dv = function rnormalize256dv(vec) {
        return map(rnormalize256d, vec);
    };
    var floorv = function floorv(arr) {
        return map(Math.floor, arr);
    };
    var rgb2RGB = compose(rnormalize256dv, floorv);
    var hsv2RGB = compose(hsv2rgb, rgb2RGB);
    return function (hp) {
        hp = Math.floor(hp / Tms);
        var RGB = RGBv[RGBv.length - 1];
        hp = hp % (N * hsvv.length);
        //if(hp < N * hsvv.length)
        {
            var p1 = Math.floor(hp / N);
            var p2 = Math.ceil(hp / N) % hsvv.length;
            //console.log(p1, p2, hsvv)
            var p = hp % N;
            var h1 = hsvv[p1][0];
            var h2 = hsvv[p2][0];
            var h = (h2 * p + h1 * (N - p)) / N; //线性插值
            //let max = Math.max(h1, h2);
            //let min = Math.min(h1, h2);
            //let h = (min * p + max * (N - p))/N; //线性插值
            var hsv = [h, hsvv[p2][1], hsvv[p2][2]];
            ////let s = (hsvv[p1][1] * p + hsvv[p2][1] * (N - p)) / N;
            ////let v = (hsvv[p1][2] * p + hsvv[p2][2] * (N - p)) / N;
            //let hsv = [h, s, v];
            RGB = hsv2RGB(hsv);
            //console.log(p1, p2, hsvv,RGB);
        }
        return cc.color(RGB[0], RGB[1], RGB[2]);
    };
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
        hpDisplay: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    updateDisplay: function updateDisplay(force) {
        var hp = this.hp;
        this.hpDisplay.string = hp.toString();
        this.hpDisplay.node.active = hp > 1;
        /*
        if (!force && hp % Tms != (Tms - 1)) return;  //优化处理，颜色不变
          let norm = 255;
        let prime = 251;
        function range(x) {
            let prime = 127;
            let dx = (norm - prime) / 2;
            return x % prime + dx
        }
        let r = prime * range(Math.floor(hp / Tms)) % norm;
        let g = prime * r % norm;
        let b = g * prime % norm;
        //this.node.color = cc.color(range(r), range(g), range(b));
          let RGB = [range(r), range(g), range(b)];
        if(Math.max(RGB[0], RGB[1], RGB[2]) != Math.min(RGB[0], RGB[1], RGB[2]))
        {
            let hsv = common.rgb2hsv(RGB);
            hsv[1] = Math.min(1.0, hsv[1] * 1.1);
            RGB = common.hsv2rgb(hsv);
        }
        this.node.color = cc.color(RGB[0], RGB[1], RGB[2]);
        if(Math.floor(hp / Tms) == 0) this.node.color = cc.color(79, 207, 222);
        //this.node.color = this.colorFunc(hp);
        */
    },
    onLoad: function onLoad() {},
    init: function init(hp) {
        this.hp = hp;
        //this.colorFunc = getColorFunc();
        this.hpDisplay.node.rotation = -this.hpDisplay.node.parent.rotation;
        this.updateDisplay(true);
    },
    onContacked: function onContacked() {
        var dhp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        //audioManager.play("contackAudio")
        var addScore = Math.min(dhp, this.hp);
        window.gameScore1 += addScore;
        this.hp -= dhp;
        if (this.hp <= 0) {
            this.broken();
            return;
        }
        this.updateDisplay();
    },
    broken: function broken() {
        this.node.stopAllActions();
        this.node.destroy();
    },
    start: function start() {},
    onDestroy: function onDestroy() {
        window.gameScore1 += this.hp;
    },

    update: function update(dt) {}
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
        //# sourceMappingURL=Brick.js.map
        