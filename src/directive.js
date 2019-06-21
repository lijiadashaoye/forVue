
import {
    Message
} from 'element-ui';


export default {
    // 特殊字符验证
    regText: function (el) {  //  v-regText
        el.addEventListener("input", function (e) {
            e = e || window.event;
            let values = e.data;
            var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
            if (patrn.test(values)) {// 如果不包含特殊字符返回true
                Message({
                    message: '不能输入特殊字符！',
                    type: 'error',
                    duration: 3 * 1000
                })
            }
        });
    },
}