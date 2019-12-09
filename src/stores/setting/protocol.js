import {
    protocol_list,
    getAppChannel
} from '../../api/setting_use'

const state = {
    protocolList: {
        noIndex: true,
        checkBox: false, // 判断需要不需要添加选择框
        pageSize: 10,
        pageNum: 1,
        total: null,
        actions: {},
        data: {
            list: [],
            quanxian: [],
            title: [],
            custom: []
        }
    },
    appChannel: []
}

const mutations = {
    //获取appChannelName
    getAppChannel() {
        getAppChannel('channel_type').then(res => {
            if (res && res.success) {
                state.appChannel = res.data
            }
        })
    },
    //获取列表数据
    getProtocolListData(state, data) {
        protocol_list(data).then(res => {
            state.protocolList.data.list = res.data.list;
            state.protocolList.total = res.data.total;
        })
    },
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    userDo(state) {
        state.protocolList.data.custom = [];
        let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
        if (jurisdiction.indexOf('protocol_private_detail') > -1) {
            state.protocolList.data.custom.push({
                text: "详情",
                type: "warning",
                size: "mini",
                emit: "detail"
            });
        }
        if (jurisdiction.indexOf('protocol_private_upd') > -1) {
            state.protocolList.data.quanxian.push('ok')
            state.protocolList.data.custom.push({ 
                text: "修改",
                type: "primary",
                size: "small",
                emit: "edit"
            });
        }
        if (jurisdiction.indexOf('protocol_private_del') > -1) {
            state.protocolList.data.custom.push({
                text: "删除",
                type: "danger",
                size: "mini",
                emit: "delete"
            });
        }
    },
}

export default {
    namespaced: true,
    state,
    mutations
}