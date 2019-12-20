import {
    position_map_list,
    position_map_add,
    position_map_upd,
    position_map_del,
    position_map_detail,
    upgrade_box_detail,
    activity_map_list,
    bannerMenu_list,
    upgrade_box_add,
    bannerMenu_add,
    activity_map_add,
    activity_map_del,
    activity_map_detail,
    activity_map_upd,
    change_location
} from '../../api/setting_use'
const state = {
}
const mutations = {

}
const actions = {
    
    // 广告位置-列表
    positionMapList({ commit, rootState }, data) {
        data.pageSize = rootState.powerTable['tableInfo']['pageSize'];
        data.pageNum = rootState.powerTable['tableInfo']['pageNum']
        position_map_list(data).then((res) => {
            if (res && res['success']) {
                commit('powerTable/SETTABLEINFO', res, { root: true })
            }
        })
    },
    // 广告位置-添加
    positionMapAdd({ }, data) {
        return new Promise((resolve) => {
            position_map_add(data).then((res) => {
                if (res && res['success']) {
                    resolve()
                }
            })
        })
    },
    // 广告位置-修改
    positionMapUpd({},data){
        return new Promise((resolve)=>{
            position_map_upd(data).then(res=>{
                if(res && res['success']){
                    resolve()
                }
            })
        })
    },
    // 广告位置-删除
    positionMapDel({},data){
        return new Promise((resolve)=>{
            position_map_del(data).then((res)=>{
                if(res && res['success']){
                    resolve();
                }
            })
        })
    },
    // 广告位置-详情
    positionMapDetail({commit},id){
        return new Promise((resolve)=>{
            position_map_detail(id).then((res)=>{
                if(res && res['success']){
                    res.data.bannerPosition['isCoupon'] = res.data.isCoupon;
                    commit('powerTable/SAVEINDEXINFO',res.data.bannerPosition,{root:true});
                    resolve();
                }
            })
        })
    },
    // 广告图-列表
    activityMapList({ commit, rootState }, data) {
        data.pageSize = rootState.powerTable['tableInfo']['pageSize'];
        data.pageNum = rootState.powerTable['tableInfo']['pageNum']
        activity_map_list(data).then((res) => {
            if (res && res['success']) {
                commit('powerTable/SETTABLEINFO', res, { root: true })
            }
        })
    },
    // 广告图-拖拽
    changeLocation({},data){
        return new Promise((resolve)=>{
            change_location(data).then((res)=>{
                if(res && res['success']){
                    resolve();
                }
            })
        })
    },
    // 广告图-添加
    activityMapAdd({},data){
        return new Promise((resolve)=>{
            activity_map_add(data).then((res)=>{
                if(res && res['success']){
                    resolve();
                }
            })
        })
    },
    // 广告图-删除
    activityMapDel({},id){
        return new Promise((resolve)=>{
            activity_map_del(id).then((res)=>{
                if(res && res['success']){
                    resolve();
                }
            })
        })
    },
    // 广告图-详情
    activityMapDetail({},id){
        return new Promise((resolve)=>{
            activity_map_detail(id).then((res)=>{
                if(res && res['success']){
                    resolve(res)
                }
            })
        })
    },
    // 广告图-修改
    activityMapUpd({},data){
        return new Promise((resolve)=>{
            activity_map_upd(data).then(res=>{
                if(res && res['success']){
                    resolve();
                }
            })
        })
    },
    // 升级弹框-详情
    upgradeBoxDetail({},id){
        return new Promise((resolve) => {
            upgrade_box_detail(id).then(res=>{
                if(res && res['success']){
                    resolve(res)
                }
            }) 
        })
    },
    // 升级弹框-添加
    upgradeBoxAdd({},data){
        return new Promise((resolve)=>{
            upgrade_box_add(data).then(res=>{
                if(res && res['success']){
                    resolve()
                }
            })
        })
    },
    // 底部菜单-列表
    bannerMenuList({}){
        return new Promise(resolve => {
            bannerMenu_list().then(res=>{
                if(res && res['success']){
                    resolve(res);
                }
            })
        })
    },
    // 底部菜单-添加
    bannerMenuAdd({},data){
        return new Promise(resolve=>{
            bannerMenu_add(data).then(res=>{
                if(res && res['success']){
                    resolve()
                }
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}