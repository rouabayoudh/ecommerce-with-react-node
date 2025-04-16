import * as React from "react";
import StyledTextField from "../StyledTextField/StyledTextField";
export default function SearchBar({
  placeholder,
  onChange,
  searchBarWidth = "300px",
}) {
  return (
    <StyledTextField
      size="small"
      label="Search"
      placeholder={placeholder}
      onChange={onChange}
      sx={{
        width: searchBarWidth,
      }}
    />
  );
}
