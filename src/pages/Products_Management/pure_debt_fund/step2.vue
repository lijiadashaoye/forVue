<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div style="overflow:auto;">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=":"
        class="isForm"
        :rules="rules"
      >
        <el-form-item label="上下架状态" class="is50" prop="shelveStatus">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.shelveStatus"
          >
            <el-option
              v-for="item in dictData.shelve_status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否面签" class="is50" prop="visaInterview">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.visaInterview"
          >
            <el-option
              v-for="item in dictData.visa_interview_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="默认购买笔数" class="is50" prop="defaultNum">
          <el-input
            clearable
            v-model="ruleForm.defaultNum"
            placeholder="请输入"
            class="isInput"
            type="number"
          ></el-input>
          <span class="isA">
            笔
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing"></i>
          </span>
        </el-form-item>

        <el-form-item label="默认购买金额" class="is50" prop="defaultAmount">
          <el-input
            type="number"
            clearable
            v-model="ruleForm.defaultAmount"
            placeholder="请输入"
            class="isInput"
          ></el-input>
          <span class="isA">
            元
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing"></i>
          </span>
        </el-form-item>

        <el-form-item size="mini" label="是否推荐" class="is50">
          <el-radio-group v-model="ruleForm.recommend" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
          <span class="isA">
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing"></i>
          </span>
        </el-form-item>

        <el-form-item size="mini" label="是否首页排行" class="is50">
          <el-radio-group v-model="ruleForm.homePage" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
          <span class="isA">
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing"></i>
          </span>
        </el-form-item>
        <el-form-item size="mini" label="是否实名" class="is50">
          <el-radio-group v-model="ruleForm.realNameAuth" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="mini" label="是否显示银行页" class="is50">
          <el-radio-group v-model="ruleForm.showBankPage" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <div style="width:100%;">
          <el-form-item label="产品H5链接" prop="h5Url">
            <el-input clearable v-model="ruleForm.h5Url" placeholder="请输入" class="isInput"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="nextButtons">
      <el-button size="mini" type="warning" @click="before">上一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button size="mini" type="primary" @click="next">下一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button size="mini" type="info" @click="back">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    // 验证数字
    var checkNum3 = (rule, value, callback) => {
      if (+value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    return {
      env: null,
      dictData: null,
      pageName: "", // 当前页面名字
      ruleForm: {
        shelveStatus: "yes", // 是否上架
        recommend: "否", // 是否推荐
        visaInterview: "no", // 是否面签
        homePage: "否", // 是否首页排行
        realNameAuth: "是", // 是否实名
        defaultNum: "0", // 默认购买数量
        defaultAmount: "0.00", // 默认购买金额
        h5Url: "", // 产品H5链接
        showBankPage: "否" // 是否显示银行页
      },
      //表单验证
      rules: {
        defaultNum: [{ validator: checkNum3, trigger: "blur" }],
        defaultAmount: [{ validator: checkNum3, trigger: "blur" }],
        shelveStatus: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        visaInterview: [
          { required: true, message: "请选择", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page") + " > 新增纯债基金第二步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    if (sessionStorage.getItem("chunzhai_step2")) {
      this.ruleForm = JSON.parse(sessionStorage.getItem("chunzhai_step2"));
    }
  },

  methods: {
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          sessionStorage.setItem(
            "chunzhai_step2",
            JSON.stringify(this.ruleForm)
          );
          this.$router.push({
            name: "pure_debt_fund_step3"
          });
        }
      });
    },
    // 取消
    back() {
      this.$router.push({
        name: "pure_debt_fund_mainPage"
      });
    },
    // 上一步
    before() {
      sessionStorage.setItem("chunzhai_step2", JSON.stringify(this.ruleForm));
      this.$router.push({
        name: "pure_debt_fund_step1"
      });
    }
  }
};
</script>