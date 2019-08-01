import { proposal_list } from '../../api/setting_use';

const state = {
    proposalList : {
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
    //获取广告列表数据
    getProposalList(state,data){
        var params = {
            pageNum : state.proposalList.pageNum,
            pageSize : state.proposalList.pageSize
        }
        if (Object.keys(data).length > 0) {
            if (data.proposalContent) {
                params.proposalContent = data.proposalContent
                // params.proposalContent = data.keyWords
            }
        }
        proposal_list(params).then(res=> {
            state.proposalList.data.list = res.data.list;
            state.proposalList.total = res.data.total;
            state.proposalList.data.list.forEach(v=> {
                if (v.validStatus == 'VALID') {
                    v.validStatusText = '有效'
                } else {
                    v.validStatusText = '无效'
                }
            })
        })
    },

    //删除例表数据
    deleteList(){
        
    },

     // 用户权限判定，之后表格右侧会有不同的操作按钮
    userDo(state) {
        state.proposalList.data.custom = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        if(jurisdiction.indexOf('proposal_del') > -1){
            state.proposalList.data.custom.push({
                text: "删除",
                type: "danger",
                size: "mini",
                emit: "delete"
            });
        }
        /*
        if(jurisdiction.indexOf('proposal_forward') > -1){
            state.proposalList.data.custom.push({
                text: "转发",
                size: "mini",
                emit: "forward"
            });
        }
        */
    },
}

const actions = {
   //列表数据
   getList({commit},data = {}){
        commit('getProposalList',data)
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