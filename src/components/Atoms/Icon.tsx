import React from 'react';

import { IconNames } from '../../types/props';

interface IconProps {
  name: IconNames;
  className?: string;
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
  width = size,
  alt = name + ' icon',
}: IconProps) {
  return <img src={`/icons/${name}.svg`} alt={alt} width={width} height={height} />;
}
