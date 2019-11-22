<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="180px"
    label-position="left"
  >
    <el-form-item label="开户银行:" prop="bankCardId">
      <el-select
        filterable
        v-model="ruleForm.bankCardId"
        placeholder="请选择银行"
        :disabled="detailFlag"
      >
        <el-option v-for="(item,ind) in bankOption" :key="ind" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="直销银行:" prop="directId">
      <el-select filterable v-model="ruleForm.directId" placeholder="选择直销银行" :disabled="detailFlag">
        <el-option
          v-for="(item,ind) in directOption"
          :key="ind"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="日累计限额:" prop="dailyCumulativeLimit">
      <el-input
        v-model.number="ruleForm.dailyCumulativeLimit"
        min="0"
        placeholder="输入每日额度"
        :disabled="detailFlag"
        maxlength="10"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item label="单笔额度:" prop="eachQuota">
      <el-input
        v-model="ruleForm.eachQuota"
        min="0"
        placeholder="输入单笔额度"
        :disabled="detailFlag"
        maxlength="10"
        show-word-limit
      ></el-input>
    </el-form-item>
    <el-form-item label="绑卡时是否输入取款密码:" prop="bindingCardIsPassword">
      <el-radio-group v-model="ruleForm.bindingCardIsPassword" :disabled="detailFlag">
        <el-radio :label="'YES'">YES</el-radio>
        <el-radio :label="'NO'">NO</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="充值时是否输入取款密码:" prop="transactionIsPassword">
      <el-radio-group v-model="ruleForm.transactionIsPassword" :disabled="detailFlag">
        <el-radio :label="'YES'">YES</el-radio>
        <el-radio :label="'NO'">NO</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否本行卡:" prop="nowBankCard">
      <el-radio-group v-model="ruleForm.nowBankCard" :disabled="detailFlag">
        <el-radio :label="'YES'">YES</el-radio>
        <el-radio :label="'NO'">NO</el-radio>
      </el-radio-group>
    </el-form-item>

    <div class="bottomBtn">
      <el-button v-if="!detailFlag" type="primary" @click="save('ruleForm')">保存</el-button>
      <el-button v-if="!detailFlag" @click="cancel('ruleForm')">取消</el-button>
      <el-button v-else @click="close('ruleForm')">关闭</el-button>
    </div>
  </el-form>
</template>

<script>
// import { mapActions } from 'vuex';
import { searchBank } from "../../api/setting_use";
export default {
  name: "addBankSupport",
  props: ["opts", "detailFlag", "list", "dialogVisible"],
  data() {
    return {
      states: [],
      bankOption: [], //开户行列表
      directOption: [], //直销银行
      bankCardName: "", //开户行名称 !!!
      directName: "", //直销银行名称 !!!
      ruleForm: {
        directId: "", //直销银行id ===
        bankCardId: "", //开户银行id ===
        dailyCumulativeLimit: "", //日限额 !!!
        eachQuota: "", //单笔限额 !!!
        bindingCardIsPassword: "YES", //绑卡是否要密码 !!!
        transactionIsPassword: "YES", //充值时是否要密码 !!!
        nowBankCard: "YES" //是否是本行卡 !!!,
      },
      rules: {
        bankCardId: [
          { required: true, message: "请选择开户行", trigger: "blur" }
        ],
        directId: [
          { required: true, message: "请选择直销银行", trigger: "blur" }
        ],
        dailyCumulativeLimit: [
          { required: true, message: "请填写日限额", trigger: "blur" },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: "只能输入大于0的正整数",
            trigger: "blur"
          }
        ],
        eachQuota: [
          { required: true, message: "请填写单笔限额", trigger: "blur" },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: "只能输入大于0的正整数",
            trigger: "blur"
          }
        ],
        bindingCardIsPassword: [
          { required: true, message: "请选择", trigger: "blur" }
        ],
        transactionIsPassword: [
          { required: true, message: "请选择", trigger: "blur" }
        ],
        nowBankCard: [{ required: true, message: "请选择", trigger: "blur" }]
      }
    };
  },
  mounted() {
    //开户行
    searchBank({
      bankFlag: 0
    }).then(res => {
      if (res && res.success) {
        this.bankOption = res.data;
      }
    });
    //直销银行
    searchBank({
      bankFlag: 1
    }).then(res => {
      if (res && res.success) {
        this.directOption = res.data;
      }
    });
    //编辑  详情传入opts数据  初始化
    if (this.opts) {
      this.bankCardName = this.opts.bankCardName;
      this.ruleForm.bankCardId = this.opts.bankCardId;
      this.ruleForm.directId = this.opts.directId;
      this.ruleForm.dailyCumulativeLimit = this.opts.dailyCumulativeLimit;
      this.ruleForm.eachQuota = this.opts.eachQuota;
      this.ruleForm.bindingCardIsPassword = this.opts.bindingCardIsPassword;
      this.ruleForm.transactionIsPassword = this.opts.transactionIsPassword;
      this.ruleForm.nowBankCard = this.opts.nowBankCard;
    }
  },
  methods: {
    //点击保存
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //取bankCardname
          this.bankOption &&
            this.bankOption.forEach(v => {
              if (v.id === this.ruleForm.bankCardId) {
                this.bankCardName = v.name;
              }
            });
          //取directName
          this.directOption.forEach(v => {
            if (this.ruleForm.directId === v.id) {
              this.directName = v.name;
            }
          });
          //整理params
          let obj = {
            id: this.opts ? this.opts.id : null,
            bankCardId: this.ruleForm.bankCardId,
            bankCardName: this.bankCardName,
            directId: this.ruleForm.directId,
            directName: this.directName,
            dailyCumulativeLimit: this.ruleForm.dailyCumulativeLimit,
            eachQuota: this.ruleForm.eachQuota,
            bindingCardIsPassword: this.ruleForm.bindingCardIsPassword,
            transactionIsPassword: this.ruleForm.transactionIsPassword,
            nowBankCard: this.ruleForm.nowBankCard
          };
          this.$emit("send", obj);
        } else {
          return false;
        }
      });
    },

    //点击取消
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.$emit("cancel");
    },
    //点击关闭
    close(formName) {
      this.$refs[formName].resetFields();
      this.$emit("close");
    }
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        this.bankCardName = this.opts.bankCardName;
        this.ruleForm.bankCardId = this.opts.bankCardId;
        this.ruleForm.directId = this.opts.directId;
        this.ruleForm.dailyCumulativeLimit = this.opts.dailyCumulativeLimit;
        this.ruleForm.eachQuota = this.opts.eachQuota;
        this.ruleForm.bindingCardIsPassword = this.opts.bindingCardIsPassword;
        this.ruleForm.transactionIsPassword = this.opts.transactionIsPassword;
        this.ruleForm.nowBankCard = this.opts.nowBankCard;
      }
    }
  }
};
</script>

<style scoped="true" lang="scss">
.el-input {
  width: 220px !important;
}
</style>
