// 网址验证
export function websiteRegx(url){
    let pattern = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*/;
    return pattern.test(url);
}
// 邮箱验证
export function emailRegx(value){
    let  reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return reg.test(value)
}
// 手机号验证
export function phoneRegx(num){
    let pattern = /^1(3|4|5|6|7|8|9)\d{9}$/;
    return pattern.test(num);
}
// 验证正整数
export function intNum(num){
    let pattern = /^[1-9]\d*$/;
    return pattern.test(num);
}
// 验证数字和字母 
export function numberRegx(value){
    let pattern = /^[0-9a-zA-Z]*$/g;
    return pattern.test(value);
}