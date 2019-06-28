/**
 * author: ks
 * time: 2019/6/15 17:07
 * desc: 组织架构展开功能
 ***/
import {phone} from '@/requests'
// import '../../../../main'
// import Vue from 'vue'
import axios from 'axios'


let childrenData = []

export const doQuery =function(queryData) {
  // console.log(queryData);
  switch (queryData.flag) {
    case 0 :
      this.$http.result(queryData.statisticalDimension, queryData.ytId, queryData.level_id, queryData.date, queryData.fuzzyKeyWord).then((res) => {
        // console.log('返回业绩数据')
        // console.log(res)
        childrenData = res.data.data
      }).catch((err) => {
        console.log('首呼频次' + err)
      })
      break;
    case 1:
      this.$http.phone(queryData.statisticalDimension, queryData.ytId, queryData.level_id, queryData.date, queryData.fuzzyKeyWord).then((res) => {
        // console.log('返回电话数据')
        // console.log(res)
        childrenData = res.data.data;
        for (let i = 0; i < this.childrenData.length; i++) {
          childrenData[i].hasChildren = true
        }
      }).catch((err) => {
        console.log(err)
      })
      break;
    case 2 :
      phone(queryData.statisticalDimension, queryData.ytId, queryData.levelId, queryData.date, queryData.fuzzyKeyWord).then(function(res)  {
        console.log('返回首呼数据')
        console.log(res)
        childrenData = res.data.data;
      }).catch((err) => {
        console.log(err)
      });
      break;
    case 3 :
      this.$http.visitor(queryData.statisticalDimension, queryData.ytId, queryData.level_id, queryData.date, queryData.fuzzyKeyWord).then((res) => {
        // console.log('返回访客量')
        // console.log(res)
        childrenData = res.data.data
      }).catch((err) => {
        console.log(err)
      })
      break;
    default:
      axios.get("./components/common/jsonData/childrenData.json").then((res) => {
        childrenData = res
      })
      break;
  }
  console.log(childrenData)
  return childrenData
}

