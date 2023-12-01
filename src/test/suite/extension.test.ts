import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    var s: string = "";
    for (let i = 0; i < 100000; i++) {
        s = s.concat("1234567890");
    }

    var arr: string[] = [];
    test('substring', () => {
        const start = Date.now();
        for (let i = 0; i < 1000000; i++) {
            const s0 = s.substring(i);
            arr.push(s0[8]);
        }
        console.log(Date.now() - start);
    });
});
