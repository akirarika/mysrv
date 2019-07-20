# mysrv

开箱即用的云端开发环境，让我们在云端「开发->编译->测试->生产」！🎉

## 简介

它可以用来：

1. 当作开发调试用的本地沙箱，一键装好各种常用语言的环境、包管理器与工具集 (PHP/Java/Nodejs/Python/Ruby/..)，不污染宿主机，出现任何问题都可以快速销毁重装。

2. 一键部署至您的云服务器，为服务器搭建好可用作生产的环境，且系统和各个应用之间都相互隔离。

3. 利用 [gogs](https://github.com/gogs/gogs) 和 [webhook](https://github.com/adnanh/webhook) 实现代码备份同步和自动部署。

4. 利用 [vscode-server](https://github.com/cdr/code-server) 和 [kod-explorer](https://github.com/kalcaddle/KodExplorer) 实现云端编码，和可视化文件管理/拖拽式上传。

ps. 目前仅支持 PHP /Python / Web / Node 周边。

## 快速开始

### 下载 mysrv 至本地

通常我们会利用 git 来下载：

```sh
git clone https://github.com/akirarika/mysrv.git
cd mysrv
```

若您不喜欢使用 git，也可以从这里 [下载最新版本的压缩包](https://github.com/akirarika/mysrv/archive/master.zip) 后自行解压。

### Linux 下安装

mysrv 崇尚直接在云服务器上编码、调试和执行，所以制作了一个在 Linux 下的一键安装部署的脚本。

在 Linux 下，您可以输入：

```sh
./mysrv install
# 需要以 Root 用户运行，系统必须安装有 `curl`
```

来一键安装 Mysrv、 Docker 与 Docker Compose。至此，安装完成。

注：建议使用崭新出厂的服务器系统中运行该脚本，ArchLinux 系统因 Docker 官方未支持，所以需自行手动安装。虽然我使用 ArchLinux，但是我的服务器是 CentOS，所以建议使用 CentOS 来运行以避免环境不一致造成的问题。

### 非 Linux 下安装

mysrv 是基于 Docker 的，您必须确认您是否安装了 Docker：

```sh
docker -v && docker-compose -v
```

若您在 Windows10 与 Mac 下使用，没有安装 Dcoker，请您下载并安装 [Docker 桌面版](https://www.docker.com/get-started)。

安装完毕后，为 mysrv 生成配置：

```sh
cp env-example .env
```

### 修改数据库密码等配置

```
vim .env
```

### 下载启动

在修改完默认的数据库等密码的配置后，执行：

```
./mysrv start
```

来下载启动。

### 进入开发环境

只要运行这个命令：

```sh
./mysrv
# 若您在中国大陆地区，因网络原因等待时间过长，请考虑使用国内的 Docker 镜像仓库和为 Docker 配置代理。
```

您拥有了一个基于 Docker 的沙箱开发环境：

```sh
python --version
pip  --version
php --version
composer --version
node --version
npm --version
yarn --version
# ...
```

需要注意的是，您只应当在这个容器内进行编写代码、调试、测试和安装依赖包等操作。如果您想要将您的代码用于生产，应当使用独立的容器。

例如，您的代码是 PHP 程序，并且用到了 Caddy、Mysql、Redis 之类的应用，那么您应当分别启动 PHP、Caddy、Mysql、Redis 容器，并将代码或配置文件放置在相应的位置，可参阅下方文档。


## 文档

### 容器

mysrv 包含若干个容器，用于在生产环境运行您的代码。这些容器均是通过官方仓库中的镜像加工制作而成。

目前阶段，可用的容器列表为：

```
caddy # 上手简单、安全且优秀的现代化 HTTP 服务器。相对于 Apache 来说，除了更轻量和使用便捷，最大的特色是能够自动为站点配置 HTTPS！

gogs # 使用 go 语言开发的轻量级 Git 协作服务器，对配置要求极低，甚至可以在树莓派上运行。对于个人或小型团队来说，是时候摒弃笨重的 Gitlab 了！

mysql # 广受好评的开源关系型数据库。它是开源且免费的，比 Oracle 更轻量和更节省成本！

kodexplorer # 基于 web 的可视化文件管理器，包含很多强大的功能，内置 Adminer 可用于管理数据库。

php # 世界上最好的语言。

redis # balabala

# 更多应用程序正在计划中，也欢迎您来贡献
```

此外，您将会在根目录看到与这些容器同名的文件夹。这里存放着它们构建时执行的操作 `Dockerfile`、程序配置 `conf/`、持久化的数据 `data/` 和日志 `logs/`

### Workspace 容器

除了上节所属的容器以外，您可能注意到了，还有一个名为 workspace 的容器。在它的内部安装好了许多常用的 Linux 程序、工具和若干语言的环境、包管理器和与工具集。

这个容器的作用比较特殊，您可以在其中便捷地进行：(以 php 开发为例)

1. 编程开发 (vim index.php ...)
2. 测试调试 (php -f 'unit-test.php' ...)
3. 安装您代码需要的依赖 (composer update ...)
4. 尝试一些可能会有危险的东西

或者，您也可以将它当成一个可以方便地创建和销毁的沙箱环境，在其中随便做您愿意做的任何事！

通过如下命令快速运行并进入 workspace 容器：

```
./mysrv
```

如果之后想快速初始化重置它，请：

```
./mysrv init
```

但是，请注意：请不要将 **任何作用于生产环境的代码和程序** 在此处长期运行！workspace 容器不应当有任何一个端口开放到公网环境！它应当 **仅用来开发和测试！**

目前该容器中，提供的工具软件环境有：

```
zsh

wget curl

vim nano

tar zip

git

python pip

php composer

nodejs npm yarn

java maven

webhook
```

### 定义所使用到的容器

您经常并不会需要运行所有的容器，假设您的代码是使用 PHP 语言编写的，那么您完全用不上 Java 容器。

您可以编辑在 mysrv 根目录下的 `.cntrLst` 文件来规定您需要启动的容器，用空格分隔。

以下是仅启动 caddy、php 和 workspace 容器：

```
caddy php workspace
```

这个设定对您使用 docker-compose 命令并没有效果，但对您使用 mysrv 脚本有效。想了解请阅读下一节内容。

### mysrv 脚本

根目录存在一个名为 mysrv 的 shell 脚本，它为您提供了一些封装好的快捷操作。若您在 Linux 下使用了一键安装脚本，那么本脚本会在 /usr/bin 创建一个软链接，这意味着您可以在任意位置直接输入 `mysrv {命令}` 来调用脚本。

1. `mysrv` 启动并进入 Workspace 容器。

2. `mysrv init` 初始化 Workspace 容器。

3. `mysrv install` 一键安装 Mysrv，Docker，Docker Compose，仅适用于 Linux 系统。

4. `mysrv open {容器名称}` 进入指定的容器。

5. `mysrv start` 启动容器，列表读取自 `.cntrLst`。

6. `mysrv stop` 停止容器，列表读取自 `.cntrLst`。

7. `mysrv restart` 重启容器，列表读取自 `.cntrLst`。

8.  `mysrv delete` 删除所有容器。

9.  `mysrv dir` 获取 mysrv 所在路径，并切换于此。

10.  `mysrv proj` 获取 mysrv 所在上层文件夹的路径，并切换于此。

### 我的代码应该在哪里

默认情况下，您的代码是在 mysrv 外层目录内的。

假设您将 mysrv 放置在了 `~/Documents/MyCode/mysrv`

那么，您的代码应该存放在 `~/Documents/MyCode`

假设您写了两个项目，分别是 `project1` `project2`

那么，它们的代码应该存放在：

```
~/Documents/MyCode/project1
~/Documents/MyCode/project2
```

所有位于 `~/Documents/MyCode` 的文件，都将被同步到各个容器内部的 `/proj` 中，方便运行和更改。

### 搭建 Git 代码托管服务器 && 实现提交代码后自动部署

mysrv 集成了 gogs 和 webhook，要使用，使用方式为：

首先，打开 mysrv 中的 gogs/conf 文件夹，编辑 app.ini 文件，修改其中的

```
SECRET_KEY   = {{为任意随机字符串}}
```

以保证安全，接着修改：

```
DISABLE_REGISTRATION   = false
```

来允许用户注册。接着，我们 `mysrv start` 启动，打开 `http://{{您的 IP 或域名}}:3000/`，并注册一个用户。之后，新建一个 Git 托管项目，我这里取名为 `demo`，下文也假设您的名称为 `demo`。

这样，一个基于 gogs 的 git 托管项目就创建完成了。

我们接下来来配置 webhook，来实现一旦有 push 请求，我们的项目就自动 pull，并执行我们需要的命令。

打开 mysrv 中的 workspace 文件夹，编辑 hooks.json 文件 **(请勿保留注释)** ：

```javascript

[
    ... // 以前的内容
    ,{
        "id": "demo", // 该 webhook 的 id，会体现到 url 上
        "execute-command": "/shellscript/pull.sh", // 钩子被触发后，需要执行的脚本
        // 您注意到 workspace 文件夹里还有一个 shellscript 的子文件夹吗？这个文件夹里的
        // 脚本文件会同步到 workspace 容器内的 /shellscript 目录中。
        "command-working-directory": "/proj/demo" // 脚本工作目录，钩子出发后执行的
        // 脚本将从该路径执行，一般设置为该项目的路径为佳。
    }
]

```

然后保存，我们就 webhook 创建了一个新的钩子。当有 HTTP 请求访问 `http://workspace:7009/hooks/{您在 hooks.json 中填写的id}` 时，钩子所设置的脚本将被运行。

好了，我们进入 workspace 文件夹里的 shellscript 子目录，新增一个 `pull.sh`，在其中编写如下内容：

```bash
#!/bin/bash
echo '钩子成功触发了' > ./钩子成功触发了.txt
```

之后赋予给它权限 `chmod -R 777 /shellscript/pull.sh` 当 webhook 被执行时，它就会执行咯。如果在里面添加 `git pull`，它就会自动拉取代码。您也可以让它帮你自动迁移数据库、安装和更新依赖等，在此不再赘述。

为了让钩子生效，我们回到 gogs，进入您之前新建的名为 demo 的仓库，打开 仓库设置->管理 web 钩子->添加 web 钩子->Gogs

在推送地址填写 `http://workspace:7009/hooks/demo`，其他选项暂时保持默认值即可。

接着，在您的本地电脑上，来 Clone 您之前在 gogs 中创建的项目。Clone 地址为：`ssh://git@{{您服务器的域名或 ip}}:10022/{{您 gogs 中的 username}}/{{您的项目名称，如之前的 demo}}.git`

（您可能需要为您的**电脑**和**服务器**配置 ssh 公/私钥，并添加到 gogs 中：用户设置 -> SSH 密钥 -> 新增 SSH 密钥）

接着，我们在服务器里，进入 mysrv 的 workspace 容器，`cd /proj` 后将您提交到 gogs 上的代码 clone 下来，地址填写 `ssh://git@gogs/{{您 gogs 中的 username}}/{{您的项目名称，如之前的 demo}}.git`

您可能会问，这里的地址为何要填写 `gogs` 而不是自己的域名或 IP？因为在服务器上我们可以直接从本机内网来 Clone，无需走公网。

最后，您在本地电脑随便写点什么并提交更改到您的 Git 远程仓库，就会发现，之前写的脚本被执行了，`/proj/demo` 中产生了一个 `钩子成功触发了.txt`

至此，项目代码一旦提交久自动部署的功能就搞定了，我们重新编辑 mysrv 中 gogs/conf 里的 app.ini 文件：

```
DISABLE_REGISTRATION   = true
```

来禁用 Gogs 的用户注册功能。

### 在线开发调试 && 在线可视化管理文件/拖拽式文件上传

Workspace 容器中，安装了 `VSCode Server` 与 `KodExplorer`，以实现在线开发调试和在线可视化管理文件/拖拽式文件上传。

#### VSCode Server

使用方式：`http://{您的 ip 地址或域名}:8443/`

初次登录时需要输入密码，默认密码为 `yourCdrPassword`，若您将它开放至公网环境，请**务必修改为其他的密码**！

程序默认安装了一些扩展，不再列出，请自行查看。若您身处中国大陆，可能无法访问 VSCode Server 的扩展商店。

修改默认密码请编辑 `workspace/code-server/password`，之所以使用文件而不使用 .env 或环境变量，是考虑到您可能需要实现动态密码的功能。

#### KodExplorer

使用方式：`http://{您的 ip 地址或域名}:893/index.php`

默认的账号/密码为`admin/admin`，若您将它开放至公网环境，请**务必修改为其他的密码**！

KodExplorer 进行了少量修改，分别为：

1. 开启了验证码和 csrf 保护，若您将其开放至公网环境，必须启用。

2. 删除了除了 admin 以外的其他默认用户，关闭了游客访问权限。

3. 升级了 adminer 插件中内置的 adminer 为 4.7.1。

4. 文件管理器侧边栏的 `proj` 对应着工程目录。

5. 为了安全起见，您**不应当**将您真实机器的 `/` 根目录挂载进 `workspace` 容器。

### mysrv 中，应当放通哪些端口至公网呢

```
80:放通:HTTP 协议所使用
443:放通:HTTPS 协议所使用
3000:放通:Gogs Web 面板所使用
10022:放通:Gogs 的 SSH 端口所使用
7009:禁行:Webhook 所使用，该端口不应当允许公网访问，仅用作与 Gogs 互相通讯，否则面临着 Webhook 中配置的所有脚本可被随意执行的风险，也面临着洪水攻击和被渗透的隐患
893:酌情:KodExplorer 资源管理器所使用，若有公网环境下使用它的打算，可以放通，但请务必修改默认密码，且开启验证码和 csrf 保护
8443:酌情:VSCodeServer 所使用，若有公网环境下使用它的打算，可以放通，但请务必修改默认密码
3306:禁行:Mysql 所使用，不开放至公网以避免被扫描撞库穷举
6379:禁行:Redis 所使用，避免 Redis 中的信息被随意篡改和泄露
2015:禁行:Caddy 测试所使用，没有必要开放至公网
9000:禁行:PHP-FPM 所使用，仅应当用于和 Web Server 通讯使用
```
