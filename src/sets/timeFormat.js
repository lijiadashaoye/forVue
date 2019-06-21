export const timestampToTime = (timestamp)=> {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '/',
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/',
    D = date.getDate() + ' ',
    h = '0'+ date.getHours() + ':0',
    m = date.getMinutes() + ':0',
    s = date.getSeconds();
    return Y+M+D+h+m+s;
}