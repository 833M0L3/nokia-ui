import React from 'react';
import {
  Phone,
  PhoneOff,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  Camera,
  Music,
} from 'lucide-react';
import { PhoneFrameProps } from '../../types';

export const Nokia5300Frame: React.FC<PhoneFrameProps> = ({
  children,
  onNavigate,
  onSelect,
  onSoftkeyLeft,
  onSoftkeyRight,
  onEndCallKey,
  onNumKey,
  soundEnabled,
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
    <div className="relative flex flex-col items-center justify-center p-2.5 sm:p-4 bg-gradient-to-b from-slate-100 via-neutral-50 to-slate-200 rounded-[2.2rem] sm:rounded-[2.8rem] shadow-[0_25px_60px_rgba(0,0,0,0.5),0_10px_25px_rgba(220,38,38,0.12),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-4px_8px_rgba(0,0,0,0.12)] border-3 sm:border-4 border-slate-300/80 w-full max-w-[370px] sm:max-w-[390px] mx-auto font-nokia select-none transition-all duration-200">
      {/* Nokia 5300 XpressMusic Top Section: Earpiece Slot, Nokia Logo & XpressMusic Badge */}
      <div className="w-full flex flex-col items-center justify-center pt-0.5 pb-1.5 space-y-0.5 sm:space-y-1">
        {/* Earpiece Speaker Slot & Ambient Sensor */}
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 bg-neutral-900 rounded-full border border-slate-300/60 shadow-inner opacity-70"
            title="Optical Sensor"
          />
          <div className="w-14 sm:w-16 h-1.5 sm:h-2 bg-neutral-950 rounded-full border border-slate-300 flex items-center justify-center shadow-inner">
            <div className="w-8 sm:w-10 h-0.5 bg-neutral-700 rounded-full" />
          </div>
        </div>

        {/* Nokia Branding & XpressMusic Badge */}
        <div className="flex flex-col items-center">
          <div className="font-extrabold text-slate-800 tracking-[0.25em] text-[11px] sm:text-xs font-mono drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
            NOKIA
          </div>
          <div className="flex items-center gap-1 -mt-0.5 sm:-mt-1 text-red-600 font-sans">
            <Music className="w-2.5 h-2.5 fill-current stroke-[2.5]" />
            <span className="text-[7.5px] sm:text-[8px] font-black tracking-wider uppercase italic">
              XpressMusic
            </span>
          </div>
        </div>
      </div>

      {/* Center Section: Left Red Music Stripe + Screen Frame + Right Red Control Stripe */}
      <div className="relative w-full flex items-center justify-center gap-1 sm:gap-1.5">
        {/* Left Red Rubberized Music Strip */}
        <div className="flex flex-col justify-between items-center w-7 sm:w-8.5 h-[370px] sm:h-[395px] py-4 bg-gradient-to-r from-red-700 via-red-600 to-red-500 rounded-l-2xl shadow-[inset_1px_1px_3px_rgba(255,255,255,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.35),-2px_2px_6px_rgba(0,0,0,0.25)] border-l-2 border-y-2 border-red-700/80 shrink-0 select-none">
          {/* Top Grip Texture */}
          <div className="flex flex-col gap-1 items-center opacity-40">
            <div className="w-3 sm:w-4 h-0.5 bg-white rounded-full" />
            <div className="w-3 sm:w-4 h-0.5 bg-white rounded-full" />
          </div>

          {/* Dedicated Music Hardware Buttons */}
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            {/* Rewind / Previous */}
            <button
              {...bindHoldableKey((down) => onNavigate('LEFT', down))}
              className="w-6 sm:w-7 h-10 sm:h-12 bg-gradient-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 active:scale-95 rounded-lg border border-red-400/50 shadow-[0_2px_4px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center cursor-pointer select-none touch-none transition-transform"
              title="Rewind / Previous Track (Left)"
            >
              <SkipBack className="w-3.5 h-3.5 fill-white text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
            </button>

            {/* Play / Pause */}
            <button
              {...bindHoldableKey((down) => onSelect(down))}
              className="w-6 sm:w-7 h-10 sm:h-12 bg-gradient-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 active:scale-95 rounded-lg border border-red-400/50 shadow-[0_2px_4px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center cursor-pointer select-none touch-none transition-transform"
              title="Play / Pause (Select)"
            >
              <div className="flex items-center justify-center -space-x-0.5">
                <Play className="w-3 h-3 fill-white text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
                <Pause className="w-2.5 h-2.5 fill-white text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
              </div>
            </button>

            {/* Fast-Forward / Next */}
            <button
              {...bindHoldableKey((down) => onNavigate('RIGHT', down))}
              className="w-6 sm:w-7 h-10 sm:h-12 bg-gradient-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 active:scale-95 rounded-lg border border-red-400/50 shadow-[0_2px_4px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center cursor-pointer select-none touch-none transition-transform"
              title="Fast-Forward / Next Track (Right)"
            >
              <SkipForward className="w-3.5 h-3.5 fill-white text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
            </button>
          </div>

          {/* Bottom Grip Texture */}
          <div className="flex flex-col gap-1 items-center opacity-40">
            <div className="w-3 sm:w-4 h-0.5 bg-white rounded-full" />
            <div className="w-3 sm:w-4 h-0.5 bg-white rounded-full" />
          </div>
        </div>

        {/* Screen Frame Container (Exact required dimensions & authentic bezel) */}
        <div className="relative w-full max-w-[295px] h-[370px] sm:h-[395px] bg-black p-1.5 sm:p-2 rounded-xl border-3 sm:border-4 border-neutral-900 shadow-[inset_0_4px_12px_rgba(0,0,0,0.95),0_0_12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col mx-auto z-10">
          {children}
        </div>

        {/* Right Red Rubberized Control Strip */}
        <div className="flex flex-col justify-between items-center w-7 sm:w-8.5 h-[370px] sm:h-[395px] py-4 bg-gradient-to-l from-red-700 via-red-600 to-red-500 rounded-r-2xl shadow-[inset_-1px_1px_3px_rgba(255,255,255,0.4),inset_2px_-2px_4px_rgba(0,0,0,0.35),2px_2px_6px_rgba(0,0,0,0.25)] border-r-2 border-y-2 border-red-700/80 shrink-0 select-none">
          {/* Top Grip Texture */}
          <div className="flex flex-col gap-1 items-center opacity-40">
            <div className="w-3 sm:w-4 h-0.5 bg-white rounded-full" />
            <div className="w-3 sm:w-4 h-0.5 bg-white rounded-full" />
          </div>

          {/* Volume and Camera Buttons */}
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            {/* Volume Up */}
            <button
              {...bindHoldableKey((down) => onNavigate('UP', down))}
              className="w-6 sm:w-7 h-10 sm:h-12 bg-gradient-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 active:scale-95 rounded-lg border border-red-400/50 shadow-[0_2px_4px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center cursor-pointer select-none touch-none transition-transform"
              title="Volume Up (Up)"
            >
              <Volume2 className="w-3.5 h-3.5 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
              <span className="text-[8px] font-bold text-white leading-none -mt-0.5">+</span>
            </button>

            {/* Volume Down */}
            <button
              {...bindHoldableKey((down) => onNavigate('DOWN', down))}
              className="w-6 sm:w-7 h-10 sm:h-12 bg-gradient-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 active:scale-95 rounded-lg border border-red-400/50 shadow-[0_2px_4px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center cursor-pointer select-none touch-none transition-transform"
              title="Volume Down (Down)"
            >
              <Volume1 className="w-3.5 h-3.5 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
              <span className="text-[8px] font-bold text-white leading-none -mt-0.5">−</span>
            </button>

            {/* Dedicated Camera Shutter Key */}
            <button
              {...bindHoldableKey((down) => onSelect(down))}
              className="w-6 sm:w-7 h-10 sm:h-12 bg-gradient-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 active:scale-95 rounded-lg border border-red-400/50 shadow-[0_2px_4px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center cursor-pointer select-none touch-none transition-transform"
              title="Camera Shutter (Select)"
            >
              <Camera className="w-3.5 h-3.5 text-white fill-white/20 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
            </button>
          </div>

          {/* Bottom Grip Texture */}
          <div className="flex flex-col gap-1 items-center opacity-40">
            <div className="w-3 sm:w-4 h-0.5 bg-white rounded-full" />
            <div className="w-3 sm:w-4 h-0.5 bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* Hardware Control Section: Front Navigation Controls & Slider Keypad */}
      <div className="w-full mt-2 sm:mt-3 flex flex-col items-center gap-1.5 sm:gap-2 touch-none">
        {/* Control Cluster: Left Softkey/Call | Circular D-Pad | Right Softkey/End */}
        <div className="w-full flex items-center justify-between px-1 sm:px-2">
          {/* Left Softkey & Green Call Key */}
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <button
              {...bindHoldableKey((down) => onSoftkeyLeft(down))}
              className="w-12 sm:w-14 h-7 sm:h-8 bg-gradient-to-b from-white via-slate-100 to-slate-200 border border-slate-300 rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] active:scale-95 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer flex items-center justify-center select-none"
              title="Left Softkey (Options)"
            >
              ━
            </button>
            <button
              {...bindHoldableKey((down) => onSelect(down))}
              className="w-12 sm:w-14 h-8 sm:h-9 bg-gradient-to-b from-emerald-500 via-emerald-600 to-emerald-700 border border-emerald-400/80 rounded-md shadow-[0_3px_6px_rgba(16,185,129,0.35),inset_0_1px_2px_rgba(255,255,255,0.5)] active:scale-95 text-white font-bold text-xs hover:from-emerald-400 hover:to-emerald-600 cursor-pointer flex items-center justify-center select-none"
              title="Call Key"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>

          {/* Nokia 5300 Signature Circular D-Pad with Red Metallic Accent Ring */}
          <div className="relative w-22 sm:w-26 h-22 sm:h-26 rounded-full p-1 bg-gradient-to-tr from-red-600 via-red-500 to-rose-400 shadow-[0_4px_12px_rgba(220,38,38,0.4),inset_0_1px_2px_rgba(255,255,255,0.7)] flex items-center justify-center select-none">
            {/* Inner Navigation Ring */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-b from-white via-slate-100 to-slate-200 border border-slate-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.12)] flex items-center justify-center">
              {/* D-Pad Up */}
              <button
                {...bindHoldableKey((down) => onNavigate('UP', down))}
                className="absolute top-0.5 w-8 sm:w-9 h-5 sm:h-6 text-slate-600 hover:text-red-600 font-bold cursor-pointer flex items-center justify-center active:scale-90 select-none touch-none transition-colors"
                title="Up"
              >
                <ChevronUp className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* D-Pad Down */}
              <button
                {...bindHoldableKey((down) => onNavigate('DOWN', down))}
                className="absolute bottom-0.5 w-8 sm:w-9 h-5 sm:h-6 text-slate-600 hover:text-red-600 font-bold cursor-pointer flex items-center justify-center active:scale-90 select-none touch-none transition-colors"
                title="Down"
              >
                <ChevronDown className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* D-Pad Left */}
              <button
                {...bindHoldableKey((down) => onNavigate('LEFT', down))}
                className="absolute left-0.5 h-8 sm:h-9 w-5 sm:w-6 text-slate-600 hover:text-red-600 font-bold cursor-pointer flex items-center justify-center active:scale-90 select-none touch-none transition-colors"
                title="Left"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* D-Pad Right */}
              <button
                {...bindHoldableKey((down) => onNavigate('RIGHT', down))}
                className="absolute right-0.5 h-8 sm:h-9 w-5 sm:w-6 text-slate-600 hover:text-red-600 font-bold cursor-pointer flex items-center justify-center active:scale-90 select-none touch-none transition-colors"
                title="Right"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Center OK Button */}
              <button
                {...bindHoldableKey((down) => onSelect(down))}
                className="w-8 sm:w-9.5 h-8 sm:h-9.5 rounded-full bg-gradient-to-b from-white via-slate-100 to-slate-300 border border-slate-300/80 shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,1)] active:scale-90 text-slate-800 font-extrabold text-[10px] sm:text-xs flex items-center justify-center cursor-pointer hover:text-red-600 hover:border-red-300 select-none touch-none transition-all"
                title="Center OK"
              >
                OK
              </button>
            </div>
          </div>

          {/* Right Softkey & Red End Call Key */}
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <button
              {...bindHoldableKey((down) => onSoftkeyRight(down))}
              className="w-12 sm:w-14 h-7 sm:h-8 bg-gradient-to-b from-white via-slate-100 to-slate-200 border border-slate-300 rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] active:scale-95 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer flex items-center justify-center select-none"
              title="Right Softkey (Back / Exit)"
            >
              ━
            </button>
            <button
              {...bindHoldableKey((down) => onEndCallKey && onEndCallKey(down))}
              className="w-12 sm:w-14 h-8 sm:h-9 bg-gradient-to-b from-rose-500 via-red-600 to-red-700 border border-rose-400/80 rounded-md shadow-[0_3px_6px_rgba(244,63,94,0.35),inset_0_1px_2px_rgba(255,255,255,0.5)] active:scale-95 text-white font-bold text-xs hover:from-rose-400 hover:to-rose-600 cursor-pointer flex items-center justify-center select-none"
              title="End Call / Power Key"
            >
              <PhoneOff className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>

        {/* Slider Seam & Physical Lip Shadow */}
        <div className="w-full px-1 sm:px-2 my-0.5 sm:my-1">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-slate-300/80 to-transparent relative flex items-center justify-center">
            <div className="w-24 sm:w-28 h-0.5 bg-slate-400/60 rounded-full shadow-[0_1px_1px_rgba(0,0,0,0.15)]" />
          </div>
        </div>

        {/* 12-Key Alphanumeric Slider Keypad Grid (3x4) */}
        <div className="w-full grid grid-cols-3 gap-1 sm:gap-1.5 px-0.5 sm:px-1">
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
              className="h-8 sm:h-9 bg-gradient-to-b from-white via-neutral-50 to-slate-100 border border-slate-200/90 rounded-md sm:rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] active:scale-95 hover:bg-slate-50 hover:border-slate-300/80 cursor-pointer flex flex-col items-center justify-center transition-all select-none touch-none"
            >
              <span className="text-slate-800 font-bold text-xs sm:text-sm leading-none">{num}</span>
              <span className="text-[6.5px] sm:text-[7px] text-slate-500 font-mono uppercase leading-none mt-0.5 tracking-wider">
                {sub}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom Microphone Pinhole */}
        <div
          className="w-1.5 h-1.5 bg-neutral-900 rounded-full border border-slate-300/60 shadow-inner mt-1 mb-0.5"
          title="Microphone"
        />
      </div>
    </div>
  );
};
