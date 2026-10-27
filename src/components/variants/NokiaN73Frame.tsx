import React from 'react';
import {
  Phone,
  PhoneOff,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid,
  Diamond,
  Edit3,
} from 'lucide-react';
import { PhoneFrameProps } from '../../types';

export const NokiaN73Frame: React.FC<PhoneFrameProps> = ({
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
    <div className="relative flex flex-col items-center justify-center p-2.5 sm:p-4 bg-gradient-to-b from-[#3a1527] via-[#2c0e1e] to-[#1a0812] rounded-[2.2rem] sm:rounded-[2.8rem] shadow-[0_25px_60px_rgba(0,0,0,0.92),inset_0_2px_4px_rgba(255,255,255,0.22),inset_0_-4px_12px_rgba(0,0,0,0.85)] border-3 sm:border-4 border-[#52203c]/70 w-full max-w-[355px] sm:max-w-[365px] mx-auto font-nokia select-none transition-all duration-200">
      {/* Authentic Plum / Burgundy Side Accent Ribs (Dual-tone casing characteristic of N73) */}
      <div className="absolute left-1 top-12 bottom-12 w-1.5 rounded-full bg-gradient-to-b from-[#4f1e38] via-[#351323] to-[#1e0a15] opacity-80 pointer-events-none shadow-inner" />
      <div className="absolute right-1 top-12 bottom-12 w-1.5 rounded-full bg-gradient-to-b from-[#4f1e38] via-[#351323] to-[#1e0a15] opacity-80 pointer-events-none shadow-inner" />

      {/* Frosted Champagne Silver / Brushed Aluminum Front Faceplate Panel */}
      <div className="relative w-full flex flex-col items-center bg-gradient-to-b from-[#f4f1ea] via-[#e5dfd4] to-[#d5cdc0] rounded-[1.75rem] sm:rounded-[2.25rem] p-2 sm:p-3 border border-[#bcb3a2]/80 shadow-[inset_0_1px_3px_rgba(255,255,255,0.85),0_4px_14px_rgba(0,0,0,0.45)]">
        {/* Nokia N73 Top Section: Stereo Speaker Mesh, Sensors, VGA Camera & Branding */}
        <div className="w-full flex flex-col items-center pt-0.5 pb-1.5 space-y-1">
          {/* Top Stereo Speaker Grill & Front Video Call Sensor Row */}
          <div className="w-full flex items-center justify-between px-3">
            {/* Ambient Light Sensor & Secondary VGA Video Call Camera */}
            <div className="flex items-center gap-1.5" title="Sensors: ALS & Video Call Camera">
              <div className="w-2.5 h-1.5 bg-neutral-900 rounded-xs border border-neutral-600/60 shadow-inner" />
              <div className="w-3.5 h-3.5 rounded-full bg-neutral-950 border border-neutral-500/80 flex items-center justify-center shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b] border border-cyan-400/50 relative">
                  <div className="w-0.5 h-0.5 rounded-full bg-cyan-300 absolute top-0 right-0 shadow-[0_0_2px_#22d3ee]" />
                </div>
              </div>
            </div>

            {/* Top Acoustic Stereo Speaker Grille */}
            <div className="h-2 px-2.5 py-0.5 bg-[#252220] rounded-full border border-black/50 flex items-center gap-1 shadow-inner">
              <div className="w-1 h-1 rounded-full bg-[#3f3b38]" />
              <div className="w-1 h-1 rounded-full bg-[#524d49]" />
              <div className="w-8 sm:w-10 h-0.5 bg-[#524d49] rounded-full" />
              <div className="w-1 h-1 rounded-full bg-[#524d49]" />
              <div className="w-1 h-1 rounded-full bg-[#3f3b38]" />
            </div>

            {/* Model Badge */}
            <div className="text-[8px] sm:text-[9px] font-mono font-extrabold text-slate-700 tracking-wider">
              N73
            </div>
          </div>

          {/* Silver Embossed NOKIA Logo */}
          <div className="flex items-center justify-center gap-2">
            <span className="font-extrabold text-slate-800 tracking-[0.28em] text-[12px] sm:text-[13px] font-mono drop-shadow-[0_1px_0_rgba(255,255,255,0.9)]">
              NOKIA
            </span>
          </div>
        </div>

        {/* Screen Frame Container (LCD Screen Bezel - Exact required dimensions) */}
        <div className="relative w-full max-w-[295px] h-[370px] sm:h-[395px] bg-black p-1.5 sm:p-2 rounded-xl border-3 sm:border-4 border-neutral-800 shadow-[inset_0_4px_12px_rgba(0,0,0,0.95),0_0_10px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col mx-auto">
          {children}
        </div>

        {/* Hardware Control Section: Softkeys, Carl Zeiss Badge, Symbian Keys & 5-Way Joystick */}
        <div className="w-full mt-2 sm:mt-2.5 flex flex-col items-center gap-1.5 sm:gap-2 touch-none">
          {/* Sub-Screen Softkey Row & Carl Zeiss Optics Badge Detail */}
          <div className="w-full flex items-center justify-between px-1.5 sm:px-2.5">
            {/* Left Softkey (━) */}
            <button
              {...bindHoldableKey((down) => onSoftkeyLeft(down))}
              className="w-13 sm:w-15 h-6.5 sm:h-7.5 bg-gradient-to-b from-[#f5f2ec] via-[#e2dcd2] to-[#cfc8bd] border border-[#b8b0a2] rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.85)] active:scale-95 text-slate-700 font-bold text-xs hover:from-white hover:to-[#dbd5cb] cursor-pointer flex items-center justify-center transition-all select-none"
              title="Left Softkey (Options)"
            >
              ━
            </button>

            {/* Carl Zeiss Optics Detail Badge */}
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-b from-[#eae5dc] to-[#d8d1c5] border border-[#bbb1a2] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] select-none">
              <span className="text-[7px] sm:text-[7.5px] font-sans font-bold tracking-tight text-slate-700">
                Carl Zeiss
              </span>
              <span className="w-1 h-1 rounded-full bg-cyan-500 shadow-[0_0_3px_#06b6d4]" />
              <span className="text-[6.5px] sm:text-[7px] font-sans font-semibold text-slate-500 uppercase tracking-wider">
                Optics
              </span>
            </div>

            {/* Right Softkey (━) */}
            <button
              {...bindHoldableKey((down) => onSoftkeyRight(down))}
              className="w-13 sm:w-15 h-6.5 sm:h-7.5 bg-gradient-to-b from-[#f5f2ec] via-[#e2dcd2] to-[#cfc8bd] border border-[#b8b0a2] rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.85)] active:scale-95 text-slate-700 font-bold text-xs hover:from-white hover:to-[#dbd5cb] cursor-pointer flex items-center justify-center transition-all select-none"
              title="Right Softkey (Back / Exit)"
            >
              ━
            </button>
          </div>

          {/* S60 3rd Edition Main Control Cluster: Symbian Keys Flanking 5-Way Joystick */}
          <div className="w-full flex items-center justify-between px-1 sm:px-2">
            {/* Left Flank Keys: Symbian Menu Key, Green Call Key & Edit/Pencil Key */}
            <div className="flex flex-col justify-between h-22 sm:h-26 gap-1">
              {/* Symbian Menu Key (Grid/Swirl Icon - Triggers onSoftkeyLeft) */}
              <button
                {...bindHoldableKey((down) => onSoftkeyLeft(down))}
                className="w-10 sm:w-12 h-6.5 sm:h-7.5 bg-gradient-to-b from-[#f5f2ec] via-[#e2dcd2] to-[#cfc8bd] border border-[#b8b0a2] rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.85)] active:scale-95 hover:from-white hover:to-[#dbd5cb] cursor-pointer flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all select-none"
                title="Symbian Menu Key (Options)"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>

              {/* Green Call Key (Triggers onSelect) */}
              <button
                {...bindHoldableKey((down) => onSelect(down))}
                className="w-10 sm:w-12 h-7.5 sm:h-8.5 bg-gradient-to-b from-emerald-500 via-emerald-600 to-emerald-700 border border-emerald-400/80 rounded-md shadow-[0_2px_5px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] active:scale-95 hover:from-emerald-400 hover:to-emerald-600 cursor-pointer flex items-center justify-center text-white transition-all select-none"
                title="Call Key"
              >
                <Phone className="w-3.5 h-3.5 fill-current" />
              </button>

              {/* Edit / Pencil Key (Triggers onSoftkeyLeft) */}
              <button
                {...bindHoldableKey((down) => onSoftkeyLeft(down))}
                className="w-10 sm:w-12 h-6.5 sm:h-7.5 bg-gradient-to-b from-[#f5f2ec] via-[#e2dcd2] to-[#cfc8bd] border border-[#b8b0a2] rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.85)] active:scale-95 hover:from-white hover:to-[#dbd5cb] cursor-pointer flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all select-none"
                title="Edit / Pen Key"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Central 5-Way Joystick with 3D Chrome Shading & Center Click */}
            <div className="relative w-22 sm:w-26 h-22 sm:h-26 rounded-full bg-gradient-to-b from-[#dfd9cf] via-[#cbc3b5] to-[#b4aca0] border-2 border-[#a39a8c] shadow-[inset_0_3px_6px_rgba(0,0,0,0.45),0_2px_4px_rgba(255,255,255,0.7)] flex items-center justify-center select-none">
              {/* Directional Up */}
              <button
                {...bindHoldableKey((down) => onNavigate('UP', down))}
                className="absolute top-0.5 w-9 sm:w-10 h-5 sm:h-6 text-slate-600 hover:text-slate-900 cursor-pointer flex items-center justify-center active:scale-90 select-none"
                title="Navigate Up"
              >
                <ChevronUp className="w-4 h-4" />
              </button>

              {/* Directional Down */}
              <button
                {...bindHoldableKey((down) => onNavigate('DOWN', down))}
                className="absolute bottom-0.5 w-9 sm:w-10 h-5 sm:h-6 text-slate-600 hover:text-slate-900 cursor-pointer flex items-center justify-center active:scale-90 select-none"
                title="Navigate Down"
              >
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Directional Left */}
              <button
                {...bindHoldableKey((down) => onNavigate('LEFT', down))}
                className="absolute left-0.5 h-9 sm:h-10 w-5 sm:w-6 text-slate-600 hover:text-slate-900 cursor-pointer flex items-center justify-center active:scale-90 select-none"
                title="Navigate Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Directional Right */}
              <button
                {...bindHoldableKey((down) => onNavigate('RIGHT', down))}
                className="absolute right-0.5 h-9 sm:h-10 w-5 sm:w-6 text-slate-600 hover:text-slate-900 cursor-pointer flex items-center justify-center active:scale-90 select-none"
                title="Navigate Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* 3D Chrome Micro-Joystick Center Nub (Triggers onSelect) */}
              <button
                {...bindHoldableKey((down) => onSelect(down))}
                className="relative w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-gradient-to-b from-white via-[#ded9d0] to-[#999288] border border-[#f5f2eb] shadow-[0_4px_10px_rgba(0,0,0,0.55),inset_0_2px_2px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.35)] active:scale-95 flex items-center justify-center cursor-pointer transition-all select-none hover:brightness-105"
                title="Center Joystick (OK / Select)"
              >
                {/* Micro-Knurled Metallic Ring */}
                <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-gradient-to-br from-[#c9c3b8] via-[#f2ece3] to-[#8d857b] border border-[#a8a094] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-b from-[#e5dfd5] to-[#a39b8f] border border-[#857d72] shadow-xs" />
                </div>
              </button>
            </div>

            {/* Right Flank Keys: Multimedia Key, Red End Key & Clear (C) Key */}
            <div className="flex flex-col justify-between h-22 sm:h-26 gap-1">
              {/* Multimedia Key (Diamond Icon - Triggers onSelect) */}
              <button
                {...bindHoldableKey((down) => onSelect(down))}
                className="w-10 sm:w-12 h-6.5 sm:h-7.5 bg-gradient-to-b from-[#f5f2ec] via-[#e2dcd2] to-[#cfc8bd] border border-[#b8b0a2] rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.85)] active:scale-95 hover:from-white hover:to-[#dbd5cb] cursor-pointer flex items-center justify-center text-cyan-700 hover:text-cyan-600 transition-all select-none"
                title="Multimedia Key (Select)"
              >
                <Diamond className="w-3.5 h-3.5 fill-cyan-500/20 text-cyan-600" />
              </button>

              {/* Red End Call / Power Key (Triggers onEndCallKey) */}
              <button
                {...bindHoldableKey((down) => onEndCallKey && onEndCallKey(down))}
                className="w-10 sm:w-12 h-7.5 sm:h-8.5 bg-gradient-to-b from-red-500 via-red-600 to-red-700 border border-red-400/80 rounded-md shadow-[0_2px_5px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] active:scale-95 hover:from-red-400 hover:to-red-600 cursor-pointer flex items-center justify-center text-white transition-all select-none"
                title="End Call / Go Home Key"
              >
                <PhoneOff className="w-3.5 h-3.5 fill-current" />
              </button>

              {/* C (Clear) Key (Triggers onEndCallKey or onSoftkeyRight) */}
              <button
                {...bindHoldableKey((down) =>
                  onEndCallKey ? onEndCallKey(down) : onSoftkeyRight(down)
                )}
                className="w-10 sm:w-12 h-6.5 sm:h-7.5 bg-gradient-to-b from-[#f5f2ec] via-[#e2dcd2] to-[#cfc8bd] border border-[#b8b0a2] rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.85)] active:scale-95 hover:from-white hover:to-[#dbd5cb] cursor-pointer flex items-center justify-center text-slate-800 hover:text-black font-extrabold text-xs transition-all select-none"
                title="Clear Key (C)"
              >
                C
              </button>
            </div>
          </div>

          {/* 12-Key Alphanumeric Keypad Grid (Compact N73 S60 Chiclet Grid with Cyan Backlight effect) */}
          <div className="w-full grid grid-cols-3 gap-1 sm:gap-1.5 px-0.5 sm:px-1 mt-1 sm:mt-1.5">
            {[
              { num: '1', sub: '. @' },
              { num: '2', sub: 'abc' },
              { num: '3', sub: 'def' },
              { num: '4', sub: 'ghi' },
              { num: '5', sub: 'jkl' },
              { num: '6', sub: 'mno' },
              { num: '7', sub: 'pqrs' },
              { num: '8', sub: 'tuv' },
              { num: '9', sub: 'wxyz' },
              { num: '*', sub: '+' },
              { num: '0', sub: '␣' },
              { num: '#', sub: '⇧' },
            ].map(({ num, sub }) => (
              <button
                key={num}
                {...bindHoldableKey((down) => onNumKey && onNumKey(num, down))}
                className="relative h-8 sm:h-9 bg-gradient-to-b from-[#f3efe8] via-[#e5dfd4] to-[#d5cec2] border border-[#bcb4a5] rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.8)] active:scale-95 hover:from-[#fcfaf7] hover:to-[#ded8cd] hover:border-cyan-400/60 hover:shadow-[0_0_8px_rgba(6,182,212,0.25)] cursor-pointer flex flex-col items-center justify-center transition-all select-none group"
              >
                <span className="text-slate-800 group-hover:text-cyan-950 font-bold text-xs leading-none drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                  {num}
                </span>
                <span className="text-[6.5px] sm:text-[7px] text-slate-500 group-hover:text-cyan-800 font-mono uppercase leading-none mt-0.5">
                  {sub}
                </span>
                {num === '5' && (
                  <span className="absolute bottom-1 w-1.5 h-0.5 bg-slate-400/80 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Bottom Stereo Speaker & Mic Chin Detail */}
          <div className="w-full flex items-center justify-between px-3 pt-1.5 pb-0.5 text-slate-500/80">
            <div className="w-2 h-0.5 rounded-full bg-slate-400/70" />
            <div className="h-1.5 px-2 bg-[#252220] rounded-full border border-black/40 flex items-center gap-1 shadow-inner">
              <div className="w-1 h-0.5 rounded-full bg-[#524d49]" />
              <div className="w-6 h-0.5 rounded-full bg-[#524d49]" />
              <div className="w-1 h-0.5 rounded-full bg-[#524d49]" />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 border border-neutral-600/70 shadow-inner" title="Microphone" />
          </div>
        </div>
      </div>
    </div>
  );
};
