(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/utils/cryptojs/lib/HMAC.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '736ee57vKRLkqk7osb8FOdg', 'HMAC', __filename);
// script/wx/utils/cryptojs/lib/HMAC.js

'use strict';

(function () {

	var C = typeof window === 'undefined' ? require('./Crypto').Crypto : window.Crypto;

	// Shortcuts
	var util = C.util,
	    charenc = C.charenc,
	    UTF8 = charenc.UTF8,
	    Binary = charenc.Binary;

	C.HMAC = function (hasher, message, key, options) {

		// Convert to byte arrays
		if (message.constructor == String) message = UTF8.stringToBytes(message);
		if (key.constructor == String) key = UTF8.stringToBytes(key);
		/* else, assume byte arrays already */

		// Allow arbitrary length keys
		if (key.length > hasher._blocksize * 4) key = hasher(key, { asBytes: true });

		// XOR keys with pad constants
		var okey = key.slice(0),
		    ikey = key.slice(0);
		for (var i = 0; i < hasher._blocksize * 4; i++) {
			okey[i] ^= 0x5C;
			ikey[i] ^= 0x36;
		}

		var hmacbytes = hasher(okey.concat(hasher(ikey.concat(message), { asBytes: true })), { asBytes: true });

		return options && options.asBytes ? hmacbytes : options && options.asString ? Binary.bytesToString(hmacbytes) : util.bytesToHex(hmacbytes);
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
        //# sourceMappingURL=HMAC.js.map
        