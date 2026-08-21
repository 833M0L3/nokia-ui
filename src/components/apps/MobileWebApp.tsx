import React, { useState, useEffect, useRef } from 'react';

interface MobileWebAppProps {
  onBack: () => void;
}

interface WapLink {
  id: string;
  title: string;
  isHeader?: boolean;
  category?: string;
  url?: string;
}

const WAP_LINKS: WapLink[] = [
  { id: '1', title: 'Install Opera Mini for faster and cheaper surfing', url: 'opera-mini' },
  { id: '2', title: 'Updates: 4th May 2010', url: 'updates' },
  { id: '3', title: 'Waptrick Search', url: 'search' },
  { id: '4', title: 'Games', url: 'games' },
  { id: '5', title: 'Euphoria Whisper', url: 'euphoria' },
  { id: '6', title: 'Ringtones & Polyphonic Tones', url: 'ringtones' },
  { id: '7', title: 'Wallpapers & Themes', url: 'wallpapers' },
  { id: '8', title: 'Video Clips & MP4 Movies', url: 'videos' },
  { id: '9', title: 'Free MP3 Music & Songs', url: 'music' },
  { id: '10', title: 'Java Games 240x320 (J2ME)', url: 'java-games' },
  { id: '11', title: 'Mobile Applications & Utilities', url: 'utilities' },
];

export const MobileWebApp: React.FC<MobileWebAppProps> = ({ onBack }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(4);
  const [currentUrl, setCurrentUrl] = useState<string>('http://waptrick.com');
  const [inputUrl, setInputUrl] = useState<string>('waptrick.com');
  const [pageView, setPageView] = useState<'home' | 'detail'>('home');
  const [activeTitle, setActiveTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for WAP links & step-by-step Back key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : WAP_LINKS.length - 1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < WAP_LINKS.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (WAP_LINKS[selectedIndex]) {
          openLink(WAP_LINKS[selectedIndex]);
        }
      } else if (e.key === 'Backspace' || e.key === 'Escape' || e.key === 'F2') {
        e.preventDefault();
        if (pageView === 'detail') {
          setPageView('home');
        } else {
          onBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, pageView, onBack]);

  // Listen to Right Softkey and Hardware casing Back keys for step-by-step navigation
  useEffect(() => {
    const handleRightSoftkey = () => {
      if (pageView === 'detail') {
        setPageView('home');
      } else {
        onBack();
      }
    };

    const handleHardwareKey = (e: CustomEvent) => {
      const { code } = e.detail || {};
      if (code === 'F2' || code === 'RightSoftkey' || code === 'Backspace' || code === 'Escape') {
        if (pageView === 'detail') {
          setPageView('home');
        } else {
          onBack();
        }
      }
    };

    window.addEventListener('nokia-ui-right-softkey', handleRightSoftkey);
    window.addEventListener('nokia-hw-key' as any, handleHardwareKey);

    return () => {
      window.removeEventListener('nokia-ui-right-softkey', handleRightSoftkey);
      window.removeEventListener('nokia-hw-key' as any, handleHardwareKey);
    };
  }, [pageView, onBack]);

  // Scroll active item into view
  useEffect(() => {
    if (containerRef.current) {
      const activeEl = containerRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  const openLink = (link: WapLink) => {
    setIsLoading(true);
    setActiveTitle(link.title);
    setCurrentUrl(`http://waptrick.com/${link.url}`);
    setTimeout(() => {
      setIsLoading(false);
      setPageView('detail');
    }, 400);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentUrl(`http://${inputUrl}`);
    setTimeout(() => {
      setIsLoading(false);
      setPageView('home');
    }, 400);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#dcebf0] text-slate-900 font-nokia select-none overflow-hidden">
      {/* Top Address & URL Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="bg-slate-900 text-white px-2 py-1 flex items-center gap-1 border-b border-slate-700 shadow-xs z-20 shrink-0"
      >
        <span className="text-[10px] text-cyan-300 font-mono">🌐</span>
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="flex-1 bg-slate-800 text-white text-[11px] font-mono px-1.5 py-0.5 rounded border border-slate-700 focus:outline-none focus:border-cyan-400 min-w-0"
          placeholder="waptrick.com"
        />
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer shrink-0"
        >
          Go
        </button>
      </form>

      {/* Main Browser Web Page Window */}
      <div className="flex-1 relative flex overflow-hidden p-2">
        <div className="flex-1 overflow-y-auto symbian-scrollbar pr-1">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-2 text-slate-700 animate-pulse text-xs font-semibold">
              <span className="text-2xl">⏳</span>
              <span>Loading WAP Page...</span>
              <span className="text-[10px] font-mono text-slate-500">{currentUrl}</span>
            </div>
          ) : pageView === 'home' ? (
            <div className="space-y-1.5 font-sans">
              {/* Official WAPTRICK Brand Header Asset */}
              <div className="flex flex-col items-center justify-center pt-0.5 pb-1">
                <img
                  src="/freej2me/assets/waptrick-header.png"
                  alt="Waptrick Logo Header"
                  className="max-h-11 object-contain drop-shadow-xs"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/freej2me/assets/waptrick.png';
                  }}
                />
              </div>

              {/* Page Title & Main Header */}
              <div className="text-[12px] font-bold text-slate-900 leading-snug border-b border-slate-300 pb-1">
                Waptrick | Waptrick Music | Games | Videos | Mp3 Download
              </div>

              {/* WAP Links Listing */}
              <div ref={containerRef} className="space-y-1 pt-1">
                {WAP_LINKS.map((link, idx) => {
                  const isSelected = selectedIndex === idx;

                  return (
                    <div
                      key={link.id}
                      onClick={() => {
                        setSelectedIndex(idx);
                        openLink(link);
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`px-1.5 py-1 text-[12px] rounded cursor-pointer transition-all duration-100 flex items-start gap-1 ${
                        isSelected
                          ? 'bg-[#1e305e] text-white font-bold shadow-xs'
                          : 'text-slate-900 hover:bg-slate-300/60'
                      }`}
                    >
                      <span className={`${isSelected ? 'text-white' : 'text-slate-700'}`}>
                        »
                      </span>
                      <span
                        className={`leading-snug ${
                          isSelected ? 'underline text-white font-bold' : 'underline text-blue-900'
                        }`}
                      >
                        {link.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* WAP Category / Link Detail View */
            <div className="space-y-2 text-xs text-slate-900">
              <button
                onClick={() => setPageView('home')}
                className="text-[11px] font-bold text-blue-900 underline flex items-center gap-1 cursor-pointer"
              >
                « Back to Waptrick Home
              </button>

              <div className="bg-slate-100 p-2 rounded border border-slate-300 shadow-xs">
                <h3 className="font-bold text-sm text-emerald-800 border-b border-slate-300 pb-1">
                  {activeTitle}
                </h3>
                <p className="text-[11px] text-slate-700 mt-1.5 leading-relaxed">
                  Welcome to <strong>{activeTitle}</strong> on Waptrick! Select your phone resolution
                  or file format to start downloading free mobile content.
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="p-1.5 bg-white rounded border border-slate-300 text-blue-900 underline font-bold cursor-pointer hover:bg-slate-50">
                  » Direct Download (.MP3 / .JAR)
                </div>
                <div className="p-1.5 bg-white rounded border border-slate-300 text-blue-900 underline font-bold cursor-pointer hover:bg-slate-50">
                  » Preview File
                </div>
                <div className="p-1.5 bg-white rounded border border-slate-300 text-blue-900 underline font-bold cursor-pointer hover:bg-slate-50">
                  » Top Downloads 2010
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Retro Right Blue Scrollbar Track & Slider */}
        <div className="w-2 ml-1 flex flex-col items-center justify-center shrink-0">
          <div className="w-1.5 h-full bg-blue-300/60 rounded-full relative overflow-hidden">
            <div
              className="w-full bg-blue-800 rounded-full shadow-xs transition-all duration-150"
              style={{
                height: '35%',
                transform: `translateY(${(selectedIndex / Math.max(1, WAP_LINKS.length - 1)) * 180}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
