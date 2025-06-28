"use client";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useState, useEffect } from "react";

export default function ProductCard({
  product,
  onAddToCart,
  cartQuantity = 0,
}) {
  const [quantity, setQuantity] = useState(cartQuantity);

  useEffect(() => {
    setQuantity(cartQuantity);
  }, [cartQuantity]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 0 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
      if (onAddToCart) {
        onAddToCart(product, newQuantity);
      }
    }
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="200"
        image={product.cover || "/placeholder.svg?height=200&width=200"}
        alt={product.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{ fontSize: "1rem", fontWeight: 600 }}
        >
          {product.name}
        </Typography>
        <Chip
          label={product.category}
          size="small"
          sx={{ mb: 1, fontSize: "0.75rem" }}
          color="primary"
          variant="outlined"
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          ${product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Stock: {product.stock}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 0}
              sx={{ border: "1px solid #e0e0e0" }}
            >
              <Remove fontSize="small" />
            </IconButton>
            <Typography sx={{ minWidth: "20px", textAlign: "center" }}>
              {quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= product.stock}
              sx={{ border: "1px solid #e0e0e0" }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
