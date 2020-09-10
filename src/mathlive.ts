import type { Mathfield } from './public/mathfield';
import type { MathfieldConfig, TextToSpeechOptions } from './public/config';
import type {
    ErrorListener,
    ParserErrorCode,
    MathfieldErrorCode,
} from './public/core';

import { decompose } from './core/atom-utils';
import { parseString } from './core/parser';
import { coalesce, makeSpan, makeStruts } from './core/span';
import { MACROS, MacroDictionary } from './core/definitions';
import { MathfieldPrivate } from './editor/mathfield-class';
import AutoRender from './addons/auto-render';
import {
    MathJsonLatexOptions,
    MathJson,
    atomtoMathJson,
    jsonToLatex,
} from './addons/math-json';
import MathLiveDebug from './addons/debug';
import { MATHSTYLES } from './core/mathstyle';
import { defaultSpeakHook } from './editor/speech';
import {
    defaultReadAloudHook,
    readAloudStatus,
    pauseReadAloud,
    resumeReadAloud,
    playReadAloud,
} from './editor/speech-read-aloud';
import { atomToSpeakableText } from './editor/atom-to-speakable-text';
import { atomsToMathML } from './addons/math-ml';

import './addons/definitions-metadata';
import { AutoRenderOptionsPrivate } from './addons/auto-render';
import { ErrorCode as MathJsonErrorCode } from './math-json/public';
import { ErrorCode, Form, Expression, Dictionary } from './math-json/public';
import { parseLatex, emitLatex } from './math-json/math-json';
import { ParseLatexOptions, EmitLatexOptions } from './math-json/latex/public';
import { DEFAULT_LATEX_DICTIONARY } from './math-json/latex/definitions';
import { form } from './math-json/forms';

function latexToMarkup(
    text: string,
    options: {
        mathstyle?: 'displaystyle' | 'textstyle';
        letterShapeStyle?: 'tex' | 'french' | 'iso' | 'upright' | 'auto';
        macros?: MacroDictionary;
        onError?: ErrorListener<ParserErrorCode>;
        format?: string;
    }
): string {
    options = options ?? {};
    options.mathstyle = options.mathstyle || 'displaystyle';
    options.letterShapeStyle = options.letterShapeStyle || 'auto';
    options.macros = { ...MACROS, ...(options.macros ?? {}) };

    //
    // 1. Parse the formula and return a tree of atoms, e.g. 'genfrac'.
    //

    const atoms = parseString(
        text,
        'math',
        null,
        options.macros,
        false,
        options.onError
    );

    //
    // 2. Transform the math atoms into elementary spans
    //    for example from genfrac to vlist.
    //
    let spans = decompose(
        {
            mathstyle: MATHSTYLES[options.mathstyle],
            letterShapeStyle: options.letterShapeStyle,
        },
        atoms
    );

    //
    // 3. Simplify by coalescing adjacent nodes
    //    for example, from <span>1</span><span>2</span>
    //    to <span>12</span>
    //
    spans = coalesce(spans);

    if (options.format === 'span') return (spans as unknown) as string;

    //
    // 4. Wrap the expression with struts
    //
    const wrapper = makeStruts(makeSpan(spans, 'ML__base'), 'ML__mathlive');

    //
    // 5. Generate markup
    //

    return wrapper.toMarkup();
}

function makeMathField(
    element: HTMLElement,
    config?: MathfieldConfig
): Mathfield {
    config = config ?? {};
    config.speakHook = config.speakHook ?? defaultSpeakHook;
    config.readAloudHook = config.readAloudHook ?? defaultReadAloudHook;
    return new MathfieldPrivate(getElement(element), config);
}

function latexToMathML(
    latex: string,
    options?: {
        macros?: MacroDictionary;
        onError?: ErrorListener<ParserErrorCode>;
        generateID?: boolean;
    }
): string {
    options = options ?? {};
    options.macros = { ...MACROS, ...(options.macros ?? {}) };

    return atomsToMathML(
        parseString(latex, 'math', [], options.macros, false, options.onError),
        options
    );
}
function latexToAST(
    latex: string,
    options?: MathJsonLatexOptions & {
        macros?: MacroDictionary;
        onError?: ErrorListener<ParserErrorCode | MathJsonErrorCode>;
    }
): MathJson {
    options = options ?? {};
    options.macros = { ...MACROS, ...(options.macros ?? {}) };

    // return parseLatex(latex, options);

    return atomtoMathJson(
        parseString(
            latex,
            'math',
            null,
            options.macros,
            false,
            options.onError
        ),
        options
    );
}

function astToLatex(expr: MathJson, options: MathJsonLatexOptions): string {
    return jsonToLatex(
        typeof expr === 'string' ? JSON.parse(expr) : expr,
        options
    );
    // return emitLatex(expr, options);
}
export function latexToMathjson(
    latex: string,
    options?: ParseLatexOptions & {
        macros?: MacroDictionary;
        onError?: ErrorListener<ErrorCode>;
        form?: Form | Form[];
    }
): Expression {
    options = options ?? {};
    options.macros = { ...MACROS, ...(options.macros ?? {}) };

    return parseLatex(latex, options);
}

export function mathjsonToLatex(
    expr: Expression,
    options: EmitLatexOptions & {
        dictionary?: Dictionary;
        onError?: ErrorListener<ErrorCode>;
    }
): string {
    return emitLatex(expr, options);
}

function latexToSpeakableText(
    latex: string,
    options: TextToSpeechOptions & {
        macros?: MacroDictionary;
        onError?: ErrorListener<ParserErrorCode | MathfieldErrorCode>;
    }
): string {
    options = options ?? {};
    options.macros = options.macros ?? {};
    Object.assign(options.macros, MACROS);

    const mathlist = parseString(
        latex,
        'math',
        null,
        options.macros,
        false,
        options.onError
    );

    return atomToSpeakableText(
        mathlist,
        options as Required<TextToSpeechOptions>
    );
}

function renderMathInDocument(options: AutoRenderOptionsPrivate): void {
    renderMathInElement(document.body, options);
}

function getElement(element: string | HTMLElement): HTMLElement {
    if (typeof element === 'string') {
        const result: HTMLElement = document.getElementById(element);
        if (result === null) {
            throw Error(`The element with ID "${element}" could not be found.`);
        }
        return result;
    }
    return element;
}

function renderMathInElement(
    element: HTMLElement,
    options: AutoRenderOptionsPrivate
): void {
    options = options ?? {};
    options.renderToMarkup = options.renderToMarkup ?? latexToMarkup;
    options.renderToMathML = options.renderToMathML ?? latexToMathML;
    options.renderToSpeakableText =
        options.renderToSpeakableText ?? latexToSpeakableText;
    options.macros = options.macros ?? MACROS;
    AutoRender.renderMathInElement(getElement(element), options);
}

function validateNamespace(options): void {
    if (typeof options.namespace === 'string') {
        if (!/^[a-z]+[-]?$/.test(options.namespace)) {
            throw Error(
                'options.namespace must be a string of lowercase characters only'
            );
        }
        if (!/-$/.test(options.namespace)) {
            options.namespace += '-';
        }
    }
}

function revertToOriginalContent(
    element: string | HTMLElement | MathfieldPrivate,
    options: AutoRenderOptionsPrivate
): void {
    if (element instanceof MathfieldPrivate) {
        element.$revertToOriginalContent();
    } else {
        // element is a pair: accessible span, math -- set it to the math part
        element = getElement(element).children[1] as HTMLElement;
        options = options ?? {};
        validateNamespace(options);
        const html = element.getAttribute(
            'data-' + (options.namespace ?? '') + 'original-content'
        );
        element.innerHTML =
            typeof options.createHTML === 'function'
                ? options.createHTML(html)
                : html;
    }
}

function getOriginalContent(
    element: string | HTMLElement,
    options: AutoRenderOptionsPrivate
): string {
    if (element instanceof MathfieldPrivate) {
        return element.originalContent;
    }
    // element is a pair: accessible span, math -- set it to the math part
    element = getElement(element).children[1] as HTMLElement;
    options = options ?? {};
    validateNamespace(options);
    return element.getAttribute(
        'data-' + (options.namespace ?? '') + 'original-content'
    );
}

// This SDK_VERSION variable will be replaced during the build process.
const version = '{{SDK_VERSION}}';

export default {
    DEFAULT_LATEX_DICTIONARY,
    form,
    version,
    latexToMarkup,
    latexToMathML,
    latexToSpeakableText,
    latexToAST,
    astToLatex,
    makeMathField,
    renderMathInDocument,
    renderMathInElement,
    revertToOriginalContent,
    getOriginalContent,

    readAloud: defaultReadAloudHook,
    readAloudStatus,
    pauseReadAloud,
    resumeReadAloud,
    playReadAloud,

    debug: {
        getStyle: MathLiveDebug.getStyle,
        getType: MathLiveDebug.getType,
        spanToString: MathLiveDebug.spanToString,
        hasClass: MathLiveDebug.hasClass,
        latexToAsciiMath: MathLiveDebug.latexToAsciiMath,
        asciiMathToLatex: MathLiveDebug.asciiMathToLatex,
        FUNCTIONS: MathLiveDebug.FUNCTIONS,
        MATH_SYMBOLS: MathLiveDebug.MATH_SYMBOLS,
        TEXT_SYMBOLS: MathLiveDebug.TEXT_SYMBOLS,
        ENVIRONMENTS: MathLiveDebug.ENVIRONMENTS,
        MACROS: MathLiveDebug.MACROS,
        DEFAULT_KEYBINDINGS: MathLiveDebug.DEFAULT_KEYBINDINGS,
        getKeybindingMarkup: MathLiveDebug.getKeybindingMarkup,
    },
};
