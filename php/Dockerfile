FROM ubuntu:18.04

RUN echo "Install PHP.." \
    && apt-get install -y php php-bcmath php-bz2 php-calendar php-ctype php-curl php-dom php-enchant php-exif php-fileinfo php-ftp php-gd php-gettext php-gmp php-iconv php-intl php-json php-ldap php-mbstring php-mysqli php-mysqlnd php-opcache php-pdo php-phar php-posix php-pspell php-readline php-shmop php-simplexml php-snmp php-soap php-sockets php-sqlite3 php-sysvmsg php-sysvsem php-sysvshm php-wddx php-xml php-xsl \
    && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php "composer-setup.php" \
    && php -r "unlink('composer-setup.php');" \
    && mv composer.phar /usr/bin/composer \
    && apt-get clean
    
    WORKDIR /proj
