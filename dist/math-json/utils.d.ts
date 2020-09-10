/* 0.56.0 */import { Expression, MathJsonRealNumber, MathJsonSymbol, MathJsonFunction, FunctionDefinition, SymbolDefinition, ErrorCode, Dictionary } from './public';
import { ErrorListener } from '../public/core';
import { NEGATE, POWER, DIVIDE, MULTIPLY, ADD, SUBTRACT, DERIVATIVE, INVERSE_FUNCTION, LATEX, SQRT, ROOT, GROUP, LIST, MISSING, PRIME, IDENTITY, SEQUENCE, NOTHING } from './dictionary/dictionary';
export declare function isNumberObject(expr: Expression): expr is MathJsonRealNumber;
export declare function isSymbolObject(expr: Expression): expr is MathJsonSymbol;
export declare function isFunctionObject(expr: Expression): expr is MathJsonFunction;
export declare function getNumberValue(expr: Expression): number;
/**
 * Return a rational (numer over denom) representation of the expression,
 * if possibe, `[NaN, NaN]` otherwise.
 *
 * The expression can be:
 * - a number
 * - ["power", d, -1]
 * - ["power", n, 1]
 * - ["divide", n, d]
 * - ["multiply", n, ["power", d, -1]]
 */
export declare function getRationalValue(expr: Expression): [number, number];
/**
 * The head of an expression can either be a string or an expression.
 *
 * Examples:
 * `["negate", 5]`  -> "negate"
 * `[["prime", "f"], "x"] -> `["prime", "f"]
 */
export declare function getFunctionHead(expr: Expression): Expression;
/**
 * True if the expression is a number or a symbol
 */
export declare function isAtomic(expr: Expression): boolean;
export declare function getFunctionName(expr: Expression): typeof MULTIPLY | typeof POWER | typeof DIVIDE | typeof ADD | typeof SUBTRACT | typeof NEGATE | typeof DERIVATIVE | typeof INVERSE_FUNCTION | typeof LATEX | typeof SQRT | typeof ROOT | typeof GROUP | typeof LIST | typeof MISSING | typeof PRIME | typeof IDENTITY | typeof NOTHING | typeof SEQUENCE | typeof PRIME | '' | string;
export declare function getSymbolName(expr: Expression): string | null;
/**
 * Return the arguments
 */
export declare function getArgs(expr: Expression): (Expression | null)[];
export declare function mapArgs(expr: Expression, fn: (x: Expression) => Expression): Expression;
export declare function getArg(expr: Expression, n: number): Expression | null;
export declare function getArgCount(expr: Expression): number;
export declare function normalizeDefinition(name: string, def: FunctionDefinition | SymbolDefinition, onError: ErrorListener<ErrorCode>): Required<FunctionDefinition> | Required<SymbolDefinition>;
export declare function appendLatex(src: string, s: string): string;
/**
 * Replace '#1', '#2' in the latex template stings with the corresponding
 * values from `replacement`, in a Latex syntax safe manner (i.e. inserting spaces when needed)
 */
export declare function replaceLatex(template: string, replacement: string[]): string;
/**
 * Return the nth term in expr.
 * If expr is not a "add" function, returns null.
 */
export declare function varsRecursive(dic: Dictionary, vars: Set<string>, expr: Expression): void;
/**
 * Return an array of the non-constant symbols in the expression.
 */
export declare function vars(dic: Dictionary, expr: Expression): Set<string>;
/**
 * Return the coefficient of the expression, assuming vars are variables.
 */
export declare function coef(_expr: Expression, _vars: string[]): Expression | null;
