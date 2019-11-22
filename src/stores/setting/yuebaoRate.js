import { yuebao_list, yuebao_delete } from '../../api/setting_use'

const state = {
    yuebaoRateList: {
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
    //列表数据
    getYebaoRateListData(state,data){
        yuebao_list(data).then(res => {
            state.yuebaoRateList.data.list = res.data.list;
            state.yuebaoRateList.total = res.data.total;
        })
    },
    //删除数据
    deteleList(state,id){
        yuebao_delete(id).then(res => {
            if(res && res.success){
                yuebao_list({
                    pageNum: state.yuebaoRateList.pageNum,
                    pageSize: state.yuebaoRateList.pageSize
                }).then(res => {
                    state.yuebaoRateList.data.list = res.data.list;
                    state.yuebaoRateList.total = res.data.total;
                })
            }
        })
    },
     // 用户权限判定，之后表格右侧会有不同的操作按钮
    userDo(state) {
        state.yuebaoRateList.data.custom = [];
        let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
        // if(jurisdiction.indexOf('yuebao_rate_detail') > -1){
        //     state.yuebaoRateList.data.custom.push({
        //         text: "详情",
        //         type: "danger",
        //         size: "mini",
        //         emit: "detail"
        //     });
        // }
        if(jurisdiction.indexOf('yuebao_rate_upd') > -1){
            state.yuebaoRateList.data.quanxian.push('ok')
            state.yuebaoRateList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        // if(jurisdiction.indexOf('yuebao_rate_del') > -1){
        //     state.yuebaoRateList.data.custom.push({
        //         text: "删除",
        //         type: "danger",
        //         size: "mini",
        //         emit: "delete"
        //     });
        // }
    },
}

export default {
    namespaced:true,
    state,
    mutations
}