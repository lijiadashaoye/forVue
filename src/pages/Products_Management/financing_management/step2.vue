<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div id="forTable" v-if="!isOk">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="115px"
        label-suffix=":"
        class="isForm"
       >
        <el-form-item label="是否上架" class="is50">
          <el-select filterable class="isInput" placeholder="请选择" v-model="ruleForm.shelveStatus">
            <el-option
              v-for="item in dictData.shelve_status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否面签" class="is50">
          <el-select filterable class="isInput" placeholder="请选择" v-model="ruleForm.visaInterview">
            <el-option
              v-for="item in dictData.visa_interview_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="合作方式" class="is50">
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

        <el-form-item label="银行对接方式" class="is50">
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

        <el-form-item size="mini" label="是否实名" class="is50">
          <el-radio-group v-model="ruleForm.realNameAuth" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" label="显示银行提示页" class="is50">
          <el-radio-group v-model="ruleForm.showBankPage" class="isInput">
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

        <div style="width:100%;">
          <el-form-item label="产品H5链接" prop="h5Url">
            <el-input clearable v-model="ruleForm.h5Url" placeholder="请输入" class="isInput"></el-input>
          </el-form-item>
        </div>

        <!-- <div style="width:100%;">
          <el-form-item label="自定义跳转链接" prop="selfUrl">
            <el-input clearable v-model="ruleForm.selfUrl" placeholder="请输入" class="isInput"></el-input>
          </el-form-item>
        </div>-->
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
    return {
      env: null,
      fromHttp: null, // 如果是编辑，则会有值
      isSaveIng: false, // 切换保存按钮的可点击状态
      isOk: false,
      pageName: "", // 当前页面名字
      ruleForm: {
        shelveStatus: "yes", // 是否上架
        visaInterview: "no", // 是否面签
        cooperationMode: "unknown", // 合作方式
        connectionMode: "nothing", // 银行对接方式
        recommend: "否", // 是否推荐
        homePage: "否", // 是否首页排行
        realNameAuth: "是", // 是否实名
        showBankPage: "否", // 是否显示银行页
        signed: "否", // 是否签约
        autoShelve: "否", // 自动上架
        h5Url: "" // 产品H5链接
        // selfUrl: "" // 自定义跳转链接
      },
      dictData: {} // 数据字典
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.fromHttp = sessionStorage.getItem("financing_http");
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));

    if (this.fromHttp) {
      this.pageName = sessionStorage.getItem("page") + " > 编辑产品第二步"; // 获取页面名称
      let kk = JSON.parse(this.fromHttp);
      this.ruleForm = {
        shelveStatus: kk.appInfo.shelveStatus, // 是否上架
        visaInterview: kk.appInfo.visaInterview, // 是否面签
        cooperationMode: kk.appInfo.cooperationMode, // 合作方式
        connectionMode: kk.appInfo.connectionMode, // 银行对接方式
        recommend: kk.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
        homePage: kk.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
        realNameAuth: kk.appInfo.realNameAuth === "YES" ? "是" : "是", // 是否实名
        showBankPage: kk.appInfo.showBankPage === "YES" ? "是" : "否", // 是否显示银行页
        signed: kk.appInfo.signed === "YES" ? "是" : "否", // 是否签约
        autoShelve: kk.appInfo.autoShelve === "YES" ? "是" : "否", // 自动上架
        h5Url: kk.appInfo.h5Url // 产品H5链接
      };
    } else {
      this.pageName = sessionStorage.getItem("page") + " > 创建产品第二步"; // 获取页面名称
    }

    let step2 = sessionStorage.getItem("financing_step2");
    if (step2) {
      this.ruleForm = JSON.parse(step2);
    }
  },

  methods: {
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.isSaveIng = true;
          let step1 = JSON.parse(sessionStorage.getItem("financing_step1")),
            xilieData = JSON.parse(sessionStorage.getItem("select_xilie")),
            httpData = JSON.parse(this.fromHttp),
            httpType,
            obj = {
              institutionId: xilieData.institutionId,
              institutionName: xilieData.institutionName,
              seriesId: step1.seriesId,
              seriesName: "",
              name: step1.productName,
              productFeature: step1.productFeature,
              productFeatureLabel: "",
              interestRate: +step1.shouyi,
              minAmount: +step1.qigou,
              increaseAmount: +step1.dizeng,
              riskLevel: step1.fengxian,
              riskLevelLabel: "",
              surplusQuota: step1.shengyuED,
              surplusQuotaLabel: "",
              deadline: +step1.qixian,
              deadlineAlias: step1.deadlineAlias,
              timeUnitType: step1.danwei, // 期限单位
              timeUnitLabel: "",
              sellingDate: step1.raiseDate, //  起售日期
              valueDates: step1.managementDate, //  起售日期,理财日期
              valueDate: step1.valueDate,
              regulatoryProperty: step1.regulatoryProperty,
              regulatoryPropertyLabel: "",
              description: step1.description,
              contentVersion: +step1.contentVersion,
              currencyCode: step1.currencyCode, // 币种编码
              selfDefiningTags: [],
              activityTags: [],
              appInfo: {
                areaCode: step1.quyu,
                areaName: "",
                shelveStatus: this.ruleForm.shelveStatus,
                shelveStatusLabel: "",
                visaInterview: this.ruleForm.visaInterview,
                visaInterviewLabel: "",
                recommend: this.ruleForm.recommend === "否" ? "NO" : "YES",
                homePage: this.ruleForm.homePage === "否" ? "NO" : "YES",
                defaultAmount: +step1.defaultAmount,
                defaultBuyNum: step1.defaultNum ? +step1.defaultNum : 0,
                defaultFlowNum: step1.flowNum ? +step1.flowNum : 0,
                listAreaFlag: step1.listAreaFlag,
                listAreaFlagLabel: "",
                sameProductFlag: step1.sameProductFlag,
                realNameAuth:
                  this.ruleForm.realNameAuth === "否" ? "NO" : "YES",
                signed: this.ruleForm.signed === "否" ? "NO" : "YES",
                cooperationMode: this.ruleForm.cooperationMode,
                cooperationModeLabel: "",
                yearRate: +step1.yearRate,
                autoShelve: this.ruleForm.autoShelve === "否" ? "NO" : "YES",
                showBankPage:
                  this.ruleForm.showBankPage === "否" ? "NO" : "YES",
                connectionMode: this.ruleForm.connectionMode,
                connectionModeLabel: "",
                h5Url: this.ruleForm.h5Url
              }
            };

          if (this.fromHttp) {
            // 编辑
            httpType = "put";
            obj.id = httpData.id;
            obj.logo = httpData.logo;
            obj.uuid = httpData.uuid;
            obj.appInfo.id = httpData.appInfo.id;
            obj.appInfo.productUuid = httpData.appInfo.productUuid;
            obj.skuId = httpData.skuId;
            obj.productSubtype = httpData.productSubtype;
            obj.productSubtypeLabel = httpData.productSubtypeLabel;
            obj.interestRateAlias = httpData.interestRateAlias;
          } else {
            // 新建
            httpType = "post";
          }

          // 银行对接方式
          this.dictData.bank_connection_mode.forEach(item => {
            if (item.value === obj.connectionMode) {
              obj.appInfo.connectionModeLabel = item.label;
            }
          });
          // 机构
          obj.institutionName = this.dictData.jigou.filter(item => {
            return item.id === obj.institutionId;
          })[0].name;
          // 系列
          if (obj.seriesId) {
            obj.seriesName = xilieData.name;
          }

          // 产品特性
          obj.productFeatureLabel = obj.productFeature
            ? this.dictData.product_feature_type.filter(
                item => item.value === obj.productFeature
              )[0].label
            : "";

          // 风险等级Label
          this.dictData.risk_level.forEach(item => {
            if (item.value === obj.riskLevel) {
              obj.riskLevelLabel = item.label;
            }
          });
          // 剩余额度Label
          this.dictData.surplus_quota.forEach(item => {
            if (item.value === obj.surplusQuota) {
              obj.surplusQuotaLabel = item.label;
            }
          });

          // 期限单位
          this.dictData.deadline_type.forEach(item => {
            if (item.value === obj.timeUnitType) {
              obj.timeUnitLabel = item.label;
            }
          });
          // 监管属性Label
          this.dictData.regulatory_property.forEach(item => {
            if (item.value === obj.regulatoryProperty) {
              obj.regulatoryPropertyLabel = item.label;
            }
          });

          // 上架状态
          obj.appInfo.shelveStatusLabel = obj.appInfo.shelveStatus
            ? this.dictData.shelve_status.filter(
                item => item.value === obj.appInfo.shelveStatus
              )[0].label
            : "";
          // 是否面签Label
          obj.appInfo.visaInterviewLabel = obj.appInfo.visaInterview
            ? this.dictData.visa_interview_type.filter(
                item => item.value === obj.appInfo.visaInterview
              )[0].label
            : "";
          // 榜单专区标识
          if (obj.appInfo.listAreaFlag) {
            obj.appInfo.listAreaFlagLabel = this.dictData.list_area_type.filter(
              item => item.value == obj.appInfo.listAreaFlag
            )[0].label;
          }
          // 银行合作方式Label
          obj.appInfo.cooperationModeLabel = obj.appInfo.cooperationMode
            ? this.dictData.cooperation_mode.filter(
                item => item.value === obj.appInfo.cooperationMode
              )[0].label
            : "";

          // 银行对接方式
          obj.appInfo.connectionModeLabel = obj.appInfo.connectionMode
            ? this.dictData.bank_connection_mode.filter(
                item => item.value === obj.appInfo.connectionMode
              )[0].label
            : "";

          // 币种
          if (obj.currencyCode) {
            var kk_h = this.dictData.bizhong.filter(
              tar => tar.value === obj.currencyCode
            )[0];
            obj.currencyName = kk_h.label;
            obj.currencyUnit = kk_h.unit;
          }

          // 产品区域

          let quyu = this.dictData.quyu;
          wap: for (let i = quyu.length; i--; ) {
            if (quyu[i].value == obj.appInfo.areaCode) {
              obj.appInfo.areaName = quyu[i].label;
              break wap;
            }
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
            .add_financing({
              vm: this,
              data: obj,
              httpType: httpType
            })
            .then(res => {
              this.isSaveIng = false;
              if (res) {
                this.isOk = true;
                sessionStorage.removeItem("financing_step1");
                sessionStorage.removeItem("financing_step2");
                sessionStorage.removeItem("financing_http");
              }
            });
        }
      });
    },
    // 新增的保存完毕
    isOver(type) {
      sessionStorage.setItem("page", "投融资产品");
      if (type === "back") {
        this.$router.push({ name: `financing_mainPage` });
      } else {
        this.$router.push({ name: `financing_step1` });
      }
    },
    // 取消
    back() {
      this.$router.push({
        name: "financing_mainPage"
      });
    },
    // 上一步
    before() {
      sessionStorage.setItem("financing_step2", JSON.stringify(this.ruleForm));
      this.$router.push({
        name: "financing_step1"
      });
    }
  }
};
</script>
