FROM php:7.3-fpm-stretch

RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libzip-dev \
        libbz2-dev \
        libcurl4-gnutls-dev \
        libxml2-dev \
    && docker-php-ext-install -j$(nproc) iconv \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install opcache bcmath bz2 calendar ctype curl dom exif fileinfo gettext intl json mbstring pdo_mysql mysqli simplexml sysvmsg sysvsem sysvshm wddx xml zip \
    && apt-get clean

WORKDIR /proj
