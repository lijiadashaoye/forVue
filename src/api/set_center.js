import qs from 'qs';
export default {


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

    // 新增、修改配置
    add_put(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: '/setting/manager/config-solution',
            data: data.data
        })
    },


    //  配置位置的下拉数据
    get_side_list(data) {
        return data.vm.$axios({
            method: 'post',
            url: `/configuration/bannerPosition/select`,
            data: data.data
        })
    },

    //  获取已经配置过配置列表
    get_peizhi_list(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/setting/manager/config-solution?${qs.stringify(data.data)}`,
        })
    },

    //  编辑位置对应的可用素材列表
    get_sucai_list(data) {
        return data.vm.$axios({
            method: 'post',
            url: `/configuration/banner/select`,
            data: data.data
        })
    },

}