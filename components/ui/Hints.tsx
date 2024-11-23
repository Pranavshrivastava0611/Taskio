import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

  export interface tooltipProp{
    children : React.ReactNode,
    label : string
    side? : "top" | "bottom" | "right" | "left",
    align? : "center" | "start" | "end"
    sideOffset : number,
    alignoffset : number,
  }


function Hints({
    children ,
    label,
    side,align,
    sideOffset,
    alignoffset
} : tooltipProp) {
  return (
    <TooltipProvider>
  <Tooltip delayDuration={100}>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent className='bg-black text-white border-black' side={side} sideOffset={sideOffset} alignOffset={alignoffset}>
      <p className='font-semibold text-white'>{label}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

  )
}

export default Hints
