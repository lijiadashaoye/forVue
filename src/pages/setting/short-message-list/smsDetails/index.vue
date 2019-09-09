<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>
        <span @click="$router.back()">短信列表></span>
        {{pageName}}
      </h3>
    </div>
    <div class="formContent">
      <el-form labelWidth="100px" label-position="left">
        <span class="boldTitle">基本信息</span>
        <br />
        <br />
        <el-form-item label="标题:">{{infoObj.title}}</el-form-item>
        <el-form-item label="内容:">{{infoObj.smsContent}}</el-form-item>
        <el-form-item label="发送方式:">{{infoObj.sendType}}</el-form-item>
        <el-form-item label="发送状态:">{{infoObj.sendStatus}}</el-form-item>
        <template v-if="infoObj.linkUrl || infoObj.linkName">
          <span class="boldTitle">消息类型</span>
          <br />
          <br />
          <el-form-item label="外部链接:" v-if="infoObj.linkUrl">{{infoObj.linkUrl}}</el-form-item>
          <el-form-item label="产品名称:" v-else>{{infoObj.linkName}}</el-form-item>
        </template>
        <span class="boldTitle">时间信息</span>
        <br />
        <br />
        <el-form-item label="创建时间:">{{infoObj.gmtCreated}}</el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "smsDetail",
  created() {
    //   获取二级title
    this.pageName = this.$route.name.trim();
    //   请求短信详情数据
    this.getSmsDetail(this.$route.query.id).then(data => {
      if (data.sendType == "SYSTEM_USER") {
        data.sendType = "系统用户";
      } else if (data.sendType == "IMPORT_PHONE") {
        data.sendType = "导入手机号";
      } else {
        data.sendType = "文本";
      }
      if (data.sendStatus == "WAIT_SEND") {
        data.sendStatus = "待发送";
      } else if (ata.sendStatus == "SEND_SUCCESS") {
        data.sendStatus = "发送成功";
      } else if (data.sendStatus == "SENDFAIL") {
        data.sendStatus = "发送失败";
      } else {
        data.sendStatus = "发送中";
      }
      this.infoObj = data;
    });
  },
  data() {
    return {
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