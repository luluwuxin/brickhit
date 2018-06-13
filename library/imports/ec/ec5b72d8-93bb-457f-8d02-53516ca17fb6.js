"use strict";
cc._RF.push(module, 'ec5b7LYk7tFf40CU1FsoX+2', 'line.vert');
// resources/shader/line.vert.js

"use strict";

// white.vert.js
module.exports = "\nattribute vec4 a_position;\nattribute vec2 a_texCoord;\nattribute vec4 a_color;\nvarying vec4 v_fragmentColor; \nvarying vec2 v_texCoord; \nvarying float ccTime;\nuniform float sys_time;\nvoid main() \n{ \n    gl_Position = CC_PMatrix * a_position;\n    v_fragmentColor = a_color; \n    v_texCoord = a_texCoord; \n\tccTime = sys_time;\n}\n";

cc._RF.pop();