import { devicePosition } from '../../api/log'

const state = {
    devicePositionList : {
        checkBox: false, // 判断需要不需要添加选择框
        pageSize: 10,
        pageNum: 1,
        total: null,
        noIndex:false,
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
    devicePositionList(state,data) {
        let params = {
            memberId: data.memberId,
            deviceId: data.deviceId,
            appChannelCode: data.appChannelCode,
            platformCode: data.platformCode,
            queryStartTime: data.queryStartTime,
            queryEndTime: data.queryEndTime
        }
        if (data.noPage) {
            state.devicePositionList.pageNum = 1
            state.devicePositionList.pageSize = 10
            params.pageNum = 1
            params.pageSize = 10
        } else {
            params.pageNum = state.devicePositionList.pageNum
            params.pageSize =  state.devicePositionList.pageSize
            if (data.objectId) {
                params.objectId = data.objectId
            }
        }
        devicePosition(params).then(res=> {
            state.devicePositionList.data.list = res.data.list;
            state.devicePositionList.total = res.data.total;
        })
    }
}

const actions = {
    getList({commit},data={}) {
        commit('devicePositionList',data)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}