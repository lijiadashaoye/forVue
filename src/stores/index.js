import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import for_layout from './for_layout'; //全局登录
import powerTable from './powerTable';  //table列表专用
import alarmConfig from './alarm/alarmConfig'; //系统预警配置


const store = new Vuex.Store({
    modules: { // 使用状态整合来区分
        for_layout,
        powerTable,
        alarmConfig,
    }
});

export default store;