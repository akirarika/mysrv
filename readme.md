# mysrv

mysrv 是一套基于 Docker 的通用开发环境脚手架。

它可以用来：

1. 当作开发调试用的本地沙箱，一键装好各种常用语言的环境、包管理器与工具集 (PHP/Java/Nodejs/Python/Ruby/..)，不污染宿主机，出现任何问题都可以快速销毁重装。

2. 一键部署至您的云服务器，为服务器搭建好可用作生产的环境，且系统和各个应用之间都相互隔离。

3. 利用 mysrv 中整合的 [gogs](https://github.com/gogs/gogs) 和 [webhook](https://github.com/adnanh/webhook) 实现代码备份同步和自动部署。

## 快速开始

### 下载 mysrv 至本地

通常我们会利用 git 来下载：

```sh
git clone https://github.com/akirarika/mysrv.git
cd mysrv
```

若您不喜欢使用 git，也可以从这里[下载最新版本的压缩包](https://github.com/akirarika/mysrv/archive/master.zip)后自行解压。

### 安装 Docker

mysrv 是基于 Docker 的，您必须确认您是否安装了 Docker：

```sh
docker -v && docker-compose -v
```

若您没有安装 Dcoker，在 Windows 与 Mac 下，请您参考官方文档来安装。

在 Linux 下，您可以输入：

```sh
./mysrv i
# 需要 Root 权限，系统必须安装有 `curl`
```

来一键安装 Docker 与 Docker Compose！

### 进入开发环境

首先，复制一份配置文件：

```
cp env-example .env
```

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

php # 世界上最好的语言。

# 更多应用程序正在计划中，也欢迎您来贡献
```

此外，您将会在根目录看到与这些容器同名的文件夹。这里存放着它们构建时执行的操作 `Dockerfile`、程序配置 `conf/`、持久化的数据 `data/` 和日志 `logs/`

### Workspace 容器

除了上节所属的容器以外，您可能注意到了，还有一个名为 workspace 的容器。在它的内部安装好了许多常用的 Linux 程序、工具和若干语言的环境、包管理器和与工具集。

这个容器的作用比较特殊，您可以在其中便捷地进行：(以 php 开发为例)

1. 编程开发 (vim index.php ...)
2. 测试调试 (php -f 'unit-test.php' ...)
3. 安装您代码需要的依赖 (composer update ...)

或者，您也可以将它当成一个可以方便地创建和销毁的沙箱环境，在其中随便做您愿意做的任何事！

通过如下命令快速运行并进入 workspace 容器：

```
./mysrv
# 若您在中国大陆地区，因网络原因等待时间过长，请考虑使用国内的 Docker 镜像仓库和为 Docker 配置代理。
```

如果之后想快速初始化重置它，请：

```
./mysrv init
```

但是，请注意：请不要将 **任何作用于生产环境的代码和程序** 在此处长期运行！workspace 容器不应当有任何一个端口开放到公网环境！它应当 **仅用来开发和测试！**

```

```