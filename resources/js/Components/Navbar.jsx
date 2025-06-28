import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Badge,
  InputBase,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart,
  Person,
  Home,
  Category,
  Info,
  Phone,
  Close as CloseIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import axios from "axios";

const LogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "none",
  },
}));

const LogoIcon = styled(Box)(({ theme }) => ({
  width: 52,
  height: 32,
  backgroundColor: "#000",
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "bold",
  fontSize: "12px",
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "#000",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "16px",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#000",
  },
}));

const SellButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  fontWeight: 500,
  textTransform: "none",
  fontSize: "16px",
  border: "1px solid #e0e0e0",
  borderRadius: 4,
  padding: "8px 20px",
  backgroundColor: "#000",
  "&:hover": {
    borderColor: "#d0d0d0",
  },
}));

const PromoBanner = styled(Box)(({ theme }) => ({
  backgroundColor: "#000",
  color: "white",
  padding: theme.spacing(1, 2),
  textAlign: "center",
  fontSize: "14px",
  position: "relative",
}));

const Navbar = ({ isLogin }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Home", icon: <Home />, href: "/" },
    { text: "Products", icon: <Category />, href: "/products" },
    { text: "About", icon: <Info />, href: "#about" },
    { text: "Contact", icon: <Phone />, href: "#contact" },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component="a" href={item.href}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem>
          <SellButton fullWidth>Sell Your Product</SellButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Promotional Banner */}
      <Collapse in={showBanner}>
        <PromoBanner>
          <Typography variant="body2" component="span">
            Sign up and get 20% off to your first order{" "}
            <Button
              color="inherit"
              sx={{
                textDecoration: "underline",
                fontWeight: "bold",
                textTransform: "none",
                minWidth: "auto",
                p: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Sign Up Now
            </Button>
          </Typography>
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              "&:hover": {
                backgroundColor: alpha("#fff", 0.1),
              },
            }}
            onClick={() => setShowBanner(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </PromoBanner>
      </Collapse>

      {/* Main Navbar */}
      <AppBar
        position="relative"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar sx={{ minHeight: "64px !important" }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <LogoBox component="a" href="/">
            <LogoIcon>Logo</LogoIcon>
          </LogoBox>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", ml: 6, gap: 4 }}>
              <NavButton>Products</NavButton>
              <SellButton>Sell Your Product</SellButton>
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* Right Side Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton color="inherit">
              <ShoppingCart sx={{ color: "#000" }} />
            </IconButton>
            {isLogin ? (
              <IconButton color="inherit" sx={{ ml: 1 }}>
                <Person sx={{ color: "#000" }} />
              </IconButton>
            ) : (
              <NavLink
                to="/login"
                style={{
                  display: "inline-block",
                  background: "#000",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "8px 20px",
                  borderRadius: 4,
                  fontWeight: 500,
                  textTransform: "none",
                  fontSize: "16px",
                  transition: "background 0.2s",
                  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#333")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#000")}
              >
                Login
              </NavLink>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
