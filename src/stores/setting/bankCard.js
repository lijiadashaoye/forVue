import { bank_card_list, bank_card_del } from '../../api/setting_use';

const state = {
    bankCardList : {
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
    getbankCardListData(state,data){
        bank_card_list(data).then(res=> {
            if (res && res.success) {
                state.bankCardList.data.list = res.data.list;
                state.bankCardList.total = res.data.total;
                state.bankCardList.data.list.forEach((v)=> {
                    if(v.cardType === 'DEBIT'){
                      v.cardType = '借记卡'
                    }else{
                      v.cardType = '贷记卡'
                    }
                })
                window.sessionStorage.setItem('bankCardList',JSON.stringify(state.bankCardList.data.list))
            }
        })
    },

    //删除例表数据
    deleteList(state,id){
        bank_card_del(id).then(res=> {
            if(res && res.success){
                bank_card_list({
                    pageNum : state.bankCardList.pageNum,
                    pageSize : state.bankCardList.pageSize 
                }).then(res=> {
                    if (res && res.success) {
                        state.bankCardList.data.list = res.data.list;
                        state.bankCardList.total = res.data.total;
                        state.bankCardList.data.list.forEach((v)=> {
                            if(v.cardType === 'DEBIT'){
                              v.cardType = '借记卡'
                            }else{
                              v.cardType = '贷记卡'
                            }
                        })
                    }
                })
            }
        })
    },

     // 用户权限判定，之后表格右侧会有不同的操作按钮
    userDo(state) {
        state.bankCardList.data.custom = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        if(jurisdiction.indexOf('bank_card_detail') > -1){
            state.bankCardList.data.custom.push({
                text: "详情",
                type: "danger",
                size: "mini",
                emit: "detail"
            });
        }
        if(jurisdiction.indexOf('bank_card_upd') > -1){
            state.bankCardList.data.quanxian.push('ok')
            state.bankCardList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if(jurisdiction.indexOf('bank_card_del') > -1){
            state.bankCardList.data.custom.push({
                text: "删除",
                type: "danger",
                size: "mini",
                emit: "delete"
            });
        }
    },
}

const actions = {
    getBankCardList({commit},data){
        commit('getbankCardListData',data)
    }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}