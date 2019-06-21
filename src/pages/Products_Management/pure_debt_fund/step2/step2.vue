<template>
  <div class="componentWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
    </div>
    <div style="overflow:auto;">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=':'
        class="isForm"
      >

        <el-form-item
          size="mini"
          label="是否上架"
          class="is50"
        >
          <el-radio-group
            v-model="ruleForm.shelve"
            class="isInput"
          >
            <el-radio-button
              label="是"
              class="isRadio"
            ></el-radio-button>
            <el-radio-button
              label="否"
              class="isRadio"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          size="mini"
          label="是否面签"
          class="is50"
        >
          <el-radio-group
            v-model="ruleForm.visaInterview"
            class="isInput"
          >
            <el-radio-button
              label="是"
              class="isRadio"
            ></el-radio-button>
            <el-radio-button
              label="否"
              class="isRadio"
            ></el-radio-button>
          </el-radio-group>
          <span class="isA">
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing"></i>
          </span>
        </el-form-item>

        <el-form-item
          size="mini"
          label="是否推荐"
          class="is50"
        >
          <el-radio-group
            v-model="ruleForm.recommend"
            class="isInput"
          >
            <el-radio-button
              label="是"
              class="isRadio"
            ></el-radio-button>
            <el-radio-button
              label="否"
              class="isRadio"
            ></el-radio-button>
          </el-radio-group>
          <span class="isA">
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing "></i>
          </span>
        </el-form-item>

        <el-form-item
          size="mini"
          label="是否首页排行"
          class="is50"
        >
          <el-radio-group
            v-model="ruleForm.homePage"
            class="isInput"
          >
            <el-radio-button
              label="是"
              class="isRadio"
            ></el-radio-button>
            <el-radio-button
              label="否"
              class="isRadio"
            ></el-radio-button>
          </el-radio-group>
          <span class="isA">
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing "></i>
          </span>
        </el-form-item>

        <el-form-item
          label="默认购买笔数"
          class="is50"
        >
          <el-input
            clearable
            v-model="ruleForm.defaultNum"
            placeholder="请输入"
            class="isInput"
            type='number'
          ></el-input>
          <span class="isA">
            笔
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing "></i>
          </span>
        </el-form-item>

        <el-form-item
          label="默认购买金额"
          class="is50"
        >
          <el-input
          type="number"
            clearable
            v-model="ruleForm.defaultAmount"
            placeholder="请输入"
            class="isInput"
          ></el-input>
          <span class="isA">
            元
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing "></i>
          </span>
        </el-form-item>

      </el-form>
    </div>
    <div class="nextButtons">
      <el-button
        size="mini"
        type="primary"
        @click="before"
      >上一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button
        size="mini"
        type="primary"
        @click="next"
      >下一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button
        size="mini"
        type="info"
        @click="back"
      >取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      pageName: "", // 当前页面名字
      ruleForm: {
        shelve: "", // 是否上架
        recommend: "", // 是否推荐
        visaInterview: "", // 是否面签
        homePage: "", // 是否首页排行
        defaultNum: "", // 默认购买数量
        defaultAmount: "" // 默认购买金额
      }
    };
  },
  mounted() {
    this.pageName = sessionStorage.getItem("page") + " > 新增纯债基金第二步"; // 获取页面名称
    if (sessionStorage.getItem("chunzhai_step2")) {
      this.ruleForm = JSON.parse(sessionStorage.getItem("chunzhai_step2"));
    }
  },

  methods: {
    next() {
      sessionStorage.setItem("chunzhai_step2", JSON.stringify(this.ruleForm));
      this.$router.push({
        name: "pure_debt_fund_step3"
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