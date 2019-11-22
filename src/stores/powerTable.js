import { getPremissions } from '@/sets/cookie.js';
const state = {
    indexInfo: {}, //单条数据
    tableInfo: {
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
    // 存储table列表数据
    SETTABLEINFO(state,res) {
        state.tableInfo.data.list = res.data.list;
        state.tableInfo.total = res.data.total;
    },
    // 获取权限
    USERDO(state,data) {
        let localInfo = getPremissions();
        let jurisdiction = JSON.parse(localInfo);
        for (let item of data) {
            if (jurisdiction.indexOf(item.userType) > -1) {
                (state.tableInfo.data.quanxian).push(item.userType);
                if(item.text){
                    (state.tableInfo.data.custom).push(item);
                }
            }
        }
    },

    // 还原table数据
    RESETTABLEINFO(state) {
        let info = {
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
        }
        state.tableInfo = info;
    },

    // 设置title头部的数据插入
    SETTITLELIST(state,data) {
        state.tableInfo.data.title = data;
    },

    // 储存单挑信息
    SAVEINDEXINFO(state,data){
        state.indexInfo = data;
    }
}
export default {
    namespaced: true,
    state,
    mutations
}