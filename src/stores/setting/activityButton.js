import { activity_button_list } from '../../api/setting_use'

const state = {
    activityButtonList : {
        checkBox: false, // 判断需要不需要添加选择框
        pageSize: 10,
        pageNum: 1,
        total: null,
        noIndex:true,
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
    getActivityListData(state,data) {
        activity_button_list(data).then(res=> {
            state.activityButtonList.data.list = res.data.list;
            state.activityButtonList.total = res.data.total;
        })
    },
     // 用户权限判定，之后表格右侧会有不同的操作按钮
    userDo(state) {
        state.activityButtonList.data.custom = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        if(jurisdiction.indexOf('ctivity__button_upd') > -1){
            state.activityButtonList.data.quanxian.push('ok')
            state.activityButtonList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if(jurisdiction.indexOf('ctivity__button_del') > -1){
            state.activityButtonList.data.custom.push({
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
        commit('getActivityListData',data)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}