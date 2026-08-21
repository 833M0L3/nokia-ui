import React from 'react';
import { MenuItem } from '../types';

interface MenuGridProps {
  items: MenuItem[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenApp: (id: MenuItem['id']) => void;
}

export const MenuGrid: React.FC<MenuGridProps> = ({
  items,
  selectedIndex,
  onSelectIndex,
  onOpenApp,
}) => {
  return (
    <div className="relative flex-1 px-2.5 py-1.5 flex items-stretch select-none overflow-hidden">
      {/* 3x3 Grid Container */}
      <div className="grid grid-cols-3 grid-rows-3 gap-1.5 flex-1 items-center justify-items-center">
        {items.map((item, index) => {
          const isSelected = selectedIndex === index;

          return (
            <div
              key={item.id}
              onClick={() => {
                onSelectIndex(index);
                onOpenApp(item.id);
              }}
              onMouseEnter={() => onSelectIndex(index)}
              className={`relative flex flex-col items-center justify-center p-1 rounded-xl transition-all duration-150 cursor-pointer w-full h-full group ${
                isSelected
                  ? 'nokia-selection-box scale-102 z-10'
                  : 'hover:bg-white/10'
              }`}
            >
              {/* Icon Container with reflection / 3D shadow effect */}
              <div className="relative flex items-center justify-center w-10 h-10 mb-0.5">
                <img
                  src={item.icon}
                  alt={item.name}
                  className={`w-full h-full object-contain filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)] transition-transform duration-150 ${
                    isSelected ? 'scale-108 -translate-y-0.5' : 'group-hover:scale-105'
                  }`}
                  draggable={false}
                />
              </div>

              {/* Icon Label */}
              <span
                className={`text-[11px] font-normal tracking-tight text-center leading-tight transition-colors duration-150 font-nokia truncate max-w-full px-0.5 ${
                  isSelected
                    ? 'text-white font-semibold symbian-text-shadow'
                    : 'text-white/95 symbian-text-shadow'
                }`}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
