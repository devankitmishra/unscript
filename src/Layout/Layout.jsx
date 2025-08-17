import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Navbar from "../Components/Navbar/Navbar";
import SideNav from "../Components/SideNav/SideNav";
import { useAuth } from "../context/AuthContext";


const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar loggedIn={isAuthenticated} onMenuToggle={handleDrawerToggle} />
      <SideNav mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
      <Box sx={{ display: "flex" }}>
        <Container
          maxWidth={false}
          sx={{
            // paddingLeft: 0,
            // paddingRight: 0,
            "@media (min-width:600px)": {
              paddingLeft: 0,
              paddingRight: 0,
            },
          }}
        >
          <Box>
            {children}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Layout;
