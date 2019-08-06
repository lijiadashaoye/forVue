import {
    top_product_list
} from '../../api/setting_use';

const state = {
    topProductList: {
        checkBox: false, // 判断需要不需要添加选择框,
        pageSize: 10,
        pageNum: 1,
        total: null,
        noIndex: true,
        actions: {},
        data: {
            list: [],
            quanxian: [],
            title: [],
            custom: []
        }
    },
}
const mutations = {
    getTopProductList(state, data) {
        top_product_list(data).then(res => {
            if (res && res.success) {
                state.topProductList.data.list = res.data.list;
                state.topProductList.total = res.data.total;
            }
        })
    },
    userDo(state) {
        state.topProductList.data.custom = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        if (jurisdiction.indexOf('top_product_edit') > -1) {
            state.topProductList.data.quanxian.push('ok')
            state.topProductList.data.custom.push({
                text: "修改",
                type: "primary",
                size: "small",
                emit: "emit"
            });
        }
        if (jurisdiction.indexOf('top_product_del') > -1) {
            state.topProductList.data.custom.push({
                text: "删除",
                type: "danger",
                size: "mini",
                emit: "delete" 
            });
        }
    },
}
const actions = {
    getList({commit},data) {
        commit('getTopProductList',data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}