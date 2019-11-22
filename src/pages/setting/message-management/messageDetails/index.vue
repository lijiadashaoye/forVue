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
        <template v-if="infoObj.linkUrl || infoObj.linkName">
          <span class="boldTitle">消息类型</span>
          <br />
          <br />
          <el-form-item label="点击类型:">{{infoObj.productType}}</el-form-item>
          <el-form-item label="外部链接:" v-if="infoObj.linkUrl">
            <a :href="infoObj.linkUrl" target="_blank">{{infoObj.linkUrl}}</a>
          </el-form-item>
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
        <template v-if="infoObj.sendLocation">
          <span class="boldTitle">消息推广地区选择</span>
          <br />
          <br />
          <el-form-item label="地区类型:">{{infoObj.changeLocation}}</el-form-item>
          <el-form-item v-if="infoObj.sendLocation" label="省份/城市:">{{infoObj.sendLocation}}</el-form-item>
        </template>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import { sendTargetType } from "@/constant.js";
import { defaultChange } from "@/sets/changeLanguage.js";
export default {
  name: "message-details",
  data() {
    return {
      env: null,

      infoType: false, //判断详情信息是否已经请求到
      pageName: "", // 当前页面名字
      infoObj: {}, //请求的 数据对象
      inputType: false, //关联产品显示类型
      timeArr: [],
      productArr: [] //产品类型
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";

    // 获取产品类型列表
    this.getProductTypeList().then(data => {
      this.productArr = data.list;
      this.getDetail();
    });
  },
  mounted() {
    //   获取二级title
    this.pageName = this.$route.name.trim();
  },
  methods: {
    ...mapActions({
      getProductTypeList: "message/getProductTypeList",
      getMessageDetail: "message/getMessageDetail"
    }),
    // 获取详情
    getDetail() {
      //   请求个人详情数据
      this.getMessageDetail(this.$route.query.id).then(data => {
        let nowData = Object.assign({}, data);
        // 用于展示编辑按钮  //后台逻辑不好处理暂时不使用修改
        // this.infoType = true;
        // 消息类型
        nowData.messageType = defaultChange(
          nowData.messageType,
          true,
          "messageType"
        );
        // 推送类型
        nowData.pushWay = defaultChange(nowData.pushWay, true, "pushType");
        // 发送地区类型
        nowData.changeLocation = defaultChange(
          nowData.changeLocation,
          true,
          "changeLocationType"
        );
        // 用户选择类型
        nowData.sendTarget = defaultChange(
          nowData.sendTarget,
          true,
          "sendTargetType"
        );
        //产品类型
        for (let item of this.productArr) {
          if (nowData.productType == item.linkModel) {
            nowData.productType = item.linkName;
          }
        }
        this.infoObj = nowData;
      });
    },

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

  // 返回按钮
  .goBack {
    background: #409eff;
    width: 60px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    float: right;
    margin-right: 20px;
    color: white;
    position: relative;
    z-index: 4;
    &:hover {
      cursor: pointer;
    }
  }
  // 加黑标题
  .boldTitle {
    font-weight: bold;
    display: block;
    position: relative;
    left: -20px;
  }
}
</style>