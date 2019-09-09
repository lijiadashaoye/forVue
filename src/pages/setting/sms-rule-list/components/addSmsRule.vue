<template>
  <div>
    <el-dialog
      :close-on-click-modal="true"
      :title="title"
      :visible.sync="centerType"
      width="50%"
      @close="cancel"
      center
    >
      <el-card class="box-card">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
          class="demo-ruleForm"
          width="300px"
        >
          <!-- 详情显示编辑按钮 -->
          <el-button
            v-if="dialogType=='detail' && $store.state.smsRuleTemplate.ruleList.data.quanxian.indexOf('sms_rule_upd')>-1"
            @click="infoChange"
            style="float:right;position:relative;z-index:2"
            type="primary"
            size="mini"
          >修改</el-button>
          <!-- 添加子关联和详情需要显示 -->
          <template v-if="dialogType=='detail'">
            <el-form-item label="规则编码:" prop="code">{{ruleDetailInfo.code}}</el-form-item>
            <el-form-item label="类型:" prop="type">{{ruleDetailInfo.type=="HF"?"高频":"非高频"}}</el-form-item>
            <el-form-item label="限制周期:" prop="cycle">{{ruleDetailInfo.cycle}}</el-form-item>
            <el-form-item label="限制次数:" prop="limit">{{ruleDetailInfo.limit}}</el-form-item>
            <el-form-item
              label="备注:"
              prop="memo"
              v-if="ruleDetailInfo.memo"
            >{{ruleDetailInfo.memo}}</el-form-item>
          </template>

          <!-- 详情页面不显示表单操作 -->
          <template v-if="dialogType!='detail'">
            <el-form-item label="规则编码:" prop="code">
              <el-input placeholder="请输入规则编码" v-model="ruleForm.code" type="text" clearable></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-select filterable v-model="ruleForm.type" placeholder="请选择">
                <el-option
                  v-for="(item,index) in typeArr"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="限制周期:" prop="cycle">
              <el-input placeholder="请输入周期秒数" v-model="ruleForm.cycle" type="text" clearable></el-input>
            </el-form-item>
            <el-form-item label="限制次数:" prop="limit">
              <el-input placeholder="请输入限制次数" v-model="ruleForm.limit" type="number" clearable></el-input>
            </el-form-item>
            <el-form-item label="备注:" prop="memo">
              <el-input
                placeholder="请输入备注"
                v-model="ruleForm.memo"
                type="textarea"
                rowspan="2"
                clearable
              ></el-input>
            </el-form-item>
          </template>
        </el-form>
        <div v-if="dialogType!='detail'" class="saveButton">
          <el-button type="primary" @click="save('ruleForm')">保存</el-button>
          <el-button @click="cancel()">取消</el-button>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState} from "vuex";
import { intNum } from "@/sets/regex.js";
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
          this.title = "权限详情";
          // 详情修改需要清空验证
          this.$nextTick(() => {
            this.$refs["ruleForm"].clearValidate();
          });
        } else {
          // 新增需要清空表单和验证
          this.$nextTick(() => {
            this.$refs["ruleForm"].resetFields();
          });
          this.title = "新增权限";
        }
      }
    }
  },
  computed: {
    ...mapState({
      ruleDetailInfo: ({ smsRuleTemplate }) => smsRuleTemplate.ruleDetailInfo //单条数据
    })
  },
  data() {
    const validateIntNum = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("内容不能为空"));
      } else if (!intNum(value)) {
        callback("请输入正整数");
      } else {
        callback();
      }
    };
    return {
      centerType: this.centerDialogVisible, //dialog开关状态
      title: "新增权限",
      typeArr: [
        {
          name: "高频",
          value: "HF"
        },
        {
          name: "非高频",
          value: "LF"
        }
      ], //关联类型
      ruleForm: {
        code: "", //规则编码
        cycle: 1, //限制周期
        type: "", //类型
        limit: 1, //限制次数
        memo: "" //备注
      }, //表单数据
      rules: {
        code: [{ required: true, message: "编码不能为空" }],
        type: [{ required: true, message: "类型不能为空" }],
        limit: [{ required: true, validator: validateIntNum }],
        cycle: [{ required: true, validator: validateIntNum }]
      }
    };
  },
  methods: {
    ...mapActions({
      addSmsRule: "smsRuleTemplate/addSmsRule",
      modifySmsRule: "smsRuleTemplate/modifySmsRule"
    }),
    cancel() {
      this.$emit("returnBack", false);
    },
    // 数据修改
    infoChange() {
      this.title = "权限修改";
      for (let key in this.ruleForm) {
        this.ruleForm[key] = this.ruleDetailInfo[key];
      }
      this.$emit("edit");
    },
    // 保存数据
    save(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          // 判断表单类型
          let formInfo = Object.assign({}, this.ruleForm);
          if (this.dialogType == "edit") {
            formInfo.id = this.ruleDetailInfo.id;
            this.modifySmsRule(formInfo).then(() => {
              this.cancel();
              this.$message.success("修改成功");
              this.$emit("again");
            });
          } else {
            // 新增数据
            this.addSmsRule(formInfo).then(() => {
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