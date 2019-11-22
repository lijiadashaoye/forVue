<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
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
            filterable
            class="isInput"
            placeholder="请选择"
            v-model="ruleForm.institutionId"
            @change="change_xilie(ruleForm.institutionId,true)"
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
            filterable
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

        <el-form-item label="产品类别别名" class="is50" prop="typeAlias">
          <el-input class="isInput" clearable placeholder="请输入" v-model="ruleForm.typeAlias"></el-input>
        </el-form-item>

        <el-form-item label="期限别名" prop="deadlineAlias" class="is50">
          <el-input class="isInput" clearable placeholder="请输入" v-model="ruleForm.deadlineAlias"></el-input>
        </el-form-item>

        <el-form-item label="利率别名" class="is50" prop="interestRateAlias">
          <el-input
            class="isInput"
            clearable
            placeholder="请输入"
            v-model="ruleForm.interestRateAlias"
          ></el-input>
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

        <el-form-item prop="areaCode" label="所属区域" style="position:relative" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.areaCode"
          >
            <el-option
              size="mini"
              v-for="item in dictData.quyu"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="currencyCode" label="币种" style="position:relative" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.currencyCode"
          >
            <el-option
              size="mini"
              v-for="item in dictData.bizhong"
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
        </el-form-item>

        <el-form-item prop="interestMode" label="计息方式" style="position:relative" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.interestMode"
          >
            <el-option
              size="mini"
              v-for="item in dictData.interest_mode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="付息频率" style="position:relative" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.frequencyType"
          >
            <el-option
              size="mini"
              v-for="item in dictData.frequency_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="支取时间" class="is50" prop="payTime">
          <el-select
            filterable
            class="isInput"
            v-model="ruleForm.payTime"
            clearable
            placeholder="请选择"
          >
            <el-option
              size="mini"
              v-for="item in dictData.pay_time"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="剩余额度" prop="surplusQuota" class="is50">
          <el-select
            filterable
            class="isInput"
            v-model="ruleForm.surplusQuota"
            clearable
            placeholder="请选择"
          >
            <el-option
              size="mini"
              v-for="item in dictData.surplus_quota"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="监管属性" prop="regulatoryProperty" style="position:relative" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.regulatoryProperty"
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
            filterable
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
            filterable
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
            filterable
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

        <el-form-item label="递增金额" class="is50" prop="increaseAmount">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.increaseAmount"
            placeholder="请输入"
            type="number"
          ></el-input>
        </el-form-item>

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

        <el-form-item label="起购范围说明" style="text-align:left;width:100%;margin-right:30px;">
          <editor-bar v-model="ruleForm.amountRangeExplain" :url="'admin/file/up/product'"></editor-bar>
        </el-form-item>

        <el-form-item
          label="产品描述"
          prop="description"
          style="text-align:left;width:100%;margin-right:30px;"
        >
          <editor-bar v-model="ruleForm.description" :url="'admin/file/up/product'"></editor-bar>
        </el-form-item>
      </el-form>

      <div style="width:90%;margin:0 auto;padding-left:50px;">
        <addLiLv :addLiLvProp="addLiLvProp"></addLiLv>
      </div>

      <div class="nextButtons">
        <el-button size="mini" type="primary" @click="next">下一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="info" @click="back">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import EditorBar from "@/components/wangEnduit";
import addLiLv from "@/components/addLiLv.vue";

export default {
  components: { EditorBar, addLiLv },
  data() {
    // 验证数字
    var checkNum2 = (rule, value, callback) => {
      if (+value < 0 || +value > 100) {
        callback(new Error("请输入0--100"));
      } else if (("" + value).length > 10 || ("" + value).length < 0) {
        callback(new Error("请输入1-10字符"));
      } else {
        callback();
      }
    };
    // 验证数字
    var checkNum3 = (rule, value, callback) => {
      if (+value < 0 || +value >= 10000000 || !value) {
        callback(new Error("请输入0--10000000正数"));
      } else {
        this.ruleForm.increaseAmount = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var checkNum4 = (rule, value, callback) => {
      if (+value < 0 || !value || +value > 10000000) {
        callback(new Error("请输入0--10000000正数"));
      } else if (+value < +this.ruleForm.minAmount) {
        callback(new Error("不能小于最小起购额"));
      } else {
        this.ruleForm.maxAmount = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var checkNum5 = (rule, value, callback) => {
      if (+value < 0 || !value || +value > 10000000) {
        callback(new Error("请输入0--10000000正数"));
      } else if (+value > +this.ruleForm.maxAmount) {
        callback(new Error("不能大于最大起购额"));
      } else {
        this.ruleForm.minAmount = (+value).toFixed(2);
        callback();
      }
    };

    return {
      env: null,
      addLiLvProp: {}, // 传给利率表单的数据
      xilie: [], // 从服务器返回的产品系列数据
      pageName: "", // 当前页面名字
      dictData: {}, // 字典数据
      ruleForm: {
        institutionId: "", // 机构名称
        seriesId: "", // 产品系列ID
        name: "", // 产品名称
        minAmount: "", // 默认最小存款金额
        maxAmount: "", // 默认最大存款金额
        amountRangeExplain: "", // 默认存款金额说明
        typeAlias: "", // 产品类型（类别别名）
        deadlineAlias: "", // 期限别名
        payTime: "", // 支取时间
        interestMode: "", // 计息方式
        yearRate: "", //  年收费率
        increaseAmount: "", // 递增金额
        productTags: [], // 产品标签
        selfDefiningTags: [], // 自定义标签
        activityTags: [], // 活动标签
        regulatoryProperty: "", // 监管属性
        currencyCode: "CNY", // 币种编码
        contentVersion: "", // 内容版本号
        frequencyType: "", // 付息频率
        description: "", // 产品描述
        lilv: [], // 利率表格
        interestRateAlias: "", // 利率别名
        areaCode: "100000", // 所属区域
        surplusQuota: ""
      },

      //表单验证
      rules: {
        institutionId: [
          { required: true, message: "请选择机构名称", trigger: "blur" }
        ],
        surplusQuota: [
          { required: true, message: "请选择剩余额度", trigger: "change" }
        ],
        interestRateAlias: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        name: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" },
          { required: true, message: "请输入产品名称", trigger: "blur" }
        ],
        typeAlias: [
          { min: 1, max: 20, message: "最多输入20个字", trigger: "blur" }
        ],
        yearRate: [{ validator: checkNum2, trigger: "blur" }],
        deadlineAlias: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        increaseAmount: [
          { required: true, validator: checkNum3, trigger: "blur" }
        ],
        minAmount: [{ required: true, validator: checkNum5, trigger: "blur" }],
        maxAmount: [{ required: true, validator: checkNum4, trigger: "blur" }],

        areaCode: [
          { required: true, message: "请选择所属区域", trigger: "change" }
        ],
        currencyCode: [
          { required: true, message: "请选择币种", trigger: "change" }
        ],
        interestMode: [
          { required: true, message: "请选择计息方式", trigger: "change" }
        ],
        payTime: [
          { required: true, message: "请选择支取时间", trigger: "change" }
        ],
        regulatoryProperty: [
          { required: true, message: "请选择监管属性", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page") + " > 新增智能存款第一步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));

    // 获取选定的机构
    let jigouData = JSON.parse(sessionStorage.getItem("select_xilie"));

    if (sessionStorage.getItem("zhineng_step1")) {
      this.ruleForm = JSON.parse(sessionStorage.getItem("zhineng_step1"));
      this.change_xilie(this.ruleForm.institutionId, false);
    } else {
      this.change_xilie(jigouData.institutionId, false);
      this.ruleForm.institutionId = jigouData.institutionId;
      if (jigouData.id) {
        this.ruleForm.seriesId = jigouData.id;
      }
    }
    this.addLiLvProp = {
      isInput: false, // 记录表单是否发生数据输入
      lilv_data: this.ruleForm.lilv,
      num: this.ruleForm.lilv.length
        ? Math.max(...this.ruleForm.lilv.map(tar => tar.num)) + 1
        : 0
    };
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
      let xilieData = JSON.parse(sessionStorage.getItem("xilie_cunkuan"));
      this.xilie = xilieData.filter(
        item => item.institutionId === id
      )[0].seriesList;
      if (this.ruleForm.seriesId != "" && type) {
        this.ruleForm.seriesId = "";
      }
    },
    /*****************************************************************************************************/
    // 下一步
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.ruleForm.lilv.length) {
            if (this.addLiLvProp.isInput) {
              this.$confirm(
                `利率表单已经填过数据，但不完整，是否抛弃已填数据从而进入下一步？`
              )
                .then(() => {
                  sessionStorage.setItem(
                    "zhineng_step1",
                    JSON.stringify(this.ruleForm)
                  );
                  this.$router.push({
                    name: "zhineng_step2"
                  });
                })
                .catch(() => {});
            } else {
              sessionStorage.setItem(
                "zhineng_step1",
                JSON.stringify(this.ruleForm)
              );
              this.$router.push({
                name: "zhineng_step2"
              });
            }
          } else {
            this.$message.error("请填写利率数据！");
          }
        } else {
          this.$message.error("请正确填写表单数据！");
        }
      });
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
