import React from 'react';
import { NokiaVariantId, PhoneFrameProps as BasePhoneFrameProps } from '../types';
import { VARIANT_FRAMES } from './variants';

export interface PhoneFrameProps extends BasePhoneFrameProps {
  variant?: NokiaVariantId;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  variant = '3110c',
  ...props
}) => {
  const FrameComponent = VARIANT_FRAMES[variant] || VARIANT_FRAMES['3110c'];
  return <FrameComponent {...props} />;
};
