"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BladeFormatter {
    constructor(options) {
        this.newLine = "\n";
        options = options || {};
        // options default value
        options.tabSize = options.tabSize || 4;
        if (typeof options.insertSpaces === "undefined") {
            options.insertSpaces = true;
        }
        this.indentPattern = (options.insertSpaces) ? " ".repeat(options.tabSize) : "\t";
    }
    format(inuptText) {
        let inComment = false;
        let output = inuptText;
        // fix #57 url extra space after formatting
        output = output.replace(/url\(\"(\s*)/g, "url\(\"");
        return output.trim();
    }
}
exports.BladeFormatter = BladeFormatter;
//# sourceMappingURL=BladeFormatter.js.map