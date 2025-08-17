import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Button, Stack, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useAuth } from "../../../context/AuthContext";
import { baseUrl } from "../../../Config/Config";

// Validation schema for OTP
const OtpSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});

const LoginOtp = ({ email, onVerify, setStep }) => {
  const [timer, setTimer] = useState(30);
  const { login, setLoading } = useAuth();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = () => {
    setTimer(30); // restart timer
    alert("Resend OTP functionality not implemented yet");
  };

  const handleOtpSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${baseUrl}/api/auth/login/verify-otp`,
        {
          email,
          otp: Number(values.otp),
        }
      );
      console.log("API Response:", response.data);
      login(response.data.token);
      onVerify(); // call parent callback
    } catch (error) {
      console.error("OTP verification error:", error);
      setErrors({ otp: "Invalid OTP, please try again" });
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
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

      <Formik
        initialValues={{ otp: "" }}
        validationSchema={OtpSchema}
        onSubmit={handleOtpSubmit}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Form style={{ width: "100%" }}>
            <MuiOtpInput
              value={values.otp}
              onChange={(val) => setFieldValue("otp", val)}
              length={6}
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center", // center OTP in screen
                gap: 1, // spacing between boxes
                "& input": {
                  width: { xs: 40, sm: 50 }, // responsive square size
                  height: { xs: 20, sm: 30 },
                  textAlign: "center",
                  fontSize: "1.25rem",
                },
              }}
            />

            {touched.otp && errors.otp && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errors.otp}
              </Typography>
            )}

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
              type="submit"
              disabled={isSubmitting}
            >
              Verify & Login
            </Button>

            <Button
              fullWidth
              sx={{ textTransform: "none", mt: 2 }}
              onClick={() => setStep("login")}
            >
              Go Back
            </Button>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default LoginOtp;
