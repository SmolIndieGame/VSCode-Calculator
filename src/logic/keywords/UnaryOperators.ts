import { Identifier } from "./Identifiers";

export interface BaseUnaryOperator extends Identifier {
    exec(a: any): any;
}

export function appendNativeUnaryOperators(map: Map<string, Identifier>): void {
    var list: BaseUnaryOperator[] = [
        { name: "-", exec: x => -x },
        { name: "+", exec: x => +x },
        { name: "abs", exec: Math.abs },
        { name: "acos", exec: Math.acos },
        { name: "acosh", exec: Math.acosh },
        { name: "asin", exec: Math.asin },
        { name: "asinh", exec: Math.asinh },
        { name: "atan", exec: Math.atan },
        { name: "atanh", exec: Math.atanh },
        { name: "cbrt", exec: Math.cbrt },
        { name: "ceil", exec: Math.ceil },
        { name: "cos", exec: Math.cos },
        { name: "cosh", exec: Math.cosh },
        { name: "floor", exec: Math.floor },
        { name: "round", exec: Math.round },
        { name: "ln", exec: Math.log },
        { name: "log", exec: Math.log10 },
        { name: "sign", exec: Math.sign },
        { name: "sin", exec: Math.sin },
        { name: "sinh", exec: Math.sinh },
        { name: "sqrt", exec: Math.sqrt },
        { name: "tan", exec: Math.tan },
        { name: "tanh", exec: Math.tanh }
    ];
    list.forEach(x => map.set(x.name, x));
}