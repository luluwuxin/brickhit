(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/global/messageId.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '720825bYMJA04KWypaM7E+1', 'messageId', __filename);
// script/wx/global/messageId.js

"use strict";

module.exports = {
    MessageID: {
        ON_MSG_GET_FRIEND_RANK_OPEN: 1, // 微信 好友排行
        ON_MSG_GET_FRIEND_RANK_NEXT: 2,
        ON_MSG_GET_FRIEND_RANK_BEFORE: 3,
        ON_MSG_GET_FRIEND_RANK_CLOSE: 4,
        ON_MSG_POST_FRIEND_INFO: 5, //发送个人信息 以 [{key,value}]形式

        ON_MSG_GET_GROUP_RANK_OPEN: 20, // 微信 群排行
        ON_MSG_GET_GROUP_RANK_NEXT: 21,
        ON_MSG_GET_GROUP_RANK_BEFORE: 22,
        ON_MSG_GET_GROUP_RANK_CLOSE: 23,

        ON_MSG_GET_NEXT_PEOPLE: 30, // 下一个需要超越领先的人
        ON_MSG_GET_ADJACENT_PEOPLE: 31 //与我 相邻的两人
    }
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
        //# sourceMappingURL=messageId.js.map
        