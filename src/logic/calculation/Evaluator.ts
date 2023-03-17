import EvaluationResult from "./EvaluationResult";

export default function (line: string): EvaluationResult {
    const arr = line.split('+');
    let sum = 0;
    arr.forEach(s => sum += parseInt(s));
    return sum.toString();
}