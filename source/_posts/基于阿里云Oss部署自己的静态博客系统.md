---
title: 基于阿里云Oss部署自己的静态博客系统
categories: "教程类"
tags:
- 博客系统
- 阿里云Oss
---
相关资源

- Node.js
- 已备案域名
- 阿里云Oss
- Hexo静态博客系统
- git

### Hexo静态博客系统

#### [Node安装](https://www.runoob.com/nodejs/nodejs-install-setup.html)


``` bash
# 使用cnpm淘宝镜像进行加速
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
#### Hexo安装
``` bash
# 安装Hexo
cnpm install -g hexo-cli
# 创建项目
pwd # 显示当前路径
/Users/apple/Desktop/code
hexo init blog
cd blog
cnpm install
# 发布项目
hexo generate
cd public # 此目录为最终生成的博客静态页面的目录
```
#### 启动博客服务
``` bash
# 安装http服务
cnpm install -g http-server
cd public
http-server
----
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.76.252:8080
Hit CTRL-C to stop the server
----
```

#### [Hexo配置文件说明](https://hexo.io/zh-cn/docs/configuration)

#### [使用自定义域名设置静态网站托管](https://help.aliyun.com/document_detail/67323.html?spm=a2c4g.11186623.6.727.3801300eqvf77G)


#### 打包并启动服务脚本
``` bash
#/bin/bash
hexo clean
hexo generate
cd public
# cnpm install -g http-server
http-server
```

#### 自动发布当前public下文件到阿里云oss脚本
``` bash
cnpm install dotenv # 安装包
cnpm install ali-oss # 安装包
touch .env # 新建env配置
---------------.env内容----------------------
AliyunOssBucket=libuhua-blog
AliyunOssRegion=oss-cn-beijing
AliyunOssAccessKeyId=LTAI4G3a8LZb5xuakEfJBq8z
AliyunOssAccessKeySecret=32l9RMR4HhLS1Uh9w8LLFKMELlYGMt
--------------------------------------------
node publish.js # 发布文件到oss
```