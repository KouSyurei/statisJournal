# statisjournal

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

DEMI：
1、下拉菜单维度
2、下来菜单业态
3、不同状态的表格
4、组织架构
==》后台接口
1、表格显示
2、表格切换
3、查询
4、树形结构展开到个人：
  一、显示个人的数据
      1、在组织架构数据表格中点击单元格跳转到个人数据表格页面
      2、组织架构字段儿和个人字段一样以树的结构显示
         #
         1、首呼和电话量两个表格中的个人的数据字段儿有哪些？
  二、导出个人的数据

businessLogic:
1、根据业态 查询该业态的业绩 守护频次 见客量
2、根据部门查看到个人的业绩
3、搜索部门或员工
4、导出表格

develop：
1、参数
   维度： null
   日期： null
   业态Id： ytID
   部门iD： level_id
   查询条件：null
 ---------------------------------------------------6/18---------------------------------------------
 1、所有表格表头固定 max-height=""
2、页面初始化：业态选择显示的默认值
  ① 写死  =》this
  ② 等到业态加载到了值后，表格接口请求再执行
  3、放开了维度默认为日报表 禁用状态；
    放开了日期选择 默认选中今天
 --------------------------------------------------6/19-------------------------------------------------------
1、输入框没有值显示全部
  @input值为空触发
--------------------------------------------------- 6/20--------------------------------------------------
 1、表格视图刷新
  ① isHock isSearch
 2、最底树结构图标不显示
 -------------------------------------------------------6/21--------------------------------------
 1、IndexedDB异步请求，Uncaught TypeError: Cannot read property 'transaction' of undefined     at loadTableData
 ==》所有IndexedDB数据库的操作都是异步的，使用promise 
  ---------------------------------------------------------6、27--------------------
  1、Uncaught (in promise) DOMException: Failed to execute 'add' on 'IDBObjectStore': HTMLInputElement object could not be cloned.
