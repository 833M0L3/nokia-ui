import React, { useState, useEffect } from 'react';
import { AppId, MenuItem, PhoneSettings } from '../types';
import { StatusBar } from './StatusBar';
import { SoftkeyBar } from './SoftkeyBar';
import { MenuGrid } from './MenuGrid';
import { OptionsMenu } from './OptionsMenu';
import { HomeScreen } from './HomeScreen';

import { GalleryApp } from './apps/GalleryApp';
import { MobileWebApp } from './apps/MobileWebApp';
import { J2meRunnerApp } from './apps/J2meRunnerApp';

interface NokiaScreenProps {
  items: MenuItem[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  activeApp: AppId | null;
  onOpenApp: (id: AppId) => void;
  onCloseApp: () => void;
  settings: PhoneSettings;
  onUpdateSettings: (newSettings: Partial<PhoneSettings>) => void;
}

export const NokiaScreen: React.FC<NokiaScreenProps> = ({
  items,
  selectedIndex,
  onSelectIndex,
  activeApp,
  onOpenApp,
  onCloseApp,
  settings,
  onUpdateSettings,
}) => {
  const [screenView, setScreenView] = useState<'home' | 'menu' | 'app'>('home');
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);

  const selectedItem = items[selectedIndex] || items[0];

  // Transition helper when an app is opened from parent
  useEffect(() => {
    if (activeApp) {
      setScreenView('app');
    } else if (screenView === 'app') {
      setScreenView('menu');
    }
  }, [activeApp]);

  // Only allow opening Gallery, Internet, and Apps. All others do nothing when clicked.
  const handleOpenAppById = (id: AppId) => {
    const ALLOWED_APPS: AppId[] = ['gallery', 'internet', 'apps'];
    if (ALLOWED_APPS.includes(id)) {
      onOpenApp(id);
      setScreenView('app');
    }
  };

  // Listen to Red End key, Center Select, Left Softkey, and Right Softkey UI events
  useEffect(() => {
    const handleGoHome = () => {
      onCloseApp();
      setScreenView('home');
      setIsOptionsOpen(false);
    };

    const handleCenterSelect = (e: CustomEvent) => {
      if (e.detail?.isDown === false) return;
      if (isGameRunning) return; // Active game handles Center Select
      if (screenView === 'home') {
        setScreenView('menu');
      } else if (screenView === 'menu' && !activeApp) {
        handleOpenAppById(selectedItem.id);
      }
    };

    const handleLeftSoftkey = (e: CustomEvent) => {
      if (e.detail?.isDown === false) return;
      if (isGameRunning) return; // Active game handles Left Softkey (F1)
      if (screenView === 'menu' || screenView === 'app') {
        setIsOptionsOpen((prev) => !prev);
      } else if (screenView === 'home') {
        setIsOptionsOpen((prev) => !prev);
      }
    };

    const handleRightSoftkey = (e: CustomEvent) => {
      if (e.detail?.isDown === false) return;
      if (isGameRunning) return; // Active game handles Right Softkey (F2)
      if (!activeApp) {
        if (screenView === 'menu') {
          setScreenView('home');
        } else if (screenView === 'home') {
          handleOpenAppById('apps');
        }
      }
    };

    window.addEventListener('nokia-go-home', handleGoHome);
    window.addEventListener('nokia-ui-center-select' as any, handleCenterSelect as any);
    window.addEventListener('nokia-ui-left-softkey' as any, handleLeftSoftkey as any);
    window.addEventListener('nokia-ui-right-softkey' as any, handleRightSoftkey as any);

    return () => {
      window.removeEventListener('nokia-go-home', handleGoHome);
      window.removeEventListener('nokia-ui-center-select' as any, handleCenterSelect as any);
      window.removeEventListener('nokia-ui-left-softkey' as any, handleLeftSoftkey as any);
      window.removeEventListener('nokia-ui-right-softkey' as any, handleRightSoftkey as any);
    };
  }, [activeApp, screenView, selectedItem, isGameRunning, onCloseApp]);

  const handleOptionsSelect = (optionId: string) => {
    if (optionId === 'open') {
      handleOpenAppById(selectedItem.id);
    } else if (optionId === 'theme') {
      const nextThemeMap: Record<string, any> = {
        's40-blue': 's40-dark',
        's40-dark': 'express-red',
        'express-red': 's40-emerald',
        's40-emerald': 's40-blue',
      };
      const nextTheme = nextThemeMap[settings.theme] || 's40-blue';
      const wallpaperUrl =
        nextTheme === 's40-blue'
          ? '/wallpaper/nokia-n73-original-wallpaper-remake-by-me-v0-qzru05vdez8b1.webp'
          : nextTheme === 'express-red'
          ? 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&q=80'
          : nextTheme === 's40-emerald'
          ? 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80'
          : 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80';
      onUpdateSettings({ theme: nextTheme, wallpaperUrl });
    } else if (optionId === 'view') {
      onUpdateSettings({
        viewMode: settings.viewMode === 'grid' ? 'list' : 'grid',
      });
    } else if (optionId === 'sound') {
      onUpdateSettings({ soundEnabled: !settings.soundEnabled });
    } else if (optionId === 'about') {
      alert('Nokia 3110 classic - Series 40 3rd Edition (S40v3) Web UI');
    } else if (optionId === 'exit') {
      if (activeApp) {
        onCloseApp();
        setScreenView('menu');
      } else {
        setScreenView('home');
      }
    }
  };

  const renderActiveApp = () => {
    switch (activeApp) {
      case 'gallery':
        return (
          <GalleryApp
            onBack={onCloseApp}
            onSetWallpaper={(url) => onUpdateSettings({ wallpaperUrl: url })}
          />
        );
      case 'internet':
        return <MobileWebApp onBack={onCloseApp} />;
      case 'apps':
        return (
          <J2meRunnerApp
            onBack={onCloseApp}
            soundEnabled={settings.soundEnabled}
            onGameRunningChange={setIsGameRunning}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden shadow-2xl rounded-sm select-none">
      {/* Background Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 scale-102"
        style={{
          backgroundImage: `url("${settings.wallpaperUrl}")`,
        }}
      >
        {/* Glass overlay gradient matching Nokia S40v3 wallpaper tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-transparent to-blue-950/60" />
      </div>

      {/* Screen Content Layer */}
      <div className="relative flex-1 flex flex-col justify-between z-10 overflow-hidden">
        {screenView === 'home' ? (
          /* Active Standby Home Screen View */
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <HomeScreen
              settings={settings}
              onOpenMenu={() => setScreenView('menu')}
              onOpenApp={(id) => handleOpenAppById(id as AppId)}
            />

            {/* Home Screen Softkey Bar: Go to | Menu | Apps */}
            <SoftkeyBar
              leftText="Go to"
              centerText="Menu"
              rightText="Apps"
              onLeftClick={() => setIsOptionsOpen(true)}
              onCenterClick={() => setScreenView('menu')}
              onRightClick={() => handleOpenAppById('apps')}
            />
          </div>
        ) : (
          /* Apps Grid / Active App View */
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Top Status Bar (Hidden during active J2ME Game) */}
            {!isGameRunning && (
              <StatusBar
                title={
                  activeApp === 'apps'
                    ? 'Applications'
                    : activeApp
                    ? activeApp.toUpperCase()
                    : 'Menu'
                }
                count={activeApp === 'apps' ? 55 : undefined}
                settings={settings}
              />
            )}

            {/* Center Area: Opened App OR 3x3 Menu Grid */}
            {activeApp ? (
              <div className="flex-1 flex flex-col overflow-hidden animate-fadeIn">
                {renderActiveApp()}
              </div>
            ) : (
              <MenuGrid
                items={items}
                selectedIndex={selectedIndex}
                onSelectIndex={onSelectIndex}
                onOpenApp={handleOpenAppById}
              />
            )}

            {/* Bottom Softkey Bar (Hidden during active J2ME Game) */}
            {!isGameRunning && (
              <SoftkeyBar
                leftText="Options"
                centerText="Select"
                rightText={activeApp ? 'Back' : 'Exit'}
                onLeftClick={() => setIsOptionsOpen(true)}
                onCenterClick={() => {
                  if (!activeApp) {
                    handleOpenAppById(selectedItem.id);
                  }
                }}
                onRightClick={() => {
                  if (activeApp) {
                    window.dispatchEvent(new CustomEvent('nokia-ui-right-softkey'));
                  } else {
                    setScreenView('home');
                  }
                }}
              />
            )}
          </div>
        )}

        {/* Options Drawer Modal */}
        <OptionsMenu
          isOpen={isOptionsOpen}
          onClose={() => setIsOptionsOpen(false)}
          onSelectOption={handleOptionsSelect}
          settings={settings}
        />
      </div>

      {/* Scanline CRT FX (Optional) */}
      {settings.showScanlines && (
        <div className="absolute inset-0 pointer-events-none scanlines z-40 opacity-40" />
      )}
    </div>
  );
};
