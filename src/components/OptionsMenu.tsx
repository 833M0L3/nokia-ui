import React from 'react';
import { PhoneSettings, S40Profile } from '../types';

interface OptionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: string) => void;
  settings: PhoneSettings;
}

export const OptionsMenu: React.FC<OptionsMenuProps> = ({
  isOpen,
  onClose,
  onSelectOption,
  settings,
}) => {
  if (!isOpen) return null;

  const options = [
    { id: 'open', label: 'Open' },
    { id: 'profile', label: `Profile (${settings.profile || 'General'})` },
    { id: 'theme', label: `Theme (${settings.theme})` },
    { id: 'view', label: `View (${settings.viewMode})` },
    { id: 'sound', label: `Sound (${settings.soundEnabled ? 'ON' : 'OFF'})` },
    { id: 'about', label: 'About S40v3 OS' },
    { id: 'exit', label: 'Exit' },
  ];

  return (
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-xs z-30 flex items-end p-2 select-none animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-48 bg-slate-900/95 border-2 border-slate-400/60 rounded-lg shadow-2xl overflow-hidden font-nokia text-white mb-8 ml-1 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Menu Header */}
        <div className="bg-gradient-to-r from-blue-700 to-cyan-700 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white border-b border-blue-400/40 flex justify-between items-center">
          <span>Options</span>
          <span className="text-[9px] bg-blue-900/80 px-1.5 py-0.5 rounded font-mono">S40v3</span>
        </div>

        {/* Options List */}
        <div className="py-1">
          {options.map((opt, idx) => (
            <button
              key={opt.id}
              onClick={() => {
                onSelectOption(opt.id);
                onClose();
              }}
              className={`w-full text-left px-3 py-1.5 text-xs hover:bg-cyan-600 hover:text-white transition-colors duration-100 flex items-center justify-between font-medium cursor-pointer ${
                idx === 0 ? 'bg-cyan-800/60 font-semibold' : ''
              }`}
            >
              <span>{opt.label}</span>
              <span className="text-[10px] opacity-50">{idx + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
