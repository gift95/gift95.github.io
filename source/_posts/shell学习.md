---
title: shell学习
abbrlink: f8d5cfbe
date: 2022-12-05 10:46:38
tags: shell LINUX
---



## shell

### do...done < $config

一个shell脚本：

```shell
config=/usr/config.ini

...

while read server ip

...

done < $config
```

while循环结构如下：

while 条件

do

...

done

应该前面还有个do的。这是固定结构，满足条件就会一直循环下去。

因为最后有输入重定向符号<，将整个while循环条件的输入指定为config变量定义的文件。所以，read会逐行读取这个文件中的字段（每行两个字段）分别作为server和ip。 

需要注意的是，config.ini文件中的标题行也会被读入。 

man read，说明中可以看到，如果读成功的话，read返回读取的字节数；读到文件的末尾则返回0。而对于while来讲，条件为0表示为false，则退出循环。  
