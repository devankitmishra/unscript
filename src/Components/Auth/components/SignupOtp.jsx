import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";

export default function SignupOtp({ onVerify, setStep }) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value) => setOtp(value);

  const handleSubmit = () => {
    // verify OTP logic
    onVerify();
  };

  const handleResend = () => {
    setTimer(30); // restart timer
    alert("Resend OTP functionality not implemented yet");
  };

  return (
    <Stack alignItems="center" spacing={2}>
      <Typography variant="h5" gutterBottom>
        Enter OTP
      </Typography>
      <Typography>
        A 6-digit OTP has been sent to your registered email or mobile number.
        Please enter it below to continue.
      </Typography>
      <MuiOtpInput
        value={otp}
        onChange={handleChange}
        length={6}
        sx={{ mt: 2 }}
        width={"100%"}
      />

      <Typography variant="body2" sx={{ mt: 2 }}>
        {timer > 0
          ? `You can resend OTP after ${timer} sec`
          : "You can now resend the OTP"}
      </Typography>

      <Button
        fullWidth
        variant="outlined"
        onClick={handleResend}
        sx={{ textTransform: "none", mt: 2 }}
        disabled={timer > 0}
      >
        Resend OTP
      </Button>

      <Button
        fullWidth
        variant="contained"
        sx={{ textTransform: "none", mt: 2 }}
        onClick={handleSubmit}
      >
        Verify & Create Account
      </Button>
      <Button
        fullWidth
        sx={{ textTransform: "none", mt: 2 }}
        onClick={() => {
          setStep("signup");
        }}
      >
        Go Back
      </Button>
    </Stack>
  );
}
