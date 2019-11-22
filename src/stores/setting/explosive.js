import {
    explosive_list
} from '../../api/setting_use'

const state = {
    explosiveList: {
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
    },
}

const mutations = {
    //请求列表数据
    getExplosiveListData(state, data) {
        explosive_list(data).then(res => {
            state.explosiveList.data.list = res.data.list;
            state.explosiveList.total = res.data.total;
        })
    },
    getProNameList(state) {
        state.explosiveList.productNameList = [];
        explosive_list({
            dataType: "EXPLOSIVE"
        }).then(res => {
            if (res && res.success) {
                res.data.list && res.data.list.forEach(v => {
                    state.explosiveList.productNameList.push({
                        label: v.productName,
                        value: v.productName
                    })
                })
            }
        })
    },
    //删除数据
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    userDo(state) {
        state.explosiveList.data.custom = [];
        let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
        if (jurisdiction.indexOf('explosive_detail') > -1) {
            state.explosiveList.data.custom.push({
                text: "详情",
                type: "warning",
                size: "mini",
                emit: "detail"
            });
        }
        if (jurisdiction.indexOf('explosive_upd') > -1) {
            state.explosiveList.data.quanxian.push('ok')
            state.explosiveList.data.custom.push({
                text: "修改",
                type: "primary",
                size: "small",
                emit: "edit"
            });
        }
        if (jurisdiction.indexOf('explosive_del') > -1) {
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