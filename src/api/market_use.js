import qs from 'qs';
export default {
    // 获取列表数据
    market_list_getListData(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/marketing/manager/activity?${qs.stringify(data.data)}`,
        })
    },

    // 上架、下架
    market_create_UpDown(data) {
        return data.vm.$axios({
            method: 'put',
            url: `/marketing/manager/activity/status`,
            data: data.data
        })
    },
    // 活动列表里的删除
    market_create_deleteData(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/marketing/manager/activity/${data.data}`,
        })
    },

    // 创建活动页面里查询通过点击编辑按钮的活动数据
    market_create_getActData(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/marketing/manager/activity/${data.data}`,
        })
    },

    // 红包列表查询
    market_create_getPacketList(data) {
        return data.vm.$axios({
            method: 'get',
            url: `marketing/manager/welfare-packet?${qs.stringify(data.data)}`,
        })
    },
    // 上传图片
    UPImg(data) {
        // console.log(data)
        return data.vm.$axios({
            method: 'post',
            url: data.url,
            data: data.data
        })
    },
    // 活动管理上传数据
    market_create_upFinalData(data) {
        return data.vm.$axios({
            method: data.method,
            url: 'marketing/manager/activity',
            data: data.data
        })
    },
    /////////////////////////////////////////////////////////////////////
    // 卡券列表查询
    market_create_getCouponList(data) {
        return data.vm.$axios({
            method: 'post',
            url: `marketing/manager/coupon/details`,
            data: data.data
        })
    },
    // 获取卡券关联的银行、产品
    get_guanlian(data) {
        return data.vm.$axios({
            method: 'get',
            url: `marketing/manager/coupon/bankprd/${data.data}`
        })
    },
    // 修改关联
    put_guanlian(data) {
        return data.vm.$axios({
            method: 'put',
            url: `marketing/manager/coupon/bankprd`,
            data: data.data
        })
    },
    // 卡券列表里领用详情
    market_coupon_getInfoXianQing(data) {
        return data.vm.$axios({
            method: 'post',
            url: `marketing/manager/coupon/receive_record`,
            data: data.data
        })
    },

    // 卡券列表里的删除
    market_coupon_deleteData(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/marketing/manager/welfare-coupon/${data.data}`,
        })
    },
    // kaquan_zengfa
    // 卡券列表里的增发
    market_coupon_zengFa(data) {
        return data.vm.$axios({
            method: 'put',
            url: `/marketing/manager/coupon/stock`,
            data: data.data
        })
    },
    // 卡券列表里切换发放、停止
    market_coupon_UpDown(data) {
        return data.vm.$axios({
            method: 'put',
            url: `/marketing/manager/coupon/status`,
            data: data.data
        })
    },
    // 更新、新建卡券
    market_coupon_upCoupon(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: `/marketing/manager/coupon`,
            data: data.data
        })
    },
    // 导出
    market_coupon_downLoad(data) {
        return data.vm.$axios({
            method: 'get',
            responseType: 'blob', 
            url: `/marketing/manager/coupon/receive/excel?${qs.stringify(data.data)}`,
        })
    },
    // 卡券列表里编辑卡券类型详细设置
    market_change_type(data) {
        return data.vm.$axios({
            method: 'put',
            url: `/marketing/manager/coupon/type`,
            data: data.data
        })
    },
    // 查询卡券补仓记录列表
    get_bucang(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/marketing/manager/coupon/stock/${data.id}?${qs.stringify(data.data)}`,
        })
    },

    // 查询卡券操作记录列表
    get_caozuo(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/marketing/manager/coupon/operation/${data.id}?${qs.stringify(data.data)}`,
        })
    },


    ///////////////////////////////////////////////////////////////////////

    // 获取红包列表
    market_packet_getListData(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/marketing/manager/welfare-packet?${qs.stringify(data.data)}`
        })
    },

    // 红包列表里切换发放、停止
    market_packet_UpDown(data) {
        return data.vm.$axios({
            method: 'put',
            url: `/marketing/manager/welfare-packet/status`,
            data: data.data
        })
    },
    // 红包列表里的删除
    market_packet_deleteData(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/marketing/manager/welfare-packet/${data.data}`,
        })
    },

    // 红包详情
    market_packet_getInfo(data) {
        return data.vm.$axios({
            method: 'get',
            url: `marketing/manager/welfare-packet/${data.data}`
        })
    },


    // 更新、新建红包
    market_packet_upPacket(data) {

        return data.vm.$axios({
            method: data.method,
            url: `/marketing/manager/welfare-packet`,
            data: data.data
        })
    },

}