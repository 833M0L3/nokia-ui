import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Volume2, VolumeX, Move, PhoneOff } from 'lucide-react';
import { AppId, MenuItem, PhoneSettings } from './types';
import { NokiaScreen } from './components/NokiaScreen';
import { PhoneFrame } from './components/PhoneFrame';
import { playKeyClick, playSelectBeep } from './utils/audio';

const MENU_ITEMS: MenuItem[] = [
  { id: 'messaging', name: 'Messaging', icon: '/icons_svg/Messaging.svg', gridPos: 0 },
  { id: 'contacts', name: 'Contacts', icon: '/icons_svg/Contacts.svg', gridPos: 1 },
  { id: 'log', name: 'Log', icon: '/icons_svg/Call Blue Log.svg', gridPos: 2 },
  { id: 'settings', name: 'Settings', icon: '/icons_svg/Settings.svg', gridPos: 3 },
  { id: 'gallery', name: 'Gallery', icon: '/icons_svg/Gallery.svg', gridPos: 4 },
  { id: 'media', name: 'Media', icon: '/icons_svg/Media.svg', gridPos: 5 },
  { id: 'organiser', name: 'Organiser', icon: '/icons_svg/Calendar.svg', gridPos: 6 },
  { id: 'internet', name: 'Internet', icon: '/icons_svg/Internet Blue.svg', gridPos: 7 },
  { id: 'apps', name: 'Apps.', icon: '/icons_svg/Application.svg', gridPos: 8 },
];

const DEFAULT_SETTINGS: PhoneSettings = {
  soundEnabled: true,
  viewMode: 'grid',
  theme: 's40-blue',
  profile: 'General',
  wallpaperUrl: '/wallpaper/nokia-n73-original-wallpaper-remake-by-me-v0-qzru05vdez8b1.webp',
  clockFormat: '24h',
  showScanlines: false,
};

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [settings, setSettings] = useState<PhoneSettings>(DEFAULT_SETTINGS);
  const [viewStyle, setViewStyle] = useState<'phone' | 'screen'>('phone');

  // Dispatch hardware key events to active J2ME game
  const dispatchHwKey = (code: string, isDown: boolean = true, key?: string) => {
    window.dispatchEvent(
      new CustomEvent('nokia-hw-key', {
        detail: { code, key, isDown },
      })
    );
  };

  // Handle D-Pad Navigation Universal Dispatcher
  const handleNavigate = (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT', isDown: boolean = true) => {
    if (isDown) {
      playKeyClick(settings.soundEnabled);
    }
    if (activeApp === 'apps') {
      const codeMap = { UP: 'ArrowUp', DOWN: 'ArrowDown', LEFT: 'ArrowLeft', RIGHT: 'ArrowRight' };
      dispatchHwKey(codeMap[dir], isDown);
    } else {
      // Emit universal navigation event for inner app components (Gallery, Web, Settings, Menu)
      window.dispatchEvent(new CustomEvent('nokia-ui-navigate', { detail: { dir, isDown } }));
    }

    if (!activeApp && isDown) {
      setSelectedIndex((prev) => {
        let next = prev;
        if (dir === 'LEFT') {
          next = prev % 3 === 0 ? prev : prev - 1;
        } else if (dir === 'RIGHT') {
          next = prev % 3 === 2 ? prev : prev + 1;
        } else if (dir === 'UP') {
          next = prev < 3 ? prev : prev - 3;
        } else if (dir === 'DOWN') {
          next = prev >= 6 ? prev : prev + 3;
        }
        return next;
      });
    }
  };

  const handleSelect = (isDown: boolean = true) => {
    if (activeApp === 'apps') {
      dispatchHwKey('Enter', isDown);
    } else {
      if (isDown) {
        playSelectBeep(settings.soundEnabled);
      }
      window.dispatchEvent(new CustomEvent('nokia-ui-center-select', { detail: { isDown } }));
    }
  };

  const handleSoftkeyLeft = (isDown: boolean = true) => {
    if (isDown) {
      playKeyClick(settings.soundEnabled);
    }
    if (activeApp === 'apps') {
      dispatchHwKey('F1', isDown);
    } else {
      window.dispatchEvent(new CustomEvent('nokia-ui-left-softkey', { detail: { isDown } }));
    }
  };

  const handleSoftkeyRight = (isDown: boolean = true) => {
    if (isDown) {
      playKeyClick(settings.soundEnabled);
    }
    if (activeApp === 'apps') {
      dispatchHwKey('F2', isDown);
    } else {
      window.dispatchEvent(new CustomEvent('nokia-ui-right-softkey', { detail: { isDown } }));
    }
  };

  const handleEndCallKey = (isDown: boolean = true) => {
    if (isDown) {
      playKeyClick(settings.soundEnabled);
      if (activeApp === 'apps') {
        dispatchHwKey('EndCallKey', true);
      }
      setActiveApp(null);
      window.dispatchEvent(new CustomEvent('nokia-go-home'));
    } else if (activeApp === 'apps') {
      dispatchHwKey('EndCallKey', false);
    }
  };

  const handleNumKey = (num: string, isDown: boolean = true) => {
    if (isDown) {
      playKeyClick(settings.soundEnabled);
    }
    if (activeApp === 'apps') {
      if (num === '*') dispatchHwKey('NumpadAsterisk', isDown, '*');
      else if (num === '#') dispatchHwKey('NumpadDivide', isDown, '#');
      else dispatchHwKey(`Digit${num}`, isDown, num);
    }
  };

  // Universal Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      // In game mode, J2meRunnerApp handles keydown/keyup directly to allow continuous holds
      if (activeApp === 'apps') {
        if (e.key === 'Escape') {
          handleEndCallKey(true);
        }
        return;
      }

      if (e.repeat) return; // Prevent repeated navigation jumps on holding in main menu

      if (e.key === 'ArrowUp') handleNavigate('UP', true);
      else if (e.key === 'ArrowDown') handleNavigate('DOWN', true);
      else if (e.key === 'ArrowLeft') handleNavigate('LEFT', true);
      else if (e.key === 'ArrowRight') handleNavigate('RIGHT', true);
      else if (e.key === 'Enter' || e.key === ' ') handleSelect(true);
      else if (e.key === 'F1' || e.key === 'q' || e.key === 'Q') handleSoftkeyLeft(true);
      else if (e.key === 'F2' || e.key === 'w' || e.key === 'W') handleSoftkeyRight(true);
      else if (e.key === 'Escape' || e.key === 'Backspace') handleEndCallKey(true);
      else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '#'].includes(e.key)) {
        handleNumKey(e.key, true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeApp, selectedIndex, settings.soundEnabled]);

  return (
    <div className="min-h-screen neo-grid-bg text-slate-900 flex flex-col items-center justify-between p-3 sm:p-6 relative overflow-x-hidden select-none font-nokia">
      {/* Neobrutalist Mobile-Friendly Header Bar */}
      <header className="w-full max-w-5xl neo-card p-2.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 z-20">
        {/* Title Sticker Badge */}
        <div className="flex items-center gap-2">
          <div className="bg-[#ffe600] border-2.5 sm:border-3.5 border-black px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] flex items-center gap-2">
            <span className="font-extrabold text-sm sm:text-lg tracking-tight text-black">
              NOKIA 3110 CLASSIC
            </span>
            <span className="bg-[#00f0ff] text-black font-extrabold text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-full border-1.5 sm:border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
              S40v3
            </span>
          </div>
        </div>

        {/* View Mode & Sound Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 w-full sm:w-auto justify-center">
          <button
            onClick={() => setViewStyle('phone')}
            className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-xs sm:text-sm neo-btn transition-all flex items-center gap-1.5 ${
              viewStyle === 'phone'
                ? 'bg-[#00f0ff] text-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000]'
                : 'bg-white text-slate-800 shadow-[2px_2px_0px_#000] opacity-80 hover:opacity-100'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Phone Casing</span>
          </button>
          <button
            onClick={() => setViewStyle('screen')}
            className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-xs sm:text-sm neo-btn transition-all flex items-center gap-1.5 ${
              viewStyle === 'screen'
                ? 'bg-[#ff4794] text-white shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000]'
                : 'bg-white text-slate-800 shadow-[2px_2px_0px_#000] opacity-80 hover:opacity-100'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Full Screen</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() =>
              setSettings((prev) => ({
                ...prev,
                soundEnabled: !prev.soundEnabled,
              }))
            }
            className="px-2.5 py-1 sm:px-3 sm:py-1.5 neo-btn bg-[#ffe600] text-xs sm:text-sm text-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5"
            title={settings.soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {settings.soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Sound</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Muted</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Stage */}
      <main className="flex-1 w-full max-w-5xl flex items-center justify-center py-4 sm:py-8 z-10">
        {viewStyle === 'phone' ? (
          /* Phone Frame Container inside Mobile Responsive Neobrutalist Stage Box */
          <div className="neo-card p-2 sm:p-6 bg-white shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] w-full max-w-[370px]">
            <PhoneFrame
              onNavigate={handleNavigate}
              onSelect={handleSelect}
              onSoftkeyLeft={handleSoftkeyLeft}
              onSoftkeyRight={handleSoftkeyRight}
              onEndCallKey={handleEndCallKey}
              onNumKey={handleNumKey}
              soundEnabled={settings.soundEnabled}
            >
              <NokiaScreen
                items={MENU_ITEMS}
                selectedIndex={selectedIndex}
                onSelectIndex={setSelectedIndex}
                activeApp={activeApp}
                onOpenApp={(id) => {
                  playSelectBeep(settings.soundEnabled);
                  setActiveApp(id);
                }}
                onCloseApp={() => setActiveApp(null)}
                settings={settings}
                onUpdateSettings={(newSet) =>
                  setSettings((prev) => ({ ...prev, ...newSet }))
                }
              />
            </PhoneFrame>
          </div>
        ) : (
          /* Standalone Full Screen UI Container inside Mobile Responsive Neobrutalist Card */
          <div className="w-full max-w-[370px] aspect-[240/350] h-[520px] sm:h-[590px] neo-card bg-black p-2 sm:p-2.5 shadow-[6px_6px_0px_#000] sm:shadow-[10px_10px_0px_#000] overflow-hidden">
            <NokiaScreen
              items={MENU_ITEMS}
              selectedIndex={selectedIndex}
              onSelectIndex={setSelectedIndex}
              activeApp={activeApp}
              onOpenApp={(id) => {
                playSelectBeep(settings.soundEnabled);
                setActiveApp(id);
              }}
              onCloseApp={() => setActiveApp(null)}
              settings={settings}
              onUpdateSettings={(newSet) =>
                setSettings((prev) => ({ ...prev, ...newSet }))
              }
            />
          </div>
        )}
      </main>

      {/* Neobrutalist Mobile-Responsive Keymap Controls Footer */}
      <footer className="w-full max-w-5xl neo-card p-2.5 sm:p-3 flex flex-wrap items-center justify-center gap-2 sm:gap-4 z-20 text-[10px] sm:text-xs font-extrabold">
        <span className="neo-pill bg-[#ffe600] text-black px-2.5 py-1 flex items-center gap-1">
          <Move className="w-3.5 h-3.5" />
          <span>D-Pad / 2,4,6,8</span>
        </span>
        <span className="neo-pill bg-[#00f0ff] text-black px-2.5 py-1">
          Center / OK / 5
        </span>
        <span className="neo-pill bg-[#ff4794] text-white px-2.5 py-1">
          F1 / F2 Softkeys
        </span>
        <span className="neo-pill bg-[#22c55e] text-black px-2.5 py-1 flex items-center gap-1">
          <PhoneOff className="w-3.5 h-3.5" />
          <span>End Key / Esc</span>
        </span>
      </footer>
    </div>
  );
}
