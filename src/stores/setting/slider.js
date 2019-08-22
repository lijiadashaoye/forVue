import {
   slider_list
} from '../../api/setting_use'
const state = {
    sliderList: {
        checkBox: false, // 判断需要不需要添加选择框
        pageSize: 10,
        pageNum: 1,
        total: null,
        actions: {

        },
        data: {
            list: [],
            quanxian: [],
            title: [],
            custom: []
        },
    }
}
const mutations = {
    //获取列表数据
    getSliderListData(state,data) {
        slider_list(data).then(res => {
            if (res && res.success) {
                state.sliderList.data.list = res.data.list;
                state.sliderList.total = res.data.total;
                state.sliderList.data.list.forEach(v=> {
                    if (v.isShow === 'SHOW'){
                        v.isShowCN = '显示'
                    } else if (v.isShow === 'HIDE') {
                        caches.isShowCN = '不显示'
                    }
                })
            }
        })
    },
    //权限认证
    userDo(state) {
        state.sliderList.data.custom = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        if (jurisdiction.indexOf('sidebar_upd') > -1) {
            state.sliderList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
    },
}

const actions = {
    getList({
        commit
    },data) {
        commit('getSliderListData',data)
    },
    // deleteList({
    //     commit
    // }, id) {
    //     adverdis_Page_del(id).then((res) => {
    //         if (res) {
    //             // commit('getSliderListData')
    //         }
    //     })
    // }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}