import { black_list, black_list_del } from '../../api/setting_use';

const state = {
    blackNameList : {
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
    //获取黑名单列表
    getBlackNameListData(state,data) {
        black_list(data).then(res=> {
            if(res && res.success){
                state.blackNameList.data.list = res.data.list;
                state.blackNameList.total = res.data.total;
                state.blackNameList.data.list.forEach(v=> {
                    if(v.joinType == "IP") {
                        v.joinTypeCN = 'ip'
                    }else if(v.joinType == "TIMES") {
                        v.joinTypeCN = '频次'
                    }else if(v.joinType == 'OPERATE_ACTION') {
                        v.joinTypeCN = '操作行为'
                    }
                    if(v.dealType == 'SUSPEND') {
                        v.dealTypeCN = '账户异常,登录失败'
                    } else if(v.dealType == 'NOT_HANDLE') {
                        v.dealTypeCN = '可登录:无法绑卡和提现'
                    }
                })

            }
        })
    },
    //删除列表数据
    deleteList(state,id) {
        black_list_del(id).then(res=> {
            if(res.success) {
                black_list().then(res=> {
                    state.blackNameList.data.list = res.data.list;
                    state.blackNameList.total = res.data.total;
                    state.blackNameList.data.list.forEach(v=> {
                        if(v.joinType == "IP") {
                            v.joinTypeCN = 'ip'
                        }else if(v.joinType == "TIMES") {
                            v.joinTypeCN = '频次'
                        }else if(v.joinType == 'OPERATE_ACTION') {
                            v.joinTypeCN = '操作行为'
                        }
                        if(v.dealType == 'SUSPEND') {
                            v.dealTypeCN = '账户异常,登录失败'
                        } else if(v.dealType == 'NOT_HANDLE ') {
                            v.dealTypeCN = '可登录:无法绑卡和提现'
                        }
                    })
                })
            }
        })
    },
     // 用户权限判定，之后表格右侧会有不同的操作按钮
    userDo(state) {
        state.blackNameList.data.custom = [];
        let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
        if(jurisdiction.indexOf('black_list_detail') > -1){
            state.blackNameList.data.custom.push({
                text: "详情",
                type: "danger",
                size: "mini",
                emit: "detail"
            });
        }
        if(jurisdiction.indexOf('black_list_upd') > -1){
            state.blackNameList.data.quanxian.push('ok')
            state.blackNameList.data.custom.push({
                text: "修改",
                type: "warning",
                size: "small",
                emit: "edit"
            });
        }
        if(jurisdiction.indexOf('black_list_del') > -1){
            state.blackNameList.data.custom.push({
                text: "解封",
                type: "danger",
                size: "mini",
                emit: "delete"
            });
        }
    },
}

export default{
    namespaced: true,
    state,
    mutations
}