import {
    get_relation_list,
    add_relation,
    modify_relation,
    delete_relation,
    relation_detail
} from '../../api/setting_use'

const state = {
    relationDoArr:["parent_tree_list","parent_tree_add","parent_tree_detail","parent_tree_del","parent_tree_upd"],
    indexInfo:{},//单条数据,
    relationList: {
        checkBox: false, //是否开启多选
        show: false,
        // 传给table子组件的数据
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null, //总条目
        actions: {}, // 记录表格内需要额外添加的点击事件
        data: {
            list: [], // 给表格的数据
            quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
            title: [], // 给表格表头
            custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
    },
}

const mutations = {
    // 将列表的page还原
    pageNumDefault(state) {
        state.relationList.pageNum = 1;
    },
    //  获取依赖列表
    setRelationList(state, res) {
        state.relationList.data.list = res.data.list;
        state.relationList.total = res.data.total;
        state.relationList.data.list.forEach((item) => {
        })
    },
    // 设置title头部的数据插入
    setTitleList(state,arr) {
        state.relationList.data.title = arr;
    },
    // 存储单条数据条目用于新建数据
    saveIndexInfo(state,data){
        state.indexInfo = data;
    },
    // 依赖按钮权限
    relationUserDo(state) {
        state.relationList.data.custom = [];
        state.relationList.data.quanxian = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        for (let item of state.relationDoArr) {
            if (jurisdiction.indexOf(item) > -1) {
                state.relationList.data.quanxian.push(item);
                if (item == 'parent_tree_add') {
                    state.relationList.data.custom.push({
                        text: "新建",
                        type: "primary",
                        size: "mini",
                        emit: "add"
                    });
                }
                if (item == 'parent_tree_detail') {
                    state.relationList.data.custom.push({
                        text: "详情",
                        type: "primary",
                        size: "mini",
                        emit: "detail"
                    });
                }
                if (item == "parent_tree_del") {
                    state.relationList.data.custom.push({
                        text: "删除",
                        type: "danger",
                        size: "mini",
                        emit: "delete"
                    });
                }
            
            }
        }
    },
}

const actions = {
    
    // 获取依赖列表
    getRelationList({ commit }, data) {
        return new Promise((resolve) => {
            get_relation_list(data).then(res => {
                if (res && res.success) {
                    commit('setRelationList', res.data);
                }
            })
        })

    },
    // 删除依赖delete_relation
    deleteRelation({commit}, data) {
        return new Promise((resolve) => {
            delete_relation(data).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })

    },
    // 新增依赖
    addRelation({commit}, data) {
        return new Promise((resolve) => {
            add_relation(data).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })

    },
    // 获取详情
    relationDetail({ commit }, data) {
        return new Promise((resolve) => {
            relation_detail(data).then(res => {
                if (res && res.success) {
                    // 详情信息存储vuex
                    commit("saveIndexInfo",res.data);
                }
            })
        })

    },
    // 修改数据
    modifyRelation({commit}, data) {
        return new Promise((resolve) => {
            modify_relation(data).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })

    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}