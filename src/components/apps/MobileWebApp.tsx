import React, { useState, useEffect, useRef } from 'react';
import { Globe, Loader2 } from 'lucide-react';

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

  // Navigation for WAP links & step-by-step Back key
  useEffect(() => {
    const handleUINavigate = (e: CustomEvent) => {
      const { dir, isDown = true } = e.detail || {};
      if (!isDown) return;

      if (dir === 'UP') {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : WAP_LINKS.length - 1));
      } else if (dir === 'DOWN') {
        setSelectedIndex((prev) => (prev < WAP_LINKS.length - 1 ? prev + 1 : 0));
      }
    };

    const handleUICenterSelect = (e: CustomEvent) => {
      const isDown = e.detail?.isDown ?? true;
      if (!isDown) return;

      if (WAP_LINKS[selectedIndex]) {
        openLink(WAP_LINKS[selectedIndex]);
      }
    };

    const handleRightSoftkey = (e: CustomEvent) => {
      const isDown = e.detail?.isDown ?? true;
      if (!isDown) return;

      if (pageView === 'detail') {
        setPageView('home');
      } else {
        onBack();
      }
    };

    window.addEventListener('nokia-ui-navigate' as any, handleUINavigate as any);
    window.addEventListener('nokia-ui-center-select' as any, handleUICenterSelect as any);
    window.addEventListener('nokia-ui-right-softkey' as any, handleRightSoftkey as any);

    return () => {
      window.removeEventListener('nokia-ui-navigate' as any, handleUINavigate as any);
      window.removeEventListener('nokia-ui-center-select' as any, handleUICenterSelect as any);
      window.removeEventListener('nokia-ui-right-softkey' as any, handleRightSoftkey as any);
    };
  }, [selectedIndex, pageView, onBack]);

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
        className="bg-slate-900 text-white px-2 py-1 flex items-center gap-1.5 border-b border-slate-700 shadow-xs z-20 shrink-0"
      >
        <Globe className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
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
            <div className="h-full flex flex-col items-center justify-center space-y-2 text-slate-700 text-xs font-semibold">
              <Loader2 className="w-6 h-6 text-cyan-600 animate-spin" />
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
