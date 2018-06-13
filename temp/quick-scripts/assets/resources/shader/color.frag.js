(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/shader/color.frag.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '98a5etYYZtKwY1LpYn+z8S9', 'color.frag', __filename);
// resources/shader/color.frag.js

"use strict";

// white.frag.js
module.exports = "\n#ifdef GL_ES\nprecision lowp float;\n#endif\n\nvarying vec4 v_fragmentColor;\nvarying vec2 v_texCoord;\n\nvoid main()\n{\n\tfloat alpha = texture2D(CC_Texture0, v_texCoord).a;\n\tgl_FragColor = vec4(v_fragmentColor.rgb, alpha);\n\n}\n";

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
        //# sourceMappingURL=color.frag.js.map
        