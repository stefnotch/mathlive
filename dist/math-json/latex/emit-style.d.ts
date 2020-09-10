/* 0.56.0 */import { Expression } from '../public';
export declare function getApplyFunctionStyle(_expr: Expression, _level: number): 'paren' | 'leftright' | 'big' | 'none';
export declare function getGroupStyle(_expr: Expression, _level: number): 'paren' | 'leftright' | 'big' | 'none';
export declare function getRootStyle(_expr: Expression, level: number): 'radical' | 'quotient' | 'solidus';
export declare function getFractionStyle(_expr: Expression, level: number): 'quotient' | 'inline-solidus' | 'nice-solidus' | 'reciprocal' | 'factor';
export declare function getLogicStyle(_expr: Expression, _level: number): 'word' | 'boolean' | 'uppercase-word' | 'punctuation';
export declare function getPowerStyle(_expr: Expression, _level: number): 'root' | 'solidus' | 'quotient';
