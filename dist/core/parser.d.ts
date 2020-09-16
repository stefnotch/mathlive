/* 0.56.0 */import { MacroDictionary } from './definitions';
import { Atom } from './atom';
import { ErrorListener, ParserErrorCode } from '../public/core';
import { ParseModePrivate } from './context';
/**
 * Given a string of LaTeX, return a corresponding math list (array of atoms).
 * @param args - If there are any placeholder tokens, e.g.
 * `#0`, `#1`, etc... they will be replaced by the value provided by `args`.
 * @param smartFence - If true, promote plain fences, e.g. `(`,
 * as `\left...\right` or `\mleft...\mright`
 */
export declare function parseString(s: string, parseMode: ParseModePrivate, args: null | (string | Atom[])[], macros: null | MacroDictionary, smartFence?: boolean, onError?: ErrorListener<ParserErrorCode>): Atom[];
