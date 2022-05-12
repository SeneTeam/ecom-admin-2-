import React from "react";
import { ButtonProps } from "../../../types/props";
import "../../../styles/components/Molecules/Button/Button.scss";

export default function Button<T>({
  children,
  disabled,
  full,
  icon,
  className = "",
  onClick,
  isLoading,
  ...attrs
}: ButtonProps<T>) {
  return (
    <button
      {...attrs}
      disabled={disabled}
      className={`main ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
