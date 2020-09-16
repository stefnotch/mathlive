/* 0.56.0 */import { ErrorListener, Style, MacroDictionary, ParserErrorCode } from '../public/core';
import type { Span } from './span';
import type { Token } from './tokenizer';
import type { Atom } from './atom';
import type { ParseModePrivate } from './context';
export interface ParseTokensOptions {
    args: (string | Atom[])[];
    macros: MacroDictionary;
    smartFence: boolean;
    style: Style;
    parse: (mode: ParseModePrivate, tokens: Token[], options: ParseTokensOptions) => [Atom[], Token[]];
}
export declare function joinLatex(segments: string[]): string;
export declare function tokensToString(tokens: Token[]): string;
export declare function getPropertyRuns(atoms: Atom[], property: string): Atom[][];
export declare const MODES_REGISTRY: {};
export declare function register(name: string, definition: {
    emitLatexRun: (context: Atom, run: Atom[], expandMacro: boolean) => string;
    applyStyle: (span: Span, style: Style) => string;
    parse?: (tokens: Token[], onError: ErrorListener<ParserErrorCode>, options: ParseTokensOptions) => Atom[];
}): void;
export declare function emitLatexRun(parent: Atom, run: Atom[], expandMacro: boolean): string;
export declare function parseTokens(mode: ParseModePrivate, tokens: Token[], onError: ErrorListener<ParserErrorCode>, options: ParseTokensOptions): Atom[];
export declare function applyStyle(span: Span, style: Style): string;
