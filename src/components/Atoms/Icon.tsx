import React from 'react';

import { IconNames } from '../../types/props';

interface IconProps {
  name: IconNames;
  className?: string;
  styles?: any;
  height?: number;
  width?: number;
  size?: number;
  color?: string;
  alt?: string;
}

export default function Icon({
  name,
  size = 24,
  height = size,
  className = '',
  styles = {},
  width = size,
  alt = name + ' icon',
}: IconProps) {
  return (
    <img
      style={styles}
      className={className}
      src={`/icons/${name}.svg`}
      alt={alt}
      width={width}
      height={height}
    />
  );
}
