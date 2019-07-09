import Vue from 'vue'
import App from './App.vue';
import everyApi from './api/index.js'

import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

import store from './stores/index.js';
import router from './route.js';

import axios from './sets/axios_set.js';
Vue.prototype.$axios = axios;

// 绑定自定义指令
import directive from './directive.js';
Vue.directive("regText", directive.regText);

Vue.prototype.$api = everyApi;
Vue.use(everyApi)

//禁止输入特殊字符
Vue.prototype.validForbid = function (value) {
    var reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g;
    if(reg.test(value)) {
      this.$message({
        type: 'warning',
        message: `不能输入特殊字符`
      })
      value = value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
    }
    return value;
  }
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

// 设置全局图片请求的baseUrl
if (process.env.NODE_ENV == "development") {
  Vue.prototype.$ImgBaseUrl =
    "https://bicai-architecture-test.oss-cn-beijing.aliyuncs.com/";
} else {
  Vue.prototype.$ImgBaseUrl =
    "https://bicai-architecture.oss-cn-beijing.aliyuncs.com/";
}

let isApp = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

export default isApp