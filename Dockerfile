FROM dunglas/frankenphp:php8.3

# Install PHP extensions needed by Laravel
RUN install-php-extensions \
    pdo_pgsql \
    mbstring \
    intl \
    zip \
    opcache

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

WORKDIR /app

# Copy Laravel project
COPY . .

# Install PHP dependencies
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction

# Install frontend dependencies and build React/Inertia
RUN npm install
RUN npm run build

# Laravel permissions
RUN chown -R www-data:www-data \
    storage \
    bootstrap/cache

# Laravel production optimizations
RUN php artisan optimize

EXPOSE 8000

CMD ["frankenphp", "php-server", "--listen", ":8000", "--root", "/app/public"]