import { getMenuData } from '../../api/setting_use'
const state = {
    tableMenu : {
        checkBox: false, // 判断需要不需要添加选择框
        pageSize: 10,
        pageNum: 1,
        total: null,
        actions:{

        },
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
    getTableMenudata(state,data){
        getMenuData(data).then(res => {
            if(res.success){
                state.tableMenu.data.list = res.data.list;
                state.tableMenu.total = res.data.total;
            }
        })
    },
    //权限认证
    canDoWhat(state){
        state.tableMenu.data.custom = [];
        let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
        if(jurisdiction.indexOf('app_button_upd') > -1){
            state.tableMenu.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if(jurisdiction.indexOf('app_button_del') > -1){
            state.tableMenu.data.custom.push({
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