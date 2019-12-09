<template>
  <el-dialog
    :close-on-click-modal="true"
    :title="title"
    :visible.sync="centerType"
    width="500px"
    @close="cancel"
    center
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <!--  详情显示编辑按钮  -->
      <el-button
        v-if="dialogType=='detail'  &&  this.$parent.userInfoArr.indexOf('alarm_upd')>-1"
        @click="infoChange"
        style="float:right;position:relative;z-index:2"
        type="primary"
        size="mini"
      >修改</el-button>
      <!--  添加子关联和详情需要显示  -->
      <template v-if="dialogType=='detail'">
        <el-form-item label="系统编码" prop="systemCode">{{indexInfo.systemCode}}</el-form-item>
        <el-form-item label="系统名称" prop="systemName">{{indexInfo.systemName}}</el-form-item>
        <el-form-item label="系统负责人" prop="systemLeader">{{indexInfo.systemLeader}}</el-form-item>
        <el-form-item label="负责人邮箱" prop="leaderEmail">{{indexInfo.leaderEmail}}</el-form-item>
        <el-form-item label="负责人手机" prop="leaderMobile">{{indexInfo.leaderMobile}}</el-form-item>
        <el-form-item label="负责人微信" prop="leaderWechat">{{indexInfo.leaderWechat}}</el-form-item>
        <el-form-item label="负责人钉钉" prop="leaderDing">{{indexInfo.leaderDing}}</el-form-item>
        <el-form-item prop="notifyType" label="通知类型:" v-if="detailNotiy.length">
          <span
            style="padding-right:10px;"
            v-for="(item,index) of detailNotiy"
            :key="index"
          >{{item}}</span>
        </el-form-item>
      </template>

      <!--  详情页面不显示表单操作  -->
      <template v-if="dialogType!='detail'">
        <el-form-item label="系统编码:" prop="systemCode">
          <el-input placeholder="请输入编码" v-model="ruleForm.systemCode" type="text" clearable></el-input>
        </el-form-item>
        <el-form-item label="系统名称:" prop="systemName">
          <el-input placeholder="请输入系统名称" v-model="ruleForm.systemName" type="text" clearable></el-input>
        </el-form-item>
        <el-form-item label="系统负责人:" prop="systemLeader">
          <el-input placeholder="请输入系统负责人" v-model="ruleForm.systemLeader" type="text" clearable></el-input>
        </el-form-item>
        <el-form-item label="负责人邮箱:" prop="leaderEmail">
          <el-input placeholder="请输入邮箱" v-model="ruleForm.leaderEmail" type="text" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="leaderMobile">
          <el-input placeholder="请输入手机号" v-model="ruleForm.leaderMobile" type="text" clearable></el-input>
        </el-form-item>
        <el-form-item label="微信:" prop="leaderWechat">
          <el-input placeholder="请输入微信号" v-model="ruleForm.leaderWechat" type="text" clearable></el-input>
        </el-form-item>
        <el-form-item label="钉钉: " prop="leaderDing">
          <el-input placeholder="请输入钉钉号" v-model="ruleForm.leaderDing" type="text" clearable></el-input>
        </el-form-item>
        <el-form-item label="通知类型:" prop="notifyType">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <el-checkbox-group v-model="ruleForm.notifyType" @change="handleCheckedCitiesChange">
            <template v-for="(item,index) of notifyTypeArr">
              <el-checkbox v-if="item.value!=='ALL'" :label="item.value" :key="index">{{item.name}}</el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
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
    // 全选数据
    this.notifyTypeArr = notifyType;
    this.notifyTypeArr.forEach(item => {
      this.allChekeInfo.push(item.value);
    });
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
          this.title = "预警详情";
        } else {
          // 新增需要清空表单和验证
          this.$nextTick(() => {
            this.$refs["ruleForm"].clearValidate();
            this.$refs["ruleForm"].resetFields();
          });
          if (this.dialogType == "add") {
            this.checkAll = false;
            this.isIndeterminate = false;
          }

          this.title = "新增预警";
        }
      }
    }
  },
  computed: {
    ...mapState({
      indexInfo: function({ powerTable }) {
        let stringType = typeof powerTable.indexInfo.notifyType;
        if (stringType == "string") {
          powerTable.indexInfo.notifyType = powerTable.indexInfo.notifyType.split(
            ","
          );
          this.detailNotiy = powerTable.indexInfo.notifyType.map(item => {
            return (item = defaultChange(item, true, "notifyType"));
          });
          // 改变全选按钮样式
          this.handleCheckedCitiesChange(this.detailNotiy);
        }
        return powerTable.indexInfo;
      } //单条数据
    })
  },
  data() {
    // 手机号逗号分隔正则
    const validatePhone = (rule, value, callback) => {
      if (value != "") {
        if (!phoneRegx(value)) {
          callback("请输入正确格式手机号");
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    // 邮箱正则
    const validateEmail = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("邮箱不能为空"));
      } else {
        if (!emailRegx(value)) {
          callback("请输入正确邮箱");
        } else {
          callback();
        }
      }
    };
    return {
      checkAll: false, //是否全选
      isIndeterminate: true, //样式控制
      detailNotiy: [], //详情里面的通知类型数据
      notifyTypeArr: [], //通知类型
      allChekeInfo: [], //全选数据
      centerType: this.centerDialogVisible,
      title: "新增关联",
      ruleForm: {
        systemCode: "", //系统编码
        systemName: "", //系统名称
        systemLeader: "", //系统负责人
        leaderEmail: "", //负责人邮箱
        leaderMobile: "", //负责人手机
        leaderWechat: "", //负责人微信
        leaderDing: "", //负责人钉钉
        notifyType: [] //通知类型
      }, //表单数据
      rules: {
        systemCode: [{ required: true, message: "系统编码不能为空" }],
        systemName: [{ required: true, message: "系统名称不能为空" }],
        systemLeader: [{ required: true, message: "系统负责人不能为空" }],
        leaderEmail: [{ required: true, validator: validateEmail }],
        leaderMobile: [{ validator: validatePhone }],
        leaderWechat: [{}],
        leaderDing: [{}],
        notifyType: [{ required: true, message: "通知类型不能为空" }]
      }
    };
  },
  methods: {
    ...mapActions({
      addAlarm: "alarmConfig/addAlarm",
      modifyAlarm: "alarmConfig/modifyAlarm"
    }),
    // 全选按钮触发
    handleCheckAllChange(val) {
      this.ruleForm.notifyType = val ? this.allChekeInfo : [];
      this.isIndeterminate = false;
    },
    // check选项触发全选样式
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.notifyTypeArr.length - 1;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.notifyTypeArr.length - 1;
    },
    cancel() {
      this.$emit("returnBack", false);
    },
    // 数据修改
    infoChange() {
      this.title = "关联修改";
      for (let key in this.ruleForm) {
        this.ruleForm[key] = this.indexInfo[key];
      }
      this.$emit("edit");
    },
    // 保存数据
    save(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          // 判断表单类型
          let formInfo = Object.assign({}, this.ruleForm);
          if (this.checkAll) {
            formInfo.notifyType = "ALL";
          } else {
            let itemIndex = formInfo.notifyType.indexOf("ALL");
            if (itemIndex != -1) {
              formInfo.notifyType.splice(itemIndex, 1);
            }
            formInfo.notifyType = formInfo.notifyType.join(",");
          }
          if (this.dialogType == "edit") {
            formInfo["id"] = this.indexInfo.id;
            this.modifyAlarm(formInfo).then(() => {
              this.cancel();
              this.$message.success("修改成功");
              this.$emit("again");
            });
          } else {
            // 新增数据
            this.addAlarm(formInfo).then(() => {
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