import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon, BaseIconProps } from './BaseIcon';

export const ArrowDownIcon: React.FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        stroke={props.color || '#000000'}
      />
    </BaseIcon>
  );
};
