(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/utils/cryptojs/lib/CryptoMath.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8f866AADvROCLZAEZFUCcTP', 'CryptoMath', __filename);
// script/wx/utils/cryptojs/lib/CryptoMath.js

'use strict';

(function () {

	var C = typeof window === 'undefined' ? require('./Crypto').Crypto : window.Crypto;

	// Shortcut
	var util = C.util;

	// Convert n to unsigned 32-bit integer
	util.u32 = function (n) {
		return n >>> 0;
	};

	// Unsigned 32-bit addition
	util.add = function () {
		var result = this.u32(arguments[0]);
		for (var i = 1; i < arguments.length; i++) {
			result = this.u32(result + this.u32(arguments[i]));
		}return result;
	};

	// Unsigned 32-bit multiplication
	util.mult = function (m, n) {
		return this.add((n & 0xFFFF0000) * m, (n & 0x0000FFFF) * m);
	};

	// Unsigned 32-bit greater than (>) comparison
	util.gt = function (m, n) {
		return this.u32(m) > this.u32(n);
	};

	// Unsigned 32-bit less than (<) comparison
	util.lt = function (m, n) {
		return this.u32(m) < this.u32(n);
	};
})();

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
        //# sourceMappingURL=CryptoMath.js.map
        