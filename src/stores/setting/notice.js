import {
   notice_list,
   notice_delete
} from '../../api/setting_use'
const state = {
    noticeList: {
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
    getNoticeListData(state,data) {
        notice_list(data).then(res => {
            if (res && res.success) {
                state.noticeList.data.list = res.data.list;
                state.noticeList.total = res.data.total;
                state.noticeList.data.list.forEach(v=> {
                     if (v.status == 'ENABLE') {
                         v.statusCN = '启用';
                         v.action = '启用'
                         v.switch = true;
                     } else if (v.status == 'DISABLE') {
                         v.statusCN = '停用';
                         v.action = '停用'
                         v.switch = false;
                     }
                })
                state.noticeList.actions.switch = {
                    label: "停用/启用",
                    minWidth: 80,
                    from: "statusCN"
                }
            }
        })
    },
    //权限认证
    userDo(state) {
        state.noticeList.data.custom = [];
        let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
        if (jurisdiction.indexOf('notice_upd') > -1) {
            state.noticeList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if (jurisdiction.indexOf('notice_del') > -1) {
            state.noticeList.data.custom.push({
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
    },data) {
        commit('getNoticeListData',data)
    },
    deleteList({
        commit
    }, id) {
        notice_delete(id).then((res) => {
            if (res) {
                commit('getNoticeListData')
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