import React from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

// ✅ Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
});

const Signup = ({ onLoginClick, onSignupSuccess, setEmail }) => {
  const { setLoading } = useAuth();
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://diva-trends-server.onrender.com/api/auth/register/send-otp",
          {
            name: values.name,
            email: values.email,
            phone: values.phone,
          }
        );
        setEmail(values.email);
        console.log("Signup Response:", response.data);
        onSignupSuccess();
      } catch (error) {
        console.error("Signup Error:", error.response?.data || error.message);
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack alignItems="center">
        <Typography variant="h5" gutterBottom>
          Create Account
        </Typography>

        {/* Name */}
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        {/* Email */}
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {/* Phone */}
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />

        {/* Submit */}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Processing..." : "Continue"}
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button onClick={onLoginClick}>Login</Button>
        </Typography>
      </Stack>
    </form>
  );
};

export default Signup;
