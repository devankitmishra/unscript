import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Login from "./components/Login";
import Signup from "./components/Signup";
import LoginOtp from "./components/LoginOtp";
import SignupOtp from "./components/SignupOtp";

const AuthDrawer = ({ open, onClose }) => {
  const [step, setStep] = useState("login");

  const goTo = (nextStep) => setStep(nextStep);

  const handleOtpVerified = () => {
    setStep("login");
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 500 },
        },
      }}
    >
      {/* Close Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Drawer Content */}
      <Box sx={{ px: 3, pb: 4 }}>
        {step === "login" && (
          <Login
            onSignupClick={() => goTo("signup")}
            onLoginSuccess={() => goTo("loginOtp")}
          />
        )}

        {step === "signup" && (
          <Signup
            onLoginClick={() => goTo("login")}
            onSignupSuccess={() => goTo("signupOtp")}
          />
        )}

        {step === "loginOtp" && <LoginOtp onVerify={handleOtpVerified} setStep={setStep}/>}
        {step === "signupOtp" && <SignupOtp onVerify={handleOtpVerified} setStep={setStep} />}
      </Box>
    </Drawer>
  );
};

export default AuthDrawer;
