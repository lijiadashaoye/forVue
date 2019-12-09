<template>
  <div class="componentWaper">
    <div id="forHeader">
      <div class="headerName">
        <p class="isPageName">
          <span :class="env?'lineSpan1':'lineSpan'">|</span>
          位置：{{$store.state.for_layout.titles}}{{pageName}}
        </p>
        <el-button size="mini" type="warning" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <div class="formContent">
      <el-form labelWidth="100px" label-position="left">
        <span class="boldTitle">发送信息</span>
        <el-form-item label="发送方式:">{{infoObj.sendType}}</el-form-item>
        <el-form-item v-if="infoObj.sendTarget" label="发送目标:">{{infoObj.sendTarget}}</el-form-item>
        <el-form-item v-if="infoObj.sendPhone" label="手机号:">{{infoObj.sendPhone}}</el-form-item>
        <el-form-item label="发送状态:">{{infoObj.sendStatus}}</el-form-item>
        <el-form-item v-if="infoObj.sendTarget=='部分用户'" label="发送地区:">{{infoObj.sendLocation}}</el-form-item>
        <template v-if="infoObj.linkUrl || infoObj.linkName">
          <span class="boldTitle">消息类型</span>
          <el-form-item label="外部链接:" v-if="infoObj.linkUrl">{{infoObj.linkUrl}}</el-form-item>
          <el-form-item label="产品名称:" v-else>{{infoObj.linkName}}</el-form-item>
        </template>
        <template v-if="infoObj.sendTime">
          <span class="boldTitle">时间信息</span>
          <el-form-item v-if="infoObj.gmtCreated" label="创建时间:">{{infoObj.gmtCreated}}</el-form-item>
          <el-form-item label="发送时间:">{{infoObj.sendTime}}</el-form-item>
        </template>
        <span class="boldTitle">发送内容</span>
        <el-form-item label="标题:">{{infoObj.title}}</el-form-item>
        <el-form-item label="模版code:">{{infoObj.templateCode}}</el-form-item>
        <el-form-item label="内容:">{{infoObj.smsContent}}</el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { defaultChange } from "@/sets/changeLanguage.js";
export default {
  name: "smsDetail",
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    //   获取二级title
    this.pageName = this.$route.name.trim();
    //   请求短信详情数据
    this.getSmsDetail(this.$route.query.id).then(data => {
      data.sendType = defaultChange(data.sendType, true, "sendType");
      let sendStatus = defaultChange(data.sendStatus, true, "sendTargetArr");
      data.sendStatus = sendStatus ? sendStatus : "暂无";
      data.sendTarget = defaultChange(data.sendTarget, true, "sendTargetType");
      this.infoObj = data;
    });
  },
  data() {
    return {
      env: "",
      pageName: "", //二级title
      infoObj: {} //请求的 数据对象
    };
  },
  methods: {
    ...mapActions({
      getSmsDetail: "message/getSmsDetail"
    })
  }
};
</script>
<style lang="scss" scoped>
.componentWaper {
  background: white;
}
.formContent {
  padding: 80px;
  overflow: auto;

  // 加黑标题
  .boldTitle {
    font-weight: bold;
    display: block;
    position: relative;
    left: -20px;
  }
}
</style>