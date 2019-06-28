import axios from 'axios'
import '../components/common/js/jquery.min.js'
// import '../utils/http.js'
import {
  post
} from '@/utils/http.js'

const ajax = axios.create({
  // baseURL: 'https://dibossimsa.dgg.net/',  //本地测试
  baseURL: 'https://tmanagebi.dgg.net/',  //后台测试服务
  async: false
});

// 业态
export const formats = () => {
  return axios.get(`/api/middlegroundTelephone/listYtIdAndName.do`)
};

// 业绩
export const result = (statisticalDimension,ytId,levelId,date,searchValue) => {
  return axios.post(`/api/middlegroundPerformance/findMiddlegroundPerformanceList.do?statisticalDimension=${statisticalDimension}
  &ytId=${ytId}&levelId=${levelId}&date=${date}&fuzzyKeyWord=${searchValue}`)
};

// 电话量和首呼率
export const phone = (statisticalDimension,ytId,levelId,date,searchValue) => {
  // console.log('维度：'+statisticalDimension+'业态id:'+ytId+'部门id:'+levelId+'日期：'+date+'查询条件：'+searchValue)
  return axios.post(`/api/middlegroundTelephone/findMiddlegroundTelephoneList.do?statisticalDimension=${statisticalDimension}&ytId=${ytId}&levelId=${levelId}&date=${date}&fuzzyKeyWord=${searchValue}`)

};

// 访客统计
export const visitor = (statisticalDimension,ytId,levelId,date,searchValue) => {
  return axios.post(`/api/middlegroundSeetheguest/findMiddlegroundSeetheguestList.do?statisticalDimension=${statisticalDimension}
  &ytId=${ytId}&levelId=${levelId}&date=${date}&fuzzyKeyWord=${searchValue}`)
};

//导出表格
export  const exportExcel = () => {
  return ajax.get(`/api/middlegroundTelephone/excel.do`)
};

