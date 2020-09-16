/* 0.56.0 *//**
 * This module deals with creating delimiters of various sizes. The TeXbook
 * discusses these routines on page 441-442, in the "Another subroutine sets box
 * x to a specified variable delimiter" paragraph.
 *
 * There are three main routines here. `makeSmallDelim` makes a delimiter in the
 * normal font, but in either text, script, or scriptscript style.
 * `makeLargeDelim` makes a delimiter in textstyle, but in one of the Size1,
 * Size2, Size3, or Size4 fonts. `makeStackedDelim` makes a delimiter out of
 * smaller pieces that are stacked on top of one another.
 *
 * The functions take a parameter `center`, which determines if the delimiter
 * should be centered around the axis.
 *
 * Then, there are three exposed functions. `sizedDelim` makes a delimiter in
 * one of the given sizes. This is used for things like `\bigl`.
 * `customSizedDelim` makes a delimiter with a given total height+depth. It is
 * called in places like `\sqrt`. `leftRightDelim` makes an appropriate
 * delimiter which surrounds an expression of a given height an depth. It is
 * used in `\left` and `\right`.
 * @summary   Handling of delimiters surrounds symbols.
 */
import { SpanType, Span } from './span';
import { Context } from './context';
/**
 * Used to create a delimiter of a specific size, where `size` is 1, 2, 3, or 4.
 */
export declare function makeSizedDelim(type: SpanType, delim: string, size: number, context: Context, classes?: string): Span;
/**
 * Make a delimiter of a given height+depth, with optional centering. Here, we
 * traverse the sequences, and create a delimiter that the sequence tells us to.
 *
 * @param type - 'mopen' or 'mclose'
 */
export declare function makeCustomSizedDelim(type: SpanType, delim: string, height: number, center: boolean, context: Context, classes?: string): Span;
/**
 * Make a delimiter for use with `\left` and `\right`, given a height and depth
 * of an expression that the delimiters surround.
 * See tex.web:14994
 */
export declare function makeLeftRightDelim(type: SpanType, delim: string, height: number, depth: number, context: Context, classes?: string): Span;
