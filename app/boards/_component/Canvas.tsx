"use client";
import { useCallback, useMemo, useState } from "react";

import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useUndo,
  useRedo,
  useMutation,
  useSelf,
  useOthersMapped,
} from "@/liveblocks.config";
import {
  Camera,
  LayerType,
  Point,
} from "@/types/canvas";
import Info from "./Info";
import { Toolbar } from "./Toolbar";
import Participants from "./Participants";
import { CursorPrensence } from "./CursorPresence";
import { connectionIdToColor, findIntersectingLayersWithRectangle, penPointsToPathLayer, pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { Color } from "@/types/canvas";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";
import { LayerPreview } from "./LayerPreview";
import { Divide, Weight } from "lucide-react";
import { useStorage } from "@/liveblocks.config";
import { CanvasState,CanvasMode,Side,XYWH } from "@/types/canvas";
import { SelectionBox } from "./SelectionBox";
import { SelectionTools } from "./SelectionTools";
import { update } from "@/convex/board";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";

const MAX_LAYERS = 100;
interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf((me) => me.info);
  const layerIds = useStorage((root) => root.layerIds);
  const pencilDraft = useSelf((me)=>me.presence.pencilDraft)

 const [canvasState , setCanvasState] = useState<CanvasState>({
  mode : CanvasMode.None
 })
  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
  });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 225,
    b: 56,
    g: 14,
  });

  const history = useHistory();
  const undo = useUndo();
  const redo = useRedo();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Path
        | LayerType.Note,position : Point
    ) => { 
        const liveLayers = storage.get("layers");
        if(liveLayers.size >= MAX_LAYERS){
            return ;
        }
        const liveLayersIds = storage.get("layerIds");
        const layerId = nanoid();
        const layer = new LiveObject({
            type : layerType,
            x : position.x ,
            y : position.y,
            height : 100,
            width : 100,
            fill : lastUsedColor,
        })

        liveLayersIds.push(layerId);
        liveLayers.set(layerId,layer); 

        setMyPresence({ selection : [layerId]},{addToHistory : true})
        setCanvasState({mode : CanvasMode.None});

    },
    [lastUsedColor]
  );

  const translateSelectedLayers = useMutation(({storage,self},point : Point)=>{
      if(canvasState.mode !== CanvasMode.Translating){
        return ;
      }

      const offset = {
        x : point.x - canvasState.current.x,
        y : point.y - canvasState.current.y
      }

      const liveLayers = storage.get("layers");

      for(const id of self.presence.selection){
        const layer = liveLayers.get(id);

        if(layer){
          layer.update({
            x : layer.get("x") + offset.x,
            y : layer.get("y") + offset.y,

          })
        }
      }

      setCanvasState({mode : CanvasMode.Translating,current : point});
     
  },[canvasState])

  const unselectLayers = useMutation(({self ,setMyPresence})=>{
    if(self.presence.selection.length){
      setMyPresence({selection : []},{addToHistory:true});
    }
  },[])

  const updateSelectionNet = useMutation(({storage,setMyPresence} , current : Point , origin : Point)=>{
    const layers = storage.get("layers").toImmutable();

    setCanvasState({
      mode : CanvasMode.SelectionNet,
      origin,current
    });

    const ids= findIntersectingLayersWithRectangle(layerIds,layers,origin,current);

    setMyPresence({selection : ids })
  },[layerIds])

  const startMultiSelection = useCallback(( current : Point , origin : Point)=>{
   if(Math.abs(current.x-origin.x + Math.abs(current.y) - origin.y) > 5){
      setCanvasState({
        mode : CanvasMode.SelectionNet,
        origin,
        current,
      })
   }
  },[])

  const continueDrawing = useMutation(({
    self,setMyPresence
  },point : Point , e : React.PointerEvent)=>{

    const {pencilDraft} = self.presence;

    if(canvasState.mode !== CanvasMode.Pencil || e.buttons !== 1 || pencilDraft==null){
      return ;
  }

  setMyPresence({
    cursor : point,
    pencilDraft : pencilDraft.length ===1 && pencilDraft[0][0] === point.x && pencilDraft[0][1] === point.y ? pencilDraft : [...pencilDraft,[point.x , point.y , e.pressure]],

  })


},[canvasState.mode])

  const insertPath = useMutation(({storage,self ,setMyPresence})=>{
    const liveLayers = storage.get("layers");
    const {pencilDraft} = self.presence;

    if(pencilDraft==null || pencilDraft.length < 2  || liveLayers.size >= MAX_LAYERS){
      setMyPresence({
        pencilDraft : null
      })
      return ;
    }

    const id = nanoid();
    liveLayers.set(id , new LiveObject(penPointsToPathLayer(pencilDraft,lastUsedColor)));

    const liveLayerIds = storage.get("layerIds");
    liveLayerIds.push(id);

    setMyPresence({
      pencilDraft : null
    });
    setCanvasState({
      mode : CanvasMode.Pencil,
    })
  },[lastUsedColor])
  const startDrawing = useMutation(({setMyPresence} , point : Point , pressure : number)=>{
      setMyPresence({
        pencilDraft : [[point.x,point.y,pressure]],
        penColor : lastUsedColor
      })
  },[lastUsedColor])

  const resizeSelectedLayer = useMutation(({storage,self },point:Point)=>{
    if(canvasState.mode !== CanvasMode.Resizing){
      return ;
    }
    const bounds = resizeBounds(canvasState.initialBounds,canvasState.corner,point)

    const liveLayers = storage.get("layers");
    const layer = liveLayers.get(self.presence.selection[0])
    if(layer){
      layer.update(bounds);
    }

  },[canvasState])


  const onResizeHandlePointerDown = useCallback((corner : Side , initialBounds : XYWH )=>{
      history.pause();
      setCanvasState({
        mode : CanvasMode.Resizing,
        initialBounds,
        corner
      })
  },[history])
  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);

      if(canvasState.mode === CanvasMode.Pressing){
        startMultiSelection(current,canvasState.origin)
      }else if(canvasState.mode === CanvasMode.SelectionNet){
        updateSelectionNet(current,canvasState.origin)
      }
      else if(canvasState.mode === CanvasMode.Translating){
          translateSelectedLayers(current); 
      }
      else if(canvasState.mode === CanvasMode.Resizing){
          resizeSelectedLayer(current);
      }else if(canvasState.mode===CanvasMode.Pencil){
        continueDrawing(current,e);
      }

      setMyPresence({ cursor: current });

    },
    [canvasState,resizeSelectedLayer,camera,translateSelectedLayers,continueDrawing,startMultiSelection,updateSelectionNet]
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
    resizeSelectedLayer({x : 0, y : 0} )
  }, []);

  const onPointerDown = useCallback((e : React.PointerEvent)=>{
    const point = pointerEventToCanvasPoint(e, camera);
    if(canvasState.mode===CanvasMode.Inserting){
      return ;
    }
    
    if(canvasState.mode === CanvasMode.Pencil){
      startDrawing(point,e.pressure);
      return ;
    }

    setCanvasState({
      origin : point ,
      mode : CanvasMode.Pressing
    });
  },[camera,canvasState.mode,setCanvasState,startDrawing])

  const onPointerUp = useMutation(({},e)=>{
    const point = pointerEventToCanvasPoint(e,camera);

    if(canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing){

      unselectLayers();

      setCanvasState({
        mode : CanvasMode.None
      })
    }
    else if(canvasState.mode === CanvasMode.Pencil){
      insertPath();
    }
    else if(canvasState.mode === CanvasMode.Inserting){
        insertLayer(canvasState.layerType,point)
    }else{
      setCanvasState({
        mode : CanvasMode.None
      })
    }

    history.resume();

  },[camera , canvasState,history,insertLayer,unselectLayers,setCanvasState,insertPath,setCanvasState])

  const selections = useOthersMapped((other)=>other.presence.selection)

  const onLayerPointerDown = useMutation(({self,setMyPresence} , e : React.PointerEvent,layerId : string)=>{
    if(canvasState.mode === CanvasMode.Pencil ||
      canvasState.mode === CanvasMode.Inserting
    ){
      return ;
    }

    history.pause();
    e.stopPropagation();

    const point = pointerEventToCanvasPoint(e,camera);

    if(!self.presence.selection.includes(layerId)){
      setMyPresence({selection : [layerId]} , {addToHistory : true});

      setCanvasState({mode : CanvasMode.Translating , current : point})
    }
  },[setCanvasState,history,camera,canvasState.mode])


  const layerIdsToColorSelection =  useMemo(()=>{
    const layerIdsToColorSelection : Record<string,string> = {};
    for(const user of selections){
      const [connectionId,selection] = user;

      for(const layerId of selection){
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
    }

  }
  return layerIdsToColorSelection;
},[selections])


  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      {/* <Info boardId={boardId}/> */}
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={!canRedo}
        canUndo={!canUndo}
        undo={history.undo}
        redo={history.redo}
      />
       <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />
      <svg
        className="h-[100vh] w-[100vw]"
        onPointerMove={onPointerMove}
        onWheel={onWheel}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId)=>(
            <LayerPreview key={layerId} id={layerId} onLayerPointerDown={onLayerPointerDown} 
            selectionColor={layerIdsToColorSelection[layerId]}/>
          ))}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown}/>
          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current && (
              <rect
                className="fill-blue-500/5 stroke-blue-500 stroke-1"
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}
            
          <CursorPrensence />
          {pencilDraft && pencilDraft.length > 0 && (
            <Path
              fill={colorToCss(lastUsedColor)}
              points={pencilDraft}
              x={0}
              y={0}
            />
          )}
        </g>
      </svg>
    </main>
  );
};
