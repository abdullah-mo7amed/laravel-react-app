"use client";

import {
  Box,
  Typography,
  Card,
  Button,
  Divider,
  Grid,
  Avatar,
  IconButton,
  Stack,
  Container,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";

export default function Checkout({ cartItems = [], setCartItems, isLogin }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 15.0 : 0;
  const tax = cartItems.length > 0 ? 12.5 : 0;
  const total = subtotal + shipping + tax;

  const refreshCart = () => {
    if (!isLogin) return;
    axios
      .get("/api/cart")
      .then((res) => setCartItems(res.data.data || []))
      .catch(() => setCartItems([]));
  };

  const handleUpdateQuantity = (product, quantity) => {
    if (!isLogin) {
      setSnackbar({
        open: true,
        message: "You must be logged in to add to cart.",
        severity: "warning",
      });
      return;
    }
    if (quantity > product.stock) {
      setSnackbar({
        open: true,
        message: `Only ${product.stock} in stock.`,
        severity: "error",
      });
      return;
    }
    axios
      .post("/api/cart/update", { id: product.id, quantity })
      .then(() => {
        setSnackbar({
          open: true,
          message: "Added to cart!",
          severity: "success",
        });
        refreshCart();
      })
      .catch((err) => {
        setSnackbar({
          open: true,
          message: err.response?.data?.message || "Error adding to cart",
          severity: "error",
        });
      });
  };

  const handleRemoveItem = (id) => {
    axios
      .post("/api/cart/remove", { id })
      .then(() => {
        setSnackbar({
          open: true,
          message: "Item removed from cart",
          severity: "info",
        });
        refreshCart();
      })
      .catch(() => refreshCart());
  };

  const handlePlaceOrder = async () => {
    try {
      const res = await axios.post("/api/place-order");
      setSnackbar({
        open: true,
        message: res.data.message || "Order placed! Check your email.",
        severity: "success",
      });
      refreshCart();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Error placing order.",
        severity: "error",
      });
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4, bgcolor: "#f8f9fa", minHeight: "100vh" }}
    >
      {/* Breadcrumb */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Home / Casual
        </Typography>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Your cart
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Cart Items Section */}
        <Grid item size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            {cartItems.length > 0 ? (
              cartItems.map((item, idx) => (
                <Card
                  key={item.id}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    bgcolor: "white",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    {/* Product Image */}
                    <Avatar
                      src={item.cover}
                      alt={item.name}
                      variant="rounded"
                      sx={{
                        width: 120,
                        height: 120,
                        bgcolor: "#f5f5f5",
                        border: "1px solid #e0e0e0",
                      }}
                    />

                    {/* Product Details */}
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {item.name}
                        </Typography>
                        <Chip
                          label="T-shirts"
                          size="small"
                          sx={{
                            bgcolor: "#f0f0f0",
                            color: "#666",
                            fontSize: "0.75rem",
                            height: 24,
                          }}
                        />
                      </Box>

                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        ${item.price}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        Stock: {item.stock || 25}
                      </Typography>

                      {/* Quantity Controls */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleUpdateQuantity(item, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          sx={{
                            width: 36,
                            height: 36,
                            border: "1px solid #ddd",
                            borderRadius: 1,
                            "&:hover": { bgcolor: "#f5f5f5" },
                          }}
                        >
                          <Remove fontSize="small" />
                        </IconButton>

                        <Typography
                          variant="body1"
                          sx={{
                            minWidth: 40,
                            textAlign: "center",
                            fontWeight: 500,
                            px: 1,
                          }}
                        >
                          {item.quantity}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() =>
                            handleUpdateQuantity(item, item.quantity + 1)
                          }
                          sx={{
                            width: 36,
                            height: 36,
                            border: "1px solid #ddd",
                            borderRadius: 1,
                            "&:hover": { bgcolor: "#f5f5f5" },
                          }}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Delete Button */}
                    <IconButton
                      onClick={() => handleRemoveItem(item.id)}
                      sx={{
                        color: "#ff4444",
                        width: 40,
                        height: 40,
                        "&:hover": {
                          bgcolor: "#ffebee",
                        },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Card>
              ))
            ) : (
              <Card sx={{ p: 4, textAlign: "center", bgcolor: "white" }}>
                <Typography variant="body1" color="text.secondary">
                  Your cart is empty.
                </Typography>
              </Card>
            )}
          </Stack>
        </Grid>

        {/* Order Summary Section */}
        <Grid item size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              bgcolor: "white",
              position: "sticky",
              top: 20,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Order Summary ( #123 )
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{ fontWeight: 500 }}
              >
                5 May 2025
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Price Breakdown */}
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ${subtotal.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ${shipping.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">Tax</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ${tax.toFixed(2)}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            {/* Total */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Total
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                ${total.toFixed(2)}
              </Typography>
            </Box>

            {/* Place Order Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#000",
                color: "white",
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#333",
                },
              }}
              disabled={cartItems.length === 0}
              onClick={handlePlaceOrder}
            >
              Place the order
            </Button>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
