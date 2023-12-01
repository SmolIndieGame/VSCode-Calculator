import { getTokenList } from "../syntax/TokenParser";
import EvaluationResult from "./EvaluationResult";

export function evaluate(line: string): EvaluationResult {
    const respond = getTokenList(line);
    if ('message' in respond) {
        return respond.message;
    }

    const tokens = respond.map(x => {
        return line.substring(x.startAt, x.startAt + x.length);
    });
    return tokens.join("   ");
}