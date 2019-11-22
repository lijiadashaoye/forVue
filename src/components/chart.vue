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
    <div v-else>
      <div class="chartWaper">
        <div>
          <div class="chartTop">
            <div>
              <span class="isChartTitleDate" title="以当日最后更新数据为准">{{today}}</span>
              <span style="vertical-align:9px;padding-left:2px;" class="isChartTitleDate">
                <i title="以当日最后更新数据为准" class="myIcon14px icon-wenhaoyuanyiwenxianxing"></i>
              </span>
            </div>
            <div>
              <el-button
                style="margin-top:10px;"
                type="warning"
                plain
                size="mini"
                @click="update"
              >更新今日</el-button>
              <br />
              <el-button size="mini" @click="toEditHistory" plain type="info">更新历史</el-button>
            </div>
          </div>
          <ve-line
            v-if="chartDatas"
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

      <div class="show_time" v-if="pageInfo">
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
        <el-button :disabled="isChange" @click="save" type="primary">更 新</el-button>
        <el-button @click="toClosebianjieDialog">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :close-on-click-modal="false"
      title="修改历史数据"
      :visible.sync="editHistory.show"
      width="520px"
      :before-close="closeHistory"
    >
      <div class="editDivTop">
        <p>按时间查询：</p>
        <el-date-picker
          size="mini"
          value-format="yyyy-MM-dd"
          v-model="editHistory.time"
          type="daterange"
          placeholder="选择日期"
        ></el-date-picker>
        <el-button size="mini" type="warning" @click="toEditHistory">查 询</el-button>
        <el-button size="mini" type="info" @click="resetHistory">重置</el-button>
      </div>
      <div class="editTit" v-if="editHistory.title.length">
        <p>时间</p>
        <p>{{editHistory.title[0]}}</p>
        <p>{{editHistory.title[1]}}</p>
      </div>
      <div class="editDiv" v-for="item in editHistory.list" :key="item.id">
        <label :class="editHistory.hasEdit.includes(item.id)?'itEdit':''">{{item.gmtModified}}</label>
        <el-input
          clearable
          placeholder="请输入"
          v-model="item.one"
          @input="hasEdit(item.id)"
          type="number"
          size="mini"
        ></el-input>
        <el-input
          clearable
          placeholder="请输入"
          v-model="item.two"
          @input="hasEdit(item.id)"
          type="number"
          size="mini"
        ></el-input>
      </div>

      <div slot="footer" class="dialog-footer dialogFooter">
        <el-pagination
          @current-change="handleSizeChange"
          small
          layout="prev, pager, next,jumper,total"
          :page-count="editHistory.pages"
          :pager-count="5"
        ></el-pagination>
        <div>
          <el-button @click="closeHistory" size="mini">取 消</el-button>
          <el-button
            :disabled="editHistory.hasEdit.length===0"
            @click="saveEditHistory"
            size="mini"
            type="primary"
          >保 存</el-button>
        </div>
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
    var checkNum2 = (rule, value, callback) => {
      if (+value <= 0 || +value > 100) {
        callback(new Error("请输入大于0小于100正数,"));
      } else {
        this.ruleForm.danweijingzhi = (+value).toFixed(4);
        callback();
      }
    };
    // 验证数字
    var checkNum3 = (rule, value, callback) => {
      if (+value <= 0 || +value > 100) {
        callback(new Error("请输入大于0小于100正数,"));
      } else {
        this.ruleForm.leijingjingzhi = (+value).toFixed(4);
        callback();
      }
    };
    return {
      chartSettings: null,
      pageInfo: null, // 页面用到的信息
      chartDatas: null,
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
      editHistory: {
        show: false,
        productUuid: "",
        list: [], // 数据列表
        hasEdit: [], // 发生数据变动的项
        pageSize: 14, // 分页相关
        pageNum: 1,
        pages: 0,
        total: 0,
        title: [],
        time: []
      },
      isChange: true, // 控制数据是否可以提交
      dialogLabel: [],
      stepsTop: null, // 步骤条数据
      showWhich: null, // 控制显示图表还是进度条
      rules: {
        danweijingzhi: [
          { validator: checkNum2, trigger: "blur" },
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
    this.editHistory.productUuid = this.pageData.id;
  },
  methods: {
    // 如果数据发生变动，就执行
    hasEdit(tar) {
      let isIn = this.editHistory.hasEdit.includes(tar);
      if (!isIn) {
        this.editHistory.hasEdit.push(tar);
      }
    },
    // 更新历史的分页变动
    handleSizeChange(e) {
      this.editHistory.pageNum = e;
      this.editHistory.hasEdit = [];
      this.toEditHistory();
    },
    // 重置更新历史的查询
    resetHistory() {
      this.editHistory.time = [];
      this.toEditHistory();
    },
    // 获取更新历史的列表数据
    toEditHistory() {
      let obj = {
        productUuid: this.editHistory.productUuid,
        pageSize: this.editHistory.pageSize, // 分页相关
        pageNum: this.editHistory.pageNum
      };
      if (this.editHistory.time.length) {
        obj.createTimeStart = this.editHistory.time[0];
        obj.createTimeEnd = this.editHistory.time[1];
      }
      switch (this.pageData.page) {
        case "money_fund": // 货币基金管理
          this.$api
            .toEditHistory({
              vm: this,
              url: "/product/monetaryFund/history/list",
              data: obj
            })
            .then(res => {
              this.editHistory.title = ["七日年化收益率", "万份收益"];
              this.editHistory.pages = +res.data.pages;
              this.editHistory.list = res.data.list.map(tar => {
                return {
                  id: tar.id,
                  one: tar.onThe7thOfTheYearYield, // 七日年化收益率
                  two: tar.thousandsOfYearsYields, // 万份收益
                  gmtModified: tar.gmtModified.split(" ")[0]
                };
              });
              if (this.editHistory.list.length) {
                return true;
              } else {
                return false;
              }
            })
            .then(res => {
              if (res) {
                this.editHistory.show = res;
              } else {
                this.$alert("没有历史数据，请先添加数据！", "提示", {
                  confirmButtonText: "确定"
                });
              }
            });
          break;
        case "pure_debt_fund": // 纯债
          this.$api
            .toEditHistory({
              vm: this,
              url: "/product/pureDebtFund/history/list",
              data: obj
            })
            .then(res => {
              this.editHistory.title = ["单位净值", "累计净值"];
              this.editHistory.pages = +res.data.pages;
              this.editHistory.list = res.data.list.map(tar => {
                return {
                  id: tar.id,
                  one: tar.netAssetValue, // 单位净值
                  two: tar.netAccumulateValue, // 累计净值
                  gmtModified: tar.gmtModified.split(" ")[0]
                };
              });
              if (this.editHistory.list.length) {
                return true;
              } else {
                return false;
              }
            })
            .then(res => {
              if (res) {
                this.editHistory.show = res;
              } else {
                this.$alert("没有历史数据，请先添加数据！", "提示", {
                  confirmButtonText: "确定"
                });
              }
            });
          break;
      }
    },
    // 保存更新
    saveEditHistory() {
      let arr = this.editHistory.hasEdit.map(tar => {
          return this.editHistory.list.filter(item => item.id == tar)[0];
        }),
        proArr = [];

      switch (this.pageData.page) {
        case "money_fund": // 货币基金管理
          arr.forEach(tar => {
            proArr.push(
              new Promise(resove => {
                resove(
                  this.$api.save_toEditHistory({
                    vm: this,
                    url: "/product/monetaryFund/updateHistory",
                    data: {
                      id: tar.id,
                      onThe7thOfTheYearYield: +tar.one,
                      thousandsOfYearsYields: +tar.two
                    }
                  })
                );
              })
            );
          });
          break;
        case "pure_debt_fund": // 纯债
          arr.forEach(tar => {
            proArr.push(
              new Promise(resove => {
                resove(
                  this.$api.save_toEditHistory({
                    vm: this,
                    url: "/product/pureDebtFund/updateHistory",
                    data: {
                      id: tar.id,
                      netAssetValue: +tar.one,
                      netAccumulateValue: +tar.two
                    }
                  })
                );
              })
            );
          });
          break;
      }
      Promise.all(proArr).then(res => {
        this.$message.success("更新成功！");
        this.editHistory.hasEdit = [];
        this.toEditHistory();
      });
    },
    update() {
      if (this.pageData.page === "money_fund") {
        // 货币基金管理
        this.ruleForm.title1 = "七日年化收益率";
        this.ruleForm.title2 = "万份收益";
      }
      // 纯债基金
      if (this.pageData.page === "pure_debt_fund") {
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
              who: res.data.lastModifierName
            };
            this.chartSettings = {
              axisSite: { left: ["七日年化收益率", "万份收益"] },
              legendName: {
                七日年化收益率: `七日年化收益率（${(+res.data
                  .availableOnThe7thOfTheYearYield).toFixed(4)}）`,
                万份收益: `万份收益（${(+res.data
                  .availableThousandsOfYearsYields).toFixed(4)}）`
              },
              area: true,
              yAxisType: ["0.0000"]
            };
            this.chartDatas = {
              columns: ["日期", "七日年化收益率", "万份收益"],
              rows: []
            };
            let kk = res.data.yieldList;
            for (let i = kk.length; i--; ) {
              this.chartDatas.rows.push({
                日期: kk[i].gmtCreated.split(" ")[0],
                七日年化收益率: +kk[i].onThe7thOfTheYearYield,
                万份收益: +kk[i].thousandsOfYearsYields
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
              who: res.data.lastModifierName
            };
            this.chartSettings = {
              axisSite: { left: ["单位净值", "累计净值"] },
              legendName: {
                单位净值: `单位净值（${(+res.data
                  .availableNetAssetValue).toFixed(4)}）`,
                累计净值: `累计净值（${(+res.data
                  .availableNetAccumulateValue).toFixed(4)}）`
              },
              area: true,
              yAxisType: ["0.0000"]
            };
            this.chartDatas = {
              columns: ["日期", "单位净值", "累计净值"],
              rows: []
            };
            let kk = res.data.pureDebtFundNetValueList;
            for (let i = kk.length; i--; ) {
              this.chartDatas.rows.push({
                日期: kk[i].gmtCreated.split(" ")[0],
                单位净值: +kk[i].netAssetValue,
                累计净值: +kk[i].netAccumulateValue
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
            case "wmp": //理财管理
              this.showWhich = 1;
              this.stepsTop = { ...this.pageData.forChart };
              break;
            case "wmp_insurance": //保险
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
    // 更新历史弹框的关闭
    closeHistory() {
      let id = this.editHistory.productUuid;
      if (this.editHistory.hasEdit.length > 0) {
        this.$confirm("是否提交更改过的数据？", "提示", {
          cancelButtonText: "不提交",
          confirmButtonText: "提  交",
          type: "warning"
        })
          .then(() => {
            this.saveEditHistory();
          })
          .catch(() => {
            this.editHistory = {
              show: false,
              productUuid: id,
              list: [], // 数据列表
              hasEdit: [], // 发生数据变动的项
              pageSize: 14, // 分页相关
              pageNum: 1,
              pages: 0,
              title: []
            };
          });
      } else {
        this.editHistory = {
          show: false,
          productUuid: id,
          list: [], // 数据列表
          hasEdit: [], // 发生数据变动的项
          pageSize: 14, // 分页相关
          pageNum: 1,
          pages: 0,
          title: []
        };
      }
      setTimeout(() => {
        switch (this.pageData.page) {
          case "money_fund": // 货币基金管理
            this.$emit("chartEmit", "huobi");
            break;
          case "pure_debt_fund": // 纯债
            this.$emit("chartEmit", "chunzhai");
            break;
        }
      });
    },
    // 保存更新数据
    save() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.pageData.page === "money_fund") {
            // 货币基金管理
            this.$api
              .post_shouyi({
                vm: this,
                data: {
                  productUuid: this.pageData.id,
                  onThe7thOfTheYearYield: (+this.ruleForm
                    .danweijingzhi).toFixed(4),
                  thousandsOfYearsYields: (+this.ruleForm
                    .leijingjingzhi).toFixed(4)
                }
              })
              .then(res => {
                if (res) {
                  setTimeout(() => {
                    this.toClosebianjieDialog();
                    this.$emit("chartEmit", "huobi");
                  }, 500);
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
                  setTimeout(() => {
                    this.toClosebianjieDialog();
                    this.$emit("chartEmit", "chunzhai");
                  }, 500);
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
