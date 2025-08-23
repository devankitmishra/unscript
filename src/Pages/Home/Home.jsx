import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Stack, IconButton } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { baseUrl } from "../../Config/Config";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const slideInterval = useRef(null);
  const { setLoading } = useAuth();

  // Fetch banners
  useEffect(() => {
    const cached = sessionStorage.getItem("banners");

    if (cached) {
      setBanners(JSON.parse(cached));
      return; // ✅ use cache if available
    }

    setLoading(true);
    axios
      .get(`${baseUrl}/api/banners`)
      .then((res) => {
        setBanners(res.data);
        sessionStorage.setItem("banners", JSON.stringify(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch banners:", err);
        setLoading(false);
      });
  }, []);

  // Auto slide
  useEffect(() => {
    if (banners.length === 0) return;

    const startSlider = () => {
      slideInterval.current = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(true);
      }, 3000);
    };

    const stopSlider = () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };

    // Pause when tab is inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopSlider();
      } else {
        stopSlider();
        startSlider();
      }
    };

    startSlider();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopSlider();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [banners]);

  if (banners.length === 0) return null;

  const HEADER_HEIGHT = 64;

  const handleTransitionEnd = () => {
    if (currentIndex === banners.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    } else if (currentIndex > banners.length) {
      // Extra safeguard if index overshoots
      setIsTransitioning(false);
      setCurrentIndex(currentIndex % banners.length);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        py: { xs: 2.5, sm: 0 },
      }}
    >
      {/* Slider wrapper */}
      <Stack
        direction="row"
        onTransitionEnd={handleTransitionEnd}
        sx={{
          width: `${(banners.length + 1) * 100}%`,
          transform: `translateX(-${
            currentIndex * (100 / (banners.length + 1))
          }%)`,
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
          height: "100%",
        }}
      >
        {banners.map((banner) => (
          <Box
            key={banner.id}
            component="a"
            sx={{
              width: `${100 / (banners.length + 1)}%`,
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

        {/* Clone first banner for smooth loop */}
        <Box
          component="a"
          sx={{
            width: `${100 / (banners.length + 1)}%`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={banners[0]?.imageUrl}
            alt={banners[0]?.title || "Banner"}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
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
          display: { xs: "none", sm: "flex" },
        }}
      >
        {banners.map((_, idx) => (
          <IconButton
            key={idx}
            size="small"
            disableRipple
            sx={{
              width: 50,
              height: 3,
              borderRadius: "20px",
              p: 0,
              minWidth: 0,
              minHeight: 0,
              bgcolor:
                idx === currentIndex % banners.length
                  ? "primary.main"
                  : "white",
              cursor: "default",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Home;
