// styles.tsx
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

// Define styles for the Drawer
export const drawerStyles: SxProps<Theme> = {
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    margin: "50px",
    borderRadius: "35px",
    boxShadow: "-4px 4px 12px rgba(0, 0, 0, 0.1)",
    height: "calc(100% - 100px)",
    overflow: "hidden",
    transition: "width 0.3s",
  },
};

// Define styles for the Box containing the logo and text
export const logoBoxStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  padding: "20px",
  marginBottom: "26px",
};

// Define styles for the Typography elements
export const titleTextStyles: SxProps<Theme> = {
  fontSize: "30px",
  color: "black",
  fontStyle: "italic",
  fontWeight: "bold",
  overflow: "visible",
};

export const subtitleTextStyles: SxProps<Theme> = {
  fontSize: "10px",
  color: "red",
};

// Define styles for the IconButton
export const iconButtonStyles: SxProps<Theme> = {
  position: "absolute",
  top: 16,
  right: 16,
  zIndex: 1201,
};

// Define styles for ListItem
export const listItemStyles: SxProps<Theme> = {
  "&:hover .hoverEffect": {
    backgroundColor: "#f8d7da",
    color: "#dc3545",
    borderRadius: "12px",
  },
};

// Define styles for ListItemText in submenu
export const subItemTextStyles: SxProps<Theme> = {
  "&:hover": {
    fontWeight: "bold",
    color: "#dc3545",
  },
};
