import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Pagination,
  Drawer,
  Button,
  Breadcrumbs,
  Link,
  IconButton,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Search, FilterList, Sort } from "@mui/icons-material";
import ProductCard from "../Components/product-card";
import FilterSidebar from "../Components/filter-sidebar";
import OrderSummary from "../Components/order-summary";
import axios from "axios";

export default function Products({ cartItems, setCartItems, isLogin }) {
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(true);
  const [productError, setProductError] = useState("");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    setCategoriesLoading(true);
    axios
      .get("/api/categories")
      .then((res) => {
        setCategories(res.data.data || []);
        setCategoriesLoading(false);
      })
      .catch(() => setCategoriesLoading(false));
  }, []);

  useEffect(() => {
    setProductLoading(true);
    setProductError("");
    axios
      .get("/api/products", {
        params: {
          search,
          min_price: priceRange[0],
          max_price: priceRange[1],
          category: selectedCategories[0] || "",
          page,
        },
      })
      .then((res) => {
        setProducts(res.data.data || []);
        setTotalPages(res.data.last_page || 1);
        setProductLoading(false);
      })
      .catch(() => {
        setProductError("Failed to load products");
        setProductLoading(false);
      });
  }, [search, priceRange, selectedCategories, page]);

  const handleApplyFilters = () => {
    setFiltersOpen(false);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setPage(1);
  };

  const refreshCart = () => {
    if (!isLogin) return;
    axios
      .get("/api/cart")
      .then((res) => setCartItems(res.data.data || []))
      .catch(() => setCartItems([]));
  };

  const handleUpdateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      axios
        .post("/api/cart/remove", { id })
        .then(refreshCart)
        .catch(refreshCart);
    } else {
      axios
        .post("/api/cart/update", { id, quantity })
        .then(refreshCart)
        .catch(refreshCart);
    }
  };

  const handleRemoveCartItem = (id) => {
    axios.post("/api/cart/remove", { id }).then(refreshCart).catch(refreshCart);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  const handleAddToCart = (product, quantity) => {
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
      .post("/api/cart/add", { product_id: product.id, quantity })
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

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Products</Typography>
      </Breadcrumbs>

      <Grid container spacing={3}>
        {/* Main Content - 9 columns on desktop, 12 on mobile */}
        <Grid size={{ lg: 9, xs: 12 }}>
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                Products
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton>
                  <Sort />
                </IconButton>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => setFiltersOpen(true)}
                  size="small"
                >
                  Filters
                </Button>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Showing {products.length} Products
            </Typography>

            {/* Search */}
            <TextField
              fullWidth
              placeholder="Search by product name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
          </Box>

          {/* Products Grid - 3 columns */}
          {productLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
              <CircularProgress />
            </Box>
          ) : productError ? (
            <Typography color="error" align="center" sx={{ mt: 8 }}>
              {productError}
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }} key={product.id}>
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    cartQuantity={
                      cartItems.find((item) => item.product_id === product.id)
                        ?.quantity || 0
                    }
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </Grid>

        {/* Order Summary - always beside products */}
        <Grid size={{ lg: 3, xs: 12 }}>
          <OrderSummary
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onCheckout={handleCheckout}
          />
        </Grid>
      </Grid>

      {/* Filter Drawer - Always from left side */}
      <Drawer
        anchor="left"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      >
        <Box sx={{ width: 400 }}>
          <FilterSidebar
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            categories={categories}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
            onClose={() => setFiltersOpen(false)}
            isMobile={true}
          />
        </Box>
      </Drawer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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
