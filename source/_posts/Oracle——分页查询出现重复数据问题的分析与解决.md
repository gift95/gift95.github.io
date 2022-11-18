---
title: Oracle——分页查询出现重复数据问题的分析与解决
tags: oracle
top_img: /img/topic.jpg
abbrlink: 678f4d99
date: 2022-07-29 18:30:23
---

# Oracle——分页查询出现重复数据问题的分析与解决

> 问题发生在一次分页查找时 查找一组数据 根据客户ID查找 每页20条 共73条  出现了重复项 ，总数对了但数据不对，分析原因

## 问题分析

**可能的问题原因**

1. 数据库本身有重复数据。
2. 分页数据有交集
3. 排序字段不唯一

    在作分页查询时，其中使用的排序条件数据是根据用户ID（但在此表中不唯一，非主键） 排序。结果查询的结果，很多页的数据都有重复的。在排除其他问题后，考虑到应该是排序的字段值不唯一，造成每次查询时的数据排序不一定都是一样，每次查询的分页顺序结果不一致。
    在Oracle分页查询中，我们采用类似示例所示的公认的比较高效的数据库分页查询语句（Effective Oracle by Design中有描述、众多oracle使用者也做过测试）。这里的ROWNUM是一个伪列，它是oracle为查询结果所编的一个号，第一行的RN为1，第二行为2，以此类推。 因为oracle是按块进行读取数据的，如果数据按顺序存储，则可能使读取出来的数据是按顺序的，所以我们就会误解为默认排序。事实上，oracle没有进行任何排序操作，如果sql没有要求排序，oracle会顺序的从数据块中读取符合条件的数据返回到客户端。

    所以在没有使用排序sql的时候，分页返回的数据可能是按顺序的，也可能是杂乱无章的，这都取决与数据的存储位置。在分页查询过程中，如果数据的物理位置发生了改变，就可能会引起分页数据重复的现象。 所以，要正确使用分页查询，sql语句中必须有排序条件。但是，在有排序条件的时候，仍然会出现数据重复的现象，这是为什么呢？

## Oracle数据库排序机理

    首先，sql的order by排序会对数据库产生很大的开销。然而，oracle的数据库实现就一个原则，怎么快怎么效率高就怎么来。在大多数情况下数据库操作是不需要排序的，所以Oracle在没有说明的情况下，会默认不排序。
    其次，这和oracle的表结构是有关系的，因为oracle的表结构默认是按堆存放的。按堆存放，通俗易懂的说，就是同一类（值相同的数据），存在相同的位置，但是这一堆数据是没有顺序的，存的时候就是乱序的；相对应的，取数据的时候也就是无序的。如果你建表的时候就是建的按索引组织的表，那么它返回的时候就会默认排序了。
    通过了解oracle的排序机理就会明白，出现这种情况的原因是没有进行排序或者因为排序列值的不唯一性。 Oracle这里使用的排序算法不具有稳定性，也就是说，对于键值相等的数据，这种算法完成排序后，不保证这些键值相等的数据保持排序前的顺序。

解决方法
    解决的方法是在后边增加一个**唯一性列**，比如**主键**。所以解决方法如下（两个条件必须同时满足）：

1. sql语句中需要有排序条件。
2. 排序条件如果没有唯一性，那么必须在后边跟上一个唯一性的条件，比如主键。如果没有主键，则可设置多个排序字段（但要保证多个排序字段确定一条数据）。

```sql
--原始sql
SELECT * FROM (
    SELECT t.*, ROWNUM AS rowno   FROM (  
        SELECT bc.*  FROM business_contract bc WHERE customerid =? 
        ORDER BY inputdate DESC) t
         WHERE ROWNUM <= 20) tt WHERE tt.rowno > 0;
```

修改后

```sql
--serialno 为bc表主键
SELECT * FROM (
    SELECT t.*, ROWNUM AS rowno   FROM (  
        SELECT bc.*  FROM business_contract bc WHERE customerid =? 
        ORDER BY bc.serialno DESC) t
         WHERE ROWNUM <= 20) tt WHERE tt.rowno > 0;
```



去重语句

```sql
DELETE FROM
t_record
WHERE t.id NOT in (
SELECT t.maxid FROM
( SELECT create_time,cur_value,max(id) AS maxid FROM t_record  
GROUP BY create_time,cur_value) having count(*)>1  
); 
```
