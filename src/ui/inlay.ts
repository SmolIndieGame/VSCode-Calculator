import * as vscode from 'vscode';
import { getResult } from '../logic/ResultDocumentManager';

export default async (isEnabled: boolean) => {
    return vscode.languages.registerInlayHintsProvider('txt-calc', {
        provideInlayHints(doc, range, token): vscode.ProviderResult<vscode.InlayHint[]> {
            return new Promise(async (r) => {
                if (!isEnabled) { return r([]); }
                const rDoc = getResult(doc);
                const output = <vscode.InlayHint[]>[];

                for (let i = range.start.line; i <= range.end.line; i++) {
                    const line = doc.lineAt(i);
                    const result = rDoc.getResult(line.text, i);
                    output.push({
                        position: line.range.end,
                        label: result.toString(),
                        kind: vscode.InlayHintKind.Parameter,
                        paddingLeft: true
                    });
                }
                r(output);
            });
        }
    });
};
