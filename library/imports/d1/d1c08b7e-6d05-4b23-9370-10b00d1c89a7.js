"use strict";
cc._RF.push(module, 'd1c08t+bQVLI5NwELANHImn', 'WXBizDataCrypt');
// script/wx/utils/WXBizDataCrypt.js

"use strict";

var Crypto = require('Crypto');

function WXBizDataCrypt(appId, sessionKey) {
  this.appId = appId;
  this.sessionKey = sessionKey;
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  var encryptedData = Crypto.util.base64ToBytes(encryptedData);
  var key = Crypto.util.base64ToBytes(this.sessionKey);
  var iv = Crypto.util.base64ToBytes(iv);

  var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);

  try {
    // 解密
    var bytes = Crypto.AES.decrypt(encryptedData, key, {
      asBpytes: true,
      iv: iv,
      mode: mode
    });

    var decryptResult = JSON.parse(bytes);
  } catch (err) {
    console.log(err);
  }

  if (decryptResult && decryptResult["watermark"] && decryptResult.watermark.appid !== this.appId) {
    console.log(err);
  }

  return decryptResult;
};

module.exports = WXBizDataCrypt;

cc._RF.pop();