import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Typography,
  IconButton,
  SvgIcon,
} from "@mui/material";
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Inventory as ProductIcon,
  Hail as CustomersIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { MenuItem as MenuItemType } from "@/app/types/MenuItem";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  drawerStyles,
  logoBoxStyles,
  titleTextStyles,
  subtitleTextStyles,
  iconButtonStyles,
  listItemStyles,
  subItemTextStyles,
} from "./styles";

// Function to create styled icons
const WhiteIconStyle =
  (IconComponent: React.ComponentType<SvgIconProps>) => (props: SvgIconProps) =>
    (
      <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        sx={{
          transition: "color 0.3s, transform 0.3s",
          "&:hover": {
            transform: "scale(1.2)",
          },
        }}
      >
        <IconComponent
          {...props}
          sx={{
            fill: "white",
            stroke: "gray",
            strokeWidth: 1.5,
            "&:hover": {
              stroke: "red",
              transform: "scale(1.2)",
            },
          }}
        />
      </SvgIcon>
    );

// Create styled icons
const StyledHomeIcon = WhiteIconStyle(HomeIcon);
const StyledPersonIcon = WhiteIconStyle(PersonIcon);
const StyledGroupIcon = WhiteIconStyle(GroupIcon);
const StyledShoppingCartIcon = WhiteIconStyle(ShoppingCartIcon);
const StyledCategoryIcon = WhiteIconStyle(CategoryIcon);
const StyledProductIcon = WhiteIconStyle(ProductIcon);
const StyledCustomersIcon = WhiteIconStyle(CustomersIcon);
const StyledSettingsIcon = WhiteIconStyle(SettingsIcon);

const MENU_ITEMS: MenuItemType[] = [
  { text: "Home", href: "/", Icon: StyledHomeIcon },
  { text: "Categories", href: "/categories", Icon: StyledCategoryIcon },
  { text: "Products", href: "/products", Icon: StyledProductIcon },
  { text: "Orders", href: "/orders", Icon: StyledShoppingCartIcon },
  { text: "Customers", href: "/customers", Icon: StyledCustomersIcon },
  { text: "Roles", href: "/roles", Icon: StyledPersonIcon },
  { text: "Users", href: "/users", Icon: StyledGroupIcon },
  { text: "Settings", href: "/settings", Icon: StyledSettingsIcon },
];

const VerticalMenu = () => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const handleClick = (text: string) => {
    setOpenSubMenu(openSubMenu === text ? null : text);
  };

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Drawer variant="permanent" sx={drawerStyles}>
      <Box sx={logoBoxStyles}>
        <img
          src="/logo.png"
          alt="Logo"
          style={{ height: "60px", marginRight: "12px" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6" noWrap sx={titleTextStyles}>
            E-JEI
          </Typography>
          <Typography variant="subtitle2" sx={subtitleTextStyles}>
            Modern E-JEI Dashboard
          </Typography>
        </Box>
      </Box>

      <IconButton onClick={handleSidebarToggle} sx={iconButtonStyles}>
        <ArrowBackIosIcon
          sx={{
            transform: isSidebarCollapsed ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
        />
      </IconButton>

      <List>
        {MENU_ITEMS.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem
              button
              component="a"
              href={item.href}
              onClick={() => item.submenuItems && handleClick(item.text)}
              sx={listItemStyles}
            >
              <Box
                className="hoverEffect"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  transition: "background-color 0.3s",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "unset",
                    justifyContent: "center",
                    width: isSidebarCollapsed ? "50%" : "auto",
                    padding: "0 15px",
                  }}
                >
                  <item.Icon />
                </ListItemIcon>

                {!isSidebarCollapsed && (
                  <ListItemText primary={item.text} sx={subItemTextStyles} />
                )}
              </Box>

              {item.submenuItems ? (
                openSubMenu === item.text ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItem>

            {item.submenuItems && (
              <Collapse
                in={openSubMenu === item.text}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.submenuItems.map((subItem) => (
                    <ListItem
                      button
                      key={subItem.text}
                      component="a"
                      href={subItem.href}
                    >
                      <ListItemText
                        primary={subItem.text}
                        sx={subItemTextStyles}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default VerticalMenu;
