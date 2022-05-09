import React, {
  AllHTMLAttributes,
  ButtonHTMLAttributes,
  DOMAttributes,
  ReactNode,
} from 'react';

export interface CommonProps<T> extends AllHTMLAttributes<DOMAttributes<T>> {}

import { Color, SelectData, ValueType } from '.';

/**
 * input props that will be shared to all input components
 */
export interface CommonInputProps<T> extends CommonProps<T> {
  handleChange: (_e: ValueType) => void;
  name: string;
  value?: string | number;
  options?: SelectData[];
}

export interface HeadingProps {
  text: string;
  color?: string;
  className?: string;
  weight?: string;
}

export interface InputProps<T> extends CommonInputProps<T> {
  defaultValue?: string;
  type?: string;
  readonly?: boolean;
  // handleChange?: (_e: ValueType) => void;
  value: string | number | undefined;
  name: string;
  full?: boolean;
  padding?: string;
  fcolor?: Color;
  bcolor?: Color;
  pcolor?: Color;
  width?: string | number;
  className?: string;
  required?: boolean;
  reference?: React.LegacyRef<HTMLInputElement>;
}

export interface ButtonProps<T> extends ButtonHTMLAttributes<DOMAttributes<T>> {
  children: ReactNode;
  disabled?: boolean;
  full?: boolean;
  icon?: boolean;
  color?: Color;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

export interface TableActionsType<T> {
  name: string;
  icon: IconNames;
  handleAction: (_data: T) => void;
}

export type IconNames =
  | 'print'
  | 'add'
  | 'home'
  | 'arrow-right'
  | 'arrow-right2'
  | 'arrow-left'
  | 'more';
