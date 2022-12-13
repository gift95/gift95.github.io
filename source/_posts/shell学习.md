---
title: shell学习
abbrlink: f8d5cfbe
date: 2022-12-05 10:46:38
tags: shell LINUX
---

# shell学习

## shell 变量

| 特殊变量    |                                                                                                                                  |
| ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 特殊变量    | 作用说明                                                                                                                             |
| $0      | 如果是：利用bash和sh执行脚本。则输入什么就输出什么；<br/>如果是：利用./或者是绝对路径执行脚本。则输入什么就输出什么；<br/>如果是：利用source或. 执行脚本。则输出-bash。                              |
| $n(n>0) | 获取当前执行的shell脚本的第n个参数值，n=1..9，如果n大于9用大括号括起来{10}，参数以空格隔开。                                                                          |
| $#      | 获取当前执行的shell脚本后面接的参数的总个数                                                                                                         |
| $?      | 上一个命令的执行结果（返回值）。0表示执行正确，1表示执行失败。2表示没有找到文件。这个变量最常用                                                                                |
| $$      | 获取当前shell的进程号                                                                                                                    |
| $*      | 获取当前shell的所有传参的参数，不加引号同$@;如果给$*加上双引号，例如: “$*”,则表示将所有的参数视为单个字符串，相当于“12$3”。                                                        |
| $@      | 获取当前shell的所有传参的参数，不加引号同$*;如果给$@加上双引号，例如: “$@”,则表示将所有参数视为不同的独立字符串，相当于“$1” “$2” “$3” “……”，这是将参数传递给其他程序的最佳方式，因为他会保留所有内嵌在每个参数里的任何空白。 |

## 读取文件

#### do...done < $config

一个shell脚本：

```shell
config=/usr/config.ini

...

while read server ip

...

done < $config
```

while循环结构如下：

```shell
while 条件
do
...
done
```

应该前面还有个do的。这是固定结构，满足条件就会一直循环下去。

因为最后有输入重定向符号<，将整个while循环条件的输入指定为config变量定义的文件。所以，read会逐行读取这个文件中的字段（每行两个字段）分别作为server和ip。 

需要注意的是，config.ini文件中的标题行也会被读入。 

man read，说明中可以看到，如果读成功的话，read返回读取的字节数；读到文件的末尾则返回0。而对于while来讲，条件为0表示为false，则退出循环。  

## linux shell 字符串操作详解 （长度，读取，替换，截取，连接，对比，删除，位置 ）

![](https://js.hnlyx.top/img/202212081114174.jpg)

![](https://js.hnlyx.top/img/202212081114783.jpg)

### 1.Linux shell 截取字符变量的前8位

实现方法有如下几种：  

```shell
- expr substr “$a” 1 8
- echo $a|awk ‘{print substr(,1,8)}’
- echo $a|cut -c1-8
- echo $
- expr $a : ‘\(.\\).*’
- echo $a|dd bs=1 count=8 2>/dev/null
```

### 2.按指定的字符串截取

(1)第一种方法:  

从左向右截取最后一个string后的字符串  

```shell
${varible##*string} 
从左向右截取第一个string后的字符串 ${varible#*string}  
从右向左截取最后一个string后的字符串  
${varible%%string*} 
从右向左截取第一个string后的字符串 ${varible%string*}  
“*”只是一个通配符可以不要
```

请看下面的例子：  

```shell
$ MYVAR=foodforthought.jpg 
$ echo ${MYVAR##*fo}
rthought.jpg 
$ echo ${MYVAR#*fo}
odforthought.jpg
```

(2)第二种方法：  

${varible:n1:n2}:截取变量varible从n1开始的n2个字符，组成一个子字符串。可以根据特定字符偏移和长度，使用另一种形式的变量扩展，来选择特定子字符串。试着在 bash 中输入以下行：  

```shell
$ EXCLAIM=cowabunga 
$ echo ${EXCLAIM:0:3}
cow 
$ echo ${EXCLAIM:3:7}
abunga
```

这种形式的字符串截断非常简便，只需用冒号分开来指定起始字符和子字符串长度。  

### 3.按照指定要求分割：

比如获取后缀名

ls -al | cut -d “.” -f2

小结：shell对应字符串的处理方法很多，根据需求灵活选择。

在做shell批处理程序时候，经常会涉及到字符串相关操作。有很多命令语句，如：awk,sed都可以做字符串各种操作。 其实shell内置一系列操作符号，可以达到类似效果，大家知道，使用内部操作符会省略启动外部程序等时间，因此速度会非常的快。

#### **一、判断读取字符串值**

> 表达式 含义
> 
> | ${var}          | 变量var的值, 与$var相同                       |
> | --------------- | -------------------------------------- |
> | ${var-DEFAULT}  | 如果var没有被声明, 那么就以$DEFAULT作为其值 *         |
> | ${var:-DEFAULT} | 如果var没有被声明, 或者其值为空, 那么就以$DEFAULT作为其值 * |
> | ${var=DEFAULT}  | 如果var没有被声明, 那么就以$DEFAULT作为其值 *         |
> | ${var:=DEFAULT} | 如果var没有被声明, 或者其值为空, 那么就以$DEFAULT作为其值 * |
> | ${var+OTHER}    | 如果var声明了, 那么其值就是$OTHER, 否则就为null字符串    |
> | ${var:+OTHER}   | 如果var被设置了, 那么其值就是$OTHER, 否则就为null字符串   |
> | ${var?ERR_MSG}  | 如果var没被声明, 那么就打印$ERR_MSG *             |
> | ${var:?ERR_MSG} | 如果var没被设置, 那么就打印$ERR_MSG *             |
> | ${!varprefix*}  | 匹配之前所有以varprefix开头进行声明的变量              |
> | ${!varprefix@}  | 匹配之前所有以varprefix开头进行声明的变量              |

加入了“*”  不是意思是： 当然, 如果变量var已经被设置的话, 那么其值就是$var.

#### **二、字符串操作（长度，读取，替换）**

> 表达式 
> 
> | ${`#`string}                     | $string的长度                                                    |
> | -------------------------------- | ------------------------------------------------------------- |
> | ${string:position}               | 在$string中, 从位置$position开始提取子串                                 |
> | ${string:position:length}        | 在$string中, 从位置$position开始提取长度为$length的子串                      |
> | ${string#substring}              | 从变量$string的开头, 删除最短匹配$substring的子串                            |
> | ${string##substring}             | 从变量$string的开头, 删除最长匹配$substring的子串                            |
> | ${string%substring}              | 从变量$string的结尾, 删除最短匹配$substring的子串                            |
> | ${string%%substring}             | 从变量$string的结尾, 删除最长匹配$substring的子串                            |
> | ${string/substring/replacement}  | 使用$replacement, 来代替第一个匹配的$substring                           |
> | ${string//substring/replacement} | 使用$replacement, 代替*所有*匹配的$substring                           |
> | ${string/#substring/replacement} | 如果$string的*前缀*匹配$substring, 那么就用$replacement来代替匹配到的$substring |
> | ${string/%substring/replacement} | 如果$string的*后缀*匹配$substring, 那么就用$replacement来代替匹配到的$substring |

 实例：

```shell
1. $ echo ${abc-'ok'}  

2. ok  

3. $ echo $abc  

4. $ echo ${abc='ok'}  

5. ok  

6. $ echo $abc  

7. ok  

8. #如果abc 没有声明“=" 还会给abc赋值。  

9. $ var1=11;var2=12;var3=  

10. $ echo ${!v@}             

11. var1 var2 var3  

12. $ echo ${!v*}  

13. var1 var2 var3  

14. #${!varprefix*}与${!varprefix@}相似，可以通过变量名前缀字符，搜索已经定义的变量,无论是否为空值。  
```

##### **1，取得字符串长度**

```shell
- string=abc12342341          //等号二边不要有空格  
- echo ${#string}             //结果11  
- expr length $string         //结果11  
- expr "$string" : ".*"       //结果11 分号二边要有空格,这里的:根match的用法差不多
```

##### **2，字符串所在位置**

```shell
1. expr index $string '123'    //结果4 字符串对应的下标是从1开始的   

1. str="abc"  
2. expr index $str "a"  # 1  
3. expr index $str "b"  # 2  
4. expr index $str "x"  # 0  
5. expr index $str ""   # 0
```

这个方法让我想起来了js的indexOf，各种语言对字符串的操作方法大方向都差不多，如果有语言基础的话，学习shell会很快的。

##### **3，从字符串开头到子串的最大长度**

```shell
1. expr match $string 'abc.*3' //结果9    
```

 

个人觉得这个函数的用处不大，为什么要从开头开始呢。

##### **4，字符串截取**

```shell
1. echo ${string:4}      //2342341  从第4位开始截取后面所有字符串    

2. echo ${string:3:3}    //123      从第3位开始截取后面3位    

3. echo ${string:3:6}    //123423   从第3位开始截取后面6位    

4. echo ${string: -4}    //2341  ：右边有空格   截取后4位    

5. echo ${string:(-4)}   //2341  同上    

6. expr substr $string 3 3   //123  从第3位开始截取后面3位    

7. str="abcdef"  

8. expr substr "$str" 1 3  # 从第一个位置开始取3个字符， abc  

9. expr substr "$str" 2 5  # 从第二个位置开始取5个字符， bcdef   

10. expr substr "$str" 4 5  # 从第四个位置开始取5个字符， def  

11. echo ${str:2}           # 从第二个位置开始提取字符串， bcdef  

12. echo ${str:2:3}         # 从第二个位置开始提取3个字符, bcd  

13. echo ${str:(-6):5}        # 从倒数第二个位置向左提取字符串, abcde  

14. echo ${str:(-4):3}      # 从倒数第二个位置向左提取6个字符, cde  
```

上面的方法让我想起了，php的substr函数，后面截取的规则是一样的。

##### **5，匹配显示内容**

```shell
1. //例3中也有match和这里的match不同，上面显示的是匹配字符的长度，而下面的是匹配的内容    
2. expr match $string '\([a-c]*[0-9]*\)'  //abc12342341    
3. expr $string : '\([a-c]*[0-9]\)'       //abc1    
4. expr $string : '.*\([0-9][0-9][0-9]\)' //341 显示括号中匹配的内容    
```

这里括号的用法，是不是根其他的括号用法有相似之处呢，

##### **6，截取不匹配的内容**

```shell
1. echo ${string#a*3}     //42341  从$string左边开始，去掉最短匹配子串    
2. echo ${string#c*3}     //abc12342341  这样什么也没有匹配到    
3. echo ${string#*c1*3}   //42341  从$string左边开始，去掉最短匹配子串    
4. echo ${string##a*3}    //41     从$string左边开始，去掉最长匹配子串    
5. echo ${string%3*1}     //abc12342  从$string右边开始，去掉最短匹配子串    
6. echo ${string%%3*1}    //abc12     从$string右边开始，去掉最长匹配子串    

1. str="abbc,def,ghi,abcjkl"  

2. echo ${str#a*c}     # 输出,def,ghi,abcjkl  一个井号(#) 表示从左边截取掉最短的匹配 (这里把abbc字串去掉）  

3. echo ${str##a*c}    # 输出jkl，             两个井号(##) 表示从左边截取掉最长的匹配 (这里把abbc,def,ghi,abc字串去掉)  

4. echo ${str#"a*c"}   # 输出abbc,def,ghi,abcjkl 因为str中没有"a*c"子串  

5. echo ${str##"a*c"}  # 输出abbc,def,ghi,abcjkl 同理  

6. echo ${str#*a*c*}   # 空  

7. echo ${str##*a*c*}  # 空  

8. echo ${str#d*f)     # 输出abbc,def,ghi,abcjkl,   

9. echo ${str#*d*f}    # 输出,ghi,abcjkl     

10. echo ${str%a*l}     # abbc,def,ghi  一个百分号(%)表示从右边截取最短的匹配   

11. echo ${str%%b*l}    # a             两个百分号表示(%%)表示从右边截取最长的匹配  

12. echo ${str%a*c}     # abbc,def,ghi,abcjkl    
```

这里要注意，必须从字符串的第一个字符开始，或者从最后一个开始，可以这样记忆, 井号（#）通常用于表示一个数字，它是放在前面的；百分号（%）卸载数字的后面; 或者这样记忆，在键盘布局中，井号(#)总是位于百分号（%）的左边(即前面)  。

##### **7，匹配并且替换**

```shell
1. echo ${string/23/bb}   //abc1bb42341  替换一次    

2. echo ${string//23/bb}  //abc1bb4bb41  双斜杠替换所有匹配    

3. echo ${string/#abc/bb} //bb12342341   #以什么开头来匹配，根php中的^有点像    

4. echo ${string/%41/bb}  //abc123423bb  %以什么结尾来匹配，根php中的$有点像   

5. str="apple, tree, apple tree"  

6. echo ${str/apple/APPLE}   # 替换第一次出现的apple  

7. echo ${str//apple/APPLE}  # 替换所有apple  

8. echo ${str/#apple/APPLE}  # 如果字符串str以apple开头，则用APPLE替换它  

9. echo ${str/%apple/APPLE}  # 如果字符串str以apple结尾，则用APPLE替换它  



1. $ test='c:/windows/boot.ini'  

2. $ echo ${test/\//\\}  

3. c:\windows/boot.ini  

4. $ echo ${test//\//\\}  

5. c:\windows\boot.ini  

6. #${变量/查找/替换值} 一个“/”表示替换第一个，”//”表示替换所有,当查找中出现了：”/”请加转义符”\/”表示。  
```

##### **8. 比较**

```shell
[[ "a.txt" == a* ]]        # 逻辑真 (pattern matching)  
[[ "a.txt" =~ .*\.txt ]]   # 逻辑真 (regex matching)  
[[ "abc" == "abc" ]]       # 逻辑真 (string comparision)   
[[ "11" < "2" ]]           # 逻辑真 (string comparision), 按ascii值比较
#在shell脚本中，使用-eq、-ne、-gt、-ge、-lt、-le进行整数的比较。
#这些符号只能用于整数的比较，不能用于字符串。
#英文意思分别为：
-eq ：equal（相等）
-ne ：not equal（不等） 
-gt  ：greater than（大于）
-ge ：greater than or equal（大于或等于）
-lt   ：less than（小于）
-le  ：less than or equal（小于或等于）
```

 

##### **9. 连接**

```shell
1. s1="hello"  
2. s2="world"  
3. echo ${s1}${s2}   # 当然这样写 $s1$s2 也行，但最好加上大括号  
```

##### **10. 字符串删除**

```shell
1. $ test='c:/windows/boot.ini'  

2. $ echo ${test#/}  

3. c:/windows/boot.ini  

4. $ echo ${test#*/}  

5. windows/boot.ini  

6. $ echo ${test##*/}  

7. boot.ini  

8. $ echo ${test%/*} 

9. c:/windows 

10. $ echo ${test%%/*} 

11. #${变量名#substring正则表达式}从字符串开头开始配备substring,删除匹配上的表达式。 

12. #${变量名%substring正则表达式}从字符串结尾开始配备substring,删除匹配上的表达式。 

13. #注意：${test##*/},${test%/*} 分别是得到文件名，或者目录地址最简单方法。
```
