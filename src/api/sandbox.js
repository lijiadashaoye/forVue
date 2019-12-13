import qs from 'qs';
export default {

    // 获取平台配置查询使用的银行列表
    getBankList(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/sandBox/platform/sandBox/bankList`,
        })
    },
    // 获取平台配置列表数据
    getPlatformList(data) {
        return data.vm.$axios({
            method: 'post',
            url: `/product/sandBox/platform/page`,
            data: data.data
        })
    },
    // 新增、修改平台配置数据
    addPlatform(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: data.url,
            data: data.data
        })
    },

    // 获取编辑、复制的平台配置详情
    getItemData(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/sandBox/platform/get/${data.id}`,
        })
    },
    // 获取编辑、复制的平台配置详情
    deleteItemData(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/sandBox/platform/delete/${data.id}`,
        })
    },

    // 获取编辑、复制的平台配置详情
    getProductList(data) {

        return data.vm.$axios({
            method: 'post',
            url: `/product/sandBox/rule/searchProduct`,
            data: data.data
        })
    },

    // 获取营销管理使用的下拉数据
    forYingXiaoSet(data) {
        return data.vm.$axios({
            method: 'post',
            url: `/configuration/bannerPosition/select`,
            data: data.data
        })
    },

}