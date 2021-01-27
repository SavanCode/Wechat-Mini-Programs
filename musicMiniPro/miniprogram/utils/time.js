/**
 * function: 60秒内（刚刚），60秒至60分钟（**分钟前），1小时至24小时（**小时前），1天至15天（**天前），其他为正常日期显示
 * @number   時間戳
 */

function formatMsgTime(number) {
  var dateTime = new Date(number); // 将传进来的字符串或者毫秒转为标准时间
  var Y = dateTime.getFullYear(); // 年
  var M = dateTime.getMonth() + 1; // 月
  var D = dateTime.getDate(); // 日
  var h = dateTime.getHours(); // 时
  var m = dateTime.getMinutes(); // 分
  var millisecond = dateTime.getTime(); // 将当前编辑的时间转换为毫秒
  var now = new Date(); // 获取本机当前的时间
  var nowNew = now.getTime(); // 将本机的时间转换为毫秒
  var milliseconds = 0;
  var numberStr;
  milliseconds = nowNew - millisecond;
  if (milliseconds <= 1000 * 60 * 1) { // 小于一分钟展示为刚刚
    numberStr = '刚刚'
  } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) { // 大于一分钟小于一小时展示为分钟
    numberStr = Math.round((milliseconds / (1000 * 60))) + '分钟前'
  } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) { // 大于一小时小于一天展示为小时
    numberStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
  } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) { // 大于一天小于十五天展示位天
    numberStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
  } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && Y === now.getFullYear()) {
    numberStr = M + '-' + D + ' ' + h + ':' + m
  } else {
    numberStr = Y + '-' + M + '-' + D + ' ' + h + ':' + m
  }
  return numberStr
}
 
/**
 * function: 時間戳轉日期
 * @number   時間戳
 * @type     格式（1為年-月-日 時-分-秒，2為年-月-日）
 */
function toDate(number, type) {
  var date = new Date(number);
  var Y = date.getFullYear();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  if (type == '1') {
    return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
  } else if (type == '2') {
    return Y + '-' + M + '-' + D;
  }
}
 /** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}


// 毫秒转换
function formatDuring(mss) {
  var days = mss / (1000 * 60 * 60 * 24);
  var hours = (mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
  var minutes = (mss % (1000 * 60 * 60)) / (1000 * 60);
  var seconds = (mss % (1000 * 60)) / 1000;
  return { days:days,hours:hours,minutes:minutes,
    seconds:seconds};
}

module.exports = {
  toDate: toDate,
  formatMsgTime: formatMsgTime,
  formatTimeTwo:formatTimeTwo,
  formatDuring:formatDuring
}