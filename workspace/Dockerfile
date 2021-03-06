FROM ubuntu:18.04

RUN export PASSWORD=123456

# 初始化
# ---> 目录说明
#   -> /initmp 临时文件目录
#   -> /app 应用程序安装目录
#   -> /proj 用户代码存放目录

RUN echo "Init workspace.." \
    && echo "Asia/Shanghai" > /etc/timezone \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get update \
    # 安装实用工具包和依赖
    && apt-get install -y wget curl vim nano zip git tzdata openssl net-tools locales sudo dumb-init \
    && mkdir "/app" \
    && apt-get clean

# 安装并配置 zsh
RUN echo "Install Ohmyzsh.." \
    && apt-get install -y zsh \
    && sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)" \
    && echo "export ZSH=/root/.oh-my-zsh" > ~/.zshrc \
    && echo "ZSH_THEME=ys" >> ~/.zshrc \
    && echo "plugins=(git)" >> ~/.zshrc \
    && echo "source /root/.oh-my-zsh/oh-my-zsh.sh" >> ~/.zshrc \
    && echo "clear" >> ~/.zshrc \
    && echo echo \'Switched to Workspace form MySrv:3\' >> ~/.zshrc \
    && apt-get clean

# 安装 gosu 用于提权
RUN echo "Install gosu.." \
    && wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/1.7/gosu-amd64" \
    && chmod +x /usr/local/bin/gosu \
    && gosu nobody true

# 安装 python3 环境
RUN echo "Install Python.." \
    && apt-get install -y python3 python3-pip \
    && ln -s /usr/bin/python3 /usr/bin/python \
    && ln -s /usr/bin/pip3 /usr/bin/pip \
    && apt-get clean

# 安装 Nodejs 环境
RUN echo "Install Nodejs.." \
    && apt-get install -y nodejs npm \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update && apt-get install -y --no-install-recommends yarn \
    && apt-get clean
    
# 安装 Java 环境
RUN echo "Install Java.." \
    && apt-get install -y default-jdk maven \
    && apt-get clean

# 安装 Php 环境
RUN echo "Install PHP.." \
    && apt-get install -y php php-bcmath php-bz2 php-calendar php-ctype php-curl php-dom php-enchant php-exif php-fileinfo php-ftp php-gd php-gettext php-gmp php-iconv php-intl php-json php-ldap php-mbstring php-mysqli php-mysqlnd php-opcache php-pdo php-phar php-posix php-pspell php-readline php-shmop php-simplexml php-snmp php-soap php-sockets php-sqlite3 php-sysvmsg php-sysvsem php-sysvshm php-wddx php-xml php-xsl \
    && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php "composer-setup.php" \
    && php -r "unlink('composer-setup.php');" \
    && mv composer.phar /usr/bin/composer \
    && apt-get clean

# 安装 webhook
RUN echo "Install webhook.." \
    && cd "/app" \
    && wget "https://github.com/adnanh/webhook/releases/download/2.6.9/webhook-linux-amd64.tar.gz" \
    && tar -zxvf webhook-linux-amd64.tar.gz \
    && mv /app/webhook-linux-amd64 /app/webhook \
    && rm -rf /app/webhook-linux-amd64.tar.gz \
    && echo "#!/bin/bash" > /app/webhook/test.sh \
    && echo "echo \"Tested! Please run: cat /tmp/test-output.txt\"" >> /app/webhook/test.sh \
    && echo "echo \`date\` >> ./test-output.txt" >> /app/webhook/test.sh \
    && chmod -R 777 /app/webhook \
    && git config --global user.email "mysrv@mysrv.com" \
    && git config --global user.name "mysrv" \
    && git config --global credential.helper store

# 安装 Code Server
RUN echo "Install Code Server.." \
    && cd "/app" \
    # && wget "https://github.com/cdr/code-server/releases/download/1.1156-vsc1.33.1/code-server1.1156-vsc1.33.1-linux-x64.tar.gz" \
    && wget "https://github.com/cdr/code-server/releases/download/2.preview.9-vsc1.37.0/code-server2.preview.9-vsc1.37.0-linux-x86_64.tar.gz" \
    && tar -zxvf code-server1.1156-vsc1.33.1-linux-x64.tar.gz \
    && mv /app/code-server1.1156-vsc1.33.1-linux-x64 /app/code-server \
    && rm -rf /app/code-server1.1156-vsc1.33.1-linux-x64.tar.gz \
    && chmod -R 777 /app/code-server

# 系统优化
RUN echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.conf \
    && sysctl -p

# 运行各种程序
RUN echo "#!/bin/bash" > /app/run.sh \
    && echo "php -S 0000:893 -t /app/kodexplorer &" >> /app/run.sh \
    && echo "/app/webhook/webhook -port 7009 -hotreload -hooks /app/webhook/hooks.json -verbose &" >> /app/run.sh \
    # && echo "/app/code-server/code-server /proj -e /app/code-server/expansions -d /app/code-server/home --password \`cat /app/code-server/password\` --disable-telemetry" >> /app/run.sh \
    && echo "/app/code-server/code-server /proj -e /app/code-server/expansions -d /app/code-server/home  --auth password --port 8443 --disable-telemetry" >> /app/run.sh \
    && chmod -R 700 /app/run.sh

WORKDIR /proj
