import {
    productUrl_list,
    productUrl_delete
} from '../../api/setting_use'
const state = {
    productUrlList: {
        checkBox: false, // 判断需要不需要添加选择框
        pageSize: 10,
        pageNum: 1,
        total: null,
        actions: {

        },
        data: {
            list: [],
            quanxian: [],
            title: [],
            custom: []
        },
    }
}
const mutations = {
    //获取列表数据
    getProductUrlListData(state) {
        productUrl_list({
            pageNum: state.productUrlList.pageNum,
            pageSize: state.productUrlList.pageSize,
        }).then(res => {
            if (res) {
                state.productUrlList.data.list = res.data.list;
                state.productUrlList.total = res.data.total;
            }
        })
    },
    userDo() {
        state.productUrlList.data.custom = [];
        state.productUrlList.data.custom.push({
            text: "修改",
            type: "warning",
            size: "small",
            emit: "edit"
        });
        state.productUrlList.data.custom.push({
            text: "删除",
            type: "danger",
            size: "small",
            emit: "delete"
        });
    }
}

const actions = {
    getList({
        commit
    }) {
        commit('getProductUrlListData')
    },
    deleteList({
        commit
    }, id) {
        console.log(id)
        productUrl_delete(id).then((res) => {
            if (res &&　res.success) {
                commit('getProductUrlListData')
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}