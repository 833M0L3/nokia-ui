import React, { useState, useEffect, useRef } from 'react';
import { J2meGame } from '../../types';
import { playKeyClick, playSelectBeep } from '../../utils/audio';
import { INITIAL_GAMES } from '../../data/gamesList';

interface J2meRunnerAppProps {
  onBack: () => void;
  soundEnabled: boolean;
  onGameRunningChange?: (isRunning: boolean) => void;
}

export const J2meRunnerApp: React.FC<J2meRunnerAppProps> = ({
  onBack,
  soundEnabled,
  onGameRunningChange,
}) => {
  const [games] = useState<J2meGame[]>(INITIAL_GAMES);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedGame, setSelectedGame] = useState<J2meGame | null>(null);
  const [isLaunching, setIsLaunching] = useState<boolean>(false);

  const listContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Notify parent component whether a game is actively running
  useEffect(() => {
    onGameRunningChange?.(selectedGame !== null);
    return () => {
      onGameRunningChange?.(false);
    };
  }, [selectedGame, onGameRunningChange]);

  const launchGame = (game: J2meGame) => {
    playSelectBeep(soundEnabled);
    setIsLaunching(true);
    setSelectedGame(game);
    setTimeout(() => {
      setIsLaunching(false);
    }, 1400);
  };

  const sendKeyToIframe = (code: string, isDown: boolean, key?: string) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'j2me-key',
          eventType: isDown ? 'keydown' : 'keyup',
          isDown,
          code,
          key: key || code,
        },
        '*'
      );
    }
  };

  const codeMap: Record<string, string> = {
    ArrowUp: 'ArrowUp',
    ArrowDown: 'ArrowDown',
    ArrowLeft: 'ArrowLeft',
    ArrowRight: 'ArrowRight',
    Enter: 'Enter',
    ' ': 'Enter',
    F1: 'F1',
    q: 'F1',
    Q: 'F1',
    F2: 'F2',
    w: 'F2',
    W: 'F2',
    '0': 'Digit0',
    '1': 'Digit1',
    '2': 'Digit2',
    '3': 'Digit3',
    '4': 'Digit4',
    '5': 'Digit5',
    '6': 'Digit6',
    '7': 'Digit7',
    '8': 'Digit8',
    '9': 'Digit9',
    '*': 'NumpadAsterisk',
    '#': 'NumpadDivide',
    Numpad0: 'Digit0',
    Numpad1: 'Digit1',
    Numpad2: 'Digit2',
    Numpad3: 'Digit3',
    Numpad4: 'Digit4',
    Numpad5: 'Digit5',
    Numpad6: 'Digit6',
    Numpad7: 'Digit7',
    Numpad8: 'Digit8',
    Numpad9: 'Digit9',
  };

  // Keyboard Navigation & Game Key Forwarding
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (selectedGame && !isLaunching) {
        if (e.key === 'Escape') {
          e.preventDefault();
          playKeyClick(soundEnabled);
          setSelectedGame(null);
          return;
        }

        const targetCode = codeMap[e.key];
        if (targetCode) {
          e.preventDefault();
          sendKeyToIframe(targetCode, true, e.key);
        }
      } else if (!selectedGame && !isLaunching) {
        if (e.repeat) return;
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          playKeyClick(soundEnabled);
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : games.length - 1));
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          playKeyClick(soundEnabled);
          setSelectedIndex((prev) => (prev < games.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (games[selectedIndex]) {
            launchGame(games[selectedIndex]);
          }
        } else if (e.key === 'Backspace' || e.key === 'Escape') {
          e.preventDefault();
          playKeyClick(soundEnabled);
          onBack();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (selectedGame && !isLaunching) {
        const targetCode = codeMap[e.key];
        if (targetCode) {
          e.preventDefault();
          sendKeyToIframe(targetCode, false, e.key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [games, selectedIndex, selectedGame, isLaunching, soundEnabled, onBack]);

  // Listen to Nokia hardware casing events (D-Pad, softkeys, keypad, call keys)
  useEffect(() => {
    const handleHardwareKey = (e: CustomEvent) => {
      const { code, key, isDown = true } = e.detail || {};

      if (selectedGame && !isLaunching) {
        if (isDown && (code === 'EndCallKey' || code === 'EndKey' || code === 'Escape' || code === 'ExitGame')) {
          playKeyClick(soundEnabled);
          setSelectedGame(null);
          return;
        }
        if (code) {
          sendKeyToIframe(code, isDown, key);
        }
      } else if (!selectedGame && !isLaunching && isDown) {
        // Hardware D-Pad & Keypad navigation when browsing game list
        if (code === 'ArrowUp') {
          playKeyClick(soundEnabled);
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : games.length - 1));
        } else if (code === 'ArrowDown') {
          playKeyClick(soundEnabled);
          setSelectedIndex((prev) => (prev < games.length - 1 ? prev + 1 : 0));
        } else if (code === 'Enter') {
          if (games[selectedIndex]) {
            launchGame(games[selectedIndex]);
          }
        } else if (code === 'F2' || code === 'RightSoftkey' || code === 'Backspace' || code === 'Escape') {
          playKeyClick(soundEnabled);
          onBack();
        }
      }
    };

    window.addEventListener('nokia-hw-key' as any, handleHardwareKey);

    return () => {
      window.removeEventListener('nokia-hw-key' as any, handleHardwareKey);
    };
  }, [selectedGame, isLaunching, games, selectedIndex, soundEnabled, onBack]);

  // Scroll active item into view
  useEffect(() => {
    if (listContainerRef.current) {
      const activeEl = listContainerRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="w-full h-full flex flex-col bg-transparent text-white font-nokia select-none overflow-hidden relative">
      {/* Background Apps list blurred while J2ME game is active or launching */}
      <div
        className={`w-full h-full flex flex-col transition-all duration-300 ${
          selectedGame
            ? 'filter blur-[3px] opacity-75 scale-98 pointer-events-none'
            : ''
        }`}
      >
        {/* Apps List View */}
        <div className="flex-1 relative flex overflow-hidden p-1">
          <div
            ref={listContainerRef}
            className="flex-1 p-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-y-1.5"
          >
            {games.map((game, idx) => {
              const isSelected = selectedIndex === idx;

              return (
                <div
                  key={game.id || idx}
                  onClick={() => {
                    setSelectedIndex(idx);
                    launchGame(game);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-1.5 rounded-lg border transition-all duration-150 cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-blue-600/50 border-cyan-300/80 shadow-[0_0_10px_rgba(56,189,248,0.5)] scale-101 z-10'
                      : 'bg-black/20 border-transparent hover:bg-black/35'
                  }`}
                >
                  {/* Game Icon */}
                  <div className="w-8 h-8 rounded bg-black/40 border border-white/20 flex items-center justify-center shrink-0 overflow-hidden shadow-xs p-1">
                    <img
                      src={game.icon}
                      alt={game.title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          '/icons_svg/Application.svg';
                      }}
                    />
                  </div>

                  {/* Metadata Info */}
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`text-xs truncate font-nokia ${
                        isSelected
                          ? 'font-bold text-white symbian-text-shadow'
                          : 'font-semibold text-white/95 symbian-text-shadow'
                      }`}
                    >
                      {game.title}
                    </h4>
                    <div className="flex justify-between items-center text-[10px] text-white/80 font-mono mt-0.5 symbian-text-shadow">
                      <span className="truncate max-w-[90px]">
                        {game.vendor}
                      </span>
                      <span className="font-bold text-white shrink-0 ml-1">
                        {game.size}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* S40 Right Scrollbar Track & Thumb */}
          <div className="w-1.5 ml-0.5 flex flex-col items-center justify-center py-1">
            <div className="w-[3px] h-full bg-white/20 rounded-full relative overflow-hidden">
              <div
                className="w-full bg-white rounded-full shadow-[0_0_4px_#fff] transition-all duration-150"
                style={{
                  height: '25%',
                  transform: `translateY(${
                    (selectedIndex / Math.max(1, games.length - 1)) * 300
                  }%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Authentic Nokia S40 Mini Loading Card Popup Matching Reference Photo */}
      {selectedGame && isLaunching && (
        <div className="absolute inset-x-3 top-1/3 z-50 bg-gradient-to-b from-[#c0daf9] via-[#a6c8f4] to-[#91b9ee] border-2 border-[#5484c4] p-3.5 rounded-xl shadow-[0_4px_25px_rgba(0,30,80,0.6)] flex flex-col justify-between text-slate-900 font-nokia animate-fadeIn backdrop-blur-md">
          {/* Header Text matching reference photo ("Opening" + Game Title) */}
          <div>
            <h3 className="text-base font-extrabold text-slate-900 leading-tight tracking-tight drop-shadow-xs">
              Opening
            </h3>
            <p className="text-sm font-bold text-slate-800 leading-tight truncate max-w-[170px]">
              {selectedGame.title}
            </p>
          </div>

          {/* Dark Blue Capsule Bar with Animated Application Icon Bouncing Left & Right */}
          <div className="mt-3.5 w-32 h-5 bg-gradient-to-b from-[#1b3f7a] to-[#0c244d] border border-[#4979c1] rounded-full relative overflow-hidden flex items-center px-1 shadow-inner">
            <img
              src="/icons_svg/Application.svg"
              alt="Loading"
              className="w-3.5 h-3.5 animate-nokia-bounce-lr shrink-0 filter drop-shadow-[0_0_4px_#38bdf8]"
            />
          </div>

          {/* Right Softkey Label Hint */}
          <span className="absolute bottom-1.5 right-3 text-[10px] font-bold text-slate-700">
            Cancel
          </span>
        </div>
      )}

      {/* Active FreeJ2ME WebAssembly Game Canvas Container */}
      {selectedGame && !isLaunching && (
        <div className="absolute inset-0 z-50 flex flex-col bg-black animate-fadeIn">
          {/* Embed FreeJ2ME WebAssembly Game Engine */}
          <iframe
            ref={iframeRef}
            src={`/freej2me/embed.html?url=${encodeURIComponent(selectedGame.jar)}`}
            className="w-full flex-1 border-0 bg-black"
            title={selectedGame.title}
          />
        </div>
      )}
    </div>
  );
};
