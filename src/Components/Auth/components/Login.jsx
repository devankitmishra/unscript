import React from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const Login = ({ onSignupClick, onLoginSuccess, setEmail }) => {

  const { setLoading } = useAuth();
  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://diva-trends-server.onrender.com/api/auth/login/send-otp",
        {
          email: values.email,
        }
      );
      console.log("API Response:", response.data);
      setEmail(values.email);
      onLoginSuccess();
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack alignItems="center">
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, handleChange, handleBlur, isSubmitting, errors, touched }) => (
          <Form style={{ width: "100%" }}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              type="submit"
              disabled={isSubmitting}
            >
              Continue
            </Button>

            <Typography variant="body2" sx={{ mt: 2 }}>
              New here?{" "}
              <Button onClick={onSignupClick} sx={{ textTransform: "none" }}>
                Create an Account
              </Button>
            </Typography>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default Login;
