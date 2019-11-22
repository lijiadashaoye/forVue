import { news_manager_list } from '../../api/setting_use';

const state = {
    newsMangerList : {
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
    getnewsMangerList(state,data){
        news_manager_list(data).then(res=> {
            if(res && res.success) {
                state.newsMangerList.data.list = res.data.list;
                state.newsMangerList.total = res.data.total;
                state.newsMangerList.data.list.forEach(v=> {
                    if(v.newsType == 'ORDINARY_NEWS') { 
                        v.newsTypeCN = '普通新闻'
                    } else if(v.newsType == 'SOFT_NEWS') {
                        v.newsTypeCN = '软广告新闻'
                    }
                    if(v.sign == 'FINANCING' ) {
                        v.signCN = '理财知道'
                    } else if(v.sign == 'BICAITREASURE') {
                        v.signCN = '比财宝典'
                    } else if(v.sign == 'BICAISKILL') {
                        v.signCN = '比财技巧'
                    } else if(v.sign == 'ALL') {
                        v.signCN = '全部'
                    }
                    if(v.isTop == 'TOP') {
                        v.isTopCN = 'YES'
                    } else if (v.isTop == 'NOTOP') {
                        v.isTopCN = 'NO'
                    }
                })
            }
        })
    },
     // 用户权限判定，之后表格右侧会有不同的操作按钮
    userDo(state) {
        state.newsMangerList.data.custom = [];
        let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
        if(jurisdiction.indexOf('news_manage_upd') > -1){
            state.newsMangerList.data.quanxian.push('ok')
            state.newsMangerList.data.custom.push({
                text: "置顶",
                type: "primary",
                size: "small",
                emit: "isTop"
            } ,{
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if(jurisdiction.indexOf('news_manage_del') > -1){
            state.newsMangerList.data.custom.push({
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
   getList({commit},data){
        commit('getnewsMangerList',data)
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