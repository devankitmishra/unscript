import React, { useRef } from "react";
import { TextField, Box } from "@mui/material";

const CustomOtpInput = ({
  value = "",
  onChange,
  length = 6,
  size = 50, // 🔥 control square size here
}) => {
  const inputsRef = useRef([]);

  const handleChange = (e, i) => {
    const val = e.target.value;

    if (/^[0-9]$/.test(val)) {
      const newValue = value.split("");
      newValue[i] = val;
      onChange(newValue.join(""));

      if (i < length - 1) {
        inputsRef.current[i + 1]?.focus();
      }
    } else if (val === "") {
      const newValue = value.split("");
      newValue[i] = "";
      onChange(newValue.join(""));
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace") {
      if (value[i]) {
        const newValue = value.split("");
        newValue[i] = "";
        onChange(newValue.join(""));
        e.preventDefault();
      } else if (i > 0) {
        inputsRef.current[i - 1]?.focus();
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 1,
        mt: 2,
      }}
    >
      {Array.from({ length }).map((_, i) => (
        <TextField
          key={i}
          value={value[i] || ""}
          inputRef={(el) => (inputsRef.current[i] = el)}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          inputProps={{
            maxLength: 1,
            inputMode: "numeric",
            pattern: "[0-9]*",
            autoComplete: "one-time-code",
            style: {
              textAlign: "center",
              fontSize: "1.5rem",
              width: size,
              height: size,
              border: "none",
              padding: 0,
            },
          }}
        />
      ))}
    </Box>
  );
};

export default CustomOtpInput;
