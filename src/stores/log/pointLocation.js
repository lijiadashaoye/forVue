import { pointLocation } from '../../api/log'

const state = {
    pointLocationList : {
        checkBox: false, // 判断需要不需要添加选择框
        pageSize: 10,
        pageNum: 1,
        total: null,
        noIndex:false,
        actions: {},
        data: {
            list: [],
            quanxian: [],
            title: [],
            custom: []
        }
    },
}

const mutations = {
    pointLocationList(state,data) {
        let params = {
            memberId: data.memberId,
            deviceId: data.deviceId,
            appChannelCode: data.appChannelCode,
            platformCode: data.platformCode,
            queryStartTime: data.queryStartTime,
            queryEndTime: data.queryEndTime,
            functionId: data.functionId,
            adCode: data.adCode,
            appMarketCode: data.appMarketCode,
            couponId: data.couponId
        }
        if (data.noPage) {
            state.pointLocationList.pageNum = 1
            state.pointLocationList.pageSize = 10
            params.pageNum = 1
            params.pageSize = 10
        } else {
            params.pageNum = state.pointLocationList.pageNum
            params.pageSize =  state.pointLocationList.pageSize
            if (data.objectId) {
                params.objectId = data.objectId
            }
        }
        pointLocation(params).then(res=> {
            state.pointLocationList.data.list = res.data.list;
            state.pointLocationList.total = res.data.total;
            state.pointLocationList.data.list.map((v) => {
                v.expandText = '扩展字段'
                if (v.expand && Object.keys(v.expand).length > 0) {
                    Object.keys(v.expand).forEach((j) => {
                        if (j == 'sourceId') {
                            v.expand[j] += '?????*****来源id(渠道id,内容id(页面id),广告id,资产类型id,跳转类型,收益类型,选择类型,按钮功能标识)'
                        } else if (j == 'sourceName') {
                            v.expand[j] += '?????*****来源内容(渠道內容)'
                        } else if (j == 'valueName') {
                            v.expand[j] += '?????*****中间值(搜索类别,机构,功能id,产品,归属id,筛选器,状态,活动id,页面类型,样式id,类别,排序方式,银行类别)'
                        } else if (j == 'valueContent') {
                            v.expand[j] += '?????*****中间值内容(搜索类别:机构,产品),按钮文本,建议与反馈'
                        } else if (j == 'productId') {
                            v.expand[j] += '?????*****产品id(多个产品id用逗号隔开)'
                        } else if (j == 'productName') {
                            v.expand[j] += '?????*****产品名称(多个产品名称用逗号隔开)'
                        } else if (j == 'productType') {
                            v.expand[j] += '?????*****产品类型'
                        } else if (j == 'clickContent') {
                            v.expand[j] += '?????*****点击内容(产品数量,bannerId,分享渠道,投资金额,天数,合作第三方id,语言)'
                        } else if (j == 'publicValue') {
                            v.expand[j] += '?????*****公共值1(购买时间,页面id,页面url,排名id(排名编号),期限,状态(关注,取关)(已收藏,未收藏))'
                        } else if (j == 'couponId') {
                            v.expand[j] += '?????*****券id'
                        } else if (j == 'couponName') {
                            v.expand[j] += '?????*****券名称'
                        } else if (j == 'institutionId') {
                            v.expand[j] += '?????*****机构id'
                        } else if (j == 'institutionName') {
                            v.expand[j] += '?????*****机构名称'
                        } else if (j == 'commonValue') {
                            v.expand[j] += '?????*****公共值2(参考收益,购买渠道,信息流区域id,本产品收益,风险,日期,产品名称)'
                        } else if (j == 'cookieH5') {
                            v.expand[j] += '?????*****H5页面上的COOKIE内容'
                        }
                    })
                }
            })
        })
    },
    //权限认证
    userDo(state) {
        // // 设置字体点击事件
        state.pointLocationList.actions.click = {
            label: "扩展字段",
            minWidth: 120,
            from: "expandText" // 记录这个交互操作的原数据属性
        };
    },
}

const actions = {
    getList({commit},data={}) {
        commit('pointLocationList',data)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}