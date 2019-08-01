<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
    </div>
    <div v-if="!isOk">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=":"
        class="isForm"
        :rules="rules"
      >
        <el-form-item label="同一产品标识" class="is50" prop="sameProductFlag">
          <el-input clearable v-model="ruleForm.sameProductFlag" placeholder="请输入" class="isInput"></el-input>
        </el-form-item>

        <el-form-item label="默认关注数量" class="is50" prop="flowNum">
          <el-input
            type="number"
            clearable
            v-model="ruleForm.flowNum"
            placeholder="请输入"
            class="isInput"
          ></el-input>
        </el-form-item>

        <el-form-item size="mini" label="是否上架" class="is50">
          <el-radio-group v-model="ruleForm.shelve" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" label="是否面签" class="is50">
          <el-radio-group v-model="ruleForm.visaInterview" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" label="是否推荐" class="is50">
          <el-radio-group v-model="ruleForm.recommend" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" label="是否首页排行" class="is50">
          <el-radio-group v-model="ruleForm.homePage" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
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

        <el-form-item label="榜单专区标识" class="is50">
          <el-select class="isInput" clearable placeholder="请选择" v-model="ruleForm.listAreaFlag">
            <el-option
              size="mini"
              v-for="item in dictData.list_area_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label class="is50"></el-form-item>
      </el-form>
    </div>
    <div v-if="!isOk" class="nextButtons">
      <el-button size="mini" type="primary" @click="before">上一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button size="mini" type="primary" @click="next">保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button size="mini" type="info" @click="back">取消</el-button>
    </div>

    <hasSuccess @isOver="isOver" v-if="isOk" />
  </div>
</template>
<script>
import hasSuccess from "../../../../components/success.vue";
export default {
  components: { hasSuccess },
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
      dictData: {}, // 字典数据
      isOk: false,
      pageName: "", // 当前页面名字
      ruleForm: {
        sameProductFlag: "", // 同一产品标识
        flowNum: "", // 默认关注数量
        shelve: "否", // 是否上架
        visaInterview: "否", // 是否面签
        recommend: "否", // 是否推荐
        homePage: "否", // 是否首页排行
        defaultNum: "", // 默认购买数量
        defaultAmount: "", // 默认购买金额
        listAreaFlag: "" // 榜单专区标识
      },
      rules: {
        sameProductFlag: [
          { min: 1, max: 100, message: "最多输入100个字", trigger: "blur" }
        ],
        flowNum: [{ validator: checkNum3, trigger: "blur" }],
        defaultNum: [{ validator: checkNum3, trigger: "blur" }],
        defaultAmount: [{ validator: checkNum3, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.pageName = sessionStorage.getItem("page") + " > 新增货币基金第二步"; // 获取页面名称
    if (sessionStorage.getItem("huobijijin_step2")) {
      this.ruleForm = JSON.parse(sessionStorage.getItem("huobijijin_step2"));
    }
  },

  methods: {
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let step1 = JSON.parse(sessionStorage.getItem("huobijijin_step1"));
          let obj = {
            institutionId: step1.institutionName,
            institutionName: "",
            fundHouseId: step1.fundHouseId,
            fundHouseName: "",
            name: step1.name,
            minAmount: +step1.purchaseAmount,
            redemptionDate: +step1.redemptionDate,
            lockinPeriod: +step1.lockinPeriod,
            buyIn: +step1.buyIn,
            commission: +step1.commission,
            description: step1.description,
            yieldRule: step1.yieldRule,
            yield: {
              onThe7thOfTheYearYield: +step1.onThe7thOfTheYearYield,
              thousandsOfYearsYields: +step1.thousandsOfYearsYields
            },
            appInfo: {
              sameProductFlag: this.ruleForm.sameProductFlag,
              defaultFlowNum: +this.ruleForm.flowNum,
              shelve: this.ruleForm.shelve === "否" ? "NO" : "YES",
              visaInterview:
                this.ruleForm.visaInterview === "否" ? "NO" : "YES",
              recommend: this.ruleForm.recommend === "否" ? "NO" : "YES",
              homePage: this.ruleForm.homePage === "否" ? "NO" : "YES",
              defaultBuyNum: +this.ruleForm.defaultNum,
              defaultAmount: +this.ruleForm.defaultAmount,
              listAreaFlag: this.ruleForm.listAreaFlag,
              listAreaFlagLabel: ""
            }
          };
          // 榜单专区标识Label
          obj.appInfo.listAreaFlagLabel = obj.appInfo.listAreaFlag
            ? this.dictData.list_area_type.filter(
                item => item.value === obj.appInfo.listAreaFlag
              )[0].label
            : "";

          // 机构
          obj.institutionName = obj.institutionId
            ? this.dictData.jigou.filter(
                item => item.id === obj.institutionId
              )[0].name
            : "";
          // 基金
          obj.fundHouseName = obj.fundHouseId
            ? this.dictData.jijin.filter(item => item.id === obj.fundHouseId)[0]
                .name
            : "";
          this.$api
            .add_huobijijin({
              vm: this,
              data: obj
            })
            .then(res => {
              if (res) {
                this.isOk = true;
              }
            });
        }
      });
    },
    isOver(type) {
      sessionStorage.setItem("page", "货币基金管理 ");
      if (type === "back") {
        this.$router.push({ name: `money_fund_mainPage` });
      } else {
        this.$router.push({ name: `money_fund_step1` });
        sessionStorage.removeItem("huobijijin_step1");
        sessionStorage.removeItem("huobijijin_step2");
      }
    },
    // 取消
    back() {
      this.$router.push({
        name: "money_fund_mainPage"
      });
    },
    // 上一步
    before() {
      sessionStorage.setItem("huobijijin_step2", JSON.stringify(this.ruleForm));
      this.$router.push({
        name: "money_fund_step1"
      });
    }
  }
};
</script>
