FROM ubuntu:18.04

# 初始化
# ---> 目录说明
#   -> /initmp 临时文件目录
#   -> /app 应用程序安装目录
#   -> /proj 用户代码存放目录

RUN echo "Init workspace.." \
    && echo "Asia/Shanghai" > /etc/timezone \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get update \
    # 安装实用工具包
    && apt-get install -y wget curl vim nano zip git tzdata \
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

# 安装 Php 环境
RUN echo "Install PHP.." \
    && apt-get install -y php php-mbstring \
    && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php "composer-setup.php" \
    && php -r "unlink('composer-setup.php');" \
    && mv composer.phar /usr/bin/composer \
    && apt-get clean

# 安装 Nodejs 环境
RUN echo "Install Nodejs.." \
    && apt-get install -y nodejs npm yarn \
    && apt-get clean
    
# 安装 Java 环境
RUN echo "Install Java.." \
    && apt-get install -y default-jdk maven \
    && apt-get clean

# 安装 webhook
RUN echo "Install webhook.." \
    && cd "/app" \
    && wget "https://github.com/adnanh/webhook/releases/download/2.6.9/webhook-linux-amd64.tar.gz" \
    && tar -zxvf webhook-linux-amd64.tar.gz \
    && mv /app/webhook-linux-amd64 /app/webhook \
    && rm -rf /app/webhook-linux-amd64.tar.gz \
    # && echo "[{\"id\":\"test\",\"execute-command\":\"/app/webhook/test.sh\",\"command-working-directory\":\"/tmp\"}]" > /app/webhook/hooks.json \
    && echo "#!/bin/bash" > /app/webhook/test.sh \
    && echo "echo \"Tested! Please run: cat /tmp/test-output.txt\"" >> /app/webhook/test.sh \
    && echo "echo \`date\` >> ./test-output.txt" >> /app/webhook/test.sh \
    && chmod -R 777 /app/webhook
    && git config --global credential.helper store

CMD ["/app/webhook/webhook", "-port", "7009", "-hotreload", "-hooks", "/app/webhook/hooks.json", "-verbose"]

WORKDIR /proj
