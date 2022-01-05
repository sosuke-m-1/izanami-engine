import { ReactElement } from "react";
import * as CSS from 'csstype';
import { renderToStaticMarkup } from 'react-dom/server';

type DrawHtml = (
    context: CanvasRenderingContext2D,
    html: ReactElement,
    x?: number,
    y?: number,
    styles?: CSS.Properties
) => CanvasRenderingContext2D

export const drawHtml: DrawHtml = (context, html, x = 0, y = 0, styles = {}) => {
    if (typeof html.props.children === 'string') {
        drawText(context, html.props.children, x, y, html.props.style);
    } else if (typeof html.props.children === 'undefined') { // when SVG
        console.log(renderToStaticMarkup(html));
    } else {
        drawHtml(context, html.props.children)
    }

    return context
}

const drawText = (
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    styles?: CSS.Properties
) => {
    if (styles) stylize(context, styles);

    // measureText(context, text);
    context.fillText(text, x, y);

    return context
}

const scale = (number: number): number => {
    const scale = window.devicePixelRatio
    return number * scale
}

const stylize = (
    context: CanvasRenderingContext2D,
    styles: CSS.Properties
): CanvasRenderingContext2D => {
    let property: keyof CSS.Properties;
    for (property in styles) {
        if (property === 'color') context.fillStyle = String(styles[property])
        if (property === 'font') context.font = String(styles[property])
        if (property === 'textAlign') context.textAlign = canvasTextAlign(styles[property])
    }
    context.textBaseline = 'top'
    return context
}

const canvasTextAlign: (value: string | undefined) => CanvasTextAlign = (value) => {
    if (value === "center" || value === "end" || value === "left" || value === "right" || value === "start") {
        return value;
    }
    throw new Error(`${value} is not an CanvasTextAlign`);
}

const measureText = (
    context: CanvasRenderingContext2D,
    text: string,
) => {
    const measure = context.measureText(text);
    const width = measure.width;
    const height = measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent;
    context.fillRect(100, 100, width, height)
}

const superviseStyleSheets = () => {
    type style = {
        property: string,
        value: string
    }
    type css = {
        name: string,
        styles: style[]
    }
    type supervised = css[]

    let supervised: supervised = [];

    for (let index = 0; index < document.styleSheets.length; index++) {
        const rules = document.styleSheets.item(index)?.cssRules;
        if (!rules) continue;

        for (let index = 0; index < rules.length; index++) {
            const rule = rules[index];

            if (!(rule instanceof CSSStyleRule)) {
                continue;
            }

            for (let index = 0; index < rule.style.length; index++) {
                let property: any; // NEED FIX
                property = rule.style[index];
                if (property.startsWith('-webkit-')) {
                    continue;
                }

                const value = rule.style[property];
                const className = rule.selectorText.slice(1)
                const cssIndex = supervised.findIndex(({ name }) => name === className)
                if (cssIndex !== -1) {
                    supervised[cssIndex]['styles'].splice(0, 0, { property: property, value: value })
                } else {
                    supervised.splice(0, 0, { name: className, styles: [{ property: property, value: value }] });
                }
            }
        }
    }
    return supervised
}

const clearStyle = (context: CanvasRenderingContext2D): CanvasRenderingContext2D => {
    context.font = 'normal 10px sans-serif'
    context.textBaseline = 'top'
    context.textAlign = 'left'
    context.fillStyle = '#000000'
    context.strokeStyle = '#000000'
    return context
}