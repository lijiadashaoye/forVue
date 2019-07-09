import { commend_list,  commend_delete} from '../../api/setting_use'

const state = {
    commendList : {
        checkBox: false, // 判断需要不需要添加选择框
        pageSize: 10,
        pageNum: 1,
        total: null,
        actions: {},
        productNameList: [],
        data: {
            list: [],
            quanxian: [],
            title: [],
            custom: []
        }
    }
}

const mutations = {
    //请求列表数据
    getCommendList(state,data){
        commend_list(data).then(res => {
            state.commendList.data.list = res.data.list;
            state.commendList.total = res.data.total;
        })
    },
    getProNameList(state) {
        state.commendList.productNameList = [];
        commend_list({
            dataType: "RECOMMEND"
        }).then(res => {
            if (res && res.success) {
                res.data.list && res.data.list.forEach(v => {
                    state.commendList.productNameList.push({
                        label: v.productName,
                        value: v.productName
                    })
                })
            }
        })
    },
    //删除数据
    deleteList(state,id){
        commend_delete(id).then(res => {
            if(res.success){
                commend_list({
                    pageNum: state.commendList.pageNum,
                    pageSize: state.commendList.pageSize,
                    dataType:"RECOMMEND"
                }).then(data => {
                    state.commendList.data.list = data.data.list;
                    window.sessionStorage.setItem('commendList',JSON.stringify(state.commendList.data.list))
                })
            }
        });
    },
    // 用户权限判定
    userDo(state) {
        state.commendList.data.custom = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        if(jurisdiction.indexOf('commend_detail') > -1){
            state.commendList.data.custom.push({
                text: "详情",
                type: "danger",
                size: "mini",
                emit: "detail"
            });
        }
        if(jurisdiction.indexOf('commend_upd') > -1){
            state.commendList.data.quanxian.push('ok')
            state.commendList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if(jurisdiction.indexOf('commend_del') > -1){
            state.commendList.data.custom.push({
                text: "删除",
                type: "danger",
                size: "mini",
                emit: "delete"
            });
        }
    }
}

export default {
    namespaced:true,
    state,
    mutations
}