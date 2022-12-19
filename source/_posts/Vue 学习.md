---
title: Vue 学习
tags: Vue
top_img: /img/topic.jpg

abbrlink: 5106d60a
---

# 学习目标

- 会创建 Vue 实例，知道 Vue 的常见属性
- 会使用 Vue 的生命周期的钩子函数
- 会使用 vue 常见指令
- 会使用 vue 计算属性和 watch 监控
- 会编写 Vue 组件
- 掌握组件间通信
- 了解 vue-router 使用
- 了解 webpack 使用
- 会使用 vue-cli 搭建项目

# 0.前言

前几天我们已经对后端的技术栈有了初步的了解、并且已经搭建了整个后端微服务的平台。接下来要做的事情就是功能开发了。但是没有前端页面，我们肯定无从下手，因此今天我们就要来了解一下前端的一些技术，完成前端页面搭建。

先聊一下前端开发模式的发展。

> 静态页面

最初的网页以 HTML 为主，是纯静态的网页。网页是只读的，信息流只能从服务端到客户端单向流通。**开发人员也只关心页面的样式和内容**即可。

> 异步刷新，操作 DOM

1995 年，网景工程师 Brendan Eich 花了 10 天时间设计了 JavaScript 语言.

随着 JavaScript 的诞生，我们可以操作页面的 DOM 元素及样式，页面有了一些动态的效果，但是依然是以静态为主。

ajax 盛行：

- 2005 年开始，ajax 逐渐被前端开发人员所重视，因为不用刷新页面就可以更新页面的数据和渲染效果。
- 此时的**开发人员不仅仅要编写 HTML 样式，还要懂 ajax 与后端交互，然后通过 JS 操作 Dom 元素来实现页面动态效果**。比较流行的框架如 Jquery 就是典型代表。

> MVVM，关注模型和视图

2008 年，google 的 Chrome 发布，随后就以极快的速度占领市场，超过 IE 成为浏览器市场的主导者。

2009 年，Ryan Dahl 在谷歌的 Chrome V8 引擎基础上，打造了基于事件循环的异步 IO 框架：Node.js。

- 基于事件循环的异步 IO
- 单线程运行，避免多线程的变量同步问题
- JS 可以编写后台代码，前后台统一编程语言

node.js 的伟大之处不在于让 JS 迈向了后端开发，而是构建了一个庞大的生态系统。

2010 年，NPM 作为 node.js 的包管理系统首次发布，开发人员可以遵循 Common.js 规范来编写 Node.js 模块，然后发布到 NPM 上供其他开发人员使用。目前已经是世界最大的包模块管理系统。

随后，在 node 的基础上，涌现出了一大批的前端框架：

![1525825983230](http://js.hnlyx.top/img/1525825983230.png)

> MVVM 模式

- M：即 Model，模型，包括数据和一些基本操作
- V：即 View，视图，页面渲染结果
- VM：即 View-Model，模型与视图间的双向操作（无需开发人员干涉）

在 MVVM 之前，开发人员从后端获取需要的数据模型，然后要通过 DOM 操作 Model 渲染到 View 中。而后当用户操作视图，我们还需要通过 DOM 获取 View 中的数据，然后同步到 Model 中。

而 MVVM 中的 VM 要做的事情就是把 DOM 操作完全封装起来，开发人员不用再关心 Model 和 View 之间是如何互相影响的：

- 只要我们 Model 发生了改变，View 上自然就会表现出来。
- 当用户修改了 View，Model 中的数据也会跟着改变。

把开发人员从繁琐的 DOM 操作中解放出来，把关注点放在如何操作 Model 上。

![1525828854056](http://js.hnlyx.top/img/1525828854056.png)

而我们今天要学习的，就是一款 MVVM 模式的框架：Vue

# 1.认识 Vue

Vue (读音 /vjuː/，类似于 **view**) 是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与[现代化的工具链](https://cn.vuejs.org/v2/guide/single-file-components.html)以及各种[支持类库](https://github.com/vuejs/awesome-vue#libraries--plugins)结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

 前端框架三巨头：Vue.js、React.js、AngularJS，vue.js 以其轻量易用著称，vue.js 和 React.js 发展速度最快，AngularJS 还是老大。

官网：https://cn.vuejs.org/

参考：https://cn.vuejs.org/v2/guide/

![1525829249048](http://js.hnlyx.top/img/1525829249048.png)

Git 地址：https://github.com/vuejs

![1525829030730](http://js.hnlyx.top/img/1525829030730.png)

**尤雨溪**，Vue.js 创作者，Vue Technology 创始人，致力于 Vue 的研究开发。

# 2.Node 和 NPM

前面说过，NPM 是 Node 提供的模块管理工具，可以非常方便的下载安装很多前端框架，包括 Jquery、AngularJS、VueJs 都有。为了后面学习方便，我们先安装 node 及 NPM 工具。

## 2.1.下载 Node.js

下载地址：https://nodejs.org/en/

![1529594451775](http://js.hnlyx.top/img/1529594451775.png)

推荐下载 LTS 版本。

课程中采用的是 8.11.3 版本。也是目前最新的。大家自行下载或者使用课前资料中提供的安装包。然后下一步安装即可。

完成以后，在控制台输入：

```powershell
node -v
```

看到版本信息：

![1529595770482](assets/1529595770482.png)

## 2.2.NPM

Node 自带了 NPM 了，在控制台输入`npm -v`查看：

![1529595810923](http://js.hnlyx.top/img/1529595810923.png)

npm 默认的仓库地址是在国外网站，速度较慢，建议大家设置到淘宝镜像。但是切换镜像是比较麻烦的。推荐一款切换镜像的工具：nrm

我们首先安装 nrm，这里`-g`代表全局安装。可能需要一点儿时间

```
npm install nrm -g
```

![1529596099952](http://js.hnlyx.top/img/1529596099952.png)

然后通过`nrm ls`命令查看 npm 的仓库列表,带\*的就是当前选中的镜像仓库：

![1529596219439](http://js.hnlyx.top/img/1529596219439.png)

通过`nrm use taobao`来指定要使用的镜像源：

![1529596312671](http://js.hnlyx.top/img/1529596312671.png)

然后通过`nrm test npm `来测试速度：

![1529596566134](http://js.hnlyx.top/img/1529596566134.png)

注意：

- 有教程推荐大家使用 cnpm 命令，但是使用发现 cnpm 有时会有 bug，不推荐。
- 安装完成请一定要重启下电脑！！！
- 安装完成请一定要重启下电脑！！！
- 安装完成请一定要重启下电脑！！！

# 3.快速入门

接下来，我们快速领略下 vue 的魅力

## 3.1.创建工程

创建一个新的空工程：

![1529596874127](http://js.hnlyx.top/img/1529596874127.png)

![1529597228506](http://js.hnlyx.top/img/1529597228506.png)

然后新建一个 module：

![1529597325121](http://js.hnlyx.top/img/1529597325121.png)

选中 static web，静态 web 项目：

![1529597573453](http://js.hnlyx.top/img/1529597573453.png)

位置信息：

![1529597672429](http://js.hnlyx.top/img/1529597672429.png)

## 3.2.安装 vue

### 3.2.1.下载安装

下载地址：https://github.com/vuejs/vue

可以下载 2.5.16 版本https://github.com/vuejs/vue/archive/v2.5.16.zip

下载解压，得到 vue.js 文件。

### 3.2.2.使用 CDN

或者也可以直接使用公共的 CDN 服务：

```html
<!-- 开发环境版本，包含了用帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

或者：

```html
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

### 3.2.3.推荐 npm 安装

在 idea 的左下角，有个 Terminal 按钮，点击打开控制台：

![1529598030268](http://js.hnlyx.top/img/1529598030268.png)

进入 hello-vue 目录，先输入：`npm init -y` 进行初始化

![1529598244471](http://js.hnlyx.top/img/1529598244471.png)

安装 Vue，输入命令：`npm install vue --save`

![1529598444504](http://js.hnlyx.top/img/1529598444504.png)

然后就会在 hello-vue 目录发现一个 node_modules 目录，并且在下面有一个 vue 目录。

![1529602488684](http://js.hnlyx.top/img/1529602488684.png)

node_modules 是通过 npm 安装的所有模块的默认位置。

## 3.3.vue 入门案例

### 3.3.1.HTML 模板

在 hello-vue 目录新建一个 HTML

![1529719572523](http://js.hnlyx.top/img/1529719572523.png)

在 hello.html 中，我们编写一段简单的代码：

![1529719673944](http://js.hnlyx.top/img/1529719673944.png)

h2 中要输出一句话：xx 非常帅。前面的 xx 是要渲染的数据。

### 3.3.2.vue 声明式渲染

然后我们通过 Vue 进行渲染：

```html
<body>
  <div id="app">
    <h2>{{name}}，非常帅！！！</h2>
  </div>
</body>
<script src="node_modules/vue/dist/vue.js"></script>
<script>
  // 创建vue实例
  var app = new Vue({
    el: "#app", // el即element，该vue实例要渲染的页面元素
    data: {
      // 渲染页面需要的数据
      name: "峰哥",
    },
  });
</script>
```

- 首先通过 new Vue()来创建 Vue 实例
- 然后构造函数接收一个对象，对象中有一些属性：
  - el：是 element 的缩写，通过 id 选中要渲染的页面元素，本例中是一个 div
  - data：数据，数据是一个对象，里面有很多属性，都可以渲染到视图中
    - name：这里我们指定了一个 name 属性
- 页面中的`h2`元素中，我们通过{{name}}的方式，来渲染刚刚定义的 name 属性。

打开页面查看效果：

![1529722898366](http://js.hnlyx.top/img/1529722898366.png)

更神奇的在于，当你修改 name 属性时，页面会跟着变化：

![1529723206508](http://js.hnlyx.top/img/1529723206508.png)

### 3.3.3.双向绑定

我们对刚才的案例进行简单修改：

```html
<body>
  <div id="app">
    <input type="text" v-model="num" />
    <h2>{{name}}，非常帅！！！有{{num}}位女神为他着迷。</h2>
  </div>
</body>
<script src="node_modules/vue/dist/vue.js"></script>
<script>
  // 创建vue实例
  var app = new Vue({
    el: "#app", // el即element，该vue实例要渲染的页面元素
    data: {
      // 渲染页面需要的数据
      name: "峰哥",
      num: 5,
    },
  });
</script>
```

- 我们在 data 添加了新的属性：`num`
- 在页面中有一个`input`元素，通过`v-model`与`num`进行绑定。
- 同时通过`{{num}}`在页面输出

效果：

![1529723206508](http://js.hnlyx.top/img/52.gif)

我们可以观察到，输入框的变化引起了 data 中的 num 的变化，同时页面输出也跟着变化。

- input 与 num 绑定，input 的 value 值变化，影响到了 data 中的 num 值
- 页面`{{num}}`与数据 num 绑定，因此 num 值变化，引起了页面效果变化。

没有任何 dom 操作，这就是双向绑定的魅力。

### 3.3.4.事件处理

我们在页面添加一个按钮：

```html
<button v-on:click="num++">点我</button>
```

- 这里用`v-on`指令绑定点击事件，而不是普通的`onclick`，然后直接操作 num
- 普通 click 是无法直接操作 num 的。

效果：

![](http://js.hnlyx.top/img/53.gif)

# 4.Vue 实例

## 4.1.创建 Vue 实例

每个 Vue 应用都是通过用 `Vue` 函数创建一个新的 **Vue 实例**开始的：

```javascript
var vm = new Vue({
  // 选项
});
```

在构造函数中传入一个对象，并且在对象中声明各种 Vue 需要的数据和方法，包括：

- el
- data
- methods

等等

接下来我们一 一介绍。

## 4.2.模板或元素

每个 Vue 实例都需要关联一段 Html 模板，Vue 会基于此模板进行视图渲染。

我们可以通过 el 属性来指定。

例如一段 html 模板：

```html
<div id="app"></div>
```

然后创建 Vue 实例，关联这个 div

```js
var vm = new Vue({
  el: "#app",
});
```

这样，Vue 就可以基于 id 为`app`的 div 元素作为模板进行渲染了。在这个 div 范围以外的部分是无法使用 vue 特性的。

## 4.3.数据

当 Vue 实例被创建时，它会尝试获取在 data 中定义的所有属性，用于视图的渲染，并且监视 data 中的属性变化，当 data 发生改变，所有相关的视图都将重新渲染，这就是“响应式“系统。

html：

```html
<div id="app">
  <input type="text" v-model="name" />
</div>
```

js:

```js
var vm = new Vue({
  el: "#app",
  data: {
    name: "刘德华",
  },
});
```

- name 的变化会影响到`input`的值
- input 中输入的值，也会导致 vm 中的 name 发生改变

## 4.4.方法

Vue 实例中除了可以定义 data 属性，也可以定义方法，并且在 Vue 实例的作用范围内使用。

html:

```html
<div id="app">
  {{num}}
  <button v-on:click="add">加</button>
</div>
```

js:

```js
var vm = new Vue({
  el: "#app",
  data: {
    num: 0,
  },
  methods: {
    add: function () {
      // this代表的当前vue实例
      this.num++;
    },
  },
});
```

## 4.5.生命周期钩子

### 4.5.1.生命周期

每个 Vue 实例在被创建时都要经过一系列的初始化过程 ：创建实例，装载模板，渲染模板等等。Vue 为生命周期中的每个状态都设置了钩子函数（监听函数）。每当 Vue 实例处于不同的生命周期时，对应的函数就会被触发调用。

生命周期：

![Vue life cycle](http://js.hnlyx.top/img/lifecycle.png)

### 4.5.2.钩子函数

beforeCreated：我们在用 Vue 时都要进行实例化，因此，该函数就是在 Vue 实例化是调用，也可以将他理解为初始化函数比较方便一点，在 Vue1.0 时，这个函数的名字就是 init。

created：在创建实例之后进行调用。

beforeMount：页面加载完成，没有渲染。如：此时页面还是{{name}}

mounted：我们可以将他理解为原生 js 中的 window.onload=function({.,.}),或许大家也在用 jquery，所以也可以理解为 jquery 中的$(document).ready(function(){….})，他的功能就是：在 dom 文档渲染完毕之后将要执行的函数，该函数在 Vue1.0 版本中名字为 compiled。 此时页面中的{{name}}已被渲染成峰哥

beforeDestroy：该函数将在销毁实例前进行调用 。

destroyed：改函数将在销毁实例时进行调用。

beforeUpdate：组件更新之前。

updated：组件更新之后。

例如：created 代表在 vue 实例创建后；

我们可以在 Vue 中定义一个 created 函数，代表这个时期的钩子函数：

```js
// 创建vue实例
var app = new Vue({
  el: "#app", // el即element，该vue实例要渲染的页面元素
  data: {
    // 渲染页面需要的数据
    name: "峰哥",
    num: 5,
  },
  methods: {
    add: function () {
      this.num--;
    },
  },
  created: function () {
    this.num = 100;
  },
});
```

结果：

![1529835200236](http://js.hnlyx.top/img/1529835200236.png)

### 4.5.3.this

我们可以看下在 vue 内部的 this 变量是谁，我们在 created 的时候，打印 this

```js
        methods: {
            add: function(){
                this.num--;
                console.log(this);
            }
        },
```

控制台的输出：

![1529835379275](http://js.hnlyx.top/img/1529835379275.png)

# 5.指令

什么是指令？

指令 (Directives) 是带有  `v-`  前缀的特殊特性。指令特性的预期值是：**单个 JavaScript 表达式**。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。

例如我们在入门案例中的 v-on，代表绑定事件。

## 5.1.插值表达式

### 5.1.1.花括号

格式：

```
{{表达式}}
```

说明：

- 该表达式支持 JS 语法，可以调用 js 内置函数（必须有返回值）
- 表达式必须有返回结果。例如 1 + 1，没有结果的表达式不允许使用，如：var a = 1 + 1;
- 可以直接获取 Vue 实例中定义的数据或函数

示例：

HTML：

```html
<div id="app">{{name}}</div>
```

JS:

```js
var app = new Vue({
  el: "#app",
  data: {
    name: "Jack",
  },
});
```

### 5.1.2.插值闪烁

使用`{{}}`方式在网速较慢时会出现问题。在数据未加载完成时，页面会显示出原始的`{{}}`，加载完毕后才显示正确数据，我们称为插值闪烁。

我们将网速调慢一些，然后试试看刚才的案例：

![1529836021593](http://js.hnlyx.top/img/1529836021593.png)

刷新页面：

![](http://js.hnlyx.top/img/54.gif)

### 5.1.3.v-text 和 v-html

使用 v-text 和 v-html 指令来替代`{{}}`

说明：

- v-text：将数据输出到元素内部，如果输出的数据有 HTML 代码，会作为普通文本输出
- v-html：将数据输出到元素内部，如果输出的数据有 HTML 代码，会被渲染

示例：

HTML:

```html
<div id="app">
  v-text:<span v-text="hello"></span> <br />
  v-html:<span v-html="hello"></span>
</div>
```

JS:

```js
var vm = new Vue({
  el: "#app",
  data: {
    hello: "<h1>大家好，我是峰哥</h1>",
  },
});
```

效果：

![1529836688083](http://js.hnlyx.top/img/1529836688083.png)

并且不会出现插值闪烁，当没有数据时，会显示空白。

## 5.2.v-model

刚才的 v-text 和 v-html 可以看做是单向绑定，数据影响了视图渲染，但是反过来就不行。接下来学习的 v-model 是双向绑定，视图（View）和模型（Model）之间会互相影响。

既然是双向绑定，一定是在视图中可以修改数据，这样就限定了视图的元素类型。目前 v-model 的可使用元素有：

- input
- select
- textarea
- checkbox
- radio
- components（Vue 中的自定义组件）

基本上除了最后一项，其它都是表单的输入项。

举例：

html：

```html
<div id="app">
  <input type="checkbox" v-model="language" value="Java" />Java<br />
  <input type="checkbox" v-model="language" value="PHP" />PHP<br />
  <input type="checkbox" v-model="language" value="Swift" />Swift<br />
  <h1>你选择了：{{language.join(',')}}</h1>
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script type="text/javascript">
  var vm = new Vue({
    el: "#app",
    data: {
      language: [],
    },
  });
</script>
```

- 多个`CheckBox`对应一个 model 时，model 的类型是一个数组，单个 checkbox 值默认是 boolean 类型
- radio 对应的值是 input 的 value 值
- `input` 和`textarea` 默认对应的 model 是字符串
- `select`单选对应字符串，多选对应也是数组

效果：

![1529837541201](http://js.hnlyx.top/img/1529837541201.png)

## 5.3.v-on

### 5.3.1.基本用法

v-on 指令用于给页面元素绑定事件。

语法：

```
v-on:事件名="js片段或函数名"
```

示例：

```html
<div id="app">
  <!--事件中直接写js片段-->
  <button v-on:click="num++">增加一个</button><br />
  <!--事件指定一个回调函数，必须是Vue实例中定义的函数-->
  <button v-on:click="decrement">减少一个</button><br />
  <h1>有{{num}}个女神迷恋峰哥</h1>
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script type="text/javascript">
  var app = new Vue({
    el: "#app",
    data: {
      num: 100,
    },
    methods: {
      decrement() {
        this.num--;
      },
    },
  });
</script>
```

效果：

![](http://js.hnlyx.top/img/55.gif)

另外，事件绑定可以简写，例如`v-on:click='add'`可以简写为`@click='add'`

### 5.3.2.事件修饰符

在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题，Vue.js 为 `v-on` 提供了**事件修饰符**。修饰符是由点开头的指令后缀来表示的。

- `.stop` ：阻止事件冒泡到父元素
- `.prevent`：阻止默认事件发生
- `.capture`：使用事件捕获模式
- `.self`：只有元素自身触发事件才执行。（冒泡或捕获的都不执行）
- `.once`：只执行一次

阻止默认事件

```html
<div id="app">
  <!--右击事件，并阻止默认事件发生-->
  <button v-on:contextmenu.prevent="num++">增加一个</button>
  <br />
  <!--右击事件，不阻止默认事件发生-->
  <button v-on:contextmenu="decrement($event)">减少一个</button>
  <br />
  <h1>有{{num}}个女神迷恋峰哥</h1>
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script type="text/javascript">
  var app = new Vue({
    el: "#app",
    data: {
      num: 100,
    },
    methods: {
      decrement(ev) {
        // ev.preventDefault();
        this.num--;
      },
    },
  });
</script>
```

效果：（右键“增加一个”，不会触发默认的浏览器右击事件；右键“减少一个”，会触发默认的浏览器右击事件）

![](http://js.hnlyx.top/img/56.gif)

### 5.3.3.按键修饰符

在监听键盘事件时，我们经常需要检查常见的键值。Vue 允许为  `v-on`  在监听键盘事件时添加按键修饰符：

```html
<!-- 只有在 `keyCode` 是 13 时调用 `vm.submit()` -->
<input v-on:keyup.13="submit" />
```

记住所有的 `keyCode` 比较困难，所以 Vue 为最常用的按键提供了别名：

```html
<!-- 同上 -->
<input v-on:keyup.enter="submit" />

<!-- 缩写语法 -->
<input @keyup.enter="submit" />
```

全部的按键别名：

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

### 5.3.4.组合按钮

可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。

- `.ctrl`
- `.alt`
- `.shift`

例如：

```html
<!-- Alt + C -->
<input @keyup.alt.67="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

## 5.4.v-for

遍历数据渲染页面是非常常用的需求，Vue 中通过 v-for 指令来实现。

### 5.4.1.遍历数组

> 语法：

```
v-for="item in items"
```

- items：要遍历的数组，需要在 vue 的 data 中定义好。
- item：迭代得到的数组元素的别名

> 示例

```html
<div id="app">
  <ul>
    <li v-for="user in users">
      {{user.name}} - {{user.gender}} - {{user.age}}
    </li>
  </ul>
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script type="text/javascript">
  var app = new Vue({
    el: "#app",
    data: {
      users: [
        { name: "柳岩", gender: "女", age: 21 },
        { name: "峰哥", gender: "男", age: 18 },
        { name: "范冰冰", gender: "女", age: 24 },
        { name: "刘亦菲", gender: "女", age: 18 },
        { name: "古力娜扎", gender: "女", age: 25 },
      ],
    },
  });
</script>
```

效果：

![1530006198953](http://js.hnlyx.top/img/1530006198953.png)

### 5.4.2.数组角标

在遍历的过程中，如果我们需要知道数组角标，可以指定第二个参数：

> 语法

```
v-for="(item,index) in items"
```

- items：要迭代的数组
- item：迭代得到的数组元素别名
- index：迭代到的当前元素索引，从 0 开始。

> 示例

```html
<ul>
  <li v-for="(user, index) in users">
    {{index + 1}}. {{user.name}} - {{user.gender}} - {{user.age}}
  </li>
</ul>
```

> 效果：

![1530006094601](http://js.hnlyx.top/img/1530006094601.png)

### 5.4.3.遍历对象

v-for 除了可以迭代数组，也可以迭代对象。语法基本类似

> 语法：

```javascript
v-for="value in object"
v-for="(value,key) in object"
v-for="(value,key,index) in object"
```

- 1 个参数时，得到的是对象的属性
- 2 个参数时，第一个是属性，第二个是键
- 3 个参数时，第三个是索引，从 0 开始

> 示例：

```html
<div id="app">
  <ul>
    <li v-for="(value, key, index) in user">
      {{index + 1}}. {{key}} - {{value}}
    </li>
  </ul>
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script type="text/javascript">
  var vm = new Vue({
    el: "#app",
    data: {
      user: { name: "峰哥", gender: "男", age: 18 },
    },
  });
</script>
```

> 效果：

![1530006251975](http://js.hnlyx.top/img/1530006251975.png)

### 5.4.4.key

当 Vue.js 用  `v-for`  正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。

这个功能可以有效的提高渲染的效率。

但是要实现这个功能，你需要给 Vue 一些提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一  `key`  属性。理想的  `key`  值是每项都有的且唯一的 id。

示例：

```html
<ul>
  <li v-for="(item,index) in items" :key="index"></li>
</ul>
```

- 这里使用了一个特殊语法：`:key=""` 我们后面会讲到，它可以让你读取 vue 中的属性，并赋值给 key 属性
- 这里我们绑定的 key 是数组的索引，应该是唯一的

## 5.5.v-if 和 v-show

### 5.5.1.基本使用

v-if，顾名思义，条件判断。当得到结果为 true 时，所在的元素才会被渲染。

> 语法：

```
v-if="布尔表达式"
```

> 示例：

```html
<div id="app">
  <button v-on:click="show = !show">点我呀</button>
  <br />
  <h1 v-if="show">看到我啦？！</h1>
  <h1 v-show="show">看到我啦？！show</h1>
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script type="text/javascript">
  var app = new Vue({
    el: "#app",
    data: {
      show: true,
    },
  });
</script>
```

> 效果：

![](http://js.hnlyx.top/img/57.gif)

### 5.5.2.与 v-for 结合

当 v-if 和 v-for 出现在一起时，v-for 优先级更高。也就是说，会先遍历，再判断条件。

修改 v-for 中的案例，添加 v-if：

```html
<ul>
  <li v-for="(user, index) in users" v-if="user.gender == '女'">
    {{index + 1}}. {{user.name}} - {{user.gender}} - {{user.age}}
  </li>
</ul>
```

效果：

![1530013415911](http://js.hnlyx.top/img/1530013415911.png)

只显示女性用户信息

### 5.5.3.v-else

你可以使用 `v-else` 指令来表示 `v-if` 的“else 块”：

```html
<div id="app">
  <h1 v-if="Math.random() > 0.5">看到我啦？！if</h1>
  <h1 v-else>看到我啦？！else</h1>
</div>
```

`v-else` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别。

`v-else-if`，顾名思义，充当 `v-if` 的“else-if 块”，可以连续使用：

```html
<div id="app">
  <button v-on:click="random=Math.random()">点我呀</button
  ><span>{{random}}</span>
  <h1 v-if="random >= 0.75">看到我啦？！if</h1>
  <h1 v-else-if="random > 0.5">看到我啦？！if 0.5</h1>
  <h1 v-else-if="random > 0.25">看到我啦？！if 0.25</h1>
  <h1 v-else>看到我啦？！else</h1>
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script type="text/javascript">
  var app = new Vue({
    el: "#app",
    data: {
      random: 1,
    },
  });
</script>
```

类似于 `v-else`，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。

演示：

![1530013415911](http://js.hnlyx.top/img/58.gif)

### 5.5.4.v-show

另一个用于根据条件展示元素的选项是 `v-show` 指令。用法大致一样：

```
<h1 v-show="ok">Hello!</h1>
```

不同的是带有 `v-show` 的元素始终会被渲染并保留在 DOM 中。`v-show` 只是简单地切换元素的 CSS 属性 `display`。

示例：

```html
<div id="app">
  <!--事件中直接写js片段-->
  <button v-on:click="show = !show">点击切换</button><br />
  <h1 v-if="show">你好</h1>
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script type="text/javascript">
  var app = new Vue({
    el: "#app",
    data: {
      show: true,
    },
  });
</script>
```

代码：

![](http://js.hnlyx.top/img/59.gif)

## 5.6.v-bind

html 属性不能使用双大括号形式绑定，只能使用 v-bind 指令。

在将  `v-bind`  用于  `class`  和  `style`  时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。

```html
<div id="app">
  <!--可以是数据模型，可以是具有返回值的js代码块或者函数-->
  <div
    v-bind:title="title"
    style="border: 1px solid red; width: 50px; height: 50px;"
  ></div>
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script type="text/javascript">
  var app = new Vue({
    el: "#app",
    data: {
      title: "title",
    },
  });
</script>
```

效果：

![1530025378843](http://js.hnlyx.top/img/1530025378843.png)

在将  `v-bind`  用于  `class`  和  `style`  时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。

### 5.6.1.绑定 class 样式

> 数组语法

我们可以借助于`v-bind`指令来实现：

HTML：

```html
<div id="app">
  <div v-bind:class="activeClass"></div>
  <div v-bind:class="errorClass"></div>
  <div v-bind:class="[activeClass, errorClass]"></div>
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script type="text/javascript">
  var app = new Vue({
    el: "#app",
    data: {
      activeClass: "active",
      errorClass: ["text-danger", "text-error"],
    },
  });
</script>
```

渲染后的效果：（具有 active 和 hasError 的样式）

![1530026818515](http://js.hnlyx.top/img/1530026818515.png)

> 对象语法

我们可以传给 `v-bind:class` 一个对象，以动态地切换 class：

```html
<div v-bind:class="{ active: isActive }"></div>
```

上面的语法表示 `active` 这个 **class 存在与否将取决于数据属性 `isActive`** 的 [truthiness](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)（所有的值都是真实的，除了 false,0,“”,null,undefined 和 NaN）。

你可以在对象中传入更多属性来动态切换多个 class。此外，`v-bind:class` 指令也可以与普通的 class 属性共存。如下模板:

```html
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```

和如下 data：

```js
data: {
  isActive: true,
  hasError: false
}
```

结果渲染为：

```html
<div class="static active"></div>
```

active 样式和 text-danger 样式的存在与否，取决于 isActive 和 hasError 的值。本例中 isActive 为 true，hasError 为 false，所以 active 样式存在，text-danger 不存在。

**通常情况下，绑定的数据对象不必内联定义在模板里**：

```html
<div class="static" v-bind:class="classObject"></div>
```

数据：

```javascript
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

效果和之前一样：

```html
<div class="static active"></div>
```

### 5.6.2.绑定 style 样式

> 数组语法

数组语法可以将多个样式对象应用到同一个元素上：

```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

数据：

```javascript
data: {
    baseStyles: {'background-color': 'red'},
    overridingStyles: {border: '1px solid black'}
}
```

渲染后的结果：

```html
<div style="background-color: red; border: 1px solid black;"></div>
```

> 对象语法

`v-bind:style`  的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用单引号括起来) 来命名：

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

数据：

```JavaScript
data: {
  activeColor: 'red',
  fontSize: 30
}
```

效果：

```html
<div style="color: red; font-size: 30px;"></div>
```

**直接绑定到一个样式对象通常更好，这会让模板更清晰**：

```html
<div v-bind:style="styleObject"></div>
```

```javascript
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

效果同上。

### 5.6.3.简写

`v-bind:class`可以简写为`:class`

## 5.7.计算属性

在插值表达式中使用 js 表达式是非常方便的，而且也经常被用到。

但是如果表达式的内容很长，就会显得不够优雅，而且后期维护起来也不方便，例如下面的场景，我们有一个日期的数据，但是是毫秒值：

```js
data: {
  birthday: 1529032123201; // 毫秒值
}
```

我们在页面渲染，希望得到 yyyy-MM-dd 的样式：

```html
<h1>
  您的生日是：{{ new Date(birthday).getFullYear() + '-'+ new
  Date(birthday).getMonth()+ '-' + new Date(birthday).getDay() }}
</h1>
```

虽然能得到结果，但是非常麻烦。

Vue 中提供了计算属性，来替代复杂的表达式：

```js
var vm = new Vue({
  el: "#app",
  data: {
    birthday: 1429032123201, // 毫秒值
  },
  computed: {
    birth() {
      // 计算属性本质是一个方法，但是必须返回结果
      const d = new Date(this.birthday);
      return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay();
    },
  },
});
```

- 计算属性本质就是方法，但是一定要返回数据。然后页面渲染时，可以把这个方法当成一个变量来使用。

页面使用：

```html
<div id="app">
  <h1>您的生日是：{{birth}}</h1>
</div>
```

效果：

![1530029950644](http://js.hnlyx.top/img/1530029950644.png)

我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的依赖进行缓存的**。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要`birthday`还没有发生改变，多次访问  `birthday`  计算属性会立即返回之前的计算结果，而不必再次执行函数。

## 5.8.watch

watch 可以让我们监控一个值的变化。从而做出相应的反应。

示例：

```html
<div id="app">
  <input type="text" v-model="message" />
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script type="text/javascript">
  var vm = new Vue({
    el: "#app",
    data: {
      message: "",
    },
    watch: {
      message(newVal, oldVal) {
        console.log(newVal, oldVal);
      },
    },
  });
</script>
```

效果：

![1530030506879](http://js.hnlyx.top/img/1530030506879.png)

# 6.组件化

在大型应用开发的时候，页面可以划分成很多部分。往往不同的页面，也会有相同的部分。例如可能会有相同的头部导航。

但是如果每个页面都独自开发，这无疑增加了我们开发的成本。所以我们会把页面的不同部分拆分成独立的组件，然后在不同页面就可以共享这些组件，避免重复开发。

## 6.1.全局组件

我们通过 Vue 的 component 方法来定义一个全局组件。

```html
<div id="app">
  <!--使用定义好的全局组件-->
  <counter></counter>
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script type="text/javascript">
  // 定义全局组件，两个参数：1，组件名称。2，组件参数
  Vue.component("counter", {
    template:
      '<button v-on:click="count++">你点了我 {{ count }} 次，我记住了.</button>',
    data() {
      return {
        count: 0,
      };
    },
  });
  var app = new Vue({
    el: "#app",
  });
</script>
```

- 组件其实也是一个 Vue 实例，因此它在定义时也会接收：data、methods、生命周期函数等
- 不同的是组件不会与页面的元素绑定，否则就无法复用了，因此没有 el 属性。
- 但是组件渲染需要 html 模板，所以增加了 template 属性，值就是 HTML 模板
- 全局组件定义完毕，任何 vue 实例都可以直接在 HTML 中通过组件名称来使用组件了。
- data 必须是一个函数，不再是一个对象。

效果：

![](http://js.hnlyx.top/img/60.gif)

## 6.2.组件的复用

定义好的组件，可以任意复用多次：

```html
<div id="app">
  <!--使用定义好的全局组件-->
  <counter></counter>
  <counter></counter>
  <counter></counter>
</div>
```

效果：

![1530084943778](http://js.hnlyx.top/img/1530084943778.png)

你会发现每个组件互不干扰，都有自己的 count 值。怎么实现的？

> **组件的 data 属性必须是函数**！

当我们定义这个 `<counter>` 组件时，它的 data 并不是像这样直接提供一个对象：

```js
data: {
  count: 0;
}
```

取而代之的是，一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝：

```js
data: function () {
  return {
    count: 0
  }
}
```

如果 Vue 没有这条规则，点击一个按钮就会影响到其它所有实例！

## 6.3.局部注册

一旦全局注册，就意味着即便以后你不再使用这个组件，它依然会随着 Vue 的加载而加载。

因此，对于一些并不频繁使用的组件，我们会采用局部注册。

我们先在外部定义一个对象，结构与创建组件时传递的第二个参数一致：

```js
const counter = {
  template:
    '<button v-on:click="count++">你点了我 {{ count }} 次，我记住了.</button>',
  data() {
    return {
      count: 0,
    };
  },
};
```

然后在 Vue 中使用它：

```js
var app = new Vue({
  el: "#app",
  components: {
    counter: counter, // 将定义的对象注册为组件
  },
});
```

- components 就是当前 vue 对象子组件集合。
  - 其 key 就是子组件名称
  - 其值就是组件对象的属性
- 效果与刚才的全局注册是类似的，不同的是，这个 counter 组件只能在当前的 Vue 实例中使用

## 6.4.组件通信

通常一个单页应用会以一棵嵌套的组件树的形式来组织：

![1525855149491](http://js.hnlyx.top/img/1525855149491.png)

- 页面首先分成了顶部导航、左侧内容区、右侧边栏三部分
- 左侧内容区又分为上下两个组件
- 右侧边栏中又包含了 3 个子组件

各个组件之间以嵌套的关系组合在一起，那么这个时候不可避免的会有组件间通信的需求。

### 6.4.1.props（父向子传递）

1. 父组件使用子组件时，自定义属性（属性名任意，属性值为要传递的数据）
2. 子组件通过 props 接收父组件属性

父组件使用子组件，并自定义了 title 属性：

```html
<div id="app">
  <h1>打个招呼：</h1>
  <!--使用子组件，同时传递title属性-->
  <introduce title="大家好，我是锋哥" />
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script type="text/javascript">
  Vue.component("introduce", {
    // 直接使用props接收到的属性来渲染页面
    template: "<h1>{{title}}</h1>",
    props: ["title"], // 通过props来接收一个父组件传递的属性
  });
  var app = new Vue({
    el: "#app",
  });
</script>
```

效果：

![1530093525973](http://js.hnlyx.top/img/1530093525973.png)

### 6.4.2.props 验证

我们定义一个子组件，并接受复杂数据：

```js
const myList = {
  template:
    '\
        <ul>\
            <li v-for="item in items" :key="item.id">{{item.id}} : {{item.name}}</li>\
        </ul>\
        ',
  props: {
    items: {
      type: Array,
      default: [],
      required: true,
    },
  },
};
```

- 这个子组件可以对 items 进行迭代，并输出到页面。
- props：定义需要从父组件中接收的属性
  - items：是要接收的属性名称
    - type：限定父组件传递来的必须是数组
    - default：默认值
    - required：是否必须

**当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。**

我们在父组件中使用它：

```html
<div id="app">
  <h2>传智播客已开设如下课程：</h2>
  <!-- 使用子组件的同时，传递属性，这里使用了v-bind，指向了父组件自己的属性lessons -->
  <my-list :items="lessons" />
</div>
```

```js
var app = new Vue({
  el: "#app",
  components: {
    myList, // 当key和value一样时，可以只写一个
  },
  data: {
    lessons: [
      { id: 1, name: "java" },
      { id: 2, name: "php" },
      { id: 3, name: "ios" },
    ],
  },
});
```

效果：

![1530107338625](http://js.hnlyx.top/img/1530107338625.png)

type 类型，可以有：

![1530108427358](http://js.hnlyx.top/img/1530108427358.png)

### 6.4.3.动态静态传递

给 prop 传入一个静态的值：

```html
<introduce title="大家好，我是锋哥" />
```

给 prop 传入一个动态的值： （通过 v-bind 从数据模型中，获取 title 的值）

```html
<introduce :title="title" />
```

静态传递时，我们传入的值都是字符串类型的，但实际上**任何类型**的值都可以传给一个 props。

```html
<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个JavaScript表达式而不是一个字符串。-->
<blog-post v-bind:likes="42"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:likes="post.likes"></blog-post>
```

### 6.4.4.子向父的通信

来看这样的一个案例：

```html
<div id="app">
  <h2>num: {{num}}</h2>
  <!--使用子组件的时候，传递num到子组件中-->
  <counter :num="num"></counter>
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script type="text/javascript">
  Vue.component("counter", {
    // 子组件，定义了两个按钮，点击数字num会加或减
    template:
      '\
            <div>\
                <button @click="num++">加</button>  \
                <button @click="num--">减</button>  \
            </div>',
    props: ["num"], // count是从父组件获取的。
  });
  var app = new Vue({
    el: "#app",
    data: {
      num: 0,
    },
  });
</script>
```

- 子组件接收父组件的 num 属性
- 子组件定义点击按钮，点击后对 num 进行加或减操作

我们尝试运行，好像没问题，点击按钮试试：

![1525859093172](http://js.hnlyx.top/img/1530115066496.png)

子组件接收到父组件属性后，默认是不允许修改的。怎么办？

既然只有父组件能修改，那么加和减的操作一定是放在父组件：

```js
var app = new Vue({
  el: "#app",
  data: {
    num: 0,
  },
  methods: {
    // 父组件中定义操作num的方法
    increment() {
      this.num++;
    },
    decrement() {
      this.num--;
    },
  },
});
```

但是，点击按钮是在子组件中，那就是说需要子组件来调用父组件的函数，怎么做？

我们可以**通过 v-on 指令将父组件的函数绑定到子组件**上：

```html
<div id="app">
  <h2>num: {{num}}</h2>
  <counter :count="num" @inc="increment" @dec="decrement"></counter>
</div>
```

在子组件中定义函数，函数的具体实现调用父组件的实现，并在子组件中调用这些函数。当子组件中按钮被点击时，调用绑定的函数：

```js
Vue.component("counter", {
  template:
    '\
                <div>\
                    <button @click="plus">加</button>  \
                    <button @click="reduce">减</button>  \
                </div>',
  props: ["count"],
  methods: {
    plus() {
      this.$emit("inc");
    },
    reduce() {
      this.$emit("dec");
    },
  },
});
```

- vue 提供了一个内置的 this.$emit()函数，用来调用父组件绑定的函数

效果：

![](http://js.hnlyx.top/img/61.gif)

# 7.路由 vue-router

## 7.1.场景模拟

现在我们来实现这样一个功能：

一个页面，包含登录和注册，点击不同按钮，实现登录和注册页切换：

![](H:/%E4%B9%90%E4%BC%98/day05-Vue/assets/8.gif)

### 7.1.1.编写父组件

为了让接下来的功能比较清晰，我们先新建一个文件夹：src

然后新建一个 HTML 文件，作为入口：index.html

![1530148321175](http://js.hnlyx.top/img/1530148321175.png)

然后编写页面的基本结构：

```html
<div id="app">
  <span>登录</span>
  <span>注册</span>
  <hr />
  <div>登录页/注册页</div>
</div>
<script src="../node_modules/vue/dist/vue.js"></script>
<script type="text/javascript">
  var vm = new Vue({
    el: "#app",
  });
</script>
```

样式：

![1530149363817](http://js.hnlyx.top/img/1530149363817.png)

### 7.1.2.编写登录及注册组件

接下来我们来实现登录组件，以前我们都是写在一个文件中，但是为了复用性，开发中都会把组件放入独立的 JS 文件中，我们新建一个 user 目录以及 login.js 及 register.js：

![1530156389366](http://js.hnlyx.top/img/1530156389366.png)

编写组件，这里我们只写模板，不写功能。

login.js 内容如下：

```js
const loginForm = {
  template:
    '\
    <div>\
    <h2>登录页</h2> \
    用户名：<input type="text"><br/>\
    密码：<input type="password"><br/>\
    </div>\
    ',
};
```

register.js 内容：

```js
const registerForm = {
  template:
    '\
    <div>\
    <h2>注册页</h2> \
    用 户 名：<input type="text"><br/>\
    密  码：<input type="password"><br/>\
    确认密码：<input type="password"><br/>\
    </div>\
    ',
};
```

### 7.1.3.在父组件中引用

```html
<div id="app">
  <span>登录</span>
  <span>注册</span>
  <hr />
  <div>
    <!--<loginForm></loginForm>-->
    <!--
            疑问：为什么不采用上面的写法？
            由于html是大小写不敏感的，如果采用上面的写法，则被认为是<loginform></loginform>
            所以，如果是驼峰形式的组件，需要把驼峰转化为“-”的形式
         -->
    <login-form></login-form>
    <register-form></register-form>
  </div>
</div>
<script src="../node_modules/vue/dist/vue.js"></script>
<script src="user/login.js"></script>
<script src="user/register.js"></script>
<script type="text/javascript">
  var vm = new Vue({
    el: "#app",
    components: {
      loginForm,
      registerForm,
    },
  });
</script>
```

效果：

![1530157389501](http://js.hnlyx.top/img/1530157389501.png)

### 7.1.5.问题

我们期待的是，当点击登录或注册按钮，分别显示登录页或注册页，而不是一起显示。

但是，如何才能动态加载组件，实现组件切换呢？

虽然使用原生的 Html5 和 JS 也能实现，但是官方推荐我们使用 vue-router 模块。

## 7.2.vue-router 简介和安装

使用 vue-router 和 vue 可以非常方便的实现 复杂单页应用的动态路由功能。

官网：https://router.vuejs.org/zh-cn/

使用 npm 安装：`npm install vue-router --save`

![1530161293338](http://js.hnlyx.top/img/1530161293338.png)

在 index.html 中引入依赖：

```html
<script src="../node_modules/vue-router/dist/vue-router.js"></script>
```

## 7.3.快速入门

新建 vue-router 对象，并且指定路由规则：

```js
// 创建VueRouter对象
const router = new VueRouter({
  routes: [
    // 编写路由规则
    {
      path: "/login", // 请求路径
      component: loginForm, // 组件名称
    },
    { path: "/register", component: registerForm },
  ],
});
```

- 创建 VueRouter 对象，并指定路由参数
- routes：路由规则的数组，可以指定多个对象，每个对象是一条路由规则，包含以下属性：
  - path：路由的路径
  - component：组件名称

在父组件中引入 router 对象：

```js
var vm = new Vue({
  el: "#app",
  components: {
    // 引用登录和注册组件
    loginForm,
    registerForm,
  },
  router, // 引用上面定义的router对象
});
```

页面跳转控制：

```html
<div id="app">
  <!--router-link来指定跳转的路径-->
  <span><router-link to="/login">登录</router-link></span>
  <span><router-link to="/register">注册</router-link></span>
  <hr />
  <div>
    <!--vue-router的锚点-->
    <router-view></router-view>
  </div>
</div>
```

- 通过`<router-view>`来指定一个锚点，当路由的路径匹配时，vue-router 会自动把对应组件放到锚点位置进行渲染
- 通过`<router-link>`指定一个跳转链接，当点击时，会触发 vue-router 的路由功能，路径中的 hash 值会随之改变

效果：

![](http://js.hnlyx.top/img/62.gif)

**注意**：单页应用中，页面的切换并不是页面的跳转。仅仅是地址最后的 hash 值变化。

事实上，我们总共就一个 HTML：index.html

# 8.webpack

Webpack 是一个前端资源的打包工具，它可以将 js、image、css 等资源当成一个模块进行打包。

中文官方网站：https://www.webpackjs.com/

![1530168661348](http://js.hnlyx.top/img/1530168661348.png)

官网给出的解释：

> 本质上，*webpack*  是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个  *bundle*。

为什么需要打包？

- 将许多碎小文件打包成一个整体，减少单页面内的衍生请求次数，提高网站效率。
- 将 ES6 的高级语法进行转换编译，以兼容老版本的浏览器。
- 将代码打包的同时进行混淆，提高代码的安全性。

## 8.1.安装

webpack 支持全局安装和本地安装，官方推荐是本地安装，我们按照官方的来。

安装最新版本 webpack，输入命令：`npm install --save-dev webpack`

webpack 4+ 版本，你还需要安装 CLI ，输入命令：`npm install webpack webpack-cli --save-dev`

![1530187524815](http://js.hnlyx.top/img/1530187524815.png)

此时，我们注意下项目中文件夹下，会有一个 package.json 文件。（其实早就有了）

![1530187744149](http://js.hnlyx.top/img/1530187744149.png)

打开文件，可以看到我们之前用 npm 安装过的文件都会出现在这里：

![1525873343908](http://js.hnlyx.top/img/1525873343908.png)

## 8.2.核心概念

学习 Webpack，你需要先理解四个**核心概念**：

- 入口(entry)
  
  webpack 打包的起点，可以有一个或多个，一般是 js 文件。webpack 会从启点文件开始，寻找启点直接或间接依赖的其它所有的依赖，包括 JS、CSS、图片资源等，作为将来打包的原始数据

- 输出(output)
  
  出口一般包含两个属性：path 和 filename。用来告诉 webpack 打包的目标文件夹，以及文件的名称。目的地也可以有多个。

- 加载器（loader）
  
  webpack 本身只识别 Js 文件，如果要加载非 JS 文件，必须指定一些额外的加载器（loader），例如 css-loader。然后将这些文件转为 webpack 能处理的有效模块，最后利用 webpack 的打包能力去处理。

- 插件(plugins)
  
  插件可以扩展 webpack 的功能，让 webpack 不仅仅是完成打包，甚至各种更复杂的功能，或者是对打包功能进行优化、压缩，提高效率。

## 8.3.编写 webpack 配置

接下来，我们编写一个 webpack 的配置，来指定一些打包的配置项。配置文件的名称，默认就是 webpack.config.js，我们放到 hello-vue 的根目录：

![1530199761226](http://js.hnlyx.top/img/1530199761226.png)

配置文件中就是要指定上面说的四个核心概念，入口、出口、加载器、插件。

不过，加载器和插件是可选的。我们先编写入口和出口

### 8.3.1.入口 entry

webpack 打包的启点，可以有一个或多个，一般是 js 文件。现在思考一下我们有没有一个入口？貌似没有，我们所有的东西都集中在 index.html，不是一个 js，那怎么办？

我们新建一个 js，把 index.html 中的部分内容进行集中，然后在 index.html 中引用这个 js 不就 OK 了！

![1530200787599](http://js.hnlyx.top/img/1530200787599.png)

然后把原来 index.html 中的 js 代码全部移动到 index.js 中

```js
// 使用es6的语法导入js模块
import Vue from "../node_modules/vue/dist/vue";
import VueRouter from "../node_modules/vue-router/dist/vue-router";
import loginForm from "./user/login";
import registerForm from "./user/register";

Vue.use(VueRouter);

// 创建vue对象
const router = new VueRouter({
  routes: [
    // 编写路由规则
    // path: 路由请求路径；component：组件名称
    { path: "/login", component: loginForm },
    { path: "/register", component: registerForm },
  ],
});
var vm = new Vue({
  el: "#app",
  components: {
    loginForm,
    registerForm,
  },
  router,
});
```

- 原来的 index.html 中引入了很多其它 js，在这里我们使用 es6 的 import 语法进行导入。

- 注意，要使用 import，就需要在 login.js 和 register.js 中添加 export 导出语句：
  
  ```js
  const loginForm = {
    template:
      '\
         <div>\
              <h2>登陆页</h2>\
              用户名：<input type="text"><br>\
              密 码：<input type="password">\
         </div>',
  };
  export default loginForm;
  ```
  
  register.js:
  
  ```js
  const registerForm = {
    template:
      '\
      <div>\
      <h2>注册页</h2> \
      用 户 名：<input type="text"><br/>\
      密  码：<input type="password"><br/>\
      确认密码：<input type="password"><br/>\
      </div>\
      ',
  };
  export default registerForm;
  ```

- vue-router 使用模块化加载后，必须增加一句：Vue.use(VueRouter)

这样，index.js 就成了我们整个配置的入口了。

我们在 webpack.config.js 中添加以下内容：

```js
module.exports = {
  entry: "./src/index.js", //指定打包的入口文件
};
```

### 8.3.2.出口 output

出口，就是输出的目的地。一般我们会用一个 dist 目录，作为打包输出的文件夹：

![1530201612391](http://js.hnlyx.top/img/1530201612391.png)

然后，编写 webpack.config.js，添加出口配置：

```js
module.exports = {
  entry: "./src/main.js", //指定打包的入口文件
  output: {
    // path: 输出的目录，__dirname是相对于webpack.config.js配置文件的绝对路径
    path: __dirname + "/dist",
    filename: "build.js", //输出的js文件名
  },
};
```

## 8.4.执行打包

在控制台输入以下命令：

```
npx webpack --config webpack.config.js
```

![1530203361613](http://js.hnlyx.top/img/1530203361613.png)

随后，查看 dist 目录：

![1530203406462](http://js.hnlyx.top/img/1530203406462.png)

尝试打开 build.js，你根本看不懂：

![1530203465737](http://js.hnlyx.top/img/1530203465737.png)

所有的 js 合并为 1 个，并且对变量名进行了随机打乱，这样就起到了 压缩、混淆的作用。

## 8.5.测试运行

在 index.html 中引入刚刚生成的 build.js 文件，

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <body>
    <div id="app">
      <!--router-link来指定跳转的路径-->
      <span><router-link to="/login">登录</router-link></span>
      <span><router-link to="/register">注册</router-link></span>
      <hr />
      <div>
        <!--vue-router的锚点-->
        <router-view></router-view>
      </div>
    </div>
    <script src="../dist/build.js"></script>
  </body>
</html>
```

然后运行：

![1530203553915](http://js.hnlyx.top/img/1530203553915.png)

## 8.6.打包 CSS

我们来编写一段 CSS 代码，对 index 的样式做一些美化：

![1530203880056](http://js.hnlyx.top/img/1530203880056.png)

内容：

```css
#app a {
  display: inline-block;
  width: 150px;
  line-height: 30px;
  background-color: dodgerblue;
  color: white;
  font-size: 16px;
  text-decoration: none;
}
#app a:hover {
  background-color: whitesmoke;
  color: dodgerblue;
}
#app div {
  width: 300px;
  height: 150px;
}
#app {
  width: 305px;
  border: 1px solid dodgerblue;
}
```

### 8.6.1.安装加载器

前面说过，webpack 默认只支持 js 加载。要加载 CSS 文件，必须安装加载器：

命令：`npm install style-loader css-loader --save-dev`

![1530204068192](http://js.hnlyx.top/img/1530204068192.png)

此时，在 package.json 中能看到新安装的：

![1530204160848](http://js.hnlyx.top/img/1530204160848.png)

### 8.6.3.index.js 引入 css 文件

因为入口在 index.js，因此 css 文件也要在这里引入。依然使用 ES6 的模块语法：

```js
import "./css/main.css";
```

### 8.6.4.配置加载器

在 webpack.config.js 配置文件中配置 css 的加载器

```js
module.exports = {
  entry: "./src/main.js", //指定打包的入口文件
  output: {
    path: __dirname + "/dist", // 注意：__dirname表示webpack.config.js所在目录的绝对路径
    filename: "build.js", //输出文件
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 通过正则表达式匹配所有以.css后缀的文件
        use: [
          // 要使用的加载器，这两个顺序一定不要乱
          "style-loader",
          "css-loader",
        ],
      },
    ],
  },
};
```

### 8.6.5.重新打包

再次输入打包指令：`npx webpack --config webpack.config.js`

![1530204780240](http://js.hnlyx.top/img/1530204780240.png)

效果：

![1530204813013](http://js.hnlyx.top/img/1530204813013.png)

## 8.7.script 脚本

我们每次使用 npm 安装，都会在 package.json 中留下痕迹，事实上，package.json 中不仅可以记录安装的内容，还可编写脚本，让我们运行命令更加快捷。

我们可以把 webpack 的命令编入其中：

![1530205423730](http://js.hnlyx.top/img/1530205423730.png)

以后，如果要打包，就可以直接输入：`npm run build`即可。

`npm run` ：执行 npm 脚本，后面跟的是配置脚本的名称`build`

![1530205504104](http://js.hnlyx.top/img/1530205504104.png)

## 8.8.打包 HTML

之前的打包过程中，除了 HTML 文件外的其它文件都被打包了，当在线上部署时，我们还得自己复制 HTML 到 dist，然后手动添加生成的 js 到 HTML 中，这非常不友好。

webpack 中的一个插件：html-webpack-plugin，可以解决这个问题。

1）安装插件：`npm install --save-dev html-webpack-plugin`

需要在 webpack.config.js 中添加插件：

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js", //指定打包的入口文件
  output: {
    path: __dirname + "/dist", // 注意：__dirname表示webpack.config.js所在目录的绝对路径
    filename: "build.js", //输出文件
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 通过正则表达式匹配所有以.css后缀的文件
        use: [
          // 要使用的加载器，这两个顺序一定不要乱
          "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "首页", //生成的页面标题<head><title>首页</title></head>
      filename: "index.html", // dist目录下生成的文件名
      template: "./src/index.html", // 我们原来的index.html，作为模板
    }),
  ],
};
```

2）将原来 HTML 中的引入 js 代码删除：

![1530207035782](http://js.hnlyx.top/img/1530207035782.png)

3）再次打包：`npm run build`

![1530206990349](http://js.hnlyx.top/img/1530206990349.png)

4）查看 dist 目录：

![1530207132261](http://js.hnlyx.top/img/1530207132261.png)

打开 index.html，发现已经自动添加了当前目录下的 build.js

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <body>
    <div id="app">
      <!--router-link来指定跳转的路径-->
      <span><router-link to="/login">登录</router-link></span>
      <span><router-link to="/register">注册</router-link></span>
      <div>
        <!--vue-router的锚点-->
        <router-view></router-view>
      </div>
    </div>
    <script type="text/javascript" src="build.js"></script>
  </body>
</html>
```

## 8.9.热更新的 web 服务

刚才的案例中，每次修改任何 js 或 css 内容，都必须重新打包，非常麻烦。

webpack 给我们提供了一个插件，可以帮我们运行一个 web 服务，加载页面内容，并且修改 js 后不需要重新加载就能看到最新结果：

1）安装插件：`npm install webpack-dev-server --save-dev`

2）添加启动脚本

在 package.json 中配置 script

```js
  "scripts": {
    "dev": "webpack-dev-server --inline --hot --open --port 8080 --host 127.0.0.1"
  },
```

--inline：自动刷新

--hot：热加载

--port：指定端口

--open：自动在默认浏览器打开

--host：可以指定服务器的 ip，不指定则为 127.0.0.1

3）运行脚本：`npm run dev`

![1530207667660](http://js.hnlyx.top/img/1530207667660.png)

4）效果：

![1530207505226](http://js.hnlyx.top/img/1530207505226.png)

# 9.vue-cli

## 9.1.介绍和安装

在开发中，需要打包的东西不止是 js、css、html。还有更多的东西要处理，这些插件和加载器如果我们一一去添加就会比较麻烦。

幸好，vue 官方提供了一个快速搭建 vue 项目的脚手架：vue-cli

使用它能快速的构建一个 web 工程模板。

官网：https://github.com/vuejs/vue-cli

安装命令：`npm install -g vue-cli`

## 9.2.快速上手

我们新建一个 module：

![1530208068828](http://js.hnlyx.top/img/1530208068828.png)

切换到该目录：

![1530208139922](http://js.hnlyx.top/img/1530208139922.png)

用 vue-cli 命令，快速搭建一个 webpack 的项目：`vue init webpack`

![1530208556831](http://js.hnlyx.top/img/1530208650256.png)

![1530208708000](http://js.hnlyx.top/img/1530208708000.png)

前面几项都走默认或 yes

下面这些我们选 no

![1530208850418](assets/1530208850418.png)

最后，再选 yes，使用 npm 安装

![1530208897063](http://js.hnlyx.top/img/1530208897063.png)

开始初始化项目，并安装依赖，可能需要

![1530208932814](http://js.hnlyx.top/img/1530208932814.png)

安装成功！

![1530209062090](http://js.hnlyx.top/img/1530209062090.png)

可以使用`npm run dev`命令启动。

## 9.3.项目结构

安装好的项目结构：

![1530209146349](http://js.hnlyx.top/img/1530209146349.png)

入口文件：main.js

![1525913687860](http://js.hnlyx.top/img/1530209503007.png)

## 9.4.单文件组件

需要注意的是，我们看到有一类后缀名为.vue 的文件，我们称为单文件组件

![1530209769323](http://js.hnlyx.top/img/1530209769323.png)

每一个.vue 文件，就是一个独立的 vue 组件。类似于我们刚才写的 login.js 和 register.js

只不过，我们在 js 中编写 html 模板和样式非常的不友好，而且没有语法提示和高亮。

而单文件组件中包含三部分内容：

- template：模板，支持 html 语法高亮和提示
- script：js 脚本，这里编写的就是 vue 的组件对象，还可以有 data(){}等
- style：样式，支持 CSS 语法高亮和提示

每个组件都有自己独立的 html、JS、CSS，互不干扰，真正做到可独立复用。

## 9.5.运行

看看生成的 package.json：

![1530210016103](http://js.hnlyx.top/img/1530210016103.png)

- 可以看到这引入了非常多的依赖，绝大多数都是开发期依赖，比如大量的加载器。
- 运行时依赖只有 vue 和 vue-router
- 脚本有三个：
  - dev：使用了 webpack-dev-server 命令，开发时热部署使用
  - start：使用了 npm run dev 命令，与上面的 dev 效果完全一样，当脚本名为“start”时，可以省略“run”。
  - build：等同于 webpack 的打包功能，会打包到 dist 目录下。

我们执行`npm run dev` 或者 `npm start` 都可以启动项目：

![1530210411076](http://js.hnlyx.top/img/1530210411076.png)

页面：

![1530210349704](http://js.hnlyx.top/img/1530210349704.png)
