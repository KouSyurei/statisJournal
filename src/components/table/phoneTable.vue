<!-- 首呼频次 -->
<template>
  <div
    style="padding-top: 20px;display: flex;flex-direction: column;justify-content: center;align-items: flex-start;height: 100%">
    <!-- 通话量首call率 -->
    <el-table
      :header-cell-style="{background:'#f5f7fa',borderColor:'#ebeef5'}"
      :cell-style="cellStyle"
      :data="tableData"
      max-height="600"
      row-key="level_name"
      border lazy
      :row-key="getRowId"
      :expand-row-keys="expands"
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="level_name"
        label="组织架构"
        fixed="left"
        width="300">
      </el-table-column>
      <el-table-column
        prop="mt_job_num"
        label="在职商务数"
        width='120'
      >
      </el-table-column>
      <el-table-column
        label="今日通次"
      >
        <el-table-column
          prop="mt_per_capita_str"
          label="人均通次"
          width="120"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="mt_thirty_second_str"
          label="30s人均通次"
          width="150"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="mt_sixty_second_str"
          label="60s人均通次"
          width="150"
          sortable
        >
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="昨日通次"
      >
        <el-table-column
          prop="mt_yester_per_capita_str"
          label="昨日人均通次"
          width="150"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="mt_yester_thirty_second_str"
          label="昨日30s人均通次"
          width="160"
          sortable>
        </el-table-column>
        <el-table-column
          prop="mt_yester_sixty_second_str"
          label="昨日60s人均通次"
          width="160"
          sortable
        >
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="通次环比"
      >
        <el-table-column
          prop="mt_per_capita_rate_str"
          label="人均通次环比"
          width="150"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="mt_thirty_second_rate_str"
          label="30s人均通次环比"
          width="180"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="mt_sixty_second_rate_str"
          label="60s人均通次环比"
          width="180"
          sortable
        >
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="通时"
      >
        <el-table-column
          prop="mt_per_capita_time_str"
          label="人均通时"
          width="120"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="mt_yester_per_capita_time_str"
          label="昨日人均通时"
          width="150"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="mt_day_sequential_str"
          label="人均通时环比"
          width="150"
          sortable
        >
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="接通率"

      >
        <el-table-column
          prop="mt_through_rate_str"
          label="接通率"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="mt_yester_through_rate_str"
          label="昨日接通率"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="mt_through_rate_stra"
          label="接通率环比"
          width="120"
        >
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  // import { doQuery} from '../common/js/cusJs/queryData'
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
          flag: 1,
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
    mounted() {
      // this.query()
      console.log(this.dataDate)
    },

    methods: {
      load(tree, treeNode, resolve) {
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
          resolve(res.data.data)
        })
      },
      cellStyle(row, column, rowIndex, columnIndex){
        return null
      }
    }
  }
</script>

<style  scoped>

</style>

