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
import { useAuth } from "../../context/AuthContext"; // ✅ auth context
import useMediaQuery from "@mui/material/useMediaQuery";

// Styled search components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  height: 40,
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
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    height: "100%",
    fontSize: "1rem",
    boxSizing: "border-box",
    width: "100%",
  },
}));

const Navbar = ({ loggedIn }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [authDrawerOpen, setAuthDrawerOpen] = useState(false);
  const theme = useTheme();
  const { logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDropdown = () => setOpenDropdown((prev) => !prev);
  const closeDropdown = () => setOpenDropdown(false);

  return (
    <>
      <AppBar position="static" sx={{ paddingX: { xs: 2, md: 5 } }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
            px: { xs: 0, sm: 2 },
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src="/assets/unscript.svg"
            alt="Unscript Logo"
            sx={{ height: { sm: 40, xs: 25 }, cursor: "pointer" }}
          />

          {/* Navigation Links (hidden on mobile) */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button color="inherit">Shop</Button>
              <Button color="inherit">Deals</Button>
            </Box>
          )}

          {/* Search Bar (on desktop in toolbar, on mobile moves down) */}
          {!isMobile && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          )}

          {/* Account + Cart + Help Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Account */}
            <ClickAwayListener onClickAway={closeDropdown}>
              <Box sx={{ position: "relative" }}>
                {loggedIn ? (
                  <>
                    {isMobile ? (
                      <IconButton color="inherit" onClick={toggleDropdown}>
                        <BiUser size={24} />
                      </IconButton>
                    ) : (
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
                    )}

                    {openDropdown && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "calc(100% + 8px)",
                          right: 0,
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
                          {
                            icon: <TbLogout />,
                            label: "Logout",
                            action: logout,
                          },
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
                            onClick={() => {
                              if (item.action) item.action();
                              closeDropdown();
                            }}
                          >
                            {item.icon}
                            {item.label}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      color="inherit"
                      variant="outlined"
                      onClick={() => setAuthDrawerOpen(true)}
                      size="medium"
                      sx={{ display: { xs: "none", sm: "block" } }}
                    >
                      Login / SignUp
                    </Button>
                    <Button
                      color="inherit"
                      variant="outlined"
                      onClick={() => setAuthDrawerOpen(true)}
                      size="small"
                      sx={{ display: { xs: "block", sm: "none" } }}
                    >
                      Login
                    </Button>
                  </>
                )}
              </Box>
            </ClickAwayListener>

            {/* Cart & Help Icons */}
            <IconButton color="inherit">
              <BsHandbag />
            </IconButton>
            {!isMobile && (
              <IconButton color="inherit">
                <TfiHelpAlt />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        {/* On mobile, move search bar below */}
        {isMobile && (
          <Box sx={{ py: 2, width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
        )}
      </AppBar>

      {/* Auth Drawer */}
      <AuthDrawer
        open={authDrawerOpen}
        onClose={() => setAuthDrawerOpen(false)}
      />
    </>
  );
};

export default Navbar;
