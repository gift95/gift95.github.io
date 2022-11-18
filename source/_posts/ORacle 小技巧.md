---
title: Oracle sql语句使用
tags: Sql
date: 2022/7/28
updated: 2022/7/28
keywords: sql
comments: false
categories: 技术
description: 日常使用的Oracle 语句
top_img: /img/topic.jpg
abbrlink: b18eaa09
---

ORACLE数据库实践文档

1.登录sql编辑器


```sql
sqlplus / as sysdba(一般使用)
conn /as sysdba
```

2.查询当前实例

```sql
select name from v$database;
select instance_name from v$instance;
--查询所有的实例
show parameter instance;
```
3.切换实例
```
export ORACLE_SID=ILSDB
```
4.查询所有表空间
```
select t1.name,t2.name from v$tablespace t1,v$datafile t2 where t1.ts# = t2.ts#;（带路径）
select * from v$tablespace;
select tablespace_name from dba_tablespaces;
```
5.查询某个用户的表空间
```
select default_tablespace from dba_users where username='CFS';
--查询表空间下有多少用户（tablespace_name表空间一定大写）

select distinct s.owner from dba_segments s where s.tablespace_name='CFS_UAT_DATABASE';
--查询所有用户
select * from all_users;
--查询所有表
select table_name,tablespace_name,status from user_tables;
--查询用户下的所有表
select owner,tablespace_name,table_name from dba_tables where owner='CFS';
```
6.查询数据泵位置
```
SELECT * FROM dba_directories;（DATA_PUMP_DIR后面的路径为数据泵路径）
--查询用户连接人
select sid,serial# from v$session where username='CFS';
select saddr,sid,serial#,paddr,username,status,OSUSER from v$session where username ='CFS';
--断开连接人
alter system kill session '479,19';
--删除用户
drop user CFS cascade;
```

创建表空间（DBRP2_DATA_SPACE：表空间名，'/oradata/ILSRULEDB/DBRP2_DATA_SPACE.dbf'：表空间文件路径，）
```
create tablespace DBRP2_DATA_SPACE logging datafile '/oradata/ILSRULEDB/DBRP2_DATA_SPACE.dbf' size 1024m autoextend on next 1024m maxsize 20480m;

--创建用户并赋予用户表空间（ils:用户名，oracle：用户密码，CFS_DATA_SPACE：表空间）
create user ils identified by oracle default tablespace CFS_DATA_SPACE temporary tablespace TEMP;
--给用户赋予权限（5个权限够用，但是生产上不会给dba权限会影响导入和导出语句）
grant connect to ils;
grant dba to ils;
grant exp_full_database to ils;
grant imp_full_database to ils;
grant resource to ils;
--查询用户角色权限（此语句需要在plsql上执行）
select * from user_role_privs;
--当前会话有效的系统权限
select * from session_privs;
--权限收回
revoke dba from ils;
```
导出数据库(cfs:用户名，oracle:用户密码，ILSDB：实例，cfs_HGCEJG.dmp：导出文件名称)
```
expdp cfs/oracle@ILSDB directory=DATA_PUMP_DIR dumpfile=cfs_HGCEJG.dmp
--@10.191.107.100/crmpbatchdb 是解决ora-12154 ude-12154 的办法
expdp crmpRm/crmpRm@10.191.107.100/crmpbatchdb directory=DATA_PUMP_DIR dumpfile=DISA_20200226.dmp 
```
导入数据库cfs:用户名，oracle:用户密码，ILSDB：实例，cfs_APP_NEW.dmp：导出文件名称,a:原用户名，b:现在用户名，c和e：原表空间，d和f：现表空间名，TABLE_EXISTS_ACTION=REPLACE：数据可以重复执行)
```
impdp cfs/oracle@ILSDB directory=DATA_PUMP_DIR dumpfile=cfs_APP_NEW.dmp remap_schema=a:b remap_tablespace=c:d,e:f TABLE_EXISTS_ACTION=REPLACE
```
银行生产用户权限（connect，unlimited tablespace，role_app_priv）导致导入导出语句：schemas为用户名称
```
impdp credit/oracle	 directory=TMDUMP dumpfile=credit-20200529-%U.dmp table_exists_action=replace  remap_tablespace=TBS_CREDIT:TBS_CREDIT remap_schema=credit:credit;
```
导完之后，用sqlplus / as sysdba登录，执行exec DBMS_STATS.GATHER_SCHEMA_STATS(OWNNAME=>'CREDIT',degree=>8);
```
--导出：expdp \" / as sysdba \"  directory=DATA_PUMP_DIR dumpfile=cfs_uat.dmp schemas=cfs logfile=fs_uat.log
--导入：impdp  \" / as sysdba \" directory=DATA_PUMP_DIR dumpfile=cfs_uat.dmp schemas=cfs cluster=n remap_schema=cfs:ils remap_tablespace=CFS_UAT_DATABASE:ILSDATA,USERS:ILSDATA
```

oracle数据库停止服务/启动服务命令
```
su - oracle
lsnrctl status -- 查看监听状态
lsnrctl stop -- 停止监听
sqlplus / as sysdba
shutdown immediate; --停止数据库
exit;
lsnrctl start --启动监听
sqlplus / as sysdba
startup; --启动数据库
```
查询数据库编码集
```
select * from nls_database_parameters;
--更改游标数（open_cursors后面的数为游标数）
ALTER SYSTEM  SET open_cursors=300 SCOPE=BOTH;
--查询当前游标数
show PARAMETER open_cursors;
--查询某个sid下的使用游标数
SELECT sid, COUNT(*) FROM v$open_cursor WHERE USER_NAME='CFS' GROUP BY sid ORDER BY count(*) DESC ;
```
26.查询锁表
```
select object_name,machine,s.sid,s.serial# from gv$locked_object l,dba_objects o,gv$session s where l.object_id = o.object_id and l.session_id = s.sid ;
--删除锁表记录，即可解锁
alter system kill session 'sid,serial#';
--给用户上锁
alter user CFS account lock;
--给用户解锁
alter user CFS account unlock;
--查询用户的状态
select username,account_status from dba_users where username ='CFS';
--查询连接用户的id并且Kill掉
select 'altere system kill session '''||sid || ',' || serial# || '''' from V$SESSION WHERE username ='CFS';
```
查询用户被锁ORA-28000问题解决
```
--查询用户状态
select username,account_status from dba_users where username ='CN_2310';
--给用户解锁
alter user CN_2310 account unlock;
--查询用户限制登录次数
select * from dba_profiles where RESOURCE_NAME='FAILED_LOGIN_ATTEMPTS';
--修改用户无论输入多少次也都不会被上锁
alter profile default limit failed_login_attempts unlimited;
```
解决用户密码过期ORA-28001；oracle用户密码180会过期
```
--查看用户的profile，一般为default
select username,PROFILE from dba_users;
--查看用户的密码的有效期
select * from dba_profiles where profile='DEFAULT' and resource_name='PASSWORD_LIFE_TIME';
--修改为无限期
alter PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;
--再次修改密码  abrp2为密码
alter user ABRP2 IDENTIFIFIED by "abrp2";
```
数据库3种闪回机制这里只提供（表的闪回）
```
--给表闪回的权限
alter table AWE_DO_LIBRARY enable ROW movement;
--闪回语句
flashback table AWE_DO_LIBRARY to timestamp to_timestamp('2019.09.17 14:00:00','yyyy.mm.dd hh24:mi:ss');
--没收闪回权限
alter table AWE_DO_LIBRARY disable ROW movement;
```
如何查看系统被锁的事物时间
```
select * from v$locked_object ;
```
如何在Oracle服务器上通过SQLPLUS查看本机IP地址 
```
select sys_context('userenv','ip_address') from dual
```
如何将表移动表空间（待验证）
```
ALTER TABLE TABLE_NAME MOVE TABLESPACE_NAME
```
如何将索引移动表空间（待验证）
```
ALTER INDEX INDEX_NAME REBUILD TABLESPACE TABLESPACE_NAME
```
修改用户密码
```
alter user crmpRm identified by crmpRm;
```
查询这张表或SQL语句被哪台机器(人)操作过
```
select * from v$sqlarea a where upper(a.SQL_TEXT) like '%BUSINESS_APLLY%';
select * from v$sqltext a, v$sqlarea b where a.SQL_ID = b.SQL_ID and b.SQL_ID in ('dg5m09zfsa47w', '9ykgw8t8hzztu') order by b.LAST_LOAD_TIME;
select l.OSUSER,l.MACHINE from sys.v_$session l, sys.v_$sql s where s.SQL_ID = 'dg5m09zfsa47w' and l.USERNAME is not null;
```
41.改变服务器编码 
```
shutdown immediate;
startup mount;
alter system enable restricted session;
alter system set job_queue_processes=0;
alter system set aq_tm_processes=0;
alter database open;
alter database character set internal_use ZHS16GBK;
shutdown immediate;
startup; 
```
42.查看执行中和执行过的sql
(1)查询Oracle正在执行的sql语句及执行该语句的用户
```
SELECT b.sid oracleID,
    b.username 登录Oracle用户名,
    b.serial#,
    spid 操作系统ID,
    paddr,
    sql_text 正在执行的SQL,
    b.machine 计算机名
FROM v$process a, v$session b, v$sqlarea c
WHERE a.addr = b.paddr AND b.sql_hash_value = c.hash_value
```
(2)其它正在执行的sql语句代码
```
select a.username, a.sid,b.SQL_TEXT, b.SQL_FULLTEXT
 from v$session a, v$sqlarea b 
where a.sql_address = b.address 
---执行过的
select b.SQL_TEXT,b.FIRST_LOAD_TIME,b.SQL_FULLTEXT
 from v$sqlarea b
where b.FIRST_LOAD_TIME between '2020-05-21/09:24:47' and
    '2020-05-21/22:01:00' order by b.FIRST_LOAD_TIME
```
（此方法好处可以查看某一时间段执行过的sql，并且 SQL_FULLTEXT 包含了完整的 sql 语句）
(3)其他
```
select OSUSER,PROGRAM,USERNAME,SCHEMANAME,B.Cpu_Time,STATUS,B.SQL_TEXT 
from V$SESSION A LEFT JOIN V$SQL B ON A.SQL_ADDRESS=B.ADDRESS AND A.SQL_HASH_VALUE=B.HASH_VALUE order by b.cpu_time desc
 
select address, sql_text, piece 
 from v$session, v$sqltext 
where address = sql_address 
 -- and machine = < you machine name > 
order by address, piece
--查看正在执行sql的发起者的发放程序
SELECT OSUSER 电脑登录身份,
    PROGRAM 发起请求的程序,
    USERNAME 登录系统的用户名,
    SCHEMANAME,
    B.Cpu_Time 花费cpu的时间,
    STATUS,
    B.SQL_TEXT 执行的sql
FROM V$SESSION A
LEFT JOIN V$SQL B ON A.SQL_ADDRESS = B.ADDRESS
          AND A.SQL_HASH_VALUE = B.HASH_VALUE
ORDER BY b.cpu_time DESC
--查出oracle当前的被锁对象
SELECT l.session_id sid,
    s.serial#,
    l.locked_mode 锁模式,
    l.oracle_username 登录用户,
    l.os_user_name 登录机器用户名,
    s.machine 机器名,
    s.terminal 终端用户名,
    o.object_name 被锁对象名,
    s.logon_time 登录数据库时间
FROM v$locked_object l, all_objects o, v$session s
WHERE l.object_id = o.object_id
  AND l.session_id = s.sid
ORDER BY sid, s.serial#;
--kill掉当前的锁对象可以为
alter system kill session 'sid， s.serial#';
--查找前十条性能差的sql.
SELECT * FROM (select PARSING_USER_ID,EXECUTIONS,SORTS, 
COMMAND_TYPE,DISK_READS,sql_text FROM v$sqlarea 
order BY disk_reads DESC )where ROWNUM<10 ;
--查看占io较大的正在运行的session
SELECT se.sid,se.serial#,pr.SPID,se.username,se.status, 
se.terminal,se.program,se.MODULE,、se.sql_address,st.event,st. 
p1text,si.physical_reads, 
si.block_changes FROM v$session se,v$session_wait st, 
v$sess_io si,v$process pr WHERE st.sid=se.sid AND st. 
sid=si.sid AND se.PADDR=pr.ADDR AND se.sid>6 AND st. 
wait_time=0 AND st.event NOT LIKE '%SQL%' ORDER BY physical_reads DESC
```

