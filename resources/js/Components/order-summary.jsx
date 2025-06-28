import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  IconButton,
  Avatar,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function OrderSummary({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 15.0 : 0;
  const tax = cartItems.length > 0 ? 12.5 : 0;
  const total = subtotal + shipping + tax;
  const navigate = useNavigate();
  return (
    <Card
      sx={{ position: "sticky", top: 20, height: "fit-content", boxShadow: 1 }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Order Summary
        </Typography>

        {/* Cart Items */}
        <Box sx={{ mb: 3 }}>
          {cartItems.length === 0 ? (
            <Typography color="text.secondary" align="center" sx={{ my: 4 }}>
              Your cart is empty.
            </Typography>
          ) : (
            cartItems.map((item, index) => (
              <Box
                key={`${item.id}-${index}`}
                sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}
              >
                <Avatar
                  src={item.cover || "/placeholder.svg?height=60&width=60"}
                  alt={item.name}
                  sx={{ width: 60, height: 60 }}
                  variant="rounded"
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                    {item.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      sx={{
                        width: 28,
                        height: 28,
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{
                        minWidth: 24,
                        textAlign: "center",
                        fontWeight: 500,
                      }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      sx={{
                        width: 28,
                        height: 28,
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                    ${(item.price * item.quantity).toFixed(0)}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => onRemoveItem(item.id)}
                    sx={{
                      color: "error.main",
                      width: 24,
                      height: 24,
                      "&:hover": {
                        bgcolor: "error.main",
                        color: "white",
                      },
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))
          )}
        </Box>

        {cartItems.length > 0 && (
          <>
            <Divider sx={{ mb: 3 }} />

            {/* Order Totals */}
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  ${subtotal.toFixed(0)}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  ${shipping.toFixed(2)}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography variant="body1">Tax</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  ${tax.toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/checkout")}
              sx={{
                bgcolor: "black",
                color: "white",
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#333",
                },
              }}
            >
              Proceed to Checkout
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
