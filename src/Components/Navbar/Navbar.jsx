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
import { useAuth } from "../../context/AuthContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdSearch, MdClose } from "react-icons/md";
import Slide from "@mui/material/Slide";

// Styled search components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "60ch",
  },
  // 👇 override for mobile
  [theme.breakpoints.down("sm")]: {
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
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
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 0, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    height: "100%",
    fontSize: 16,
    width: "100%",
  },
}));

const Navbar = ({ loggedIn, onMenuToggle }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [authDrawerOpen, setAuthDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const theme = useTheme();
  const { logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const toggleDropdown = () => setOpenDropdown((prev) => !prev);
  const closeDropdown = () => setOpenDropdown(false);

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          paddingX: { xs: 2, md: 5 },
          backgroundColor: "white",
          color: theme.palette.primary.main,
          boxShadow: 0,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
            px: { xs: 0, sm: 2 },
          }}
        >
          <Stack
            direction={"row"}
            alignItems="center"
            pl={1}
            gap={{ xs: 0, sm: 5 }}
          >
            <IconButton
              edge="start"
              onClick={onMenuToggle}
              sx={{ color: "primary.main" }}
            >
              <MenuIcon />
            </IconButton>
            {/* Logo */}
            <Box
              component="img"
              src="/assets/sheyahe.png"
              alt="Unscript Logo"
              sx={{ height: 60, cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </Stack>

          {/* Search Bar (desktop only) */}
          {!isMobile && (
            <Search sx={{ borderColor: "primary.main" }}>
              <SearchIconWrapper>
                <SearchIcon style={{ color: theme.palette.primary.main }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search for products"
                inputProps={{ "aria-label": "search" }}
                sx={{ color: "primary.main" }}
              />
            </Search>
          )}

          {/* Right Side Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1.5, sm: 5 },
            }}
          >
            {/* Search Icon (Mobile only) */}
            {isMobile && (
              <IconButton
                onClick={() => setMobileSearchOpen((prev) => !prev)}
                sx={{ color: "primary.main" }}
              >
                <MdSearch size={22} />
              </IconButton>
            )}

            {/* Account */}
            <ClickAwayListener onClickAway={closeDropdown}>
              <Box sx={{ position: "relative" }}>
                {loggedIn ? (
                  <>
                    {isMobile ? (
                      <IconButton
                        color="inherit"
                        onClick={() => navigate("/account")}
                      >
                        <BiUser size={24} />
                      </IconButton>
                    ) : (
                      <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<BiUser size={22} />}
                        onClick={() => navigate("/account")}
                        sx={{
                          textTransform: "none",
                          borderColor: "primary.main",
                          color: "primary.main",
                          "&:hover": {
                            borderColor: "secondary.main",
                            color: "secondary.main",
                          },
                          transition: "color 0.2s, border-color 0.2s",
                        }}
                      >
                        Account
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      onClick={() => setAuthDrawerOpen(true)}
                      size="medium"
                      sx={{
                        display: { xs: "none", sm: "block" },
                      }}
                    >
                      Login / SignUp
                    </Button>
                    <Button
                      variant="contained"
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

            {/* Cart */}
            <IconButton
              sx={{ color: "primary.main" }}
              onClick={() => navigate("/cart")}
            >
              <BsHandbag />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer to prevent content overlap */}
      <Box sx={{ height: { xs: 56, sm: 64 } }} />

      {/* Mobile Search Slide */}
      {isMobile && (
        <Slide
          direction="down"
          in={mobileSearchOpen}
          mountOnEnter
          unmountOnExit
        >
          <Box
            sx={{
              position: "fixed",
              top: { xs: 60 }, // directly below AppBar
              left: 0,
              right: 0,
              bgcolor: "white",
              px: 2,
              py: 1.5,
              zIndex: (theme) => theme.zIndex.appBar - 1,
              boxShadow: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Search Input */}
            <Box sx={{ flexGrow: 1 }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search products..." autoFocus />
              </Search>
            </Box>

            {/* X (Close) Icon */}
            <IconButton
              onClick={() => setMobileSearchOpen(false)}
              sx={{ ml: 1, color: "primary.main" }}
            >
              <MdClose size={22} />
            </IconButton>
          </Box>
        </Slide>
      )}

      {/* Auth Drawer */}
      <AuthDrawer
        open={authDrawerOpen}
        onClose={() => setAuthDrawerOpen(false)}
      />
    </>
  );
};

export default Navbar;