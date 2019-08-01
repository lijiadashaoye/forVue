import {
    cash_out_list
} from '../../api/setting_use';

const state = {
    cashList: {
        checkBox: false, // 判断需要不需要添加选择框,
        pageSize: 10,
        pageNum: 1,
        total: null,
        noIndex: true,
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
    getCashData(state,data) {
        cash_out_list(data).then(res=> {
            if(res && res.success) {
                state.cashList.data.list = res.data.list;
                state.cashList.data.list && state.cashList.data.list.forEach(v=>{
                    v.show = ['operation', 'applyFor', 'turnDown'];
                    if (v.needConfirm == 0) {
                        v.show.push('payment')
                    }
                })
                state.cashList.total = res.data.total;
            }
        })
    },
    userDo(state) {
        state.cashList.data.custom = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        if (jurisdiction.indexOf('member_cash_out') > -1) {
            state.cashList.data.quanxian.push('ok')
            state.cashList.data.custom.push({
                text: "申请付款",
                type: "primary",
                size: "small",
                emit: "applyFor"
            });
        }
        if (jurisdiction.indexOf('member_cash_out') > -1) {
            state.cashList.data.custom.push({
                text: "确认付款",
                type: "success",
                size: "mini",
                emit: "payment"
            });
        }
        if (jurisdiction.indexOf('member_cash_out') > -1) {
            state.cashList.data.custom.push({
                text: "驳回申请",
                type: "danger",
                size: "mini",
                emit: "turnDown"
            });
        }
        if (jurisdiction.indexOf('member_cash_out') > -1) {
            state.cashList.data.custom.push({
                text: "手动查单",
                type: "warning",
                size: "mini",
                emit: "operation"
            });
        }
    },
}
const actions = {
    getList({commit},data) {
        commit('getCashData',data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}