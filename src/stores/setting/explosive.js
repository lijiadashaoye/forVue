import { explosive_list, explosive_delete } from '../../api/setting_use'

const state = {
    explosiveList : {
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
    //请求列表数据
    getExplosiveListData(state,data){
        explosive_list(data).then(res => {
            state.explosiveList.data.list = res.data.list;
            state.explosiveList.total = res.data.total;
            window.sessionStorage.setItem('explosiveList',JSON.stringify(state.explosiveList.data.list))
        })
    },
    //删除数据
    deleteList(state,id){
        explosive_delete(id).then(res => {
            if(res.success){
                explosive_list({
                    pageNum: state.explosiveList.pageNum,
                    pageSize: state.explosiveList.pageSize,
                    dataType:"EXPLOSIVE"
                }).then(data => {
                    if(res.success){
                        state.explosiveList.data.list = data.data.list;
                        window.sessionStorage.setItem('explosiveList',JSON.stringify(state.explosiveList.data.list))
                    }
                })
            }
        });
    },
    // 用户权限判定
    userDo(state) {
        state.explosiveList.data.custom = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        if(jurisdiction.indexOf('explosive_detail') > -1){
            state.explosiveList.data.custom.push({
                text: "详情",
                type: "danger",
                size: "mini",
                emit: "detail"
            });
        }
        if(jurisdiction.indexOf('explosive_upd') > -1){
            state.explosiveList.data.quanxian.push('ok')
            state.explosiveList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if(jurisdiction.indexOf('explosive_del') > -1){
            state.explosiveList.data.custom.push({
                text: "删除",
                type: "danger",
                size: "mini",
                emit: "delete"
            });
        }
    },
}

const actions = {

}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}