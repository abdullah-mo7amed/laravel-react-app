# Setup Guide - E-Commerce Application

This guide will walk you through setting up the full-stack e-commerce application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **PHP 8.2+** - [Download PHP](https://www.php.net/downloads)
- **Composer** - [Download Composer](https://getcomposer.org/download/)
- **Node.js 18+** - [Download Node.js](https://nodejs.org/)
- **Git** - [Download Git](https://git-scm.com/)

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd laravel-react-app
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install Node.js Dependencies

```bash
npm install
```

### 4. Environment Configuration

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 5. Database Setup

```bash
# Run migrations
php artisan migrate

# Seed the database with sample data
php artisan db:seed
```

### 6. Start Development Servers

#### Option A: Combined Development (Recommended)

```bash
# This starts all servers in parallel
composer run dev
```

This command starts:
- Laravel development server (http://localhost:8000)
- Queue worker for background jobs
- Vite development server for React
- Log monitoring

#### Option B: Separate Servers

```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Queue worker
php artisan queue:listen

# Terminal 3: Vite development server
npm run dev
```

## Accessing the Application

- **Frontend**: http://localhost:8000
- **API**: http://localhost:8000/api

## Default Login Credentials

- **Email**: `test@example.com`
- **Password**: `password`

## Testing the Application

### 1. Browse Products
- Visit http://localhost:8000
- You should see a list of products with filtering options

### 2. User Authentication
- Click "Login" in the navigation
- Use the default credentials above

### 3. Shopping Cart
- Add products to cart
- View cart in the sidebar
- Update quantities

### 4. Checkout Process
- Proceed to checkout
- Place an order
- Check email logs for confirmation

## Email Configuration

### Development (Log Driver)
The application is configured to log emails to `storage/logs/laravel.log` by default.

To view sent emails:
```bash
tail -f storage/logs/laravel.log
```

### Production (SMTP)
For production, update your `.env` file:

```env
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password
MAIL_FROM_ADDRESS=noreply@yourapp.com
MAIL_FROM_NAME="Your App Name"
```

## Queue System

### Development
The queue worker should be running for email processing:

```bash
php artisan queue:listen
```

### Production
For production, use a process manager like Supervisor:

```bash
# Install supervisor
sudo apt-get install supervisor

# Create configuration
sudo nano /etc/supervisor/conf.d/laravel-worker.conf
```

Add this configuration:
```ini
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/your/app/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
numprocs=8
redirect_stderr=true
stdout_logfile=/path/to/your/app/storage/logs/worker.log
```

## Troubleshooting

### Common Issues

#### 1. Permission Errors
```bash
# Fix storage permissions
chmod -R 775 storage bootstrap/cache
```

#### 2. Database Connection
```bash
# Clear config cache
php artisan config:clear

# Check database connection
php artisan tinker
DB::connection()->getPdo();
```

#### 3. Queue Not Working
```bash
# Check queue status
php artisan queue:work --once

# Clear failed jobs
php artisan queue:flush
```

#### 4. Vite Build Issues
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild assets
npm run build
```

### Debug Mode

Enable debug mode in `.env`:
```env
APP_DEBUG=true
APP_ENV=local
```

## Production Deployment

### 1. Environment Setup
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com
```

### 2. Database
```env
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_DATABASE=your-db-name
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password
```

### 3. Build Assets
```bash
npm run build
```

### 4. Queue Workers
Ensure queue workers are running in production using Supervisor or similar.

### 5. Web Server
Configure your web server (Apache/Nginx) to serve the application.

## Support

If you encounter any issues:

1. Check the Laravel logs: `storage/logs/laravel.log`
2. Check the queue logs: `storage/logs/worker.log`
3. Verify all services are running
4. Ensure all dependencies are installed correctly

For additional help, refer to the main README.md file or create an issue in the repository. 