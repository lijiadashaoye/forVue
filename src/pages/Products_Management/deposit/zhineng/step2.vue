<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div v-if="!isOk" id="forTable">
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

        <el-form-item label="是否上架" class="is50">
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

        <el-form-item label="是否面签" class="is50">
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

        <el-form-item size="mini" label="到期是否转存" class="is50">
          <el-radio-group v-model="ruleForm.renewal" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" label="是否实名" class="is50">
          <el-radio-group v-model="ruleForm.realNameAuth" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" label="是否签约" class="is50">
          <el-radio-group v-model="ruleForm.signed" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" label="自动上架" class="is50">
          <el-radio-group v-model="ruleForm.autoShelve" class="isInput">
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

        <el-form-item label="合作方式" class="is50" prop="cooperationMode">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.cooperationMode"
          >
            <el-option
              size="mini"
              v-for="item in dictData.cooperation_mode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="银行对接方式" class="is50" prop="connectionMode">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.connectionMode"
          >
            <el-option
              size="mini"
              v-for="item in dictData.bank_connection_mode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="默认存款笔数" class="is50" prop="defaultNum">
          <el-input
            clearable
            v-model="ruleForm.defaultNum"
            placeholder="请输入"
            class="isInput"
            type="number"
          ></el-input>
          <span class="isA">
            笔
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing isA1"></i>
          </span>
        </el-form-item>

        <el-form-item label="默认存款金额" class="is50" prop="defaultAmount">
          <el-input
            type="number"
            clearable
            v-model="ruleForm.defaultAmount"
            placeholder="请输入"
            class="isInput"
          ></el-input>
          <span class="isA">
            元
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing isA1"></i>
          </span>
        </el-form-item>

        <el-form-item label="默认关注数量" class="is50" prop="defaultFlowNum">
          <el-input
            type="number"
            clearable
            v-model="ruleForm.defaultFlowNum"
            placeholder="请输入"
            class="isInput"
          ></el-input>
        </el-form-item>

        <el-form-item prop="listAreaFlag" label="榜单专区标识" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.listAreaFlag"
          >
            <el-option
              size="mini"
              v-for="item in dictData.list_area_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="H5链接" style="width:100%;" prop="h5Url">
          <el-input clearable v-model="ruleForm.h5Url" placeholder="请输入" class="isInput"></el-input>
        </el-form-item>
      </el-form>

      <div class="nextButtons">
        <el-button size="mini" type="warning" @click="before">上一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="primary" @click="next" :disabled="isSaveIng">保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="info" @click="back">取消</el-button>
      </div>
    </div>
    <div id="forTable" v-if="isOk">
      <hasSuccess @isOver="isOver" />
    </div>
  </div>
</template>
<script>
import hasSuccess from "@/components/success.vue";
export default {
  components: { hasSuccess },
  data() {
    // 验证数字，小数的
    var checkNum2 = (rule, value, callback) => {
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 10 || ("" + value).length < 0) {
        callback(new Error("请输入1-10字符"));
      } else {
        callback();
      }
    };
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
    return {
      env: null,
      isSaveIng: false, // 切换保存按钮的可点击状态
      isOk: false,
      dictData: {}, // 字典数据
      pageName: "", // 当前页面名字
      ruleForm: {
        sameProductFlag: "", // 同一产品标识
        shelveStatus: "yes", // 是否上架
        visaInterview: "no", // 是否面签
        renewal: "否", // 到期是否转存
        recommend: "否", // 是否推荐
        homePage: "否", // 是否首页排行
        defaultNum: "0", // 默认购买数量
        defaultAmount: "0", // 默认购买金额
        defaultFlowNum: "0", // 默认关注数量
        listAreaFlag: "", // 榜单专区标识
        autoShelve: "否", // 自动上架
        showBankPage: "否", //  显示银行过渡页
        connectionMode: "nothing", //  银行对接方式
        cooperationMode: "unknown", //  合作方式
        h5Url: "", //  H5链接
        realNameAuth: "是", // 实名认证
        signed: "否" // 是否签约
      },
      //表单验证
      rules: {
        sameProductFlag: [
          { min: 1, max: 100, message: "最多输入100个字", trigger: "blur" }
        ],
        defaultNum: [{ validator: checkNum2, trigger: "blur" }],
        defaultAmount: [{ validator: checkNum3, trigger: "blur" }],
        defaultFlowNum: [{ validator: checkNum2, trigger: "blur" }],
        h5Url: [
          { min: 1, max: 100, message: "最多输入100个字", trigger: "blur" }
        ],
        cooperationMode: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        connectionMode: [
          { required: true, message: "请选择", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page") + " > 新增智能存款第二步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    let zhineng_step2 = sessionStorage.getItem("zhineng_step2");
    if (zhineng_step2) {
      this.ruleForm = JSON.parse(zhineng_step2);
    }
  },

  methods: {
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.isSaveIng = true;
          let step1 = JSON.parse(sessionStorage.getItem("zhineng_step1"));
          let type = JSON.parse(
            sessionStorage.getItem("dict")
          ).deposit_type.filter(item => {
            return item.value === "intelligent_deposit";
          })[0];
          let xilieData = JSON.parse(sessionStorage.getItem("select_xilie"));
          let obj = {
            institutionId: xilieData.institutionId,
            institutionName: xilieData.institutionName,
            seriesId: step1.seriesId,
            seriesName: "",
            name: step1.name,
            minAmount: +step1.minAmount, // 最小起购金额
            maxAmount: +step1.maxAmount, // 最大起购金额
            amountRangeExplain: step1.amountRangeExplain, // 起购范围说明
            increaseAmount: +step1.increaseAmount, // 递增金额
            productSubtype: type.value,
            productSubtypeLabel: type.label,
            typeAlias: step1.typeAlias,
            deadlineAlias: step1.deadlineAlias, // 期限别名
            interestRateAlias: step1.interestRateAlias,
            renewal: this.ruleForm.renewal === "是" ? "YES" : "NO",
            withdrawalTime: step1.payTime,
            withdrawalTimeLabel: "",
            interestMode: step1.interestMode,
            interestModeLabel: "",
            regulatoryProperty: step1.regulatoryProperty, // 监管属性
            regulatoryPropertyLabel: "",
            frequencyType: step1.frequencyType, // 付息频率
            frequencyTypeLabel: "",
            currencyCode: step1.currencyCode, // 币种编码
            currencyName: "",
            currencyUnit: "",
            contentVersion: +step1.contentVersion, // 内容版本号
            description: step1.description,
            interestRates: [],
            surplusQuota: step1.surplusQuota,
            surplusQuotaLabel: "",
            appInfo: {
              shelveStatus: this.ruleForm.shelveStatus,
              shelveStatusLabel: "",
              visaInterview: this.ruleForm.visaInterview, // 是否面签
              visaInterviewLabel: "",
              recommend: this.ruleForm.recommend === "是" ? "YES" : "NO",
              homePage: this.ruleForm.homePage === "是" ? "YES" : "NO",
              defaultBuyNum: +this.ruleForm.defaultNum,
              defaultAmount: +this.ruleForm.defaultAmount,
              listAreaFlag: this.ruleForm.listAreaFlag,
              listAreaFlagLabel: "",
              sameProductFlag: this.ruleForm.sameProductFlag,
              realNameAuth: this.ruleForm.realNameAuth === "是" ? "YES" : "NO", // 是否实名
              signed: this.ruleForm.signed === "是" ? "YES" : "NO", // 是否签约
              defaultFlowNum: +this.ruleForm.defaultFlowNum, // 默认关注数量
              connectionMode: this.ruleForm.connectionMode, // 银行对接方式
              connectionModeLabel: "",
              cooperationMode: this.ruleForm.cooperationMode, // 合作方式
              cooperationModeLabel: "",
              yearRate: +step1.yearRate, // 年收费率
              autoShelve: this.ruleForm.autoShelve === "是" ? "YES" : "NO", // 自动上架
              showBankPage: this.ruleForm.showBankPage === "是" ? "YES" : "NO", // 显示银行过渡页
              h5Url: this.ruleForm.h5Url,
              areaCode: step1.areaCode, // 区域编码
              areaName: ""
            },
            productTags: [],
            selfDefiningTags: [],
            activityTags: []
          };

          if (obj.seriesId != "") {
            obj.seriesName = xilieData.name;
          }
          // 支取时间Label
          obj.withdrawalTimeLabel = obj.withdrawalTime
            ? this.dictData.pay_time.filter(
                item => item.value === obj.withdrawalTime
              )[0].label
            : "";
          // 上架状态
          obj.appInfo.shelveStatusLabel = obj.appInfo.shelveStatus
            ? this.dictData.shelve_status.filter(
                item => item.value === obj.appInfo.shelveStatus
              )[0].label
            : "";
          // 计息方式Label
          obj.interestModeLabel = obj.interestMode
            ? this.dictData.interest_mode.filter(
                item => item.value === obj.interestMode
              )[0].label
            : "";
          // 榜单专区标识Label
          obj.appInfo.listAreaFlagLabel = obj.appInfo.listAreaFlag
            ? this.dictData.list_area_type.filter(
                item => item.value === obj.appInfo.listAreaFlag
              )[0].label
            : "";
          // 剩余额度Label
          obj.surplusQuotaLabel = obj.surplusQuota
            ? this.dictData.surplus_quota.filter(
                item => item.value === obj.surplusQuota
              )[0].label
            : "";
          // 监管属性Label
          obj.regulatoryPropertyLabel = obj.regulatoryProperty
            ? this.dictData.regulatory_property.filter(
                item => item.value === obj.regulatoryProperty
              )[0].label
            : "";
          // 币种
          if (obj.currencyCode) {
            let kk = this.dictData.bizhong.filter(
              tar => tar.value === obj.currencyCode
            )[0];
            obj.currencyName = kk.label;
            obj.currencyUnit = kk.unit;
          }
          // 付息频率Label
          obj.frequencyTypeLabel = obj.frequencyType
            ? this.dictData.frequency_type.filter(
                item => item.value === obj.frequencyType
              )[0].label
            : "";
          // 是否面签Label
          obj.appInfo.visaInterviewLabel = obj.appInfo.visaInterview
            ? this.dictData.visa_interview_type.filter(
                item => item.value === obj.appInfo.visaInterview
              )[0].label
            : "";
          // 银行对接方式Label
          obj.appInfo.connectionModeLabel = obj.appInfo.connectionMode
            ? this.dictData.bank_connection_mode.filter(
                item => item.value === obj.appInfo.connectionMode
              )[0].label
            : "";

          // 银行合作方式Label
          obj.appInfo.cooperationModeLabel = obj.appInfo.cooperationMode
            ? this.dictData.cooperation_mode.filter(
                item => item.value === obj.appInfo.cooperationMode
              )[0].label
            : "";

          // 所属区域
          obj.appInfo.areaName = step1.areaCode
            ? this.dictData.quyu.filter(
                item => item.value === step1.areaCode
              )[0].label
            : "";

          // 利率列表
          obj.interestRates = step1.lilv.map(item => {
            let kk = {
              fromTerm: item.minDeadline !== "" ? +item.minDeadline : 1, // 最小期限
              fromTermUnitType: item.min_danwei !== "" ? item.min_danwei : "1", // 最小期限单位
              fromTermUnitLabel: "天",
              fromTermSymbolType:
                item.min_symbol !== "" ? item.min_symbol : "&le", // 限制条件符号
              fromTermSymbolTypeLabel: "小于等于",

              toTerm: item.maxDeadline !== "" ? +item.maxDeadline : "", // 最大期限
              toTermUnitType: item.max_danwei !== "" ? item.max_danwei : "", // 最大期限单位
              toTermUnitLabel: "",
              toTermSymbolType: item.max_symbol !== "" ? item.max_symbol : "", // 限制条件符号
              toTermSymbolTypeLabel: "",

              interestRate: item.lilv, // 利率
              lockinPeriod: +item.lockinPeriod, // 锁定期限
              showList: item.showList, // 榜单展示
              lockinShowList: item.lockinShowList, // 锁定期榜单展示
              remark: item.remark, // 备注
              homepageCopywriting: item.homepageCopywriting, // 首页文案
              detailCopywriting: item.detailCopywriting, // 详情页文案
              bankCopywriting: item.bankCopywriting, //  银行文案

              productList: item.showProduct === "YES" ? "YES" : "NO", //  产品展示
              termCopywriting: item.bangdanWrite //  榜单期限文案
            };

            kk.fromTermUnitLabel = kk.fromTermUnitType
              ? this.dictData.deadline_type.filter(
                  tar => tar.value === kk.fromTermUnitType
                )[0].label
              : "";
            kk.fromTermSymbolTypeLabel = kk.fromTermSymbolType
              ? this.dictData.rule_symbol.filter(
                  tar => tar.value === kk.fromTermSymbolType
                )[0].label
              : "";

            kk.toTermUnitLabel = kk.toTermUnitType
              ? this.dictData.deadline_type.filter(
                  tar => tar.value === kk.toTermUnitType
                )[0].label
              : "";
            kk.toTermSymbolTypeLabel = kk.toTermSymbolType
              ? this.dictData.rule_symbol.filter(
                  tar => tar.value === kk.toTermSymbolType
                )[0].label
              : "";
            return kk;
          });

          // 获取产品标签
          if (step1.productTags.length > 0) {
            this.dictData.productTags.forEach(item => {
              step1.productTags.forEach(tar => {
                if (item.id === tar) {
                  obj.productTags.push({
                    id: tar,
                    name: item.name
                  });
                }
              });
            });
          }
          // 获取自定义标签
          if (step1.selfDefiningTags.length > 0) {
            this.dictData.selfDefiningTags.forEach(item => {
              step1.selfDefiningTags.forEach(tar => {
                if (item.id === tar) {
                  obj.selfDefiningTags.push({
                    id: tar,
                    name: item.name
                  });
                }
              });
            });
          }
          // 获取活动标签
          if (step1.activityTags.length > 0) {
            this.dictData.activityTags.forEach(item => {
              step1.activityTags.forEach(tar => {
                if (item.id === tar) {
                  obj.activityTags.push({
                    id: tar,
                    name: item.name
                  });
                }
              });
            });
          }

          this.$api
            .save_zhineng({
              vm: this,
              data: obj
            })
            .then(res => {
              this.isSaveIng = false;
              if (res) {
                sessionStorage.removeItem("zhineng_step1");
                sessionStorage.removeItem("zhineng_step2");
                this.isOk = true;
              }
            });
        }
      });
    },
    isOver(type) {
      sessionStorage.setItem("page", "存款管理 ");
      if (type === "back") {
        this.$router.push({ name: `deposit_mainPage` });
      } else {
        this.$router.push({ name: `zhineng_step1` });
      }
    },
    // 取消
    back() {
      this.$router.push({
        name: "deposit_mainPage"
      });
    },
    // 上一步
    before() {
      sessionStorage.setItem("zhineng_step2", JSON.stringify(this.ruleForm));
      this.$router.push({
        name: "zhineng_step1"
      });
    }
  }
};
</script>
