"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const doc_1 = require("../doc");
/**
 * This is a class for taking a doblock and converting it
 * into a  Doc object we can use to re-build a snippit
 */
class DocParser {
    parse(text) {
        let lines = text.split("\n");
        lines = lines.map((value, index) => {
            return value.replace(/^\s*(\/\*\*|\*\/|\*)\s*(.*)$/, '$2');
        });
        if (lines[0] == "") {
            lines.shift();
        }
        if (lines[lines.length - 1] == "") {
            lines.pop();
        }
        let doc = new doc_1.Doc();
        for (let i = 0; i < lines.length; i++) {
            const element = lines[i];
            if (element.indexOf('@param') == 0) {
                doc.params.push(this.parseParam(element));
            }
        }
        console.log(lines, doc);
        return doc;
    }
    parseParam(line) {
        let matches = line.match(/@param\s+([^\s]+)\s+(\$)/);
        return new doc_1.Param(matches[0], matches[1]);
    }
}
exports.default = DocParser;
//# sourceMappingURL=parser.js.map