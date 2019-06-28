<template>
  <div
    style="padding-top: 20px;display: flex;flex-direction: column;justify-content: center;align-items: flex-start;height: 100%">
    <!-- 通话量首call率1 -->
    <el-table
      ref="table"
      :header-cell-style="{background:'#f5f7fa',borderColor:'#ebeef5',fontSize:'12px',lineHeight:'20px'}"
      :data="tableData"
      max-height="600"
      :row-key="getRowId"
      :expand-row-keys="expands"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
     >
      <el-table-column
        prop="level_name"
        label="组织架构"
        fixed="left"
        width="300"
        align="left">
      </el-table-column>
      <el-table-column
        prop="mt_job_num"
        label="在职商务数">
      </el-table-column>
      <el-table-column
        label="9:35-9:50">
        <el-table-column
          prop="mt_call_persontime_numa"
          label="通话人次"
          sortable>
        </el-table-column>
        <el-table-column
          label="首呼率"
          sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.mt_first_breath_rate_star }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="昨日首呼率"
          sortable
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mt_yester_first_breath_rate_stra}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="mt_first_breath_ratea_stra"
        label="9:35-9:50首呼率环比"
      >
      </el-table-column>
      <el-table-column
        label="14:00-14:15"
      >
        <el-table-column
          prop="mt_call_persontime_numb"
          label="通话人次"
          sortable
        >
        </el-table-column>
        <el-table-column
          label="首呼率"
          sortable
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mt_first_breath_rate_strb}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="昨日首呼率"
          sortable
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mt_yester_first_breath_rate_strb}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="mt_first_breath_ratea_strb"
        label="14:00-14:15首呼率环比"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { isEmpty } from "../../utils/validator";
  import {phone} from '@/requests'
  export default {
    name: 'callTable',
    props:['tableData','dataDate','dataText'],
    data() {
      return {
        expands:[],
        childrenData: [],
        queryData: {
          flag: 2,
          statisticalDimension: '',
          ytId: '',
          levelId: '',
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
    mounted(){
    },
    methods: {
      load(tree, treeNode, resolve, format = true) {
        if(!format){
            resolve(null);
        }
        if(!isEmpty(this.dataDate)){
          this.date = this.dataDate;
        }
        if(!isEmpty(this.dataText)){
          this.searchValue = this.dataText;
        }

        phone(this.sta,this.ytId,tree.level_id,this.date,this.searchValue).then(res=> {
          res.data.data.forEach(item => {
            if(!item.hasChildren){
              item.hasChildren = []
            }
          })
          resolve(res.data.data);
        })
      },

      dq() {
        this.$http.phone(this.queryData.statisticalDimension, this.queryData.ytId, this.queryData.levelId,
          this.queryData.date, this.queryData.fuzzyKeyWord).then(function (res) {
          // console.log('返回首呼数据')
          // console.log(res)
          this.childrenData = res.data.data;
          for (let i = 0; i < childrenData.length; i++) {
            Object.assign(childrenData[i], {hasChildren: true})
          }
        }).catch((err) => {
          console.log(err)
        });
      }
    },
    created() {
      // doQuery(this.queryData)
      // this.dq()
    }
  }
</script>

<style scoped>
</style>
