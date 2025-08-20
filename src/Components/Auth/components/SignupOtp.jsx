import React, { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { baseUrl } from "../../../Config/Config";
import CustomOtpInput from "./CustomOtpInput";

// ✅ Validation schema
const validationSchema = Yup.object({
  otp: Yup.string()
    .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
    .required("OTP is required"),
});

const SignupOtp = ({ onVerify, setStep, email }) => {
  const [timer, setTimer] = useState(30);
  const { setLoading, login } = useAuth();

  // countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${baseUrl}/api/auth/register/verify-otp`,
          {
            email,
            otp: values.otp,
          }
        );
        console.log("OTP Verified ✅", response.data);
        login(response.data.token);

        onVerify(response.data);
      } catch (error) {
        console.error(
          "OTP Verify Error:",
          error.response?.data || error.message
        );
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const handleResend = () => {
    setTimer(30); // restart timer
    // TODO: call resend OTP API if available
    console.log("Resend OTP triggered");
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack alignItems="center" spacing={2}>
        <Typography variant="h5" gutterBottom>
          Enter OTP
        </Typography>
        <Typography align="center">
          A 6-digit OTP has been sent to your registered email or mobile number.
          Please enter it below to continue.
        </Typography>

        {/* <MuiOtpInput
          value={formik.values.otp}
          onChange={(value) => formik.setFieldValue("otp", value)}
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
          width="100%"
        /> */}
        <CustomOtpInput
          value={formik.values.otp}
          onChange={(val) => formik.setFieldValue("otp", val)}
          length={6}
        />

        {formik.touched.otp && formik.errors.otp && (
          <Typography variant="body2" color="error">
            {formik.errors.otp}
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
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Verifying..." : "Verify & Create Account"}
        </Button>

        <Button
          fullWidth
          sx={{ textTransform: "none", mt: 2 }}
          onClick={() => setStep("signup")}
        >
          Go Back
        </Button>
      </Stack>
    </form>
  );
};

export default SignupOtp;
