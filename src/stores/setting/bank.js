import { bank_list, bank_list_delete } from '../../api/setting_use'

const state = {
    bankList : {
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
}

const mutations = {
    //获取银行列表数据
    getBankListData(state){
        bank_list({
            pageNum : state.bankList.pageNum,
            pageSize : state.bankList.pageSize 
        }).then(res=> {
            if(res.success){
                state.bankList.data.list = res.data.list;
                state.bankList.total = res.data.total;
            }
            window.sessionStorage.setItem('bankList',JSON.stringify(state.bankList.data.list))
        })
    },

    //删除例表数据
    deleteList(state,id){
        bank_list_delete(id).then(()=> {
            bank_list({
                pageNum : state.bankList.pageNum,
                pageSize : state.bankList.pageSize 
            }).then((res)=> {
                state.bankList.data.list = res.data.list;
                state.bankList.total = res.data.total;
            })
        })
    },

    // 用户权限判定
    userDo(state) {
        state.bankList.data.custom = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        if(jurisdiction.indexOf('bank_detail') > -1){
            state.bankList.data.custom.push({
                text: "详情",
                type: "danger",
                size: "mini",
                emit: "detail"
            });
        }
        if(jurisdiction.indexOf('bank_upd') > -1){
            state.bankList.data.quanxian.push('ok')
            state.bankList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if(jurisdiction.indexOf('bank_del') > -1){
            state.bankList.data.custom.push({
                text: "删除",
                type: "danger",
                size: "mini",
                emit: "delete"
            });
        }
    },
}

const actions = {
    getList({commit}){
        commit('getBankListData')
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}