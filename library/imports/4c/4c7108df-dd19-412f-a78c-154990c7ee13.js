"use strict";
cc._RF.push(module, '4c710jf3RlBL6eMFUmQx+4T', 'line.frag');
// resources/shader/line.frag.js

"use strict";

// white.frag.js
module.exports = "\n#ifdef GL_ES\nprecision lowp float;\n#endif\n\nvarying vec4 v_fragmentColor;\nvarying vec2 v_texCoord;\n//uniform float sys_time;\nvarying float ccTime;\nconst float T = 1.0 / 100.0;\nconst float active = 0.5; //(-1.0, 1.0)\nconst float F = 4.0;\n\nvoid main()\n{\n\tconst float PI = acos(-1.0);\n    vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n\tfloat t = v_texCoord.y;v_texCoord;// + ccTime * T * F;\n    //float siny = sin(t / T * 2.0 * PI + ccTime * timeScale);\n    float siny = sin(t / T * 2.0 * PI);\n\tgl_FragColor = vec4(c.rgb, (siny < active ? 1.0 : 0.0) * c.a);\n\n}\n";

cc._RF.pop();