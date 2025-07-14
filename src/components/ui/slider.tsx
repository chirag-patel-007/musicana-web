import * as RadixSlider from "@radix-ui/react-slider";
import React from "react";

export const Slider = ({ min, max, step, value, onValueChange }) => (
  <RadixSlider.Root
    className="relative flex items-center select-none touch-none w-full h-5"
    min={min}
    max={max}
    step={step}
    /* defaultValue={defaultValue} */
    value={value}
    onValueChange={onValueChange}
  >
    <RadixSlider.Track className="bg-gray-300 relative grow rounded-full h-[3px]">
      <RadixSlider.Range className="absolute bg-blue-500 rounded-full h-full" />
    </RadixSlider.Track>
    <RadixSlider.Thumb className="block w-4 h-4 bg-white border border-gray-400 rounded-full shadow" />
  </RadixSlider.Root>
);
