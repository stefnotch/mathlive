/* 0.56.0 */import { ErrorListener } from '../../public/core';
import { DictionaryCategory, Expression, ErrorCode } from '../public';
import { LatexDictionary, Latex, LatexToken, ParserFunction, EmitterFunction } from './public';
export declare type IndexedLatexDictionaryEntry = {
    name: string;
    trigger: {
        symbol?: LatexToken | LatexToken[];
        matchfix?: LatexToken | LatexToken[];
        infix?: LatexToken | LatexToken[];
        prefix?: LatexToken | LatexToken[];
        postfix?: LatexToken | LatexToken[];
        superfix?: LatexToken | LatexToken[];
        subfix?: LatexToken | LatexToken[];
    };
    parse: Expression | ParserFunction;
    emit: EmitterFunction | Latex;
    associativity?: 'right' | 'left' | 'non' | 'both';
    precedence?: number;
    arguments?: 'group' | 'implicit' | '';
    optionalLatexArg?: number;
    requiredLatexArg?: number;
    separator?: Latex;
    closeFence?: Latex;
};
export declare type IndexedLatexDictionary = {
    lookahead: number;
    name: Map<string, IndexedLatexDictionaryEntry>;
    prefix: (Map<Latex, IndexedLatexDictionaryEntry> | null)[];
    infix: (Map<Latex, IndexedLatexDictionaryEntry> | null)[];
    postfix: (Map<Latex, IndexedLatexDictionaryEntry> | null)[];
    matchfix: (Map<Latex, IndexedLatexDictionaryEntry> | null)[];
    superfix: (Map<Latex, IndexedLatexDictionaryEntry> | null)[];
    subfix: (Map<Latex, IndexedLatexDictionaryEntry> | null)[];
    symbol: (Map<Latex, IndexedLatexDictionaryEntry> | null)[];
    environment: Map<string, IndexedLatexDictionaryEntry>;
};
export declare function indexLatexDictionary(dic: LatexDictionary, onError: ErrorListener<ErrorCode>): IndexedLatexDictionary;
export declare function getDefaultLatexDictionary(domain?: DictionaryCategory | 'all'): LatexDictionary;
export declare const DEFAULT_LATEX_DICTIONARY: {
    [category in DictionaryCategory]?: LatexDictionary;
};
