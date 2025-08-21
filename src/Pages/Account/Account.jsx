import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { FaHeart } from "react-icons/fa";
import { FcPackage } from "react-icons/fc";
import { useAuth } from "../../context/AuthContext";

const dummyAddresses = [
  {
    id: 1,
    name: "Ankit Mishra",
    area: "Patia",
    landmark: "Infocity Square",
    pin: "751024",
    state: "Odisha",
    city: "Bhubaneswar",
    country: "India",
    house: "11th Floor, SRB Tower",
  },
  {
    id: 2,
    name: "Rohit Sharma",
    area: "Andheri East",
    landmark: "Near Marol Naka Metro",
    pin: "400059",
    state: "Maharashtra",
    city: "Mumbai",
    country: "India",
    house: "Flat 502, Green View Apartments",
  },
  {
    id: 3,
    name: "Priya Singh",
    area: "Salt Lake",
    landmark: "Sector 5, Near Technopolis",
    pin: "700091",
    state: "West Bengal",
    city: "Kolkata",
    country: "India",
    house: "Block C, 3rd Floor, Sunshine Residency",
  },
];

const Account = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserInfo(decoded);
        console.log(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }

    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const firstName = userInfo?.name?.split(" ")[0] || "User";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box
      sx={{
        px: { xs: 0, sm: 5, md: 35 },
        py: 5,
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, md: 4 },
      }}
    >
      {/* Greeting + Logout */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant={{ xs: "body1", md: "h5" }} fontWeight="bold">
          {greeting}, {firstName}
        </Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>

      {/* Main Options */}
      <Grid container spacing={2}>
        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary.main">
                Personal Info
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {userInfo ? (
                <Stack spacing={1}>
                  {[
                    { label: "Name", value: userInfo.name || "N/A" },
                    { label: "Email", value: userInfo.email || "N/A" },
                    { label: "Mobile", value: userInfo.phone || "N/A" },
                  ].map((item, idx) => (
                    <Stack key={idx} direction="row" spacing={2}>
                      <Typography
                        variant="body1"
                        sx={{ minWidth: 80, fontWeight: "bold" }}
                      >
                        {item.label}:
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {item.value}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No personal information available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={6}>
          <Card
            onClick={() => navigate("wishlist")}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              height: "100%",
              display: { xs: "none", sm: "block" },
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* <FavoriteBorderIcon color="primary" fontSize="medium" /> */}
              <FaHeart style={{ color: "red" }} size={25} />
              <Box>
                <Typography variant="body1">Wishlist</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  View and manage your saved items.
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={() => navigate("wishlist")}
            startIcon={<FaHeart style={{ color: "red" }} />}
            sx={{ display: { xs: "flex", sm: "none" }, height: "100%" }}
          >
            Wishlist
          </Button>
        </Grid>

        <Grid size={6}>
          <Card
            onClick={() => navigate("orders")}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              bgcolor: "#FFF9C4",
              display: { xs: "none", sm: "block" },
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FcPackage size={30} />
              <Box>
                <Typography variant="body1">Orders</Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  display={{ xs: "none", sm: "block" }}
                >
                  Track, return, cancel or reorder past purchases.
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<FcPackage />}
            onClick={() => navigate("orders")}
            sx={{
              display: { xs: "flex", sm: "none" },
              height: "100%",
              bgcolor: "#FFF9C4",
              color: "black",
            }}
          >
            Orders
          </Button>
        </Grid>

        {/* Saved Addresses Preview */}
        <Grid size={12}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" gutterBottom>
                  Saved Addresses
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("address");
                  }}
                >
                  Manage
                </Button>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                {dummyAddresses.map((addr) => (
                  <Grid size={{ xs: 12, md: 6 }} key={addr.id}>
                    <Typography variant="body1" color="primary.main">
                      {addr.name}
                    </Typography>
                    <Typography variant="subtitle2">
                      {" "}
                      {[
                        addr.house,
                        addr.area,
                        addr.landmark,
                        addr.city,
                        addr.state,
                        addr.pin,
                        addr.country,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Account;
