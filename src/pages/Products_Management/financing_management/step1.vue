<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div id="forTable">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=":"
        class="isForm"
        :rules="rules"
      >
        <el-form-item prop="institutionId" label="机构名称" style="position:relative" class="isWith">
          <el-select
            @change="change_xilie(ruleForm.institutionId,true)"
            filterable
            placeholder="请选择"
            v-model="ruleForm.institutionId"
          >
            <el-option
              size="mini"
              v-for="item in dictData.jigou"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="seriesId" label="产品系列" style="position:relative" class="isWith">
          <el-select
            @change="setXiLie(ruleForm.seriesId)"
            filterable
            clearable
            placeholder="请选择"
            v-model="ruleForm.seriesId"
          >
            <el-option
              size="mini"
              v-for="item in xilie"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <hr />

        <el-form-item label="产品名称" prop="productName">
          <el-input clearable placeholder="请输入" v-model="ruleForm.productName"></el-input>
        </el-form-item>

        <el-form-item prop="productFeature" label="产品特性" style="position:relative" class="isWith">
          <el-select filterable clearable placeholder="请选择" v-model="ruleForm.productFeature">
            <el-option
              size="mini"
              v-for="item in dictData.product_feature_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="预期年化收益率" prop="shouyi">
          <el-input clearable type="number" placeholder="请输入" v-model="ruleForm.shouyi"></el-input>
        </el-form-item>

        <el-form-item label="起购金额" prop="qigou">
          <el-input clearable type="number" placeholder="请输入" v-model="ruleForm.qigou"></el-input>
        </el-form-item>

        <el-form-item label="递增金额" prop="dizeng">
          <el-input clearable type="number" placeholder="请输入" v-model="ruleForm.dizeng"></el-input>
        </el-form-item>

        <el-form-item label="剩余额度" prop="shengyuED">
          <el-select filterable v-model="ruleForm.shengyuED" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.surplus_quota"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="风险等级" prop="fengxian">
          <el-select filterable v-model="ruleForm.fengxian" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.risk_level"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="自定义标签">
          <el-select
            filterable
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

        <el-form-item label="活动标签">
          <el-select
            filterable
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

        <el-form-item label="产品区域" prop="quyu">
          <el-select filterable clearable placeholder="请选择" v-model="ruleForm.quyu">
            <el-option
              size="mini"
              v-for="item in dictData.quyu"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="币种" style="position:relative" prop="currencyCode">
          <el-select filterable clearable placeholder="请选择" v-model="ruleForm.currencyCode">
            <el-option
              size="mini"
              v-for="item in dictData.bizhong"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="监管属性" prop="regulatoryProperty">
          <el-select filterable v-model="ruleForm.regulatoryProperty" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.regulatory_property"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="listAreaFlag" label="榜单专区标识">
          <el-select filterable clearable placeholder="请选择" v-model="ruleForm.listAreaFlag">
            <el-option
              v-for="item in dictData.list_area_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="同一产品标识" prop="sameProductFlag">
          <el-input clearable v-model="ruleForm.sameProductFlag" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="产品版本标识" prop="contentVersion">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.contentVersion"></el-input>
        </el-form-item>

        <el-form-item label="默认关注数量" prop="flowNum">
          <el-input type="number" clearable v-model="ruleForm.flowNum" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="默认购买金额" prop="defaultAmount">
          <el-input type="number" clearable v-model="ruleForm.defaultAmount" placeholder="请输入"></el-input>
          <span class="isA">元</span>
        </el-form-item>

        <el-form-item label="默认购买笔数" prop="defaultNum">
          <el-input clearable v-model="ruleForm.defaultNum" placeholder="请输入" type="number"></el-input>
          <span class="isA">笔</span>
        </el-form-item>

        <el-form-item label="年收费率" prop="yearRate">
          <el-input type="number" clearable v-model="ruleForm.yearRate" placeholder="请输入"></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="期限别名" prop="deadlineAlias">
          <el-input clearable v-model="ruleForm.deadlineAlias" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="期限" prop="qixian">
          <div style="width:100%;display:flex;justify-content:space-between;">
            <el-input clearable type="number" placeholder="请输入" v-model="ruleForm.qixian"></el-input>
            <span style="display:inline-block;width:50px;padding:0 5px;">单位</span>
            <el-select filterable v-model="ruleForm.danwei" placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in dictData.deadline_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item label="募集日期" prop="raiseDate">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="ruleForm.raiseDate"
            type="datetimerange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="起息日期" prop="valueDate">
          <el-date-picker
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="ruleForm.valueDate"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="理财日期" prop="managementDate">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="ruleForm.managementDate"
            type="datetimerange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="描述" style="text-align:left;width:100%;" prop="description">
          <editor-bar v-model="ruleForm.description" :url="'admin/file/up/product'"></editor-bar>
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
import imgUpload from "@/components/upImg.vue";
import EditorBar from "@/components/wangEnduit";

export default {
  components: { imgUpload, EditorBar },
  data() {
    // 验证数字
    var check_shouyi = (rule, value, callback) => {
      if (+value < 0 || +value > 100) {
        callback(new Error("请输入0--100正数"));
      } else {
        let reg = /\./;
        if (reg.test("" + value)) {
          let val = ("" + value).split(".")[1];
          if (val.length > 4) {
            callback(new Error("最多输入4位！"));
            this.ruleForm.shouyi = (+value).toFixed(2);
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
    };

    // 验证递增金额
    var check_dizeng = (rule, value, callback) => {
      if (+value < 0 || +value >= 10000000) {
        callback(new Error("请输入0--10000000正数"));
      } else {
        this.ruleForm.dizeng = (+value).toFixed(2);
        callback();
      }
    };

    // 验证数字
    var check_qigou = (rule, value, callback) => {
      if (+value < 0 || +value > 100) {
        callback(new Error("请输入0--100正数"));
      } else {
        this.ruleForm.qigou = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var check_defaultAmount = (rule, value, callback) => {
      if (+value < 0 || +value > 100) {
        callback(new Error("请输入0--100正数"));
      } else {
        this.ruleForm.defaultAmount = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var check_yearRate = (rule, value, callback) => {
      if (+value < 0 || +value > 100) {
        callback(new Error("请输入0--100正数"));
      } else {
        this.ruleForm.yearRate = (+value).toFixed(2);
        callback();
      }
    };

    return {
      env: null,
      pageName: "", // 当前页面名字
      dictData: {}, // 字典数据
      xilie: [], // 从服务器返回的产品系列数据
      ruleForm: {
        quyu: "100000",
        institutionId: "", // 机构名称
        seriesId: "", // 产品系列
        productName: "", // 产品名称
        productFeature: "", // 产品特性
        shouyi: "", // 预期年化收益率
        qigou: "0.00", // 起购金额
        dizeng: "0.00", // 递增金额
        shengyuED: "", // 剩余额度
        fengxian: "", // 风险等级
        selfDefiningTags: [], // 自定义标签
        activityTags: [], // 活动标签
        currencyCode: "CNY", // 币种
        regulatoryProperty: "", // 监管属性
        sameProductFlag: "", // 同一产品标识
        listAreaFlag: "", // 榜单专区标识
        contentVersion: "", // 产品版本标识
        flowNum: "0", // 默认关注数量
        defaultAmount: "0.00", // 默认购买金额
        defaultNum: "0", // 默认购买笔数
        yearRate: "0.00", // 年收费率
        qixian: "", // 期限
        danwei: "1", // 期限单位
        deadlineAlias: "", // 期限别名
        raiseDate: "", // 募集日期
        valueDate: "", // 起息日期
        managementDate: "", // 理财日期
        description: "" // 描述
      },

      //表单验证
      rules: {
        institutionId: [
          { required: true, message: "请选择机构名称", trigger: "change" }
        ],
        productName: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        deadlineAlias: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        shouyi: [
          { validator: check_shouyi, trigger: "blur" },
          { required: true, message: "请输入预期年化收益率", trigger: "blur" }
        ],
        shengyuED: [
          { required: true, message: "请选择剩余额度", trigger: "change" }
        ],
        regulatoryProperty: [
          { required: true, message: "请选择监管属性", trigger: "change" }
        ],
        fengxian: [
          { required: true, message: "请选择风险等级", trigger: "change" }
        ],
        currencyCode: [
          { required: true, message: "请选择币种", trigger: "change" }
        ],
        qixian: [{ required: true, message: "请输入期限", trigger: "blur" }],
        quyu: [
          { required: true, message: "请选择产品区域", trigger: "change" }
        ],
        valueDate: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        managementDate: [
          { required: true, message: "请选择理财日期", trigger: "change" }
        ],
        raiseDate: [
          { required: true, message: "请选择募集日期", trigger: "change" }
        ],
        yearRate: [{ validator: check_yearRate, trigger: "blur" }],
        defaultAmount: [{ validator: check_defaultAmount, trigger: "blur" }],
        dizeng: [
          { validator: check_dizeng, trigger: "blur" },
          { required: true, message: "请输入递增金额", trigger: "blur" }
        ],
        qigou: [
          { validator: check_qigou, trigger: "blur" },
          { required: true, message: "请输入起购金额", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";

    if (sessionStorage.getItem("financing_http")) {
      this.pageName = sessionStorage.getItem("page") + " > 编辑产品第一步"; // 获取页面名称
      let editData = JSON.parse(sessionStorage.getItem("financing_http"));
      this.ruleForm = {
        quyu: editData.appInfo.areaCode,
        institutionId: editData.institutionId, // 机构名称
        seriesId: editData.seriesId, // 产品系列
        productName: editData.name, // 产品名称
        productFeature: editData.productFeature, // 产品特性
        shouyi: editData.interestRate, // 预期年化收益率
        qigou: editData.minAmount, // 起购金额
        dizeng: editData.increaseAmount, // 递增金额
        shengyuED: editData.surplusQuota, // 剩余额度
        fengxian: editData.riskLevel, // 风险等级
        selfDefiningTags: editData.selfDefiningTags.map(tar => tar.id), // 自定义标签
        activityTags: editData.activityTags.map(tar => tar.id), // 活动标签
        currencyCode: editData.currencyCode, // 币种
        regulatoryProperty: editData.regulatoryProperty, // 监管属性
        sameProductFlag: editData.appInfo.sameProductFlag, // 同一产品标识
        listAreaFlag: editData.appInfo.listAreaFlag, // 榜单专区标识
        contentVersion: editData.contentVersion, // 产品版本标识
        flowNum: editData.appInfo.defaultFlowNum, // 默认关注数量
        defaultAmount: editData.appInfo.defaultAmount, // 默认购买金额
        defaultNum: editData.appInfo.defaultBuyNum, // 默认购买笔数
        yearRate: editData.appInfo.yearRate, // 年收费率
        qixian: editData.deadline, // 期限
        danwei: editData.timeUnitType, // 期限单位
        deadlineAlias: editData.deadlineAlias, // 期限别名
        raiseDate: editData.sellingDate, // 募集日期
        valueDate: editData.valueDate, // 起息日期
        managementDate: editData.valueDates, // 理财日期
        description: editData.description // 描述
      };
    } else {
      this.pageName = sessionStorage.getItem("page") + " > 创建产品第一步"; // 获取页面名称
    }

    this.dictData = JSON.parse(sessionStorage.getItem("dict"));

    // 获取选定的机构
    let xilieData = JSON.parse(sessionStorage.getItem("select_xilie"));
    if (sessionStorage.getItem("financing_step1")) {
      // 从第二步跳过来的
      this.ruleForm = JSON.parse(sessionStorage.getItem("financing_step1"));
      this.change_xilie(this.ruleForm.institutionId, false);
    } else {
      if (sessionStorage.getItem("financing_http")) {
        this.change_xilie(this.ruleForm.institutionId, false);
      } else {
        this.change_xilie(xilieData.institutionId, false);
        // 第一次进入页面
        this.ruleForm.institutionId = xilieData.institutionId;
        if (xilieData.id) {
          // 选择了系列才会执行
          this.ruleForm.seriesId = xilieData.id;
        }
      }
    }
  },
  methods: {
    // 变更产品系列后，要保存选择的系列，等回到当前页面后数据能对应上
    setXiLie(data) {
      if (typeof data === "number") {
        let tar = this.xilie.filter(item => item.id === data);
        sessionStorage.setItem("select_xilie", JSON.stringify(tar[0]));
      } else {
        let xilieData = JSON.parse(sessionStorage.getItem("select_xilie")),
          obj = {
            institutionId: xilieData.institutionId,
            institutionName: xilieData.institutionName
          };
        sessionStorage.setItem("select_xilie", JSON.stringify(obj));
      }
    },
    // 变更机构后，要对应调整系列
    change_xilie(id, type) {
      // 根据机构id，获取对应的产品系列
      let xilieData = JSON.parse(sessionStorage.getItem("xilie_touzi"));
      this.xilie = xilieData.filter(
        item => item.institutionId === id
      )[0].seriesList;
      if (this.ruleForm.seriesId != "" && type) {
        this.ruleForm.seriesId = "";
      }
    },

    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 时间越早，数值越小
          // 起息日期
          let valueDate = new Date(this.ruleForm.valueDate);
          // 理财日期
          let managementDate1 = new Date(this.ruleForm.managementDate[0]);
          let managementDate2 = new Date(this.ruleForm.managementDate[1]);
          // 募集日期
          let raiseDate2 = new Date(this.ruleForm.raiseDate[1]);

          if (valueDate < managementDate1 || valueDate > managementDate2) {
            this.$message.error("起息日期应介于理财日期之间！");
            return;
          }
          if (valueDate < raiseDate2) {
            this.$message.error("起息日期应晚于募集日期！");
            return;
          }
          if (raiseDate2 > managementDate1) {
            this.$message.error("募集日期应早于理财日期！");
            return;
          }
          sessionStorage.setItem(
            "financing_step1",
            JSON.stringify(this.ruleForm)
          );
          this.$router.push({
            name: "financing_step2"
          });
        }
      });
    },
    // 取消
    back() {
      this.$router.push({
        name: "financing_mainPage"
      });
    }
  }
};
</script>