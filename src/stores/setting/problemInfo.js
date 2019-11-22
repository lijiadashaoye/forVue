import {
    problemInfo_list
} from '../../api/setting_use';
const state = {
    problemInfoList: {
        noIndex: true,
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
    getProblemInfoListData(state, data) {
        problemInfo_list(data).then(res => {
            if (res && res.success) {
                state.problemInfoList.data.list = res.data.list;
                state.problemInfoList.total = res.data.total;
                state.problemInfoList.data.list.forEach(v => {
                    if (v.status == 'SHOW') {
                        v.statusCN = '上架'
                    } else if (v.status == 'HIDE') {
                        v.statusCN = '下架'
                    }
                })
            }
        })
    },
    userDo() {
        state.problemInfoList.data.custom = [];
        let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
        if (jurisdiction.indexOf('question_info_upd') > -1) {
            state.problemInfoList.data.quanxian.push('ok')
            state.problemInfoList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if (jurisdiction.indexOf('question_info_del') > -1) {
            state.problemInfoList.data.custom.push({
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
    }, data) {
        commit('getProblemInfoListData', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}