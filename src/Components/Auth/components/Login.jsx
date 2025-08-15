import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";

export default function Login({ onSignupClick, onLoginSuccess }) {
  const [form, setForm] = useState({ emailOrPhone: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Remember Me:", rememberMe);
    onLoginSuccess();
  };

  return (
    <Stack alignItems="center">
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        label="Email or Mobile"
        name="emailOrPhone"
        value={form.emailOrPhone}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        type="password"
        variant="outlined"
        margin="normal"
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mt: 1,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          }
          label="Remember Me"
        />
        <Button
        >
          Forgot Password?
        </Button>
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Continue
      </Button>

      <Typography variant="body2" sx={{ mt: 2 }}>
        New here?{" "}
        <Button onClick={onSignupClick} sx={{ textTransform: "none" }}>
          Create an Account
        </Button>
      </Typography>
    </Stack>
  );
}
