import { bank_support_list, bank_support_del } from '../../api/setting_use';
let state = {
    bankSupportList : {
        checkBox: false, // 判断需要不需要添加选择框
        pageSize: 10,
        pageNum: 1,
        total: null,
        actions: {},
        noIndex:true,
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
    getBankSupportListData(state,data){
        bank_support_list(data).then(res=> {
            state.bankSupportList.data.list = res.data.list;
            state.bankSupportList.total = res.data.total;
            window.localStorage.setItem('bankSupportList',JSON.stringify(state.bankSupportList.data.list))
        })
    },

    //删除例表数据
    // deleteList(state,id){
    //     bank_support_del(id).then(()=> {
    //         bank_support_list({
    //             pageNum : state.bankSupportList.pageNum,
    //             pageSize : state.bankSupportList.pageSize 
    //         }).then(res=> {
    //             state.bankSupportList.data.list = res.data.list;
    //             state.bankSupportList.total = res.data.total;
    //         })
    //     })
    // },

     // 用户权限判定，之后表格右侧会有不同的操作按钮
    userDo(state) {
        state.bankSupportList.data.custom = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        if(jurisdiction.indexOf('bank_detail') > -1){
            state.bankSupportList.data.custom.push({
                text: "详情",
                type: "danger",
                size: "mini",
                emit: "detail"
            });
        }
        if(jurisdiction.indexOf('bank_upd') > -1){
            state.bankSupportList.data.quanxian.push('ok')
            state.bankSupportList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if(jurisdiction.indexOf('bank_del') > -1){
            state.bankSupportList.data.custom.push({
                text: "删除",
                type: "danger",
                size: "mini",
                emit: "delete"
            });
        }
    },
}

const actions = {
    getBankSupportList({ commit },data) {
        commit('getBankSupportListData',data)
    },
    //删除例表数据
    deleteList({commit, state},id){
        bank_support_del(id).then(()=> {
            commit('getBankSupportListData',{
                pageNum: state.bankSupportList.pageNum,
                pageSize: state.bankSupportList.pageSize
            })
        })
    },
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}




