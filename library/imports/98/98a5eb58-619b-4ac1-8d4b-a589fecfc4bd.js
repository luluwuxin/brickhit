"use strict";
cc._RF.push(module, '98a5etYYZtKwY1LpYn+z8S9', 'color.frag');
// resources/shader/color.frag.js

"use strict";

// white.frag.js
module.exports = "\n#ifdef GL_ES\nprecision lowp float;\n#endif\n\nvarying vec4 v_fragmentColor;\nvarying vec2 v_texCoord;\n\nvoid main()\n{\n\tfloat alpha = texture2D(CC_Texture0, v_texCoord).a;\n\tgl_FragColor = vec4(v_fragmentColor.rgb, alpha);\n\n}\n";

cc._RF.pop();