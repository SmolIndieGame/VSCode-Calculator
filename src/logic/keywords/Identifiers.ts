import { appendNativeBinaryOperators } from "./BinaryOperators";
import { appendNativeUnaryOperators } from "./UnaryOperators";

const identMap = new Map<string, Identifier>();
appendNativeUnaryOperators(identMap);
appendNativeBinaryOperators(identMap);

function nativeIdentifiersRegex(): string {
    let list: string[] = [];
    escapeStrings(identMap.keys(), list);
    return list.join("|");
}

const alphaNumReg = /^[a-zA-Z0-9]/;
function escapeStrings(list: Iterable<string>, output: string[]) {
    for (const key of list) {
        let s: string = "";
        for (const c of key) {
            if (alphaNumReg.test(c)) {
                s += c;
            } else {
                s += "\\" + c;
            }
        }
        output.push(s);
    }
}

const nativeIdentifiers = nativeIdentifiersRegex();

export interface Identifier {
    name: string;
}

export function match(s: string): Identifier | undefined {
    const reg = new RegExp("^(" + nativeIdentifiers + ")");
    const match = reg.exec(s)?.[0];
    if (match === undefined) { return; }
    return identMap.get(match);
}
