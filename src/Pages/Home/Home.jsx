import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Stack, IconButton } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const BASE_URL = "https://diva-trends-server.onrender.com";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef(null);
  const { setLoading } = useAuth();

  // Fetch banners without caching
  useEffect(() => {
  setLoading(true);
  axios
    .get(`${BASE_URL}/api/banners`)
    .then((res) => {
      setBanners(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to fetch banners:", err);
      setLoading(false);
    });
}, []);


  // Slide effect
  useEffect(() => {
    if (banners.length === 0) return;

    slideInterval.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(slideInterval.current);
  }, [banners]);

  if (banners.length === 0) return null;

  const HEADER_HEIGHT = 64; 

  return (
    <Box sx={{ position: "relative", overflow: "hidden", width: "100%", maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`, py: {xs:2, sm: 0} }}>
      {/* Slider wrapper */}
      <Stack
        direction="row"
        sx={{
          width: `${banners.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / banners.length)}%)`,
          transition: "transform 0.5s ease-in-out",
          height: "100%",
        }}
      >
        {banners.map((banner) => (
          <Box
            key={banner.id}
            component="a"
            // href={banner.redirectUrl || "#"}
            sx={{
              width: `${100 / banners.length}%`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={banner.imageUrl}
              alt={banner.title || "Banner"}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ))}
      </Stack>

      {/* Dots */}
      
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          display:{xs: "none", sm: "flex"},
        }}
      >
        {banners.map((_, idx) => (
          <IconButton
            key={idx}
            size="small"
            onClick={() => setCurrentIndex(idx)}
            sx={{
              width: 30,
              height: 10,
              borderRadius: "10px",
              bgcolor: idx === currentIndex ? "primary.main" : "white",
              "&:hover": { bgcolor: "grey.600" },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Home;
