const utilMethod = {}
// 时分秒方法
utilMethod.nowTime=function nowTime (){
  var nowDate = new Date();
  var year = nowDate.getFullYear();
  var month = nowDate.getMonth() + 1;
  month = month > 9 ? month : "0" + month;
  var date = nowDate.getDate();
  date = date > 9 ? date : "0" + date;
  var hour = nowDate.getHours();
  hour = hour > 9 ? hour : "0" + hour;
  var miunte = nowDate.getMinutes();
  miunte = miunte > 9 ? miunte : "0" + miunte;
  var second = nowDate.getSeconds();
  second = second > 9 ? second : "0" + second;
  var getMilliseconds = nowDate.getMilliseconds();
  getMilliseconds =
    getMilliseconds > 9 ? getMilliseconds : "00" + getMilliseconds;
  getMilliseconds =
    getMilliseconds > 99 ? getMilliseconds : "0" + getMilliseconds;
  return year+""+ month+""+ date+""+ hour+""+ miunte+""+second+""+ getMilliseconds+"";

}

 /**
     * 
     * 金额自动补小数点后两位,碰到3的倍数则加上“,”号
     */
    utilMethod.formatNum=function formatNum (str) {
      if(!str) return str
  // if(str == '' || !str) return
      var newStr = "";
      var count = 0;
      if (str.indexOf(".") == -1) {
          for (var i = str.length - 1; i >= 0; i--) {
              if (count % 3 == 0 && count != 0) {
                  newStr = str.charAt(i) + "," + newStr;
              } else {
                  newStr = str.charAt(i) + newStr;
              }
              count++;
          }
          str = newStr + ".00"; //自动补小数点后两位
          return str
      }
      else {
          for (var i = str.indexOf(".") - 1; i >= 0; i--) {
              if (count % 3 == 0 && count != 0) {
                  newStr = str.charAt(i) + "," + newStr; //碰到3的倍数则加上“,”号
              } else {
                  newStr = str.charAt(i) + newStr; //逐个字符相接起来
              }
              count++;
          }
          str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
          return str
      }
  }


  //输入int类型数字后自动在后面加.00，输入double型保留小数点后两位 
  utilMethod.getFloatStr = function getFloatStr(num){  
    num += '';  
    num = num.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符  
      
    if(/^0+/) //清除字符串开头的0  
        num = num.replace(/^0+/, '');  
    if(!/\./.test(num)) //为整数字符串在末尾添加.00  
        num += '.00';  
    if(/^\./.test(num)) //字符以.开头时,在开头添加0  
        num = '0' + num;  
    num += '00';        //在字符串末尾补零  
    num = num.match(/\d+\.\d{2}/)[0];  

    return num;
  };  


export default utilMethod
