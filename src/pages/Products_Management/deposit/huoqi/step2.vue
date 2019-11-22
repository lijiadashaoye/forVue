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
        <el-form-item label="产品区域" class="is50" prop="quyu">
          <el-select filterable class="isInput" clearable placeholder="请选择" v-model="ruleForm.quyu">
            <el-option
              v-for="item in dictData.quyu"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
        <el-form-item size="mini" label="是否签约" class="is50">
          <el-radio-group v-model="ruleForm.signed" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="默认存款笔数" class="is50" prop="defaultBuyNum">
          <el-input
            clearable
            v-model="ruleForm.defaultBuyNum"
            placeholder="请输入"
            class="isInput"
            type="number"
          ></el-input>
          <span class="isA">
            笔
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing"></i>
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
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing"></i>
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

        <el-form-item label="年收费率" class="is50" prop="yearRate">
          <el-input
            type="number"
            clearable
            v-model="ruleForm.yearRate"
            placeholder="请输入"
            class="isInput"
          ></el-input>
          <span class="isA">%</span>
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

        <div style="width:100%;">
          <el-form-item label="产品H5链接" prop="h5Url">
            <el-input clearable v-model="ruleForm.h5Url" placeholder="请输入" class="isInput"></el-input>
          </el-form-item>
        </div>
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
    // 验证数字0--100
    var checkNum1 = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (value > 100) {
        callback(new Error("请输入小于100数据"));
      } else if (("" + value).length > 10 || ("" + value).length < 0) {
        callback(new Error("请输入1-10字符"));
      } else {
        callback();
      }
    };

    // 验证数字
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
        recommend: "否", // 是否推荐
        homePage: "否", // 是否首页排行
        defaultBuyNum: "0", // 默认存款笔数
        defaultAmount: "0", // 默认购买金额
        defaultFlowNum: "0", // 默认关注数量
        listAreaFlag: "", // 榜单专区标识
        yearRate: "", // 年收费率
        cooperationMode: "unknown", // 合作方式
        realNameAuth: "是", // 是否实名
        showBankPage: "否", // 是否显示银行页
        signed: "否", // 是否签约
        connectionMode: "nothing", // 银行对接方式
        h5Url: "", // 产品H5链接
        quyu: "100000"
      },
      //表单验证
      rules: {
        sameProductFlag: [
          { min: 1, max: 100, message: "最多输入100个字", trigger: "blur" }
        ],
        defaultBuyNum: [{ validator: checkNum2, trigger: "blur" }],
        defaultAmount: [{ validator: checkNum3, trigger: "blur" }],
        defaultFlowNum: [{ validator: checkNum3, trigger: "blur" }],
        yearRate: [{ validator: checkNum1, trigger: "blur" }],
        quyu: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page") + " > 新增活期存款第二步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    let huoqi_step2 = sessionStorage.getItem("huoqi_step2");
    if (huoqi_step2) {
      this.ruleForm = JSON.parse(huoqi_step2);
    }
  },

  methods: {
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.isSaveIng = true;
          let step1 = JSON.parse(sessionStorage.getItem("huoqi_step1"));
          // 产品子类型
          let type = JSON.parse(
            sessionStorage.getItem("dict")
          ).deposit_type.filter(item => {
            return item.value === "demand_deposit";
          })[0];
          // 产品系列
          let xilieData = JSON.parse(sessionStorage.getItem("select_xilie"));

          let obj = {
            institutionId: xilieData.institutionId,
            institutionName: xilieData.institutionName,
            seriesId: step1.seriesId,
            seriesName: "",
            name: step1.name,
            productSubtype: type.value,
            productSubtypeLabel: type.label,
            typeAlias: step1.typeAlias,
            maxAmount: +step1.maxAmount,
            minAmount: +step1.minAmount,
            amountRangeExplain: step1.amountRangeExplain,
            increaseAmount: +step1.increaseAmount,
            interestRateAlias: step1.interestRateAlias,
            regulatoryProperty: step1.regulatoryProperty,
            regulatoryPropertyLabel: "",
            currencyCode: step1.currencyCode,
            currencyName: "", // 币种币种名称
            currencyUnit: "",
            description: step1.description,
            contentVersion: +step1.contentVersion,
            interest: {
              interestRate: step1.interestRate
            },
            frequencyType: step1.frequencyType,
            frequencyTypeLabel: "",
            deadlineAlias: step1.deadlineAlias,
            productTags: [],
            selfDefiningTags: [],
            activityTags: [],
            appInfo: {
              shelveStatus: this.ruleForm.shelveStatus,
              shelveStatusLabel: "",
              visaInterview: this.ruleForm.visaInterview,
              visaInterviewLabel: "",
              recommend: this.ruleForm.recommend === "是" ? "YES" : "NO",
              homePage: this.ruleForm.homePage === "是" ? "YES" : "NO",
              realNameAuth: this.ruleForm.realNameAuth === "是" ? "YES" : "NO",
              signed: this.ruleForm.signed === "是" ? "YES" : "NO",
              showBankPage: this.ruleForm.showBankPage === "是" ? "YES" : "NO",
              defaultBuyNum: +this.ruleForm.defaultBuyNum,
              defaultAmount: +this.ruleForm.defaultAmount,
              defaultFlowNum: +this.ruleForm.defaultFlowNum,
              cooperationMode: this.ruleForm.cooperationMode,
              cooperationModeLabel: "",
              yearRate: +this.ruleForm.yearRate,
              connectionMode: this.ruleForm.connectionMode,
              connectionModeLabel: "",
              h5Url: this.ruleForm.h5Url,
              listAreaFlag: this.ruleForm.listAreaFlag,
              listAreaFlagLabel: "",
              sameProductFlag: this.ruleForm.sameProductFlag,
              areaCode: this.ruleForm.quyu,
              areaName: ""
            }
          };

          if (obj.seriesId != "") {
            obj.seriesName = xilieData.name;
          }

          // 监管属性Label
          obj.regulatoryPropertyLabel = obj.regulatoryProperty
            ? this.dictData.regulatory_property.filter(
                item => item.value === obj.regulatoryProperty
              )[0].label
            : "";
          // 榜单专区标识Label
          obj.appInfo.listAreaFlagLabel = obj.appInfo.listAreaFlag
            ? this.dictData.list_area_type.filter(
                item => item.value === obj.appInfo.listAreaFlag
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

          // 所属区域
          obj.appInfo.areaName = this.ruleForm.quyu
            ? this.dictData.quyu.filter(
                item => item.value === obj.appInfo.areaCode
              )[0].label
            : "";

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
            .add_newHuoQi({
              vm: this,
              data: obj
            })
            .then(res => {
              this.isSaveIng = false;
              if (res) {
                this.isOk = true;
                sessionStorage.removeItem("huoqi_step1");
                sessionStorage.removeItem("huoqi_step2");
              }
            });
        } else {
          this.$message.error("请更正数据输入错误！");
        }
      });
    },
    isOver(type) {
      sessionStorage.setItem("page", "存款管理 ");
      if (type === "back") {
        this.$router.push({ name: `deposit_mainPage` });
      } else {
        this.$router.push({ name: `huoqi_step1` });
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
      sessionStorage.setItem("huoqi_step2", JSON.stringify(this.ruleForm));
      this.$router.push({
        name: "huoqi_step1"
      });
    }
  }
};
</script>


 <el-select filterable class="isInput" clearable placeholder="请选择" v-model="ruleForm.shelveStatus">
            <el-option
              size="mini"
              v-for="item in dictData.shelve_status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

    shelveStatus: this.ruleForm.shelveStatus,
              shelveStatusLabel: "",

// 上架状态
          obj.appInfo.shelveStatusLabel = obj.appInfo.shelveStatus
            ? this.dictData.shelve_status.filter(
                item => item.value === obj.appInfo.shelveStatus
              )[0].label
            : "";