"use client"

import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";


interface RectangleProps {
    id : string;
    layer : RectangleLayer,
    onPointerDown : (e : React.PointerEvent, id : string)=>void
    selectionColor? : string;
}
export const Rectangle = ({id,layer,onPointerDown,selectionColor} : RectangleProps)=>{
    const {x,y,width,height,fill} = layer;
    console.log("points" , {
        x : x ,
        y : y,
        height : height,
        width : width,
    })
    return (
        <rect 
        className="drop-shadow-lg"
        onPointerDown={(e)=>onPointerDown(e,id)}
        style={{
            transform : `translate(${x}px, ${y}px)`,
            pointerEvents: 'auto', // Ensures the rectangle can capture pointer events
        }}
        x={0}
        y={0}
        width={width}
        height={height}
        strokeWidth={3}
        fill={fill ? colorToCss(fill) :  '#000'}
        stroke={selectionColor || 'transparent'}
        />
    )
}