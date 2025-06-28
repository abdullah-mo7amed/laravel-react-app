import {
  Box,
  Typography,
  Slider,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

export default function FilterSidebar({
  priceRange,
  onPriceChange,
  selectedCategories,
  onCategoryChange,
  categories,
  onApplyFilters,
  onClearFilters,
  onClose,
  isMobile = false,
}) {
  const handleCategoryChange = (categorySlug, checked) => {
    if (checked) {
      onCategoryChange([...selectedCategories, categorySlug]);
    } else {
      onCategoryChange(
        selectedCategories.filter((cat) => cat !== categorySlug)
      );
    }
  };

  return (
    <Box sx={{ width: "100%", p: 3, bgcolor: "white", height: "fit-content" }}>
      {isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filters
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      )}

      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filters
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      )}

      <Divider sx={{ mb: 3 }} />

      {/* Price Filter */}
      <FormControl fullWidth sx={{ mb: 4 }}>
        <FormLabel
          component="legend"
          sx={{ mb: 2, color: "text.primary", fontWeight: 600 }}
        >
          Price
        </FormLabel>
        <Box sx={{ px: 2 }}>
          <Slider
            value={priceRange}
            onChange={(_, newValue) => onPriceChange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={300}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              $0
            </Typography>
            <Typography variant="body2" color="text.secondary">
              $300
            </Typography>
          </Box>
        </Box>
      </FormControl>

      {/* Category Filter */}
      <FormControl fullWidth sx={{ mb: 4 }}>
        <FormLabel
          component="legend"
          sx={{ mb: 2, color: "text.primary", fontWeight: 600 }}
        >
          Category
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategories.length === 0}
                onChange={(e) => {
                  if (e.target.checked) {
                    onCategoryChange([]);
                  }
                }}
              />
            }
            label="All"
          />
          {categories.map((category) => (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  checked={selectedCategories.includes(
                    category.slug || category.name
                  )}
                  onChange={(e) =>
                    handleCategoryChange(
                      category.slug || category.name,
                      e.target.checked
                    )
                  }
                />
              }
              label={category.name}
            />
          ))}
        </FormGroup>
      </FormControl>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={onApplyFilters}
          sx={{
            bgcolor: "black",
            color: "white",
            "&:hover": {
              bgcolor: "#333",
            },
          }}
        >
          Apply Filter
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={onClearFilters}
          sx={{
            borderColor: "#e0e0e0",
            color: "text.secondary",
            "&:hover": {
              borderColor: "#ccc",
              bgcolor: "#f5f5f5",
            },
          }}
        >
          Clear all filters
        </Button>
      </Box>
    </Box>
  );
}
