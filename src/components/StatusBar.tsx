import React, { useState, useEffect } from 'react';
import { PhoneSettings } from '../types';

interface StatusBarProps {
  title?: string;
  count?: number | string;
  settings: PhoneSettings;
}

export const StatusBar: React.FC<StatusBarProps> = ({ title = 'Menu', count, settings }) => {
  const [timeStr, setTimeStr] = useState<string>('10:46');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      if (settings.clockFormat === '12h') {
        let hours = now.getHours();
        const mins = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        setTimeStr(`${String(hours).padStart(2, '0')}:${mins} ${ampm}`);
      } else {
        const hours = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        setTimeStr(`${hours}:${mins}`);
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, [settings.clockFormat]);

  return (
    <header className="w-full select-none text-white z-20">
      {/* Top Status Bar (Signal, Battery, USB Grouped on Left | Time on Right) */}
      <div className="flex items-center justify-between px-2 pt-1 pb-0.5 text-xs">
        {/* Left: Signal, Battery, and USB Status PNG Icons grouped together */}
        <div className="flex items-center gap-1.5">
          <img
            src="/status_icons/og_signal.png"
            alt="Signal"
            className="h-[22px] object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          />
          <img
            src="/status_icons/og_batt.png"
            alt="Battery"
            className="h-[20px] object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          />
          <img
            src="/status_icons/og_usb.png"
            alt="USB Connected"
            className="h-[18px] object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] opacity-95 ml-0.5"
          />
        </div>

        {/* Right: Real-time Clock */}
        <span className="font-bold text-sm tracking-tight symbian-text-shadow font-nokia text-white">
          {timeStr}
        </span>
      </div>

      {/* Screen Sub-header Title (e.g. Aplikasi 55 or Menu ...) */}
      <div className="flex items-center justify-between px-3 py-1">
        <h1 className="text-xl font-bold tracking-tight text-white symbian-text-shadow font-nokia">
          {title}
        </h1>
        {count !== undefined ? (
          <span className="text-white font-mono font-extrabold text-sm symbian-text-shadow">
            {count}
          </span>
        ) : title === 'Menu' ? (
          <span className="text-white font-bold tracking-widest text-lg symbian-text-shadow leading-none">
            ...
          </span>
        ) : null}
      </div>
    </header>
  );
};
