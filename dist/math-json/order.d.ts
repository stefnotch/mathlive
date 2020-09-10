/* 0.56.0 */import { Expression, Dictionary } from './public';
export declare function order(a: Expression, b: Expression): number;
/**
 * Return the (total) degree of the term
 */
export declare function degree(expr: Expression, sortedVars: string[]): number;
/**
 * The deglex order is used for sum of factors:
 * - first by total degree of each factor
 * - then lexicographically for each variable
 * - then lexicogaphcially for other symbols
 * - then by length
 * - then by value
 *
 */
export declare function deglex(a: Expression, b: Expression, sortedVars: string[]): number;
export declare function canonicalOrder(dic: Dictionary, sortedVars: string[], expr: Expression): Expression;
