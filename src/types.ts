export type AppId = 
  | 'messaging' 
  | 'log' 
  | 'contacts' 
  | 'gallery' 
  | 'media' 
  | 'settings' 
  | 'organiser' 
  | 'internet' 
  | 'apps';

export interface MenuItem {
  id: AppId;
  name: string;
  icon: string;
  gridPos: number; // 0 to 8 index in 3x3 grid
}

export type ViewMode = 'grid' | 'list';
export type ThemeId = 's40-blue' | 's40-dark' | 'express-red' | 's40-emerald';
export type S40Profile = 'General' | 'Silent' | 'Meeting' | 'Outdoor';

export interface PhoneSettings {
  soundEnabled: boolean;
  viewMode: ViewMode;
  theme: ThemeId;
  profile: S40Profile;
  wallpaperUrl: string;
  clockFormat: '24h' | '12h';
  showScanlines: boolean;
}

export interface J2meGame {
  id: string;
  title: string;
  version?: string;
  vendor?: string;
  size?: string;
  releaseDate?: string;
  description?: string;
  icon: string;
  jar: string;
  screenSize?: string;
  phoneType?: string;
  enableSound?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  number: string;
  type: 'Mobile' | 'Work' | 'Home';
}

export interface CallLogItem {
  id: string;
  name: string;
  number: string;
  type: 'incoming' | 'outgoing' | 'missed';
  time: string;
  duration?: string;
}

export interface SMSMessage {
  id: string;
  sender: string;
  number: string;
  content: string;
  timestamp: string;
  unread: boolean;
}
