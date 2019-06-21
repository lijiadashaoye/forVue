<template>
  <div style="overflow-y:auto">

    <!-- 纯债基金管理 -->
    <div
      class="buju"
      v-if='pageData.page==="pure_debt_fund"'
    >
      <div>
        <div v-if="pageData.forProduct">
          <baseinfo
            :pageData='pageData'
            @reGetData='reGetData'
          />
        </div>
        <div v-if="pageData.forChart">
          <chart :pageData='pageData' />
        </div>
        <div>
          <div class="table_top">
            <div>
              <span class="guizeTitle">
                历史业绩
              </span>
            </div>
            <el-button
              size="mini"
              @click="toUpdate"
            >
              更新
            </el-button>
          </div>
          <div v-if="pageData.forForm">
            <forms
              :type='"lishi"'
              :pageData='pageData'
            />
          </div>
        </div>
      </div>
      <div>
        <simple :pageData='pageData' />

        <div class="table_top">
          <div>
            <span class="guizeTitle">
              交易规则
            </span>
            <!-- <span
              class="isQuestion"
              title='有疑问？'
            >
              <i class="fa fa-question-circle-o"></i>
            </span> -->
          </div>
          <el-button
            size="mini"
            @click="add_guize"
          >
            新增规则
          </el-button>
        </div>
        <div v-if="pageData.forForm">
          <forms
            :type='"rengou"'
            :pageData='pageData'
          />
          <forms
            :type='"shengou"'
            :pageData='pageData'
          />
          <forms
            :type='"shuhui"'
            :pageData='pageData'
          />
        </div>
      </div>
    </div>
    <!-- 货币基金管理 -->
    <div
      class="buju"
      v-if='pageData.page==="money_fund"'
    >
      <div>
        <div>
          <baseinfo :pageData='pageData' />
        </div>
        <div>

        </div>

      </div>

      <div>
        <simple :pageData='pageData' />
        <chart :pageData='pageData' />
      </div>
    </div>
    <!-- 理财管理 -->
    <div
      class="buju"
      v-if='pageData.page==="manage_money_matters"'
    >
      <div>
        <div>
          <baseinfo :pageData='pageData' />
        </div>
        <div>

        </div>

      </div>

      <div>
        <simple :pageData='pageData' />
        <chart :pageData='pageData' />
      </div>
    </div>
    <!-- 存款管理 -->
    <div
      class="buju"
      v-if='pageData.page==="deposit"'
    >
      <div>
        <div>
          <baseinfo :pageData='pageData' />
        </div>
        <div>

        </div>

      </div>

      <div>
        <simple :pageData='pageData' />
      </div>
    </div>
    <!-- 机构管理 -->
    <div v-if='pageData.page==="organizational"'>
      <jigou :pageData='pageData' />

      <el-radio-group
        v-model="checkTable"
        size="mini"
        @change="changeFn"
      >
        <el-radio-button
          v-for='(item,index) in checkList'
          :key="index"
          :label="item.name"
        ></el-radio-button>
      </el-radio-group>

      <forms
        :type='"jigou"'
        id='forTable'
      />

    </div>

    <!-- 基金公司管理 -->
    <div v-if='pageData.page==="fund_company"'>
      <jigou :pageData='pageData' />

      <el-radio-group
        v-model="checkTable"
        size="mini"
        @change="changeFn"
      >
        <el-radio-button
          v-for='(item,index) in checkList'
          :key="index"
          :label="item.name"
        ></el-radio-button>
      </el-radio-group>

      <forms :type='"jijin"' />
    </div>

    <el-dialog :close-on-click-modal='false'
      title="新增交易规则"
      :visible.sync="newGuiZe"
      width="600px"
      :before-close="toCloseNewGuiZeDialog"
    >
      <p style="margin:0 0 5px 0;font-weight:bold;">请选择添加的规则类型：</p>
      <el-form
        v-if='ruleForm'
        size="normal"
        :model="ruleForm"
        label-width="90px"
        class="demo-form-inline"
      >

        <el-form-item
          v-show="isToShow('feilvleixing')"
          size="mini"
          label="费率类型:"
          style="margin:0;width:100%;"
        >
          <el-radio-group
            v-model="ruleForm.feilvleixing"
            @change="toSetFormType"
          >
            <el-radio-button label="认购"></el-radio-button>
            <el-radio-button label="申购"></el-radio-button>
            <el-radio-button label="赎回"></el-radio-button>
          </el-radio-group>

        </el-form-item>

        <el-form-item
          v-show="isToShow('jine')"
          label="金额:"
          style="margin:0;"
        >
          <div class="toInline">
            <el-input
              size='mini'
              clearable
              v-model="ruleForm.jine.num"
              placeholder="最小金额"
              @input="isChange=false"
            ></el-input>&nbsp;&nbsp;
            <el-select
              size='mini'
              v-model="ruleForm.jine.unit"
              clearable
              placeholder="请选择"
              @change="isChange=false"
            >
              <el-option
                size='mini'
                v-for="item in trade_rules.money"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>&nbsp;&nbsp;
            <el-select
              size='mini'
              clearable
              placeholder="请选择"
              v-model="ruleForm.jine.more"
              @change="isChange=false"
            >
              <el-option
                size='mini'
                v-for="item in trade_rules.limit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item
          v-show="isToShow('jiaoyijine')"
          label="交易金额:"
          style="margin:0;"
        >
          <div class="toInline">

            <el-select
              size='mini'
              clearable
              placeholder="请选择"
              v-model="ruleForm.jiaoyijine.more"
              @change="isChange=false"
            >
              <el-option
                size='mini'
                v-for="item in trade_rules.limit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>&nbsp;&nbsp;
            <el-input
              size='mini'
              clearable
              v-model="ruleForm.jiaoyijine.num"
              placeholder="最大金额"
              @input="isChange=false"
            ></el-input>&nbsp;&nbsp;
            <el-select
              size='mini'
              clearable
              placeholder="请选择"
              v-model="ruleForm.jiaoyijine.unit"
              @change="isChange=false"
            >
              <el-option
                size='mini'
                v-for="item in trade_rules.money"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item
          v-show="isToShow('shuhui')"
          label="赎回期限:"
          style="margin:0;"
        >
          <div class="toInline">
            <el-input
              size='mini'
              clearable
              v-model="ruleForm.shuhui.num"
              placeholder="最小天数"
              @input="isChange=false"
            ></el-input>&nbsp;&nbsp;
            <el-select
              size='mini'
              v-model="ruleForm.shuhui.unit"
              clearable
              placeholder="请选择"
              @change="isChange=false"
            >
              <el-option
                size='mini'
                v-for="item in trade_rules.money"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item
          v-show="isToShow('shuhuiTian')"
          label="赎回天数:"
          style="margin:0;"
        >
          <div class="toInline">

            <el-select
              size='mini'
              clearable
              placeholder="请选择"
              v-model="ruleForm.shuhuiTian.num"
              @change="isChange=false"
            >
              <el-option
                size='mini'
                v-for="item in trade_rules.limit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            &nbsp;&nbsp;
            <el-input
              size='mini'
              clearable
              v-model="ruleForm.shuhuiTian.unit"
              placeholder="最大金额"
              @input="isChange=false"
            ></el-input>
          </div>
        </el-form-item>

        <el-form-item
          v-show="isToShow('feilv')"
          label="费率:"
          style="margin:0;"
        >
          <el-input
            size="mini"
            clearable
            placeholder="请输入"
            v-model="ruleForm.feilv"
            style="width:calc(100% - 15px);"
            @input="isChange=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item
          v-show="isToShow('zhekou')"
          label="费率折扣:"
          style="margin:0;"
        >
          <el-input
            style="width:calc(100% - 15px);"
            size="mini"
            clearable
            placeholder="请输入"
            v-model="ruleForm.zhekou"
            @input="isChange=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item
          v-show="isToShow('danbi')"
          label="单笔费用:"
          style="margin:0;"
        >
          <el-input
            size="mini"
            clearable
            placeholder="请输入"
            v-model="ruleForm.danbi"
            @input="isChange=false"
          ></el-input>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          :disabled="isChange"
          @click="save()"
          type="primary"
        >保 存</el-button>
        <el-button @click="toCloseNewGuiZeDialog">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :close-on-click-modal='false'
      title="更新业绩"
      :visible.sync="newGuiZe1"
      width="450px"
      :before-close="toCloseNewGuiZeDialog"
    >
      <el-form
        v-if='ruleForm1'
        size="normal"
        :model="ruleForm1"
        label-width="110px"
      >

        <el-form-item
          label="单日涨幅:"
          style="margin:0;"
        >
          <el-input
            type="number"
            size="mini"
            clearable
            placeholder="请输入"
            v-model="ruleForm1.danri"
            style="width:calc(100% - 30px);"
            @input="isChange=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item
          label="近三个月涨幅:"
          style="margin:0;"
        >
          <el-input
            type="number"
            size="mini"
            clearable
            placeholder="请输入"
            v-model="ruleForm1.sanyue"
            style="width:calc(100% - 30px);"
            @input="isChange=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item
          label="近六个月涨幅:"
          style="margin:0;"
        >
          <el-input
            type="number"
            size="mini"
            clearable
            placeholder="请输入"
            v-model="ruleForm1.liuyue"
            style="width:calc(100% - 30px);"
            @input="isChange=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item
          label="近一年月涨幅:"
          style="margin:0;"
        >
          <el-input
            type="number"
            size="mini"
            clearable
            placeholder="请输入"
            v-model="ruleForm1.yinian"
            style="width:calc(100% - 30px);"
            @input="isChange1=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          :disabled="isChange"
          @click="save1()"
          type="primary"
        >更 新</el-button>
        <el-button @click="toCloseNewGuiZeDialog">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import baseinfo from "./baseInfo.vue";
import chart from "./chart.vue";
import forms from "./forms.vue";
import simple from "./simple.vue";
import jigou from "./jigou.vue";

export default {
  props: {
    pageData: Object
  },
  components: {
    baseinfo,
    chart,
    forms,
    simple,
    jigou
  },
  data() {
    return {
      pageType: null,
      checkTable: null,
      checkList: [], // 用来切换表单
      newGuiZe: false, // 新增规则弹框
      newGuiZe1: false, // 历史业绩弹框
      trade_rules: {}, // 交易规则里用到的
      ruleForm: {
        // 更新按钮弹出框
        feilvleixing: "",
        jine: {
          num: "",
          unit: "",
          more: ""
        },
        jiaoyijine: {
          num: "",
          unit: "",
          more: ""
        },
        shuhui: {
          num: "",
          unit: ""
        },
        shuhuiTian: {
          num: "",
          unit: ""
        },
        feilv: "",
        zhekou: "",
        danbi: ""
      },
      ruleForm1: {
        // 历史业绩的更新
        danri: "",
        sanyue: "",
        liuyue: "",
        yinian: ""
      },
      isChange: true, // 控制数据是否可以提交
      show: ["feilvleixing"] // 用来控制显示哪些表单选项
    };
  },
  mounted() {
    let page = this.pageData.page;
    let dict = JSON.parse(sessionStorage.getItem("dict"));
    this.trade_rules = {
      money: dict.monetary_unit,
      limit: dict.rule_symbol
    };

    if (page === "organizational") {
      this.checkList = [
        {
          id: "0",
          name: "纯债基金"
        },
        {
          id: "1",
          name: "货币基金"
        },
        {
          id: "2",
          name: "理财产品"
        },
        {
          id: "3",
          name: "存款产品"
        }
      ];
      this.checkTable = this.checkList[0].name;
    }
    if (page === "fund_company") {
      this.checkList = [
        {
          id: "0",
          name: "纯债基金"
        },
        {
          id: "1",
          name: "货币基金"
        }
      ];
      this.checkTable = this.checkList[0].name;
    }
    this.reGetData();
  },
  methods: {
    // 获取页面的各种数据
    reGetData() {
      // fff
      this.$api
        .getChunZhaiInfo({
          vm: this,
          id: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "forProduct", null);
            this.$set(this.pageData, "forChart", null);
            this.$set(this.pageData, "forForm", null);

            console.log("res.data", res.data);
            console.log("认购", res.data.subscribeList);
            console.log("申购", res.data.applyForPurchaseList);
            console.log("赎回", res.data.redemptionList);

            setTimeout(() => {
              this.$set(this.pageData, "forProduct", {
                title: res.data.name, // 上标题(产品名称)
                id: res.data.id, // 列表id
                name: res.data.institutionName, // 机构
                jigouId: res.data.institutionId, // 机构id
                logo:
                  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551783667609&di=968aba5a1957ab1d7c552e6a8b6cc769&imgtype=0&src=http%3A%2F%2Fimg2.woyaogexing.com%2F2018%2F01%2F20%2Fa17016d0a174e3b4%2521400x400_big.jpg",
                jijingongsi: res.data.fundHouseName, // 基金公司
                jijingongsiID: res.data.fundHouseId, // 基金公司id
                daima: res.data.code, // 基金代码
                rizhangfu: res.data.dailyIncrease, // 日涨幅
                jiaoyizhuangtai: res.data.statusName, // 交易状态显示名
                jiaoyizhuangtaiStatus: res.data.status, // 交易状态
                shangjia: res.data.appInfo.shelve === "YES" ? "是" : "否", // 是否上架
                mianqian:
                  res.data.appInfo.visaInterview === "YES" ? "是" : "否", // 是否面签
                tuijian: res.data.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
                paihang: res.data.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
                bishu: res.data.appInfo.defaultNum, // 默认购买笔数
                morenjine: res.data.appInfo.defaultAmount, // 默认购买金额
                chanpinID: res.data.appInfo.productId, // 产品id
                createTime: "2018-7-6 10:03", // 创建时间
                who: "张飞 " // 创建人
              });
              this.$set(this.pageData, "forChart", {
                chartData: {
                  data0: {
                    columns: ["日期", "单位净值", "累计净值"],
                    rows: [
                      {
                        日期: "1/1",
                        单位净值: 1393,
                        累计净值: 1093
                      },
                      {
                        日期: "1/2",
                        单位净值: 3530,
                        累计净值: 3230
                      },
                      {
                        日期: "1/3",
                        单位净值: 2923,
                        累计净值: 2623
                      },
                      {
                        日期: "1/4",
                        单位净值: 1723,
                        累计净值: 1423
                      },
                      {
                        日期: "1/5",
                        单位净值: 3792,
                        累计净值: 3492
                      },
                      {
                        日期: "1/6",
                        单位净值: 4593,
                        累计净值: 4293
                      }
                    ]
                  },
                  data1: {
                    columns: ["日期", "单位净值", "累计净值"],
                    rows: [
                      {
                        日期: "1/1",
                        单位净值: 345,
                        累计净值: 324
                      },
                      {
                        日期: "1/2",
                        单位净值: 345,
                        累计净值: 45
                      },
                      {
                        日期: "1/3",
                        单位净值: 1115,
                        累计净值: 777
                      },
                      {
                        日期: "1/4",
                        单位净值: 45345,
                        累计净值: 123
                      },
                      {
                        日期: "1/5",
                        单位净值: 224,
                        累计净值: 44
                      },
                      {
                        日期: "1/6",
                        单位净值: 8789,
                        累计净值: 11
                      }
                    ]
                  },
                  data2: {
                    columns: ["日期", "单位净值", "累计净值"],
                    rows: [
                      {
                        日期: "1/1",
                        单位净值: 4534,
                        累计净值: 345
                      },
                      {
                        日期: "1/2",
                        单位净值: 4498,
                        累计净值: 3453
                      },
                      {
                        日期: "1/3",
                        单位净值: 34345,
                        累计净值: 98
                      },
                      {
                        日期: "1/4",
                        单位净值: 6987,
                        累计净值: 1423
                      },
                      {
                        日期: "1/5",
                        单位净值: 3792,
                        累计净值: 321
                      },
                      {
                        日期: "1/6",
                        单位净值: 4593,
                        累计净值: 786
                      }
                    ]
                  },
                  data3: {
                    columns: ["日期", "单位净值", "累计净值"],
                    rows: [
                      {
                        日期: "1/1",
                        单位净值: 65455,
                        累计净值: 324
                      },
                      {
                        日期: "1/2",
                        单位净值: 3445,
                        累计净值: 45
                      },
                      {
                        日期: "1/3",
                        单位净值: 3115,
                        累计净值: 777
                      },
                      {
                        日期: "1/4",
                        单位净值: 544,
                        累计净值: 123
                      },
                      {
                        日期: "1/5",
                        单位净值: 45345,
                        累计净值: 44
                      },
                      {
                        日期: "1/6",
                        单位净值: 324,
                        累计净值: 11
                      }
                    ]
                  },
                  data4: {
                    columns: ["日期", "单位净值", "累计净值"],
                    rows: [
                      {
                        日期: "1/1",
                        单位净值: 4345,
                        累计净值: 324
                      },
                      {
                        日期: "1/2",
                        单位净值: 43534,
                        累计净值: 45
                      },
                      {
                        日期: "1/3",
                        单位净值: 3333,
                        累计净值: 777
                      },
                      {
                        日期: "1/4",
                        单位净值: 6345,
                        累计净值: 123
                      },
                      {
                        日期: "1/5",
                        单位净值: 3454,
                        累计净值: 44
                      },
                      {
                        日期: "1/6",
                        单位净值: 3534,
                        累计净值: 11
                      }
                    ]
                  }
                },
                createTime: "2019-2-22 10:11",
                who: "赵云",
                chartList: [
                  {
                    id: "0",
                    name: "最近一个月"
                  },
                  {
                    id: "1",
                    name: "最近一季"
                  },
                  {
                    id: "2",
                    name: "最近半年"
                  },
                  {
                    id: "3",
                    name: "最近一年"
                  },
                  {
                    id: "4",
                    name: "今年"
                  }
                ]
              });
              this.$set(this.pageData, "forForm", {
                lishi: {
                  handle: null,
                  tableTitle: [
                    {
                      title: "日期",
                      key: "date",
                      minWidth: "80"
                    },
                    {
                      title: "张跌幅",
                      key: "zhangdie",
                      minWidth: "80"
                    }
                  ],
                  tableData: [
                    {
                      date: "单日",
                      zhangdie: res.data.performanceList[0].oneDayIncrease
                        ? res.data.performanceList[0].oneDayIncrease > 0
                          ? "+" +
                            res.data.performanceList[0].oneDayIncrease +
                            "%"
                          : res.data.performanceList[0].oneDayIncrease + "%"
                        : ""
                    },
                    {
                      date: "近三个月",
                      zhangdie: res.data.performanceList[0].threeMonthIncrease
                        ? res.data.performanceList[0].threeMonthIncrease > 0
                          ? "+" +
                            res.data.performanceList[0].threeMonthIncrease +
                            "%"
                          : res.data.performanceList[0].threeMonthIncrease + "%"
                        : ""
                    },
                    {
                      date: "近六个月",
                      zhangdie: res.data.performanceList[0].sixMonthIncrease
                        ? res.data.performanceList[0].sixMonthIncrease > 0
                          ? "+" +
                            res.data.performanceList[0].sixMonthIncrease +
                            "%"
                          : res.data.performanceList[0].sixMonthIncrease + "%"
                        : ""
                    },
                    {
                      date: "近一年",
                      zhangdie: res.data.performanceList[0].oneYearIncrease
                        ? res.data.performanceList[0].oneYearIncrease > 0
                          ? "+" +
                            res.data.performanceList[0].oneYearIncrease +
                            "%"
                          : res.data.performanceList[0].oneYearIncrease + "%"
                        : ""
                    }
                  ],
                  createTime: "2018-7-6 10:03",
                  who: "马超",
                  id: res.data.performanceList[0].id,
                  fundId: res.data.performanceList[0].fundId
                },
                rengou: {
                  handle: {
                    minWidth: "122",
                    fixed: "right",
                    custom: [
                      {
                        text: "编辑",
                        type: "primary",
                        size: "mini",
                        emit: "updata",
                        plain: true
                      },
                      {
                        text: "删除",
                        type: "danger",
                        size: "mini",
                        emit: "delete",
                        plain: true
                      }
                    ]
                  },
                  tableTitle: [
                    {
                      title: "ID",
                      key: "id",
                      minWidth: "60"
                    },
                    {
                      title: "金额",
                      key: "jine",
                      minWidth: "215"
                    },
                    {
                      title: "费率",
                      key: "feilv",
                      minWidth: "55"
                    },
                    {
                      title: "单笔费用",
                      key: "danbi",
                      minWidth: "70"
                    },
                    {
                      title: "优惠折扣",
                      key: "youhui",
                      minWidth: "70"
                    }
                  ],
                  tableData: [
                    {
                      id: "e",
                      jine: "0.01元<交易金额<10000.00元",
                      feilv: "0.4%",
                      danbi: "1,000",
                      youhui: "80%"
                    }
                  ]
                },
                shengou: {
                  handle: {
                    minWidth: "122",
                    fixed: "right",
                    custom: [
                      {
                        text: "编辑",
                        type: "primary",
                        size: "mini",
                        emit: "updata",
                        plain: true
                      },
                      {
                        text: "删除",
                        type: "danger",
                        size: "mini",
                        emit: "delete",
                        plain: true
                      }
                    ]
                  },
                  tableTitle: [
                    {
                      title: "ID",
                      key: "id",
                      minWidth: "60"
                    },
                    {
                      title: "金额",
                      key: "jine",
                      minWidth: "215"
                    },
                    {
                      title: "费率",
                      key: "feilv",
                      minWidth: "60"
                    },
                    {
                      title: "单笔费用",
                      key: "danbi",
                      minWidth: "70"
                    },
                    {
                      title: "优惠折扣",
                      key: "youhui",
                      minWidth: "70"
                    }
                  ],
                  tableData: [
                    {
                      id: "232",
                      jine: "0.01元<交易金额<10000.00元",
                      feilv: "0.4%",
                      danbi: "1,000",
                      youhui: "80%"
                    }
                  ]
                },
                shuhui: {
                  handle: {
                    minWidth: "122",
                    fixed: "right",
                    custom: [
                      {
                        text: "编辑",
                        type: "primary",
                        size: "mini",
                        emit: "updata",
                        plain: true
                      },
                      {
                        text: "删除",
                        type: "danger",
                        size: "mini",
                        emit: "delete",
                        plain: true
                      }
                    ]
                  },
                  tableTitle: [
                    {
                      title: "ID",
                      key: "id",
                      minWidth: "55"
                    },
                    {
                      title: "期限",
                      key: "qixian",
                      minWidth: "160"
                    },
                    {
                      title: "费率",
                      key: "feilv",
                      minWidth: "55"
                    },
                    {
                      title: "单笔费用",
                      key: "danbi",
                      minWidth: "70"
                    },
                    {
                      title: "优惠折扣",
                      key: "youhui",
                      minWidth: "70"
                    }
                  ],
                  tableData: [
                    {
                      id: "232",
                      qixian: "10天<赎回天数<30天",
                      feilv: "0.4%",
                      danbi: "1,000",
                      youhui: "80%"
                    }
                  ]
                }
              });
            }, 0);
          }
        });
    },
    // 新增规则
    add_guize() {
      this.newGuiZe = true;
    },
    // 用来判断当前页需要显示的表单项
    isToShow(name) {
      return this.show.some(item => item === name);
    },
    // 切换表单
    changeFn() {
      console.log(this.checkTable);
    },
    // 关闭弹框
    toCloseNewGuiZeDialog() {
      this.newGuiZe = false;
      this.isChange = true;
      this.ruleForm = {
        feilvleixing: "",
        jine: {
          num: "",
          unit: "",
          more: ""
        },
        jiaoyijine: {
          num: "",
          unit: "",
          more: ""
        },
        shuhui: {
          num: "",
          unit: ""
        },
        shuhuiTian: {
          num: "",
          unit: ""
        },
        feilv: "",
        zhekou: "",
        danbi: ""
      };
      this.show = ["feilvleixing"];

      this.newGuiZe1 = false;
      this.isChange1 = true;
      this.ruleForm1 = {
        danri: "",
        sanyue: "",
        liuyue: "",
        yinian: ""
      };
    },
    // 保存更新数据
    save() {
      console.log(this.ruleForm);
      this.toCloseNewGuiZeDialog();
    },
    // 根据选择的表单类型决定显示的表单项
    toSetFormType() {
      let type = this.ruleForm.feilvleixing;
      switch (type) {
        case "认购":
        case "申购":
          this.show = [
            "feilvleixing",
            "jine",
            "jiaoyijine",
            "feilv",
            "zhekou",
            "danbi"
          ];
          break;
        case "赎回":
          this.show = [
            "feilvleixing",
            "shuhui",
            "shuhuiTian",
            "feilv",
            "zhekou",
            "danbi"
          ];
          break;
      }
    },
    // 历史业绩更新保存
    save1() {
      console.log(this.ruleForm1);
      this.toCloseNewGuiZeDialog();
    },
    // 历史业绩更新按钮
    toUpdate() {
      this.newGuiZe1 = true;
    }
  }
};
</script>
<style>
@import url("./allCss.scss");
</style>

