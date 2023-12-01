import * as vscode from "vscode";
import ResultDocument from "./ResultDocument";

const docs = new Map<vscode.TextDocument, ResultDocument>();

function countLines(s: string): number {
    let count = 1;
    for (let i = 0; i < s.length; i++) {
        if (s.charCodeAt(i) === 10) {
            count++;
        }
    }
    return count;
}

export function docOpen(doc: vscode.TextDocument): ResultDocument {
    let rDoc = docs.get(doc);
    if (rDoc !== undefined) { return rDoc; }
    rDoc = new ResultDocument(doc.lineCount);
    docs.set(doc, rDoc);
    return rDoc;
}

export function docClose(doc: vscode.TextDocument): void {
    docs.delete(doc);
}

export function docChanged(doc: vscode.TextDocument, changes: readonly vscode.TextDocumentContentChangeEvent[]): void {
    const rDoc = docs.get(doc);
    if (rDoc === undefined) {
        docOpen(doc);
        return;
    }

    for (const change of changes) {
        const startLine = change.range.start.line;
        const changingTextLineCount = change.range.end.line - change.range.start.line + 1;
        const changedTextLineCount = countLines(change.text);
        rDoc.setDirty(startLine, changingTextLineCount, changedTextLineCount);
    }
}

export function getResult(doc: vscode.TextDocument): ResultDocument {
    let rDoc = docs.get(doc);
    if (rDoc === undefined) {
        rDoc = docOpen(doc);
    }

    return rDoc;
}