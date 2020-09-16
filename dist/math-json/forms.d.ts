/* 0.56.0 */import type { Expression, Dictionary, Form } from './public';
export declare function applyNegate(expr: Expression): Expression;
/**
 * Transform the expression so that object literals for numbers, symbols and
 * functions are used only when necessary, i.e. when they have associated
 * metadata attributes. Otherwise, use a plain number, string or array
 *
 * For example:
 * ```
 * {num: 2} -> 2
 * {sym: "x"} -> "x"
 * {fn:['add', {num: 1}, {sym: "x"}]} -> ['add', 1, "x"]
 * ```
 *
 */
export declare function fullForm(dic: Dictionary, expr: Expression | null): Expression | null;
export declare function strippedMetadataForm(dict: Dictionary, expr: Expression): Expression;
/**
 * Transform the expression so that the arguments of functions that have the
 * `isCommutative` attributes are ordered as per the following:
 *
 * - Real numbers
 * - Complex numbers
 * - Symbols
 * - Functions
 *
 * Within Real Numbers:
 * - by their value
 *
 * With Complex numbers:
 * - by the value of their imaginary component,
 * - then by the value of their real component
 *
 * With Symbols:
 * - constants (`isConstant === true`) before non-constants
 * - then alphabetically
 *
 * With Functions:
 * - if a `[MULTIPLY]` or a `[POWER]`... @todo
 *
 */
export declare function sortedForm(dic: Dictionary, expr: Expression): Expression;
/**
 *  Return the expression in canonical form:
 *
 * - `"divide"`, `"exp"`,` `"subtract"`, `"root"`, `"exp"` replaced with
 *      `"add"`, `"multiply"`, "`power"`
 * - some trivial simplifications (multiply by 1, addition of 0, division by 1)
 * - terms sorted
 *
 */
export declare function canonicalForm(dic: Dictionary, expr: Expression | null): Expression | null;
/**
 * Return a string escaped as necessary to comply with the JSON format
 *
 */
export declare function escapeText(s: string): string;
/**
 * Transform an expression by applying one or more rewriting rules to it,
 * recursively.
 *
 * There are many ways to symbolically manipulate an expression, but
 * transformations with `form` have the following charactersitics:
 *
 * - they don't require calculation or assumption above the domain of free
 * variables or the value of constants
 * - the output expression is expressed with more primitive functions,
 * for example subtraction is replaced with addition
 *
 */
export declare function form(dic: Dictionary, expr: Expression | null, forms: Form[]): Expression | null;
