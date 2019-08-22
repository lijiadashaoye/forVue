<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
    </div>
    <div style="overflow:auto;" id="forTable">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=":"
        class="isForm"
        :rules="rules"
      >
        <el-form-item prop="institutionId" label="机构名称" style="position:relative" class="is50">
          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.institutionId"
            @change="change_xilie(ruleForm.institutionId)"
          >
            <el-option
              size="mini"
              v-for="item in dictData.jigou"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>

          <a class="isAClick" @click="toJiGou">无机构？</a>
        </el-form-item>

        <el-form-item label="产品系列" class="is50">
          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.seriesId"
            @change="setXiLie(ruleForm.seriesId)"
          >
            <el-option
              size="mini"
              v-for="item in xilie"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <a class="isAClick" @click="toXiLie">无产品系列？</a>
        </el-form-item>

        <hr />

        <el-form-item label="产品名称" prop="name" class="is50">
          <el-input class="isInput" clearable placeholder="请输入" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="产品别名" class="is50" prop="typeAlias">
          <el-input class="isInput" clearable placeholder="请输入" v-model="ruleForm.typeAlias"></el-input>
        </el-form-item>

        <el-form-item label="利率" prop="interestRate" class="is50">
          <el-input
            class="isInput"
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.interestRate"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="利率别名" prop="interestRateAlias" class="is50">
          <el-input
            class="isInput"
            clearable
            placeholder="请输入"
            v-model="ruleForm.interestRateAlias"
          ></el-input>
        </el-form-item>

        <el-form-item label="付息频率" style="position:relative" class="is50">
          <el-select class="isInput" clearable placeholder="请选择" v-model="ruleForm.frequencyType">
            <el-option
              size="mini"
              v-for="item in dictData.frequency_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="投资期限" prop="qixian" class="is50">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.qixian"
            placeholder="请输入"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="期限别名" prop="deadlineAlias" class="is50">
          <el-input class="isInput" clearable placeholder="请输入" v-model="ruleForm.deadlineAlias"></el-input>
        </el-form-item>

        <el-form-item label="最高利率" class="is50" prop="max">
          <el-input
            class="isInput"
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.max"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="到期利率" class="is50" prop="end">
          <el-input
            class="isInput"
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.end"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item prop="fengxian" label="风险等级" style="position:relative" class="is50">
          <el-select class="isInput" clearable placeholder="请选择" v-model="ruleForm.fengxian">
            <el-option
              size="mini"
              v-for="item in dictData.risk_level"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="剩余额度" prop="surplusQuota" class="is50">
          <el-select class="isInput" v-model="ruleForm.surplusQuota" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.surplus_quota"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品版本标识" prop="contentVersion" class="is50">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.contentVersion"
            placeholder="请输入"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="币种" style="position:relative" class="is50">
          <el-select class="isInput" clearable placeholder="请选择" v-model="ruleForm.currencyCode">
            <el-option
              size="mini"
              v-for="item in dictData.bizhong"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="监管属性" class="is50" prop="regulatoryProperty">
          <el-select
            v-model="ruleForm.regulatoryProperty"
            clearable
            placeholder="请选择"
            class="isInput"
          >
            <el-option
              size="mini"
              v-for="item in dictData.regulatory_property"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品标签" class="is50">
          <el-select
            class="isInput"
            v-model="ruleForm.productTags"
            clearable
            placeholder="请选择"
            multiple
          >
            <el-option
              size="mini"
              v-for="item in dictData.productTags"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <span class="isA">
            <i
              title="标签：标签默认在首页排行榜单显示，活期存款展示前两个标签，智能存款展示前四个标签"
              class="myIcon14px icon-wenhaoyuanyiwenxianxing"
            ></i>
          </span>
        </el-form-item>

        <el-form-item label="自定义标签" class="is50">
          <el-select
            class="isInput"
            v-model="ruleForm.selfDefiningTags"
            clearable
            placeholder="请选择"
            multiple
          >
            <el-option
              size="mini"
              v-for="item in dictData.selfDefiningTags"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="活动标签" class="is50">
          <el-select
            class="isInput"
            v-model="ruleForm.activityTags"
            clearable
            placeholder="请选择"
            multiple
          >
            <el-option
              size="mini"
              v-for="item in dictData.activityTags"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="递增金额" prop="increaseAmount" class="is50">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.increaseAmount"
            placeholder="请输入"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="起售日期" class="is50">
          <el-date-picker
            v-model="ruleForm.qishou"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="is50"></el-form-item>
        <el-form-item label="起息日期" class="is50">
          <el-date-picker
            v-model="ruleForm.qixi"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="is50"></el-form-item>

        <el-form-item label="最大起购金额(元)" prop="maxAmount" class="is50">
          <el-input
            type="number"
            class="isInput"
            clearable
            v-model="ruleForm.maxAmount"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="最小起购金额(元)" prop="minAmount" class="is50">
          <el-input
            type="number"
            class="isInput"
            clearable
            v-model="ruleForm.minAmount"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="起购范围说明">
          <isQuill :url="'admin/file/up/setting'" v-model="ruleForm.amountRangeExplain"></isQuill>
        </el-form-item>

        <el-form-item label="产品描述">
          <isQuill :url="'admin/file/up/setting'" v-model="ruleForm.description"></isQuill>
        </el-form-item>
      </el-form>

      <div class="nextButtons">
        <el-button size="mini" type="primary" @click="next">下一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="info" @click="back">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import isQuill from "@/components/quill.vue";

export default {
  components: { isQuill },
  data() {
    // 验证数字
    var checkNum3 = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 10 || ("" + value).length < 0) {
        callback(new Error("请输入1-10字符"));
      } else {
        callback();
      }
    };
    // 验证利率
    var checkNumLilv = (rule, value, callback) => {
      if (("" + value).length > 10 || ("" + value).length < 0) {
        callback(new Error("请输入1-10字符"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (+value >= 100) {
        callback(new Error("利率不能大于或等于100"));
      } else {
        callback();
      }
    };
    // 验证数字 最大起购额
    var checkNum4 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请正确输入"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (value && +value <= +this.ruleForm.minAmount) {
        callback(new Error("不能小于或等于最小起购额"));
      } else if (("" + value).length > 14 || ("" + value).length < 0) {
        callback(new Error("请输入1-14字符"));
      } else {
        callback();
      }
    };
    // 验证数字 最小起购额
    var checkNum5 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请正确输入"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (value && +value >= +this.ruleForm.maxAmount) {
        callback(new Error("不能大于或等于最大起购额"));
      } else if (("" + value).length > 14 || ("" + value).length < 0) {
        callback(new Error("请输入1-14字符"));
      } else {
        callback();
      }
    };

    return {
      xilie: [], // 从服务器返回的产品系列数据
      pageName: "", // 当前页面名字
      dictData: {}, // 字典数据
      ruleForm: {
        institutionId: "", // 机构名称
        seriesId: "", // 产品系列ID
        name: "", // 产品名称
        typeAlias: "", // 产品类型（类别别名）
        interestRate: "", // 利率
        interestRateAlias: "", // 利率别名
        max: "", // 最高利率
        end: "", // 到期利率
        frequencyType: "", // 付息频率
        increaseAmount: "", // 递增金额
        fengxian: "", // 风险等级
        surplusQuota: "", // 剩余额度
        qixian: "", // 投资期限
        deadlineAlias: "", // 期限别名
        regulatoryProperty: "", // 监管属性
        qishou: null, // 起售日期
        qixi: null, // 起息日期
        description: "", // 产品描述

        currencyCode: "", // 币种编码
        contentVersion: "", // 内容版本号
        minAmount: "", // 默认最小存款金额
        maxAmount: "", // 默认最大存款金额
        amountRangeExplain: "" // 默认存款金额说明
      },
      //表单验证
      rules: {
        institutionId: [
          { required: true, message: "请选择机构名称", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        typeAlias: [
          { min: 1, max: 20, message: "最多输入20个字", trigger: "blur" }
        ],
        max: [
          { required: true, message: "请输入最高利率", trigger: "blur" },
          { validator: checkNumLilv, trigger: "blur" }
        ],
        end: [
          { required: true, message: "请输入到期利率", trigger: "blur" },
          { validator: checkNumLilv, trigger: "blur" }
        ],
        interestRate: [
          { required: true, message: "请输入利率", trigger: "blur" },
          { validator: checkNumLilv, trigger: "blur" }
        ],
        interestRateAlias: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        deadlineAlias: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        increaseAmount: [
          { validator: checkNum3, trigger: "blur" },
          { required: true, message: "请输入递增金额", trigger: "blur" }
        ],
        qixian: [
          { validator: checkNum3, trigger: "blur" },
          { required: true, message: "请输入期限", trigger: "blur" }
        ],
        regulatoryProperty: [
          { required: true, message: "请选择监管属性", trigger: "change" }
        ],
        minAmount: [{ required: true, validator: checkNum5, trigger: "blur" }],
        maxAmount: [{ required: true, validator: checkNum4, trigger: "blur" }]
      }
    };
  },
  created() {
    this.pageName = sessionStorage.getItem("page") + " > 新增结构存款第一步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    // 如果有数据，则表示是编辑过的，如果没有，那就是从mainpage过来的
    let jiegou_step1 = sessionStorage.getItem("jiegou_step1");
    // 获取选定的机构
    let jigouData = JSON.parse(sessionStorage.getItem("xilie_jigou"));
    this.change_xilie(jigouData.institutionId);

    if (jiegou_step1) {
      this.ruleForm = JSON.parse(jiegou_step1);
    } else {
      this.ruleForm.institutionId = jigouData.institutionId;
      if (jigouData.id) {
        this.ruleForm.seriesId = jigouData.id;
      }
    }
  },

  methods: {
    // 变更产品系列后，要保存选择的系列，等回到当前页面后数据能对应上
    setXiLie(data) {
      let tar = this.xilie.filter(item => item.id === data);
      sessionStorage.setItem("xilie_jigou", JSON.stringify(tar[0]));
    },
    // 变更机构后，要对应调整系列
    change_xilie(id) {
      // 根据机构id，获取对应的产品系列
      let xilieData = JSON.parse(sessionStorage.getItem("xilie_data"));
      this.xilie = xilieData.filter(
        item => item.institutionId === id
      )[0].seriesList;

      if (this.ruleForm.seriesId != "") {
        this.ruleForm.seriesId = "";
      }
    },
    next() {
      // this.$refs.ruleForm.validate(valid => {
      //   if (valid) {
          if (
            (this.ruleForm.qishou && !this.ruleForm.qixi) ||
            (!this.ruleForm.qishou && this.ruleForm.qixi)
          ) {
            this.$message.error("起息日期和起售日期必须同时输入数据！");
          } else {
            if (this.ruleForm.qishou && this.ruleForm.qixi) {
              let qishou = new Date(this.ruleForm.qishou[0]);
              let qixi = new Date(this.ruleForm.qixi[0]);

              if (qixi >= qishou) {
                sessionStorage.setItem(
                  "jiegou_step1",
                  JSON.stringify(this.ruleForm)
                );
                this.$router.push({
                  name: "jiegou_step2"
                });
              } else {
                this.$message.error("起息日期不能早于起售日期！");
              }
            } else {
              sessionStorage.setItem(
                "jiegou_step1",
                JSON.stringify(this.ruleForm)
              );
              this.$router.push({
                name: "jiegou_step2"
              });
            }
          }
        // }
      // });
    },
    // 取消
    back() {
      this.$router.push({
        name: "deposit_mainPage"
      });
    },
    toJiGou() {
      sessionStorage.setItem("page", "机构管理");
      this.$router.push({
        name: "organizational_step1"
      });
    },
    toXiLie() {
      this.$router.push({
        name: "deposit",
        query: {
          institutionId: this.ruleForm.institutionId
        }
      });
    }
  }
};
</script>