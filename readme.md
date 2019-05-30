# mysrv

mysrv 是一套基于 Docker 的通用开发环境脚手架。

它可以用来：

1. 当作开发调试用的本地沙箱，一键装好各种常用语言的环境、包管理器与工具集 (PHP/Java/Nodejs/Python/Ruby/..)，不污染宿主机，出现任何问题都可以快速销毁重装。

2. 一键部署至您的云服务器，为服务器搭建好可用作生产的环境，且系统和各个应用之间都相互隔离。

3. 利用 mysrv 中整合的 [gogs](https://github.com/gogs/gogs) 和 [git-webhook](https://github.com/NetEaseGame/git-webhook) 实现代码备份同步和自动部署。

## 状态

**目前处于开发阶段，不推荐使用！文档并不适用于当前版本，请勿参照下方文档进行操作！** 但您可参阅 docker-compose 文件来尝试使用它。

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

只要运行这个命令：

```sh
./mysrv
# 该命令相当于构建预先编排好的 docker-compose 工程后，进入其中的 workspace 容器。该容器用于您平时的代码开发、调试和安装依赖等操作。
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

正在编写ing