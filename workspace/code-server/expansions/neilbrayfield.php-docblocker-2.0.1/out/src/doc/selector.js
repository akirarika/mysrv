"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
/**
 * Class for finding the start and end position of a docblock so it can be re-parseed
 */
class DocSelector {
    /**
     * Construct the docblock with an editor so we can access text content
     *
     * @param {TextEditor} editor
     */
    constructor(editor) {
        this.editor = editor;
    }
    find(position) {
        let start;
        let end;
        if (position instanceof vscode_1.Range) {
            start = position.start;
            end = position.end;
        }
        else {
            start = position;
            end = position;
        }
        let line = this.editor.document.lineAt(start.line);
        if (!this.isStart(line) && !this.isMiddle(line) && !this.isEnd(line)) {
            throw new Error("Unable to find docblock start");
        }
        while (!this.isStart(line)) {
            if (line.lineNumber <= 1 || (!this.isMiddle(line) && !this.isEnd(line))) {
                throw new Error("Unable to find docblock start");
            }
            line = this.editor.document.lineAt(line.lineNumber - 1);
        }
        start = new vscode_1.Position(line.lineNumber, line.firstNonWhitespaceCharacterIndex);
        line = this.editor.document.lineAt(end.line);
        if (!this.isStart(line) && !this.isMiddle(line) && !this.isEnd(line)) {
            line = this.editor.document.lineAt(start.line);
        }
        while (!this.isEnd(line)) {
            if (line.lineNumber >= this.editor.document.lineCount - 1 || (!this.isMiddle(line) && !this.isStart(line))) {
                throw new Error("Unable to find docblock end");
            }
            line = this.editor.document.lineAt(line.lineNumber + 1);
        }
        end = line.range.end;
        return new vscode_1.Range(start, end);
    }
    /**
     * Is this line in the middle of a docblock
     *
     * @param {TextLine} line
     * @returns {boolean}
     */
    isMiddle(line) {
        return line.text.search(/^\s*\*/) >= 0;
    }
    /**
     * Is this line at the start of a docblock
     *
     * @param {TextLine} line
     * @returns {boolean}
     */
    isStart(line) {
        return line.text.search(/^\s*\/\*\*?/) >= 0;
    }
    /**
     * Is this line at the end of a docblock
     *
     * @param {TextLine} line
     * @returns {boolean}
     */
    isEnd(line) {
        return line.text.search(/^\s*\*\//) >= 0;
    }
}
exports.default = DocSelector;
//# sourceMappingURL=selector.js.map