import React from 'react';
import { ChevronUp, ChevronDown, Phone, PhoneOff, CornerDownLeft } from 'lucide-react';
import { PhoneFrameProps } from '../../types';

export const Nokia3310Frame: React.FC<PhoneFrameProps> = ({
  children,
  onNavigate,
  onSelect,
  onSoftkeyLeft,
  onSoftkeyRight,
  onEndCallKey,
  onNumKey,
}) => {
  const bindHoldableKey = (action: (isDown: boolean) => void) => ({
    type: 'button' as const,
    tabIndex: -1,
    onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        e.currentTarget.setPointerCapture?.(e.pointerId);
      } catch (_) {}
      action(true);
    },
    onPointerUp: (e: React.PointerEvent<HTMLButtonElement>) => {
      try {
        e.currentTarget.releasePointerCapture?.(e.pointerId);
      } catch (_) {}
      action(false);
    },
    onPointerCancel: () => {
      action(false);
    },
    onContextMenu: (e: React.MouseEvent) => {
      e.preventDefault();
    },
  });

  return (
    <div className="relative flex flex-col items-center justify-center p-3 sm:p-5 bg-gradient-to-b from-[#1b263b] via-[#0d1b2a] to-[#080d1a] rounded-[2.8rem] sm:rounded-[3.2rem] shadow-[0_25px_60px_rgba(0,0,0,0.95),inset_0_3px_5px_rgba(255,255,255,0.25),inset_0_-6px_14px_rgba(0,0,0,0.85)] border-3 sm:border-4 border-[#2d3e58]/70 w-full max-w-[360px] mx-auto font-nokia select-none transition-all duration-200">
      {/* Authentic Top Dark Power Button */}
      <button
        {...bindHoldableKey((down) => onEndCallKey && onEndCallKey(down))}
        className="w-12 h-2.5 -mt-1 sm:-mt-2 mb-1.5 bg-gradient-to-b from-zinc-800 to-black rounded-full border border-zinc-700/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.9),0_1px_2px_rgba(255,255,255,0.1)] active:scale-95 cursor-pointer touch-none transition-transform"
        title="Power / End Call"
      />

      {/* Silver-Blue Egg-shaped Inner Bezel surrounding Speaker, Logo, Screen and Navi Area */}
      <div className="w-full bg-gradient-to-b from-[#8da4bf] via-[#6f89a4] to-[#5a728c] p-2.5 sm:p-3 rounded-[2.2rem] sm:rounded-[2.6rem] shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),0_4px_12px_rgba(0,0,0,0.5),inset_0_-2px_4px_rgba(0,0,0,0.4)] border border-[#a2b7cf]/40 flex flex-col items-center">
        {/* Top Speaker Slots & Nokia Logo Header */}
        <div className="w-full flex flex-col items-center justify-center pt-1 pb-1.5 space-y-1">
          {/* Authentic 4 Horizontal/Diagonal Speaker Grille Slots */}
          <div className="flex items-center justify-center gap-1.5 py-0.5">
            <div className="w-2.5 h-1 bg-[#101b2b] rounded-full shadow-inner rotate-[-8deg]" />
            <div className="w-3.5 h-1 bg-[#101b2b] rounded-full shadow-inner" />
            <div className="w-3.5 h-1 bg-[#101b2b] rounded-full shadow-inner" />
            <div className="w-2.5 h-1 bg-[#101b2b] rounded-full shadow-inner rotate-[8deg]" />
          </div>

          {/* Silver Embossed NOKIA Brand Logo */}
          <div className="font-extrabold text-zinc-100 tracking-[0.28em] text-[12px] sm:text-[13px] font-mono drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.85)] flex items-center justify-center">
            NOKIA
          </div>
        </div>

        {/* Screen Frame Container (LCD Bezel - EXACT REQUIRED DIMENSIONS) */}
        <div className="relative w-full max-w-[295px] h-[370px] sm:h-[395px] bg-black p-1.5 sm:p-2 rounded-xl border-3 sm:border-4 border-[#223348] shadow-[inset_0_4px_14px_rgba(0,0,0,0.98),0_0_10px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col mx-auto">
          {children}
        </div>

        {/* Primary Nokia 3310 Navigation Controls Cluster */}
        <div className="w-full mt-2.5 sm:mt-3 flex flex-col items-center gap-2 touch-none">
          {/* Main Action Bar: Clear 'C' Key | Large Curved Central Navi-Key | Dual Up/Down Scroll Keys */}
          <div className="w-full flex items-center justify-between px-1 sm:px-2">
            {/* Clear / 'C' Back Key */}
            <div className="flex flex-col items-center">
              <button
                {...bindHoldableKey((down) => onSoftkeyRight(down))}
                className="w-13 sm:w-15 h-9 sm:h-10 bg-gradient-to-b from-[#e3ecf5] via-[#c6d7e8] to-[#9cb6cf] border-2 border-[#f0f6fc] rounded-full shadow-[0_3px_6px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.9)] active:scale-95 hover:brightness-105 active:brightness-95 cursor-pointer touch-none flex items-center justify-center font-extrabold text-[#1a2f4c] text-sm tracking-wider select-none transition-all group"
                title="C (Clear / Back / Cancel)"
              >
                <span className="group-active:scale-90 font-mono text-base">C</span>
              </button>
              <span className="text-[7.5px] sm:text-[8px] font-extrabold text-[#1a2e46] tracking-tighter mt-0.5 uppercase">
                Clear
              </span>
            </div>

            {/* Legendary Central Wide Curved Navi-Key */}
            <div className="flex flex-col items-center">
              <button
                {...bindHoldableKey((down) => onSelect(down))}
                className="w-24 sm:w-28 h-10 sm:h-11 bg-gradient-to-b from-[#eef4fa] via-[#cbddec] to-[#a3bed8] border-2 border-white rounded-[1.4rem] shadow-[0_4px_8px_rgba(0,0,0,0.55),inset_0_2px_3px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.25)] active:scale-95 hover:brightness-105 active:brightness-95 cursor-pointer touch-none flex flex-col items-center justify-center select-none transition-all group"
                title="Navi-Key (Select / Menu / OK)"
              >
                <div className="w-8 sm:w-10 h-1 bg-[#344d6a]/40 rounded-full mb-0.5 group-active:scale-90" />
                <span className="text-[10px] sm:text-[11px] font-black text-[#15273d] tracking-widest uppercase leading-none drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                  Navi
                </span>
              </button>
              <span className="text-[7.5px] sm:text-[8px] font-extrabold text-[#1a2e46] tracking-wider mt-0.5 uppercase">
                Select
              </span>
            </div>

            {/* Dual Arrow Up / Down Scroll Button */}
            <div className="flex flex-col items-center">
              <div className="w-12 sm:w-14 h-11 sm:h-12 bg-gradient-to-b from-[#e3ecf5] via-[#c6d7e8] to-[#9cb6cf] border-2 border-[#f0f6fc] rounded-full shadow-[0_3px_6px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.9)] flex flex-col items-center justify-between p-0.5 select-none overflow-hidden">
                {/* Scroll Up */}
                <button
                  {...bindHoldableKey((down) => onNavigate('UP', down))}
                  className="w-full h-1/2 flex items-center justify-center text-[#1a2f4c] hover:text-[#0b1626] active:scale-90 cursor-pointer touch-none transition-all"
                  title="Scroll Up"
                >
                  <ChevronUp className="w-4 h-4 stroke-[2.8]" />
                </button>

                {/* Subtle Divider Line */}
                <div className="w-6 h-px bg-[#7e99b5]/60" />

                {/* Scroll Down */}
                <button
                  {...bindHoldableKey((down) => onNavigate('DOWN', down))}
                  className="w-full h-1/2 flex items-center justify-center text-[#1a2f4c] hover:text-[#0b1626] active:scale-90 cursor-pointer touch-none transition-all"
                  title="Scroll Down"
                >
                  <ChevronDown className="w-4 h-4 stroke-[2.8]" />
                </button>
              </div>
              <span className="text-[7.5px] sm:text-[8px] font-extrabold text-[#1a2e46] tracking-tighter mt-0.5 uppercase">
                Scroll
              </span>
            </div>
          </div>

          {/* S40 Full Compatibility Accessory Row: Left Softkey (Options) | Green Call | Red End Call */}
          <div className="w-full flex items-center justify-between px-3 sm:px-4 pt-0.5 border-t border-[#465f7c]/30">
            {/* Left Softkey (━ Options) */}
            <button
              {...bindHoldableKey((down) => onSoftkeyLeft(down))}
              className="px-2.5 py-0.5 bg-gradient-to-b from-[#33465e] to-[#1c293a] border border-[#536d8d] rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.4)] active:scale-95 text-cyan-200 text-[10px] font-extrabold tracking-wider hover:brightness-110 cursor-pointer touch-none flex items-center gap-1 transition-all"
              title="Left Softkey (Options)"
            >
              <span>━</span>
              <span className="text-[7.5px] uppercase text-zinc-300">Options</span>
            </button>

            {/* Green Call Key */}
            <button
              {...bindHoldableKey((down) => onSelect(down))}
              className="px-2.5 py-0.5 bg-gradient-to-b from-emerald-600 to-emerald-800 border border-emerald-400/50 rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.4)] active:scale-95 text-white text-[10px] font-extrabold hover:brightness-110 cursor-pointer touch-none flex items-center gap-1 transition-all"
              title="Call Key"
            >
              <Phone className="w-2.5 h-2.5 fill-current" />
              <span className="text-[7.5px] uppercase">Call</span>
            </button>

            {/* Red End Call / Exit Key */}
            <button
              {...bindHoldableKey((down) => onEndCallKey && onEndCallKey(down))}
              className="px-2.5 py-0.5 bg-gradient-to-b from-rose-600 to-rose-800 border border-rose-400/50 rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.4)] active:scale-95 text-white text-[10px] font-extrabold hover:brightness-110 cursor-pointer touch-none flex items-center gap-1 transition-all"
              title="End Call / Exit Key"
            >
              <PhoneOff className="w-2.5 h-2.5 fill-current" />
              <span className="text-[7.5px] uppercase">End</span>
            </button>
          </div>
        </div>
      </div>

      {/* Iconic 3310 Keypad: Distinct Curved/Egg Layout with Pill Buttons & Teal/Cyan Glow */}
      <div className="w-full mt-2.5 sm:mt-3.5 flex flex-col items-center gap-1.5 sm:gap-2 px-1 sm:px-2 touch-none">
        {/* 12-Key Alphanumeric Pill Keypad (3x4 Grid) */}
        <div className="w-full grid grid-cols-3 gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2">
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
              {...bindHoldableKey((down) => onNumKey && onNumKey(num, down))}
              className="group relative h-9 sm:h-10 bg-gradient-to-b from-[#e3edf7] via-[#c6d7e8] to-[#9db4cc] border-2 border-[#eaf2f9] rounded-[1.2rem] shadow-[0_3px_6px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.25)] active:scale-95 hover:from-[#e9f4ff] hover:to-[#a9c3de] active:shadow-[0_1px_2px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(0,0,0,0.3)] cursor-pointer touch-none flex flex-col items-center justify-center transition-all select-none overflow-hidden"
              title={`Key ${num}`}
            >
              {/* Authentic Teal/Cyan Backlight Glow on Active/Hover */}
              <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 group-active:bg-cyan-400/25 transition-colors pointer-events-none rounded-[1.2rem]" />

              <span className="text-[#0d2036] font-extrabold text-sm sm:text-base leading-none drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] group-active:scale-90 group-hover:text-cyan-950 transition-transform">
                {num}
              </span>
              <span className="text-[7px] sm:text-[7.5px] text-[#344d68] font-mono font-bold uppercase leading-none mt-0.5 tracking-tight group-hover:text-[#18314e]">
                {sub}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom Microphone Hole and 3310 Subtle Model Indicator */}
        <div className="w-full flex items-center justify-between px-3 pt-1 text-[8px] sm:text-[9px] font-mono text-[#587394] tracking-widest opacity-80">
          <span>3310</span>
          {/* Authentic Mic Pin Hole */}
          <div className="w-1.5 h-1.5 bg-black/90 rounded-full border border-[#2b3e55] shadow-inner" />
          <span>900/1800</span>
        </div>
      </div>
    </div>
  );
};
