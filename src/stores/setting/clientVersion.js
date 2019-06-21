import { clientVersion_list } from '../../api/setting_use';

const state = {
    clientVersionList : {
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
    //获取版本列表数据
    getClientVersionList(state,data){
        var params = {
            pageNum : state.clientVersionList.pageNum,
            pageSize : state.clientVersionList.pageSize
        }
        if (Object.keys(data).length > 0) {
            if (data.versionNo) {
                params.versionNo = data.versionNo
            }
            if (data.platformCode) {
                params.platformCode = data.platformCode
            }
        }
        clientVersion_list(params).then(res=> {
            state.clientVersionList.data.list = res.data.list;
            state.clientVersionList.total = res.data.total;
            state.clientVersionList.data.list.forEach(v=> {
                if (v.forcedUpdate == 'YES') {
                    v.forcedUpdateText = '是'
                } else {
                    v.forcedUpdateText = '否'
                }
                if (v.underReview == 'YES') {
                    v.underReviewText = '是'
                } else {
                    v.underReviewText = '否'
                }
                if (v.hint == 'YES') {
                    v.hintText = '是'
                } else {
                    v.hintText = '否'
                }
            })
        })
    },

    //删除例表数据
    deleteList(){
        
    },

    // 用户权限判定
    userDo(state) {
        state.clientVersionList.data.custom = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        if(jurisdiction.indexOf('client_version_upd') > -1){
            state.clientVersionList.data.quanxian.push('ok')
            state.clientVersionList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if(jurisdiction.indexOf('client_version_del') > -1){
            state.clientVersionList.data.custom.push({
                text: "删除",
                type: "danger",
                size: "mini",
                emit: "delete"
            });
        }
    },
}

const actions = {
   //列表数据
   getList({commit},data = {}){
        commit('getClientVersionList',data)
   },
   //删除数据
//    deleteLsit({commit},id){

//    }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}