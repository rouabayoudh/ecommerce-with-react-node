import React, { FC, ReactNode } from "react";
import Button from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material/styles";
import buttonStyle from "./styles";

interface CommonButtonProps {
  children: ReactNode;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  sx?: SxProps<Theme>; // Accepts MUI sx styles
  variant?: "text" | "outlined" | "contained";
  onClick?: () => void;
}

const CommonButton: FC<CommonButtonProps> = ({
  children,
  color = "primary",
  disabled = false,
  size = "medium",
  sx = {},
  variant = "contained",
  onClick,
}) => {
  return (
    <Button
      color={color}
      disabled={disabled}
      size={size}
      sx={{ ...buttonStyle.default, ...sx }}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
