import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import for_layout from './for_layout'; //全局登录
import app_button_add from './setting/app_button_add';//首页按钮
import explosive from './setting/explosive';//爆款
import commend from './setting/commend';//新手
import yuebaoRate from './setting/yuebaoRate';//余额宝
import protocol from './setting/protocol';//协议政策
import bank from './setting/bank';//银行列表
import loginSpread from './setting/loginSpread';//登录页推广
import blackList from './setting/blackList';//黑名单
import bankCard from './setting/bankCard';//银行卡
import bankSupport from './setting/bankSupport';//开户行
import activityButton from './setting/activityButton';//活动按钮
import newsManager from './setting/newsMananger';//新闻管理
import advertisManager from './setting/advertisMananger';//广告管理
import clientVersion from './setting/clientVersion';//版本管理
import proposal from './setting/proposal';//建议与反馈
import advertis from './setting/advertis';//启动页管理
import slider from './setting/slider';//侧边栏
import peroid from './setting/peroid';//首页期限配置
import notice from './setting/notice';//公告
import comment from './setting/comment';//评论
import productUrl from './setting/productUrl';//通用地址
import cashOut from './member/cashOut';//提现管理
import devicePosition from './log/devicePosition';//log 设备定位
import pointLocation from './log/pointLocation';//log 点位
import topProduct from './product/topProduct'; //榜单置顶

const store = new Vuex.Store({
    modules: { // 使用状态整合来区分
        for_layout,
        app_button_add,
        explosive,
        commend,
        yuebaoRate,
        protocol,
        bank,
        loginSpread,
        blackList,
        bankCard,
        bankSupport,
        activityButton,
        newsManager,
        advertisManager,
        clientVersion,
        proposal,
        advertis,
        slider,
        peroid,
        notice,
        comment,
        productUrl,
        cashOut,
        devicePosition,
        pointLocation,
        topProduct
    }
});

export default store;