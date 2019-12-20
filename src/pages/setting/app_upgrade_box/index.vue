<template>
  <div class="componentWaper" style="background:white;">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">IOS系统</el-menu-item>
      <el-menu-item index="2">Android系统</el-menu-item>
    </el-menu>
    <el-form
      class="form-box"
      v-if="infoStatus"
      label-width="100px"
      label-suffix=":"
      style="padding:30px 30px 0;margin:0px auto;"
      label-position="left"
      :rules="rules"
    >
      <el-form-item label="展示位置编号">{{detailInfo.positionNo}}</el-form-item>
      <el-form-item label="展示位置名称">{{detailInfo.upgradeTitle}}</el-form-item>
      <el-form-item label="升级版本号">{{detailInfo.upgradeVerison}}</el-form-item>
      <el-form-item label="强制升级标志">{{detailInfo.forceFlag==0?'是':'否'}}</el-form-item>
    </el-form>
    <el-form
      v-else
      class="form-box"
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      label-suffix=":"
      labelWidth="120px"
      label-position="right"
      style="margin:0px auto;"
    >
      <el-form-item label="位置编号" prop="positionNo">
        <el-input maxlength="30" v-model="ruleForm.positionNo" placeholder="请输入30个字符以内的编号"></el-input>
      </el-form-item>
      <el-form-item label="升级版本号" prop="upgradeVerison">
        <el-input maxlength="30" v-model="ruleForm.upgradeVerison" placeholder="请输入30个字符以内的编号"></el-input>
      </el-form-item>
      <el-form-item label="升级弹框标题" prop="upgradeTitle">
        <el-input maxlength="30" v-model="ruleForm.upgradeTitle" placeholder="请输入30个字符以内的标题"></el-input>
      </el-form-item>
      <el-form-item label="弹窗文案" prop="copywriter">
        <el-input v-model="ruleForm.copywriter" type="textarea" :rows="3" placeholder="请输入弹框信息"></el-input>
      </el-form-item>
      <el-form-item label="是否强制升级" prop="forceFlag">
        <el-radio-group v-model="ruleForm.forceFlag">
          <el-radio label="0">是</el-radio>
          <el-radio label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="ruleForm.remark" type="textarea" :rows="3" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button
      style="margin:0px auto;display:block;"
      size="mini"
      type="primary"
      @click="saveFn('ruleForm')"
    >{{infoStatus?'修改':'保存'}}</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "AppUpgradeBox",
  data() {
    return {
      infoStatus: false, //默认没有请求到数据
      detailInfo: {}, //详情信息
      activeIndex: "1", //默认选中ios
      env: null,
      pageName: "",
      ruleForm: {
        remark: "", //备注
        forceFlag: "0", //是否强制升级
        copywriter: "", //弹窗方案
        upgradeTitle: "", //升级弹框标题
        upgradeVerison: "", //升级版本号
        positionNo: "", //位置编号
        upSysType: ""
      },
      rules: {
        upgradeVerison: [{ required: true, message: "版本号不能为空" }],
        upgradeTitle: [{ required: true, message: "标题不能为空" }],
        forceFlag: [{ required: true, message: "是否升级" }],
        positionNo: [{ required: true, message: "位置编号不能为空" }]
      }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = this.$route.name;
    // 获取最新的升级弹框信息
    this.getDetailInfo();
  },
  methods: {
    ...mapActions({
      upgradeBoxDetail: "appConfig/upgradeBoxDetail",
      upgradeBoxAdd: "appConfig/upgradeBoxAdd"
    }),
    // 保存数据
    saveFn(ruleForm) {
      if (this.infoStatus) {
        this.infoStatus = !this.infoStatus;
        for (let key in this.detailInfo) {
          if (this.ruleForm.hasOwnProperty(key)) {
            this.ruleForm[key] = this.detailInfo[key];
          }
        }
        return;
      }
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.ruleForm["upSysType"] = this.activeIndex;
          this.upgradeBoxAdd(this.ruleForm).then(() => {
            this.$message.success("添加成功");
            this.getDetailInfo();
          });
        }
      });
    },
    handleSelect(key) {
      if (key == this.activeIndex) return;
      this.infoStatus = false;
      this.activeIndex = key;
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
      this.getDetailInfo();
    },
    // 信息详情
    getDetailInfo() {
      this.upgradeBoxDetail(this.activeIndex).then(res => {
        this.detailInfo = res.data;
        this.infoStatus = true;
      });
    }
  }
};
</script>
<style scoped lang="scss">
.form-box {
  padding: 20px;
  margin-top: 40px;
  margin-left: 40px;
  .el-input {
    width: 400px;
  }
  .el-textarea {
    width: 400px;
  }
}
</style>