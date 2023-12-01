import * as Identifiers from "../keywords/Identifiers";

export interface ParsingException {
    message: string;
    startAt: number;
    length: number;
}

export interface Token {
    startAt: number;
    length: number;
    ident?: Identifiers.Identifier;
}

const numberReg: RegExp = /^\d*\.?\d+/;
const spaceReg: RegExp = /^\s+?/;
const unknownReg: RegExp = /^.+?(?:(?=[\(\)])|(?=\s)|$)/;

export function getTokenList(s: string): Token[] | ParsingException {
    let i = 0;
    let ans: Token[] = [];
    while (i < s.length) {
        if (s[i] === '(') {
            ans.push({ startAt: i, length: 1 });
            i++;
            continue;
        }

        if (s[i] === ')') {
            ans.push({ startAt: i, length: 1 });
            i++;
            continue;
        }

        const after = s.substring(i);
        // spaceReg.lastIndex = i;
        // numberReg.lastIndex = i;
        // unknownReg.lastIndex = i;
        // identifiersReg.lastIndex = i;

        let match = spaceReg.exec(after)?.[0];
        if (match !== undefined) {
            i += match.length;
            continue;
        }

        match = numberReg.exec(after)?.[0];
        if (match !== undefined) {
            ans.push({ startAt: i, length: match.length });
            i += match.length;
            continue;
        }

        const ident = Identifiers.match(after);
        if (ident !== undefined) {
            ans.push({ startAt: i, length: ident.name.length, ident: ident });
            i += ident.name.length;
            continue;
        }

        match = unknownReg.exec(after)?.[0];
        return { message: "Unknown word", startAt: i, length: match?.length ?? 0 };
    }
    return ans;
}