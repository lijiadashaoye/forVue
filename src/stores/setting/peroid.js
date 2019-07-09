import {
    peroid_list,
    peroid_delete
} from '../../api/setting_use'
const state = {
    peroidList: {
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
    getPeroidListData(state) {
        peroid_list({
            pageNum: state.peroidList.pageNum,
            pageSize: state.peroidList.pageSize,
        }).then(res => {
            if (res) {
                state.peroidList.data.list = res.data.list;
                state.peroidList.total = res.data.total;
                state.peroidList.data.list && state.peroidList.data.list.forEach(v => {
                    if (v.peroidType === 'PETTY') {
                        v.peroidTypeCN = '小额'
                    } else if (v.peroidType === 'FINANCING') {
                        v.peroidTypeCN = '理财'
                    }
                    if (v.showType === 'TABLE') {
                        v.showTypeCN = '表格'
                    } else if (v.showType === 'PORTRAIT') {
                        v.showTypeCN = '竖版'
                    }
                    if (v.validStatus === 'VALID') {
                        v.validStatusCN = '有效 '
                    } else if (v.validStatus === 'INVALID') {
                        v.validStatusCN = '无效'
                    }
                })
            }
        })
    },
    //权限认证
    userDo(state) {
        state.peroidList.data.custom = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        if (jurisdiction.indexOf('index_peroid_upd') > -1) {
            state.peroidList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if (jurisdiction.indexOf('black_list_del') > -1) {
            state.peroidList.data.custom.push({
                text: "删除",
                type: "danger",
                size: "mini",
                emit: "delete"
            });
        }
    },
}

const actions = {
    getList({
        commit
    }) {
        commit('getPeroidListData')
    },
    deleteList({
        commit
    }, id) {
        peroid_delete(id).then((res) => {
            if (res.success) {
                commit('getPeroidListData')
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