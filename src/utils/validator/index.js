/**
 * author: ks
 * time: 2019/6/18 14:23
 * desc: 验证非空
 ***/

export const isEmpty = ( value ) =>{
  let isEmpty = value === undefined || value === null || value === "" || value === '' || value === 'undefined'
  return isEmpty;
}
