'use client'

import * as React from "react"
import { useEffect, useRef } from "react"

interface MaxTextProps {
    text: string;
    textAlign?: 'left' | 'center' | 'right';
    topMarginPercent: number;
    bottomMarginPercent: number;
}

const styleText = (svgElement: SVGSVGElement, props: MaxTextProps) => {
    const align = props.textAlign ?? 'center'
    if (align == 'center') {
        let maxTextWidth = 0;
        let thisTextWidth = 0;
        // Get width of widest line
        for (const text of svgElement.children) {
            if (text instanceof SVGTextElement) {
                thisTextWidth = text.getBBox().width;
                if (thisTextWidth > maxTextWidth) {
                    maxTextWidth = thisTextWidth;
                }
            }
            // Shift narrower lines right, centering them relative to the widest line
            for (const text of svgElement.children) {
                if (text instanceof SVGTextElement) {
                    thisTextWidth = text.getBBox().width;
                    if (thisTextWidth < maxTextWidth) {
                        text.setAttribute('dx', ((maxTextWidth - thisTextWidth) / 2).toString());
                    }
                }
            }
        }
        // Shrinkwrap the SVG viewBox to the bounding box of its contents
        const bbox = svgElement.getBBox();
        // Set height to 1 unit larger than bounding box, to avoid cropping
        const height = bbox.height + 1;
        const topMargin = (props.topMarginPercent ?? 0) * height;
        const bottomMargin = (props.bottomMarginPercent ?? 0) * height;
        const viewportY = bbox.y + topMargin;
        const viewportHeight = bbox.height + 1 - topMargin - bottomMargin;
        svgElement.setAttribute('viewBox', `${bbox.x} ${viewportY} ${bbox.width} ${viewportHeight}`);
        // Make SVG element visible
        svgElement.style.visibility = 'visible';
    }
};

const insertText = (svgElement: SVGSVGElement, props: MaxTextProps) => {
    const svgNS = 'http://www.w3.org/2000/svg'
    // Set line height based on default font size
    const lineHeight = 16;
    // Split text into lines
    let dy = 0;
    props.text.split('/').forEach(function (line) {
        // Put each line of text into its own SVG <text> element
        const svgText = document.createElementNS(svgNS, 'text');
        if (dy > 0) {
            svgText.setAttribute('dy', dy.toString())
        }
        svgText.setAttribute('fill', 'currentColor');
        svgElement.appendChild(svgText).textContent = line;
        dy += lineHeight;
    });
    styleText(svgElement, props);
};

const MaxText: React.FC<MaxTextProps> = (props: MaxTextProps) => {

    const svgElement = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgElement.current) {
            insertText(svgElement.current, props);
        }
    }, [svgElement, props]);

    return (
        <div className="w-full">
            <svg ref={svgElement}></svg>
        </div>
    )
}

export default MaxText;
