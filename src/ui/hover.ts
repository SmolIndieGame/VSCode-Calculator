import * as vscode from 'vscode';

export default async (isEnabled: boolean) => {
    return vscode.languages.registerHoverProvider('txt-calc', {
        provideHover(document, position, token): vscode.ProviderResult<vscode.Hover> {
            return new Promise(resolve => {
                resolve(new vscode.Hover(new vscode.MarkdownString(document.lineAt(position.line).text[position.character])));
            });
        }
    });
};
