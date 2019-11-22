<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="140px"
    label-position="left"
  >
    <el-form-item label="银行名称:" prop="bankId">
      <el-select
        filterable
        v-model="ruleForm.bankId"
        style="width:100%;"
        placeholder="请选择银行"
        :disabled="detailFlag"
      >
        <el-option v-for="(item,ind) in bankOption" :key="ind" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="卡长度:" prop="cardLength">
      <el-input
        v-model.number="ruleForm.cardLength"
        placeholder="卡长度(最多8位纯数字)"
        :disabled="detailFlag"
        maxlength="8"
        show-word-limit
      ></el-input>
    </el-form-item>
    <el-form-item label="卡前缀（卡bin）:" prop="cardPrefix">
      <el-input
        v-model.number="ruleForm.cardPrefix"
        placeholder="卡bin(1最多10位纯数字）"
        :disabled="detailFlag"
        maxlength="10"
        show-word-limit
      ></el-input>
    </el-form-item>
    <el-form-item label="清算行行号:" prop="clearingBankNumber">
      <el-input
        v-model.number="ruleForm.clearingBankNumber"
        placeholder="清算行行号（12位纯数字）"
        :disabled="detailFlag"
        maxlength="12"
        show-word-limit
      ></el-input>
    </el-form-item>
    <el-form-item label="卡类型:" prop="cardType">
      <el-select style="width:100%;" filterable v-model="ruleForm.cardType" placeholder="请选择" :disabled="detailFlag">
        <el-option
          v-for="(item,ind) in cardTypeData"
          :key="ind"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <div class="bottomBtn">
      <el-button size="mini" v-if="!detailFlag" type="primary" @click="save('ruleForm')">保存</el-button>
      <el-button size="mini" type="info" v-if="!detailFlag" @click="cancel('ruleForm')">取消</el-button>
      <el-button size="mini" v-else @click="close('ruleForm')">关闭</el-button>
    </div>
  </el-form>

  <!-- <div class="card-item">
            <span class="item-text">银行LOGO:</span>
            <div class="item-img">
                <el-upload
                    class="avatar-uploader"
                    action="customize"
                    :show-file-list="false"
                    :http-request="uploadLogo"
                    >
                    <img v-if="logoUrl" :src="logoUrl" class="avatar">
                    <el-button v-else>选择图片</el-button>
                </el-upload>
            </div>
        </div>

        <div class="card-item">
            <span class="item-text">银行背景图:</span>
            <div class="item-img">
                <el-upload
                    class="avatar-uploader"
                    action="customize"
                    :show-file-list="false"
                    :http-request="uploadBgFile"
                    >
                    <img v-if="bgUrl" :src="bgUrl" class="avatar">
                    <el-button v-else>选择图片</el-button>
                </el-upload>
            </div>
  </div>-->
</template>

<script>
import { searchBank } from "../../api/setting_use.js";
export default {
  name: "bankCardAddUpd",
  props: ["opts", "detailFlag", "dialogVisible"],
  data() {
    return {
      ruleForm: {
        bankId: "", //银行id
        cardPrefix: "", //卡bin
        cardLength: "", //卡长度
        clearingBankNumber: "", //清算行行号
        cardType: "" //卡类型
      },
      bankName: "", //银行名称
      rules: {
        bankId: [{ required: true, message: "请选择银行", trigger: "blur" }],
        cardPrefix: [
          { required: true, message: "请输入卡bin", trigger: "blur" },
          {
            pattern: /^[+]{0,1}(\d+)$/,
            message: "只能输入正整数",
            trigger: "blur"
          }
        ],
        cardLength: [
          { required: true, message: "请输入卡长度", trigger: "blur" },
          {
            pattern: /^[+]{0,1}(\d+)$/,
            message: "只能输入正整数",
            trigger: "blur"
          }
        ],
        clearingBankNumber: [
          { required: true, message: "请输入清算行行号", trigger: "blur" },
          {
            pattern: /^[+]{0,1}(\d+)$/,
            message: "只能输入正整数",
            trigger: "blur"
          }
        ],
        cardType: [{ required: true, message: "请选择卡类型", trigger: "blur" }]
      },
      cardTypeData: [
        {
          value: "DEBIT",
          label: "借记卡"
        },
        {
          value: "CREDIT",
          label: "贷记卡"
        }
      ],
      bankOption: [], //银行选项
      states: []
    };
  },
  mounted() {
    //获取银行列表选项
    searchBank({
      bankFlag: 0
    }).then(res => {
      if (res && res.success) {
        this.bankOption = res.data;
      }
    });
    //点击详情  编辑传入的对象
    if (this.opts) {
      this.ruleForm.bankId = this.opts.bankId;
      this.ruleForm.cardLength = this.opts.cardLength;
      this.ruleForm.cardPrefix = this.opts.cardPrefix;
      this.ruleForm.clearingBankNumber = this.opts.clearingBankNumber;
      this.ruleForm.cardType =
        this.opts.cardType == "贷记卡" ? "CREDIT" : "DEBIT";
    }
  },
  methods: {
    //点击取消
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.$emit("cancel");
    },
    //点击保存
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.bankOption &&
            this.bankOption.forEach(v => {
              if (this.ruleForm.bankId == v.id) {
                this.bankName = v.name;
              }
            });
          let obj = {
            id: this.opts ? this.opts.id : "",
            bankName: this.bankName,
            bankId: this.ruleForm.bankId,
            cardPrefix: this.ruleForm.cardPrefix,
            cardLength: this.ruleForm.cardLength,
            clearingBankNumber: this.ruleForm.clearingBankNumber,
            cardType: this.ruleForm.cardType
          };
          //向父组件传递
          this.$emit("send", obj);
        } else {
          return false;
        }
      });
    },
    //点击关闭
    close(formName) {
      this.$refs[formName].resetFields();
      this.$emit("close");
    }
  },
  watch: {
    //监听this.opts的变化  给初始化赋值
    dialogVisible() {
      if (this.dialogVisible) {
        this.ruleForm.bankId = this.opts.bankId;
        this.ruleForm.cardLength = this.opts.cardLength;
        this.ruleForm.cardPrefix = this.opts.cardPrefix;
        this.ruleForm.clearingBankNumber = this.opts.clearingBankNumber;
        this.ruleForm.cardType =
          this.opts.cardType == "贷记卡" ? "CREDIT" : "DEBIT";
      }
    }
  }
};
</script>
