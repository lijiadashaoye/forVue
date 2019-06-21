import { protocol_list, getAppChannel, protocol_delete } from '../../api/setting_use'

const state = {
    protocolList : {
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
    appChannel:[]
}

const mutations = {
    //获取appChannelName
    getAppChannel(){
        getAppChannel('channel_type').then(res=> {
                state.appChannel = res.data
        })
    },
    //获取列表数据
    getProtocolListData(state){
        protocol_list({
                pageNum: state.protocolList.pageNum,
                pageSize: state.protocolList.pageSize
            }).then(res => {
            state.protocolList.data.list = res.data.list;
            state.protocolList.total = res.data.total;
        })
    },
    //删除列表数据
    deleteList(state,id){
        protocol_delete(id).then(res => {
            if(res.success){
                protocol_list({
                    pageNum: state.protocolList.pageNum,
                    pageSize: state.protocolList.pageSize
                }).then(res=> {
                    if(res.success){
                        state.protocolList.data.list = res.data.list;
                        state.protocolList.total = res.data.total;
                    }
                })
            }
        })
    },
    // 用户权限判定
    userDo(state) {
        state.protocolList.data.custom = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        if(jurisdiction.indexOf('protocol_private_detail') > -1){
            state.protocolList.data.custom.push({
                text: "详情",
                type: "danger",
                size: "mini",
                emit: "detail"
            });
        }
        if(jurisdiction.indexOf('protocol_private_upd') > -1){
            state.protocolList.data.quanxian.push('ok')
            state.protocolList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if(jurisdiction.indexOf('protocol_private_del') > -1){
            state.protocolList.data.custom.push({
                text: "删除",
                type: "danger",
                size: "mini",
                emit: "delete"
            });
        }
    },
}

export  default {
    namespaced:true,
    state,
    mutations
}