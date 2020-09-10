/* 0.56.0 */import type { Dictionary, DictionaryCategory, SymbolDefinition, FunctionDefinition } from '../public';
/**
 * These constants are the 'primitives' that are used for some basic manipulations
 * such as parsing, and transforming to canonical form.
 *
 */
export declare const LATEX = "Latex";
export declare const LIST = "List";
export declare const IDENTITY = "Identity";
export declare const MISSING = "Missing";
export declare const NOTHING = "Nothing";
export declare const SEQUENCE = "Sequence";
export declare const SUBSEQUENCE = "Subsequence";
export declare const GROUP = "Group";
export declare const MULTIPLY = "Multiply";
export declare const POWER = "Power";
export declare const DIVIDE = "Divide";
export declare const ADD = "Add";
export declare const SUBTRACT = "Subtract";
export declare const NEGATE = "Negate";
export declare const DERIVATIVE = "Derivative";
export declare const INVERSE_FUNCTION = "InverseFunction";
export declare const EXP = "Exp";
export declare const SQRT = "Sqrt";
export declare const ROOT = "Root";
export declare const PRIME = "Prime";
export declare const COMPLEX_INFINITY = "COMPLEX_INFINITY";
export declare const PI = "PI";
export declare const EXPONENTIAL_E = "E";
export declare const IMAGINARY_I = "I";
export declare function getDefaultDictionary(domain?: DictionaryCategory | 'all'): Dictionary;
export declare function findInDictionary(dic: Dictionary, name: string): SymbolDefinition | FunctionDefinition | null;
export declare function findFunctionInDictionary(dic: Dictionary, name: string): FunctionDefinition | null;
export declare function findSymbolInDictionary(dic: Dictionary, name: string): SymbolDefinition | null;
export declare const DICTIONARY: {
    [category in DictionaryCategory]?: Dictionary;
};
