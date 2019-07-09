
import {
    Message
} from 'element-ui';


export default {
    // 特殊字符验证
    regText: function (el,tar,con) {  //  v-regText
        el.addEventListener("input", function (e) {
            e = e || window.event;
            let values = e.data;
            var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
            if (patrn.test(values)) {// 如果不包含特殊字符返回true
                setTimeout(() => {
                    con.componentInstance.clear()//清空当前输入的内容
                }, 1000)
                Message({
                    message: '不能输入特殊字符！',
                    type: 'error',
                    duration: 3 * 1000
                })
            }
        });
    },
}