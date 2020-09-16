/* 0.56.0 */import { ParseModePrivate } from './context';
import { Atom, AtomType, Notations, Colspec, BBoxParam } from './atom-utils';
import { Variant, VariantStyle, FontSeries, FontShape, MacroDictionary } from '../public/core';
export declare type FunctionArgumentDefiniton = {
    isOptional: boolean;
    type: ParseModePrivate;
};
export declare type FunctionDefinition = {
    params: FunctionArgumentDefiniton[];
    mode: ParseModePrivate;
    infix: boolean;
    parse: ParseFunction;
    emit: EmitFunction;
    isFunction: boolean;
};
declare type EnvironmentDefinition = {
    tabular: boolean;
    params: FunctionArgumentDefiniton[];
    parser: ParseEnvironmentFunction;
};
export declare type SymbolDefinition = {
    type: AtomType;
    value: string;
    variant: Variant;
    variantStyle: VariantStyle;
};
export declare const MATH_SYMBOLS: {};
export declare const REVERSE_MATH_SYMBOLS: {
    '<': string;
    '>': string;
    o: string;
    '&': string;
    '{': string;
    '}': string;
    '[': string;
    ']': string;
    ':': string;
    '\u00A0': string;
    '\u00AC': string;
    '\u00B7': string;
    '\u00BC': string;
    '\u00BD': string;
    '\u00BE': string;
    '\u2070': string;
    ⁱ: string;
    '\u00B9': string;
    '\u00B2': string;
    '\u00B3': string;
    '\u2020': string;
    '\u2021': string;
    '\u2026': string;
    '\u2074': string;
    '\u2075': string;
    '\u2076': string;
    '\u2077': string;
    '\u2078': string;
    '\u2079': string;
    '\u207A': string;
    '\u207B': string;
    '\u207C': string;
    ⁿ: string;
    '\u2080': string;
    '\u2081': string;
    '\u2082': string;
    '\u2083': string;
    '\u2084': string;
    '\u2085': string;
    '\u2086': string;
    '\u2087': string;
    '\u2088': string;
    '\u2089': string;
    '\u208A': string;
    '\u208B': string;
    '\u208C': string;
    ₐ: string;
    ₑ: string;
    ₒ: string;
    ₓ: string;
    '\u2032': string;
    '\'': string;
    '\u2190': string;
    '\u2192': string;
    '\u25B3': string;
    '\u25BD': string;
    '\u220B': string;
    '\u2217': string;
    '\u2223': string;
    '\u2225': string;
    '\u2227': string;
    '\u2228': string;
    '\u22C5': string;
    '\u22C8': string;
    '\u2260': string;
    '\u2264': string;
    '\u2265': string;
    '\u22A5': string;
    '\u27F7': string;
    '\u27F8': string;
    '\u27F9': string;
    ℂ: string;
    ℕ: string;
    ℙ: string;
    ℚ: string;
    ℝ: string;
    ℤ: string;
};
export declare const FUNCTIONS: {};
export declare const ENVIRONMENTS: {
    [name: string]: EnvironmentDefinition;
};
declare type EmitFunction = (name: string, parent: Atom, atom: Atom, emit: (parent: Atom, atoms: Atom[]) => string) => string;
export declare type ParseFunctionResult = {
    type?: string;
    mode?: ParseModePrivate;
    mathstyle?: 'auto' | 'textstyle' | 'displaystyle' | 'scriptstyle' | 'scriptscriptstyle';
    skipBoundary?: boolean;
    captureSelection?: boolean;
    body?: string | Atom[];
    svgBelow?: string;
    limits?: 'limits' | 'nolimits' | 'accent' | 'overunder' | 'auto';
    accent?: string;
    latexOpen?: string;
    latexClose?: string;
    color?: string;
    verbatimBackgroundcolor?: string;
    backgroundcolor?: string;
    framecolor?: string;
    verbatimFramecolor?: string;
    fontSize?: 'size1' | 'size2' | 'size3' | 'size4' | 'size5' | 'size6' | 'size7' | 'size8' | 'size9' | 'size10';
    fontSeries?: FontSeries;
    fontShape?: FontShape;
    fontFamily?: string;
    variant?: Variant;
    variantStyle?: VariantStyle;
    cssClass?: string;
    cssId?: string;
    isFunction?: boolean;
    isSymbol?: boolean;
    size?: string;
    cls?: string;
    delim?: string;
    hasBarLine?: boolean;
    leftDelim?: string;
    rightDelim?: string;
    numer?: Atom[];
    denom?: Atom[];
    continuousFraction?: boolean;
    numerPrefix?: string;
    denomPrefix?: string;
    notation?: Notations;
    borderStyle?: string;
    padding?: number | string;
    svgStrokeStyle?: string;
    strokeColor?: string;
    strokeWidth?: number;
    strokeStyle?: string;
    shadow?: string;
};
declare type ParseFunction = (name: string, args: (string | number | BBoxParam | Colspec[] | Atom[])[]) => ParseFunctionResult;
export declare type ParseEnvironmentResult = {
    mathstyle?: 'displaystyle' | 'textstyle' | 'scriptstyle' | 'scriptscriptstyle';
    colFormat?: Colspec[];
    leftDelim?: string;
    rightDelim?: string;
    jot?: number;
    arraystretch?: number;
    arraycolsep?: number;
};
declare type ParseEnvironmentFunction = (name: string, args: (string | number | BBoxParam | Colspec[] | Atom[])[], arrray: Atom[][][]) => ParseEnvironmentResult;
export declare const MACROS: MacroDictionary;
export declare const RIGHT_DELIM: {
    '(': string;
    '{': string;
    '[': string;
    '|': string;
    '\\lbrace': string;
    '\\{': string;
    '\\langle': string;
    '\\lfloor': string;
    '\\lceil': string;
    '\\vert': string;
    '\\lvert': string;
    '\\Vert': string;
    '\\lVert': string;
    '\\lbrack': string;
    '\\ulcorner': string;
    '\\llcorner': string;
    '\\lgroup': string;
    '\\lmoustache': string;
};
export declare const TEXT_SYMBOLS: {
    '\\#': string;
    '\\&': string;
    '\\$': string;
    '\\%': string;
    '\\_': string;
    '\\euro': string;
    '\\maltese': string;
    '\\{': string;
    '\\}': string;
    '\\nobreakspace': string;
    '\\ldots': string;
    '\\textellipsis': string;
    '\\backslash': string;
    '`': string;
    "'": string;
    '``': string;
    "''": string;
    '\\degree': string;
    '\\textasciicircum': string;
    '\\textasciitilde': string;
    '\\textasteriskcentered': string;
    '\\textbackslash': string;
    '\\textbraceleft': string;
    '\\textbraceright': string;
    '\\textbullet': string;
    '\\textdollar': string;
    '\\textsterling': string;
    '\\textdagger': string;
    '\\textdaggerdbl': string;
    '\u2013': string;
    '\u2014': string;
    '\u2018': string;
    '\u2019': string;
    '\u201C': string;
    '\u201D': string;
    '"': string;
    '\\ss': string;
    '\\ae': string;
    '\\oe': string;
    '\\AE': string;
    '\\OE': string;
    '\\O': string;
    '\\i': string;
    '\\j': string;
    '\\aa': string;
    '\\AA': string;
};
export declare const COMMAND_MODE_CHARACTERS: RegExp;
export declare const LETTER: RegExp;
export declare const LETTER_AND_DIGITS: RegExp;
/**
 * @param symbol    The LaTeX command for this symbol, for
 * example `\alpha` or `+`
 */
export declare function defineSymbol(symbol: string, value: string, type?: AtomType, variant?: Variant | ''): void;
/**
 * Define a set of single-character symbols as 'mord' symbols.
 * @param string a string of single character symbols
 */
export declare function defineSymbols(string: string): void;
/**
 * Define a set of single-character symbols as a range of Unicode codepoints
 * @param from First Unicode codepoint
 * @param to Last Unicode codepoint
 */
export declare function defineSymbolRange(from: number, to: number): void;
/**
 * Given a character, return a LaTeX expression matching its Unicode codepoint.
 * If there is a matching symbol (e.g. \alpha) it is returned.
 */
export declare function charToLatex(parseMode: ParseModePrivate, s: string): string;
/**
 * Given a character and variant ('double-struck', 'fraktur', etc...)
 * return the corresponding unicode character (a string)
 */
export declare function mathVariantToUnicode(char: string, variant: string, style: string): string;
export declare function unicodeCharToLatex(parseMode: ParseModePrivate, char: string): string;
export declare function unicodeStringToLatex(parseMode: ParseModePrivate, s: string): string;
/**
 * Gets the value of a symbol in math mode
 */
export declare function getValue(symbol: string): string;
export declare function emit(symbol: string, parent: Atom, atom: Atom, emitFn: (parent: Atom, atoms: Atom[]) => string): string;
export declare function getEnvironmentDefinition(name: string): EnvironmentDefinition;
/**
 * @param symbol    A command (e.g. '\alpha') or a character (e.g. 'a')
 * @param parseMode One of 'math' or 'text'
 * @param macros A macros dictionary
 * @return {object} An info structure about the symbol, or null
 */
export declare function getInfo(symbol: string, parseMode: ParseModePrivate, macros?: MacroDictionary): FunctionDefinition & SymbolDefinition;
/**
 * Return an array of suggestion for completing string 's'.
 * For example, for 'si', it could return ['sin', 'sinh', 'sim', 'simeq', 'sigma']
 * Infix operators are excluded, since they are deprecated commands.
 */
export declare function suggest(s: string): {
    match: string;
    frequency: number;
}[];
/**
 * If possible, i.e. if they are all simple atoms, return a string made up of
 * their body
 */
export declare function parseArgAsString(atoms: Atom[]): string;
/**
 * Define one or more environments to be used with
 *         \begin{<env-name>}...\end{<env-name>}.
 *
 * @param params The number and type of required and optional parameters.
 */
export declare function defineEnvironment(names: string | string[], params: string, parser: ParseEnvironmentFunction, isTabular?: boolean): void;
/**
 * Like defineEnvironment, but for a tabular environment, i.e.
 * one whose content is in tabular mode, where '&' indicata a new column
 * and '\\' indicate a new row.
 */
export declare function defineTabularEnvironment(names: string | string[], params: string, parser: ParseEnvironmentFunction): void;
/**
 * Define one of more functions.
 *
 * @param names
 * @param params The number and type of required and optional parameters.
 * For example: '{}' defines a single mandatory parameter
 * '[string]{auto}' defines two params, one optional, one required
 */
export declare function defineFunction(names: string | string[], params: string, options: {
    mode?: ParseModePrivate;
    infix?: boolean;
}, parseFunction?: ParseFunction, emitFunction?: EmitFunction): void;
export {};
