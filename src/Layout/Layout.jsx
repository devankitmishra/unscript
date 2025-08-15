import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Navbar from "../Components/Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar loggedIn={true} /> {/* Pass true if the user is logged in */}
      <Container maxWidth="lg">
        <Box sx={{ paddingY: 3 }}>
          {children} {/* This will render page-specific content */}
        </Box>
      </Container>
    </>
  );
}
