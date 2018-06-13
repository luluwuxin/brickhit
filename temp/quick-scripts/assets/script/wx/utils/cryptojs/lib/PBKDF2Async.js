(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/wx/utils/cryptojs/lib/PBKDF2Async.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8a5a3iICD9ONok8D6Vl1qim', 'PBKDF2Async', __filename);
// script/wx/utils/cryptojs/lib/PBKDF2Async.js

'use strict';

(function () {

    var C = typeof window === 'undefined' ? require('./Crypto').Crypto : window.Crypto;

    // Shortcuts
    var util = C.util,
        charenc = C.charenc,
        UTF8 = charenc.UTF8,
        Binary = charenc.Binary;

    if (!C.nextTick) {
        // node.js has setTime out but prefer process.nextTick
        if (typeof process != 'undefined' && typeof process.nextTick !== 'undefined') {
            C.nextTick = process.nextTick;
        } else if (typeof setTimeout !== 'undefined') {
            C.nextTick = function (callback) {
                setTimeout(callback, 0);
            };
        }
    }

    C.PBKDF2Async = function (password, salt, keylen, callback, options) {

        // Convert to byte arrays
        if (password.constructor == String) password = UTF8.stringToBytes(password);
        if (salt.constructor == String) salt = UTF8.stringToBytes(salt);
        /* else, assume byte arrays already */

        // Defaults
        var hasher = options && options.hasher || C.SHA1,
            iterations = options && options.iterations || 1;

        // Progress callback option
        var progressChangeHandler = options && options.onProgressChange;
        var totalIterations = Math.ceil(keylen / hasher._digestsize) * iterations;
        function fireProgressChange(currentIteration) {
            if (progressChangeHandler) {
                var iterationsSoFar = derivedKeyBytes.length / hasher._digestsize * iterations + currentIteration;
                setTimeout(function () {
                    progressChangeHandler(Math.round(iterationsSoFar / totalIterations * 100));
                }, 0);
            }
        }

        // Pseudo-random function
        function PRF(password, salt) {
            return C.HMAC(hasher, salt, password, { asBytes: true });
        }

        var nextTick = C.nextTick;

        // Generate key
        var derivedKeyBytes = [],
            blockindex = 1;

        var _outer, _inner;
        nextTick(_outer = function outer() {
            if (derivedKeyBytes.length < keylen) {
                var block = PRF(password, salt.concat(util.wordsToBytes([blockindex])));
                fireProgressChange(1);

                var u = block,
                    i = 1;
                nextTick(_inner = function inner() {
                    if (i < iterations) {
                        u = PRF(password, u);
                        for (var j = 0; j < block.length; j++) {
                            block[j] ^= u[j];
                        }i++;
                        fireProgressChange(i);

                        nextTick(_inner);
                    } else {
                        derivedKeyBytes = derivedKeyBytes.concat(block);
                        blockindex++;
                        nextTick(_outer);
                    }
                });
            } else {
                // Truncate excess bytes
                derivedKeyBytes.length = keylen;
                callback(options && options.asBytes ? derivedKeyBytes : options && options.asString ? Binary.bytesToString(derivedKeyBytes) : util.bytesToHex(derivedKeyBytes));
            }
        });
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
        //# sourceMappingURL=PBKDF2Async.js.map
        