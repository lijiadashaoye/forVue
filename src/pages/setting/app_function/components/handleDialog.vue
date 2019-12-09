<template>
  <el-dialog
    :close-on-click-modal="true"
    :title="title"
    :visible.sync="centerDialogVisible"
    width="500px"
    @close="cancel"
    center
  >
    <el-form :model="ruleForm" label-suffix=":" :rules="rules" ref="ruleForm" label-width="120px">
      <el-form-item label="展示位置编号" style="margin-bottom:5px;">
        <el-input v-model="searchForm.positionNo" placeholder="请输入位置编号"></el-input>
      </el-form-item>
    </el-form>
    <div class="saveButton">
      <el-button type="primary" @click="save('ruleForm')">保存</el-button>
      <el-button @click="cancel()">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { notifyType } from "@/constant.js";
import { defaultChange } from "@/sets/changeLanguage.js";
import { phoneRegx, emailRegx } from "@/sets/regex.js";
import { bannerTypeList, terminalType, sysTypeList } from "@/constant.js";
export default {
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    },
    buttonType:{
      type:String,
      default:''
    }
  },
  created() {
    // 广告类型数据
    this.bannerTypeList = Object.assign([], bannerTypeList);
    // 广告终端列表
    this.terminalType = Object.assign([], terminalType);
    this.bannerTypeList.shift();
    this.terminalType.shift();
    // 系统类型
    this.sysTypeList = sysTypeList;
  },
  // model双向绑定
  model: {
    prop: "centerDialogVisible",
    event: "returnBack"
  },
  data() {
    return {
      centerType: this.centerDialogVisible,
      title: "新增菜单button",
      ruleForm: {
        menuNo:'', //菜单编号
        buttonName: "",//按钮类型
        buttonType: this.buttonType,  //按钮类型
        selectImageUrl: "", //选中图片地址
        unSelectImageUrl: "", //未选时的图片地址
        selectImageDescribe: "", //选中的图片描述
        unSelectImageDescribe: "", //未选中时的图片描述
        sysType: "", //终端类型
        menuType: 0, //菜单类型
        terminalType: "" //终端类型
      }, //表单数据
      rules: {
        positionTitle: [{ required: true, message: "位置描述不能为空" }],
        positionNo: [{ required: true, message: "位置编号不能为空" }],
        terminalType: [{ required: true, message: "终端类型不能为空" }],
        bannerType: [{ required: true, message: "广告类型不能为空" }],
        status: [{ required: true }],
        sysType: [{ required: true, message: "系统类型不能为空" }]
      }
    };
  },
  methods: {
    ...mapActions({
      positionMapAdd: "appConfig/positionMapAdd",
      positionMapUpd: "appConfig/positionMapUpd"
    }),
    cancel() {
      this.$emit("returnBack", false);
    },
    // 保存数据
    save(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
        }
      });
    }
  }
};
</script>
<style scoped>
.saveButton {
  display: flex;
  justify-content: center;
}
.el-select {
  width: 100%;
}
</style>