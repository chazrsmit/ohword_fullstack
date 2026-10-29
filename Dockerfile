
# Stage 1: Build the React and Vite frontend
FROM node:22-bookworm-slim AS frontend

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# Stage 2: Build and run the Laravel application
FROM php:8.3-apache-bookworm

WORKDIR /var/www/html

# Install system libraries and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libzip-dev \
    && docker-php-ext-install \
        pdo_mysql \
        mbstring \
        bcmath \
        exif \
        pcntl \
        zip \
        intl \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy the Laravel application
COPY . .

# Install production PHP dependencies
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --prefer-dist

# Copy the production frontend assets
COPY --from=frontend /app/public/build ./public/build

# Configure Apache to serve Laravel's public directory
COPY docker/apache-site.conf /etc/apache2/sites-available/000-default.conf
RUN sed -i 's/Listen 80/Listen 10000/' /etc/apache2/ports.conf

# Set production defaults
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr

# Allow Laravel to write logs, cache and sessions
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 10000

CMD ["apache2-foreground"]
