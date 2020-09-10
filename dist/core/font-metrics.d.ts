/* 0.56.0 */interface CharacterMetrics {
    defaultMetrics: boolean;
    depth: number;
    height: number;
    italic: number;
    skew: number;
}
export declare const SIGMAS: {
    slant: number[];
    space: number[];
    stretch: number[];
    shrink: number[];
    xHeight: number[];
    quad: number[];
    extraSpace: number[];
    num1: number[];
    num2: number[];
    num3: number[];
    denom1: number[];
    denom2: number[];
    sup1: number[];
    sup2: number[];
    sup3: number[];
    sub1: number[];
    sub2: number[];
    supDrop: number[];
    subDrop: number[];
    delim1: number[];
    delim2: number[];
    axisHeight: number[];
};
export declare const METRICS: {
    defaultRuleThickness: number;
    bigOpSpacing1: number;
    bigOpSpacing2: number;
    bigOpSpacing3: number;
    bigOpSpacing4: number;
    bigOpSpacing5: number;
    ptPerEm: number;
    pxPerEm: number;
    doubleRuleSep: number;
    arraycolsep: number;
    baselineskip: number;
    arrayrulewidth: number;
    fboxsep: number;
    fboxrule: number;
};
/**
 * This function is a convenience function for looking up information in the
 * METRICS_MAP table. It takes a character as a string, and a font name.
 *
 * Note: the `width` property may be undefined if fontMetricsData.js wasn't
 * built using `Make extended_metrics`.
 * @param fontName e.g. 'Main-Regular', 'Typewriter-Regular', etc...
 */
export declare function getCharacterMetrics(character: string, fontName: string): CharacterMetrics;
/**
 *
 * @param value If value is a string, it may be suffixed
 * with a unit, which will override the `unit` paramter
 */
export declare function convertDimenToEm(value: number | string, unit: string, precision?: number): number;
export declare function convertDimenToPx(value: string | number, unit: string): number;
export {};
