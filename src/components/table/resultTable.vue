<template>
  <div
    style="padding-top: 20px;display: flex;flex-direction: column;justify-content: center;align-items: flex-start;height: 100%">
    <!-- 业绩日指标表 -->
    <el-table
      :header-cell-style="{background:'#f5f7fa',borderColor:'#ebeef5',fontSize:'12px',lineHeight:'20px'}"
      :data="tableData"
      height="550"
      max-height="600"
      style="width: 100%;margin-bottom: 20px;"
      :row-key="getRowId"
      :expand-row-keys="expands"
      row-key="id"
      border
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        tooltip-effect="dark"
        prop="level_name"
        border
        fixed="left"
        label="组织架构"
      >
      </el-table-column>
      <el-table-column
        prop="mp_day_the_target"
        label="日指标">
        <el-table-column
          prop="mp_day_the_target"
          label="日目标">
        </el-table-column>
        <el-table-column
          prop="mp_day_the_actual"
          label="日业绩完成额">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="mp_day_the_actual"
        label="环比">
        <el-table-column
          prop="mp_month_the_actual"
          label="本月至今完成额">
        </el-table-column>
        <el-table-column
          prop="mp_on_month"
          label="上月同期完成额">
        </el-table-column>
        <el-table-column
          prop="mp_on_on_month"
          label="上上月同期完成额">
        </el-table-column>
        <el-table-column
          prop="mp_day_the_actual"
          label="完成额环比">
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="同比（事业部层级）">
        <el-table-column
          prop="mp_on_year"
          label="去年同期完成额">
        </el-table-column>
        <el-table-column
          prop="mp_on_year_compared_str"
          label="完成额同比">
        </el-table-column>
      </el-table-column>
    </el-table>
    <!--    <div class="pagination" style="width: 100%;display: flex;flex-direction: row;justify-content: flex-end">-->
    <!--      <el-pagination-->
    <!--        background-->
    <!--        @size-change="handleSizeChange"-->
    <!--        @current-change="handleCurrentChange"-->
    <!--        :current-page="1"-->
    <!--        :page-size="5"-->
    <!--        layout="prev, pager, next, jumper"-->
    <!--        :total="10"-->
    <!--      >-->
    <!--      </el-pagination>-->
    <!--    </div>-->
  </div>
</template>

<script>
  import { isEmpty } from "../../utils/validator";
  import {result} from '@/requests'
  export default {
    name: 'resultTable',
    props:['tableData','dataDate','dataText'],
    data: function () {
      return {
        expands: [],
        childrenData: [],
        queryData: {
          flag: 0,
          statisticalDimension: 'day',
          ytId: '',
          levelId: '',
          date: '',
          fuzzyKeyWord: ''
        },

        date: '', //接口参数
        sta: 'day',
        ytId: '',
        searchValue: '',

        getRowId(row) {
          if (row.level_id == null) {
            return false
          }
          return row.level_id
        },
      }
    },
    methods: {
      load(tree, treeNode, resolve) {
        if(!isEmpty(this.dataDate)){
          this.date = this.dataDate;
        }
        if(!isEmpty(this.dataText)){
          this.searchValue = this.dataText;
        }
        result(this.sta,this.ytId,tree.level_id,this.date,this.searchValue).then(res => {
          res.data.data.forEach(item => {
            if (!item.hasChildren) {
              item.hasChildren = []
            }
          })
          resolve(res.data.data)
        })
      }
    }
  }
</script>

<style scoped>

</style>
