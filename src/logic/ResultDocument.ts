import * as vscode from 'vscode';
import EvaluationResult from './calculation/EvaluationResult';
import Evaluator from './calculation/Evaluator';

interface DirtyResult {
    dirty: boolean;
    result?: EvaluationResult;
}

export default class {
    private results: DirtyResult[];
    constructor(lineCount: number) {
        this.results = Array<DirtyResult>(lineCount);
        for (let i = 0; i < lineCount; i++) {
            this.results[i] = { dirty: true };
        }
    }

    public reCalculate(): void {
        for (let i = 0; i < this.results.length; i++) {
            this.results[i] = { dirty: true };
        }
    }

    public getResult(line: string, lineIndex: number): EvaluationResult {
        const result = this.results[lineIndex];
        if (result.dirty) {
            result.result = Evaluator(line);
            result.dirty = false;
        }
        return result.result!;
    }

    public setDirty(startLine: number, beforeLength: number, afterLength: number): void {
        this.results.splice(startLine, beforeLength, ...Array<DirtyResult>(afterLength));
        for (let i = 0; i < afterLength; i++) {
            this.results[startLine + i] = { dirty: true };
        }
    }
}
