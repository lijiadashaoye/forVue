// 网址验证
export function websiteRegx(url){
    let pattern = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/;
    return pattern.test(url);
}
// 手机号验证
export function phoneRegx(num){
    let pattern = /^1(3|4|5|6|7|8|9)\d{9}$/;
    return pattern.test(num);
}