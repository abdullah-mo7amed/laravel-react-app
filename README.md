# Full-Stack E-Commerce Application

A modern, full-stack e-commerce application built with **Laravel 12** (Backend API) and **React 19** (Frontend) featuring real-time cart management, product filtering, and asynchronous email processing.

## 🚀 Features

### Core Features
- **User Authentication** - Secure login system with Laravel Sanctum
- **Product Catalog** - Browse products with advanced filtering and search
- **Shopping Cart** - Real-time cart management with stock validation
- **Order Processing** - Complete checkout flow with email notifications
- **Responsive Design** - Modern UI built with Material-UI and Tailwind CSS

### Advanced Features
- **Queue Jobs** - Asynchronous email processing for better performance
- **Caching** - Product data caching for improved response times
- **Pagination** - Efficient data loading with pagination
- **Real-time Updates** - Live cart updates without page refresh
- **Stock Management** - Real-time stock validation

## 🛠️ Technology Stack

### Backend (Laravel 12)
- **Framework**: Laravel 12 (Latest)
- **Database**: SQLite (Development) / MySQL/PostgreSQL (Production)
- **Authentication**: Laravel Sanctum
- **Queue System**: Database queues for background jobs
- **Caching**: Laravel Cache with Redis support
- **API**: RESTful API with JSON responses
- **Validation**: Form request validation
- **Testing**: Pest PHP testing framework

### Frontend (React 19)
- **Framework**: React 19 (Latest)
- **Routing**: React Router DOM v7
- **UI Library**: Material-UI (MUI) v7
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios
- **Build Tool**: Vite 6

### Key Packages
- **Eloquent Sluggable**: SEO-friendly URLs for products
- **Laravel Sanctum**: API authentication
- **Material-UI Icons**: Rich icon library
- **Concurrently**: Parallel development server management

## 📁 Project Structure

```
laravel-react-app/
├── app/
│   ├── Http/Controllers/     # API Controllers
│   ├── Jobs/                 # Queue Jobs (Email processing)
│   ├── Mail/                 # Email templates
│   └── Models/               # Eloquent Models
├── database/
│   ├── migrations/           # Database migrations
│   └── seeders/             # Database seeders
├── resources/
│   └── js/
│       ├── Components/       # React components
│       └── Pages/           # React pages
└── routes/
    └── api.php              # API routes
```

## 🚀 Quick Start

### Prerequisites
- PHP 8.2 or higher
- Node.js 18 or higher
- Composer
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laravel-react-app
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database setup**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

6. **Start the development servers**
   ```bash
   # Option 1: Use the combined dev script (recommended)
   composer run dev
   
   # Option 2: Start servers separately
   php artisan serve
   php artisan queue:listen
   npm run dev
   ```

### Default Credentials
- **Email**: `test@example.com`
- **Password**: `password`

## 🔧 Configuration

### Queue Configuration
The application uses **database queues** for asynchronous email processing:

```php
// config/queue.php
'default' => env('QUEUE_CONNECTION', 'database'),
```

**Why Queue Jobs?**
- **Performance**: Email sending doesn't block the main request
- **Reliability**: Failed emails are retried automatically
- **Scalability**: Can handle high email volumes
- **User Experience**: Faster response times for users

### Email Configuration
Configure your email settings in `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password
MAIL_FROM_ADDRESS=noreply@yourapp.com
MAIL_FROM_NAME="${APP_NAME}"
```

For development, you can use the `log` driver to save emails to `storage/logs/laravel.log`.

## 📊 API Endpoints

### Authentication
- `POST /api/login` - User login

### Products
- `GET /api/products` - Get products with filtering and pagination
- `GET /api/categories` - Get product categories

### Cart Management
- `GET /api/cart` - Get user's cart items
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/update` - Update cart item quantity
- `POST /api/cart/remove` - Remove item from cart

### Orders
- `POST /api/place-order` - Place order and send confirmation email

## 🎯 Key Features Explained

### 1. Queue Jobs for Email Processing
```php
// app/Jobs/SendOrderThankYouEmail.php
class SendOrderThankYouEmail implements ShouldQueue
{
    public function handle()
    {
        Mail::to($this->user->email)->send(new OrderThankYouMail($this->user));
    }
}
```

**Benefits:**
- Emails are sent in the background
- Main application remains responsive
- Automatic retry on failure
- Better user experience

### 2. Product Caching
```php
// app/Http/Controllers/ProductController.php
$products = Cache::remember($cacheKey, now()->addMinutes(10), function () {
    // Database query here
});
```

**Benefits:**
- Faster response times
- Reduced database load
- Better scalability

### 3. Real-time Cart Management
- Cart updates without page refresh
- Stock validation in real-time
- Optimistic UI updates

### 4. Advanced Product Filtering
- Search by product name
- Filter by price range
- Filter by category
- Pagination support

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/Auth/AuthenticationTest.php
```

## 🚀 Production Deployment

### Environment Variables
Set these in your production environment:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_DATABASE=your-db-name
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password

QUEUE_CONNECTION=database
MAIL_MAILER=smtp
# ... other mail settings
```

### Queue Worker
Ensure queue workers are running in production:

```bash
# Start queue worker
php artisan queue:work

# Or use supervisor for production
```

### Build Frontend
```bash
npm run build
```

## 🔄 Queue System Deep Dive

### Why We Use Queue Jobs for Email Processing

In this e-commerce application, we implemented **asynchronous email processing** using Laravel's queue system for several critical reasons:

#### 1. **Performance Optimization**
- **Non-blocking Operations**: When a user places an order, the email sending happens in the background
- **Faster Response Times**: Users get immediate feedback without waiting for email delivery
- **Better User Experience**: The checkout process feels instant and responsive

#### 2. **Reliability & Error Handling**
- **Automatic Retries**: Failed email attempts are automatically retried
- **Error Isolation**: Email failures don't affect the main application flow
- **Logging & Monitoring**: Failed jobs are logged for debugging

#### 3. **Scalability**
- **High Volume Handling**: Can process thousands of emails without affecting performance
- **Resource Management**: Email processing doesn't consume web server resources
- **Load Distribution**: Jobs can be processed by multiple workers

#### 4. **Implementation Details**

```php
// OrderController.php - Fast response to user
public function placeOrder(Request $request)
{
    $user = $request->user();
    
    // Dispatch email job to background queue
    SendOrderThankYouEmail::dispatch($user);
    
    // Clear cart immediately
    $user->cartItems()->delete();
    
    // Return fast response
    return response()->json(['message' => 'Order placed and email will be sent!']);
}
```

```php
// SendOrderThankYouEmail.php - Background processing
class SendOrderThankYouEmail implements ShouldQueue
{
    public function handle()
    {
        // This runs in background, doesn't block user
        Mail::to($this->user->email)->send(new OrderThankYouMail($this->user));
    }
}
```

### Queue Configuration
- **Driver**: Database (for simplicity and reliability)
- **Retry Logic**: Automatic retries with exponential backoff
- **Monitoring**: Failed jobs are stored in `failed_jobs` table

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the Laravel documentation
- Review the React documentation

---

**Built with ❤️ using Laravel 12 and React 19**
