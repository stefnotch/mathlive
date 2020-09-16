/* 0.56.0 *//**
 * This module contains some color dictionaries and algorithms to
 * parse a string into a hex RGB color value.s
 * @summary   Parsing of color strings.
 */
export declare const AREA_COLORS: string[];
export declare const LINE_COLORS: string[];
/**
 * Return a CSS color (#rrggbb) from a string.
 *
 * Possible formats include:
 * - named colors from the DVI color set: 'Yellow', 'red'... Case insensitive.
 * - colors from the Mathematica set: 'm1'...'m9'
 * - 3-digit hex: `'#d50'`
 * - 6-digit hex: `'#dd5500'`
 * - RGB functional: `'rgb(240, 20, 10)'`
 *
 * In addition, colors can be mixed using the following syntax:
 * `<mix> = <color>![<value>][!<mix>]`
 * For example:
 * - `'blue!20'`  = 20% blue + 80% white
 * - `'blue!20!black'` = 20% + 80% black
 * - `'blue!20!black!30!green'` = (20% + 80% black) * 30 % + 70% green
 *
 * If the input string is prefixed with a dash, the complementary color
 * of the expression is returned.
 *
 * This creative syntax is defined by the {@link http://mirror.jmu.edu/pub/CTAN/macros/latex/contrib/xcolor/xcolor.pdf | `xcolor` LaTeX package}.
 *
 * @param s - An expression representing a color value
 * @return An RGB color expressed as a hex-triplet preceded by `#`
 */
export declare function stringToColor(s: string): string;
export declare function colorToString(color: string): string;
