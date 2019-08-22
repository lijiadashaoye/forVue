import {
    sms_manage,
    push_message,
    getAppChannel,
    productList,
    get_message_detail,
    add_push_message,
    delete_push_message,
    delete_sms_manage,
    get_sms_list,
    add_sms_manage,
    change_push_manage,
    upload_file
} from '../../api/setting_use'
const state = {
    newsDoArr: ['push_message_add', 'push_message_detail', 'push_message_del', 'push_message_upd'], //消息推送所需要的权限
    smsDoArr: ['sms_manage_add', 'sms_manage_detail', 'sms_manage_del'], //短信推送模块需要的权限
    newsDetailInfo: {}, //推送消息的详情信息
    smsList: {
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
    newsList: {
        checkBox: true, //是否开启多选
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
    // 将列表的page还原
    pageNumDefault(state, type) {
        state[type].pageNum = 1;
    },
    // 将列表的list初始化
    listDefault(state, type) {
        state[type].data.list = [];
    },
    // 设置title头部的数据插入
    setTitleList(state, {
        arr,
        type
    }) {
        state[type].data.title = arr;
    },
    // 暂存推送消息\的详情
    savePushDetail(state, data) {
        state.newsDetailInfo = data;
    },
    //获取列表数据
    SETSMSLIST(state, res) {
        state.smsList.data.list = res.data.list;
        state.smsList.total = res.data.total;
        state.smsList.data.list.forEach((item) => {
            //    发送目标
            if (item.sendTarget == "TOTAL_USER") {
                item.sendTarget = "全部用户";
            } else {
                item.sendTarget = "部分用户";
            }
            // 发送方式
            if (item.sendType == "SYSTEM_USER") {
                item.sendType = "系统用户";
            } else if (item.sendType == "IMPORT_PHONE") {
                item.sendType = "导入手机号";
            } else {
                item.sendType = "文本";
            }
            // 发送状态
            if(item.sendStatus=="WAIT_SEND"){
                item.sendStatus = "待发送";
            }else if(item.sendStatus=="SEND_SUCCESS"){
                item.sendStatus = "发送成功";
            }else if(item.sendStatus=="SENDFAIL"){
                item.sendStatus = "发送失败";
            }else{
                item.sendStatus = "发送中";
            }
        })
    },
    //  获取消息推送列表
    SETNEWSLIST(state, res) {
        state.newsList.data.list = res.data.list;
        state.newsList.total = res.data.total;
        state.newsList.data.list.forEach((item) => {
            // 推送方式
            if(item.pushWay=="PUSH"){
                item.pushWay = "推送";
            }else{
                item.pushWay = "站内信";
            }
        })
    },
    // 短信模块权限
    smsUserDo(state) {
        state.smsList.data.custom = [];
        state.smsList.data.quanxian = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        for (let item of state.smsDoArr) {
            if (jurisdiction.indexOf(item) > -1) {
                state.smsList.data.quanxian.push(item);
                if (item == 'sms_manage_detail') {
                    state.smsList.data.custom.push({
                        text: "详情",
                        type: "primary",
                        size: "mini",
                        emit: "detail"
                    });
                }
                if (item == "sms_manage_del") {
                    state.smsList.data.custom.push({
                        text: "删除",
                        type: "danger",
                        size: "mini",
                        emit: "delete"
                    });
                }
            }
        }
    },
    // 推送信息模块权限
    newsUserDo(state) {
        state.newsList.data.custom = [];
        state.newsList.data.quanxian = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        for (let item of state.newsDoArr) {
            if (jurisdiction.indexOf(item) > -1) {
                state.newsList.data.quanxian.push(item);
                if (item == 'push_message_detail') {
                    state.newsList.data.custom.push({
                        text: "详情",
                        type: "primary",
                        size: "mini",
                        emit: "detail"
                    });
                }
                if (item == "push_message_del") {
                    state.newsList.data.custom.push({
                        text: "删除",
                        type: "danger",
                        size: "mini",
                        emit: "delete"
                    });
                }
            }
        }
    },


}

const actions = {
    //  获取短信列表
    getSmsList({
        commit
    }, data) {
        sms_manage(data).then(res => {
            if (res && res.success) {
                commit('SETSMSLIST', res)
            }
        })
    },
    // 获取短信模板
    getSmsTemplate({
        commit
    }, data) {
        return new Promise((resolve) => {
            get_sms_list(data).then(res => {
                if (res && res.success) {
                    resolve(res.data)
                }
            })
        })
    },

    // 新增短信
    addSmsManage({
        commit
    }, data) {
        return new Promise((resolve) => {
            add_sms_manage(data).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })

    },
    // 上传短信模板
    upLoadFile({
        commit
    }, data) {
        return new Promise((resolve) => {
            upload_file(data, 'message').then(res => {
                if (res && res.success) {
                    resolve(res.data);
                }
            })
        })

    },
    // 删除短信
    deleteSmsManage({
        commit
    }, data) {
        return new Promise((resolve) => {
            delete_sms_manage(data).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })

    },
    // 获取消息推送列表
    getNewsList({
        commit
    }, data) {
        return new Promise(() => {
            push_message(data).then(res => {
                if (res && res.success) {
                    commit('SETNEWSLIST', res);
                }
            })
        })

    },
    // 获取推送信息详情
    getMessageDetail({
        commit
    }, data) {
        return new Promise((resolve) => {
            get_message_detail(data).then(res => {
                if (res && res.success) {
                    commit("savePushDetail", res.data);
                    resolve(res.data);
                }
            })
        })

    },
    // 推送消息产品类型获取
    getProductTypeList({
        commit
    }, data) {
        return new Promise((resolve) => {
            getAppChannel(data).then(res => {
                if (res && res.success) {
                    resolve(res.data)
                }
            })
        })
    },
    // 关联产品获取
    getProductList({
        commit
    }, data) {
        return new Promise((resolve) => {
            productList(data).then(res => {
                if (res && res.success) {
                    resolve(res.data)
                }
            })
        })
    },
    // 新增推送信息
    addProduct({
        commit
    }, data) {
        return new Promise((resolve) => {
            add_push_message(data).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })
    },
    // 修改推送消息 
    changePushManage({
        commit
    }, data) {
        return new Promise((resolve) => {
            change_push_manage(data).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })

    },
    // 删除推送信息
    deleteProduct({
        commit
    }, data) {
        return new Promise((resolve) => {
            delete_push_message(data).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}