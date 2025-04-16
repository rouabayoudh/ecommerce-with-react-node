"use client";
import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  newPassword: string;
  confirmPassword: string;
  rememberMe: boolean;
}

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  //handling the submission
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const paperStyle = {
    padding: 20,
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e", marginBottom: 16 };
  const btnstyle = { margin: "8px 0" };

  // Watch the value of newPassword so we can compare it in confirmPassword validation
  const newPassword = watch("newPassword");

  return (
    <Grid
      container
      style={{ minHeight: "100vh" }}
      alignItems="center"
      justifyContent="center"
    >
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              Reset Password
            </Typography>
          </Stack>
          <Box mt={2}>
            <TextField
              label="New Password"
              placeholder="New Password"
              type="password"
              fullWidth
              required
              margin="normal"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "the password must at least have 8 characters",
                },
              })}
              error={!!errors.newPassword}
              helperText={errors.newPassword ? errors.newPassword.message : ""}
            />
            <TextField
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              fullWidth
              required
              margin="normal"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
            />
            <FormControlLabel
              control={<Checkbox {...register("rememberMe")} color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Reset Your Password
            </Button>
            <Typography style={{ marginTop: 16 }}>
              <Link href="./login">Remember Password?</Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
};

export default ResetPassword;
