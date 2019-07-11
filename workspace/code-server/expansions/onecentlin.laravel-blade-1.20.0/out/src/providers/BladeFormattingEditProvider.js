"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const html = require("vscode-html-languageservice");
const lst = require("vscode-languageserver-types");
const BladeFormatter_1 = require("../services/BladeFormatter");
const service = html.getLanguageService();
class BladeFormattingEditProvider {
    provideDocumentFormattingEdits(document, options) {
        let range = new vscode.Range(new vscode.Position(0, 0), new vscode.Position((document.lineCount - 1), Number.MAX_VALUE));
        return this.provideFormattingEdits(document, document.validateRange(range), options);
    }
    provideDocumentRangeFormattingEdits(document, range, options) {
        return this.provideFormattingEdits(document, range, options);
    }
    provideFormattingEdits(document, range, options) {
        this.formatterOptions = {
            tabSize: options.tabSize,
            insertSpaces: options.insertSpaces
        };
        //  Mapping HTML format options
        let htmlFormatConfig = vscode.workspace.getConfiguration('html.format');
        Object.assign(options, htmlFormatConfig);
        // format as html
        let doc = lst.TextDocument.create(document.uri.fsPath, 'html', 1, document.getText());
        let htmlTextEdit = service.format(doc, range, options);
        // format as blade
        let formatter = new BladeFormatter_1.BladeFormatter(this.formatterOptions);
        let bladeText = formatter.format(htmlTextEdit[0].newText);
        return [vscode.TextEdit.replace(range, bladeText)];
    }
}
exports.BladeFormattingEditProvider = BladeFormattingEditProvider;
//# sourceMappingURL=BladeFormattingEditProvider.js.map