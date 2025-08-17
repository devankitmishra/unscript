import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../../Config/Config";

const drawerWidth = 300;

const SideNav = ({ mobileOpen, onClose }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [openItems, setOpenItems] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch menu data immediately on mount
  useEffect(() => {
    fetch(`${baseUrl}/api/menu`)
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Error fetching menu:", err));
  }, []);

  // Toggle collapse (accordion per level)
  const handleToggle = (id, level) => {
    setOpenItems((prev) => {
      // find open at same level
      const currentOpenAtLevel = Object.keys(prev).find(
        (key) => prev[key]?.level === level && prev[key]?.open
      );

      const newState = { ...prev };

      // close sibling at same level
      if (currentOpenAtLevel && currentOpenAtLevel !== id.toString()) {
        newState[currentOpenAtLevel] = {
          ...newState[currentOpenAtLevel],
          open: false,
        };
      }

      // toggle clicked item
      newState[id] = { level, open: !(prev[id]?.open) };

      return newState;
    });
  };

  // Handle click
  const handleClick = (item, level) => {
    if (item.children?.length > 0) {
      handleToggle(item.id, level);
    } else {
      navigate(item.fullPath);
      onClose();
    }
  };

  // Recursive menu rendering
  const renderMenu = (items, level = 0) =>
    items.map((item) => {
      const isActive =
        location.pathname === item.fullPath && !item.children?.length;
      const isOpen = openItems[item.id]?.open || false;

      return (
        <React.Fragment key={item.id}>
          <ListItemButton
            sx={{ pl: 2 + level * 2 }}
            onClick={() => handleClick(item, level)}
          >
            <ListItemText
              primary={item.title.toUpperCase()}
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "0.85rem",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                  color: isActive ? "primary.main" : "#4c4c4c",
                },
              }}
            />
            {item.children?.length ? (
              isOpen ? <ExpandLess /> : <ExpandMore />
            ) : null}
          </ListItemButton>

          {item.children?.length > 0 && (
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderMenu(item.children, level + 1)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });

  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
          }}
        >
          <Box
            component="img"
            src="/assets/sheyahe.png"
            alt="Unscript Logo"
            sx={{ height: 60, cursor: "pointer" }}
            onClick={() => (window.location.href = "/")}
          />

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Menu Items */}
        <List
          sx={{
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {renderMenu(menuItems)}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideNav;
