<template>
  <div class="el-container">
    <!-- 见客签单 -->
    <el-table
      class="el-table__body"
      :header-cell-style="{background:'#f5f7fa',borderColor:'#ebeef5',fontSize:'12px',height:'20px',lineHeight:'20px'}"
      :data="tableData" max-height="600" border
      :row-key="getRowId"
      :load="load"
      :lazy="true"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}" >
      <el-table-column
        prop="level_name"
        label="组织架构"
        fixed="left"
        width="300">
      </el-table-column>
      <el-table-column
        label="今日"
      >
        <el-table-column
          prop="ms_invite_num"
          label=" 预约量"
        >
        </el-table-column>
        <el-table-column
          prop="ms_see_num"
          label=" 见客量"
        >
        </el-table-column>
        <el-table-column
          prop="ms_visit_rate_str"
          label="见客率"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="ms_invite_num_today"
        label="昨日"
      >
        <el-table-column
          prop="ms_yester_invite_num"
          label="昨日预约量"
        >
        </el-table-column>
        <el-table-column
          prop="ms_yester_see_num"
          label="昨日见客量"
        >
        </el-table-column>
        <el-table-column
          prop="ms_yester_visit_rate_str"
          label="昨日见客率"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="日环比">
        <el-table-column
          prop="ms_invite_rate_str"

          label="预约量环比">
        </el-table-column>
        <el-table-column
          prop="ms_see_rate_str"

          label="见客量环比">
        </el-table-column>
        <el-table-column
          prop="ms_visit_rate_stra"

          label="见客率环比">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="ms_invite_num_ratio"
        label="月数据">
        <el-table-column

          prop="ms_month_farsee_num"
          label="月至今见客量">
        </el-table-column>
        <el-table-column

          prop="ms_month_sum"
          label="上月累计客量">
        </el-table-column>
        <el-table-column

          prop="ms_month_farsee_rate_str"
          label="月至今见客量环比">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { isEmpty } from "../../utils/validator";
  import { visitor } from '@/requests'
  export default {
    name: 'guestTable',
    props:['tableData','dataDate','dataText','getExpand'],
    data () {
      return {
        expands:[],
        childrenData: [],
        queryData:{
          flag:3,
          statisticalDimension: 'day',
          ytId: '',
          levelId: '' ,
          date: '',
          fuzzyKeyWord: ''
        },

        date: '', //接口参数
        sta: 'day',
        ytId: '',
        searchValue: '',
        getRowId(row){
          if(row.level_id == null){
            return false
          }
          return row.level_id
        },
      }
    },
    watch:{
      getExpand(val){
        // console.log(val)
      }
    },
    mounted(){
      console.log(this.getExpand);
      // this.expands = this.getExpand
    },
    methods:{
      load(tree, treeNode, resolve) {
        if(!isEmpty(this.dataDate)){
          this.date = this.dataDate;
        }
        if(!isEmpty(this.dataText)){
          this.searchValue = this.dataText;
        }
        visitor(this.sta,this.ytId,tree.level_id,this.date,this.searchValue).then(res=> {
          res.data.data.forEach(item => {
            if(!item.hasChildren){
              item.hasChildren = []
            }
          });
          resolve(res.data.data)
        })
      }
  }
  }
</script>

<style lang="scss" scoped>
  @import "../common/css/table.css";
  .el-container{
    display: flex;flex-direction: column;
    justify-content: center;align-items: flex-start;height: 100%;
  }
</style>
<style>
  .el-table thead{
    color: #333;
  }
  .el-table th{
    padding: 6px;
  }
</style>
