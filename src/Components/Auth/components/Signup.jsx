import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";

export default function Signup({ onLoginClick, onSignupSuccess }) {
  const [form, setForm] = useState({
    name: "",
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // validation...
    onSignupSuccess();
  };

  return (
    <Stack alignItems="center">
      <Typography variant="h5" gutterBottom>
        Create Account
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

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

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Continue
      </Button>

      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Button onClick={onLoginClick}>
          Login
        </Button>
      </Typography>
    </Stack>
  );
}
