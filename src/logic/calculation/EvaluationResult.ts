import * as vscode from 'vscode';

interface EvaluateError {
    error: string;
    location: vscode.Range;
}

type EvaluationResult = string | EvaluateError;
export default EvaluationResult;