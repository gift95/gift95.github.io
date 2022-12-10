---
title: Vue简单学习
abbrlink: 91c8a1f4
date: 2022-12-07 19:58:27
tags: Vue
---

# Vue 常用指令(掌握)

## 1.Vue 常用指令介绍

### 学习目标

- 理解什么是Vue 指令
- 掌握如何使用Vue指令
- 能够说出常见的Vue指令

### 内容讲解

【1】Vue 指令介绍

在vue中指令是作用在视图中的即html标签，可以在视图中增加一些指令来设置html标签的某些属性和文本。

指令都是以带有 v- 前缀的特殊属性。

【2】使用Vue指令

使用指令时，通常编写在标签的属性上，值可以使用 JS 的表达式。

【3】常见的Vue指令

![image-20210124094135320](https://js.hnlyx.top/img/image-20210124094135320.png)

### 内容小结

1.使用Vue指令注意事项

1）就是vue中的常见指令都是必须书写在html标签的属性中，在属性值中书写js代码。

2）vue中的指令只能使用在视图中，不能使用在脚本。

## 2.文本插值v-html

### 学习目标

- 能够使用文本插值
- 理解文本插值和插值表达式区别

### 内容讲解

【1】文本插值使用格式

```html
<标签名 v-html="vue中data的key"></标签名>
说明：文本插值v-html通过data的key获取value显示标签的文本中
【2】需求：使用文本插值v-html和插值表达式{{}}获取vue中data数据
```



【3】步骤：

> 1.在素材中找到文本插值的代码
> 
> 2.使用文本插值获取vue中的数据
> 
> 3.打开浏览器查看结果

【4】代码实现:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文本插值</title>
</head>
<body>
<!--视图-->
<div id="div">
    <div>{{msg}}</div>
    <!--使用文本插值指令：v-html-->
    <div v-html="msg"></div>
    <div v-text="msg"></div>
</div>
</body>
<script src="js/vue.js"></script>
<script>
    //脚本
    new Vue({
        el:"#div",
        data:{
            msg:"<h1>Hello Vue</h1>"
        }
    });
</script>
</html>
```

### 内容小结

1.使用文本插值，v-html 用来获取vue中的数据，将数据放到标签的文本中，并且解析标签。

```html
<标签名 v-html="data中的key"></标签名>
```

2.v-html于v-text和插值表达式的区别

> **1.v-html称为文本插值，属于指令，解析html标签**
> 
> 2.插值表达式：{{data中的key}},不解析html标签
> 
> 3.v-text：属于指令，但是不解析html标签 了解

## 3.绑定属性  v-bind:属性名或者    :属性名  (重点)

### 学习目标

- 能够使用绑定属性的完整写法和简写

### 内容讲解

【1】绑定属性格式

```html
完整写法
<标签名 v-bind:属性名="data中key"></标签名>
简写：常用 *****
<标签名 :属性名="data中key"></标签名>
```

【2】需求：给html标签绑定属性

【3】步骤：

> 1.在素材中找到绑定属性的代码
> 
> 2.给html标签绑定属性，获取vue的data值作为属性值
> 
> 3.打开浏览器查看结果
```html
【4】代码实现:使用文本插值v-html和插值表达式{{}}获取vue中data数据


<!DOCTYPE html>
<html lang="en" xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>绑定属性</title>
    <style>
        .my{
            border: 1px solid red;
        }
    </style>
</head>

<body>
    <div id="div">
        <!--
            插件表达式不能写在属性中
        -->
        <a href="{{url}}">百度一下</a>

        <br>
        <!--
            v-bind：为 HTML 标签绑定属性值
        -->
        <a v-bind:href="url">百度一下</a>
        <br>
        <!--
            v-bind 可以省略不写
        -->
        <a :href="url">百度一下</a>
        <br>
        <!--
            也可以绑定其他属性
            给当前div标签绑定一个class属性，属性值通过data中的keycls获取到my，
            这里相当于
             <div class="my">我是div</div>
        -->
        <div :class="cls">我是div</div>
    </div>
</body>
<script src="js/vue.js"></script>
<script>
    new Vue({
        el:"#div",
        data:{
            url:"http://www.baidu.com",
            cls:"my"
        }
    });
</script>
</html>
```

### 内容小结

1.绑定属性格式：

```html
完整写法：
<标签名 v-bind:属性名="data中的key"></标签名>
简写：重点记忆
<标签名 :属性名="data中的key"></标签名>
```

## 4.条件渲染v-if

### 学习目标

- 能够使用条件渲染v-if

### 内容讲解

【1】条件渲染v-if格式

```html
<标签名 v-if="条件表达式">满足条件显示的内容</标签名>
<标签名 v-else-if="条件表达式">满足条件显示的内容</标签名>
<标签名 v-else>上述条件都不满足执行的内容</标签名>
```

【2】需求：判断vue中data的某个变量的值，对3取余，余数为0显示div1，余数为1显示div2，否则显示div3

【3】步骤

> 1.在素材中找到条件渲染的代码
> 
> 2.在html中获取vue中data的数据并判断，显示结果
> 
> 3.打开浏览器查看结果

【4】代码实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>条件渲染</title>
</head>
<body>
    <div id="div">
        <!-- 判断num的值，对3取余
            余数为0显示div1
            余数为1显示div2
            余数为2显示div3 -->
        <div v-if="num % 3 == 0">div1</div>
        <div v-else-if="num % 3 == 1">div2</div>
        <!--注意：如果不满足上述条件，则执行v-else，这里不用书写判断条件-->
        <div v-else>div3</div>


    </div>
</body>
<script src="js/vue.js"></script>
<script>
    new Vue({
        el:"#div",
        data:{
            num:2,
           flag:true
        }
    });
</script>
</html>
```

### 内容小结

1.条件渲染：v-if

```html
<标签名 v-if="条件表达式">如果条件表达式为true则执行文本内容，如果为false则向下继续判断</标签名>
<标签名 v-else-if="条件表达式">如果条件表达式为true则执行文本内容，如果为false则向下继续判断</标签名>
....
<标签名 v-else>如果上述条件都为false则执行该文本</标签名>
注意：v-else，这里不用书写判断条件
```

## 5.条件渲染v-show

### 学习目标

- 能够使用条件渲染v-show
- 能够说出v-show和v-if区别

### 内容讲解

【1】条件渲染v-show格式

```html
<标签名 v-show="data中的key"></标签名>
说明：
1.如果data中的key的值是true，则显示标签文本内容，如果是false则不显示标签文本内容
```

【2】需求：获取Vue中data的布尔类型数据并显示

【3】步骤：

> 1.在素材中找到条件渲染的代码
> 
> 2.在html中获取vue中data的数据并判断，显示结果
> 
> 3.打开浏览器查看结果

【4】代码实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>条件渲染</title>
</head>
<body>
<div id="div">

    <!--v-show指令-->
    <div v-show="flag">div4</div>

    <!--
       v-if  v-show 他们俩虽然都是控制元素是否显示，但是底层的原理不一样
           v-if 如果条件为false，页面中根本没有这个元素
           v-show如果条件为false，页面中有这个元素只不过它的display属性值为none
   -->
</div>
</body>
<script src="js/vue.js"></script>
<script>
    new Vue({
        el: "#div",
        data: {
            num: 2,
            flag: false
        }
    });
</script>
</html>
```

### 内容小结

1.条件渲染v-show

```html
<标签名 v-show="data中的key"></标签名>
```

2.v-show和v-if区别

> 1.v-if：如果条件不满足，那么在页面中没有任何标签内容，直接删除
> 
> 2.v-show:如果条件不满足，是通过设置css样式的属性display，设置属性值为none来隐藏标签，标签还在页面中，只是我们看不见

## 6.列表渲染 v-for

### 学习目标

- 掌握如何使用v-for指令

### 内容讲解

【1】格式

```html
增强for循环：掌握
<标签名 v-for="x in 数组或者对象名或者集合名">
     {{x}} 使用插值表达式获取元素
</标签名>

普通for循环：了解
<标签名 v-for="(x,index) in 数组或者对象名">
   元素:{{x}},索引:{{index}}
</标签名>
```

【2】作用：

遍历数组或者对象

【3】代码演示

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>列表渲染</title>
</head>
<body>
    <div id="div">
        <ul>
            <!--
               类似于增强for循环
               1. element是遍历得到的每一个元素(变量名可以自定义)
                   有一个作用域,它的作用于在当前的这个循环中
               2. names 是被遍历的数组或对象
               3.我们在标签文本中使用插值表达式根据遍历数组的每个元素的变量element获取对应数据
              -->
            <!--需求：遍历names数组-->
            <li v-for="element in names">
                {{element}}
            </li>
            <!--需求：遍历对象student-->
            <!--
                1.stu 表示对象中的每组数据 :张三 23
                2.student表示遍历的对象名
            -->
            <li v-for="stu in student">
                {{stu}}
            </li>
            <!--
                类似于普通for循环(了解)
            -->
            <!--需求：遍历names数组-->
            <!--
                1.element表示数组的元素
                2.index表示数组中的索引
            -->
            <li v-for="(element,index) in names">
                元素:{{element}},索引:{{index}}
            </li>
            <!--需求：遍历对象student-->
            <!--
                结果：
                元素:张三,索引:name
                元素:23,索引:age
                注意：在vue中使用v-for遍历对象时，使用普通for循环遍历，索引是对象中的key或者变量
            -->
            <li v-for="(element,index) in student">
                元素:{{element}},索引:{{index}}
            </li>
        </ul>
    </div>
</body>
<script src="js/vue.js"></script>
<script>
    new Vue({
        el:"#div",
        data:{
            //数组
            names:["张三","李四","王五"],
            //对象
            student:{
                name:"张三",
                age:23
            }
        }
    });
</script>
</html>
```

### 内容小结

1.列表渲染主要用来遍历容器或者对象

**2.使用格式：掌握**

```html
类似于增强for：
<li v-for="元素 in 容器名或者对象名">
    {{元素}}
</li>
```

说明：取出列表渲染中的元素使用插值表达式。

3.使用格式：了解

```html
<li v-for="(元素,索引) in 容器名或者对象名">
    {{元素}}
</li>
```

说明：如果遍历的是对象，那么会将对象中的key作为索引返回。

## 7.事件绑定 v-on:事件名或者@事件名(重点)

### 学习目标

- 掌握vue视图的事件绑定

### 内容讲解

【1】格式

```html
<标签名 v-on:事件名="调用的是vue中的js函数"></标签名>
简写：掌握
<标签名 @事件名="调用的是vue中的js函数"></标签名>
说明：
1.在vue中绑定的事件名都是将原生js的事件名去掉on:click  blur...
```

【2】需求：给视图绑定事件

【3】代码实现

```html
<!DOCTYPE html>
<html lang="en" xmlns:v-on="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>事件绑定</title>
</head>

<body>
    <div id="div">
        <div>{{name}}</div>

        <!--
            v-on：为 HTML 标签绑定事件
        -->
        <button onclick="fn();">以前方式_单击_改变div的内容</button>
        <!--
            1.v-on:click="change();" 给当前标签即视图绑定一个单击事件，在事件的属性值中直接调用vue中的函数change()
        -->
        <button v-on:click="change();">单击_改变div的内容</button>
        <button v-on:dblclick="change();">双击_改变div的内容</button>

        <button @click="change();">简写_改变div的内容</button>
    </div>
</body>
<script src="js/vue.js"></script>
<script>
    let ve = new Vue({
        el:"#div",
        data:{
            name:"黑马程序员"
        },
        methods:{
            change(){
                this.name = "传智播客";
            }
        }
    });

    //定义原生js函数
    function fn() {
        //调用vue中的函数change
        ve.change();
    }
</script>
</html>
```

### 内容小结

1.vue的事件绑定：

```html
 <button v-on:事件名="调用vue中的函数">xxx</button>
简写： 经常使用
 <button @事件名="调用vue中的函数">xxx</button>
```

2.vue中使用的事件名是将原生js中的事件名中的on给去掉

## 8.表单绑定v-model(重点) 非常重要

### 学习目标

- 能够使用v-model表单绑定指令
- 能够理解v-model表单绑定指令的作用

### 内容讲解

【1】v-model表单绑定作用：

可以实现双向数据绑定：

```html
1）vue中的data数据更改，然后视图中的显示内容也会随着改变
2）视图中的内容改变，vue中的data数据也会随着改变
```

单向数据绑定：

```html
vue中的data数据更改，然后视图中的显示内容也会随着改变
```

【2】v-model表单绑定实现双向数据绑定的原理：

**MVVM模型(Model,View,ViewModel)：是MVC模式的改进版**
在前端页面中，JS对象表示Model，页面表示View，两者做到了最大限度的分离。
将Model和View关联起来的就是ViewModel，它是桥梁。
ViewModel负责把Model的数据同步到View显示出来，还负责把View修改的数据同步回Model。

![image-20210124111302902](https://js.hnlyx.top/img/image-20210124111302902.png)

【3】

在vue中实现双向数据绑定使用表单绑定：v-model.

```html
<!DOCTYPE html>
<html lang="en" xmlns:v-bind="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>表单绑定</title>
</head>
<body>
    <div id="div">
        <form autocomplete="off">
            <!--
                单向绑定
            -->
            <!--
                :value="username" 表示给当前input标签绑定value属性，username是vue中data的key
            -->
            姓名_单向绑定：<input type="text" name="username" :value="username">
            <br>
            <!--
                双向绑定
                1.v-model="username":表示给当前input标签进行双向数据绑定，显示到输入框中，
                直接根据key即username获取value
            -->
            姓名_双向绑定：<input type="text" name="username" v-model="username">
            <br>
            年龄：<input type="number" name="age" v-model="age">
            性别:<input type="text" name="gender" v-model="gender">

        </form>
            {{username}}
        <hr>
    </div>
</body>
<script src="js/vue.js"></script>
<script>
    new Vue({
        el:"#div",
        data:{
            username:"张三",
            age:23,
            gender:"男"
        }
    });
</script>
</html>
```

### 内容小结

**1.表单绑定：v-model可以实现双向数据绑定。**

2.双向数据绑定：

![image-20210510110020380](https://js.hnlyx.top/img/image-20210510110020380.png)

```html
vue中的data数据改变，视图也会随着改变 --- 单向绑定
视图改变，vue中的data中的数据也会改变
```

3.使用格式：

```html
姓名_双向绑定：<input type="text" name="username" v-model="data中的变量名">
```

## 9.指令小结

1.文本插值：将data中的变量名表示的值解析到文本中

注意：可以解析html标签

```html
<div v-html="data中的变量名"></div>
<div v-html="username"></div>
实现效果：
<div>锁哥</div>
data:{
    username:"锁哥"
}
```

2.绑定属性：

```html
<input v-bind:属性名="data中的变量名"/> 可以绑定任意属性
简写：使用较多
<input :属性名="data中的变量名" />
```

3.条件渲染：

```html
<li v-if="条件表达式">文本1</li>
<li v-else-if="条件表达式">文本2</li>
....
<li v-else>文本</li>


<li v-show="条件表达式">文本</li>
如果条件表达式为true则显示文本，为false则给标签添加css样式即display:none 隐藏
```

4.列表渲染：

```html
<li v-for="元素 in 容器或者对象名">
    {{元素}}
</li>

<li v-for="(元素,索引) in 数组名或者对象名">
    {{元素}}
</li>
```

5.事件绑定：

```html
<button v-on:事件名="调用vue中的函数">
    单击
</button>
简写：经常使用,去掉原生js的事件名中的on
<button @事件名="调用vue中的函数">
    单击
</button>
```

**6.表单绑定 ：实现双向数据绑定。视图改变，data数据改变。data数据改变，视图也改变。**

```html
<input v-model="data中的变量名"/>
```
