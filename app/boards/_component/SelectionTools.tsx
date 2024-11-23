"use client";

import Hints from "@/components/ui/Hints";
import { Button } from "@/components/ui/Button";
import { useDeleteLayers } from "@/hooks/use-delete-layer";
import { useSelectionBounds } from "@/hooks/useSelectionBounds";
import { useMutation, useSelf } from "@/liveblocks.config";
import { Camera, Color } from "@/types/canvas";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import { memo } from "react";
import { ColorPicker } from "./ColorPicker";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((self) => self.presence.selection);

    const deleteLayers = useDeleteLayers();
    const selectionBounds = useSelectionBounds();

    console.log(selectionBounds,"bounds")
    const handleMoveToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");

        const indices: number[] = [];

        const arr = liveLayerIds.toImmutable();

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          liveLayerIds.move(indices[i], i);
        }
      },
      [selection]
    );

    const handleMoveToFront = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");

        const indices: number[] = [];

        const arr = liveLayerIds.toImmutable();

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
          liveLayerIds.move(
            indices[i],
            arr.length - 1 - (indices.length - 1 - i)
          );
        }
      },
      [selection]
    );

    const handleColorChange = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    if (!selectionBounds) return null;

    const x = selectionBounds.width / 2 + selectionBounds.x - camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(
            calc(${x}px - 50%),
            calc(${y - 16}px - 100%)
          )`,
        }}
      >
        <ColorPicker onChange={handleColorChange} />
        <div className="flex flex-col gap-y-0.5">
          <Hints label="Bring to front" sideOffset={0} alignoffset={0}>
            <Button variant="board" size="icon" onClick={handleMoveToFront}>
              <BringToFront />
            </Button>
          </Hints>
          <Hints label="Bring to back" side="bottom" sideOffset={0} alignoffset={0}>
            <Button variant="board" size="icon" onClick={handleMoveToBack}>
              <SendToBack />
            </Button>
          </Hints>
        </div>
        <div className="flex items-center pl-2 ml-2 border-l">
          <Hints label="Delete" sideOffset={0} alignoffset={0}>
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2 />
            </Button>
          </Hints>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";