import { loginSpread_list } from '../../api/setting_use'

const state = {
    loginSpreadList : {
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
    }
}

const mutations = {

    //获取列表数据
    getLoginSpreadListData(state,data){
        loginSpread_list(data).then(res=> {
            if(res && res.success) {
                state.loginSpreadList.data.list = res.data.list;
                state.loginSpreadList.total = res.data.total;
                state.loginSpreadList.data.list.forEach((v)=> {
                    if(v.status === 'ENABLE'){
                      v.status = '启 用'
                    }else{
                      v.status = '停 用'
                    }
                })
            }
        })
    },
      // 用户权限判定，之后表格右侧会有不同的操作按钮
     userDo(state) {
        state.loginSpreadList.data.custom = [];
        let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
        if(jurisdiction.indexOf('login_page_spread_upd_status') > -1){
            state.loginSpreadList.data.custom.push({
                text: "更改状态",
                type: "success",
                size: "mini",
                emit: "upStatus"
            })
        }
        if(jurisdiction.indexOf('protocol_private_detail') > -1){
            state.loginSpreadList.data.custom.push({
                text: "详情",
                type: "primary",
                size: "mini",
                emit: "detail"
            });
        }
        if(jurisdiction.indexOf('protocol_private_upd') > -1){
            state.loginSpreadList.data.quanxian.push('ok')
            state.loginSpreadList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if(jurisdiction.indexOf('protocol_private_del') > -1){
            state.loginSpreadList.data.custom.push({
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