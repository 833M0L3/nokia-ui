import React from 'react';
import { playKeyClick, playSelectBeep } from '../utils/audio';

interface PhoneFrameProps {
  children: React.ReactNode;
  onNavigate: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => void;
  onSelect: () => void;
  onSoftkeyLeft: () => void;
  onSoftkeyRight: () => void;
  onEndCallKey?: () => void;
  onNumKey?: (num: string) => void;
  soundEnabled: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  onNavigate,
  onSelect,
  onSoftkeyLeft,
  onSoftkeyRight,
  onEndCallKey,
  onNumKey,
  soundEnabled,
}) => {
  const handleKey = (action: () => void) => {
    playKeyClick(soundEnabled);
    action();
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-3 sm:p-5 bg-gradient-to-b from-zinc-850 via-zinc-900 to-black rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_2px_3px_rgba(255,255,255,0.2),inset_0_-4px_10px_rgba(0,0,0,0.8)] border-3 sm:border-4 border-zinc-700/60 w-full max-w-[355px] mx-auto font-nokia select-none transition-all duration-200">
      {/* Nokia 3110 classic Top Section: Speaker Slot & Silver Logo */}
      <div className="w-full flex flex-col items-center justify-center pt-0.5 pb-2 space-y-0.5 sm:space-y-1">
        {/* Earpiece Speaker Slot */}
        <div className="w-14 sm:w-16 h-1.5 bg-zinc-950 rounded-full border border-zinc-700/60 flex items-center justify-center shadow-inner">
          <div className="w-8 sm:w-10 h-0.5 bg-zinc-800 rounded-full" />
        </div>

        {/* Silver Nokia Logo */}
        <div className="font-extrabold text-zinc-300 tracking-[0.25em] text-[11px] sm:text-xs font-mono drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
          NOKIA
        </div>
        <div className="text-[7.5px] sm:text-[8px] font-mono text-zinc-500 tracking-wider -mt-1">
          3110 classic
        </div>
      </div>

      {/* Screen Frame Container (S40 LCD Bezel - Fully Responsive Height & Width) */}
      <div className="relative w-full max-w-[295px] h-[370px] sm:h-[395px] bg-black p-1.5 sm:p-2 rounded-xl border-3 sm:border-4 border-zinc-800 shadow-[inset_0_4px_12px_rgba(0,0,0,0.95),0_0_10px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col mx-auto">
        {children}
      </div>

      {/* Hardware Control Section: Nokia 3110 classic Softkeys, Call Keys & D-Pad */}
      <div className="w-full mt-2.5 sm:mt-3.5 flex flex-col items-center gap-2 sm:gap-2.5">
        {/* Control Cluster: Left Softkey/Call | D-Pad | Right Softkey/End */}
        <div className="w-full flex items-center justify-between px-0.5 sm:px-1.5">
          {/* Left Softkey & Green Call Key */}
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <button
              onClick={() => handleKey(onSoftkeyLeft)}
              className="w-12 sm:w-14 h-7 sm:h-8 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 border border-zinc-600 rounded-md shadow-[0_3px_5px_rgba(0,0,0,0.5)] active:scale-95 text-zinc-200 font-bold text-xs hover:from-zinc-600 hover:to-zinc-800 cursor-pointer flex items-center justify-center"
              title="Left Softkey (Options)"
            >
              ━
            </button>
            <button
              onClick={() => handleKey(onSelect)}
              className="w-12 sm:w-14 h-8 sm:h-9 bg-gradient-to-b from-emerald-600 to-emerald-800 border border-emerald-500/60 rounded-md shadow-[0_3px_5px_rgba(0,0,0,0.5)] active:scale-95 text-white font-bold text-xs hover:from-emerald-500 hover:to-emerald-700 cursor-pointer flex items-center justify-center"
              title="Call Key"
            >
              📞
            </button>
          </div>

          {/* Nokia 3110 classic Signature Chrome Ring D-Pad */}
          <div className="relative w-22 sm:w-26 h-22 sm:h-26 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 rounded-2xl border-2 border-zinc-500 shadow-[0_4px_12px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.4)] flex items-center justify-center p-1 sm:p-1.5">
            {/* D-Pad Up */}
            <button
              onClick={() => handleKey(() => onNavigate('UP'))}
              className="absolute top-0.5 w-8 sm:w-9 h-5 sm:h-6 text-zinc-300 font-bold hover:text-white cursor-pointer flex items-center justify-center active:scale-90"
              title="Up"
            >
              ▲
            </button>

            {/* D-Pad Down */}
            <button
              onClick={() => handleKey(() => onNavigate('DOWN'))}
              className="absolute bottom-0.5 w-8 sm:w-9 h-5 sm:h-6 text-zinc-300 font-bold hover:text-white cursor-pointer flex items-center justify-center active:scale-90"
              title="Down"
            >
              ▼
            </button>

            {/* D-Pad Left */}
            <button
              onClick={() => handleKey(() => onNavigate('LEFT'))}
              className="absolute left-0.5 h-8 sm:h-9 w-5 sm:w-6 text-zinc-300 font-bold hover:text-white cursor-pointer flex items-center justify-center active:scale-90"
              title="Left"
            >
              ◄
            </button>

            {/* D-Pad Right */}
            <button
              onClick={() => handleKey(() => onNavigate('RIGHT'))}
              className="absolute right-0.5 h-8 sm:h-9 w-5 sm:w-6 text-zinc-300 font-bold hover:text-white cursor-pointer flex items-center justify-center active:scale-90"
              title="Right"
            >
              ►
            </button>

            {/* D-Pad Center OK Select */}
            <button
              onClick={() => handleKey(onSelect)}
              className="w-9 sm:w-10 h-9 sm:h-10 bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-500 rounded-xl border border-zinc-200 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_2px_4px_rgba(0,0,0,0.5)] active:scale-95 text-zinc-900 font-bold text-xs flex items-center justify-center cursor-pointer hover:brightness-110"
              title="Center OK"
            >
              OK
            </button>
          </div>

          {/* Right Softkey & Red End Call Key */}
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <button
              onClick={() => handleKey(onSoftkeyRight)}
              className="w-12 sm:w-14 h-7 sm:h-8 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 border border-zinc-600 rounded-md shadow-[0_3px_5px_rgba(0,0,0,0.5)] active:scale-95 text-zinc-200 font-bold text-xs hover:from-zinc-600 hover:to-zinc-800 cursor-pointer flex items-center justify-center"
              title="Right Softkey (Back / Exit)"
            >
              ━
            </button>
            <button
              onClick={() => handleKey(onEndCallKey || (() => {}))}
              className="w-12 sm:w-14 h-8 sm:h-9 bg-gradient-to-b from-red-600 to-red-800 border border-red-500/60 rounded-md shadow-[0_3px_5px_rgba(0,0,0,0.5)] active:scale-95 text-white font-bold text-xs hover:from-red-500 hover:to-red-700 cursor-pointer flex items-center justify-center"
              title="End Call / Go Home Key"
            >
              📵
            </button>
          </div>
        </div>

        {/* 12-Key Alphanumeric Keypad Grid (3x4) */}
        <div className="w-full grid grid-cols-3 gap-1 sm:gap-1.5 px-0.5 sm:px-1 mt-1">
          {[
            { num: '1', sub: 'o_o' },
            { num: '2', sub: 'abc' },
            { num: '3', sub: 'def' },
            { num: '4', sub: 'ghi' },
            { num: '5', sub: 'jkl' },
            { num: '6', sub: 'mno' },
            { num: '7', sub: 'pqrs' },
            { num: '8', sub: 'tuv' },
            { num: '9', sub: 'wxyz' },
            { num: '*', sub: '+' },
            { num: '0', sub: '⊔' },
            { num: '#', sub: '⇧' },
          ].map(({ num, sub }) => (
            <button
              key={num}
              onClick={() => handleKey(() => onNumKey && onNumKey(num))}
              className="h-8 sm:h-9 bg-gradient-to-b from-zinc-750 via-zinc-800 to-zinc-900 border border-zinc-700/80 rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.4)] active:scale-95 hover:from-zinc-700 hover:to-zinc-850 cursor-pointer flex flex-col items-center justify-center transition-all"
            >
              <span className="text-zinc-200 font-bold text-xs leading-none">{num}</span>
              <span className="text-[6.5px] sm:text-[7px] text-zinc-400 font-mono uppercase leading-none mt-0.5">
                {sub}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
