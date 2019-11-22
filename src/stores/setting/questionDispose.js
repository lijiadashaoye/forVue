import {
    questionDispose_list
} from '../../api/setting_use';
const state = {
    questionList: {
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
    getQuestionListData(state, data) {
        questionDispose_list(data).then(res => {
            if (res && res.success) {
                state.questionList.data.list = res.data.list;
                state.questionList.total = res.data.total;
                state.questionList.data.list.forEach(v => {
                    if (v.status == 'SHOW') {
                        v.statusCN = '上架'
                    } else if (v.status == 'HIDE') {
                        v.statusCN = '下架'
                    }
                    if (v.isTop == 'TOP') {
                        v.isTopCN = '置顶';
                        v.action = '置顶'
                        v.switch = true;
                    } else if (v.isTop == 'NOTOP') {
                        v.isTopCN = '不置顶';
                        v.action = '不置顶'
                        v.switch = false;
                    }
                    state.questionList.actions.switch = {
                        label: "置顶/不置顶",
                        minWidth: 80,
                        from: "isTopCN"
                    }
                })
            }
        })
    },
    userDo() {
        state.questionList.data.custom = [];
        let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
        if (jurisdiction.indexOf('question_classify_upd') > -1) {
            state.questionList.data.quanxian.push('ok')
            state.questionList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if (jurisdiction.indexOf('question_classify_del') > -1) {
            state.questionList.data.custom.push({
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
        commit('getQuestionListData', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}