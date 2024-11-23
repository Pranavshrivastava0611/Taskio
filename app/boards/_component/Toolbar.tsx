// import React from 'react'
// import { Skeleton } from '@/components/ui/skeleton'
// import { ToolButton } from './tool-button'
// import { Circle, MousePointer2, Pen, Redo2, Square, StickyNote, Type, Undo2 } from 'lucide-react'
// import { CanvasMode, CanvasState } from '@/types/canvas'

// interface ToolbarProps {
//   // want to declare the type of the whole object then we use the interface and when only a single type repeating continuously we can declare it's type 
//   canvasState  : CanvasState,
//   setCanvasState : (newState : CanvasState)=> void,
//   undo : ()=>void,
//   redo : ()=>void,
//   canUndo : boolean,
//   canRedo : boolean
// }

// function Toolbar({canvasState,setCanvasState,redo,undo,canRedo,canUndo}:ToolbarProps) {
//   return (
//     <div className='absolute top-[50%] translate-y-[60%] flex flex-col left-2 gap-y-4'>
//       <div className=' rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-lg'>
//         <ToolButton label='Select'icon={MousePointer2} onclick={()=>setCanvasState({mode : CanvasMode.None})} isActive={
//           canvasState.mode === CanvasMode.None
//         } />
//         <ToolButton label='Text'icon={Type} onclick={()=>{}} isActive={false}/>
//         <ToolButton label='Sticky note'icon={StickyNote} onclick={()=>setCanvasState({
//           mode : CanvasMode.Inserting 
//         })} isActive={
//           canvasState.mode ===  CanvasMode.Inserting
//         }/>
//         <ToolButton label='Rectangle'icon={Square} onclick={()=>{}} isActive={false}/>
//         <ToolButton label='Ellipse'icon={Circle} onclick={()=>{}} isActive={false}/>
//         <ToolButton label='Pen'icon={Pen} onclick={()=>{}} isActive={false}/>
//       </div>
//       <div className='bg-white rounded-md flex items-center p-1.5 flex-col shadow-md '>
//       <ToolButton label='Undo'icon={Undo2} onclick={undo} isActive={false} isdisabled={!canUndo}/>
//       <ToolButton label='Redo'icon={Redo2} onclick={redo} isActive={false} isdisabled={!canRedo}/>
//       </div>
//     </div>

//   )
// }

// Toolbar.Skeleton = function ToolbarSkeleton(){
//     return (
//          <div className='absolute top-[50%] translate-y-[60%] flex flex-col left-2 gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md'/>
             
      
//     )
// }

// export default Toolbar

import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";
import { ToolButton } from "./tool-button";
import { History } from "@liveblocks/client";
import { useHistory } from "@/liveblocks.config";

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: ToolbarProps) => {
  const  history = useHistory();
  return (
    <div className="absolute top-[50%] -translate-y-[50%] flex flex-col left-2 gap-y-4">
      <div className="rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-lg">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onclick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        />
        <ToolButton
          label="Text"
          icon={Type}
          onclick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        />
        <ToolButton
          label="Sticky note"
          icon={StickyNote}
          onclick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onclick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onclick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
        />
        <ToolButton
          label="Pen"
          icon={Pencil}
          onclick={() =>
            setCanvasState({
              mode: CanvasMode.Pencil,
            })
          }
          isActive={canvasState.mode === CanvasMode.Pencil}
        />
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <ToolButton
          label="Undo"
          icon={Undo2}
          onclick={history.undo}
          isdisabled={!undo}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          onclick={history.redo}
          isdisabled={!redo}
        />
      </div>
    </div>
  );
};

Toolbar.Skeleton = function ToolbarSkeleton(){
    return (
         <div className='absolute top-[50%] -translate-y-[50%] flex flex-col left-2 gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md'/>
    )
}