/**
 * author: ks
 * time: 2019/6/18 17:31
 * desc: 处理日期 时间 工器具类
 ***/
import { isEmpty } from "../validator";

//获取只有年月日的日期
export const getYMD = function (completeDate) {
 if(!isEmpty(completeDate)){
   let year =  completeDate.getFullYear();
   let mounth = completeDate.getMonth()<10 ? '0'+(completeDate.getMonth()+1) : completeDate.getMonth()+1;
   let date = completeDate.getDate();
   const cusData = year+'-'+mounth+'-'+date;
   return cusData;
 }
 return '';
};

export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

/**
 * 查询条件是否改变
 */
export function noChange() {

}
