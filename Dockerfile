FROM dunglas/frankenphp:php8.3

RUN install-php-extensions \
    pdo_pgsql \
    mbstring \
    intl \
    zip \
    opcache

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction

RUN npm install
RUN npm run build

RUN chown -R www-data:www-data \
    storage \
    bootstrap/cache

RUN php artisan optimize

EXPOSE 8000

CMD ["frankenphp", "php-server", "--listen", ":8000", "--root", "/app/public"]