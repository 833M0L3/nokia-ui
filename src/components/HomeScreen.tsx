import React, { useState, useEffect } from 'react';
import { Music, Radio } from 'lucide-react';
import { PhoneSettings } from '../types';

interface HomeScreenProps {
  settings: PhoneSettings;
  onOpenMenu: () => void;
  onOpenApp?: (appId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ settings, onOpenMenu, onOpenApp }) => {
  const [timeStr, setTimeStr] = useState<string>('19:06');
  const [dateStr, setDateStr] = useState<string>('Sat 14-Feb-2026');

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hours}:${mins}`);

      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayName = days[now.getDay()];
      const dayNum = now.getDate();
      const monthName = months[now.getMonth()];
      const year = now.getFullYear();
      setDateStr(`${dayName} ${dayNum}-${monthName}-${year}`);
    };

    updateTimeAndDate();
    const timer = setInterval(updateTimeAndDate, 10000);
    return () => clearInterval(timer);
  }, []);

  const shortcutIcons = [
    { id: 'media', icon: '/icons_svg/Media.svg', label: 'Media' },
    { id: 'messaging', icon: '/icons_svg/Messaging.svg', label: 'Messaging' },
    { id: 'contacts', icon: '/icons_svg/Contacts.svg', label: 'Contacts' },
    { id: 'settings', icon: '/icons_svg/Settings.svg', label: 'Settings' },
    { id: 'organiser', icon: '/icons_svg/Calendar.svg', label: 'Organiser' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between text-white font-nokia select-none relative p-2">
      {/* Top Section: Signal, Battery, Operator Name & Large Digital Clock */}
      <div className="w-full flex justify-between items-start pt-0.5">
        {/* Left: Signal & Battery + Operator Name */}
        <div className="flex flex-col items-start gap-1">
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
          </div>
          {/* Operator Name */}
          <span className="font-extrabold text-sm tracking-tight text-white symbian-text-shadow leading-none">
            NOKIA
          </span>
        </div>

        {/* Right: Large Classic Nokia Standby Digital Clock */}
        <span className="font-mono font-extrabold text-2xl tracking-tighter text-white symbian-text-shadow leading-none">
          {timeStr}
        </span>
      </div>

      {/* Center Section: Active Standby Widgets & Shortcut Icons Bar */}
      <div className="flex-1 flex flex-col justify-start pt-3 space-y-2">
        {/* Horizontal Shortcut Icon Bar with Arrow Overlays matching Reference Image */}
        <div className="flex items-center gap-2 pl-0.5">
          {shortcutIcons.map((sc) => (
            <button
              key={sc.id}
              onClick={() => onOpenApp?.(sc.id)}
              className="relative group cursor-pointer transition-transform hover:scale-110 active:scale-95"
              title={sc.label}
            >
              <img src={sc.icon} alt={sc.label} className="w-6 h-6 object-contain" />
              {/* Shortcut Arrow Overlay Badge */}
              <div className="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 bg-black border border-white flex items-center justify-center rounded-[1px] shadow-xs">
                <div className="w-0 h-0 border-t-[2.5px] border-t-transparent border-b-[2.5px] border-b-transparent border-l-[3.5px] border-l-white" />
              </div>
            </button>
          ))}
        </div>

        {/* Active Standby Info Widget Lines */}
        <div className="space-y-1 text-[12px] font-semibold symbian-text-shadow text-white/95 pl-1 pt-1">
          <div
            onClick={() => onOpenApp?.('media')}
            className="flex items-center gap-1.5 cursor-pointer hover:text-cyan-300"
          >
            <Music className="w-3.5 h-3.5 text-rose-400" />
            <span>Music player off</span>
          </div>

          <div
            onClick={() => onOpenApp?.('media')}
            className="flex items-center gap-1.5 cursor-pointer hover:text-cyan-300"
          >
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>Radio off</span>
          </div>

          <div className="pt-0.5 font-bold text-white tracking-wide">{dateStr}</div>

          <div
            onClick={() => onOpenApp?.('organiser')}
            className="text-white/80 cursor-pointer hover:text-white"
          >
            No upcoming notes
          </div>
        </div>
      </div>
    </div>
  );
};
