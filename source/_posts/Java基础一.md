title: Java基础
abbrlink: 4b1fec93
tags:
  - JAVA基础
categories: []
author: yxliu
date: 2022-12-03 17:20:00
---

##  JAVA基础运算符

### &和&&

Java中&和&&都是逻辑与，需要左右两边同时满足条件才可以得到true的结果。但是，它们之间也有区别：

1、&&也叫短路与，当&&左边的条件不满足时，就不会判定右边的条件。而&不一样，无论‘&’左边的条件是否满足，它都会判定右边的条件。

2、&可用于位运算，当左右两边的条件不是布尔型，而是数字时，它会进行位运算。

​	2 & 3就是合法的，会进行位运算。

&与&&的异同点。
相同点：二者都表示与操作，当且仅当运算符两边的操作数都为true时，其结果才为true，否则为false。

不同点：在使用&进行运算时，不论左边为true或者false，右边的表达式都会进行运算。如果使用&&进行运算时，当左边为false时，右边的表达式不会进行运算，因此&&被称作短路与。

###  | 和 || 

|与||的相同点：二者都表示或操作，当运算符两边的操作数任何一边的值为true时，其结果为true，当两边的值都为false时，其结果才为false。

同与操作类似，||表示短路或，当运算符左边的值为true时，右边的表达式不会进行运算。 和& 与&& 不同点相同

在使用 | 进行运算时，不论左边为true或者false，右边的表达式都会进行运算。如果使用 || 进行运算时，当左边为false时，右边的表达式不会进行运算，因此&&被称作短路与。





```java
 	    int x = 1;
        int y = 1;


        if(x++==2 & ++y==2){
            x =7;
        }
        System.out.println("使用&时 x="+x+",y="+y);
		
        x = 1;y = 1;
        if(x++==2 && ++y==2){
            x =7;
        }
        System.out.println("使用&&时 x="+x+",y="+y);

        x = 1;y = 1;
        if(x++==1 | ++y==1){
            x =7;
        }
        System.out.println("使用 | 时 x="+x+",y="+y);

        x = 1;y = 1;
        if(x++==1 || ++y==1){
            x =7;
        }
        System.out.println("使用 || 时 x="+x+",y="+y);
```

结果：

```java
使用&时 x=2,y=2
使用&&时 x=2,y=1
使用 | 时 x=7,y=2
使用 || 时 x=7,y=1
```

Java基本数据类型

![](https://js.hnlyx.top/img/基本数据类型范围.jpg)



###  运算符优先级

![1553858424335](https://js.hnlyx.top/img/1553858424335.png)
