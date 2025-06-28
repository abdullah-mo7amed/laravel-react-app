import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await axios.post("/api/login", { email, password });
      window.location.href = "/";
    } catch (error) {
      setErrors({ password: "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Welcome back
          </Typography>
          <Typography align="center" color="text.secondary" sx={{ mb: 3 }}>
            Please enter your details to sign in
          </Typography>
          <form onSubmit={handleSubmit}>
            <Typography sx={{ fontWeight: 500, mb: 0.5 }}>Email</Typography>
            <TextField
              fullWidth
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
              variant="outlined"
              size="medium"
              InputProps={{ style: { borderRadius: 8 } }}
            />
            <Typography sx={{ fontWeight: 500, mb: 0.5 }}>Password</Typography>
            <TextField
              fullWidth
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ mb: 3 }}
              variant="outlined"
              size="medium"
              InputProps={{
                style: { borderRadius: 8 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      tabIndex={-1}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: "#000",
                color: "#fff",
                borderRadius: 2,
                fontWeight: 600,
                fontSize: "1.1rem",
                py: 1.5,
                boxShadow: "none",
                mt: 1,
                "&:hover": { bgcolor: "#222" },
              }}
            >
              Login
            </Button>
          </form>
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: "#f0f7ff",
              borderRadius: 2,
              width: "100%",
            }}
          >
            <Typography
              variant="caption"
              color="primary"
              sx={{ fontWeight: 600 }}
            >
              Demo Credentials:
            </Typography>
            <Typography variant="caption" display="block">
              Email: test@example.com
            </Typography>
            <Typography variant="caption" display="block">
              Password: password
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
