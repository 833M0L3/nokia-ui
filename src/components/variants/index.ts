import React from 'react';
import { NokiaVariantId, PhoneFrameProps } from '../../types';
import { Nokia3110cFrame } from './Nokia3110cFrame';
import { Nokia3310Frame } from './Nokia3310Frame';
import { Nokia5300Frame } from './Nokia5300Frame';
import { NokiaN73Frame } from './NokiaN73Frame';

export { Nokia3110cFrame, Nokia3310Frame, Nokia5300Frame, NokiaN73Frame };

export const VARIANT_FRAMES: Record<NokiaVariantId, React.FC<PhoneFrameProps>> = {
  '3110c': Nokia3110cFrame,
  '3310': Nokia3310Frame,
  '5300': Nokia5300Frame,
  'n73': NokiaN73Frame,
};
