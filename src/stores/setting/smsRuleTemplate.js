import {
    get_smsRule_list,
    smsRule_detail,
    add_smsRule,
    modify_smsRule,
    delete_smsRule,
    get_templateRule_list,
    smsTemplate_detail,
    add_smsTemplate,
    modify_smsTemplate,
    delete_smsTemplate,
    get_sms_channel
} from '../../api/setting_use'

const state = {
    ruleDoArr: ['sms_rule_add', 'sms_rule_detail', 'sms_rule_del', 'sms_rule_upd'], //短信权限模块需要的的权限
    templateDoArr: ['sms_template_add', 'sms_template_detail', 'sms_template_del', 'sms_template_upd'], //短信模版模块需要的权限
    ruleDetailInfo: {}, //短信权限详情
    templateDetailInfo: {},//短信模版详情
    channelIdArr: [],//渠道信息
    ruleList: {
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
    templateList: {
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
}
const mutations = {
    // 将列表的page还原
    pageNumDefault(state, type) {
        state[type].pageNum = 1;
    },
    // 设置title头部的数据插入
    setTitleList(state, {
        arr,
        type
    }) {
        state[type].data.title = arr;
    },
    // 暂存详情信息
    saveDetail(state, { data, type }) {
        state[type] = data;
    },
    //获取列表数据
    setRuleList(state, res) {
        state.ruleList.data.list = res.data.list;
        state.ruleList.total = res.data.total;
        state.ruleList.data.list.forEach((item) => {
            // 类型
            if (item.type == "HF") {
                item.type = "高频";
            } else {
                item.type = "非高频";
            }
        })
    },
    // 存储渠道信息
    channelInfo(state, data) {
        state.channelIdArr = data;
    },
    //  获取短信模版列表
    setTemplateList(state, res) {
        state.templateList.data.list = res.data.list;
        state.templateList.total = res.data.total;
        state.templateList.data.list.forEach((item) => {
            state.channelIdArr.forEach((info) => {
                if (item.channelId == info.id) {
                    item.channelId = info.name;
                }
            })
        })
    },
    // 短信权限模块按钮权限
    ruleUserDo(state) {
        state.ruleList.data.custom = [];
        state.ruleList.data.quanxian = [];
        let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
        for (let item of state.ruleDoArr) {
            if (jurisdiction.indexOf(item) > -1) {
                state.ruleList.data.quanxian.push(item);
                if (item == 'sms_rule_detail') {
                    state.ruleList.data.custom.push({
                        text: "详情",
                        type: "primary",
                        size: "mini",
                        emit: "detail"
                    });
                }
                if (item == "sms_rule_del") {
                    state.ruleList.data.custom.push({
                        text: "删除",
                        type: "danger",
                        size: "mini",
                        emit: "delete"
                    });
                }
            }
        }
    },
    // 短信模版模块权限
    templateUserDo(state) {
        state.templateList.data.custom = [];
        state.templateList.data.quanxian = [];
        let jurisdiction = JSON.parse(sessionStorage.getItem("buttenpremissions"));
        for (let item of state.templateDoArr) {
            if (jurisdiction.indexOf(item) > -1) {
                state.templateList.data.quanxian.push(item);
                if (item == 'sms_template_detail') {
                    state.templateList.data.custom.push({
                        text: "详情",
                        type: "primary",
                        size: "mini",
                        emit: "detail"
                    });
                }
                if (item == "sms_template_del") {
                    state.templateList.data.custom.push({
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
    // 获取短信权限列表
    getSmsRuleList({ commit }, data) {
        return new Promise(() => {
            get_smsRule_list(data).then(res => {
                if (res && res.success) {
                    commit('setRuleList', res);
                }
            })
        })
    },
    // 增加短信权限
    addSmsRule({commit}, data) {
        return new Promise((resolve) => {
            add_smsRule(data).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })
    },
    // 获取短信权限详情
    smsRuleDetail({commit}, data) {
        return new Promise(() => {
            smsRule_detail(data).then(res => {
                if (res && res.success) {
                    commit('saveDetail', { data: res.data, type: "ruleDetailInfo" });
                }
            })
        })
    },
    //修改短信权限详情
    modifySmsRule({commit}, data) {
        return new Promise((resolve) => {
            modify_smsRule(data).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })
    },
    // 删除单条短信权限
    deleteSmsRule({commit}, data) {
        return new Promise((resolve) => {
            delete_smsRule(data).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })
    },

    // 短信模版

    // 获取短信模版列表
    getTemplateRuleList({ commit }, data) {
        return new Promise((resolve) => {
            get_templateRule_list(data).then(res => {
                if (res && res.success) {
                    commit('setTemplateList', res);
                    resolve(res);
                }
            })
        })
    },
    // 增加短信模版
    addSmsTemplate({commit}, data) {
        return new Promise((resolve) => {
            add_smsTemplate(data).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })
    },
    // 获取短信模版详情
    smsTemplateDetail({ commit }, data) {
        return new Promise((resolve) => {
            smsTemplate_detail(data).then(res => {
                if (res && res.success) {
                    commit('saveDetail', { data: res.data, type: "templateDetailInfo" });
                    resolve();
                }
            })
        })
    },
    //修改短信模版详情
    modifySmsTemplate({commit}, data) {
        return new Promise((resolve) => {
            modify_smsTemplate(data).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })
    },
    // 删除单条短信模版
    deleteSmsTemplate({commit}, data) {
        return new Promise((resolve) => {
            delete_smsTemplate(data).then(res => {
                if (res && res.success) {
                    resolve();
                }
            })
        })
    },
    // 获取短信渠道列表
    getSmsChannel({ commit }, data) {
        return new Promise((resolve) => {
            get_sms_channel(data).then(res => {
                if (res && res.success) {
                    // 存储渠道信息
                    commit('channelInfo', res.data.list);
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