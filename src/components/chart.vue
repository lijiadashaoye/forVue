<template>
  <div id="chartWap">
    <!-- 步骤条 -->
    <div v-if="showWhich===1">
      <p class="stepsTopsP">交易规则</p>
      <ul class="stepsTops">
        <li v-for="(item,index) in stepsTop.table" :key="index">
          <span>{{item.title}}</span>
          <span>{{item.num}}</span>
        </li>
      </ul>
      <el-steps :active="stepsTop.steps.length" align-center>
        <el-step
          v-for="(item,index) in stepsTop.steps"
          :key="index"
          :title="item.title"
          :description="item.text"
        ></el-step>
      </el-steps>
    </div>
    <!-- 图表 -->
    <div v-if="showWhich===2">
      <div class="chartWaper">
        <div>
          <div class="chartTop">
            <div>
              <span class="isChartTitleDate" title="以当日最后更新数据为准">今日:{{today}}</span>
            </div>
            <el-button style="margin-top:10px;" size="mini" @click="update">更新</el-button>
          </div>
          <ve-line
            :data="chartDatas"
            :settings="chartSettings"
            v-bind="{'height': '415px','width':'101%'}"
          ></ve-line>
        </div>
        <div>
          <el-radio-group
            v-model="radioBtn.checked"
            size="mini"
            class="radioGroup"
            @change="changeFn($event)"
          >
            <el-radio-button
              class="setRadioBtn"
              v-for="(item,index) in radioBtn.buttons"
              :key="index"
              :label="item.name"
            ></el-radio-button>
          </el-radio-group>
        </div>
      </div>

      <div class="show_time">
        <span class="isUpTime">
          更新时间：
          {{pageInfo.createTime}}&nbsp;
          {{pageInfo.who}}
        </span>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="编辑"
      :visible.sync="bianjieDialog"
      width="400px"
      :before-close="toClosebianjieDialog"
    >
      <el-form
        :inline="true"
        size="normal"
        :rules="rules"
        ref="ruleForm"
        :model="ruleForm"
        label-width="130px"
      >
        <el-form-item :label="ruleForm.title1" prop="danweijingzhi">
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.danweijingzhi"
            @input="isChange=false"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item :label="ruleForm.title2" prop="leijingjingzhi">
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.leijingjingzhi"
            @input="isChange=false"
            type="number"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :disabled="isChange" @click="save()" type="primary">更 新</el-button>
        <el-button @click="toClosebianjieDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import VeLine from "v-charts/lib/line.common";
import Vue from "vue";

export default {
  props: ["pageData"],
  data() {
    // 验证数字
    var checkNum3 = (rule, value, callback) => {
      if (value > 100) {
        callback(new Error("不能超过100"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 10 || ("" + value).length < 0) {
        callback(new Error("请输入1-10字符"));
      } else {
        callback();
      }
    };
    return {
      chartSettings: null,
      pageInfo: null, // 页面用到的信息
      chartDatas: {},
      radioBtn: {
        buttons: [
          {
            id: 0,
            name: "最近一个月"
          },
          {
            id: 1,
            name: "最近一季"
          },
          {
            id: 2,
            name: "最近半年"
          },
          {
            id: 3,
            name: "最近一年"
          },
          {
            id: 4,
            name: "今年"
          }
        ],
        checked: "最近一个月"
      },
      today: "", // 记录页面打开日期
      bianjieDialog: false, // 更新弹框
      ruleForm: {
        danweijingzhi: "",
        leijingjingzhi: "",
        title1: "",
        title2: ""
      },
      isChange: true, // 控制数据是否可以提交
      dialogLabel: [],
      stepsTop: null, // 步骤条数据
      showWhich: null, // 控制显示图表还是进度条
      rules: {
        danweijingzhi: [
          { validator: checkNum3, trigger: "blur" },
          { required: true, message: "请输入", trigger: "blur" }
        ],
        leijingjingzhi: [
          { validator: checkNum3, trigger: "blur" },
          { required: true, message: "请输入", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    Vue.component(VeLine.name, VeLine);
    this.today = new Date().toLocaleDateString();
    this.changeFn(this.radioBtn.checked);
  },
  methods: {
    update() {
      if (this.pageData.page === "manage_money_matters") {
        // 货币基金管理
        this.ruleForm.title1 = "七日年化收益率";
        this.ruleForm.title2 = "万分年化收益率";
      } else {
        this.ruleForm.title1 = "单位净值";
        this.ruleForm.title2 = "累计净值";
      }
      this.bianjieDialog = true;
    },
    get_shouyi(data) {
      this.$api
        .get_huobi_chartData({
          vm: this,
          id: this.pageData.id,
          time: data.id
        })
        .then(res => {
          if (res) {
            this.pageInfo = {
              createTime: res.data.lastModifyTime,
              who: res.data.lastModifier
            };
            this.chartSettings = {
              axisSite: { left: ["七日年化收益率", "万分年化收益率"] },
              legendName: {
                七日年化收益率: `七日年化收益率（${res.data.availableOnThe7thOfTheYearYield}）`,
                万分年化收益率: `万分年化收益率${res.data.availableThousandsOfYearsYields}）`
              },
              area: true
            };
            this.chartDatas = {
              columns: ["日期", "七日年化收益率", "万分年化收益率"],
              rows: []
            };
            let kk = res.data.yieldList;
            for (let i = kk.length; i--; ) {
              this.chartDatas.rows.push({
                日期: kk[i].gmtCreated.split(" ")[0],
                七日年化收益率: kk[i].onThe7thOfTheYearYield,
                万分年化收益率: kk[i].thousandsOfYearsYields
              });
            }
            this.showWhich = 2;
          }
        });
    },
    // 获取净值图表数据
    get_jingzhi(data) {
      this.$api
        .get_jingzhi({
          vm: this,
          id: this.pageData.id,
          time: data.id
        })
        .then(res => {
          if (res) {
            this.pageInfo = {
              createTime: res.data.lastModifyTime,
              who: res.data.lastModifier
            };
            this.chartSettings = {
              axisSite: { left: ["单位净值", "累计净值"] },
              legendName: {
                单位净值: `单位净值（${res.data.availableNetAssetValue}）`,
                累计净值: `累计净值（${res.data.availableNetAccumulateValue}）`
              },
              area: true
            };
            this.chartDatas = {
              columns: ["日期", "单位净值", "累计净值"],
              rows: []
            };
            let kk = res.data.pureDebtFundNetValueList;
            for (let i = kk.length; i--; ) {
              this.chartDatas.rows.push({
                日期: kk[i].gmtCreated.split(" ")[0],
                单位净值: kk[i].netAssetValue,
                累计净值: kk[i].netAccumulateValue
              });
            }
            this.showWhich = 2;
          }
        });
    },
    // 切换图表
    changeFn(da) {
      wap: for (let i = this.radioBtn.buttons.length; i--; ) {
        if (this.radioBtn.buttons[i].name === da) {
          switch (this.pageData.page) {
            case "money_fund": // 货币基金管理
              this.get_shouyi(this.radioBtn.buttons[i]);
              break;
            case "pure_debt_fund": // 纯债
              this.get_jingzhi(this.radioBtn.buttons[i]);
              break;
            case "manage_money_matters": //理财管理
              this.showWhich = 1;
              this.stepsTop = { ...this.pageData.forChart };
              break;
          }
          break wap;
        }
      }
    },
    // 关闭弹框
    toClosebianjieDialog() {
      this.bianjieDialog = false;
      this.isChange = true;
      this.ruleForm = {
        danweijingzhi: "",
        leijingjingzhi: "",
        title1: "",
        title2: ""
      };
    },
    // 保存更新数据
    save() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.pageData.page === "manage_money_matters") {
            // 货币基金管理
            this.$api
              .post_shouyi({
                vm: this,
                data: {
                  productUuid: this.pageData.id,
                  onThe7thOfTheYearYield: this.ruleForm.danweijingzhi,
                  thousandsOfYearsYields: this.ruleForm.leijingjingzhi
                }
              })
              .then(res => {
                if (res) {
                  this.toClosebianjieDialog();
                  this.$emit("chartEmit", "huobi");
                }
              });
          } else {
            this.$api
              .post_jingzhi({
                vm: this,
                data: {
                  productUuid: this.pageData.id,
                  netAssetValue: this.ruleForm.danweijingzhi,
                  netAccumulateValue: this.ruleForm.leijingjingzhi
                }
              })
              .then(res => {
                if (res) {
                  this.toClosebianjieDialog();
                  this.$emit("chartEmit", "chunzhai");
                }
              });
          }
        } else {
          this.$message.error("请输入完整数据！");
        }
      });
    }
  }
};
</script>
<style>
@import url("./allCss.scss");
</style>
