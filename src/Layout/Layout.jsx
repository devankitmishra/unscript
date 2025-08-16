import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Navbar from "../Components/Navbar/Navbar";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {/* Pass actual loggedIn status to Navbar */}
      <Navbar loggedIn={isAuthenticated} />

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
          {children} {/* This will render page-specific content */}
        </Box>
      </Container>
    </>
  );
};

export default Layout;
