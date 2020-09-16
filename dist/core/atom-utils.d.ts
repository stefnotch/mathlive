/* 0.56.0 */import { Context, ContextInterface, ParseModePrivate } from './context';
import { Style, ParseMode, Variant, VariantStyle, FontShape, FontSeries } from '../public/core';
import { SpanType, Span } from './span';
export declare type Notations = {
    downdiagonalstrike?: boolean;
    updiagonalstrike?: boolean;
    verticalstrike?: boolean;
    horizontalstrike?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    top?: boolean;
    circle?: boolean;
    roundedbox?: boolean;
    madruwb?: boolean;
    actuarial?: boolean;
    box?: boolean;
};
export declare type AtomType = '' | 'array' | 'box' | 'command' | 'delim' | 'enclose' | 'error' | 'first' | 'genfrac' | 'group' | 'leftright' | 'mathstyle' | 'mbin' | 'mclose' | 'minner' | 'mop' | 'mopen' | 'mord' | 'mpunct' | 'mrel' | 'msubsup' | 'none' | 'overlap' | 'overunder' | 'placeholder' | 'root' | 'rule' | 'sizeddelim' | 'space' | 'spacing' | 'surd' | 'textord';
export declare type Colspec = {
    gap?: number | Atom[];
    align?: 'l' | 'c' | 'r' | 'm';
    rule?: boolean;
};
export declare type BBoxParam = {
    backgroundcolor?: string;
    padding?: number;
    border?: string;
};
export declare const ATOM_REGISTRY: {};
export declare const SIZING_MULTIPLIER: {
    size1: number;
    size2: number;
    size3: number;
    size4: number;
    size5: number;
    size6: number;
    size7: number;
    size8: number;
    size9: number;
    size10: number;
};
export declare function registerAtomType(name: string, decompose: (context: Context, atom: Atom) => Span[]): void;
/**
 * Return a list of spans equivalent to atoms.
 * A span is the most elementary type possible, for example 'text'
 * or 'vlist', while the input atoms may be more abstract and complex,
 * such as 'genfrac'
 *
 * @param context Font family, variant, size, color, and other info useful
 * to render an expression
 * @param atoms - A single atom or an array of atoms
 */
export declare function decompose(inputContext: ContextInterface, atoms: Atom | Atom[]): Span[] | null;
/**
 * An atom is an object encapsulating an elementary mathematical unit,
 * independent of its graphical representation.
 *
 * It keeps track of the content, while the dimensions, position and style
 * are tracked by Span objects which are created by the `decompose()` functions.
 *
 * @param style A set of additional properties to append to
 * the atom
 * @property mode - `'display'`, `'command'`, etc...
 * @property type - Type can be one of:
 * - `mord`: ordinary symbol, e.g. `x`, `\alpha`
 * - `textord`: ordinary characters
 * - `mop`: operators, including special functions, `\sin`, `\sum`, `\cap`.
 * - `mbin`: binary operator: `+`, `*`, etc...
 * - `mrel`: relational operator: `=`, `\ne`, etc...
 * - `mpunct`: punctuation: `,`, `:`, etc...
 * - `mopen`: opening fence: `(`, `\langle`, etc...
 * - `mclose`: closing fence: `)`, `\rangle`, etc...
 * - `minner`: special layout cases, overlap, `\left...\right`
 *
 * In addition to these basic types, which correspond to the TeX atom types,
 * some atoms represent more complex compounds, including:
 * - `space` and `spacing`: blank space between atoms
 * - `mathstyle`: to change the math style used: `display` or `text`.
 * The layout rules are different for each, the latter being more compact and
 * intended to be incorporated with surrounding non-math text.
 * - `root`: a group, which has no parent (only one per formula)
 * - `group`: a simple group of atoms, for example from a `{...}`
 * - `sizing`: set the size of the font used
 * - `rule`: draw a line, for the `\rule` command
 * - `line`: used by `\overline` and `\underline` commands
 * - `box`: a border drawn around an expression and change its background color
 * - `overlap`: display a symbol _over_ another
 * - `overunder`: displays an annotation above or below a symbol
 * - `array`: a group, which has children arranged in rows. Used
 * by environments such as `matrix`, `cases`, etc...
 * - `genfrac`: a generalized fraction: a numerator and denominator, separated
 * by an optional line, and surrounded by optional fences
 * - `surd`: a surd, aka root
 * - `leftright`: used by the `\left` and `\right` commands
 * - `delim`: some delimiter
 * - `sizeddelim`: a delimiter that can grow
 *
 * The following types are used by the editor:
 * - `command` indicate a command being entered. The text is displayed in
 * blue in the editor.
 * - `error`: indicate a command that is unknown, for example `\xyzy`. The text
 * is displayed with a wavy red underline in the editor.
 * - `placeholder`: indicate a temporary item. Placeholders are displayed
 * as a dashed square in the editor.
 * - `first`: a special, empty, atom put as the first atom in math lists in
 * order to be able to position the caret before the first element. Aside from
 * the caret, they display nothing.
 *
 * @property captureSelection if true, this atom does not let its
 * children be selected. Used by the `\enclose` annotations, for example.
 *
 * @property skipBoundary if true, when the caret reaches the
 * first position in this element's body, it automatically moves to the
 * outside of the element. Conversely, when the caret reaches the position
 * right after this element, it automatically moves to the last position
 * inside this element.
 */
export declare class Atom implements Style {
    mode: ParseModePrivate;
    type: AtomType;
    latex?: string;
    symbol?: string;
    readonly isSymbol?: boolean;
    isFunction?: boolean;
    isError?: boolean;
    isSuggestion?: boolean;
    isPhantom?: boolean;
    readonly skipBoundary?: boolean;
    captureSelection?: boolean;
    isSelected?: boolean;
    containsCaret: boolean;
    caret: ParseMode | '';
    latexOpen?: string;
    latexClose?: string;
    body?: string | Atom[];
    readonly codepoint?: number;
    readonly accent?: string;
    readonly svgAccent?: string;
    readonly svgBody?: string;
    readonly svgAbove?: string;
    readonly svgBelow?: string;
    index?: Atom[];
    denom?: Atom[];
    numer?: Atom[];
    readonly numerPrefix?: string;
    readonly denomPrefix?: string;
    readonly continuousFraction?: boolean;
    readonly hasBarLine?: boolean;
    subscript?: Atom[];
    superscript?: Atom[];
    underscript?: Atom[];
    overscript?: Atom[];
    readonly position: string;
    limits?: 'limits' | 'nolimits' | 'accent' | 'overunder';
    explicitLimits?: boolean;
    array?: Atom[][][];
    environmentName?: string;
    readonly arraystretch?: number;
    readonly arraycolsep?: number;
    readonly jot?: number;
    rowGaps?: number[];
    readonly colFormat?: Colspec[];
    inner?: boolean;
    leftDelim?: string;
    rightDelim?: string;
    private size?;
    readonly delim?: string;
    readonly framecolor?: string;
    readonly verbatimFramecolor?: string;
    readonly backgroundcolor?: string;
    readonly verbatimBackgroundcolor?: string;
    readonly padding?: number;
    readonly border?: string;
    readonly notation?: Notations;
    readonly shadow?: string;
    readonly strokeWidth?: number;
    readonly strokeStyle?: string;
    readonly svgStrokeStyle?: string;
    readonly strokeColor?: string;
    readonly borderStyle?: string;
    readonly shift?: number;
    private depth?;
    readonly height?: number;
    width?: number;
    readonly phantomType?: 'phantom' | 'vphantom' | 'hphantom' | 'smash' | 'bsmash' | 'tsmash';
    private maxFontSize?;
    private align?;
    mathstyle?: 'auto' | 'displaystyle' | 'textstyle' | 'scriptstyle' | 'scriptscriptstyle';
    private cls?;
    color?: string;
    backgroundColor?: string;
    variant?: Variant;
    variantStyle?: VariantStyle;
    fontFamily?: string;
    fontShape?: FontShape;
    fontSeries?: FontSeries;
    fontSize?: string;
    cssId?: string;
    cssClass?: string;
    letterShapeStyle?: 'tex' | 'french' | 'iso' | 'upright' | 'auto';
    id?: string;
    constructor(mode: ParseModePrivate, type: AtomType, body?: string | Atom[], style?: Style);
    toLatex(expandMacro?: boolean): string;
    getStyle(): Style;
    applyStyle(style: Style): void;
    getInitialBaseElement(): Atom;
    getFinalBaseElement(): Atom;
    isCharacterBox(): boolean;
    setPhantom(isPhantom: boolean): void;
    forEach(cb: (arg0: this) => void): void;
    /**
     * Iterate over all the child atoms of this atom, this included,
     * and return an array of all the atoms for which the predicate callback
     * is true.
     */
    filter(cb: (atom: Atom) => boolean): Atom[];
    decomposeGroup(context: Context): Span;
    decomposeOverlap(context: Context): Span;
    decomposeRule(context: Context): Span;
    /**
     * Return a representation of this, but decomposed in an array of Spans
     *
     * @param context Font variant, size, color, etc...
     * @param phantomBase If not null, the spans to use to
     * calculate the placement of the supsub
     */
    decompose(context: Context, phantomBase?: Span[] | null): Span[] | null;
    attachSupsub(context: Context, nucleus: Span, type: SpanType): Span;
    attachLimits(context: Context, nucleus: Span, nucleusShift: number, slant: number): Span;
    /**
     * Add an ID attribute to both the span and this atom so that the atom
     * can be retrieved from the span later on (e.g. when the span is clicked on)
     */
    bind(context: Context, span: Span): Span;
    /**
     * Create a span with the specified body and with a class attribute
     * equal to the type ('mbin', 'inner', 'spacing', etc...)
     *
     */
    makeSpan(context: Context, body: string | Span | Span[]): Span;
}
/**
 * Return an atom suitable for use as the root of a formula.
 */
export declare function makeRoot(parseMode: ParseModePrivate, body?: Atom[]): Atom;
export declare function isAtomArray(arg: string | Atom | Atom[]): arg is Atom[];
