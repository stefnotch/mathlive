/* 0.56.0 */import type { Atom } from './atom';
/**
 * Return a LaTeX representation of the atom.
 *
 * @param {boolean} expandMacro - If true, macros are fully expanded. This will
 * no longer round-trip.
 *
 */
export declare function atomToLatex(atom: Atom, expandMacro: boolean): string;
