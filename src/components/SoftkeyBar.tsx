import React from 'react';

interface SoftkeyBarProps {
  leftText?: string;
  centerText?: string;
  rightText?: string;
  onLeftClick?: () => void;
  onCenterClick?: () => void;
  onRightClick?: () => void;
}

export const SoftkeyBar: React.FC<SoftkeyBarProps> = ({
  leftText = 'Options',
  centerText = 'Select',
  rightText = 'Exit',
  onLeftClick,
  onCenterClick,
  onRightClick,
}) => {
  return (
    <footer className="w-full px-3 py-2 flex items-center justify-between text-white select-none z-20 font-nokia mt-auto">
      {/* Left Softkey (Options) */}
      <button
        onClick={onLeftClick}
        className="text-left text-lg font-medium tracking-wide text-cyan-100 hover:text-white transition-colors duration-150 symbian-text-shadow active:scale-95 cursor-pointer flex-1"
      >
        {leftText}
      </button>

      {/* Center Softkey (Select) */}
      <button
        onClick={onCenterClick}
        className="text-center text-xl font-bold tracking-tight text-white transition-transform duration-150 symbian-text-shadow active:scale-95 cursor-pointer flex-1"
      >
        {centerText}
      </button>

      {/* Right Softkey (Exit) */}
      <button
        onClick={onRightClick}
        className="text-right text-lg font-medium tracking-wide text-cyan-100 hover:text-white transition-colors duration-150 symbian-text-shadow active:scale-95 cursor-pointer flex-1"
      >
        {rightText}
      </button>
    </footer>
  );
};
