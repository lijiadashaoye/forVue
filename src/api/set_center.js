import qs from 'qs';
export default {
    //  获取配置中心列表
    setting_peizhi_list(data) {
        return data.vm.$axios({
            method: 'get',
            url: `setting/manager/config-solution?${qs.stringify(data.data)}`,
        })
    },
    // 切换有效无效
    switch_change(data) {
        return data.vm.$axios({
            method: 'put',
            url: 'setting/manager/config-solution/status',
            data: data.data
        })
    },

    // 删除配置方案
    setting_peizhi_list_delete(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/setting/manager/config-solution/${data.data}`,
        })
    },

    //  获取配置方案详情
    get_info(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/setting/manager/config-solution/${data.data}`,
        })
    },


    //  获取素材列表
    get_sucai_list(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/setting/manager/config-solution/select-resource?${qs.stringify(data.data)}`,
        })
    },

    // 新增、修改配置
    add_put(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: '/setting/manager/config-solution',
            data: data.data
        })
    },


}