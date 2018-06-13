"use strict";
cc._RF.push(module, '8826fTat0dM+oLEZiEWi508', 'localStorage');
// script/wx/global/localStorage.js

"use strict";

var localStorage = {
    getLocalStorage: function getLocalStorage(name) {
        var storage = cc.sys.localStorage.getItem(name);
        if (storage) {
            storage = JSON.parse(storage);
        }
        return storage;
    },
    setLocalStorage: function setLocalStorage(name, info) {
        cc.sys.localStorage.setItem(name, JSON.stringify(info));
    }
};

module.exports = localStorage;

cc._RF.pop();