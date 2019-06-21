<template>
  <div class="componentWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
    </div>
    <div v-if="!isOk">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=':'
        class="isForm"
        :rules="rules"
      >
        <el-form-item
          label="监管属性"
          class="is50"
          prop="regulatoryProperty"
        >
          <el-select
            v-model="ruleForm.regulatoryProperty"
            clearable
            placeholder="请选择"
            class="isInput"
          >
            <el-option
              size='mini'
              v-for="item in dictData.regulatory_property"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="同一产品标识"
          class="is50"
        >
          <el-input
            clearable
            v-model="ruleForm.sameProductFlag"
            placeholder="请输入"
            class="isInput"
          ></el-input>

        </el-form-item>

        <el-form-item
          label="默认关注数量"
          class="is50"
        >
          <el-input
            type='number'
            clearable
            v-model="ruleForm.flowNum"
            placeholder="请输入"
            class="isInput"
          ></el-input>

        </el-form-item>

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
          <!-- <span class="isA">
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing isA1"></i>
          </span> -->
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
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing"></i>
          </span>
        </el-form-item>

        <el-form-item
          label="默认购买金额"
          class="is50"
        >
          <el-input
            type='number'
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

        <el-form-item
          size="mini"
          label="榜单专区标识"
          class="is50"
        >
          <el-radio-group
            v-model="ruleForm.listAreaFlag"
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
          </span>
        </el-form-item>
        <el-form-item
          label=""
          class="is50"
        >
        </el-form-item>
      </el-form>
    </div>
    <div
      v-if="!isOk"
      class="nextButtons"
    >
      <el-button
        size="mini"
        type="primary"
        @click="before"
      >上一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button
        size="mini"
        type="primary"
        @click="next"
      >保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button
        size="mini"
        type="info"
        @click="back"
      >取消</el-button>
    </div>

    <hasSuccess
      @isOver="isOver"
      v-if="isOk"
    />

  </div>
</template>
<script>
import hasSuccess from "../../../../components/success.vue";
export default {
  components: { hasSuccess },
  data() {
    return {
      dictData: {},
      isOk: false,
      pageName: "", // 当前页面名字
      ruleForm: {
        sameProductFlag: "", // 同一产品标识
        flowNum: "", // 默认关注数量
        shelve: "", // 是否上架
        visaInterview: "", // 是否面签
        recommend: "", // 是否推荐
        homePage: "", // 是否首页排行
        defaultNum: "", // 默认购买数量
        defaultAmount: "", // 默认购买金额
        listAreaFlag: "", // 榜单专区标识
        regulatoryProperty: "" // 监管属性
      },
      shelveList: [
        {
          label: "上架中",
          value: "YES"
        },
        {
          label: "已下架",
          value: "NO"
        }
      ],
      rules: {
        regulatoryProperty: [
          { required: true, message: "请选择监管属性", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.pageName = sessionStorage.getItem("page") + " > 新增理财产品第二步"; // 获取页面名称
    if (sessionStorage.getItem("licai_step2")) {
      this.ruleForm = JSON.parse(sessionStorage.getItem("licai_step2"));
    }
  },

  methods: {
    next() {
      let step1 = JSON.parse(sessionStorage.getItem("licai_step1"));
      let institutionId;
      this.dictData.jigou.forEach(v => {
        if (step1.institutionName == v.name) {
          institutionId = v.id;
        }
      });

      let obj = {
        description: step1.description,
        expectAnnualisedReturn: +step1.expectAnnualisedReturn,
        increaseAmount: +step1.increaseAmount,
        institutionName: step1.institutionName, //机构名称
        institutionId: institutionId, //机构id
        managementDate: step1.managementDate,
        name: step1.name,
        raiseDate: step1.raiseDate,
        riskLevel: +step1.riskLevel,
        seriesId: step1.seriesId,
        surplusQuota: +step1.surplusQuota,
        timeLimit: +step1.timeLimit,
        valueDate: step1.valueDate,

        defaultAmount: +this.ruleForm.defaultAmount,
        defaultNum: +this.ruleForm.defaultNum,
        flowNum: +this.ruleForm.flowNum,
        homePage: this.ruleForm.homePage === "否" ? "NO" : "YES",
        listAreaFlag: this.ruleForm.listAreaFlag === "否" ? "NO" : "YES",
        recommend: this.ruleForm.recommend === "否" ? "NO" : "YES",
        regulatoryProperty: +this.ruleForm.regulatoryProperty,
        sameProductFlag: this.ruleForm.sameProductFlag,
        shelve: this.ruleForm.shelve === "否" ? "NO" : "YES",
        visaInterview: this.ruleForm.visaInterview === "否" ? "NO" : "YES"
      };

      this.$api
        .add_licai({
          vm: this,
          data: obj
        })
        .then(res => {
          if (res) {
            this.isOk = true;
          }
        });
    },
    isOver(type) {
      sessionStorage.setItem("page", "理财管理 ");
      if (type === "back") {
        this.$router.push({ name: `manage_money_matters_mainPage` });
      } else {
        this.$router.push({ name: `manage_money_matters_step1` });
      }
    },
    // 取消
    back() {
      this.$router.push({
        name: "manage_money_matters_mainPage"
      });
    },
    // 上一步
    before() {
      sessionStorage.setItem("licai_step2", JSON.stringify(this.ruleForm));
      this.$router.push({
        name: "manage_money_matters_step1"
      });
    }
  }
};
</script>
