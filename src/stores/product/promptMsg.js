import {
    prompt_list
} from '../../api/setting_use';

const state = {
    promptMsgList: {
        checkBox: false, // 判断需要不需要添加选择框,
        pageSize: 10,
        pageNum: 1,
        total: null,
        noIndex: false,
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
    getPromptList(state, data) {
        prompt_list(data).then(res => {
            if (res && res.success) {
                state.promptMsgList.data.list = res.data.list;
                state.promptMsgList.total = res.data.total;
            }
        })
    },
    userDo(state) {
        state.promptMsgList.data.custom = [];
        let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
        if (jurisdiction.indexOf('prompt_message_upd') > -1) {
            state.promptMsgList.data.quanxian.push('ok')
            state.promptMsgList.data.custom.push({
                text: "修改",
                type: "primary",
                size: "small",
                emit: "emit"
            });
        }
        if (jurisdiction.indexOf('prompt_message_del') > -1) {
            state.promptMsgList.data.custom.push({
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
        commit('getPromptList', data)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}