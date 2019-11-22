import {
    get_alarm_list,
    delete_alarm,
    detail_alarm,
    add_alarm,
    modify_alarm
} from '../../api/setting_use'
import { defaultChange } from '@/sets/changeLanguage.js'
const actions = {
    // 获取系统预警列表
    getAlarmList({commit,rootState}) {
        get_alarm_list({
            pageSize: rootState.powerTable['tableInfo']['pageSize'],
            pageNum: rootState.powerTable['tableInfo']['pageNum']
        }).then((res) => {
            if (res && res['success']) {
                res.data.list.map((item) => {
                    item.notifyType = item.notifyType.split(',');
                    item.notifyType = item.notifyType.map((info)=>{
                        return info = defaultChange(info,true,'notifyType')
                    })
                    return item.notifyType = item.notifyType.join(',');
                    
                })
                commit('powerTable/SETTABLEINFO', res, {root: true})
            }
        })

    },
    // 删除系统预警条目
    deleteAlarm({commit}, id) {
        return new Promise((resolve) => {
            delete_alarm(id).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })

    },
    // 新增系统预警
    addAlarm({commit}, data) {
        return new Promise((resolve) => {
            add_alarm(data).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })
    },
    // 获取系统预警详情
    detailAlarm({ commit }, id) {
        return new Promise((resolve) => {
            detail_alarm(id).then((res) => {
                if (res && res.success) {
                    commit('powerTable/SAVEINDEXINFO',res.data,{root:true});
                    resolve();
                }
            })
        })
    },
    // 修改系统预警条目
    modifyAlarm({commit}, data) {
        return new Promise((resolve) => {
            modify_alarm(data).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })

    },
}
export default {
    namespaced: true,
    actions
}