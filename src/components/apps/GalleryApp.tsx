import React, { useState, useEffect, useRef } from 'react';

interface GalleryAppProps {
  onBack: () => void;
  onSetWallpaper: (url: string) => void;
}

interface GalleryItem {
  name: string;
  isDir: boolean;
  path: string;
  size?: string;
  type: 'folder' | 'audio' | 'image' | 'video' | 'other';
}

const ROOT_FOLDERS: GalleryItem[] = [
  { name: 'Ringing tones', isDir: true, path: '/Itunes', type: 'folder', size: '183 items' },
  { name: 'Graphics', isDir: true, path: '/Graphics', type: 'folder', size: '6 folders' },
  { name: 'Others', isDir: true, path: '/Others', type: 'folder', size: '29 items' },
];

export const GalleryApp: React.FC<GalleryAppProps> = ({ onBack, onSetWallpaper }) => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [folderTitle, setFolderTitle] = useState<string>('Gallery');
  const [items, setItems] = useState<GalleryItem[]>(ROOT_FOLDERS);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [pathHistory, setPathHistory] = useState<{ path: string; title: string; items: GalleryItem[] }[]>([]);

  // Active Media State
  const [playingAudioUrl, setPlayingAudioUrl] = useState<string | null>(null);

  // Image Viewer State (with Index for Left/Right D-Pad image navigation)
  const [previewImageIndex, setPreviewImageIndex] = useState<number | null>(null);

  // Custom Video Player State
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Helper to determine item type from filename
  const getItemType = (filename: string, isDir: boolean): GalleryItem['type'] => {
    if (isDir) return 'folder';
    const lower = filename.toLowerCase();
    if (/\.(mp3|aac|amr|mid|midi|wav|mxmf|nrt|m4a)$/.test(lower)) return 'audio';
    if (/\.(jpg|jpeg|png|gif|webp)$/.test(lower)) return 'image';
    if (/\.(3gp|mp4|avi|mkv|3gp~)$/.test(lower)) return 'video';
    return 'other';
  };

  // Load directory contents when currentPath changes
  useEffect(() => {
    if (currentPath === '/') {
      setFolderTitle('Gallery');
      setItems(ROOT_FOLDERS);
      setSelectedIndex(0);
      return;
    }

    let folderItems: GalleryItem[] = [];

    if (currentPath === '/Itunes') {
      const itunesFiles = [
        'Nokia tune.aac',
        '0Sweet_Nokia.mp3',
        '3d_sound_mobile.aac',
        'Airtelnew_mobile.aac',
        'Alarm_car.mp3',
        'Angry_Phone_-_Ringtone_mobile.aac',
        'Baby_-_Singing_aja_jippie_mobile.aac',
        'Blue ice.mid',
        'CocaCola_mobile.aac',
        'Do_it__Do_the_Music___Nokia_Xpresmuzik_mobile.aac',
        'GTA_San_Andreas_mobile.aac',
        'Movie_Themes_James_Bond_007_(Original).mp3',
        'Nokia-Gangster_mobile.aac',
        'Nokia-nirvana.mp3',
        'Nokia_Breaker.mp3',
        'Nokia_Tune_-_Low_battery_mobile.aac',
        'Police_Remix_mobile.aac',
        'Super_Sonic_mobile.aac',
        'TITANIC.mp3',
        'apple_iphone_ringtone_mobile.aac',
        'nokia-improved_mobile.aac',
      ];
      folderItems = itunesFiles.map((file) => ({
        name: file,
        isDir: false,
        path: `/Itunes/${file}`,
        size: file.endsWith('.aac') ? '93.5 kB' : file.endsWith('.mp3') ? '143 kB' : '48 kB',
        type: getItemType(file, false),
      }));
    } else if (currentPath === '/Graphics') {
      folderItems = [
        { name: 'Wallpaper', isDir: true, path: '/Graphics/Wallpaper', type: 'folder', size: '531 items' },
        { name: 'Screen Saver', isDir: true, path: '/Graphics/Screen Saver', type: 'folder', size: '24 items' },
        { name: 'Clip arts', isDir: true, path: '/Graphics/Clip arts', type: 'folder', size: '12 items' },
        { name: 'Animation', isDir: true, path: '/Graphics/Animation', type: 'folder', size: '8 items' },
      ];
    } else if (currentPath === '/Graphics/Wallpaper') {
      const wallpapers = [
        '006.JPG',
        '007.JPG',
        '0102_67y53vra.jpg',
        '1.JPG',
        '16[1].jpg',
        'ADIDAS.JPG',
        'Aishwarya101.jpg',
        'Aspecting_You.jpg',
        'BALLOON.JPG',
        'Ben_Ten_01.jpg',
        'CheshireCat.jpg',
        'Color Variant Red.jpg',
        'Final Destination 5 Film.jpg',
        'Jai Punk.jpg',
        'Lion-15635.jpg',
        'Nokia-Se_Wymiata.jpg',
        'Pirates-of-the-Caribbean.jpg',
        'The-Rock-in-WWE.jpg',
        'windows-7-vienna11.jpg',
      ];
      folderItems = wallpapers.map((file) => ({
        name: file,
        isDir: false,
        path: `/Graphics/Wallpaper/${file}`,
        size: '24 kB',
        type: 'image',
      }));
    } else if (currentPath === '/Others') {
      const videoFiles = [
        { title: 'Best Accidents.3gp', file: 'Best_Accidents_mobile_converted.mp4', size: '1.1 MB' },
        { title: 'Bigbang - Top of the world.3gp', file: 'Bigbang- top of the world_converted.mp4', size: '2.0 MB' },
        { title: 'CHHADKE - Trailer 2 (Official).3gp', file: 'CHHADKE - TRAILER 2 ( OFFICIAL ) - FULL HD_converted.mp4', size: '2.6 MB' },
        { title: 'Charlie Chaplin Boxing.3gp', file: 'Charli Chapling Boxing_converted.mp4', size: '7.0 MB' },
        { title: 'Citroën Ad.3gp', file: 'Citroën_converted.mp4', size: '540 KB' },
        { title: 'DHOOM 3 Trailer.mp4', file: 'DHOOM-3_converted.mp4', size: '12.5 MB' },
        { title: 'GAYE MERA GAJA KHANE.3gp', file: 'GAYE MERA GAJA KHANE_converted.mp4', size: '6.9 MB' },
        { title: 'Michael Jackson Dangerous.mp4', file: 'Michael Jackson(dangerous)_converted.mp4', size: '6.1 MB' },
        { title: 'Super Cops.3gp', file: 'Super Cops_converted.mp4', size: '2.8 MB' },
        { title: 'TITANIC Movie.mp4', file: 'TITANIC_converted.mp4', size: '6.9 MB' },
        { title: 'Titanic Theme Song.3gp', file: 'Titanic\' Theme Song_converted.mp4', size: '4.4 MB' },
        { title: 'Tony Jaa Tribute.3gp', file: 'Tony Jaa Tribute_converted.mp4', size: '6.1 MB' },
        { title: 'Akon - Lonely.3gp', file: 'Akon_Lonely_(3,2_MB).3gp_converted.mp4', size: '3.3 MB' },
        { title: 'Annoying Thing.3gp', file: 'annoying_thing_mobile_converted.mp4', size: '590 KB' },
        { title: 'Dog Dance Nepali Song.3gp', file: 'dog dance in nepali song-002_converted.mp4', size: '1.1 MB' },
        { title: 'Really Kicks of Tony Jaa.3gp', file: 'Really kicks of Tony jaa_converted.mp4', size: '1.8 MB' },
      ];
      folderItems = videoFiles.map((v) => ({
        name: v.title,
        isDir: false,
        path: `/Others/${v.file}`,
        size: v.size,
        type: 'video',
      }));
    }

    setItems(folderItems);
    setSelectedIndex(0);
  }, [currentPath]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (listContainerRef.current) {
      const activeEl = listContainerRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  const handleOpenItem = (item: GalleryItem, index: number) => {
    if (item.isDir) {
      setPathHistory((prev) => [...prev, { path: currentPath, title: folderTitle, items }]);
      setCurrentPath(item.path);
      setFolderTitle(item.name);
    } else if (item.type === 'audio') {
      if (playingAudioUrl === item.path) {
        if (audioRef.current) audioRef.current.pause();
        setPlayingAudioUrl(null);
      } else {
        setPlayingAudioUrl(item.path);
        if (audioRef.current) {
          audioRef.current.src = encodeURI(item.path);
          audioRef.current.play().catch(() => {});
        }
      }
    } else if (item.type === 'image') {
      setPreviewImageIndex(index);
    } else if (item.type === 'video') {
      setPreviewVideoUrl(item.path);
      setIsVideoPlaying(true);
      setVideoProgress(0);
      setVideoCurrentTime(0);
    }
  };

  const handleGoBack = () => {
    if (previewImageIndex !== null) {
      setPreviewImageIndex(null);
      return;
    }
    if (previewVideoUrl) {
      setPreviewVideoUrl(null);
      return;
    }
    if (playingAudioUrl) {
      if (audioRef.current) audioRef.current.pause();
      setPlayingAudioUrl(null);
    }

    if (pathHistory.length > 0) {
      const last = pathHistory[pathHistory.length - 1];
      setPathHistory((prev) => prev.slice(0, prev.length - 1));
      setCurrentPath(last.path);
      setFolderTitle(last.title);
    } else {
      onBack();
    }
  };

  // Image Navigation Helper (Next / Previous image in current items list)
  const navigateImage = (direction: 'NEXT' | 'PREV') => {
    if (previewImageIndex === null || items.length === 0) return;
    const imageIndices = items
      .map((item, idx) => (item.type === 'image' ? idx : -1))
      .filter((idx) => idx !== -1);

    if (imageIndices.length === 0) return;

    const currentPos = imageIndices.indexOf(previewImageIndex);
    if (direction === 'NEXT') {
      const nextPos = (currentPos + 1) % imageIndices.length;
      setPreviewImageIndex(imageIndices[nextPos]);
    } else {
      const prevPos = currentPos > 0 ? currentPos - 1 : imageIndices.length - 1;
      setPreviewImageIndex(imageIndices[prevPos]);
    }
  };

  // Video Time & Seek Helpers
  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 1;
      setVideoCurrentTime(cur);
      setVideoDuration(dur);
      setVideoProgress((cur / dur) * 100);
    }
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsVideoPlaying(true);
      }
    }
  };

  // Interactive Click Seek on Video Timeline Bar
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const clampedPos = Math.max(0, Math.min(1, pos));
    if (videoRef.current && videoDuration > 0) {
      const newTime = clampedPos * videoDuration;
      videoRef.current.currentTime = newTime;
      setVideoCurrentTime(newTime);
      setVideoProgress(clampedPos * 100);
    }
  };

  // D-Pad Seek -5s or +5s
  const handleDpadSeek = (delta: number) => {
    if (videoRef.current && videoDuration > 0) {
      const newTime = Math.max(0, Math.min(videoDuration, videoRef.current.currentTime + delta));
      videoRef.current.currentTime = newTime;
      setVideoCurrentTime(newTime);
      setVideoProgress((newTime / videoDuration) * 100);
    }
  };

  const formatVideoTime = (sec: number) => {
    if (isNaN(sec)) return '0:00';
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  // Keyboard navigation & D-Pad event handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (previewImageIndex !== null) {
        // Image Viewer D-Pad Navigation
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          navigateImage('NEXT');
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          navigateImage('PREV');
        } else if (e.key === 'Backspace' || e.key === 'Escape') {
          e.preventDefault();
          setPreviewImageIndex(null);
        }
        return;
      }

      if (previewVideoUrl) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handleDpadSeek(-5);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleDpadSeek(5);
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleVideoPlay();
        } else if (e.key === 'Backspace' || e.key === 'Escape') {
          e.preventDefault();
          setPreviewVideoUrl(null);
        }
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (items[selectedIndex]) {
          handleOpenItem(items[selectedIndex], selectedIndex);
        }
      } else if (e.key === 'Backspace' || e.key === 'Escape') {
        e.preventDefault();
        handleGoBack();
      }
    };

    const handleUINavigate = (e: CustomEvent) => {
      const { dir } = e.detail || {};
      if (previewImageIndex !== null) {
        if (dir === 'RIGHT' || dir === 'DOWN') navigateImage('NEXT');
        else if (dir === 'LEFT' || dir === 'UP') navigateImage('PREV');
        return;
      }

      if (previewVideoUrl) {
        if (dir === 'LEFT') handleDpadSeek(-5);
        else if (dir === 'RIGHT') handleDpadSeek(5);
        return;
      }

      if (items.length > 0) {
        if (dir === 'UP') {
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
        } else if (dir === 'DOWN') {
          setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
        }
      }
    };

    const handleUICenterSelect = () => {
      if (previewImageIndex !== null) return;
      if (previewVideoUrl) {
        toggleVideoPlay();
        return;
      }
      if (items[selectedIndex]) {
        handleOpenItem(items[selectedIndex], selectedIndex);
      }
    };

    const handleUIRightSoftkey = () => {
      handleGoBack();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('nokia-ui-navigate', handleUINavigate as any);
    window.addEventListener('nokia-ui-center-select', handleUICenterSelect);
    window.addEventListener('nokia-ui-right-softkey', handleUIRightSoftkey);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('nokia-ui-navigate', handleUINavigate as any);
      window.removeEventListener('nokia-ui-center-select', handleUICenterSelect);
      window.removeEventListener('nokia-ui-right-softkey', handleUIRightSoftkey);
    };
  }, [items, selectedIndex, pathHistory, currentPath, previewImageIndex, previewVideoUrl, isVideoPlaying, videoDuration]);

  // Render Official Nokia SVG File & Folder Icons from public/icons_svg/
  const renderItemIcon = (item: GalleryItem) => {
    let iconSrc = '/icons_svg/File.svg';
    if (item.isDir) {
      if (item.path.includes('Itunes') || item.name.toLowerCase().includes('tone') || item.name.toLowerCase().includes('music')) {
        iconSrc = '/icons_svg/Folder Music.svg';
      } else if (item.path.includes('Graphics') || item.name.toLowerCase().includes('photo') || item.name.toLowerCase().includes('wall')) {
        iconSrc = '/icons_svg/Folder Photo.svg';
      } else if (item.path.includes('Others') || item.name.toLowerCase().includes('video')) {
        iconSrc = '/icons_svg/Folder Video Track.svg';
      } else {
        iconSrc = '/icons_svg/Folder.svg';
      }
    } else {
      if (item.type === 'audio') iconSrc = '/icons_svg/File Media Music.svg';
      else if (item.type === 'image') iconSrc = '/icons_svg/File Photo.svg';
      else if (item.type === 'video') iconSrc = '/icons_svg/File Video.svg';
      else iconSrc = '/icons_svg/File.svg';
    }

    return (
      <div className="w-8 h-8 rounded bg-black/40 border border-white/20 flex items-center justify-center shrink-0 overflow-hidden shadow-xs p-1">
        <img
          src={iconSrc}
          alt={item.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = item.isDir ? '/icons_svg/Folder.svg' : '/icons_svg/File.svg';
          }}
        />
      </div>
    );
  };

  const currentPreviewItem = previewImageIndex !== null ? items[previewImageIndex] : null;

  return (
    <div className="w-full h-full flex flex-col bg-transparent text-white font-nokia select-none overflow-hidden relative">
      {/* Audio element for playing tones */}
      <audio ref={audioRef} onEnded={() => setPlayingAudioUrl(null)} className="hidden" />

      {/* Header Bar matching Reference Image (Title on left, item count on right) */}
      {previewImageIndex === null && !previewVideoUrl && (
        <div className="px-3 py-1 bg-black/40 backdrop-blur-xs border-b border-white/20 flex items-center justify-between shadow-xs z-10">
          <div className="flex items-center gap-1.5 min-w-0">
            <img src="/icons_svg/Gallery.svg" alt="Gallery" className="w-4.5 h-4.5 shrink-0" />
            <h2 className="font-bold text-xs text-white symbian-text-shadow truncate">
              {folderTitle}
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-white symbian-text-shadow shrink-0 ml-2">
            {items.length}
          </span>
        </div>
      )}

      {/* Full Image Viewer View (D-Pad Left/Right navigation, clean overlay badge) */}
      {previewImageIndex !== null && currentPreviewItem ? (
        <div className="flex-1 flex flex-col bg-black relative overflow-hidden select-none">
          {/* Top Title Overlay Badge */}
          <div className="absolute top-2 inset-x-2 bg-black/60 backdrop-blur-xs border border-white/20 p-1 rounded text-center z-20 shadow-md">
            <p className="text-[11px] font-bold text-white truncate font-nokia">
              [{previewImageIndex + 1}/{items.length}] {currentPreviewItem.name}
            </p>
          </div>

          {/* Full Screen Display Area */}
          <div className="flex-1 flex items-center justify-center p-1 overflow-hidden">
            <img
              src={encodeURI(currentPreviewItem.path)}
              alt={currentPreviewItem.name}
              className="max-h-full max-w-full object-contain rounded shadow-2xl transition-all duration-200"
            />
          </div>

          {/* Navigation Hint Bar */}
          <div className="absolute bottom-2 inset-x-2 flex justify-between items-center text-[10px] font-bold text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10 z-20">
            <span>◄ Prev</span>
            <span className="text-cyan-300">D-Pad Nav</span>
            <span>Next ►</span>
          </div>
        </div>
      ) : previewVideoUrl ? (
        /* Custom Authentic Nokia Video Player Component (Renders Streamable MP4 Video & Audio) */
        <div className="flex-1 flex flex-col bg-black relative overflow-hidden select-none p-1.5">
          {/* Video Playback Display Container */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden rounded bg-slate-950 border border-slate-800">
            <video
              ref={videoRef}
              src={encodeURI(previewVideoUrl)}
              autoPlay
              controls={false}
              onTimeUpdate={handleVideoTimeUpdate}
              onEnded={() => setIsVideoPlaying(false)}
              className="w-full h-full object-contain bg-black"
            />
          </div>

          {/* Custom Nokia Video Control Bar with Interactive Seeking */}
          <div className="mt-1.5 bg-slate-900/95 border border-slate-700/80 p-2 rounded-lg flex flex-col gap-1.5 shadow-xl">
            {/* Interactive Progress Seek Bar (Click or Drag to Seek) */}
            <div
              onClick={handleSeek}
              className="w-full h-3 bg-slate-800 rounded-full p-0.5 relative overflow-hidden border border-slate-700 cursor-pointer group"
              title="Click or use D-Pad Left/Right to Seek"
            >
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-75 shadow-[0_0_8px_#06b6d4]"
                style={{ width: `${videoProgress}%` }}
              />
            </div>

            {/* Time & Play/Pause Controls */}
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-white px-1">
              <button
                onClick={toggleVideoPlay}
                className="text-xs font-bold text-cyan-300 hover:text-white cursor-pointer"
              >
                {isVideoPlaying ? '⏸️ Pause' : '▶️ Play'}
              </button>
              <div className="flex items-center gap-2 text-[10px] text-slate-300">
                <span className="text-slate-400">◄ -5s / +5s ►</span>
                <span className="font-bold text-white">
                  {formatVideoTime(videoCurrentTime)} / {formatVideoTime(videoDuration)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Folder & File List View matching Nokia S40 Reference Image */
        <div className="flex-1 relative flex overflow-hidden p-1">
          <div
            ref={listContainerRef}
            className="flex-1 p-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-y-1.5"
          >
            {items.length === 0 ? (
              <div className="text-center py-8 text-xs text-white/80 symbian-text-shadow">
                Folder is empty.
              </div>
            ) : (
              items.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                const isPlayingThis = playingAudioUrl === item.path;

                return (
                  <div
                    key={item.path || idx}
                    onClick={() => {
                      setSelectedIndex(idx);
                      handleOpenItem(item, idx);
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-1.5 rounded-lg border transition-all duration-150 cursor-pointer flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-blue-600/50 border-cyan-300/80 shadow-[0_0_10px_rgba(56,189,248,0.5)] scale-101 z-10'
                        : 'bg-black/20 border-transparent hover:bg-black/35'
                    }`}
                  >
                    {/* Item Type Icon using Official Nokia SVG */}
                    {renderItemIcon(item)}

                    {/* File / Folder Metadata Details */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-xs truncate font-nokia ${
                          isSelected
                            ? 'font-bold text-white symbian-text-shadow'
                            : 'font-semibold text-white/95 symbian-text-shadow'
                        }`}
                      >
                        {item.name} {isPlayingThis ? '▶️ (Playing)' : ''}
                      </h4>

                      {/* Date & Size Info Line */}
                      <div className="flex justify-between items-center text-[10px] text-white/80 font-mono mt-0.5 symbian-text-shadow">
                        <span className="truncate max-w-[90px]">01-01-08</span>
                        <span className="font-bold text-white shrink-0 ml-1">{item.size}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* S40 Right Scrollbar Track & Thumb */}
          {items.length > 0 && (
            <div className="w-1.5 ml-0.5 flex flex-col items-center justify-center py-1">
              <div className="w-[3px] h-full bg-white/20 rounded-full relative overflow-hidden">
                <div
                  className="w-full bg-white rounded-full shadow-[0_0_4px_#fff] transition-all duration-150"
                  style={{
                    height: '25%',
                    transform: `translateY(${(selectedIndex / Math.max(1, items.length - 1)) * 300}%)`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
