import { Identifier } from "./Identifiers";

export interface BaseBinaryOperator extends Identifier {
    exec(a: any, b: any): any;
    precedence: number;
}

export function appendNativeBinaryOperators(map: Map<string, Identifier>): void {
    var list: BaseBinaryOperator[] = [
        { name: "+", precedence: 40, exec: (a, b) => a + b },
        { name: "*", precedence: 30, exec: (a, b) => a * b },
        { name: "/", precedence: 30, exec: (a, b) => a / b },
        { name: "<", precedence: 60, exec: (a, b) => a < b },
        { name: "<=", precedence: 60, exec: (a, b) => a <= b },
        { name: "==", precedence: 60, exec: (a, b) => a === b },
        { name: ">=", precedence: 60, exec: (a, b) => a >= b },
        { name: ">", precedence: 60, exec: (a, b) => a > b },
        { name: "^", precedence: 20, exec: (a, b) => Math.pow(a, b) },
    ];
    list.forEach(x => map.set(x.name, x));
}