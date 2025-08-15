import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { alpha, styled, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { TfiHelpAlt } from "react-icons/tfi";
import { BsHandbag } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { BiUser } from "react-icons/bi";
import { MdOutlineSettings } from "react-icons/md";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { VscPackage } from "react-icons/vsc";
import AuthDrawer from "../Auth/AuthDrawer";
import { IoMdHeartEmpty } from "react-icons/io";

// Styled search components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  height: 40, // <-- controls bar height
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "60ch",
  },
  display: "flex",
  alignItems: "center",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%", // make input fill the search container
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    height: "100%", // fill height of parent
    fontSize: "1rem", // make text feel bigger
    boxSizing: "border-box",
    width: "100%", // fill horizontal space
  },
}));

export default function Navbar({ loggedIn }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [authDrawerOpen, setAuthDrawerOpen] = useState(false);
  const theme = useTheme();

  const toggleDropdown = () => setOpenDropdown((prev) => !prev);
  const closeDropdown = () => setOpenDropdown(false);

  return (
    <>
      <AppBar position="static" sx={{px: 10}}>
        <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
          {/* Logo */}
          <Box
            component="img"
            src="/assets/logo.svg"
            alt="Diva Trends Logo"
            sx={{
              height: 50,
              cursor: "pointer",
            }}
          />

          {/* Navigation Links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button color="inherit">Shop</Button>
            <Button color="inherit">Deals</Button>
          </Box>

          {/* Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* Account Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {loggedIn ? (
              <ClickAwayListener onClickAway={closeDropdown}>
                <Box sx={{ position: "relative" }}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<BiUser size={22} />}
                    onClick={toggleDropdown}
                    sx={{
                      textTransform: "none",
                      borderColor: "white",
                      transition: "color 0.2s, border-color 0.2s",
                    }}
                  >
                    Account
                  </Button>

                  {openDropdown && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        bgcolor: "background.paper",
                        color: "text.primary",
                        borderRadius: 1,
                        boxShadow: 3,
                        minWidth: 150,
                        zIndex: 9999,
                        p: 1,
                      }}
                    >
                      {[
                        { icon: <MdOutlineSettings />, label: "Settings" },
                        { icon: <VscPackage />, label: "Orders" },
                        { icon: <IoMdHeartEmpty />, label: "Wishlist" },
                        { icon: <TbLogout />, label: "Logout" },
                      ].map((item, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            p: 1,
                            cursor: "pointer",
                            borderRadius: 1,
                            gap: 1,
                            "&:hover": {
                              bgcolor: alpha(
                                theme.palette.primary.main,
                                theme.palette.action.hoverOpacity
                              ),
                            },
                          }}
                          onClick={closeDropdown}
                        >
                          {item.icon}
                          {item.label}
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </ClickAwayListener>
            ) : (
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => setAuthDrawerOpen(true)}
              >
                Login / Signup
              </Button>
            )}
          </Box>

          {/* Cart & Help Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="inherit">
              <BsHandbag />
            </IconButton>
            <IconButton color="inherit">
              <TfiHelpAlt />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <AuthDrawer
        open={authDrawerOpen}
        onClose={() => setAuthDrawerOpen(false)}
      />
    </>
  );
}
