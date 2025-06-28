# API Documentation

This document provides detailed information about the RESTful API endpoints for the E-Commerce application.

## Base URL
```
http://localhost:8000/api
```

## Authentication

The API uses Laravel Sanctum for authentication. Most endpoints require authentication via Bearer token.

### Login
```http
POST /api/login
```

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com"
  },
  "token": "1|abc123..."
}
```

**Usage:**
```javascript
// Include token in subsequent requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

## Products

### Get Products
```http
GET /api/products
```

**Query Parameters:**
- `search` (string) - Search products by name
- `min_price` (number) - Minimum price filter
- `max_price` (number) - Maximum price filter
- `category` (string) - Filter by category name
- `page` (number) - Page number for pagination

**Example Request:**
```http
GET /api/products?search=headphones&min_price=50&max_price=200&page=1
```

**Response:**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "slug": "wireless-headphones",
      "cover": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?fit=crop&w=600&q=80",
      "description": "High-quality wireless headphones with noise cancellation.",
      "price": 99.99,
      "stock": 10,
      "category_id": 1,
      "category": "Electronics",
      "created_at": "2025-01-01T00:00:00.000000Z",
      "updated_at": "2025-01-01T00:00:00.000000Z"
    }
  ],
  "first_page_url": "http://localhost:8000/api/products?page=1",
  "from": 1,
  "last_page": 1,
  "last_page_url": "http://localhost:8000/api/products?page=1",
  "next_page_url": null,
  "path": "http://localhost:8000/api/products",
  "per_page": 10,
  "prev_page_url": null,
  "to": 8,
  "total": 8
}
```

### Get Categories
```http
GET /api/categories
```

**Response:**
```json
{
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "Electronics",
      "cover": "https://images.unsplash.com/photo-1518770660439-4636190af475?fit=crop&w=600&q=80",
      "product_count": 4,
      "created_at": "2025-01-01T00:00:00.000000Z",
      "updated_at": "2025-01-01T00:00:00.000000Z"
    }
  ]
}
```

## Cart Management

All cart endpoints require authentication.

### Get Cart Items
```http
GET /api/cart
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "product_id": 1,
      "name": "Wireless Headphones",
      "cover": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?fit=crop&w=600&q=80",
      "price": 99.99,
      "quantity": 2,
      "stock": 10
    }
  ]
}
```

### Add Item to Cart
```http
POST /api/cart/add
```

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "product_id": 1,
  "quantity": 2
}
```

**Response:**
```json
{
  "message": "Added to cart",
  "cart_item": {
    "id": 1,
    "user_id": 1,
    "product_id": 1,
    "quantity": 2,
    "created_at": "2025-01-01T00:00:00.000000Z",
    "updated_at": "2025-01-01T00:00:00.000000Z"
  }
}
```

**Error Responses:**
```json
{
  "message": "Not enough stock"
}
```

```json
{
  "message": "Unauthorized"
}
```

### Update Cart Item
```http
POST /api/cart/update
```

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "id": 1,
  "quantity": 3
}
```

**Response:**
```json
{
  "message": "Cart updated",
  "cart_item": {
    "id": 1,
    "user_id": 1,
    "product_id": 1,
    "quantity": 3,
    "created_at": "2025-01-01T00:00:00.000000Z",
    "updated_at": "2025-01-01T00:00:00.000000Z"
  }
}
```

### Remove Cart Item
```http
POST /api/cart/remove
```

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "id": 1
}
```

**Response:**
```json
{
  "message": "Cart item removed"
}
```

## Orders

### Place Order
```http
POST /api/place-order
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "message": "Order placed and email will be sent!"
}
```

**Note:** This endpoint:
1. Dispatches a background job to send confirmation email
2. Clears the user's cart
3. Returns immediately for better user experience

## Error Handling

### Standard Error Response
```json
{
  "message": "Error description"
}
```

### Validation Errors
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": [
      "The email field is required."
    ],
    "password": [
      "The password field is required."
    ]
  }
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `422` - Validation Error
- `500` - Server Error

## Rate Limiting

API endpoints are rate-limited to prevent abuse. Limits are applied per IP address.

## Caching

Product endpoints are cached for 10 minutes to improve performance. Cache is automatically invalidated when data changes.

## Queue System

Email processing uses Laravel's queue system:

- **Driver**: Database
- **Retry Logic**: Automatic retries with exponential backoff
- **Failed Jobs**: Stored in `failed_jobs` table
- **Monitoring**: Check `storage/logs/laravel.log` for queue activity

## Testing the API

### Using cURL

```bash
# Login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Get products
curl -X GET http://localhost:8000/api/products

# Add to cart (with token)
curl -X POST http://localhost:8000/api/cart/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"product_id":1,"quantity":2}'
```

### Using Postman

1. Import the collection
2. Set the base URL to `http://localhost:8000/api`
3. Use the login endpoint to get a token
4. Set the Authorization header for subsequent requests

### Using JavaScript/Axios

```javascript
import axios from 'axios';

// Login
const login = async (email, password) => {
  const response = await axios.post('/api/login', { email, password });
  const token = response.data.token;
  
  // Set token for future requests
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
  return response.data;
};

// Get products
const getProducts = async (filters = {}) => {
  const response = await axios.get('/api/products', { params: filters });
  return response.data;
};

// Add to cart
const addToCart = async (productId, quantity) => {
  const response = await axios.post('/api/cart/add', { product_id: productId, quantity });
  return response.data;
};
```

## Development Notes

- All timestamps are in ISO 8601 format
- Prices are returned as floats with 2 decimal places
- Stock quantities are integers
- Product slugs are auto-generated from product names
- Email jobs are processed asynchronously in the background 