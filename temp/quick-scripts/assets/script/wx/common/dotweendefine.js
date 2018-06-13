(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/common/dotweendefine.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f990blBgjNCdo54nVjQDXoF', 'dotweendefine', __filename);
// script/wx/common/dotweendefine.js

"use strict";

var DoTweenEaseType = {};

// 给动作设置标签用
var DoTweenType = {
    MoveRightOut: 1,
    MoveLeftOut: 2,
    MoveUpOut: 3,
    MoveDownOut: 4,
    MoveRightIn: 5,
    MoveUp: 6,
    MoveLeft: 7

    // 给ScrollView使用的动作类型 
};var ScrollAnimation = {
    MoveRightOut: 1,
    MoveLeftOut: 2,
    MoveUpOut: 3,
    MoveDownOut: 4,
    MoveRightIn: 5
};

module.exports = {
    DoTweenEaseType: DoTweenEaseType,
    DoTweenType: DoTweenType,
    ScrollAnimation: ScrollAnimation
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
        //# sourceMappingURL=dotweendefine.js.map
        