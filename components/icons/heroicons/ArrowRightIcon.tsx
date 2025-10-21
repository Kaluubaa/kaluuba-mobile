import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon, BaseIconProps } from './BaseIcon';

export const ArrowRightIcon: React.FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        stroke={props.color || '#000000'}
      />
    </BaseIcon>
  );
};
