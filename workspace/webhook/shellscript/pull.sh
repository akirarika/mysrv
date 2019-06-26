#!/bin/bash
# pull.sh -> 用于自动从远程仓库拉取更改
#         -> 本脚本不会解决冲突，所以当出现冲突时，
#         -> 本脚本并不可靠。
# 使用前，需要先执行 `git init` 初始化仓库
# 关联远程仓库 `git remote add origin [Git仓库地址]`
# 如果使用 HTTP(S) 协议关联远程仓库，那么必须：
# `git config credential.helper store` 来"记住"密码
# 完成上述操作后，先 git pull 一次进行测试，没问题即可。

git pull
chmod -R 777 ./*

composer install