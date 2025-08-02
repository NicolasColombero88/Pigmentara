import React from 'react';
import type { ColorSwatch as ColorSwatchType } from '../types';

interface ColorSwatchProps {
  swatch: ColorSwatchType;
  isSelected: boolean;
  onSelect: (hex: string) => void;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ swatch, isSelected, onSelect }) => {
  const borderClass = isSelected ? 'border-orange-400' : 'border-slate-700/80';

  return (
    <div
      onClick={() => onSelect(swatch.hex)}
      className={`relative cursor-pointer group rounded-lg overflow-hidden shadow-lg transition-all duration-200 border-2 ${borderClass} hover:border-orange-400/70 hover:shadow-orange-500/20 transform hover:-translate-y-1`}
    >
      <div
        className="w-full h-24"
        style={{ backgroundColor: swatch.hex }}
      />
      <div className="p-2 bg-slate-800/80">
        <p className={`text-sm font-mono tracking-wider text-neutral-300`}>{swatch.hex.toUpperCase()}</p>
      </div>
      {isSelected && (
           <div className="absolute top-1.5 right-1.5 bg-orange-500/90 rounded-full p-0.5 shadow-md">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
           </div>
       )}
    </div>
  );
};