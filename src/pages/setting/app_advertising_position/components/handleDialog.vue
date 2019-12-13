<template>
  <el-dialog
    :close-on-click-modal="true"
    :title="title"
    :visible.sync="centerType"
    width="500px"
    @close="cancel"
    center
  >
    <el-form :model="ruleForm" label-suffix=":" :rules="rules" ref="ruleForm" label-width="120px">
      <!--  详情显示编辑按钮  -->
      <el-button
        v-if="dialogType=='detail'"
        @click="infoChange"
        style="float:right;position:relative;z-index:2"
        type="primary"
        size="mini"
      >修改</el-button>
      <!-- &&  this.$parent.userInfoArr.indexOf('position_upd')>-1 -->
      <!--  添加子关联和详情需要显示  -->
      <template v-if="dialogType=='detail'">
        <el-form-item label="位置编号" >{{indexInfo.positionNo}}</el-form-item>
        <el-form-item label="位置描述" >{{indexInfo.positionTitle}}</el-form-item>
        <el-form-item label="广告类型" >{{indexInfo.bannerType}}</el-form-item>
        <el-form-item label="系统类型" >{{indexInfo.sysType}}</el-form-item>
        <el-form-item label="终端类型" >{{indexInfo.terminalType}}</el-form-item>
        <el-form-item label="区域类型" >{{defaultChange(indexInfo.regionalType,true,'regionalTypeList')}}</el-form-item>
        <el-form-item label="启用状态" >{{indexInfo.status}}</el-form-item>
      </template>
      <!--  详情页面不显示表单操作  -->
      <template v-if="dialogType!='detail'">
         <el-form-item
            v-if="dialogType=='edit'"
            label="位置编号"
            prop="positionNo"
          >{{indexInfo.positionNo}}</el-form-item>
          <el-form-item v-else label="位置编号" prop="positionNo">
            <el-input placeholder="请输入位置名编号" v-model="ruleForm.positionNo" type="text" clearable></el-input>
          </el-form-item>
        <template v-if="dialogType=='edit'">
          <template v-if="indexInfo.isCoupon=='01'">
            <el-form-item label="广告类型" prop="bannerType">{{indexInfo.bannerType}}</el-form-item>
            <el-form-item label="系统类型" prop="sysType">{{indexInfo.sysType}}</el-form-item>
            <el-form-item label="终端类型" prop="terminalType">{{indexInfo.terminalType}}</el-form-item>
            <el-form-item label="区域类型" prop="regionalType">{{defaultChange(indexInfo.regionalType,true,'regionalTypeList')}}</el-form-item>
            <el-form-item label="启用状态" prop="status">{{indexInfo.status}}</el-form-item>
            <el-form-item label="展示位置名称" prop="positionTitle">
              <el-input
                placeholder="请输入位置名称"
                v-model="ruleForm.positionTitle"
                type="text"
                clearable
              ></el-input>
            </el-form-item>
          </template>
        </template>

        <template v-if="dialogType=='add' || indexInfo.isCoupon=='02'">
          <el-form-item label="展示位置名称" prop="positionTitle">
            <el-input placeholder="请输入位置名称" v-model="ruleForm.positionTitle" type="text" clearable></el-input>
          </el-form-item>

          <el-form-item label="显示终端" prop="terminalType">
            <el-select v-model="ruleForm.terminalType" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="(item,index) in terminalType"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区域类型" prop="regionalType">
            <el-select v-model="ruleForm.regionalType" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="(item,index) in regionalTypeList"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="位置类型" prop="bannerType">
            <el-select v-model="ruleForm.bannerType" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="(item,index) in bannerTypeList"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="显示系统类型" prop="sysType">
            <el-select v-model="ruleForm.sysType" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="(item,index) in sysTypeList"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广告位状态" prop="status">
            <el-radio-group v-model="ruleForm.status">
              <el-radio label="0">启用</el-radio>
              <el-radio label="1">不启用</el-radio>
            </el-radio-group>
          </el-form-item>
        </template>
      </template>
    </el-form>
    <div v-if="dialogType!='detail'" class="saveButton">
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
import { bannerTypeList, terminalType, sysTypeList,regionalTypeList } from "@/constant.js";
export default {
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogType: {
      type: String,
      default: ""
    }
  },
  created() {
    this.defaultChange = defaultChange;
    // 区域类型
    this.regionalTypeList = regionalTypeList;
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
  watch: {
    // 监听dialog变化控制数据
    centerDialogVisible(value) {
      this.centerType = value;
      if (value) {
        if (this.dialogType == "detail") {
          // 详情修改需要清空验证
          this.$nextTick(() => {
            this.$refs["ruleForm"].clearValidate();
          });
          this.title = "广告位置详情";
        } else {
          // 新增需要清空表单和验证
          this.$nextTick(() => {
            this.$refs["ruleForm"].clearValidate();
            this.$refs["ruleForm"].resetFields();
          });
          this.title = "新增广告位置";
        }
      }
    }
  },
  computed: {
    ...mapState({
      indexInfo: function({ powerTable }) {
        let indexInfo = Object.assign({}, powerTable.indexInfo);
        this.nowInfo = powerTable.indexInfo;
        indexInfo.terminalType = defaultChange(
          indexInfo.terminalType,
          true,
          "terminalType"
        );
        indexInfo.status = defaultChange(
          indexInfo.status,
          true,
          "bannerStatus"
        );
        indexInfo.bannerType = defaultChange(
          indexInfo.bannerType,
          true,
          "bannerTypeList"
        );
        indexInfo.sysType = defaultChange(
          indexInfo.sysType,
          true,
          "sysTypeList"
        );
        return indexInfo;
      } //单条数据
    })
  },
  data() {
    return {
      nowInfo: {}, //中转数据
      centerType: this.centerDialogVisible,
      title: "新增广告位置",
      ruleForm: {
        regionalType: "", //区域类型
        positionTitle: "", //位置描述
        positionNo: "", //位置编号
        terminalType: "", //终端类型
        bannerType: "", //广告类型
        status: "0", //启用状态
        sysType: "" //系统类型
      }, //表单数据
      rules: {
        positionTitle: [{ required: true, message: "位置描述不能为空" }],
        positionNo: [{ required: true, message: "位置编号不能为空" }],
        terminalType: [{ required: true, message: "终端类型不能为空" }],
        regionalType: [{ required: true, message: "区域类型不能为空" }],
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
    // 数据修改
    infoChange() {
      this.title = "广告位置修改";
      for (let key in this.nowInfo) {
        if (this.ruleForm.hasOwnProperty(key)) {
          this.ruleForm[key] = this.nowInfo[key];
        }
      }
      this.$emit("edit");
    },
    // 保存数据
    save(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          if (this.dialogType == "edit") {
            let formInfo = Object.assign({}, this.ruleForm);
            formInfo["positionId"] = this.indexInfo.id;
            delete formInfo.positionNo;
            this.positionMapUpd(formInfo).then(() => {
              this.cancel();
              this.$message.success("修改成功");
              this.$emit("again");
            });
          } else {
            // 新增数据
            this.positionMapAdd(this.ruleForm).then(() => {
              this.cancel();
              this.$message.success("添加成功");
              this.$emit("again");
            });
          }
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