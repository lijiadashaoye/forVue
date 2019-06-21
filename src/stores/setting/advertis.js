import {
    getAdverdisList,
    adverdis_Page_del
} from '../../api/setting_use'
const state = {
    advertisList: {
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
    getAdvertisListData(state) {
        getAdverdisList({
            pageNum: state.advertisList.pageNum,
            pageSize: state.advertisList.pageSize,
        }).then(res => {
            if (res) {
                state.advertisList.data.list = res.data.list;
                state.advertisList.total = res.data.total;
                state.advertisList.data.list.forEach(v => {
                    if (v.showType == 'OPENSCREEN') {
                        v.showTypeCN = '开屏'
                    } else if (v.showType == 'FLASHSCREEN') {
                        v.showTypeCN = '闪屏'
                    } else if (v.showType == 'VIDEO') {
                        v.showTypeCN = '视频'
                    }

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
                state.advertisList.actions.switch = {
                    label: "停用/启用",
                    minWidth: 80,
                    from: "statusCN"
                }
            }
        })
    },
    //权限认证
    userDo(state) {
        state.advertisList.data.custom = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        if (jurisdiction.indexOf('app_button_upd') > -1) {
            state.advertisList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if (jurisdiction.indexOf('app_button_del') > -1) {
            state.advertisList.data.custom.push({
                text: '删除',
                type: "danger",
                size: "mini",
                emit: "delete"
            });
        }
    },
}

const actions = {
    getList({commit}) {
        commit('getAdvertisListData')
    },
    deleteList({
        commit
    }, id) {
        adverdis_Page_del(id).then((res) => {
            if(res.success) {
                commit('getAdvertisListData')
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