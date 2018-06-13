"use strict";
cc._RF.push(module, '63de4lNRX9EaKE7j9iu116y', 'tokenMgr');
// script/wx/utils/tokenMgr.js

"use strict";

var key = "__token__";

var token = null;

function getToken() {
    return token;
}

function checkToken() {
    if (!token) return false;
    return true;
}

function setToken(info) {
    token = info;
    console.log('setToken:' + token);
}

module.exports = {
    getToken: getToken,
    checkToken: checkToken,
    setToken: setToken
};

cc._RF.pop();