import {
    Message
} from 'element-ui';


export default {
    // 特殊字符验证
    // 如果不包含特殊字符返回true
    regText: function (el, tar, con) { //  v-regText
        el.addEventListener("input", function (e) {
            e = e || window.event;
            let values = e.data;
            var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;

            if (patrn.test(values)) {
                setTimeout(() => {
                    con.componentInstance.clear() //清空当前输入的内容
                }, 1000)
                Message({
                    message: '不能输入特殊字符！',
                    type: 'error',
                    duration: 3 * 1000
                })
            }
        });
    },
    'loadmore': {
        bind(el, binding) {
            // 获取element-ui定义好的scroll盒子
            const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
            SELECTWRAP_DOM.addEventListener('scroll', function () {
                const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
                if (condition) {
                    binding.value();
                }
            });
        }
    }
}