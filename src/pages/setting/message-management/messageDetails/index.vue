<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>
        <span @click="$router.back()">消息管理></span>
        {{pageName}}
      </h3>
    </div>
    <el-button
      v-if="infoType"
      @click="editChange"
      type="primary"
      style="width:70px;position:fixed;top:130px;right:70px;z-index:1;"
      size="mini"
    >编辑</el-button>
    <div class="formContent">
      <span class="boldTitle">基本信息</span>
      <br />
      <br />
      <el-form labelWidth="100px" label-position="left">
        <el-form-item label="标题:">{{infoObj.title}}</el-form-item>
        <el-form-item label="内容:">{{infoObj.pushContent}}</el-form-item>
        <el-form-item label="消息类型:">{{infoObj.messageType}}</el-form-item>
        <el-form-item label="推送类型:">{{infoObj.pushWay}}</el-form-item>
        <el-form-item label="产品类型:">{{infoObj.linkLocationEnum}}</el-form-item>
        <template v-if="infoObj.linkUrl || infoObj.linkName">
          <span class="boldTitle">消息类型</span>
          <br />
          <br />
          <el-form-item label="外部链接:" v-if="infoObj.linkUrl">{{infoObj.linkUrl}}</el-form-item>
          <el-form-item label="产品名称:" v-else>{{infoObj.linkName}}</el-form-item>
        </template>
        <span class="boldTitle">设定发送时间</span>
        <br />
        <br />
        <el-form-item label="发送时间:">{{infoObj.sendTime}}</el-form-item>
        <span class="boldTitle">收信联系人</span>
        <br />
        <br />
        <el-form-item label="用户选择:">{{infoObj.sendTarget}}</el-form-item>
        <template v-if="infoObj.changeLocation">
          <span class="boldTitle">消息推广地区选择</span>
          <br />
          <br />
          <el-form-item label="地区类型:">{{infoObj.changeLocation}}</el-form-item>
          <el-form-item label="省份/城市:">{{infoObj.sendLocation}}</el-form-item>
        </template>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import {
  messageType,
  pushType,
  productType,
  changeLocationType,
  sendTargetType
} from "@/constant.js";
export default {
  name: "message-details",
  data() {
    return {
      infoType: false, //判断详情信息是否已经请求到
      pageName: "", // 当前页面名字
      infoObj: {}, //请求的 数据对象
      inputType: false, //关联产品显示类型
      timeArr: []
    };
  },
  created() {
    //   请求个人详情数据
    this.getMessageDetail(this.$route.query.id).then(data => {
      let nowData = Object.assign({}, data);
      // 用于展示编辑按钮  //后台逻辑不好处理暂时不使用修改
      // this.infoType = true;
      // 消息类型
      for (let item of messageType) {
        if (nowData.messageType == item.value) {
          nowData.messageType = item.label;
          break;
        }
      }
      // 推送类型
      for (let item of pushType) {
        if (nowData.pushWay == item.value) {
          nowData.pushWay = item.label;
          break;
        }
      }
      // 产品类型
      for (let item of productType) {
        if (nowData.linkLocationEnum == item.value) {
          nowData.linkLocationEnum = item.label;
          break;
        }
      }
      // 发送地区类型
      for (let item of changeLocationType) {
        if (nowData.changeLocation == item.value) {
          nowData.changeLocation = item.label;
          break;
        }
      }
      // 用户选择类型
      for (let item of sendTargetType) {
        if (nowData.sendTarget == item.value) {
          nowData.sendTarget = item.label;
          break;
        }
      }
      this.infoObj = nowData;
    });
  },
  mounted() {
    //   获取二级title
    this.pageName = this.$route.name.trim();
  },
  methods: {
    ...mapActions({
      getMessageDetail: "message/getMessageDetail"
    }),
    ...mapMutations({}),
    // 编辑
    editChange() {
      this.$router.push({
        path: "/setting/push/message/list/new-news",
        query: { title: "消息详情" }
      });
    }
  }
};
</script>
<style scoped lang="scss">
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