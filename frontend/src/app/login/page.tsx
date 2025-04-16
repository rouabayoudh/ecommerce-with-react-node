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
  username: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const paperStyle = {
    padding: 20,
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e", marginBottom: 16 };
  const btnstyle = { margin: "8px 0" };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Grid
      container
      style={{ minHeight: "100vh" }}
      alignItems="center"
      justifyContent="center"
    >
      <Paper elevation={10} style={paperStyle}>
        <Stack direction="column" alignItems="center" spacing={2}>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Sign In
          </Typography>
        </Stack>
        <Box mt={2} component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Username"
            placeholder="Username"
            fullWidth
            margin="normal"
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label="Password"
            placeholder="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "the password must at least have 8 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <FormControlLabel
            control={<Checkbox color="primary" {...register("rememberMe")} />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign In
          </Button>
          <Typography style={{ marginTop: 16 }}>
            <Link href="./reset-password">Forgot Password?</Link>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Login;
