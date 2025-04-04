"use client"



import { useStorage } from '@/liveblocks.config';
import { memo } from 'react';
import React from 'react'
import { LayerType } from '@/types/canvas';
import { Rectangle } from './rectangle';
import { Ellipse } from './ellipse';
import { Note } from './note';
import { Text } from './text';
import { colorToCss } from '@/lib/utils';
import { Path } from './path';

interface LayerPreviewProps{
  id : string,
  onLayerPointerDown : (e : React.PointerEvent,layerId : string)=> void;
  selectionColor? : string;
}

export const LayerPreview = memo(({id,onLayerPointerDown,selectionColor} : LayerPreviewProps)=>{
  const layer = useStorage((root)=>root.layers.get(id));
  console.log(layer);

  if(!layer){
    return null;
  }

  switch(layer.type){
    case LayerType.Rectangle : 
    // console.log("yehi hai")
    return (
        <Rectangle id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
    );

    case LayerType.Ellipse : 
    return (
      <Ellipse 
      id={id}
      layer={layer}
      onPointerDown={onLayerPointerDown}
      selectionColor ={selectionColor}/>
    )

    case  LayerType.Note :
      return (
        <Note
        id={id}
        layer={layer}
        onPointerDown={onLayerPointerDown}
        selectionColor={selectionColor}
      />
      )
    case LayerType.Text :
      return (
        <Text
        id={id}
        layer={layer}
        onPointerDown={onLayerPointerDown}
        selectionColor={selectionColor}
      />
      )

      case LayerType.Path : 
      return (
        <Path
        points={layer.points}
        onPointerDown={(e) => onLayerPointerDown(e, id)}
        x={layer.x}
        y={layer.y}
        fill={layer.fill ? colorToCss(layer.fill) : "#000"}
        stroke={selectionColor}
      />
      )
      
    

    // default :
    // console.warn("Unknown layer type");
    // return null;
  }

});


LayerPreview.displayName="LayerPreview"
