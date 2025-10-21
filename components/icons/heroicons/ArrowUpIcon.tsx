import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon, BaseIconProps } from './BaseIcon';

export const ArrowUpIcon: React.FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
        stroke={props.color || '#000000'}
      />
    </BaseIcon>
  );
};
