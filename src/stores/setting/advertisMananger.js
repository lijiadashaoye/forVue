import { adverdis_list } from '../../api/setting_use';

const state = {
    advertisMangerList : {
        checkBox: false, // 判断需要不需要添加选择框
        pageSize: 10,
        pageNum: 1,
        total: null,
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
    //获取广告列表数据
    getAdvertisMangerList(state,data){
        var params = {
            pageNum : state.advertisMangerList.pageNum,
            pageSize : state.advertisMangerList.pageSize
        }
        if (Object.keys(data).length > 0) {
            if (data.advertisTitle) {
                params.advertisTitle = data.advertisTitle
            }
        }
        adverdis_list(params).then(res=> {
            state.advertisMangerList.data.list = res.data.list;
            state.advertisMangerList.total = res.data.total;
            state.advertisMangerList.data.list.forEach(v=> {
                // 位置转换
                if(v.advertisLocation == 'BANNER') {
                    v.adverLocText = '发现横幅广告'
                } else if(v.advertisLocation == 'FIND_FINANCING') {
                    v.adverLocText = '发现理财圈广告 '
                } else if(v.advertisLocation == 'ADD_FINANCING') {
                    v.adverLocText = '新增理财圈列表广告'
                } else if(v.advertisLocation == 'ADD_RANKING') {
                    v.adverLocText = '新增排行榜横幅广告'
                }else if(v.advertisLocation == 'ADD_SIDE') {
                    v.adverLocText = '新增侧边栏Banner'
                }else if(v.advertisLocation == 'ADD_HOME') {
                    v.adverLocText = '新增首页Banner'
                }
                // 广告类型转换
                if(v.advertisType == 'NOCLOCK') {
                    v.adverTypeText = '无点击事件'
                } else if(v.advertisType == 'EXTERNAL_LINK') {
                    v.adverTypeText = '外部连接'
                } else if(v.advertisType == 'CONSULT_PAGE') {
                    v.adverTypeText = '咨询页'
                } else if(v.advertisType == 'LOGIN_PAGE') {
                    v.adverTypeText = '登录页'
                } else if(v.advertisType == 'CURRENCY_FUND') {
                    v.adverTypeText = '货币基金'
                } else if(v.advertisType == 'FINANCING_PRODUCT') {
                    v.adverTypeText = '理财产品'
                } else if(v.advertisType == 'SHARES_FUND') {
                    v.adverTypeText = '股票基金'
                }else if(v.advertisType == 'COMPREHENSIVE_PAGE') {
                    v.adverTypeText = '综合页'
                }else if(v.advertisType == 'LOAN') {
                    v.adverTypeText = '贷款'
                }else if(v.advertisType == 'NAW_PAGE') {
                    v.adverTypeText = '新品页'
                }else if(v.advertisType == 'RECOMMEND_PAGE') {
                    v.adverTypeText = '推荐页'
                }else if(v.advertisType == 'PURE_DEPT_FUND') {
                    v.adverTypeText = '纯债产品'
                }
                // 广告可见类型转换
                if (v.visualType == 'NO_LIMIT') {
                    v.visualTypeText = '不限定'
                } else if(v.visualType == 'LOGIN_USER') {
                    v.visualTypeText = '登陆用户可见'
                } else if(v.visualType == 'NO_LOGIN_USER') {
                    v.visualTypeText = '非登陆用户可见'
                }
                // 广告显示类型转换
                if (v.showType == 'BANNER') {
                    v.showTypeText = '横幅'
                } else if(v.showType == 'INFORMATION') {
                    v.showTypeText = '信息流'
                }
            })
        })
    },

    //删除例表数据
    deleteList(){
        
    },

     // 用户权限判定，之后表格右侧会有不同的操作按钮
    userDo(state) {
        state.advertisMangerList.data.custom = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        if(jurisdiction.indexOf('advertis_manage_detail') > -1){
            state.advertisMangerList.data.custom.push({
                text: "详情",
                type: "danger",
                size: "mini",
                emit: "detail"
            });
        }
        if(jurisdiction.indexOf('advertis_manage_upd') > -1){
            state.advertisMangerList.data.quanxian.push('ok')
            state.advertisMangerList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if(jurisdiction.indexOf('advertis_manage_del') > -1){
            state.advertisMangerList.data.custom.push({
                text: "删除",
                type: "danger",
                size: "mini",
                emit: "delete"
            });
        }
    },
}

const actions = {
   //列表数据
   getList({commit},data = {}){
        commit('getAdvertisMangerList',data)
   },
   //删除数据
//    deleteLsit({commit},id){

//    }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}