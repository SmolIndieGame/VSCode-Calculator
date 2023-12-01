import * as vscode from 'vscode';
import * as results from './logic/ResultDocumentManager';
import hover from './ui/hover';
import inlay from './ui/inlay';

const lang = "txt-calc";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand('t.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from t!');
    }));

    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(evt => {
            if (evt.document.languageId !== lang) { return; }
            results.docChanged(evt.document, evt.contentChanges);
            // for (const change of evt.contentChanges) {
            // 	changeDoc.setDirty(change);
            // 	vscode.window.showInformationMessage(`start: ${change.range.start.line}, end: ${change.range.end.line}\n offset: ${change.rangeOffset} length: ${change.rangeLength}`);
            // }
        }),
        vscode.workspace.onDidOpenTextDocument(doc => {
            if (doc.languageId !== lang) { return; }
            results.docOpen(doc);
        })
    );

    // context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(doc => {
    // 	if (doc.languageId !== lang) { return; }
    // 	vscode.window.showInformationMessage("doc saved!");
    // }));

    context.subscriptions.push(await inlay(true));
    context.subscriptions.push(await hover(true));
}

// This method is called when your extension is deactivated
export function deactivate() { }
