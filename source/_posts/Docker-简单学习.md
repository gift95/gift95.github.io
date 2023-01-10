---
title: Docker 简单学习
tags: Docker
abbrlink: 72970fee
date: 2023-01-10 18:22:57
---



Docker: 容器化技术
    作用: 可以实现软件环境的快速迁移与恢复
docker原理:
	先将软件依赖的一切打成镜像
    运行镜像成容器,从而恢复软件的正常使用
    容器在运行时直接基于宿主机的内核运行
docker名词:
	镜像: 将软件/应用依赖的一切进行打包,打好的包叫做镜像
	容器: 镜像运行后生成容器,镜像就是在容器内运行的. 容器与容器之间相互隔离互补干扰,遵循沙箱机制.
        外界访问容器的方式:
			在运行容器时,给容器绑定宿主机端口
        容器跟容器之间相互访问:
			在Linux中创建虚拟网络,将容器加入到虚拟网络中,加入的容器就可以根据容器名称相互访问了.
	宿主机:
		容器运行的载体,容器在哪个Linux上运行,Linux就是容器的宿主机
	镜像服务:
		Docker官方提供了很多镜像,这些镜像存放在镜像服务中,使用时直接通过docker命令拉取即可.
        镜像仓库: 一款软件对应一个镜像仓库
            镜像: 
				软件名称:tag
	数据卷:
		本质上就是宿主机上的一个文件夹,可以实现数据与容器相分离
**docker相关命令:**

```Linux
镜像命令:
		docker images
        docker pull 镜像名称:tag
        docker push 镜像名称
        docker rmi 镜像名称
        docker save -o 包名.tar 镜像名称
        docker build -t 镜像名称 .
    容器命令:
		docker run \
            --name 容器名称 \
            -d \
            -p 宿主机端口:容器内软件端口 \
            -v 数据卷名称:容器内的文件夹 \
            镜像名称
        docker ps
        docker ps -a
        docker rm 容器名称
        docker rm -f 容器名称
        docker logs 容器名称
        docker stop 容器名称
        docker start 容器名称
        docker restart 容器名称
        docker exec -it 容器名称 bash
    数据卷命令:
		docker volume ls
        docker volume inspect 数据卷名称
        docker volume rm 数据卷名称
        docker volume prune
        docker volume create 数据卷名称
    操作虚拟网络的命令:
		docker network ls
        docker network inspect 数据卷名称
        docker network rm 数据卷名称
        docker network prune
        docker network create 数据卷名称
docker-compose:
	实现容器编排.
```



​	
