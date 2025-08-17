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
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../Config/Config";

const drawerWidth = 300;

const SideNav = ({ mobileOpen, onClose }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [openItems, setOpenItems] = useState({});
  const navigate = useNavigate();

  // Fetch menu data immediately on mount
  useEffect(() => {
    fetch(`${baseUrl}/api/menu`)
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Error fetching menu:", err));
  }, []);

  // Toggle collapse
  const handleToggle = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Handle click: navigate + toggle if children
  const handleClick = (item) => {
    if (item.children?.length > 0) {
      handleToggle(item.id);
    } else {
      navigate(item.fullPath);
      console.log("Navigating to:", item.fullPath);
      onClose();
    }
  };

  // Recursive menu rendering
  const renderMenu = (items, level = 0) =>
    items.map((item) => (
      <React.Fragment key={item.id}>
        <ListItemButton
          sx={{ pl: 2 + level * 2 }}
          onClick={() => handleClick(item)}
        >
          <ListItemText primary={item.title.toUpperCase()} />
          {item.children?.length ? (
            openItems[item.id] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </ListItemButton>

        {item.children?.length > 0 && (
          <Collapse in={openItems[item.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderMenu(item.children, level + 1)}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));

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
          {/* Replace with your logo image if needed */}
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
            // normal scrolling
            overflowY: "auto",
            // hide scrollbar (cross-browser)
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none", // IE + Edge
            scrollbarWidth: "none", // Firefox
          }}
        >
          {renderMenu(menuItems)}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideNav;
