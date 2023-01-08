import React, { useEffect, useRef } from "react";
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad:false,
    htmlLabels: true
});

export function Diagram({id, type, children}: {
    id: string;
    type: 'graph TD' | 'sequenceDiagram';
    children: unknown[]
}) {
    const ref = useRef<HTMLDivElement>();

    useEffect(() => {
        const array = (children instanceof Array ? children: [children]) as string[];
        const text = [type, '\n', ...array].reduce((str, current) => `${str}${getString(current)}`);
        console.log(text)
        mermaid.render(id, text, (svgCode) => ref.current!.innerHTML = svgCode);
    }, [id, children, ref])
    return <div ref={ref as any} />
}

function getString(text: any) {
    return `${text}`;
}