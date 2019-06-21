<template>
  <div
    style="overflow-y:auto"
    id='forTable'
  >

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
          <div v-if="pageData.forForms">
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

    <!-- 活期存款管理 -->
    <div
      class="buju"
      v-if='pageData.page==="demand_deposit"&&pageData.datas'
    >
      <div>
        <div>
          <baseinfo
            :pageData='pageData'
            @toReGetData='toReGetData'
          />
        </div>
        <div>

        </div>

      </div>

      <div>
        <simple :pageData='pageData' />
      </div>
    </div>

    <!-- 定期存款管理 -->
    <div
      class="buju"
      v-if='pageData.page==="time_deposit"&&pageData.datas'
    >
      <div>
        <div>
          <baseinfo
            :pageData='pageData'
            @toReGetData='toReGetData'
          />
        </div>
        <div>

        </div>

      </div>

      <div>
        <simple :pageData='pageData' />
        <div v-if="pageData.forForms">
          <forms
            @tableAct='tableAct'
            :type='"lilv"'
            :pageData='pageData'
          />
        </div>
      </div>

    </div>

    <!-- 智能存款管理 -->
    <div
      class="buju"
      v-if='pageData.page==="intelligent_deposit"&&pageData.datas'
    >
      <div>
        <div>
          <baseinfo
            :pageData='pageData'
            @toReGetData='toReGetData'
          />
        </div>
        <div>

        </div>

      </div>

      <div>
        <simple :pageData='pageData' />
        <div v-if="pageData.forForms">
          <forms
            @tableAct='tableAct'
            :type='"lilv"'
            :pageData='pageData'
          />
        </div>
      </div>

    </div>

    <!-- 结构存款管理 -->
    <div
      class="buju"
      v-if='pageData.page==="structured_deposit"&&pageData.datas'
    >
      <div>
        <div>
          <baseinfo
            :pageData='pageData'
            @toReGetData='toReGetData'
          />
        </div>
        <div>

        </div>

      </div>

      <div>
        <simple :pageData='pageData' />
      </div>

    </div>

    <!-- 机构管理 -->
    <div
      v-if='pageData.page==="organizational"&&forJiGouCom.datas'
      id='forTable'
    >
      <jigou :forJiGouInfo='forJiGouCom' />

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

      <!-- <forms
        :type='"jigou"'
        id='forTable'
      /> -->

    </div>

    <!-- 基金公司管理 -->
    <div v-if='pageData.page==="fund_company"&&forJiGouCom.dats'>
      <jigou :forJiGouInfo='forJiGouCom' />

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
    <!-- 新增交易规则弹框 -->
    <el-dialog
      :close-on-click-modal='false'
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

    <!-- 新增利率绩弹框 -->
    <el-dialog
      :close-on-click-modal='false'
      :title="newLiLvDia.title"
      :visible.sync="newLiLvDia.show"
      width="450px"
      :before-close="toCloseNewGuiZeDialog"
    >
      <el-form
        size="normal"
        :model="newLiLvDia.data"
        label-width="110px"
        label-suffix=':'
        :rules="rules"
        ref="lilvform"
      >

        <el-form-item
          label="期限"
          class="is50"
          prop="qixian"
        >
          <el-input
            type='number'
            clearable
            v-model="newLiLvDia.data.qixian"
            placeholder="请输入"
            class="isInput"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="danwei"
          label="单位"
          class="is50"
        >
          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="newLiLvDia.data.danwei"
          >
            <el-option
              size='mini'
              v-for="item in dict.deadline_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="利率"
          class="is50"
          prop="lilv"
        >
          <el-input
            type='number'
            clearable
            v-model="newLiLvDia.data.lilv"
            placeholder="请输入"
            class="isInput"
          ></el-input>
          <a class="isA">%</a>
        </el-form-item>

        <el-form-item
          label="备注"
          class="is50"
        >
          <el-input
            type="textarea"
            v-model="newLiLvDia.data.beizhu"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="saveLiLv()"
          type="primary"
        >保 存</el-button>
        <el-button @click="toCloseNewGuiZeDialog">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :close-on-click-modal='false'
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
        >保 存</el-button>
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
    // 验证数字
    var checkNum2 = (rule, value, callback) => {
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19 || ("" + value).length < 0) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    // 验证数字
    var checkNum3 = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19 || ("" + value).length < 0) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    return {
      dict: null, // 字典数据
      pageType: null,
      checkTable: null,
      checkList: [], // 用来切换表单
      newGuiZe: false, // 新增规则弹框
      newGuiZe1: false, // 历史业绩弹框
      newLiLv: false, // 新增利率弹框
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
      newLiLvDia: {
        show: false,
        title: "",
        data: {
          // 新增利率弹框
          qixian: "",
          lilv: "",
          beizhu: "",
          danwei: ""
        }
      },

      isChange: true, // 控制数据是否可以提交
      show: ["feilvleixing"], // 用来控制显示哪些表单选项
      forJiGouCom: {}, // 传给机构组件的数据
      rules: {
        // 利率弹框的验证
        qixian: [
          { validator: checkNum2, trigger: "blur" },
          { required: true, message: "请输入期限", trigger: "blur" }
        ],
        lilv: [
          { validator: checkNum3, trigger: "blur" },
          { required: true, message: "请输入利率", trigger: "blur" }
        ],
        danwei: [{ required: true, message: "请选择期限单位", trigger: "blur" }]
      }
    };
  },
  created() {
    this.dict = JSON.parse(sessionStorage.getItem("dict"));
  },
  mounted() {
    this.init(); // 页面初始化
    //  this.reGetData();
  },
  methods: {
    init() {
      let page = this.pageData.page;
      this.trade_rules = {
        money: this.dict.monetary_unit,
        limit: this.dict.rule_symbol
      };

      // console.log(this.pageData);

      switch (page) {
        case "organizational": // 机构管理
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
          this.forJiGouCom = this.pageData;
          this.jigouguanli_data();
          break;
        case "fund_company": // 基金管理
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
          break;
        case "demand_deposit": // 活期存款管理
          this.get_huoqi_xiangqing();
          break;
        case "time_deposit": // 定期存款管理
          this.get_dingqi_xiangqing();
          break;
        case "intelligent_deposit": // 智能存款管理
          this.get_zhineng_xiangqing();
          break;
        case "structured_deposit": // 结构存款管理
          this.get_jiegou_xiangqing();
          break;
      }
    },
    // 监听表格的操作
    tableAct(data) {
      if (data.type === "add") {
        this.newLiLvDia.data.spuId = +data.data; // 存款ID
        this.newLiLvDia.title = "新增利率";
        this.newLiLvDia.type = data.type;
        this.newLiLvDia.show = true;
      } else if (data.type === "edit") {
        // 获取利率
        this.$api
          .get_lilv({
            vm: this,
            id: data.data.id
          })
          .then(res => {
            if (res.success) {
              this.newLiLvDia = {
                type: data.type,
                show: false,
                title: "编辑利率",
                data: {
                  id: res.data.id,
                  spuId: res.data.spuId,
                  qixian: res.data.deadline,
                  lilv: res.data.interestRate,
                  beizhu: res.data.remark,
                  danwei: res.data.timeUnitType
                }
              };
              this.newLiLvDia.show = true;
            }
          });
      } else if (data.type === "delete") {
        this.$api
          .delete_lilv({
            vm: this,
            data: data.data.id
          })
          .then(res => {
            if (res.success) {
              this.$message.success("操作成功！");
              this.init();
              this.toCloseNewGuiZeDialog();
            }
          });
      }
    },
    // 新增利率弹框保存
    saveLiLv() {
      this.$refs.lilvform.validate(valid => {
        if (valid) {
          let datas = this.newLiLvDia.data,
            dictData = JSON.parse(sessionStorage.getItem("dict")), // 字典
            obj = {}, // 最终使用的数据
            httpType = ""; // 请求方式
          if (this.newLiLvDia.type === "edit") {
            // 编辑
            obj = {
              id: datas.id,
              spuId: datas.spuId,
              deadline: +datas.qixian,
              timeUnitType: datas.danwei,
              timeUnitLabel: "",
              interestRate: +datas.lilv,
              remark: datas.beizhu
            };
            httpType = "put";
          } else {
            // 新增
            obj = {
              spuId: +datas.spuId,
              deadline: +datas.qixian,
              timeUnitType: datas.danwei,
              timeUnitLabel: "",
              interestRate: +datas.lilv,
              remark: datas.beizhu
            };
            httpType = "post";
          }
          // 期限label
          obj.timeUnitLabel = obj.timeUnitType
            ? dictData.deadline_type.filter(
                item => item.value === obj.timeUnitType
              )[0].label
            : "";
          this.$api
            .lilv_list({
              vm: this,
              httpType: httpType,
              data: obj
            })
            .then(res => {
              if (res.success) {
                this.$message.success("操作成功！");
                this.init();
                this.toCloseNewGuiZeDialog();
              }
            });
        } else {
          this.$message.error("请输入必填数据！");
        }
      });
    },
    // 机构管理获取数据
    jigouguanli_data() {
      this.$api
        .get_jigouInfo({
          vm: this,
          id: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.forJiGouCom, "datas", res.data);
          }
        });
    },
    // 活期存款数据
    get_huoqi_xiangqing() {
      this.$api
        .huoqi_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "datas", null);
            setTimeout(() => this.$set(this.pageData, "datas", res.data));
          }
        });
    },
    // 定期存款数据
    get_dingqi_xiangqing() {
      this.$api
        .dingqi_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "datas", null);
            setTimeout(() => {
              this.$set(this.pageData, "datas", res.data);
              // 利率表格的数据
              let forms = {
                topClick: true, // 表格上边的新增利率
                fenye: true, // 是否需要分页
                pageNum: 0, // 当前页妈
                // 表格头部的蓝点
                titleUp: {
                  pointName: "利率"
                },
                // 表格头部
                title: [
                  {
                    prop: "num", // 要显示的属性
                    label: "序号", // 要显示的文字
                    width: "100" // 当前项的宽度
                  },
                  {
                    prop: "qixian", // 要显示的属性
                    label: "期限", // 要显示的文字
                    width: "100" // 当前项的宽度
                  },
                  {
                    prop: "danwei", // 要显示的属性
                    label: "单位", // 要显示的文字
                    width: "100" // 当前项的宽度
                  },
                  {
                    prop: "lilv", // 要显示的属性
                    label: "利率 %", // 要显示的文字
                    width: "100" // 当前项的宽度
                  },
                  {
                    prop: "beizhu", // 要显示的属性
                    label: "备注", // 要显示的文字
                    width: "100" // 当前项的宽度
                  }
                ],
                handle: [
                  // 表格执行的操作
                  {
                    click: "edit", // 表格操作栏的点击事件
                    text: "编辑" // 表格操作栏的点击事件
                  },
                  {
                    click: "delete", // 表格操作栏的点击事件
                    text: "删除" // 表格操作栏的点击事件
                  }
                ],
                // 表格数据
                dataTotal: []
              };
              let arr = res.data.interestRates;

              if (arr.length > 0) {
                for (let i = 0; i < arr.length; i++) {
                  forms.dataTotal.push({
                    num: i + 1,
                    qixian: arr[i].deadline,
                    danwei: arr[i].timeUnitLabel,
                    lilv: arr[i].interestRate,
                    beizhu: arr[i].remark,
                    id: arr[i].id,
                    parentID: arr[i].spuId
                  });
                }
              }
              this.$set(this.pageData, "forForms", forms);
            });
          }
        });
    },
    // 智能存款数据
    get_zhineng_xiangqing() {
      this.$api
        .zhineng_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "datas", null);
            setTimeout(() => {
              this.$set(this.pageData, "datas", res.data);
              // 利率表格的数据
              let forms = {
                topClick: true, // 表格上边的新增利率
                fenye: true, // 是否需要分页
                pageNum: 0, // 当前页妈
                // 表格头部的蓝点
                titleUp: {
                  pointName: "利率"
                },
                // 表格头部
                title: [
                  {
                    prop: "num", // 要显示的属性
                    label: "序号", // 要显示的文字
                    width: "100" // 当前项的宽度
                  },
                  {
                    prop: "qixian", // 要显示的属性
                    label: "期限", // 要显示的文字
                    width: "100" // 当前项的宽度
                  },
                  {
                    prop: "danwei", // 要显示的属性
                    label: "单位", // 要显示的文字
                    width: "100" // 当前项的宽度
                  },
                  {
                    prop: "lilv", // 要显示的属性
                    label: "利率 %", // 要显示的文字
                    width: "100" // 当前项的宽度
                  },
                  {
                    prop: "beizhu", // 要显示的属性
                    label: "备注", // 要显示的文字
                    width: "100" // 当前项的宽度
                  }
                ],
                handle: [
                  // 表格执行的操作
                  {
                    click: "edit", // 表格操作栏的点击事件
                    text: "编辑" // 表格操作栏的点击事件
                  },
                  {
                    click: "delete", // 表格操作栏的点击事件
                    text: "删除" // 表格操作栏的点击事件
                  }
                ],
                // 表格数据
                dataTotal: []
              };
              let arr = res.data.interestRates;
              if (arr.length > 0) {
                for (let i = 0; i < arr.length; i++) {
                  forms.dataTotal.push({
                    num: i + 1,
                    qixian: arr[i].deadline,
                    danwei: arr[i].timeUnitLabel,
                    lilv: arr[i].interestRate,
                    beizhu: arr[i].remark,
                    id: arr[i].id,
                    parentID: arr[i].spuId
                  });
                }
              }
              this.$set(this.pageData, "forForms", forms);
            });
          }
        });
    },
    // 结构存款数据
    get_jiegou_xiangqing() {
      this.$api
        .jigou_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "datas", null);
            setTimeout(() => this.$set(this.pageData, "datas", res.data));
          }
        });
    },

    // 各个子编辑完重新获取数据
    toReGetData(type) {
      switch (type) {
        case "huoqi": // 活期存款管理编辑完
          this.get_huoqi_xiangqing();
          break;
        case "dingqi": // 定期存款管理编辑完
          this.get_dingqi_xiangqing();
          break;
        case "zhineng": // 智能存款管理编辑完
          this.get_zhineng_xiangqing();
          break;
        case "jiegou": // 智能存款管理编辑完
          this.get_jiegou_xiangqing();
          break;
      }
    },
    /****************************************************************************/

    // 获取页面的各种数据
    reGetData() {
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
    // 存款管理左侧系列里的新增、编辑按钮弹框
    add_guize() {
      this.newGuiZe = true;
    },
    // 关闭弹框
    toCloseNewGuiZeDialog() {
      this.newGuiZe = false;
      this.isChange = true;
      this.newLiLvDia = {
        // 新增利率弹框
        type: "",
        show: false,
        title: "",
        data: {
          qixian: "",
          lilv: "",
          beizhu: "",
          danwei: ""
        }
      };
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
    /*****************************************************/
    // 用来判断当前页需要显示的表单项
    isToShow(name) {
      return this.show.some(item => item === name);
    },
    // 切换表单
    changeFn() {
      console.log(this.checkTable);
    },

    // 保存更新数据
    save() {
      console.log(this.ruleForm);
      // this.toCloseNewGuiZeDialog();
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

