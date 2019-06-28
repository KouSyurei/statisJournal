<template>
<el-container class="el-container">
  <el-header class="cus-head">
    <!-- 业态选择 start -->
    <div class="inputYt"  v-if=" true">
      <span class="label-font">维度：</span>
      <el-select class="el-select"
                 disabled
                 size="mini"
                 @change="select"
                 v-model="dimValue"
                 placeholder="请选择">
        <el-option
          v-for="(item,index) in dimensionData"
          :key="index"
          :label="item.value"
          :value="item.key">
        </el-option>
      </el-select>
    </div>
    <div>
      <span class="label-font"> 业 态 ：</span>
      <el-select
        size="mini"
        class="el-select"
        v-model="formatsValue"
        @change="select"
        placeholder="请选择">
        <el-option
          v-for="(item,index) in formatsData"
          :key="index"
          :label="item.value"
          :value="item.key">
        </el-option>
      </el-select>
    </div>
    <!-- 业态选择 end -->

    <!-- 日期选择器 start -->
    <div v-if="true">
      <span  class="label-font" >日期：</span>
      <el-date-picker
        size="mini"
        class="el-date"
        v-model="choiceDate"
        @change="selectDate"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions">
      </el-date-picker>
    </div>
    <!-- 日期选择器 end -->

    <!-- 自定义搜索框 start -->
    <el-input v-if="true"
              size="mini"
              class="cus-input"
              placeholder="请输入部门 / 姓名"
              @input="showAll"
              @keyup.enter.native="search"
              v-model="inputValue">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>

    <div v-if="true" class="cus-butgroup">
      <!-- 自定义搜索框 end -->
      <el-button v-if="true" class="searchBtn" size="mini"@click="search">
        查询</el-button>
      <!-- 导出按钮 -->
<!--      <el-button  size="mini"  @click="exportExcel">导出</el-button>-->
    </div>

  </el-header>

  <el-main style="
  display: flex;flex-direction: column;padding:10px">
    <el-tabs type="border-card"  @tab-click="tabClick" v-model="defaultActiveTab">
      <el-tab-pane v-model="resTab" :label="resTab.value" :name="resTab.key">
        <result-table :table-data  = "tableData" v-if="isRefreshResTab" :data-date="dateValue" :data-text="dataText"/>
      </el-tab-pane>
      <el-tab-pane v-model="phoneTab" :label="phoneTab.value" :name="phoneTab.key">
        <phone-table  :table-data  = "tableData" v-if="isRefreshPhoneTab" :data-date="dateValue" :data-text="dataText"/>
      </el-tab-pane>
      <el-tab-pane v-model="callTab" :label="callTab.value" :name="callTab.key">
        <call-table  :table-data = "tableData" v-if="isRefreshCallTab" :data-date="dateValue" :data-text="dataText"/>
      </el-tab-pane>
      <el-tab-pane v-model="guestTab" :label="guestTab.value" :name="guestTab.key">
        <guest-table :table-data ="tableData" v-if="isRefreshGuestTab" :data-date="dateValue" :data-text="dataText" :isExpand="isExpand"/>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</el-container>
</template>

<script>
  import  resultTable from '../components/table/resultTable'
  import  phoneTable from '../components/table/phoneTable'
  import  callTable from '../components/table/callTable'
  import  guestTable from '../components/table/guestTable'
  import  webSocket from '../components/webScoket/index'
  import { isEmpty } from '../utils/validator/index'
  import { getYMD,formatDate } from "../utils/dateUtil";

  export default {
      name: "index",
      components:{resultTable,phoneTable,callTable,guestTable,webSocket},
      data(){
          return{
            isRefreshResTab: true,
            isRefreshPhoneTab: true,
            isRefreshCallTab: true,
            isRefreshGuestTab: true,
            inputValue:'',  //输入框输入的值
            value: '',
            choiceDate: new Date(), //选择的日期
            dateValue: formatDate(new Date(), "yyyy-MM-dd"),
            menus:[
              {key:'dim',value:'维度'},
              {key:'formats',value:'业态'},
            ],//菜单
            dimensionData:[{key:'dayDim',value:'日报表'}],
            formatsData: [{key:'',value:'全部'}],    //业态数据
            pickerOptions: {    //带快捷的日期选择
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
              shortcuts: [{
                text: '今天',
                onClick(picker) {
                  picker.$emit('pick', new Date());
                }
              }, {
                text: '昨天',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24);
                  picker.$emit('pick', date);
                }
              }, {
                text: '一周前',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', date);
                }
              }]
            },

            dimValue:'日报表',    //选中的维度值
            formatsValue: '全部',//选中的业态值

            resTab:{key:'result',value:'业绩进度'},
            phoneTab:{key:'phone',value:'电话量'},
            callTab:{key:'call',value:'首呼频次'},
            guestTab:{key:'guest',value:'见客签单'},
            activeTabIndex:'2', //选中标记卡的index从0开始
            defaultActiveTab: 'call',//默认选中的标记卡

            sta: 'day', //查询条件 维度
            ytId:'',
            levelId:'',
            dataText:'',

            tableData:[] , //存放表格数据
            tableFilterData: [], //表格过滤数据
            getExpand:[], //row-key level_id

            isExpand: false //条件查询后展开树结构
          }
      },
      created () {
        /**
       * 页面加载请求所有业态
       */
        this.$http.formats().then((res)=>{
            this.validaRes('menu',res)
          }).catch((err)=>{
            console.log("请求业态异常："+err);
        });

        /**
         * 页面初始化表格
         */
        this.query(this.sta,this.ytId,this.levelId,getYMD(this.choiceDate),this.inputValue,2)
      },
      methods:{
        search () {
          const searchValue = this.inputValue;
          this.isExpand = true;
          this.dataText = searchValue
            // alert('没条件查所有的条件'+this.ytId+';;'+this.choiceDate+';;'+this.activeTabIndex)
            this.query(this.sta,this.ytId,this.levelId,getYMD(this.choiceDate),this.inputValue, this.activeTabIndex)
        },
        exportExcel () { //导出数据表格
          this.$http.exportExcel().then((res)=>{
            console.log(res);
          }).catch((err)=>{
            console.log('导出excel请求异常' + err);
          })
        },
        select (item) {//选中下拉
          this.ytId = item;
          // this.query(this.sta,item,this.levelId,getYMD(this.choiceDate),this.inputValue, this.activeTabIndex)
        },
        selectDate (item) {//选择时间
          var choiceDate = formatDate(new Date(item), "yyyy-MM-dd");
          if(item == null){
            choiceDate = "";
          }
          this.dateValue = choiceDate
          // this.query(this.sta,this.ytId,this.levelId,choiceDate,this.inputValue, this.activeTabIndex)
        },
        tabClick (item) {//标记卡选择
          this.activeTabIndex = item.index;
          this.query(this.sta,this.ytId,this.levelId,getYMD(this.choiceDate),this.inputValue, item.index)
        },
        showAll () { //输入框空显示当前业态表格的所有数据
            if(isEmpty(this.inputValue)){
            this.query(this.sta,this.ytId,this.levelId,getYMD(this.choiceDate),'',this.activeTabIndex);
        }
        },
        query(sta,ytId,levelId,date,searchValue,activeTabIndex){  //执行查询 业态id和激活选项卡index
          let flag = parseInt(activeTabIndex);
          let type = 'table'; //验证方法需要的标志
          if ( flag === 0 ) {
            this.$http.result( sta,ytId,levelId,date,searchValue).then((res) => {
              // console.log('返回业绩数据')
              // console.log(res);
              this.isRefreshResTab = false;
              this.$nextTick(()=>{
                this.validaRes(type,res)
              })
            }).catch((err) => {
              console.log('请求业绩接口出错' + err)
            })
          }

          if ( flag === 1 ) {
             this.$http.phone( sta,ytId,levelId,date,searchValue).then((res) => {
               // console.log('返回电话数据')
               // console.log(res)
               this.isRefreshPhoneTab = false;
               this.$nextTick(()=>{
                 this.validaRes(type,res)
               })
             }).catch((err) => {
               console.log(err)
             })
           }

          if  ( flag === 2 ) {
              this.$http.phone( sta,ytId,levelId,date,searchValue).then((res) => {
                // console.log('返回首呼数据')
                // console.log(res)
                this.isRefreshCallTab = false;
                this.$nextTick(()=>{
                  this.validaRes(type,res)
                })
              }).catch((err) => {
                console.log(err)
              })
            }

          if ( flag === 3) {
            this.$http.visitor( sta,ytId,levelId,date,searchValue).then((res) => {
              this.isRefreshGuestTab = false;
              this.$nextTick(()=>{
                this.validaRes(type,res)
              })
            }).catch((err) => {
              console.log(err)
            })
          }
        },
        validaRes(type,res){  //验证后台返回数据,type 验证的是哪个接口的返回数据
          if (res.code !== 0 || res.data.length !== 0) {  //code=0 请求成功 data.length=0 请求返回的数据为空
            switch (type) {
              case 'menu':
                for ( let temp of res.data.data){
                  this.formatsData.push({key:temp.yt_id,value:temp.yt_name})
                }
                break;
              case 'table':
                this.isRefreshResTab = true;
                this.isRefreshPhoneTab = true;
                this.isRefreshCallTab = true;
                this.isRefreshGuestTab = true;
                this.tableData = res.data.data;
                this.tableFilterData = res.data.data;
                break
            }
          }else {
            console.log('请求返回空数据');
          }
        },
      }
    }


</script>

<style lang="scss" scoped>
  .el-container{
    background-color: #E5E5E5;
    width: 100%;
    height: 100%;
    padding-bottom: 10px;
    .cus-head{
      height: 80px;
      margin: 20px 10px 10px 10px;
      background-color: #ffffff;display: flex;flex-direction: row;
      align-items: center;
    }
  .el-select>.el-input{
    width: 200px;
  }
  .inputYt {
    .el-input {
      width: 70%;
      height: 30px;
      line-height: 30px;
      .el-input__inner {
        height: 30px;
        line-height: 30px;
        border: 0px;
      }
      .el-input__icon {
        line-height: 30px;
      }
    }
  }
    .cus-input{
      width: 9%;margin-left: 20px
    }
  .el-select{
      width: 60%;
      height: 10px;
      line-height: 10px;
    }
  .el-date{
    width: 60%;
  }
    .el-input__inner {
      border: #ffffff;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
    }

    .el-icon-search {
      color: rgb(221, 221, 221);
    }
    .cus-butgroup{
      display: flex;
      flex-direction: row;
      padding:0px 40px 0px 40px;
    }
    .label-font{
      margin-right: 5px;
      font-size: 12px;
      color: #333333;
    }
    .searchBtn{
      background-color: #FF884C;
      color: #ffffff;
    }
  }
</style>
