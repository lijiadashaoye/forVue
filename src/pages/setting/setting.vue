<template>
  <div>
    <router-view></router-view>
  </div>
</template>


<script>
import app_button_add from '../../stores/setting/app_button_add';//首页按钮
import appConfig from '../../stores/setting/app_config'; //app逻辑
import commend from '../../stores/setting/commend';//新手
import explosive from '../../stores/setting/explosive';//爆款
import yuebaoRate from '../../stores/setting/yuebaoRate';//余额宝
import protocol from '../../stores/setting/protocol';//协议政策
import bank from '../../stores/setting/bank';//银行列表
import loginSpread from '../../stores/setting/loginSpread';//登录页推广
import blackList from '../../stores/setting/blackList';//黑名单
import bankCard from '../../stores/setting/bankCard';//银行卡
import bankSupport from '../../stores/setting/bankSupport';//开户行
import activityButton from '../../stores/setting/activityButton';//活动按钮
import newsManager from '../../stores/setting/newsMananger';//新闻管理
import advertisManager from '../../stores/setting/advertisMananger';//广告管理
import clientVersion from '../../stores/setting/clientVersion';//版本管理
import proposal from '../../stores/setting/proposal';//建议与反馈
import advertis from '../../stores/setting/advertis';//启动页管理
import slider from '../../stores/setting/slider';//侧边栏
import peroid from '../../stores/setting/peroid';//首页期限配置
import notice from '../../stores/setting/notice';//公告
import comment from '../../stores/setting/comment';//评论
import productUrl from '../../stores/setting/productUrl';//通用地址
import message from '../../stores/setting/message';//信息和短信列表
import relation from '../../stores/setting/relation';//父子依赖关系
import smsRuleTemplate from '../../stores/setting/smsRuleTemplate';//短信权限/模版
import problemInfo from '../../stores/setting/problemInfo';//问题信息
import questionDispose from '../../stores/setting/questionDispose';//问题分类
export default {
  props: {},
  data() {
    return {};
  },
  created() {
      this.$store.registerModule('app_button_add', app_button_add);
      this.$store.registerModule('appConfig',appConfig);
      this.$store.registerModule('commend', commend);
      this.$store.registerModule('yuebaoRate', yuebaoRate);
      this.$store.registerModule('protocol', protocol);
      this.$store.registerModule('bank', bank);
      this.$store.registerModule('loginSpread', loginSpread);
      this.$store.registerModule('blackList', blackList);
      this.$store.registerModule('bankCard', bankCard);
      this.$store.registerModule('bankSupport', bankSupport);
      this.$store.registerModule('activityButton', activityButton);
      this.$store.registerModule('newsManager', newsManager);
      this.$store.registerModule('advertisManager', advertisManager);
      this.$store.registerModule('clientVersion', clientVersion);
      this.$store.registerModule('proposal', proposal);
      this.$store.registerModule('advertis', advertis);
      this.$store.registerModule('slider', slider);
      this.$store.registerModule('peroid', peroid);
      this.$store.registerModule('notice', notice);
      this.$store.registerModule('comment', comment);
      this.$store.registerModule('productUrl', productUrl);
      this.$store.registerModule('explosive', explosive);
      this.$store.registerModule('message', message);
      this.$store.registerModule('relation', relation);
      this.$store.registerModule('smsRuleTemplate', smsRuleTemplate);
      this.$store.registerModule('problemInfo', problemInfo);
      this.$store.registerModule('questionDispose', questionDispose);
  },
  watch: {},
  methods: {},
  beforeDestroy() {
      this.$store.unregisterModule('app_button_add');
      this.$store.unregisterModule('appConfig');
      this.$store.unregisterModule('commend');
      this.$store.unregisterModule('yuebaoRate');
      this.$store.unregisterModule('protocol');
      this.$store.unregisterModule('bank');
      this.$store.unregisterModule('loginSpread');
      this.$store.unregisterModule('blackList');
      this.$store.unregisterModule('bankCard');
      this.$store.unregisterModule('bankSupport');
      this.$store.unregisterModule('explosive');
      this.$store.unregisterModule('activityButton');
      this.$store.unregisterModule('newsManager');
      this.$store.unregisterModule('advertisManager');
      this.$store.unregisterModule('clientVersion');
      this.$store.unregisterModule('proposal');
      this.$store.unregisterModule('advertis');
      this.$store.unregisterModule('slider');
      this.$store.unregisterModule('peroid');
      this.$store.unregisterModule('notice');
      this.$store.unregisterModule('comment');
      this.$store.unregisterModule('productUrl');
      this.$store.unregisterModule('message');
      this.$store.unregisterModule('relation');
      this.$store.unregisterModule('smsRuleTemplate');
      this.$store.unregisterModule('problemInfo');
      this.$store.unregisterModule('questionDispose');
  }
};
</script>
<style lang="scss">
.adverAdd {
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 5px 0;
  button {
    margin-left: 10px;
  }
}
.bottomBtn {
  text-align: center;
}
</style>
