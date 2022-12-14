---
title: Java 反射应用
abbrlink: 52dd996
date: 2022-12-14 19:58:12
tags:
---



---

## 反射调用类中的方法

### 不使用过多if判断 

#### 【1】分析：

~~~markdown
我们上述根据url获取方法名，然后根据方法名是否相等进行if条件的判断。
我们这里可以在当前用户模块无论有多少个需求都只需要书写一套模板代码，使用所有的当前用户模块的需求。

我们可以使用反射思想，根据获取的页面中的方法名来执行具体的方法，不用再判断了。

~~~

#### 【2】步骤：

~~~java
1.获取要执行的方法所属类的Class对象
2.使用Class对象调用Class类中的方法获取要执行的方法：
    	 Method getMethod(String name, Class<?>... parameterTypes)  
    		参数：
    			name：方法名----根据url获取的方法名
    			parameterTypes：要执行方法的参数类型 request  response
    
3.使用Method对象调用Method类中的invoke方法：
    	 Object invoke(Object obj, Object... args)  对带有指定参数的指定对象调用由此 Method 对象表示的底层方法。
    			参数：
    				obj:要执行方法的对象，例如find,这里传递find所属类的对象
                    args：要执行方法的实参。request  response
~~~



#### 【3】代码实现

~~~java

@WebServlet("/user/*")
public class User2Servlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1.获取请求的方法名
        String url = request.getRequestURI();//  "/user/find"
        //获取最后一个/出现的索引
        int lastIndex = url.lastIndexOf('/');
        //从指定索引位置截取到末尾
        String methodName = url.substring(lastIndex + 1);

        //3.判断当前url的路径请求的是哪个方法
       /* if ("find".equals(methodName)) {
            //执行查询所有用户的方法
            find(request, response);
        } else if ("update".equals(methodName)) {
            //执行根据id更新用户的方法
            update(request, response);
        } else if ("add".equals(methodName)) {
            //执行添加用户的方法
            add(request, response);
        } else if ("delete".equals(methodName)) {
            //执行根据id删除用户的方法
            delete(request, response);
        }*/
////////////////////////////使用反射执行方法，简化if语句////////////////////////////////////////
        //1.获取要执行的方法所属类的Class对象
        //this表示当前类的对象
        Class clazz = this.getClass();
        /*
            2.使用Class对象调用Class类中的方法获取要执行的方法：
             Method getMethod(String name, Class<?>... parameterTypes)
                参数：
                    name：方法名----根据url的key获取value即方法名
                    parameterTypes：要执行方法的参数类型 request  response
         */
        try {
            Method m = clazz.getMethod(methodName, HttpServletRequest.class, HttpServletResponse.class);

            /*
                3.使用Method对象调用Method类中的invoke方法：
                 Object invoke(Object obj, Object... args)  对带有指定参数的指定对象调用由此 Method 对象表示的底层方法。
                        参数：
                            obj:要执行方法的对象，例如findAllUsers,这里传递findAllUsers所属类的对象
                            args：要执行方法的实参。request  response
             */
            m.invoke(this,request,response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //4.在servlet中创建增删改查的四个方法
    //5.在不同的方法体中完成代码
    public void delete(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("根据id删除用户");
    }

    public void add(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("添加用户");

    }

    public void update(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("根据id更新用户");
    }

    public void find(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("查询所有用户");
    }
}

~~~



小结：

1.我们这里使用反射思想取代了书写过多if的判断语句，简化代码开发

2.反射执行方法步骤：

~~~java
1.获取要执行的方法所属类的Class对象
2.使用Class对象调用方法：getMethod(方法名,方法形参类型的Class对象)
3.使用获取Method对象调用Method类中的invoke(执行方法依赖的对象,执行方法的实参)
~~~



###  减少代码重复性，不仅仅使用在用户模块。所有模块都可以使用

BaseServlet:

~~~java
package com.itheima.case2.web;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Method;

//@WebServlet("/BaseServlet")
public class BaseServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       //1.获取请求的方法名
        String url = request.getRequestURI();//  "/user/find"
        //获取最后一个/出现的索引
        int lastIndex = url.lastIndexOf('/');
        //从指定索引位置截取到末尾
        String methodName = url.substring(lastIndex + 1);

        ////////////////////////////使用反射执行方法，简化if语句////////////////////////////////////////
        //1.获取要执行的方法所属类的Class对象
        //this表示子类的对象
        Class clazz = this.getClass();
        /*
            2.使用Class对象调用Class类中的方法获取要执行的方法：
             Method getMethod(String name, Class<?>... parameterTypes)
                参数：
                    name：方法名----根据url的key获取value即方法名
                    parameterTypes：要执行方法的参数类型 request  response
         */
        try {
            Method m = clazz.getMethod(methodName, HttpServletRequest.class, HttpServletResponse.class);

            /*
                3.使用Method对象调用Method类中的invoke方法：
                 Object invoke(Object obj, Object... args)  对带有指定参数的指定对象调用由此 Method 对象表示的底层方法。
                        参数：
                            obj:要执行方法的对象，例如findAllUsers,这里传递findAllUsers所属类的对象
                            args：要执行方法的实参。request  response
             */
            m.invoke(this,request,response);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}

~~~

UserServlet:

~~~java
package com.itheima.case2.web;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Method;

//用户模块
@WebServlet("/user/*")
public class User2Servlet extends BaseServlet {
    //4.在servlet中创建增删改查的四个方法
    //5.在不同的方法体中完成代码
    public void deleteUserById(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("根据id删除用户");
    }

    public void addUser(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("添加用户");

    }

    public void updateUserById(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("根据id更新用户");
    }

    public void findAllUsers(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("查询所有用户");
    }
}

~~~

## 小结：

1.我们将反射执行的方法代码放到父类BaseServlet中,然后使用其他模块的servlet直接继承BaseServlet即可

~~~java
url访问路径：
    http://localhost:8080/user/find
~~~

