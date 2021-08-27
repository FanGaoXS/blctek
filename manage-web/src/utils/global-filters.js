
/**
 * 里程数过滤器（将米->公里并且保留3位有效数字）
 * @param mileage
 * @returns {string}
 */
export function mileageFilter(mileage) {
  return (mileage/1000).toFixed(3)+ '公里';
}

/**
 * 车牌号过滤器，中间加个点'·'
 * @param plateNumber
 * @returns {string}
 */
export function plateNumberFilter(plateNumber) {
  /*console.log(plateNumber);
  console.log(typeof plateNumber);*/
  if (plateNumber!==undefined) { //如果车牌号字符串不为空才执行
    let str1 = plateNumber.slice(0,2);
    let str2 = plateNumber.slice(2);
    return str1 + '·' + str2 ;
  }
}

/**
 * 车牌类型过滤
 * @param plateType
 * @returns {*}
 */
export function plateTypeFilter(plateType){
  // 如果是汽油车则显示灰色样式，新能源显示success样式
  const plateTypeMap = {
    '汽油车': '',
    '新能源': 'success',
  };
  return plateTypeMap[plateType];
}

/**
 * 时间过滤器
 * @param time
 * @returns {string}
 */
export function timeFilter(time){

  return ' '+(new Date(time).toLocaleString())
}

