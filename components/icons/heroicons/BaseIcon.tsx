import React from 'react';
import { Svg, SvgProps } from 'react-native-svg';

export interface BaseIconProps extends SvgProps {
  size?: number;
  color?: string;
}

export const BaseIcon: React.FC<BaseIconProps> = ({ 
  size = 24, 
  color = '#000000', 
  children, 
  ...props 
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      {children}
    </Svg>
  );
};
