import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import login from "./pages/layout/login.vue";

import {
    Message
} from 'element-ui';

// admin 模块路由
let admin = [{
        name: 'user', // 用户管理
        path: '/home/admin/user',
        component: resolve => require(['./pages/admin/user/user.vue'], resolve),
    },
    {
        name: 'menu', // 菜单管理
        path: '/home/admin/menu',
        component: resolve => require(['./pages/admin/menu/menu.vue'], resolve),
    },
    {
        name: 'rule', // 角色管理
        path: '/home/admin/role',
        component: resolve => require(['./pages/admin/role/role.vue'], resolve),
    },
    {
        name: 'department', // 部门管理
        path: '/home/admin/department',
        component: resolve => require(['./pages/admin/department/department.vue'], resolve),
    }, {
        name: 'dict', // 字典管理
        path: '/home/admin/dict',
        component: resolve => require(['./pages/admin/dict/dict.vue'], resolve),
    },
    {
        name: 'info', // 修改信息
        path: '/home/admin/info',
        component: resolve => require(['./pages/admin/info/info.vue'], resolve),
    },
]

// marketing 模块路由
let marketing = [{
        name: 'activity_create', // 创建活动
        path: '/home/marketing/activity/create',
        component: resolve => require(['./pages/marketing/activity_create/activity_create.vue'], resolve),
        children: [{
            name: 'activity_create_step1',
            path: '/home/marketing/activity/create/step1',
            component: resolve => require(['./pages/marketing/activity_create/step1/step1.vue'], resolve)
        }, {
            name: 'activity_create_step2',
            path: '/home/marketing/activity/create/step2',
            component: resolve => require(['./pages/marketing/activity_create/step2/step2.vue'], resolve)
        }]
    }, {
        name: 'activity_list', // 活动列表
        path: '/home/marketing/activity/list',
        component: resolve => require(['./pages/marketing/activity_list/activity_list.vue'], resolve),

    }, {
        name: 'coupon_add', // 创建卡券
        path: '/home/marketing/coupon/add',
        component: resolve => require(['./pages/marketing/coupon_add/coupon_add.vue'], resolve),
        children: [{
            name: 'coupon_add_step1',
            path: '/home/marketing/coupon/add/step1',
            component: resolve => require(['./pages/marketing/coupon_add/step1/step1.vue'], resolve)
        }]
    },
    {
        name: 'coupon_info', // 领用详情
        path: '/home/marketing/coupon/coupon_info',
        component: resolve => require(['./pages/marketing/coupon_info/coupon_info.vue'], resolve)
    },

    {
        name: 'coupon_group', // 分组操作
        path: '/home/marketing/coupon/coupon_group',
        component: resolve => require(['./pages/marketing/coupon_info/coupon_group.vue'], resolve)
    },
    {
        name: 'coupon_list', // 卡券列表
        path: '/home/marketing/coupon/list',
        component: resolve => require(['./pages/marketing/coupon_list/coupon_list.vue'], resolve),

    }, {
        name: 'packet_add', // 创建红包
        path: '/home/marketing/packet/add',
        component: resolve => require(['./pages/marketing/packet_add/packet_add.vue'], resolve),
    }, {
        name: 'packet_list', // 红包列表
        path: '/home/marketing/packet/list',
        component: resolve => require(['./pages/marketing/packet_list/packet_list.vue'], resolve),
    },
    {
        name: 'packet_info', // 红包详情
        path: '/home/marketing/packet/info',
        component: resolve => require(['./pages/marketing/packet_info/packet_info.vue'], resolve),
    }
]

// setting 模块路由
let setting = [{
        name: 'product_agreement_list', // 协议列表
        path: '/home/setting/product_agreement',
        component: resolve => require(['./pages/setting/product_agreement/list.vue'], resolve),
    },
    {
        name: 'product_agreement_content', // 创建、修改协议
        path: '/home/setting/product_agreement/content',
        component: resolve => require(['./pages/setting/product_agreement/content.vue'], resolve),
    },
    {
        name: 'new_create', // 创建活动
        path: '/home/setting/config/solution/list',
        redirect: '/home/setting/config/solution/list/pzgl',
        component: resolve => require(['./pages/setting/solution_list/zong.vue'], resolve),
        children: [{
                name: 'pzgl',
                path: '/home/setting/config/solution/list/pzgl',
                component: resolve => require(['./pages/setting/solution_list/pzgl.vue'], resolve)
            }, {
                name: 'scbj',
                path: '/home/setting/config/solution/list/scbj',
                component: resolve => require(['./pages/setting/solution_list/scbj.vue'], resolve)
            },
            {
                name: 'scyl',
                path: '/home/setting/config/solution/list/scyl',
                component: resolve => require(['./pages/setting/solution_list/scyl.vue'], resolve)
            },
            {
                name: 'sczj',
                path: '/home/setting/config/solution/list/sczj',
                component: resolve => require(['./pages/setting/solution_list/sczj.vue'], resolve)
            }
        ]
    },
    /**
     * app配置
     */
    {
        name: '创建app按钮', // 创建app按钮
        path: '/home/setting/app-button/add',
        component: resolve => require(['./pages/setting/app-button_add'], resolve),
    },
    {
        name: 'app按钮列表', // app按钮列表
        path: '/home/setting/app-button/list',
        component: resolve => require(['./pages/setting/app-button_list'], resolve),

    }, {
        name: '新增普通新闻', // 创建新闻管理
        path: '/home/setting/news-manage/add',
        component: resolve => require(['./pages/setting/newsManageAdd'], resolve),
    },
    {
        name: '新闻管理列表', // 新闻管理列表
        path: '/home/setting/news-manage/list',
        component: resolve => require(['./pages/setting/newsManageList'], resolve),

    },
    {
        name: '创建活动按钮', // 创建活动按钮
        path: '/home/setting/activity-button/add',
        component: resolve => require(['./pages/setting/activity_button_add'], resolve),
    },
    {
        name: '活动按钮列表', // 活动按钮列表
        path: '/home/setting/activity-button/list',
        component: resolve => require(['./pages/setting/activity_button_list'], resolve),
    },
    // app-广告位置模块
    {
        name: '广告位置列表',
        path: '/home/banner/:type',
        component: resolve => require(['./pages/setting/app_advertising_position'], resolve),
    },
    //app-广告图模块
    {
        name: '广告图列表',
        path:'/home/banner/:type/list',
        component: resolve => require(['./pages/setting/app_mapList'], resolve),
    },
    // app-新增广告
    {
        name:'新增广告',
        path:'/home/banner/:type/list/add',
        component: resolve => require(['./pages/setting/app_mapList/add_map'], resolve),

    },
    // app-系统升级弹框
    {
        name:'升级弹框',
        path:'/home/setting/banner-upgrade/list',
        component: resolve => require(['./pages/setting/app_upgrade_box'], resolve),
    },
    // app-功能区管理
    {
        name:"app-底部菜单",
        path:'/home/setting/banner-menu/list',
        component: resolve => require(['./pages/setting/app_function'],resolve)
    },
    {
        name: '创建爆款', // 创建爆款
        path: '/home/setting/explosive/add',
        component: resolve => require(['./pages/setting/explosive_add'], resolve),
    },
    {
        name: '爆款列表', // 爆款列表
        path: '/home/setting/explosive/list',
        component: resolve => require(['./pages/setting/explosive_list'], resolve),

    },
    {
        name: '创建新手专享', // 创建新手专享
        path: '/home/setting/commend/add',
        component: resolve => require(['./pages/setting/commend_add'], resolve),
    },
    {
        name: '新手专享列表', // 新手专享列表
        path: '/home/setting/commend/list',
        component: resolve => require(['./pages/setting/commend_list'], resolve),
    },
    {
        name: '新增余额宝收益', // 余额宝专享
        path: '/home/setting/yuebao-rate/add',
        component: resolve => require(['./pages/setting/yuebao-rate_add'], resolve),
    },
    {
        name: '余额宝收益列表', // 余额宝新手专享列表
        path: '/home/setting/yuebao-rate/list',
        component: resolve => require(['./pages/setting/yuebao-rate_list'], resolve),
    },
    {
        name: '创建银行图片',
        path: '/home/setting/bank/add',
        component: resolve => require(['./pages/setting/bank_add'], resolve)
    },
    {
        name: '银行图片列表',
        path: '/home/setting/bank/list',
        component: resolve => require(['./pages/setting/bank_list'], resolve),
    },
    {
        name: '添加银行卡',
        path: '/home/setting/bank-card/add',
        component: resolve => require(['./pages/setting/bank-card_add'], resolve),
    },
    {
        name: '银行卡列表',
        path: '/home/setting/bank-card/list',
        component: resolve => require(['./pages/setting/bank-card_list'], resolve),

    },
    {
        name: '添加开户银行卡',
        path: '/home/setting/bank-support-deposit/add',
        component: resolve => require(['./pages/setting/bank-support-deposit_add'], resolve),
    },
    {
        name: '开户银行卡列表',
        path: '/home/setting/bank-support-deposit/list',
        component: resolve => require(['./pages/setting/bank-support-deposit_list'], resolve),

    },
    {
        name: '创建登录页',
        path: '/home/setting/login-page-spread/add',
        component: resolve => require(['./pages/setting/login-page-spread_add'], resolve),
    },
    {
        name: '登录页列表',
        path: '/home/setting/login-page-spread/list',
        component: resolve => require(['./pages/setting/login-page-spread_list'], resolve),

    },
    {
        name: '黑名单列表',
        path: '/home/member/member-black-list/list',
        component: resolve => require(['./pages/setting/member-black-list_list'], resolve),

    },
    {
        name: '创建协议政策',
        path: '/home/setting/protocol-private/add',
        component: resolve => require(['./pages/setting/protocol-private_add'], resolve),
    },
    {
        name: '协议政策列表',
        path: '/home/setting/protocol-private/list',
        component: resolve => require(['./pages/setting/protocol-private_list'], resolve),
    },
    // 广告管理
    {
        name: '广告列表',
        path: '/home/setting/advertis-manage/list',
        component: resolve => require(['./pages/setting/advertisManageList'], resolve),

    },
    {
        name: '创建广告',
        path: '/home/setting/advertis-manage/add',
        component: resolve => require(['./pages/setting/advertisManageAdd'], resolve),

    },
    {
        name: '广告详情',
        path: '/home/setting/advertis-manage/detail',
        component: resolve => require(['./pages/setting/advertisManageDetail'], resolve),

    },
    // 消息评论管理
    {
        name: '短信列表',
        path: '/home/setting/sms/manager/list',
        component: resolve => require(['./pages/setting/short-message-list'], resolve),
    },
    {
        name: '批量发送短信',
        path: '/home/setting/sms/manager/list/send-message',
        component: resolve => require(['./pages/setting/short-message-list/sendMessage'], resolve),
    },
    {
        name: '短息详情',
        path: '/home/setting/sms/manager/list/sms-details',
        component: resolve => require(['./pages/setting/short-message-list/smsDetails'], resolve),
    },
    {
        name: '消息推送列表',
        path: '/home/setting/push/message/list',
        component: resolve => require(['./pages/setting/message-management'], resolve),
    },
    {
        name: '新增消息',
        path: '/home/setting/push/message/list/new-news',
        component: resolve => require(['./pages/setting/message-management/newNews'], resolve),
    },
    {
        name: '消息详情',
        path: '/home/setting/push/message/list/message-details',
        component: resolve => require(['./pages/setting/message-management/messageDetails'], resolve),
    },
    // 父子级列表
    {
        name: '值域配置列表',
        path: '/home/setting/parent/relation/list',
        component: resolve => require(['./pages/setting/relation-list'], resolve),
    },
    // 短信规则列表
    {
        name: '短信规则列表',
        path: '/home/setting/sms/rule/list',
        component: resolve => require(['./pages/setting/sms-rule-list'], resolve),
    },
    //短信模版列表
    {
        name: '短信模版列表',
        path: '/home/setting/sms/template/list',
        component: resolve => require(['./pages/setting/sms-template-list'], resolve),
    },
    // 版本管理
    {
        name: '版本管理列表',
        path: '/home/setting/client-version/list',
        component: resolve => require(['./pages/setting/clientVersionList'], resolve),
    },
    {
        name: '启动页列表',
        path: '/home/setting/advertis/list',
        component: resolve => require(['./pages/setting/advertis_list'], resolve),

    }, {
        name: '创建启动页',
        path: '/home/setting/advertis/add',
        component: resolve => require(['./pages/setting/advertis_add'], resolve),

    },
    {
        name: '侧边栏列表',
        path: '/home/setting/sidebar/list',
        component: resolve => require(['./pages/setting/sidebar_list'], resolve),

    }, {
        name: '创建侧边栏',
        path: '/home/setting/sidebar/add',
        component: resolve => require(['./pages/setting/sidebar_add'], resolve),
    },
    {
        name: '首页期限列表',
        path: '/home/setting/index-peroid/list',
        component: resolve => require(['./pages/setting/index_peroid_list'], resolve),
    }, {
        name: '创建首页期限',
        path: '/home/setting/index-peroid/add',
        component: resolve => require(['./pages/setting/index_peroid_add'], resolve),
    },
    {
        name: '评论回复列表',
        path: '/home/setting/comment/list',
        component: resolve => require(['./pages/setting/comment_list'], resolve),
    },
    {
        name: '建议反馈列表',
        path: '/home/setting/proposal/list',
        component: resolve => require(['./pages/setting/proposal_list'], resolve),
    },
    {
        name: '公告列表',
        path: '/home/setting/notice/list',
        component: resolve => require(['./pages/setting/notice_list'], resolve),
    },
    {
        name: '地址列表',
        path: '/home/setting/common-address/list',
        component: resolve => require(['./pages/setting/productUrl_list'], resolve),

    },
    {
        name: '问题信息',
        path: '/home/setting/problem-centered/info',
        component: resolve => require(['./pages/setting/problemInfo'], resolve)
    },
    {
        name: '问题分类',
        path: '/home/setting/problem-centered/classify',
        component: resolve => require(['./pages/setting/questionDispose'], resolve)
    }
]
// 产品中心 模块路由
let Products_Management = [{ // 存款管理
        name: 'deposit',
        path: '/home/Products_Management/deposit',
        redirect: '/home/Products_Management/deposit/mainPage',
        component: resolve => require(['./pages/Products_Management/deposit/deposit.vue'], resolve),
        children: [{
                name: 'deposit_mainPage',
                path: '/home/Products_Management/deposit/mainPage',
                component: resolve => require(['./pages/Products_Management/deposit/mainPage/mainPage.vue'], resolve)
            },
            {
                name: 'huoqi_step1',
                path: '/home/Products_Management/deposit/huoqi/step1',
                component: resolve => require(['./pages/Products_Management/deposit/huoqi/step1.vue'], resolve)
            },
            {
                name: 'huoqi_step2',
                path: '/home/Products_Management/deposit/huoqi/step2',
                component: resolve => require(['./pages/Products_Management/deposit/huoqi/step2.vue'], resolve)
            },
            {
                name: 'dingqi_step1',
                path: '/home/Products_Management/deposit/dingqi/step1',
                component: resolve => require(['./pages/Products_Management/deposit/dingqi/step1.vue'], resolve)
            },
            {
                name: 'dingqi_step2',
                path: '/home/Products_Management/deposit/dingqi/step2',
                component: resolve => require(['./pages/Products_Management/deposit/dingqi/step2.vue'], resolve)
            },
            {
                name: 'jiegou_step1',
                path: '/home/Products_Management/deposit/jiegou/step1',
                component: resolve => require(['./pages/Products_Management/deposit/jiegou/step1.vue'], resolve)
            },
            {
                name: 'jiegou_step2',
                path: '/home/Products_Management/deposit/jiegou/step2',
                component: resolve => require(['./pages/Products_Management/deposit/jiegou/step2.vue'], resolve)
            },
            {
                name: 'zhineng_step1',
                path: '/home/Products_Management/deposit/zhineng/step1',
                component: resolve => require(['./pages/Products_Management/deposit/zhineng/step1.vue'], resolve)
            },
            {
                name: 'zhineng_step2',
                path: '/home/Products_Management/deposit/zhineng/step2',
                component: resolve => require(['./pages/Products_Management/deposit/zhineng/step2.vue'], resolve)
            },
            {
                name: 'deposit_info',
                path: '/home/Products_Management/deposit/info',
                component: resolve => require(['./pages/Products_Management/deposit/info/info.vue'], resolve)
            },
            {
                name: 'big_step1',
                path: '/home/Products_Management/deposit/big/step1',
                component: resolve => require(['./pages/Products_Management/deposit/big/step1.vue'], resolve)
            },
            {
                name: 'big_step2',
                path: '/home/Products_Management/deposit/big/step2',
                component: resolve => require(['./pages/Products_Management/deposit/big/step2.vue'], resolve)
            }
        ]
    },
    { // 理财管理
        name: 'manage_money_matters',
        path: '/home/Products_Management/manage_money_matters',
        redirect: '/home/Products_Management/manage_money_matters/mainPage',
        component: resolve => require(['./pages/Products_Management/manage_money_matters/manage_money_matters.vue'], resolve),
        children: [{
                name: 'manage_money_matters_mainPage',
                path: '/home/Products_Management/manage_money_matters/mainPage',
                component: resolve => require(['./pages/Products_Management/manage_money_matters/mainPage/mainPage.vue'], resolve)
            },
            {
                name: 'manage_money_matters_step1',
                path: '/home/Products_Management/manage_money_matters/step1',
                component: resolve => require(['./pages/Products_Management/manage_money_matters/licai/step1.vue'], resolve)
            },
            {
                name: 'manage_money_matters_step2',
                path: '/home/Products_Management/manage_money_matters/step2',
                component: resolve => require(['./pages/Products_Management/manage_money_matters/licai/step2.vue'], resolve)
            },
            {
                name: 'baoxian_step1',
                path: '/home/Products_Management/manage_money_matters/baoxian_step1',
                component: resolve => require(['./pages/Products_Management/manage_money_matters/baoxian/step1.vue'], resolve)
            },
            {
                name: 'baoxian_step2',
                path: '/home/Products_Management/manage_money_matters/baoxian_step2',
                component: resolve => require(['./pages/Products_Management/manage_money_matters/baoxian/step2.vue'], resolve)
            },
            {
                name: 'manage_money_matters_info',
                path: '/home/Products_Management/manage_money_matters/info',
                component: resolve => require(['./pages/Products_Management/manage_money_matters/info/info.vue'], resolve)
            }
        ]
    },
    { // 货币基金管理
        name: 'money_fund',
        path: '/home/Products_Management/money_fund',
        redirect: '/home/Products_Management/money_fund/mainPage',
        component: resolve => require(['./pages/Products_Management/money_fund/money_fund.vue'], resolve),
        children: [{
                name: 'money_fund_mainPage',
                path: '/home/Products_Management/money_fund/mainPage',
                component: resolve => require(['./pages/Products_Management/money_fund/mainPage.vue'], resolve)
            },
            {
                name: '关联列表',
                path: '/home/setting/parent/tree/list',
                component: resolve => require(['./pages/setting/relation-list'], resolve),
            },
            {
                name: 'money_fund_step1',
                path: '/home/Products_Management/money_fund/step1',
                component: resolve => require(['./pages/Products_Management/money_fund/step1.vue'], resolve)
            },
            {
                name: 'money_fund_step2',
                path: '/home/Products_Management/money_fund/step2',
                component: resolve => require(['./pages/Products_Management/money_fund/step2.vue'], resolve)
            },
            {
                name: 'money_fund_info',
                path: '/home/Products_Management/money_fund/info',
                component: resolve => require(['./pages/Products_Management/money_fund/info.vue'], resolve)
            }
        ]
    },
    { // 纯债基金管理
        name: 'pure_debt_fund',
        path: '/home/Products_Management/pure_debt_fund',
        redirect: '/home/Products_Management/pure_debt_fund/mainPage',
        component: resolve => require(['./pages/Products_Management/pure_debt_fund/pure_debt_fund.vue'], resolve),
        children: [{
                name: 'pure_debt_fund_mainPage',
                path: '/home/Products_Management/pure_debt_fund/mainPage',
                component: resolve => require(['./pages/Products_Management/pure_debt_fund/mainPage.vue'], resolve)
            },
            {
                name: 'pure_debt_fund_step1',
                path: '/home/Products_Management/pure_debt_fund/step1',
                component: resolve => require(['./pages/Products_Management/pure_debt_fund/step1.vue'], resolve)
            },
            {
                name: 'pure_debt_fund_step2',
                path: '/home/Products_Management/pure_debt_fund/step2',
                component: resolve => require(['./pages/Products_Management/pure_debt_fund/step2.vue'], resolve)
            },
            {
                name: 'pure_debt_fund_step3',
                path: '/home/Products_Management/pure_debt_fund/step3',
                component: resolve => require(['./pages/Products_Management/pure_debt_fund/step3.vue'], resolve)
            },
            {
                name: 'pure_debt_fund_info',
                path: '/home/Products_Management/pure_debt_fund/info',
                component: resolve => require(['./pages/Products_Management/pure_debt_fund/info.vue'], resolve)
            }
        ]
    },
    { // 榜单置顶管理
        name: '榜单置顶管理',
        path: '/home/Products_Management/topProduct/list',
        component: resolve => require(['./pages/Products_Management/topProduct'], resolve),
    },
    {
        name: '产品支取提示',
        path: '/home/product/prompt/message/list',
        component: resolve => require(['./pages/Products_Management/promptMsg'], resolve),
    },
    { // 机构管理
        name: 'organizational',
        path: '/home/Organizational_Management/organizational',
        redirect: '/home/Organizational_Management/organizational/mainPage',
        component: resolve => require(['./pages/Organizational_Management/Organizational_Management.vue'], resolve),
        children: [{
                name: 'organizational_mainPage',
                path: '/home/Organizational_Management/organizational/mainPage',
                component: resolve => require(['./pages/Organizational_Management/organizational/mainPage.vue'], resolve)
            },
            {
                name: 'organizational_step1',
                path: '/home/Organizational_Management/organizational/step1',
                component: resolve => require(['./pages/Organizational_Management/organizational/step1.vue'], resolve)
            },
            {
                name: 'organizational_step2',
                path: '/home/Organizational_Management/organizational/step2',
                component: resolve => require(['./pages/Organizational_Management/organizational/step2.vue'], resolve)
            },
            {
                name: 'organizational_info',
                path: '/home/Organizational_Management/organizational/info',
                component: resolve => require(['./pages/Organizational_Management/organizational/info.vue'], resolve)
            }
        ]
    },

    { // 投融资管理
        name: 'financing',
        path: '/home/Products_Management/financing_management',
        redirect: '/home/Products_Management/financing_management/mainPage',
        component: resolve => require(['./pages/Products_Management/financing_management/financing_management.vue'], resolve),
        children: [{
                name: 'financing_mainPage',
                path: '/home/Products_Management/financing_management/mainPage',
                component: resolve => require(['./pages/Products_Management/financing_management/mainPage.vue'], resolve)
            },
            {
                name: 'financing_step1', // 新增投融资产品
                path: '/home/Products_Management/financing_management/step1',
                component: resolve => require(['./pages/Products_Management/financing_management/step1.vue'], resolve)
            },
            {
                name: 'financing_step2',
                path: '/home/Products_Management/financing_management/step2',
                component: resolve => require(['./pages/Products_Management/financing_management/step2.vue'], resolve)
            },
            {
                name: 'risk_notice', // 风险告知
                path: '/home/Products_Management/financing_management/risk_notice',
                component: resolve => require(['./pages/Products_Management/financing_management/risk_notice.vue'], resolve)
            },
            {
                name: 'project_description', // 项目说明
                path: '/home/Products_Management/financing_management/project_description',
                component: resolve => require(['./pages/Products_Management/financing_management/project_description.vue'], resolve)
            }
        ]
    },

    { // 基金公司管理
        name: 'fund_company',
        path: '/home/Organizational_Management/fund_company',
        redirect: '/home/Organizational_Management/fund_company/mainPage',
        component: resolve => require(['./pages/Organizational_Management/Organizational_Management.vue'], resolve),
        children: [{
                name: 'fund_company_mainPage',
                path: '/home/Organizational_Management/fund_company/mainPage',
                component: resolve => require(['./pages/Organizational_Management/fund_company/mainPage.vue'], resolve)
            },
            {
                name: 'fund_company_step1',
                path: '/home/Organizational_Management/fund_company/step1',
                component: resolve => require(['./pages/Organizational_Management/fund_company/step1.vue'], resolve)
            },
            {
                name: 'fund_company_info',
                path: '/home/Organizational_Management/fund_company/info',
                component: resolve => require(['./pages/Organizational_Management/fund_company/info.vue'], resolve)
            }
        ]
    },
    // 标签管理
    {
        name: 'markManage',
        path: '/home/Products_Management/markManage',
        component: resolve => require(['./pages/Products_Management/markManage.vue'], resolve),
    },
    // 币种管理(列表)
    {
        name: 'coin_manage',
        path: '/home/Products_Management/coin',
        component: resolve => require(['./pages/Products_Management/coin_manage/coinManage.vue'], resolve),
    },
    // 币种管理(新增、修改)
    {
        name: 'coin_content',
        path: '/home/Products_Management/coin_content',
        component: resolve => require(['./pages/Products_Management/coin_manage/coinContent.vue'], resolve),
    }



]
// member 模块路由
let member = [{
        name: 'badgewall_create',
        path: '/home/member/badgewall/create',
        component: resolve => require(['./pages/member/badgewall_create/badgewall_create.vue'], resolve),
    },
    {
        name: 'badgewall_list',
        path: '/home/member/badgewall/list',
        component: resolve => require(['./pages/member/badgewall_list/badgewall_list.vue'], resolve),

    },
    {
        name: 'label_list',
        path: '/home/member/label/list',
        component: resolve => require(['./pages/member/label_list/label_list.vue'], resolve),

    },
    {
        name: 'level_list',
        path: '/home/member/level/list',
        component: resolve => require(['./pages/member/level_list/level_list.vue'], resolve),

    },
    {
        name: 'manager_list',
        path: '/home/member/manager/list',
        component: resolve => require(['./pages/member/manager_list/manager_list.vue'], resolve),

    },
    {
        name: 'manager_info',
        path: '/home/member/manager_info',
        component: resolve => require(['./pages/member/manager_info/manager_info.vue'], resolve),

    },
    {
        name: '会员登录记录',
        path: '/home/member/member-login-record/list',
        component: resolve => require(['./pages/member/loginRecord'],resolve)
    },
    {
        name: 'mission_create',
        path: '/home/member/mission/create',
        redirect: '/home/member/mission/create/mainPage',
        component: resolve => require(['./pages/member/mission_create/mission_create.vue'], resolve),
        children: [{
                name: 'mission_create_mainPage',
                path: '/home/member/mission/create/mainPage',
                component: resolve => require(['./pages/member/mission_create/mainPage/mainPage.vue'], resolve)
            },
            {
                name: 'mission_create_step1',
                path: '/home/member/mission/create/step1',
                component: resolve => require(['./pages/member/mission_create/step1/step1.vue'], resolve)
            }
        ]
    },
    {
        name: 'mission_list',
        path: '/home/member/mission/list',
        component: resolve => require(['./pages/member/mission_list/mission_list.vue'], resolve),

    },
    {
        name: 'mission_tabList',
        path: '/home/mission/tab/list',
        component: resolve => require(['./pages/member/mission_tabList/mission_tabList.vue'], resolve),
    },
    {
        name: 'badgewall_info',
        path: '/home/member/badgewall_info',
        component: resolve => require(['./pages/member/badgewall_info/badgewall_info.vue'], resolve),
    },
    {
        name: '提现管理',
        path: '/home/member/cash-out',
        component: resolve => require(['./pages/member/cash_out'], resolve),
    }
]
// 设备定位列表，点位列表
let log = [{
        name: '设备定位列表',
        path: '/log/device/list',
        component: resolve => require(['./pages/log/equipmentPositioningList.vue'], resolve),
    },
    {
        name: '点位列表',
        path: '/log/point/list',
        component: resolve => require(['./pages/log/pointList.vue'], resolve),
    }
]
//沙盒
let sandbox = [{
        name: 'platform', // 平台配置列表
        path: '/home/sandbox/platform/list',
        component: resolve => require(['./pages/sandbox/platform.vue'], resolve),
    },
    {
        name: 'platform_add', // 新增配置
        path: '/home/sandbox/platform/add_platform',
        component: resolve => require(['./pages/sandbox/platform_add.vue'], resolve),
    },
    { 
        name: 'sandbox_bank', // 银行管理
        path: '/home/sandbox/platform/bank',
        component: resolve => require(['./pages/sandbox/bank.vue'], resolve),
    },
    {
        name: 'bank_product', // 银行产品管理
        path: '/home/sandbox/platform/product',
        component: resolve => require(['./pages/sandbox/bankproduct.vue'], resolve),
    },
    {
        name: 'add_bank_product', // 新增配置
        path: '/home/sandbox/platform/toAdd',
        component: resolve => require(['./pages/sandbox/add_bank_product.vue'], resolve),
    },
]
//资讯中心
let information = [{
    name: '文章管理',
    path: '/home/information/essay/list',
    component: resolve => require(['./pages/information/article'], resolve)
},{
    name: '文章栏目管理',
    path: '/home/information/essay/title/list',
    component: resolve => require(['./pages/information/articleType'], resolve)
},{
    name: '文章标签管理',
    path: '/home/information/essay/lable/list',
    component: resolve => require(['./pages/information/articleTags'], resolve)
},{
    name: '文章评论管理',
    path: '/home/information/essay/discuss/list',
    component: resolve => require(['./pages/information/articleComments'], resolve)
},{
    name: '新闻设置',
    path: '/home/information/essay/new-set/list',
    component: resolve => require(['./pages/information/news'], resolve)
}]
// 主框架路由
let router = new Router({
    mode: 'hash',
    routes: [{
            path: '',
            redirect: '/login'
        },
        {
            name: 'login',
            path: '/login',
            component: login,
        },
        {
            name: 'home',
            path: '/home',
            component: resolve => require(['./pages/layout/home.vue'], resolve),
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
            children: [{
                    name: 'admin',
                    path: '/home/admin',
                    component: resolve => require(['./pages/admin/admin.vue'], resolve),
                    children: [...admin]
                },
                {
                    name: 'marketing',
                    path: '/home/marketing',
                    component: resolve => require(['./pages/marketing/marketing.vue'], resolve),
                    children: [...marketing]
                },
                {
                    name: 'member',
                    path: '/home/member',
                    component: resolve => require(['./pages/member/member.vue'], resolve),
                    children: [...member]
                },
                {
                    name: 'Products_Management',
                    path: '/home/Products_Management',
                    component: resolve => require(['./pages/Products_Management/Products_Management.vue'], resolve),
                    children: [...Products_Management]
                },
                {
                    name: 'setting',
                    path: '/home/setting',
                    component: resolve => require(['./pages/setting/setting.vue'], resolve),
                    children: [...setting]
                },
                {
                    name: 'sandbox',
                    path: '/home/sandbox',
                    component: resolve => require(['./pages/sandbox/shahe_mainpage.vue'], resolve),
                    children: [...sandbox]
                },
                {
                    name: 'log',
                    path: '/log',
                    component: resolve => require(['./pages/log/log.vue'], resolve),
                    children: [...log]
                },
                {
                    name: '预警系统配置',
                    path: '/home/alarm/config',
                    component: resolve => require(['./pages/alarm/alarmConfig/index.vue'], resolve),
                },
                {
                    name: 'information',
                    path: '/home/information',
                    component: resolve => require(['./pages/information/index.vue'],resolve),
                    children: [...information]
                }
            ]

        },

    ]
})

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断是否需要登录权限
        if (sessionStorage.getItem('token')) { // 判断是否登录
            // 显示提示
            Message({
                message: '已成功登录了！',
                type: 'success',
                duration: 3 * 1000
            })
            next()
        } else { // 没登录则跳转到登录界面

            // 显示提示
            Message({
                message: '请登录！',
                type: 'error',
                duration: 5 * 1000
            })
            next({
                path: '/login',
            })
        }
    } else {
        next()
    }
})

export default router